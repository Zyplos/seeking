import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './bottom.html';
 
const name = 'bottom';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name
});