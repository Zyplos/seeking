import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './terms.html';

const name = 'terms';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
})
    .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('terms', {
      url: '/terms',
      template: '<terms></terms>'
    });
}