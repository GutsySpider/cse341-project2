const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Project 2 API",
    description: "Vehicles & Competitors API",
  },

  host: "localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
