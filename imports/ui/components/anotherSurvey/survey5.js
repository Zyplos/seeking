import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey5.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey5 {
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
        vehicleAnswer1: this.profile.vehicleAnswer1,
        vehicleAnswer2: this.profile.vehicleAnswer2,
        vehicleWeight: this.profile.vehicleWeight,
        vanAnswer1: this.profile.vanAnswer1,
        vanAnswer2: this.profile.vanAnswer2,
        vanWeight: this.profile.vanWeight,
        singAnswer1: this.profile.singAnswer1,
        singAnswer2: this.profile.singAnswer2,
        singWeight: this.profile.singWeight,
        harmonizeAnswer1: this.profile.harmonizeAnswer1,
        harmonizeAnswer2: this.profile.harmonizeAnswer2,
        harmonizeWeight: this.profile.harmonizeWeight,
        merchAnswer: this.profile.merchAnswer,
        merchWeight: this.profile.merchWeight
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
 
const name = 'survey5';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey5
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey5', {
      url: '/survey5',
      template: '<survey5></survey5>'
    });
}