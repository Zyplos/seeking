import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';
 
import { Meteor } from 'meteor/meteor';
 
import template from './matchResponse.html';
import { name as ProfileUnmatched } from '../profileUnmatched/profileUnmatched';
 
class MatchResponse {
  yes() {
    this.answer('yes');
  }
  isYes() {
    return this.isAnswer('yes');
  }
 
  maybe() {
    this.answer('maybe');
  }
  isMaybe() {
    return this.isAnswer('maybe');
  }
 
  no() {
    this.answer('no');
  }
  isNo() {
    return this.isAnswer('no');
  }
 
  answer(answer) {
    Meteor.call('response', this.profile._id, answer, (error) => {
      if (error) {
        console.error('Oops, unable to respond!');
      } else {
        console.log('Response done!')
      }
    });
  }
  isAnswer(answer) {
    if(this.profile) {
      return !!_.findWhere(this.profile.responses, {
        user: Meteor.userId(),
        response: answer
      });
    }
  }
}

const name = 'matchResponse';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ProfileUnmatched
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    profile: '<'
  },
  controller: MatchResponse
});