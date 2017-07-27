import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './profilesList.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';
import { name as ProfilesSort } from '../profilesSort/profilesSort';
import { name as ProfilesMap } from '../profilesMap/profilesMap';
import { name as ProfileAddButton } from '../profileAddButton/profileAddButton';
import { name as ProfileAdd } from '../profileAdd/profileAdd';
import { name as ProfileRemove } from '../profileRemove/profileRemove';
import { name as ProfileUnmatched } from '../profileUnmatched/profileUnmatched';
import { name as MatchResponse } from '../matchResponse/matchResponse';
import { name as MatchResponsesList } from '../matchResponsesList/matchResponsesList';
import { name as MatchResponseUsers } from '../matchResponseUsers/matchResponseUsers';
import { name as ProfileImage } from '../profileImage/profileImage';
import { name as TakeSurveyButton } from '../takeSurveyButton/takeSurveyButton';
 
class ProfilesList {
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
 
const name = 'profilesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails,
  ProfilesSort,
  ProfilesMap,
  ProfileAdd,
  ProfileAddButton,
  ProfileRemove,
  ProfileUnmatched,
  MatchResponse,
  MatchResponsesList,
  MatchResponseUsers,
  ProfileImage,
  TakeSurveyButton
]).component(name, {
  template,
  controllerAs: name,
  controller: ProfilesList
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('profiles', {
      url: '/profiles',
      template: '<profiles-list></profiles-list>'
    });
}