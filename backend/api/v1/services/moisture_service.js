const Config = require("../../../config");
const sendResponse = require("../../../helpers/sendResponses");
const database = require("../../../appwrite").database;
const { Webhook } = require("discord-webhook-node");
const hook = new Webhook(Config.discord.webhook);
hook.setUsername("Moisture Sensor");
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
        if (moisture < 50) {
          hook.send(
            `@everyone Sensor ${sensor_id} is under 50% moisture ${moisture}%`
          );
        }
        sendResponse.success(res, "Moisture inserted successfully");
        return;
      } else {
        sendResponse.badRequest(res, "Moisture or sensor_id is missing");
        return;
      }
    } catch (e) {
      console.log(e);
      sendResponse.serverError(res, "Something went wrong");
      return;
    }
  },
  getDashboardData: async (req, res) => {
    try {
      var docs = await database.listDocuments(
        Config.database.collections.moisture
      );
      var docsReverse = docs.documents.reverse();

      var lastPerSensor = {};
      docs.documents.forEach((doc) => {
        if (
          !lastPerSensor[doc.sensor_id] ||
          doc.$createdAt > lastPerSensor[doc.sensor_id].$createdAt
        ) {
          lastPerSensor[doc.sensor_id] = {
            moisture: doc.moisture,
            $createdAt: doc.$createdAt,
            sensor_id: doc.sensor_id,
          };
        }
      });
      var groupedBySensor = {};
      docs.documents.forEach((doc) => {
        if (!groupedBySensor[doc.sensor_id]) {
          groupedBySensor[doc.sensor_id] = [];
        }

        groupedBySensor[doc.sensor_id].push({
          moisture: doc.moisture,
          $createdAt: doc.$createdAt,
          sensor_id: doc.sensor_id,
        });
      });

      sendResponse.success(res, {
        lastPerSensor: lastPerSensor,
        all: docsReverse,
        groupedBySensor: groupedBySensor,
      });
    } catch (e) {
      console.log(e);
      sendResponse.serverError(res, "Something went wrong");
      return;
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
