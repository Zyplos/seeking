import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
 
import template from './profileDetails.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileUnmatched } from '../profileUnmatched/profileUnmatched';
import { name as ProfileMap } from '../profileMap/profileMap';
import { name as ProfileRemove } from '../profileRemove/profileRemove';
 
class ProfileDetails {
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
      isLoggedIn() {
        return !!Meteor.userId();
      },
      isOwner() {
        if (!this.profile) {
          return false;
        }
        return this.profile.owner === Meteor.userId();
      }
    });
  }
  
  save() {
    Profiles.update({
      _id: this.profile._id
    }, {
      $set: {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        lookingFor: this.profile.lookingFor,
        instrument1: this.profile.instrument1,
        instrument2: this.profile.instrument2,
        city: this.profile.city,
        state: this.profile.state,
        age: this.profile.age,
        bio: this.profile.bio,
        favGenres: this.profile.favGenres,
        favBands: this.profile.favBands,
        fbUrl: this.profile.fbUrl,
        scUrl: this.profile.scUrl,
        bcUrl: this.profile.bcUrl,
        public: this.profile.public,
        location: this.profile.location
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
 
const name = 'profileDetails';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProfileUnmatched,
  ProfileMap,
  ProfileRemove
]).component(name, {
  template,
  controllerAs: name,
  controller: ProfileDetails
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('profileDetails', {
    url: '/profiles/:profileId',
    template: '<profile-details></profile-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}