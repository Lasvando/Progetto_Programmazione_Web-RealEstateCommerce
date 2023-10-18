const propertyController = require("../controllers/PropertyController");
const router = require("express").Router();
const Validators = require("../validators/Validators");
const JwtService = require("../services/JwtService");
const path = require('path')
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/properties/");
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  JwtService.authenticateToken,
  upload.array("photos", 12),
  Validators.createProperty,
  propertyController.create
);
router.get("/", propertyController.findAll);
router.get("/:id", propertyController.find);
router.put("/:id", JwtService.authenticateToken, propertyController.update);
router.delete(
  "/:id",
  JwtService.authenticateToken,
  propertyController.deleteById
);

module.exports = router;
