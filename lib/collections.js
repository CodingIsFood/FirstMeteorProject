import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');


Meteor.methods({
	'notes.insert'(text) {

		//checks that entered text is a string
		check(text, String);
        
        //checks if user is logged-in
		if (!Meteor.userId) {
			throw new Meteor.error("Not authorized");
		}
        //finally inserts the text
			Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});			
	},

   'notes.remove' (note) {
   	check(note._id, String);
   	Notes.remove(note._id);
   }
});