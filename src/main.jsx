import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Layout/Main';
import SignUp from './Pages/Authenticate/SignUp/SignUp';
import LogIn from './Pages/Authenticate/LogIn/LogIn';
import SignUPHR from './Pages/Authenticate/SignUpHR/SignUPHR';
import AuthProvider from './Provider/AuthProvider';
import MyEmployeeList from './Pages/Admin/MyEmployeeList/MyEmployeeList';
import Profile from './Shared/Profile/Profile';
import AddMember from './Pages/Admin/AddMember/AddMember';
import AddAnAsset from './Pages/Admin/AddAnAsset/AddAnAsset';
import CustomRequestList from './Pages/Admin/CustomeRequestList/CustomRequestList';
import AssetList from './Pages/Admin/AssetList/AssetList';
import UpdateAsset from './Pages/Admin/AssetList/UpdateAsset';
import MakeCustomRequest from './Pages/Employee/MakeCustomReqest/MakeCustomRequest';
import RequestAsset from './Pages/Employee/RequestAsset/RequestAsset';
import MyTeam from './Pages/Employee/MyTeam/MyTeam';
import MyAsset from './Pages/Employee/MyAsset/MyAsset';
import AllRequest from './Pages/Admin/AllRequest/AllRequest';
import MyAssetDownload from './Pages/Employee/MyAsset/MyAssetDownload';
import Home from './Pages/Home/Home';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import EmployeeHome from './Pages/Employee/EmployeeHome/EmployeeHome';
import UpdatedDetail from './Pages/Employee/EmployeeHome/UpdatedDetail';
import PendingRequest from './Pages/Admin/AdminHome/PendingRequest/PendingRequest';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
     
      {
        path: "/signUpHR",
        element: <SignUPHR></SignUPHR>,
      },
      {
        path: '/employeeList',
        element: <MyEmployeeList></MyEmployeeList>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        path: '/addMember',
        element: <AddMember></AddMember>
      },
      {
        path: '/addAssets',
        element: <AddAnAsset></AddAnAsset>
      },
      {
        path: '/customRequestList',
        element: <CustomRequestList></CustomRequestList>
      },
      {
        path: '/assetList',
        element: <AssetList></AssetList>
      },
      {
        path: '/updateAsset/:id',
        element: <UpdateAsset></UpdateAsset>
      },
      {
        path: '/customRequest',
        element: <MakeCustomRequest></MakeCustomRequest>
      },
      {
        path: '/requestAsset',
        element: <RequestAsset></RequestAsset>
      },
      {
        path: '/myTeam',
        element: <MyTeam></MyTeam>
      },
      {
        path: '/myAsset',
        element: <MyAsset></MyAsset>
      },
      {
        path: '/myAsset/:id',
        element: <MyAssetDownload></MyAssetDownload>
      },
      {
        path: '/adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: '/employeeHome',
        element: <EmployeeHome></EmployeeHome>
      },
      {
        path: '/pendingRequest',
        element: <PendingRequest></PendingRequest>
      },
      {
        path: '/updatedDetails/:id',
        element: <UpdatedDetail></UpdatedDetail>
      },
      {
        path: '/allRequest',
        element: <AllRequest></AllRequest>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
