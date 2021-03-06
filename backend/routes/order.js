const express = require("express");
const multer = require("multer");
const {
  createOrder,
  getAllPaginatedOrdersForUser,
  toggleOrderActive,
  getAllPaginatedOrders,
  getAllOrders,
  needNewPageMyOrder
} = require("../controllers/order");
const { requireRegular } = require("../helpers/roleCheck");
const upload = multer();
const router = express.Router();

router
  .route("/")
  .get(requireRegular, getAllOrders)
  .post(requireRegular, upload.none(), createOrder);

router.get("/my", requireRegular, getAllPaginatedOrdersForUser);
router.get("/paginated", getAllPaginatedOrders)

router.get("/neednew/:pageSize", needNewPageMyOrder)
router.post("/toggleactive/:order", toggleOrderActive);

module.exports = router;
