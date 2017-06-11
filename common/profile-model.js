/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { BaseModel } from 'meteor/socialize:base-model';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { Tracker } from 'meteor/tracker';
SimpleSchema.debug = true;

/* eslint-enable import/no-unresolved */

export const Profiles = new Mongo.Collection('profiles');

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

Profile.attachCollection(Profiles);

// Create the schema for a profile
Profiles.attachSchema(new SimpleSchema({
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
        denyUpdate: true,
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
    dob: {
        type: Date,
        optional: true,
    },
    state: {
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
}, { tracker: Tracker }));