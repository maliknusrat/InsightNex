/* eslint-disable react/prop-types */

import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const SingleMember = ({ employee, fetchData }) => {
  let val = localStorage.getItem("package");
  const { user } = useContext(AuthContext);
  const { myAdmin } = employee;
  console.log(myAdmin);
  console.log(employee.email);

  const handleAdd = (employee) => {
    const employeeAddedInfo = {
      name: employee.name,
      email: employee.email,
      photo: employee.photo,
      type: employee.type,
      date: employee.date,
    };

    fetch(`https://insight-store-server.vercel.app/addEmployeeToAdmin/${user?.email}`, {
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
          fetch(`https://insight-store-server.vercel.app/addAdmin/${employee.email}`, {
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

  return (
    // <div className="card card-compact w-96 bg-base-100 shadow-xl">
    //     <figure><img src={employee.photo} alt="" /></figure>
    //     <div className="card-body">
    //         <h2 className="card-title">{employee.name}</h2>
    //         <p>{employee.email}</p>
    //         <p>Member Type: {employee.type}</p>
    //         <div className="card-actions justify-end">
    //             <button disabled={employee.myAdmin!="null" || val<=0} onClick={()=>{handleAdd(employee)}} className="btn btn-neutral text-white">Add</button>
    //         </div>
    //     </div>
    // </div>
    <div className="">
      <div>
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
            disabled={employee.myAdmin != "null" || val <= 0}
            onClick={() => {
              handleAdd(employee);
            }}
            className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
          >
            Add Member
          </button>
        </th>
      </div>
    </div>
  );
};

export default SingleMember;
