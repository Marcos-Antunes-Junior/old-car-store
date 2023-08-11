const express = require("express");
const router = express.Router();

// Static Routes
// Use public folder > subfolders for the static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));


module.exports = router;