import { Meteor } from 'meteor/meteor';
import { Profiles } from '../api/profiles/index';

Meteor.startup(() => {
  if (Profiles.find().count() === 0) {
    const profiles = [{
      'firstName': 'Michael',
      'lastName': 'Jordan',
      'zip': '60616',
      'email': 'michaeljordan@nbaslamdunks.com'
    }];
 
    profiles.forEach((profile) => {
      Profiles.insert(profile)
    });
  }
});