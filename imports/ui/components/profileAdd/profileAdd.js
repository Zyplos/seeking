import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
 
import template from './profileAdd.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileUpload } from '../profileUpload/profileUpload';
 
class ProfileAdd {
  constructor() {
    this.profile = {};
  }

  submit() {
    this.profile.owner = Meteor.user()._id;
    Profiles.insert(this.profile);
    
    if(this.done) {
      this.done();
    }
    
    this.reset();
  }
 
  reset() {
    this.profile = {};
  }
}
 
const name = 'profileAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ProfileUpload
]).component(name, {
  template,
  bindings: {
    done: '&?'
  },
  controllerAs: name,
  controller: ProfileAdd
});