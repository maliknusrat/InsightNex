import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const TopMostItem = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/topMostItem/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                console.log(data);
        })
    }, [user])

    return (
      <div className="max-w-7xl mx-auto my-14">
        <div className="border-b-[2px] max-w-6xl mx-auto border-gray-400">
          <h2 className="text-4xl font-serif text-center font-bold my-4">
          Top Most Items
          </h2>
        </div>
        <div className="grid grid-cols-4 mt-10 gap-5">
          {employees.map((employee) => (
            <div key={employee._id}>
              <div className="card card-compact w-72 bg-base-100 shadow-xl">
                <figure>
                  <img src={employee.image} alt="" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{employee.productName}</h2>

                  <p>Asset Type: {employee.productType}</p>
                  <p>Asset Quantity: {employee.quantity}</p>
                  <p>Publish Date: {employee.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default TopMostItem;