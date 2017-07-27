import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey2.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey2 {
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
        liveBandAnswer1: this.profile.liveBandAnswer1,
        liveBandAnswer2: this.profile.liveBandAnswer2,
        liveBandWeight: this.profile.liveBandWeight,
        gearAnswer1: this.profile.gearAnswer1,
        gearAnswer2: this.profile.gearAnswer2,
        gearWeight: this.profile.gearWeight,
        priorityAnswer: this.profile.priorityAnswer,
        priorityWeight: this.profile.priorityWeight,
        productionAnswer: this.profile.productionAnswer,
        productionWeight: this.profile.productionWeight,
        moneyAnswer1: this.profile.moneyAnswer1,
        moneyAnswer2: this.profile.moneyAnswer2,
        moneyWeight: this.profile.moneyWeight
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
 
const name = 'survey2';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey2
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey2', {
      url: '/survey2',
      template: '<survey2></survey2>'
    });
}