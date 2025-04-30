import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    username:string,
    email:string,
    role:string
    
}
const UserSchema:Schema<IUser>=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:"admin"
    }
    
})

const UserModel=(mongoose.models.User as mongoose.Model<IUser> ) || (mongoose.model<IUser>("User",UserSchema))
export default UserModel