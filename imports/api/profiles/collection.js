import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection('profiles');

Profiles.allow({
  insert(userId, profile) {
    return userId && profile.owner === userId;
  },
  update(userId, profile, fields, modifier) {
    return userId && profile.owner === userId;
  },
  remove(userId, profile) {
    return userId && profile.owner === userId;
  }
});