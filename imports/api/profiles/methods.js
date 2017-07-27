import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
 
import { Profiles } from './collection';
 
function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
 
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
 
  return null;
}
 
export function match(profileId, userId) {
  check(profileId, String);
  check(userId, String);
 
  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }
 
  const profile = Profiles.findOne(profileId);
 
  if (!profile) {
    throw new Meteor.Error(404, 'No such profile!');
  }
  
  if (profile.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }
 
  if (userId !== profile.owner && ! _.contains(profile.matched, userId)) {
    Profiles.update(profileId, {
      $addToSet: {
        matched: userId
      }
    });
 
    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));
 
    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@seekingmusicapp.com',
        subject: `Meet ${profile.firstName} on Seeking!`,
        text: `
          Hey! 
          
          ${profile.firstName} just matched you on Seeking.
          Come check out their profile: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function response(profileId, response) {
  check(profileId, String);
  check(response, String);
 
  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to respond');
  }
 
  if (!_.contains(['yes', 'no', 'maybe'], response)) {
    throw new Meteor.Error(400, 'Invalid response');
  }
 
  const profile = Profiles.findOne({
    _id: profileId,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is matched
      $and: [{
        matched: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });
 
  if (!profile) {
    throw new Meteor.Error(404, 'No such profile');
  }
 
  const hasUserResponse = _.findWhere(profile.responses, {
    user: this.userId
  });
  
  if (!hasUserResponse) {
    // add new response entry
    Profiles.update(profileId, {
      $push: {
        responses: {
          response,
          user: this.userId
        }
      }
    });
  } else {
    // update response entry
    const userId = this.userId;
    Profiles.update({
      _id: profileId,
      'responses.user': userId
    }, {
      $set: {
        'responses.$.response': response
      }
    });
  }
}

Meteor.methods({
  match,
  response
});