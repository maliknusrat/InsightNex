// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyTeam = () => {
    const dateObject = new Date();
    const monthNumber = dateObject.getMonth() + 1;
    
    const [profile, setProfile] = useState([]);
    const [allInfo, setAllInfo] = useState([]);

    const { user } = useContext(AuthContext);
    let targetUser = [];
    let allUsers = [];

    useEffect(() => {
        fetch(`http://localhost:5000/myTeamInfo/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // setAdmin(data);
                allUsers.push(data)

                let adminDate = data.date;
                const findAdminDate = adminDate.split("-");
                if (findAdminDate[1] == monthNumber)
                {
                    targetUser.push(data)    
                }
                
                let team = data.myEmployee;
                for (let i = 0; i < team.length; i++){
                    allUsers.push(team[i]);
                    let findDate = team[i].date;
                    const findString = findDate.split("-");
                    if (findString[1] == monthNumber)
                    {
                        targetUser.push(team[i])    
                    } else if (findString[1] < monthNumber) {
                        team[i]['past']="Happy Birthday"
                    }
                }

                console.log(allUsers);
                console.log(targetUser);
                setAllInfo(allUsers.slice(0,(allUsers.length)/2))
                setProfile(targetUser.slice(0,(targetUser.length)/2))
            }) 
    }, [])

    return (
        <div>
            <p className="text-center mt-10 text-3xl font-bold">Upcoming Events</p>
            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-10">
                    {
                        profile.map(singleProfile => <div key={singleProfile._id}>
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={singleProfile.photo} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleProfile.name}</h2>
                                    <p>{singleProfile.type}</p>
                                    <p>{singleProfile?.past}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <p className="text-center mt-10 text-3xl font-bold">Team Members</p>
            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-10">
                    {
                        allInfo.map(singleProfile => <div key={singleProfile._id}>
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={singleProfile.photo} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleProfile.name}</h2>
                                    <p>{singleProfile.type}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyTeam;