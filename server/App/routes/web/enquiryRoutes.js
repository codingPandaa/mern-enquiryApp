let express = require("express");
const {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  getDataById,
  enquiryUpdate,
} = require("../../controller/web/enquiryController");

let enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);

enquiryRouter.get("/view", enquiryList);

enquiryRouter.delete("/delete/:id", enquiryDelete);

enquiryRouter.get("/findById/:id", getDataById);

enquiryRouter.put("/updateById/:id", enquiryUpdate);

module.exports = enquiryRouter;
