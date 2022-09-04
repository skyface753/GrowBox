const express = require("express");
const MoistureService = require("./services/moisture_service");
var router = express.Router();

// PATH: /api/v1/
router.get("/", (req, res) => res.send("Hello World in API v1!"));

router.post("/moisture/insert", MoistureService.insert);
router.post("/moisture/get/dashboard", MoistureService.getDashboardData);

module.exports = router;
