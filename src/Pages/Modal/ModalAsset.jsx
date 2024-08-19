/* eslint-disable react/prop-types */
// import React from 'react';

import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const ModalAsset = ({ handleCloseModalLike, showModal, asset }) => {
    const { user } = useContext(AuthContext);
    
    if (!showModal) {
        return;
    }

    // console.log(asset);

    const handleRequest = () => {

        const assetInfo = {
            productName: asset.productName,
            productType: asset.productType,
            quantity: asset.quantity,
            date: asset.date,
            admin: asset.admin,
            employeeEmail: user?.email,
            employeeName: user?.displayName,
            additional_info: document.getElementById('addInfo').value,
            status: 'pending'
        }

        console.log(assetInfo);
        
        fetch('https://insight-store-server.vercel.app/requestAsset', {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(assetInfo)
        } )
        .then(res=>res.json())
        .then(data => {
            // console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title:'Success!',
                    text:'Asset Added Successfully',
                    icon:'success',
                    confirmButtonText:'Ok!!!'

                })
            }
        })

    }

    return (
        <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4 backdrop-blur-sm">
            <div className="bg-slate-400 p-6 rounded-3xl w-full md:w-[500px] lg:w-[500px]">
                <div className="form-control mb-3">
                    <input
                        type="text" id="addInfo" placeholder="Additional Information"
                        className="input h-20 rounded-sm input-bordered border-black"
                        required
                    />
                </div> 
                <div className="form-control mb-3">
                    <input
                        type="button"
                        onClick={handleRequest}
                        className="btn btn-neutral"
                        value="Request"
                    />
                </div> 
                <div className="text-right">
                    <button onClick={handleCloseModalLike} className="btn btn-primary mt-5 text-center">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAsset;