import { boolean, string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface User {
  userName: string;
  password: string;
  interestedInWarnings: boolean;
  email?: string;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  interestedInWarnings: { type: Boolean, required: true },
  email: {
    type: String,
    required: function () {
      // Make email required only if interestedInWarnings is true
      return this.interestedInWarnings === true;
    },
    validate: {
      validator: function(this: UserDocument, v: string) {
        return Boolean(v) && Boolean(this.interestedInWarnings);
      },
      message: 'Email is not supposed to be received when you are not interested in notification emails',
    },
  }
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
