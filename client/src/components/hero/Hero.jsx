import { assets } from "../../assets/assets";
import "./Hero.css";

function Hero() {
    return (
        <div className="container 2xl:px-20 my-10 mx-auto">
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white text-center py-18 rounded-md">
                <h1 id="heroComp_heading">Over 10,000+ jobs to apply</h1>
                <p id="heroComp_content">
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>
                <div className="flex justify-between items-center mx-auto rounded-sm py-2 px-3" id="heroComp_searchCont">
                    <div className="flex items-center">
                        <img src={assets.search_icon} alt="" />
                        <input type="text" placeholder="Search for jobs" className="outline-none ml-1" />
                    </div>
                    <div className="flex items-center">
                        <img src={assets.location_icon} alt="" />
                        <input src="text" placeholder="Location" className="outline-none ml-1" />
                    </div>
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
};

export default Hero;