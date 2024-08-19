import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";

const PendingRequest = () => {
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://insight-store-server.vercel.app/mypendingRequest12345/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        console.log(data);
        // console.log(data.myEmployee);
      });
  }, [user]);
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="border-b-[2px] max-w-6xl mx-auto border-gray-400">
        <h2 className="text-4xl font-serif text-center font-bold my-4">Pending Request</h2>
      </div>
      <div className="grid grid-cols-4 mt-9">
      
        {employees.map((employee) => (
          <div key={employee._id}>
            <div className="card card-compact mb-9 w-72 bg-base-100 shadow-xl">
              {/* <figure><img src={employee.image} alt="" /></figure> */}
              <div className="card-body">
                <h2 className="card-title">{employee.productName}</h2>

                <p>Asset Type: {employee.productType}</p>
                <p>Asset Quantity: {employee.quantity}</p>
                <p>Date: {employee.date}</p>
                <p>Status: {employee.status}</p>

                {/* <div className="card-actions justify-end">
                                <Link to={`/updatedDetaild/${employee._id}`} className="btn btn-neutral text-white">View Details</Link>
                            </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequest;
