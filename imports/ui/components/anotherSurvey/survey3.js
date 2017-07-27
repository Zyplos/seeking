import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey3.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey3 {
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
        practiceTimeAnswer: this.profile.practiceTimeAnswer,
        practiceTimeWeight: this.profile.practiceTimeWeight,
        localShowsAnswer: this.profile.localShowsAnswer,
        localShowsWeight: this.profile.localShowsWeight,
        touringAnswer: this.profile.touringAnswer,
        touringWeight: this.profile.touringWeight,
        recordingAnswer: this.profile.recordingAnswer,
        recordingWeight: this.profile.recordingWeight,
        songwritingAnswer1: this.profile.songwritingAnswer1,
        songwritingAnswer2: this.profile.songwritingAnswer2,
        songwritingWeight: this.profile.songwritingWeight
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
 
const name = 'survey3';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey3
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey3', {
      url: '/survey3',
      template: '<survey3></survey3>'
    });
}