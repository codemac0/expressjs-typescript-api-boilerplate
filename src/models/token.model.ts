import * as mongoose from "mongoose";
import tokenTypes from "../config/token"

interface IToken extends mongoose.Document {
    token: string;
    user: mongoose.Schema.Types.ObjectId;
    type: string;
    expires: mongoose.Schema.Types.Date;
    blacklisted: boolean
}

const tokenSchema = new mongoose.Schema<IToken>({
    token: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', },
    type: { type: String, required: true, enum: [tokenTypes.ACCESS, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL] },
    expires: { type: mongoose.Schema.Types.Date, required: true },
    blacklisted: { type: Boolean, default: false }
},{
    timestamps: true,
});

const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;