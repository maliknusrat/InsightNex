import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import MyCustomRequest from "./MyCustomRequest";
import MyPendingRequest from './MyPendingRequest';
import ThisMonthRequest from './ThisMonthRequest';
import Footer from "../../../Shared/Footer/Footer";



const EmployeeHome = () => {
    const [employee, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/employee/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                // console.log(data);
        })
    }, [user])

    return (
        <div>
            {employee.myAdmin == 'null' && <p>Contact With Your Admin</p>}
            <p className="text-center text-4xl font-bold  my-10">My Custom Request</p>
            <MyCustomRequest></MyCustomRequest>
            <p className="text-center text-4xl font-bold my-10">My Pending Request</p>
            <MyPendingRequest></MyPendingRequest>
            <p className="text-center text-4xl font-bold my-10">This Month Request</p>
            <ThisMonthRequest></ThisMonthRequest>
            <Footer></Footer>
        </div>
    );
};

export default EmployeeHome;