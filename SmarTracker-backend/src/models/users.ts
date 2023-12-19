import {User} from '@common/src/interfaces/users';
import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends User, Document {
  _id: string;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    /*mongoose will make _id required and unique by default, it warns if we define it ourselves */
    _id: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currency: { type: String, required: true },
    interestedInWarnings: { type: Boolean, required: true },
    warningPercent: {
      type: Number,
      required: function () {
        // Make warningPercent required only if interestedInWarnings is true
        return this.interestedInWarnings === true;
      }
    }
  },
);

export const UserModel = mongoose.model<UserDocument>('Users', UserSchema);
