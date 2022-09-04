const Config = require("../../../config");
const sendResponse = require("../../../helpers/sendResponses");
const database = require("../../../appwrite").database;

let MoistureService = {
  insert: async (req, res) => {
    try {
      var moisture = req.body.moisture;
      var sensor_id = req.body.sensor_id;
      if (moisture && sensor_id) {
        database.createDocument(
          Config.database.collections.moisture,
          "unique()",
          {
            moisture: moisture,
            sensor_id: sensor_id,
          }
        );
        res.send("OK");
        return;
      } else {
        res.status(400).send("Bad Request");
      }
    } catch (e) {
      res.status(400).send("Bad Request");
    }
  },
  getDashboardData: async (req, res) => {
    try {
      var docs = await database.listDocuments(
        Config.database.collections.moisture
      );
      // Order by created_at newest first
      docs.documents.sort((a, b) => {
        return b.$createdAt - a.$createdAt;
      });

      var lastPerSensor = {};
      docs.documents.forEach((doc) => {
        if (!lastPerSensor[doc.sensor_id]) {
          lastPerSensor[doc.sensor_id] = doc;
        }
      });
      sendResponse.success(res, {
        lastPerSensor: lastPerSensor,
        all: docs.documents,
      });
    } catch (e) {
      res.status(400).send("Bad Request");
    }
  },
};

module.exports = MoistureService;

// app.post("/api/v1/moisture/insert", (req, res) => {
//   try {
//     console.log(req.body);
//
// });

// app.get("/api/v1/moisture/get", async (req, res) => {
//
// });
