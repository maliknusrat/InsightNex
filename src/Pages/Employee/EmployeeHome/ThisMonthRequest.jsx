import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const ThisMonthRequest = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);
    let targetProduct = [];
    const dateObject = new Date();
    const monthNumber = dateObject.getMonth() + 1;

    useEffect(() => {
        fetch(`http://localhost:5000/myPendingRequest1234/${user?.email}`)
            .then(res => res.json())
            .then(data => {

                for (let i = 0; i < data.length; i++){
                    let findDate = data[i].date;
                    const findString = findDate.split("-");
                    if (findString[1] == monthNumber)
                    {
                        targetProduct.push(data[i])    
                    }
                }

                setEmployees(targetProduct);
                // console.log(targetProduct);
        })
    }, [user])

    return (
        <div className="flex items-center justify-center mt-5 mb-10">
            <div className="grid grid-cols-3 max-w-6xl mx-auto gap-5">
                {
                    employees.map(employee => <div key={employee._id}>
                        <div className="card card-compact w-80 bg-base-100 shadow-xl">
                            <figure><img src={employee.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{employee.productName}</h2>

                                <p>Asset Type: {employee.productType}</p>
                                <p>Asset Quantity: {employee.quantity}</p>
                                <p>Request Date: {employee.date}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ThisMonthRequest;