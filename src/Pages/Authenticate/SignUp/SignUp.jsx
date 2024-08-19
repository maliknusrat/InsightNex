import { updateProfile } from 'firebase/auth';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const date = form.date.value;

        const newEmployee = {
            name: name,
            photo: photo,
            email: email,
            password: password,
            date: date,
            type: 'employee',
            myAdmin: 'null'
        };
        console.log(newEmployee);

        if (password.length < 6) {
            Swal.fire({
                title: 'Password must be six characters',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }

        if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)) {
            Swal.fire({
                title: 'Password must an upper latter and one special character',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }

        //create User

        // eslint-disable-next-line no-undef
        createUser(email, password)
            .then(result => {
                updateUserData(result.user, name, photo);
                //send data to the server
                fetch('http://localhost:5000/employee', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newEmployee)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('type', newEmployee.type)
                        Swal.fire({
                            title: 'Registration Successful',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        navigate('/');
                    })  
            })
            // .catch(error => {
            //     console.error(error)
            // })
    }
    const updateUserData = (user, name, photo,) => {
        updateProfile(user, {
            displayName: name, photoURL: photo,
        })
            .then(() => {
                console.log('User Profile Updated');
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="min-h-screen mt-10">
                <div className="hero-content">

                    <div className="card rounded-none flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body ">
                            <div className="text-center lg:text-left border-b-2">
                                <h1 className="text-xl text-center p-4 font-semibold">Join As Employee Here!</h1>
                            </div>
                            <div className="form-control">

                                <input type="text" name="name" placeholder="name" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">

                                <input type="email" name="email" placeholder="email" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="date" name="date" placeholder="Date of Birth" className="input rounded-sm input-bordered" required />
                            </div>

                            <div className="form-control">

                                <input type="text" name="photo" placeholder="Photo url" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">

                                <input type="password" name="password" placeholder="password" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-neutral rounded-none" type="submit" value="Register" />
                            </div>
                            <p className="py-2 text-center text-sm">Already Have an Account? <Link className="font-semibold text-sky-600" to="/login">LogIn</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

//insightNex
//X1kYG7MAod0TcIpj