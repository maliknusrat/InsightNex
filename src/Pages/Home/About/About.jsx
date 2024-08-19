import img1 from "../../../assets/Banner/kelly-sikkema-M98NRBuzbpc-unsplash.jpg"

const About = () => {
    return (
        <div className="home-bg text-black">
            <div className="mb-10 mt-10 ml-4 mr-4">
                            <p className="font-sans text-center  font-black text-4xl">About Us</p>
                        </div>
            <div className="max-w-6xl mx-auto grid sm:grid-cols-1 lg:grid-cols-2">
                <div className="p-10" >
                  <img className="rounded-ss-3xl rounded-ee-3xl bg-slate-200 p-2" src={img1} alt="" />
                </div>
              
                <div className="lg:mt-[140px] ">
                    <div className="py-20">
                        
                        <div className="text-justify font-sans font-semibold text-xl italic ms-4 me-4 mb-20">
                            <p className="my-2 ">
                            Introducing InsightNex, an innovative asset management website designed to empower investors and optimize financial portfolios. Our platform seamlessly integrates cutting-edge technology with comprehensive financial expertise, offering users a user-friendly interface to monitor, analyze, and enhance their investments. With real-time market data, personalized risk assessments, and advanced analytics tools, WealthGuard Pro ensures informed decision-making. Customizable dashboards provide a holistic view of diverse assets, from stocks to cryptocurrencies, aiding in strategic allocation. Security is paramount, with state-of-the-art encryption safeguarding sensitive information. Whether you are a seasoned investor or a novice, WealthGuard Pro is your trusted companion on the path to financial success.
                            </p>

                        </div>
                 
                </div>

                </div>

                

            </div>

           
        </div>
    );
};

export default About;