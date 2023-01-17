const mongoose = require("mongoose");

const connectDB = async () => {
	try {
        mongoose.set("strictQuery", false);
		const connected = await mongoose.connect(process.env.MONGODB_URI, {});
		console.log('MongoDB connected on host: ${connected.connection.host}\n');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};

module.exports = connectDB;