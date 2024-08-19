import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://insight-store-server.vercel.app/adminRequest/${user?.email}`
    );
    const data = await response.json();
    setRequests(data);
    setRecords(data);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSearch = (event) => {
    setRecords(
      requests.filter(
        (asset) =>
          asset.employeeEmail.toLowerCase().includes(event.target.value) ||
          asset.employeeName.toLowerCase().includes(event.target.value)
      )
    );
  };

  const handleMakeApproved = (id) => {
    fetch(`https://insight-store-server.vercel.app/admin/approvedReq/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetchData();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `This Asset is Approved`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeRejected = (id) => {
    fetch(`https://insight-store-server.vercel.app/admin/rejectedReq/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetchData();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `This Asset is Rejected`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <div className="join flex items-end justify-end mr-10 mt-10">
        <input
          onChange={handleSearch}
          className="input input-bordered join-item"
          placeholder="Search By Email or Name"
        />
        <button className="btn btn-primary join-item rounded-r-full">Search</button>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {records?.map((request) => (
            <div
              key={request._id}
              className="max-w-[350px] space-y-6 rounded-lg border-b-2 border-l border-r-2 border-t border-b-[#0084ff] border-l-[#005eb6] border-r-[#0084ff] border-t-[#005eb6] bg-white py-8 pl-8 shadow-md dark:bg-[#18181B]"
            >
              <div className="flex items-center justify-between">
                <h1 className="w-[25%] text-xl font-bold tracking-wider text-sky-900 dark:text-[#289DFF] md:text-xl">
                  {request.productName}
                </h1>
                <button
                  onClick={() => handleMakeApproved(request._id)}
                  disabled={
                    request.status === "Approved" ||
                    request.status == "Rejected"
                  }
                  className={`w-[50%] rounded-bl-full rounded-tl-full text-white px-4 py-4 md:px-10 md:py-5 ${
                    request?.status==="Approved" ? 'bg-gray-500' : 'bg-gradient-to-r from-[#52b7ff] to-[#0084ff]'
                  }`}
                >
                  <h3 className="font-semibold tracking-wider  md:text-xl">
                    Accept
                  </h3>
                </button>
              </div>
              <p className="font-semibold text-sky-900 dark:text-[#4BB3FF]/90">
                <p>
                  {" "}
                  <span className="text-[#4596cf]">Additional Note:</span>{" "}
                  {request.additional_info}
                </p>
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                  <svg
                    className="fill-[#0386FF] dark:fill-[#289DFF] "
                    width={20}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g strokeWidth="0"></g>{" "}
                    <g
                      id="navigateui"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>{" "}
                    <g id="navigateui">
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="navigateui"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Type: {request.productType}
                </li>

                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                  <svg
                    className="fill-[#0386FF] dark:fill-[#289DFF] "
                    width={20}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g strokeWidth="0"></g>{" "}
                    <g
                      id="navigateui"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>{" "}
                    <g id="navigateui">
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="navigateui"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Requester Mail: {request.employeeEmail}
                </li>

                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                  <svg
                    className="fill-[#0386FF] dark:fill-[#289DFF] "
                    width={20}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g strokeWidth="0"></g>{" "}
                    <g
                      id="navigateui"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>{" "}
                    <g id="navigateui">
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="navigateui"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Requester Name: {request.employeeName}
                </li>

                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                  <svg
                    className="fill-[#0386FF] dark:fill-[#289DFF] "
                    width={20}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g strokeWidth="0"></g>{" "}
                    <g
                      id="navigateui"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>{" "}
                    <g id="navigateui">
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="navigateui"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p>Request Date: {request.date}</p>
                </li>

                <li className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]">
                  <svg
                    className="fill-[#0386FF] dark:fill-[#289DFF] "
                    width={20}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g strokeWidth="0"></g>{" "}
                    <g
                      id="navigateui"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>{" "}
                    <g id="navigateui">
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="navigateui"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p>Status: {request.status}</p>
                </li>
              </ul>
              <div className="mr-8">
                <button
                  onClick={() => handleMakeRejected(request._id)}
                  disabled={
                    request.status === "Approved" ||
                    request.status == "Rejected"
                  }
                  
                  className={`w-full rounded-full py-4 text-lg font-semibold uppercase tracking-wider text-white ${
                    request?.status==="Rejected" ? 'bg-gray-500' : 'bg-gradient-to-r from-[#52b7ff] to-[#0084ff]'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
