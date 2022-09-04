const sdk = require("node-appwrite");
const Config = require("./config");

let client = new sdk.Client();

const database = new sdk.Databases(client, Config.database.id);

client
  .setEndpoint("https://appwrite.skyface.de/v1") // Your API Endpoint
  .setProject("6314bb60849661718df1") // Your project ID
  .setKey(Config.apiKey);

let AppwriteCustom = {
  database: database,
  client: client,
};

module.exports = AppwriteCustom;
