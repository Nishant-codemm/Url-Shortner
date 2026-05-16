const {
  handleLinkCreation,
  handleLinkRead,
  handleUrlUpdation,
  handleUrlDeletion,
  handleSlugRandom,
  handleSlugUserUrl,
  handleOneUrlAnalyticsAndQrCode,
  handleQrCreation,
} = require("../../controllers/link");
const { isUserOrAdmin } = require("../../middleware/authMiddleware");

const router = require("express").Router();

router
  .route("/link")
  .post(isUserOrAdmin, handleLinkCreation)
  .get(isUserOrAdmin, handleLinkRead).put(isUserOrAdmin,handleUrlUpdation).delete(isUserOrAdmin,handleUrlDeletion);// update , delete testing remaining and then frontedn
router.get("/u/:slug", handleSlugUserUrl);       
router.get("/analytics",isUserOrAdmin, handleOneUrlAnalyticsAndQrCode);
router.get("/:slug", handleSlugRandom);  
router.get("/link/qr",isUserOrAdmin,handleQrCreation);         


module.exports = router;
