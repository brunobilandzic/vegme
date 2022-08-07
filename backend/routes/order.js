const express = require("express");
const multer = require("multer");
const {
  createOrder,
  getAllPaginatedOrdersForUser,
  toggleOrderActive,
  getAllPaginatedOrders,
  getAllOrders,
  needNewPageMyOrder,
  getAllPersonalOrdersForCook,
  appendMealsToOrder,
  getOneOrder,
  removeMealFromOrder
} = require("../controllers/order");
const { requireRegular } = require("../helpers/roleCheck");
const upload = multer();
const router = express.Router();

router
  .route("/")
  .get(requireRegular, getAllOrders)
  .post(requireRegular, upload.none(), createOrder);
router.get("/single/:orderId", getOneOrder)
router.get("/my", requireRegular, getAllPaginatedOrdersForUser);
router.get("/personal", requireRegular, getAllPersonalOrdersForCook);
router.get("/paginated", getAllPaginatedOrders);

router.get("/neednew/:pageSize", needNewPageMyOrder);
router.post("/append",requireRegular, appendMealsToOrder)
router.post("/toggleactive/:order", toggleOrderActive);

router.delete("/remove", removeMealFromOrder)

module.exports = router;
