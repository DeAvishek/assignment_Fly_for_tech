import mongoose ,{Schema,Document} from "mongoose"
interface ISection extends Document {
    sectionName: string;
    content: unknown;
    order: number;
}
const SectionSchem:Schema <ISection> = new Schema({
    sectionName:{
        type:String,
        required:true
    },
    content:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    order:{
        type:Number,
        required:true
    }

})
const SectionModel = mongoose.models.Section as mongoose.Model<ISection> || mongoose.model('Section',SectionSchem)
export default SectionModel