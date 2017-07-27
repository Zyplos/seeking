import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './profileImage.html';
import { Images } from '../../../api/images';
 
class ProfileImage {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
 
    this.helpers({
      mainImage() {
        const images = this.getReactively('images', true);
        if (images) {
          return Images.findOne({
            _id: images[0]
          });
        }
      }
    });
  }
}

const name = 'profileImage';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    images: '<'
  },
  controllerAs: name,
  controller: ProfileImage
});