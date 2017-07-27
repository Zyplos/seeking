import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Profiles } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('profiles', function(options, searchString) {
    const selector = {
      $or: [{
        // the public profiles
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is one of matched
        $and: [{
          matched: this.userId
        }, {
          matched: {
            $exists: true
          }
        }]
      }]
    };
    
    if (typeof searchString === 'string' && searchString.length) {
      selector.city = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }
    
    Counts.publish(this, 'numberOfProfiles', Profiles.find(selector), {
      noReady: true
    });
 
    return Profiles.find(selector, options);
  });
}