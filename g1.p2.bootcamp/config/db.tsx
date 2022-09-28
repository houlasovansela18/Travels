import mongoose from "mongoose";
const db_url = `${process.env.DB_URL}`;
const connect = () => {
	mongoose.connect(db_url, (err) => {
		if (err) console.log("Error connecting to MongoDB");
	});
};

export default connect;
