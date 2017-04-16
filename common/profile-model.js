/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { BaseModel } from 'meteor/socialize:base-model';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/* eslint-enable import/no-unresolved */

export const ProfilesCollection = new Mongo.Collection('ProfilesCollection');

export class Profile extends BaseModel {
    /**
     * Get the User instance for the profile
     * @function user
     * @memberof Profile
     */
    user() {
        return Meteor.users.findOne(this.userId);
    }
}

Profile.attachCollection(ProfilesCollection);

// Create the schema for a profile
ProfilesCollection.attachSchema(new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue() {
            if (this.isInsert) {
                if (!this.isSet && this.isFromTrustedCode) {
                    return this.userId;
                }
            }
            return undefined;
        },
        unique:true,
        // denyUpdate: true,
    },
    username: {
        type: String,
        optional: true
    },
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    date: {
        type: Date,
        optional: true,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            return undefined;
        },
        denyUpdate: true,
    },
}));
