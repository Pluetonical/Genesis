const logger = require("../modules/logger.js");

module.exports = {
  name: "error",
  once: false,
  async execute(error) {
    console.log(`An error regarding DJS occurred: \n${JSON.stringify(error)}`, "error");
  }
};