import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";


const MakeCustomRequest = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const date = new Date();
   
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/employee/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            }) 
    }, [user])

    const handleAssets = event =>{
        event.preventDefault();

        const form = event.target;
        const assetName = form.assetName.value;
        const price = form.price.value;
        const assestType = form.assestType.value;
        const image = form.image.value;
        const needThis = form.needThis.value;
        const addInfo = form.addInfo.value;
        const email = user?.email;
        const userName = user?.displayName;
        const userPhoto = user?.photoURL
        
        const newAssets = {
            assetName,
            assestType,
            price,
            image,
            needThis,
            addInfo,
            email,
            date: day + '-' + month + '-' + year,
            userName,
            userPhoto,
            status: 'pending',
            admin: profile.myAdmin
        }
        console.log(newAssets);

        //send data to server
        fetch('https://insight-store-server.vercel.app/customAsset', {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(newAssets)
        } )
        .then(res=>res.json()
        .then(data => {
            console.log(data);
            if(data.insertedId){
                form.reset();
                Swal.fire({
                    title:'Success!',
                    text:'Asset Added Successfully',
                    icon:'success',
                    confirmButtonText:'Cool!!!'

                })
            }
        }))
    }
    //https://insight-store-server-p6pqr878h-malik-nusrats-projects.vercel.app/
    return (
        <div>
            <div className="max-w-6xl mx-auto pt-20 pb-20">
                <h2 className="text-4xl font-serif font-medium text-center text-gray-700 mt-5 pb-5 border-b-2">
                    Make a Custom Request!!
                </h2>
                <div className="">
                    <form onSubmit={handleAssets} className="mt-10">
                        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6 ">

                            <div>

                                <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        name="assetName"
                                        placeholder="Asset Name"
                                        className="input rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Price"
                                        className="input rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <select
                                        className="input rounded-sm input-bordered border-black"
                                        name="assestType"
                                    >
                                        <option value="" disabled selected hidden>
                                        Assest Type
                                        </option>
                                        <option value="returnable">Returnable</option>
                                        <option value="nonReturnable">Non-Returnable</option>
                                    </select>
                                </div>

                                {/* <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        name="type"
                                        placeholder="Assest Type"
                                        className="input rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div> */}

                                <div className="form-control mb-3">

                                <input
                                        type="text"
                                        name="image"
                                        placeholder="Assest Image URL"
                                        className="input rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div>
                               

                            </div>

                            <div>

                            <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        name="needThis"
                                        placeholder="Why You need this"
                                        className="input h-20 rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        name="addInfo"
                                        placeholder="Additional Information"
                                        className="input h-20 rounded-sm input-bordered border-black"
                                        required
                                    />
                                </div>                                
                            </div>
                        </div>
                        <div className=" flex flex-col">
                        <div className="flex flex-col items-center form-control mt-6">
                            <button className="btn  w-1/2 btn-neutral rounded-none">Request</button>
                        </div>
                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default MakeCustomRequest;