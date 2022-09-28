import mongoose from "mongoose";
const LikingSchema = new mongoose.Schema({
	property_id: {
		type: String,
	},
	liker_id: {
		type: String,
	},
	liked_at: {
		type: Date,
	},
	like: {
		type: Boolean,
	},
	status: {
		type: Number,
	},
});

let Like: any;

try {
	Like = mongoose.model("like");
} catch (err) {
	Like = mongoose.model("like", LikingSchema);
}

export default Like;
