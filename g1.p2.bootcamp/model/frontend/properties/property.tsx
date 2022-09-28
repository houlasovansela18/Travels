import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
	images: {
		type: Array,
	},
	title: {
		type: String,
	},
	subtitle: {
		type: String,
	},
	category: {
		type: String,
	},
	description: {
		property_type: {
			type: String,
		},
		bedrooms: {
			type: Number,
		},
		beds: {
			type: Number,
		},
		bathrooms: {
			type: Number,
		},
		desribe: {
			type: String,
		},
	},
	coordination: {
		type: Array,
	},
	zone: {
		type: String,
	},
	price: {
		type: Number,
	},
	discount: {
		type: Number,
	},
	branch_id: {
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
	like: {
		type: Array,
	},
});

let Property: any;

try {
	Property = mongoose.model("property");
} catch (err) {
	Property = mongoose.model("property", propertySchema);
}

export default Property;
