import { Meteor } from 'meteor/meteor';
//import '../lib/collections.js';

export const Notes = new Mongo.Collection('notes');

Meteor.startup(() => {
  // code to run on server at startup

});
