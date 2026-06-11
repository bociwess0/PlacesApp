const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const placesControllers = require("../controllers/places-controller");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/:pid", placesControllers.getPlaceById);


router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace,
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
