import React, { useEffect, useState } from "react";
// only import what you want to use
import {
  Button,
  Checkbox,
  Label,
  Textarea,
  TextInput,
  Toast,
} from "flowbite-react";
import EnquiryList from "./EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      //update
      axios
        .put(
          `http://localhost:8000/api/website/enquiry/updateById/${formData._id}`,
          formData
        )
        .then(() => {
          toast.success("enquiry updated successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllEnquiries();
        });
    } else {
      //insert
      axios
        .post("http://localhost:8000/api/website/enquiry/insert", formData)
        .then(() => {
          toast.success("enquiry saved successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getAllEnquiries();
        });
    }
  };

  let getAllEnquiries = () => {
    axios
      .get("http://localhost:8000/api/website/enquiry/view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      });
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-blue-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" color="black">
                Name
              </Label>
              <TextInput
                type="text"
                placeholder="Enter your name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Label htmlFor="name" color="black">
                Email
              </Label>
              <TextInput
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Label htmlFor="name" color="black">
                Phone
              </Label>
              <TextInput
                type="text"
                placeholder="Enter your phone"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Label htmlFor="name" color="black">
                Message
              </Label>
              <Textarea
                placeholder="Message..."
                required
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="w-[100%]">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllEnquiries={getAllEnquiries}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
