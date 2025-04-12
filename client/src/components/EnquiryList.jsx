import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function EnquiryList({ data, getAllEnquiries, Swal, setFormData }) {
  let handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/website/enquiry/delete/${id}`)
          .then(() => {
            toast.success("enquiry deleted successfully!");
            getAllEnquiries();
          });
      } else if (result.isDenied) {
        Swal.fire("data not deleted", "", "info");
      }
    });
  };

  let handleEdit = (id) => {
    axios.get(`http://localhost:8000/api/website/enquiry/findById/${id}`).then((res)=>{
      let data = res.data;
      setFormData(data.enquiry)
    });

  };

  return (
    <div className="bg-blue-200 p-4">
      {/* <ToastContainer/> */}
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Delete</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  No data found
                </TableCell>
              </TableRow>
            )}
            {/* <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                1
              </TableCell>
              <TableCell>swapnil</TableCell>
              <TableCell>swapnil@gmail.com</TableCell>
              <TableCell>1111</TableCell>
              <TableCell>done</TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Delete
                </a>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
