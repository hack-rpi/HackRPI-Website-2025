import mongoose, { Schema, model, models, InferSchemaType } from "mongoose";

const ScheduleSchema = new Schema(
	{
		name: { type: String, required: true },
		location: { type: String, required: true },
		host: { type: String, default: "" },
		description: { type: String, default: "" },
		event_created_by: { type: String, required: true },

		start_time: { type: Date, required: true },
		end_time: { type: Date, required: true },

		column: { type: Number, required: true, enum: [1, 2, 3, 4] },
		discord_auto_announce: { type: Boolean, required: true, default: false },

		event_type: {
			type: String,
			required: true,
			enum: ["ceremony", "workshop", "food", "fireside chat", "mentoring", "event"],
		},
	},
	{ timestamps: true },
);

//prevent schema staleness in Next.js dev
if (process.env.NODE_ENV === "development") {
	delete (mongoose.connection.models as any).Schedule;
}

export type ScheduleDoc = InferSchemaType<typeof ScheduleSchema> & { _id: string };
export default (models.Schedule as mongoose.Model<ScheduleDoc>) || model<ScheduleDoc>("Schedule", ScheduleSchema);
