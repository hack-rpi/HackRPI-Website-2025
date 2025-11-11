// models/Score.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the TypeScript interface for the Score model
interface IScore extends Document {
  name: string;
  score: number;
}

// Create the Mongoose schema for the Score model
const scoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

// Create the Mongoose model for the Score
const Score: Model<IScore> = mongoose.models.Score || mongoose.model<IScore>('Score', scoreSchema);

export { Score };
