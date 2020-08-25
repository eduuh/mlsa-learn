const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Mongo did not connect: ${err}`);
  }
};

module.exports = connectDb;
