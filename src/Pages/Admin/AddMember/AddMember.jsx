/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const AddMember = () => {
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(AuthContext);

  let val = localStorage.getItem("package");
  console.log(val);
  
  // const { myAdmin } = employee;
  // console.log(myAdmin);
  // console.log(employee.email);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/findEmployee`);
    const data = await response.json();
    setEmployees(data);
  };


  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAdd = (employee) => {
    const employeeAddedInfo = {
      name: employee.name,
      email: employee.email,
      photo: employee.photo,
      type: employee.type,
      date: employee.date,
    };

    fetch(`http://localhost:5000/addEmployeeToAdmin/${user?.email}`, {
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
          fetch(`http://localhost:5000/addAdmin/${employee.email}`, {
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
                  title: "Added Your Team Successfully",
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
      <table className="min-w-full border border-gray-200 bg-white shadow-lg">
        {/* Table Header */}
        <thead>
          <tr className="h-[70px] border-b bg-[#141B29] text-[#FFFFFF]">
            <th className="px-6 py-4 text-start">User</th>
            <th className="px-6 py-4 text-start">Name</th>
            <th className="px-6 py-4 text-start">Email</th>
            <th className="px-6 py-4 text-start">Type</th>
            <th className="px-6 py-4 text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
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
              <th className="px-6 py-4 text-start ">{employee.email}</th>
              <th className="px-6 py-4 text-start ">{employee.type}</th>
              <th className="px-6 py-4 text-start">
                <button
                  disabled={employee.myAdmin !== 'null'|| val<=0}
                  onClick={() => {
                    handleAdd(employee);
                  }}
                  className='flex items-center rounded-full  px-4 py-2 font-bold text-white  shadow-md transition-all duration-300 hover:bg-red-700  bg-red-500'
                >
                {
                  employee.myAdmin == "null" ? <span>Add Member</span> : <span className="hover:bg-none">Added</span>
                }
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
  );
};

export default AddMember;
