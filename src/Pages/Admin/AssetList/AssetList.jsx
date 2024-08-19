// import React from 'react';
import { RiEditCircleFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { RiDeleteBin2Fill } from "react-icons/ri";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [records, setRecords] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5000/addAsset/${user?.email}`
    );
    const data = await response.json();
    setAssets(data);
    setRecords(data);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSearch = (event) => {
    setRecords(
      assets.filter((asset) =>
        asset.productName.toLowerCase().includes(event.target.value)
      )
    );
  };

  const handleAvailable = () => {
    setRecords(assets.filter((asset) => asset.quantity > 0));
  };
  const handleAll = () => {
    setRecords(assets.filter((asset) => asset.quantity));
  };

  const handleOutOfStock = () => {
    setRecords(assets.filter((asset) => asset.quantity <= 0));
  };

  const handleReturnable = () => {
    setRecords(assets.filter((asset) => asset.productType == "returnable"));
  };

  const handleNonReturnable = () => {
    setRecords(assets.filter((asset) => asset.productType == "non returnable"));
  };

  const handleDelete = (id) => {
    console.log("delete");
    fetch(`http://localhost:5000/deleteAsset/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          fetchData();
          Swal.fire("Deleted!", "Asset has been deleted.", "success");
        }
      });
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate the indices for slicing the array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = records.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(records.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-10">
        <div className="join mt-10">
          <input
            onChange={handleSearch}
            className="w-[300px] input input-bordered join-item"
            placeholder="Search Your Product Here"
          />
          {/* <button className="btn join-item ">Search</button> */}
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          <button onClick={handleAll} className="btn btn-active btn-neutral">
            ALL
          </button>
          <button
            onClick={handleAvailable}
            className="btn btn-active btn-secondary"
          >
            Available
          </button>
          <button
            onClick={handleOutOfStock}
            className="btn btn-active btn-error"
          >
            Out-Of-Stock
          </button>
          <button
            onClick={handleReturnable}
            className="btn btn-active btn-warning"
          >
            Returnable
          </button>
          <button
            onClick={handleNonReturnable}
            className="btn btn-active btn-accent"
          >
            Non-Returnable
          </button>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">Product Name</th>
              <th className="py-3 px-6 text-left border-b">Type</th>
              <th className="py-3 px-6 text-left border-b">Quantity</th>
              <th className="py-3 px-6  border-b text-end">Date</th>
              <th className="py-3 px-6  border-b text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords?.map((asset) => (
              <tr
                key={asset._id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{asset.productName}</td>
                <td className="py-4 px-6 uppercase font-semibold border-b">
                  <span
                    className={`${
                      asset.productType === "returnable"
                        ? "text-teal-500"
                        : "text-red-600"
                    }`}
                  >
                    {asset.productType}
                  </span>
                </td>
                <td className="py-4 px-6 border-b">{asset.quantity}</td>
                <td className="py-4 px-6 border-b text-end">{asset.date}</td>
                <td className="py-4 px-6 border-b text-end">
                  <div className="card-actions justify-end">
                    <Link
                      to={`/updateAsset/${asset._id}`}
                      className="btn btn-square rounded-md btn-sm bg-none"
                    >
                      <RiEditCircleFill className="text-xl text-blue-700" />
                    </Link>
                    <Link
                      onClick={() => {
                        handleDelete(asset._id);
                      }}
                      className="btn btn-square rounded-md btn-sm bg-none"
                    >
                      <RiDeleteBin2Fill className="text-xl text-red-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 px-3 py-2 rounded-lg ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
      </div>
      ;
    </div>
  );
};

export default AssetList;
