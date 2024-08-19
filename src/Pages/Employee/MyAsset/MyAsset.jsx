import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyAsset = () => {
    const [reqs, setReq] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    
    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/reqAssetCollection1/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setReq(data);
                setRecords(data)
        })
    }, [user])
    
    const handleCancelReq = id => {
        fetch(`https://insight-store-server.vercel.app/cancelAssetReq/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                Swal.fire({
                    title: 'Cancel the item Successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }
        })
    }

    const handleSearch = event => {
        setRecords(reqs.filter(asset => asset.productName.toLowerCase().includes(event.target.value)));
    }

    const handleAvailable = () => {
        setRecords(reqs.filter(asset => asset.quantity>0));
    }

    const handleOutOfStock = () => {
        setRecords(reqs.filter(asset => asset.quantity<=0));
    }
    
    const handleReturnable = () => {
        setRecords(reqs.filter(asset => asset.productType=='returnable'));
    }

    const handleNonReturnable = () => {
        setRecords(reqs.filter(asset => asset.productType=='non returnable'));
    }

    const handleReturn = id => {
        fetch(`https://insight-store-server.vercel.app/returnAsset/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Asset is Returned`,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/employeeHome')
            }
        })
    }

    return (
       <div>
        <div className="join flex items-center justify-center mt-10">
                <input onChange={handleSearch} className="input input-bordered join-item" placeholder="Product Name"/>
                <button className="btn join-item rounded-r-full">Search</button>
            </div>
            <div className="flex items-center justify-center gap-5 mt-10">
                <button onClick={handleAvailable} className="btn btn-active btn-neutral">Available</button>
                <button onClick={handleOutOfStock} className="btn btn-active btn-warning">Out-Of-Stock</button>
                <button onClick={handleReturnable} className="btn btn-active btn-secondary">Returnable</button>
                <button onClick={handleNonReturnable} className="btn btn-active btn-accent">Non-Returnable</button>
            </div>
         <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-5 mt-10">
                {
                    records.map(custom => <div key={custom._id}>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{custom.productName}</h2>
                                <p>Type: {custom.productType}</p>
                                {custom.status == 'pending' ? "" : <p>Approval Date: {custom.approvalDate}</p>}
                                <p>Request Date: {custom.date}</p>
                                <p>Status: {custom.status}</p>
                                <div className="card-actions justify-end">
                                    {custom.status == 'pending' && <button onClick={() => { handleCancelReq(custom._id) }} className="btn btn-primary">Cancel</button>}
                                    {custom.status == 'Approved' && <Link to={`/myAsset/${custom._id}`} className="btn btn-primary">Download</Link>}
                                    {custom.status == 'Approved' && custom.productType == 'returnable' && <button onClick={() => { handleReturn(custom._id) }} className="btn btn-primary">Return</button>}
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
       </div>

    );
};

export default MyAsset;