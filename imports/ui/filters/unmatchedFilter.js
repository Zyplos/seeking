import angular from 'angular';
import _ from 'underscore';
 
const name = 'unmatchedFilter';
 
function UnmatchedFilter(users, profile) {
  if (!profile) {
    return false;
  }
 
  return users.filter((user) => {
    // if not the owner and not matched
    return user._id !== profile.owner && (profile.matched || []).indexOf(user._id) === -1;
  });
}
 
// create a module
export default angular.module(name, [])
  .filter(name, () => {
    return UnmatchedFilter;
  });