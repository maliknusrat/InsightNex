import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdatedDetail = () => {
    const {id} = useParams();
    const [employee, setEmployees] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/mycustomRequest123Details/${id}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                console.log(data);
        })
    }, [id])

    const handleUpdate = () => {
        setUpdate(true);
        const assetName = document.getElementById('name').value;
        const assetType = document.getElementById('assetType').value;
        const price = document.getElementById('price').value;
        const needInfo = document.getElementById('needInfo').value;
        const addInfo = document.getElementById('addInfo').value;
        const status = document.getElementById('status').value;
        const date = document.getElementById('date').value;
        const id = document.getElementById('id').value;

        const updateInfo = {
            assetName: assetName,
            assetType: assetType,
            price: price,
            needInfo: needInfo,
            addInfo: addInfo,
            status: status,
            date: date
        }

        fetch(`http://localhost:5000/updateCustomAsset/${id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Update Asset Information Successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                    navigate('/employeeHome');
            }
        })
    }

    const handleNotUpdate = () => {
        setUpdate(false);
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="w-[800px] bg-base-100 px-4 shadow-xl">
                    <figure><img src={employee.image} alt="" /></figure>
                    <div>
                        {!update && <h2 className="font-bold mb-2">{employee.assetName}</h2>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.assetName} id="name" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee._id} id="id" placeholder="Product Name" className="input hidden rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="mb-2">Asset Type: {employee.assestType}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.assestType} id="assetType" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="mb-2">Asset price: {employee.price}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.price} id="price" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="text-justify mb-2">{employee.needThis}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.needThis} id="needInfo" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="text-justify mb-2">{employee.addInfo}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.addInfo} id="addInfo" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="mb-2">Asset Status: {employee.status}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.status} readOnly id="status" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                        {!update && <p className="mb-2">Asset Request Date: {employee.date}</p>}
                        {update && <div className="mb-2 form-control">
                            <input type="text" defaultValue={employee.date} id="date" placeholder="Product Name" className="input rounded-sm input-bordered" required />
                        </div>}
                    </div>
                    <div className="mt-10 flex justify-end mb-10">
                        {employee.status == 'pending' && <button onClick={handleUpdate} className="btn btn-warning ml-8">{!update ? 'Update': 'Save'}</button>}
                        <button onClick={handleNotUpdate} className="btn btn-warning ml-8">Close</button>
                    </div>
                </div>
                    </div>
        </div>
    );
};

export default UpdatedDetail;