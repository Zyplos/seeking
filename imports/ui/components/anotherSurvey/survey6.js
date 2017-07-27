import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey6.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey6 {
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
        familyOrBusinessAnswer: this.profile.familyOrBusinessAnswer,
        familyOrBusinessWeight: this.profile.familyOrBusinessWeight,
        bandImageAnswer: this.profile.bandImageAnswer,
        bandImageWeight: this.profile.bandImageWeight,
        favBooksAnswer: this.profile.favBooksAnswer,
        favBooksWeight: this.profile.favBooksWeight,
        favMoviesAnswer: this.profile.favMoviesAnswer,
        favMoviesWeight: this.profile.favMoviesWeight,
        favTvShowsAnswer: this.profile.favTvShowsAnswer,
        favTvShowsWeight: this.profile.favTvShowsWeight
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
 
const name = 'survey6';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey6
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey6', {
      url: '/survey6',
      template: '<survey6></survey6>'
    });
}