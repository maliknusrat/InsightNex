import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";


const CustomRequestList = () => {
    const [assets, setAssets] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/customAssetCollection/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAssets(data);
        })
    }, [user])
    
    const handleMakeApproved = (id) => {
        fetch(`http://localhost:5000/admin/approved/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Asset is Approved`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleMakeRejected = (id) => {
        fetch(`http://localhost:5000/admin/rejected/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Asset is Rejected`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className="max-w-6xl mx-auto ">
            {
                assets.map(asset => <div key={asset._id} className="border border-gray-800 rounded-md mb-10">
                    <div className="grid grid-cols-3 items-center p-5">
                        <div className="col-span-2">
                            <p className="text-3xl uppercase font-semibold pb-3">{asset.assetName}</p>
                            <p className="text-2xl text-blue-600 font-semibold pb-3">{asset.assestType}</p>
                            <p className="text-xl pb-3"><span className="font-bold">Price:</span> ${asset.price}</p>
                            <p className="text-xl pb-3 text-justify">Why Need This: {asset.needThis}</p>
                            <p className="text-xl pb-3 text-justify">Additional Info: {asset.addInfo}</p>
                            <p className="text-xl font-bold pb-3">Status: <span className={`${asset.status === 'Approved' ? 'text-green-500': 'text-red-600'   }`}>{asset.status}</span></p>
                            <div className="flex">
                                <button onClick={()=> handleMakeApproved(asset._id)} disabled={asset.status === 'Approved' || asset.status == 'Rejected'} className="btn btn-success mr-5">Accepted</button>
                                <button onClick={()=> handleMakeRejected(asset._id)} disabled={asset.status === 'Approved' || asset.status == 'Rejected'} className="btn btn-error mr-5">Rejected</button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={asset.image} alt="" className="w-[80%]"/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default CustomRequestList;