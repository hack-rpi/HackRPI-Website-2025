import Cat from "./models/Cat";
import { connectDB } from "./mongodb";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log("MongoDB Connected");
    
    // Create and save the cat document
    const Evvie = new Cat({ name: "oh boy" });
    await Evvie.save();
    
    // Send a success response
    res.status(200).json({ message: "Cat created and saved!" });
  } catch (error) {
    console.error("Error in MongoDB operation:", error);
    res.status(500).json({ error: "Failed to create cat" });
  }
}

export async function GET() {
	try {
		await connectDB();
		const announcements = await Announcement.find().sort({ time: -1 });
		console.log("Announcements from DB:", announcements);
		return NextResponse.json(announcements);
	} catch (error) {
		console.error("❌ Error fetching announcements:", error);
		return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const { title, message, links, name } = body;

		if (!title || !message || !name) {
			return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
		}

		await connectDB();

		const newAnnouncement = new Announcement({
			title,
			message,
			links,
			name,
			time: new Date(), // optional, since your schema defaults this
		});

		const saved = await newAnnouncement.save();

		console.log("✅ New announcement saved:", saved);
		return NextResponse.json(saved, { status: 201 });
	} catch (error) {
		console.error("❌ Error saving announcement:", error);
		return NextResponse.json({ error: "Failed to save announcement." }, { status: 500 });
	}
}


/*import connectDB from "./mongodb";
import Cat from "./models/Cat";

/*export default async function CreateMongoDBCat(){
  await connectDB();
  console.log("This is Cat")
  console.log(JSON.stringify(Cat));

  const Evvie = new Cat({name: "oh boy"});
  Evvie.speak();
  await Evvie.save();
}*/

/*const scheduleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true, default: ""},
  startTime: {type: Date, required: true},
  endTime: {type: Date, required: true},
  willAnnounce: {type: Boolean, required: true, default: false},
  column: {type: Number, required: true}
})*/


/*async function leTest(){
  const Evvie = new Cat({name: "Willow"});
  console.log(Evvie.name);
  Evvie.speak()
  await Evvie.save();
}*/
