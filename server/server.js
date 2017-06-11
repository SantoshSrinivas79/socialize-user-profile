import { Profiles } from '../common/profile-model';
import { Meteor } from 'meteor/meteor';
import S from 'string';

Profiles.allow({
    insert: function(userId, document) {
        return document.checkOwnership();
    },
    update: function(userId, document) {
        return document.checkOwnership();
    }
});

Meteor.users.after.insert(function(userId, document) {
    var profile = {
        userId:document._id
    };

    if(document.username){
        profile.username = document.username;

        // For startup creation. Dummy data. To be removed!
        var chance = new Chance();
        profile.dob = chance.birthday();
        profile.state = chance.state();
    }

    Profiles.insert(profile);
});

Meteor.users.after.remove(function(userId, document) {
   Profiles.remove({userId: userId})
});