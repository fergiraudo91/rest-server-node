const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_ATLAS,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, resp) => {
        if (err) throw err;
        console.log(`Base de datos Online`);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
