import { User } from 'meteor/socialize:user-model';
import { Profiles } from './profile-model';


User.methods({
    profile() {
        return Profiles.findOne({userId:this._id});
    }
});
