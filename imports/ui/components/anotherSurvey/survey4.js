import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey4.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey4 {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;

    this.subscribe('profiles');
    this.subscribe('users');
    
    this.helpers({
      profile() {
        return Profiles.findOne({
          _id: $stateParams.profileId
        });
      },
      users() {
        return Meteor.users.find({});
      },
      currentUserId() {
        return Meteor.userId();
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }
  
  save() {
    Profiles.update({
      _id: this.profile._id
    }, {
      $set: {
        originalOrCoverAnswer: this.profile.originalOrCoverAnswer,
        originalOrCoverWeight: this.profile.originalOrCoverWeight,
        occasionalCoverAnswer: this.profile.occasionalCoverAnswer,
        occasionalCoverWeight: this.profile.occasionalCoverWeight,
        venuesAnswer: this.profile.venuesAnswer,
        venuesWeight: this.profile.venuesWeight,
        venuesBadAnswer: this.profile.venuesBadAnswer,
        venuesBadWeight: this.profile.venuesBadWeight,
        practiceSpaceAnswer1: this.profile.practiceSpaceAnswer1,
        practiceSpaceAnswer2: this.profile.practiceSpaceAnswer2,
        practiceSpaceWeight: this.profile.practiceSpaceWeight
      }
    }, (error) => {
      if (error) {
        console.log('WHOOPS');
      } else {
        console.log('Done!');
      }
    });
  }
}
 
const name = 'survey4';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey4
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey4', {
      url: '/survey4',
      template: '<survey4></survey4>'
    });
}