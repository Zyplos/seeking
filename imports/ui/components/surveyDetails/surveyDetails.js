import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './surveyDetails.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfilesList } from '../profilesList/profilesList';
import { name as Survey1 } from '../anotherSurvey/survey1';

class SurveyDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $scope.devskillLevelWeight = 3;

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
        favRecordsWeight: this.profile.favRecordsWeight,
        favProducersAnswer: this.profile.favProducersAnswer,
        favProducersWeight: this.profile.favProducersWeight,
        favLabelsAnswer: this.profile.favLabelsAnswer,
        favLabelsWeight: this.profile.favLabelsWeight,
        skillLevelAnswer: this.profile.skillLevelAnswer,
        skillLevelWeight: this.profile.skillLevelWeight,
        instrumentYearsAnswer: this.profile.instrumentYearsAnswer,
        instrumentYearsWeight: this.profile.instrumentYearsWeight,
        liveBandAnswer: this.profile.liveBandAnswer,
        liveBandWeight: this.profile.liveBandWeight,
        gearAnswer: this.profile.gearAnswer,
        gearWeight: this.profile.gearWeight,
        priorityAnswer: this.profile.priorityAnswer,
        priorityWeight: this.profile.priorityWeight,
        productionAnswer: this.profile.productionAnswer,
        productionWeight: this.profile.productionWeight,
        skillAnswer: this.profile.skillAnswer,
        skillWeight: this.profile.skillWeight,
        practiceTimeAnswer: this.profile.practiceTimeAnswer,
        practiceTimeWeight: this.profile.practiceTimeWeight,
        localShowsAnswer: this.profile.localShowsAnswer,
        localShowsWeight: this.profile.localShowsWeight,
        touringAnswer: this.profile.touringAnswer,
        touringWeight: this.profile.touringWeight,
        recordingAnswer: this.profile.recordingAnswer,
        recordingWeight: this.profile.recordingWeight,
        songwritingAnswer: this.profile.songwritingAnswer,
        songWritingWeight: this.profile.songWritingWeight,
        originalOrCoverAnswer: this.profile.originalOrCoverAnswer,
        originalOrCoverWeight: this.profile.originalOrCoverWeight,
        occasionalCoverAnswer: this.profile.occasionalCoverAnswer,
        occasionalCoverWeight: this.profile.occasionalCoverWeight,
        venuesAnswer: this.profile.venuesAnswer,
        venuesWeight: this.profile.venuesWeight,
        venuesBadAnswer: this.profile.venuesBadAnswer,
        venuesBadWeight: this.profile.venuesBadWeight,
        practiceSpaceAnswer: this.profile.practiceSpaceAnswer,
        practiceSpaceWeight: this.profile.practiceSpaceWeight,
        vehicleAnswer: this.profile.vehicleAnswer,
        vehicleWeight: this.profile.vehicleWeight,
        vanAnswer: this.profile.vanAnswer,
        vanWeight: this.profile.vanWeight,
        singAnswer: this.profile.singAnswer,
        singWeight: this.profile.singWeight,
        harmonizeAnswer: this.profile.harmonizeAnswer,
        harmonizeWeight: this.profile.harmonizeWeight,
        merchAnswer: this.profile.merchAnswer,
        merchWeight: this.profile.merchWeight,
        familyOrBusinessAnswer: this.profile.familyOrBusinessAnswer,
        familyOrBusinessWeight: this.profile.familyOrBusinessWeight,
        bandImageAnswer: this.profile.bandImageAnswer,
        bandImageWeight: this.profile.bandImageWeight,
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
        drugsWeight: this.profile.drugsWeight,
        personalityAnswer: this.profile.personalityAnswer,
        personalityWeight: this.profile.personalityWeight,
        genderAnswer: this.profile.genderAnswer,
        genderWeight: this.profile.genderWeight,
        raceAnswer: this.profile.raceAnswer,
        raceWeight: this.profile.raceWeight,
        sexualityAnswer: this.profile.sexualityAnswer,
        sexualityWeight: this.profile.sexualityWeight
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

const name = 'surveyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProfilesList,
  Survey1
]).component(name, {
  template,
  controllerAs: name,
  controller: SurveyDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('surveyDetails', {
    url: '/surveyDetails/:profileId',
    template: '<survey-details></survey-details>',
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
