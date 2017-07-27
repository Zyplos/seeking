import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './privacy.html';

const name = 'privacy';
 
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
    .state('privacy', {
      url: '/privacy',
      template: '<privacy></privacy>'
    });
}