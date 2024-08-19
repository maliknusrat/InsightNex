import { Link } from "react-router-dom";
import img1 from "../../../assets/Banner/kelly-sikkema-M98NRBuzbpc-unsplash.jpg"
import img2 from "../../../assets/Banner/windows-kRWY72TKB0Y-unsplash.jpg"
const Banner = () => {
    return (
        <div className="carousel w-full h-screen">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={img1} className="w-full" />
                <div className="absolute flex justify-end mr-32 transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <Link to="/signUpHR" className=" btn w-[200px] btn-secondary">Join As HR</Link>
                </div>
                <div className="absolute flex justify-end  transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn btn-circle mr-4">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={img2} className="w-full" />
                <div className="absolute flex justify-end mr-32 transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <Link to="/signUp" className=" btn w-[200px]  btn-secondary">Join As Employee</Link>
                </div>
                <div className="absolute flex justify-end  transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle mr-4">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;