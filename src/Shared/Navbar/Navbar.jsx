import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidUser, } from "react-icons/bi";
import { FaUserMinus } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { Image } from "antd";
import img1 from "../../assets/logo.png"


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    let type;
    if (localStorage.getItem('type')){
        type = localStorage.getItem('type');
    }

    const navigate = useNavigate();
    const logoutHandler = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('type')
                if (localStorage.getItem('package')) {
                    localStorage.removeItem('package');
                }
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const login = <>
        {user ? <div className="flex flex-row items-center gap-4 ">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            // width={200}
            src={user.photoURL}
          />
        </div>
      </label>
            <div><h2 className="text-sm">{user.displayName}</h2></div>
            <FaUserMinus onClick={logoutHandler} className="text-red-600 text-3xl hover:text-slate-800"></FaUserMinus> </div> : <NavLink to='/login' className={({ isActive }) => isActive ? "text-red-600 underline" : ''}> <BiSolidUser className="p-2 text-red-600 text-5xl"></BiSolidUser></NavLink>}
    </>



    const navlinks = <>
        {!type && <li><NavLink to='/' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Home</NavLink></li>}
        {!type && <li><NavLink to='/signup' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Join As Employee</NavLink></li>}
        {!type && <li><NavLink to='/signUpHR' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Join As HR/Admin</NavLink></li>}
        

       {/* Employee */}

        {type=='employee' && <li><NavLink to='/employeeHome' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Home</NavLink></li>}
        {type=='employee' && <li><NavLink to='/myAsset' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>My Assests</NavLink></li>}
        {type=='employee' && <li><NavLink to='/myTeam' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>My Team</NavLink></li>}
        {type=='employee' && <li><NavLink to='/requestAsset' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Request for an Asset</NavLink></li>}
        {type=='employee' && <li><NavLink to='/customRequest' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Make a Coustom Request</NavLink></li>}
        {type=='employee' && <li><NavLink to='/profile' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Profile</NavLink></li>}

        

        {/* Admin */}

        {type == 'admin' && <li><NavLink to='/adminHome' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Home</NavLink></li>}
        
        {type=='admin' &&<li><NavLink to='/assetList' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Asset List</NavLink></li>}

        {type=='admin' &&<li><NavLink to='/addAssets' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Add An Asset</NavLink></li>}

        {type=='admin' &&<li><NavLink to='/allRequest' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>All  Requests</NavLink></li>}

        {type=='admin' &&<li><NavLink to='/customRequestList' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Custom Requests List</NavLink></li>}

        {type=='admin' &&<li><NavLink to='/employeeList' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>My Employee List</NavLink></li>}

        {type=='admin' &&<li><NavLink to='/addMember' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Add an Employee</NavLink></li>}

        {type=='admin' && <li><NavLink to='/profile' className={({ isActive }) => isActive ? "text-red-600 underline font-bold" : ''}>Profile</NavLink></li>}




    </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <div className="flex gap ">
                    <img className="w-60" src={img1} alt="" />
                    {/* <a className="text-xl font-semibold">InsightNex</a> */}
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {login}
            </div>
        </div>
    );
};

export default Navbar;