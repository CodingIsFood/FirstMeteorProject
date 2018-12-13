import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

//Change sign-in option from email to username only
Accounts.ui.config ({
	passwordSignupFields: 'USERNAME_ONLY'

});


Template.body.helpers({

	/*
	notes: [
    {text: 'note 1'},
    {text: 'note 2'},
    {text: 'note 3'}
	]
	*/

	notes() {

		return Notes.find({});
	}
});


Template.addNote.events ({
	'submit .add-form' : function(event){
	event.preventDefault();

	//stores input in value "text"
	const target=event.target;
	const text=target.text.value;

	/* 
	    prints the value to console
		console.log(text);
		*/

		/*inserts the value into collection
		Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
		*/
		Meteor.call('notes.insert', text);
		
		//clears form after submit
		target.text.value='';

		//closes the modal after submit
		$('#addModal').modal('close');

		return false;
	} 
});

//deletes an entry from collection after delete is clicked 
Template.note.events ({
	'click .delete-note': function(){
		//Notes.remove(this._id);
		Meteor.call('notes.remove', this);
		return false;
	}
});

