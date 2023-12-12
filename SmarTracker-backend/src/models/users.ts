import mongoose, { Document, Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
  currency: string;
  interestedInWarnings: boolean;
  warningPercent?: number;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new Schema(
  {
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
