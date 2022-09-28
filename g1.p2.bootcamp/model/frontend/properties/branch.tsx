import mongoose from "mongoose";
const branchSchema = new mongoose.Schema({
	profile_url: {
		type: String,
	},
	cover: {
		type: String,
	},
	category: {
		type: String,
	},
	title: {
		type: String,
	},
	subtitle: {
		type: String,
	},
	description: {
		type: String,
	},
	p_lat: {
		type: Number,
	},
	p_long: {
		type: Number,
	},
	zone: {
		type: String,
	},
	created_by: {
		type: String,
	},
	created_at: {
		type: Date,
	},
	status: {
		type: Number,
	},
});

let Branch: any;

try {
	Branch = mongoose.model("branch");
} catch (err) {
	Branch = mongoose.model("branch", branchSchema);
}

export default Branch;
