// import React from 'react';

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/employee/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            }) 
    }, [user])
    
    const handleUpdate = event => {
        
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;

        const userInfo = {
            name: name,
            date: date
        }

        console.log(userInfo);

        fetch(`https://insight-store-server.vercel.app/updateInfo/${user?.email}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Update Your Information Successfully',
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
    return (
        <div className="flex  flex-col items-center justify-center mt-20">
            <form onSubmit={handleUpdate} >
                <div className="form-control ">
                    <input type="text" name="name" placeholder="name" className="input w-[400px] my-2 rounded-sm input-bordered" required defaultValue={profile.name}/>
                </div>
                <div className="form-control">
                    <input type="email" disabled name="email" placeholder="email" className="input rounded-sm  w-[400px] my-2 input-bordered" required defaultValue={profile.email}/>
                </div>
                <div className="form-control">
                    <input type="date" name="date" placeholder="Date of Birth" className="input rounded-sm  w-[400px] my-2 input-bordered" required defaultValue={profile.date}/>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-neutral rounded-none" type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default Profile;