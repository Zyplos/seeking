import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Seeking } from '../imports/ui/components/seeking/seeking';

function onReady() {
  angular.bootstrap(document, [
    Seeking
  ], {
    strictDi: true
  });
}

// Meteor.startup(function() {
//   Template.fb_pic.pic = function() {// helper function to display the pic on the page
//     var userProfile;
//     userProfile = Meteor.user().profile;

//     if(userProfile) { // logic to handle logged out state
//       return userProfile.picture;
//     }
//   };
// });
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}