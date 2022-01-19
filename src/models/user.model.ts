import * as mongoose from "mongoose";
import bcrypt from "bcrypt"


interface IUser extends mongoose.Document {
    name: string,
    email: string,
    active: boolean,
    password: string,
    isPasswordMatch(password: string): boolean
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true,trim: true },
    email: { type: String, required: true, trim: true },
    active: { type: Boolean, required: true, default: true},
    password: { type: String, required: true }
},{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

userSchema.method('isPasswordMatch', function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (hashErr: any, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash
      next()
    })
  })
});

const User = mongoose.model<IUser>('user', userSchema);
export default User;