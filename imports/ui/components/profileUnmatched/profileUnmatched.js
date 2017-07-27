import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Meteor } from 'meteor/meteor';
 
import template from './profileUnmatched.html';
import { name as UnmatchedFilter } from '../../filters/unmatchedFilter';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class ProfileUnmatched {
  constructor($scope) {
    'ngInject';
 
    $scope.viewModel(this);
 
    this.helpers({
      users() {
        return Meteor.users.find({});
      }
    });
  }
  
  match(user) {
    Meteor.call('match', this.profile._id, user._id,
      (error) => {
        if (error) {
          console.log('Oops, unable to match!');
        } else {
          console.log('Matched!');
        }
      }
    );
  }
}


const name = 'profileUnmatched';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  UnmatchedFilter,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    profile: '<'
  },
  controller: ProfileUnmatched
});