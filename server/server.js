import { ProfilesCollection } from '../common/profile-model';
import { Meteor } from 'meteor/meteor';

ProfilesCollection.allow({
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
    }

    ProfilesCollection.insert(profile);
});

Meteor.users.after.remove(function(userId, document) {
   ProfilesCollection.remove({userId: userId})
});


// Added this to update user profile collection per the profile field
Meteor.users.after.update(function(userId, document) {
    // console.log("In the update trigger of profiles");
    // console.log(document);

    var profile = {
        userId:document._id
    };

    if(document.username){
        profile.username = document.username;
        profile.firstName = document.profile.firstName;
        profile.lastName = document.profile.lastName;
    }

    ProfilesCollection.upsert({userId: document._id}, 
        {
            $set:
                {
                    userId:document._id, 
                    username:document.username,
                    firstName : document.profile.firstName,
                    lastName : document.profile.lastName
                }

        }
    );
});