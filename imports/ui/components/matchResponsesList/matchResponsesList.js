import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Counts } from 'meteor/tmeasday:publish-counts';
 
import template from './matchResponsesList.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';
import { name as ProfilesSort } from '../profilesSort/profilesSort';
import { name as MatchResponse } from '../matchResponse/matchResponse';
import { name as MatchResponseUsers } from '../matchResponseUsers/matchResponseUsers';
import { name as ProfileImage } from '../profileImage/profileImage';

class MatchResponsesList {
  constructor($scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.perPage = 10,000;
    this.page = 1;
    this.sort = {
      city: 1
    };
    this.searchText = '';
    
    this.subscribe('profiles', () => [{
       limit: parseInt(this.perPage),
       skip: parseInt((this.getReactively('page') - 1) * this.perPage),
       sort: this.getReactively('sort')
    }, this.getReactively('searchText')
    ]);
    
    this.subscribe('users');
    this.subscribe('images');
 
    this.helpers({
      profiles() {
        return Profiles.find({}, {
          sort : this.getReactively('sort')
        });
      },
      profilesCount() {
        return Counts.get('numberOfProfiles');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }
  
  pageChanged(newPage) {
    this.page = newPage;
  }
  
  sortChanged(sort) {
    this.sort = sort;
  }
  
}
 
const name = 'matchResponsesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProfileDetails,
  ProfilesSort,
  MatchResponse,
  MatchResponseUsers,
  ProfileImage
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    responses: '<'
  },
  controller: MatchResponsesList
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('matchResponsesList', {
      url: '/matchResponsesList/:profileId',
      template: '<match-responses-list></match-responses-list>'
    });
}