import {User} from '@common/src/interfaces/users';
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends User, Document {
  _id: string;
  refreshToken: string;
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
    },
    refreshToken: {type: String, required: true}
  },
);


UserSchema.pre('save', async function (next) {
  console.log('test')
  //bcrypt.genSalt() generates a salt for us, it is an async function so we need to await for it
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  /* Since we modify the password before we save it to the database 
     when we go to the next() function (That saves the data to the database)
     the password is going to be the hashed one and not the plain text one
  */
  next();
});


export const UserModel = mongoose.model<UserDocument>('Users', UserSchema);
