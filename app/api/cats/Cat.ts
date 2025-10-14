import mongoose, { Schema, models, model, InferSchemaType } from "mongoose";

const CatSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  color: { type: String },
  isFriendly: { type: Boolean, default: true },
}, { timestamps: true });


export type CatDoc = InferSchemaType<typeof CatSchema> & { _id: string };

export default (models.Cat as mongoose.Model<CatDoc>) || model("Cat", CatSchema);
