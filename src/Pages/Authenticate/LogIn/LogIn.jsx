import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa6";
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const LogIn = () => {
    const { signIn ,loginWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || '/';

    const loginHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                form.reset();
                fetch(`http://localhost:5000/employee/${email}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('type', data.type)
                        localStorage.setItem('package', data?.selectedMember)
                        Swal.fire({
                            title: 'Log IN Successful',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        if (data.type == 'employee') {
                            const from = location.state?.from?.pathname || '/employeeHome';
                            navigate(from , {replace:true});
                        } else {
                            const from = location.state?.from?.pathname || '/adminHome';
                            navigate(from , {replace:true});
                        }
                        // navigate(from , {replace:true});
                    })  
            })
            .catch(error => {
                Swal.fire({
                title: 'Email or Password do not matched',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
                })
                console.log(error.message);
        })
    }

    const googleLoginHandler = () => {
        loginWithGoogle()
        .then(result => {
                const user = result.user;
                console.log(user);
                fetch(`http://localhost:5000/employee/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem('type', data.type)
                    localStorage.setItem('package', data?.selectedMember)
                    Swal.fire({
                        title: 'Log IN Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    if (data.type == 'employee') {
                        const from = location.state?.from?.pathname || '/employeeHome';
                        navigate(from , {replace:true});
                    } else {
                        const from = location.state?.from?.pathname || '/adminHome';
                        navigate(from , {replace:true});
                    }
                    // navigate(from , {replace:true});
                })  
    
                
            })
            .catch(error => {
                console.log(error.message);
        }) 
    }
    return (
        <div className="min-h-screen mt-10">
        <div className="hero-content">
                <div className="card rounded-none flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={loginHandler} className="card-body ">
                        <div className="text-center lg:text-left border-b-2">
                            <h1 className="text-3xl text-center p-4 font-semibold">Login now!</h1>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input rounded-sm input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"name="password" placeholder="password" className="input rounded-sm input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral rounded-none">Login</button>
                        <button onClick={googleLoginHandler} className="btn btn-outline mt-3 rounded-none text-sky-600 mb-2 w-full">
                            <FaGoogle></FaGoogle>
                            Login With Google
            </button>
                        </div>
                        {/* <p className="py-2 text-center text-sm">Do not Have an Account?Please <Link className="font-semibold text-sky-600" to ="/signup">Register</Link></p> */}
                    </form>
                    
                </div>
            </div>
        </div>
)};

export default LogIn;