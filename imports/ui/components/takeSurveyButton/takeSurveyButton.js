import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './takeSurveyButton.html';

class TakeSurveyButton {}
 
const name = 'takeSurveyButton';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: TakeSurveyButton
});