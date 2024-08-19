/* eslint-disable react/prop-types */
import { useState } from 'react';
import ModalAsset from '../../Modal/ModalAsset';

const EveryAsset = ({ asset }) => {
    const [showModal, setShowModal] = useState(false);
    // console.log(asset);

    const handleCloseModalLike = () => {
        setShowModal(false);
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{asset.productName}</h2>
                <p>{asset.productType}</p>
                <p className="font-bold text-2xl">{asset.quantity>0 ? 'Available' : "Out-Of-Stock"}</p>
                <div className="card-actions justify-end">
                    <button onClick={()=>setShowModal(true)} disabled={asset.quantity<=0} className="btn btn-neutral">Request</button>
                </div>
            </div>
            <ModalAsset handleCloseModalLike={handleCloseModalLike} showModal={showModal} asset={asset}></ModalAsset>
        </div>
    );
};

export default EveryAsset;