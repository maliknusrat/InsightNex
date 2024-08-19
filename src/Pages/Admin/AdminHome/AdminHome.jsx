

import Footer from "../../../Shared/Footer/Footer";
import PendingRequest from "./PendingRequest/PendingRequest";
import PieCharts from "./Pie Chart/PieCharts";
import PackageCard from './../../Home/PackageCard/PackageCard';
import LimitedStock from './LimitedStock';
import TopMostItem from './TopMostItem';


const AdminHome = () => {
    return (
      <div className="bg-slate-100 pt-10">
        <PendingRequest></PendingRequest>
        <PackageCard></PackageCard>
        <div className="space-y-9">
          <div className=" border-b-[2px] border-gray-400 max-w-6xl mx-auto ">
            <p className="text-center text-4xl font-bold pb-4 mt-10">
              Limited Stock
            </p>
          </div>
          <LimitedStock></LimitedStock>
        </div>
        
        <TopMostItem></TopMostItem>
        <PieCharts></PieCharts>
        <Footer></Footer>
      </div>
    );
};

export default AdminHome;