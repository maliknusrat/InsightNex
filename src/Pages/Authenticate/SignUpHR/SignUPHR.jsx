import { updateProfile } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';




const SignUPHR = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState(null);

    const memberOptions = [
        { label: '5 Members for $5', value: '5 members' },
        { label: '10 Members for $8', value: '10 members' },
        { label: '20 Members for $15', value: '20 members' },
        // Add more options as needed
    ];

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const companyName = form.companyName.value;
        const companyLogo = form.companyLogo.value;
        const email = form.email.value;
        const selectedMember = selectedOption ? selectedOption.value : null;
        const photo = form.photo.value;
        const date = form.date.value;
        const password = form.password.value;

        const newAdmin = {
            name: name,
            photo: photo,
            email: email,
            password: password,
            date: date,
            companyName:companyName,
            companyLogo:companyLogo,
            selectedMember:selectedMember,
            type: 'admin'
        };


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
                fetch('https://insight-store-server.vercel.app/admin', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newAdmin)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('type', newAdmin.type)
                        localStorage.setItem('package',newAdmin.selectedMember)
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
            .catch(error => {
                console.error(error)
            })
    }
    const updateUserData = (user, name, photo) => {
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
                                <h1 className="text-xl text-center p-4 font-semibold">Join As HR/Admin Here!!</h1>
                            </div>
                            <div className="form-control">
                                <input type="text" name="name" placeholder="name" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="text" name="companyName" placeholder="Company name" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="text" name="companyLogo" placeholder="Company Logo URL" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="email" name="email" placeholder="email" className="input rounded-sm input-bordered" required />
                            </div>

                            <div className="form-control">
                                <CreatableSelect required name='selectedMember'
                                    isClearable
                                    options={memberOptions}
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                />

                                {/* Display the selected option */}
                                {/* {selectedOption && (
                                    // <p>Selected Option: {selectedOption.label}</p>
                                )} */}
                            </div>

                            <div className="form-control">
                                <input type="text" name="photo" placeholder="Photo url" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="date" name="date" placeholder="Date of Birth" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control">

                                <input type="password" name="password" placeholder="password" className="input rounded-sm input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-neutral rounded-none" type="submit" value="Register" />
                            </div>
                            <p className="py-2 text-center text-sm">Already Have an Account? <Link className="font-semibold text-sky-600" to="/logIn">LogIn</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUPHR;