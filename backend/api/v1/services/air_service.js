const Config = require("../../../config");
const sendResponse = require("../../../helpers/sendResponses");
const database = require("../../../appwrite").database;

let AirService = {
  insert: async (req, res) => {
    try {
      var { temperatur, humidity } = req.body;
      if (temperatur && humidity) {
        database.createDocument(Config.database.collections.air, "unique()", {
          temperatur: temperatur,
          humidity: humidity,
        });
        sendResponse.success(res, "Air quality inserted successfully");
        return;
      } else {
        sendResponse.badRequest(res, "Air quality or humidity is missing");
        return;
      }
    } catch (e) {
      sendResponse.serverError(res, "Something went wrong");
      return;
    }
  },
  getDashboardData: async (req, res) => {
    try {
      var docs = await database.listDocuments(Config.database.collections.air);
      // Order by created_at newest first
      docs.documents.sort((a, b) => {
        return b.$createdAt - a.$createdAt;
      });
      latest = docs.documents[0];
      sendResponse.success(res, {
        latest: {
          temperatur: latest.temperatur,
          humidity: latest.humidity,
          $createdAt: latest.$createdAt,
        },
        all: docs.documents.map((doc) => {
          return {
            temperatur: doc.temperatur,
            humidity: doc.humidity,
            $createdAt: doc.$createdAt,
          };
        }),
      });
    } catch (e) {
      console.log(e);
      sendResponse.serverError(res, "Something went wrong");
      return;
    }
  },
};

module.exports = AirService;
