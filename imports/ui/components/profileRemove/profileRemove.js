import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './profileRemove.html';
import { Profiles } from '../../../api/profiles/index';
 
class ProfileRemove {
  remove() {
    if (this.profile) {
      Profiles.remove(this.profile._id);
    }
  }
}
 
const name = 'profileRemove';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    profile: '<'
  },
  controllerAs: name,
  controller: ProfileRemove
});