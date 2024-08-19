// import React from 'react';

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    const response = await fetch(
      `https://insight-store-server.vercel.app/employee/${user?.email}`
    );
    const data = await response.json();
    console.log(data.myEmployee);
    setEmployees(data.myEmployee);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleRemove = (employee) => {
    const employeeAddedInfo = {
      name: employee.name,
      email: employee.email,
      photo: employee.photo,
      type: employee.type,
    };

    fetch(`https://insight-store-server.vercel.app/removeEmployeeToAdmin/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(employeeAddedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          fetch(`https://insight-store-server.vercel.app/removeAdmin/${employee.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ yourAdmin: user?.email }),
          })
            .then((res) => res.json())
            .then((data2) => {
              console.log(data2);
              if (data2.modifiedCount > 0) {
                fetchData();
                Swal.fire({
                  title: "Remove Your Team Member Successfully",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              }
            });
        }
      });
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of items per page

  // Calculate the indices for slicing the array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-6xl my-10 mx-auto">
      {employees.length == 0 ? <p>You Have No Team Member</p> : ""}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white shadow-lg">
          {/* Table Header */}
          <thead>
            <tr className="h-[70px] border-b bg-[#141B29] text-[#FFFFFF]">
              <th className="px-6 py-4 text-start">User</th>
              <th className="px-6 py-4 text-start">Name</th>
              <th className="px-6 py-4 text-start">Type</th>
              <th className="px-6 py-4 text-start">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
            {currentEmployees?.map((employee) => (
              <tr
                key={employee._id}
                className="h-[70px] border-b bg-[#484D58] text-[#FFFFFF]"
              >
                <th className="px-6 py-4 text-start">
                  <img
                    className="h-[44px] w-[44px] rounded-full bg-slate-500 object-cover"
                    src={employee.photo}
                  />
                </th>
                <th className="px-6 py-4 text-start ">{employee.name}</th>
                <th className="px-6 py-4 text-start ">{employee.type}</th>
                <th className="px-6 py-4 text-start">
                  <button
                    onClick={() => {
                      handleRemove(employee);
                    }}
                    className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="mr-2 h-6 w-6"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />{" "}
                    </svg>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 px-3 py-2 rounded-lg ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
        
      </div>
    </div>
  );
};

export default MyEmployeeList;
