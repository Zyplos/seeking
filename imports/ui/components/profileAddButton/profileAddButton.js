import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './profileAddButton.html';
import modalTemplate from './profileAddModal.html';
import { name as ProfileAdd } from '../profileAdd/profileAdd';

class ProfileAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.close = () => {
          $mdDialog.hide();
        }
      
      },
      controllerAs: 'profileAddModal',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'profileAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  ProfileAdd
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: ProfileAddButton
});
