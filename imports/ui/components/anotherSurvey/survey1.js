import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey1.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey1 {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;

    this.subscribe('profiles');
    this.subscribe('users');
    
    this.helpers({
      profile() {
        return Profiles.findOne({
          _id: $stateParams.profileId
        });
      },
      users() {
        return Meteor.users.find({});
      },
      currentUserId() {
        return Meteor.userId();
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }
  
  save() {
    Profiles.update({
      _id: this.profile._id
    }, {
      $set: {
        favRecordsAnswer: this.profile.favRecordsAnswer,
        favProducersAnswer: this.profile.favProducersAnswer,
        favLabelsAnswer: this.profile.favLabelsAnswer,
        instrumentYearsAnswer: this.profile.instrumentYearsAnswer,
        skillLevelAnswer1: this.profile.skillLevelAnswer1,
        skillLevelAnswer2: this.profile.skillLevelAnswer2,
        skillLevelWeight: this.profile.skillLevelWeight,
        liveBandAnswer1: this.profile.liveBandAnswer1,
        liveBandAnswer2: this.profile.liveBandAnswer2,
        liveBandWeight: this.profile.liveBandWeight,
        gearAnswer1: this.profile.gearAnswer1,
        gearAnswer2: this.profile.gearAnswer2,
        gearWeight: this.profile.gearWeight,
        priorityAnswer: this.profile.priorityAnswer,
        priorityWeight: this.profile.priorityWeight,
        productionAnswer: this.profile.productionAnswer,
        productionWeight: this.profile.productionWeight,
        moneyAnswer1: this.profile.moneyAnswer1,
        moneyAnswer2: this.profile.moneyAnswer2,
        moneyWeight: this.profile.moneyWeight,
        practiceTimeAnswer: this.profile.practiceTimeAnswer,
        practiceTimeWeight: this.profile.practiceTimeWeight,
        localShowsAnswer: this.profile.localShowsAnswer,
        localShowsWeight: this.profile.localShowsWeight,
        touringAnswer: this.profile.touringAnswer,
        touringWeight: this.profile.touringWeight,
        recordingAnswer: this.profile.recordingAnswer,
        recordingWeight: this.profile.recordingWeight,
        songwritingAnswer1: this.profile.songwritingAnswer1,
        songwritingAnswer2: this.profile.songwritingAnswer2,
        songwritingWeight: this.profile.songwritingWeight,
        originalOrCoverAnswer: this.profile.originalOrCoverAnswer,
        originalOrCoverWeight: this.profile.originalOrCoverWeight,
        occasionalCoverAnswer: this.profile.occasionalCoverAnswer,
        occasionalCoverWeight: this.profile.occasionalCoverWeight,
        venuesAnswer: this.profile.venuesAnswer,
        venuesWeight: this.profile.venuesWeight,
        venuesBadAnswer: this.profile.venuesBadAnswer,
        venuesBadWeight: this.profile.venuesBadWeight,
        practiceSpaceAnswer1: this.profile.practiceSpaceAnswer1,
        practiceSpaceAnswer2: this.profile.practiceSpaceAnswer2,
        practiceSpaceWeight: this.profile.practiceSpaceWeight,
        vehicleAnswer1: this.profile.vehicleAnswer1,
        vehicleAnswer2: this.profile.vehicleAnswer2,
        vehicleWeight: this.profile.vehicleWeight,
        vanAnswer1: this.profile.vanAnswer1,
        vanAnswer2: this.profile.vanAnswer2,
        vanWeight: this.profile.vanWeight,
        singAnswer1: this.profile.singAnswer1,
        singAnswer2: this.profile.singAnswer2,
        singWeight: this.profile.singWeight,
        harmonizeAnswer1: this.profile.harmonizeAnswer1,
        harmonizeAnswer2: this.profile.harmonizeAnswer2,
        harmonizeWeight: this.profile.harmonizeWeight,
        merchAnswer: this.profile.merchAnswer,
        merchWeight: this.profile.merchWeight,
        familyOrBusinessAnswer: this.profile.familyOrBusinessAnswer,
        familyOrBusinessWeight: this.profile.familyOrBusinessWeight,
        bandImageAnswer: this.profile.bandImageAnswer,
        bandImageWeight: this.profile.bandImageWeight,
        favBooksAnswer: this.profile.favBooksAnswer,
        favBooksWeight: this.profile.favBooksWeight,
        favMoviesAnswer: this.profile.favMoviesAnswer,
        favMoviesWeight: this.profile.favMoviesWeight,
        favTvShowsAnswer: this.profile.favTvShowsAnswer,
        favTvShowsWeight: this.profile.favTvShowsWeight,
        politicsAnswer: this.profile.politicsAnswer,
        politicsWeight: this.profile.politicsWeight,
        politicsBandAnswer: this.profile.politicsBandAnswer,
        politicsBandWeight: this.profile.politicsBandWeight,
        religionAnswer: this.profile.religionAnswer,
        religionWeight: this.profile.religionWeight,
        religionBandAnswer: this.profile.religionBandAnswer,
        religionBandWeight: this.profile.religionBandWeight,
        drinkAnswer: this.profile.drinkAnswer,
        drinkWeight: this.profile.drinkWeight,
        drugsAnswer: this.profile.drugsAnswer,
        drugsWeight: this.profile.drugsWeight
      }
    }, (error) => {
      if (error) {
        console.log('WHOOPS');
      } else {
        console.log('Done!');
      }
    });
  }
}
 
const name = 'survey1';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey1
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey1', {
      url: '/survey1/:profileId',
      template: '<survey1></survey1>',
      resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}