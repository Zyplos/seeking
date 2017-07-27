import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './navigation.html';
import { name as ProfilesList } from '../profilesList/profilesList';
 
const name = 'navigation';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ProfilesList
]).component(name, {
  template,
  controllerAs: name
});