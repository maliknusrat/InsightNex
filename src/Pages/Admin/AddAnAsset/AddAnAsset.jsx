import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const AddAnAsset = () => {
    const { user } = useContext(AuthContext);
    const date = new Date();
    const navigate = useNavigate(); 

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const handleAddAsset = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.name.value;
        const productType = form.gender.value;
        const quantity = form.quantity.value;

        const assetInfo = {
            productName: productName,
            productType: productType,
            quantity: parseInt(quantity),
            date: day + '-' + month + '-' + year,
            admin: user?.email
        }

        fetch('http://localhost:5000/addAsset', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(assetInfo)
        })
        .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                    title: 'Add Asset Successful',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }
            navigate('/adminHome');
        })
    }
    return (
      <div className="max-w-[80%] max-h-[80%] border border-gray-300 bg-gray-50 my-10 mx-auto">
        <form onSubmit={handleAddAsset} className=" card-body  ">
          <div className="text-center lg:text-left border-gray-400 border-b-2">
            <h1 className="text-3xl font-serif text-center pb-3 p-4 font-semibold">
              Add An Asset!
            </h1>
          </div>

          <div className="pt-2 space-y-6">
            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="input rounded-sm input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <select
                className="input rounded-sm input-bordered border-gray-300"
                name="gender"
                placeholder="Product Type"
              >
                <option value="" disabled selected hidden>
                  Product Type
                </option>
                <option value="returnable">Returnable</option>
                <option value="non returnable">Non Returnable</option>
              </select>
            </div>

            <div className="form-control">
              <input
                type="number"
                name="quantity"
                placeholder="Product Quantity"
                className="input rounded-sm input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-neutral rounded-none"
              type="submit"
              value="ADD"
            />
          </div>
        </form>
      </div>
    );
};

export default AddAnAsset;