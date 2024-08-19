// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import EveryAsset from "./EveryAsset";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

const RequestAsset = () => {
    const [assets, setAssets] = useState([]);
    const [records, setRecords] = useState([]);
    const [profile, setProfile] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/employee/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            }) 
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/addAsset/${profile?.myAdmin}`)
            .then(res => res.json())
            .then(data => {
                setAssets(data);
                setRecords(data);
        })
    }, [profile])

    const handleSearch = event => {
        setRecords(assets.filter(asset => asset.productName.toLowerCase().includes(event.target.value)));
    }

    const handleAvailable = () => {
        setRecords(assets.filter(asset => asset.quantity>0));
    }

    const handleOutOfStock = () => {
        setRecords(assets.filter(asset => asset.quantity<=0));
    }
    
    const handleReturnable = () => {
        setRecords(assets.filter(asset => asset.productType=='returnable'));
    }

    const handleNonReturnable = () => {
        setRecords(assets.filter(asset => asset.productType=='non returnable'));
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
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-5">
                    {
                        records.map(asset => <EveryAsset key={asset._id}
                            asset={asset}> 
                        </EveryAsset>)
                    }
                </div>
            </div>
        </div>
    );
};

export default RequestAsset;