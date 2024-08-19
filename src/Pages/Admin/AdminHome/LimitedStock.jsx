import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const LimitedStock = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/limitedStock/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                console.log(data);
        })
    }, [user])

    return (
        <div className="my-14">
            <div className="grid grid-cols-4 max-w-7xl mx-auto gap-3">
                {
                    employees.map(employee => <div key={employee._id}>
                        <div className="card card-compact w-72 bg-base-100 shadow-xl">
                            <figure><img src={employee.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{employee.productName}</h2>

                                <p>Asset Type: {employee.productType}</p>
                                <p>Asset Quantity: {employee.quantity}</p>
                                <p>Publish Date: {employee.date}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LimitedStock;