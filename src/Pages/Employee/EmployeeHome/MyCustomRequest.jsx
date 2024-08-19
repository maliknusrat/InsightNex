import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const MyCustomRequest = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/mycustomRequest123/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                console.log(data);
                // console.log(data.myEmployee);
        })
    }, [user])



    return (
        <div className="flex items-center justify-center mt-5">
            <div className="grid grid-cols-3 max-w-6xl mx-auto gap-5">
                {
                    employees.map(employee => <div key={employee._id}>
                        <div className="card card-compact w-80 bg-base-100 shadow-xl">
                            <figure><img src={employee.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{employee.assetName}</h2>

                                <p>Asset Type: {employee.assestType}</p>
                                <p>Asset price: {employee.price}</p>
                                {/* <p>Asset Type: {employee.assestType}</p> */}
                                <div className="card-actions justify-end">
                                    <Link to={`/updatedDetails/${employee._id}`} className="btn btn-neutral text-white">View Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyCustomRequest;