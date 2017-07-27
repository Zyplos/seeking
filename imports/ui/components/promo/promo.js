import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './promo.html';

const name = 'promo';
 
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
    .state('promo', {
      url: '/promo',
      template: '<promo></promo>'
    });
}