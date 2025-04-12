const enquiryModel = require("../../models/enquiryModel");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  let enquiry = new enquiryModel({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "enquiry saved successfully!" });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "enquiry while saving enquiry!",
        error: err,
      });
    });
};

let enquiryList = async (req, res) => {
  let enquiry = await enquiryModel.find();
  res.send({ status: 1, enquiryList: enquiry });
};

let enquiryDelete = async (req, res) => {
  let id = req.params.id;
  let enquiry = await enquiryModel.deleteOne({ _id: id });
  res.send({ status: 1, message: "enquiry deleted successfully!", enquiry });
};

let getDataById = async (req, res) => {
  let id = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: id });
  res.send({ status: 1, enquiry });
};

let enquiryUpdate = async (req, res) => {
  let id = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };
  let updateRes = await enquiryModel.updateOne({ _id: id }, updateObj);
  res.send({ status: 1, message: "enquiry updated successfully", updateRes });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  getDataById,
  enquiryUpdate
};
