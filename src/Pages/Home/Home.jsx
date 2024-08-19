import PackageCard from "./PackageCard/PackageCard";
import About from "./About/About";
import Banner from "./Banner.jsx/Banner";
import Footer from './../../Shared/Footer/Footer';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
           <About></About>
            <PackageCard></PackageCard>
            <Footer></Footer>
        </div>
    );
};

export default Home;