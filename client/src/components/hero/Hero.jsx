import { assets } from "../../assets/assets";
// import "./Hero.css";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";

function Hero() {

    const { setSearchFilter, setIsSearched, searchFilter } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = ()=> {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
        setIsSearched(true);

        console.log(searchFilter);
    };

    return (
        <div className="container 2xl:px-20 my-10 mx-auto">
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white text-center py-16 mx-2 rounded-xl">
                <h2 id="heroComp_heading" className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10,000+ jobs to apply</h2>
                <p id="heroComp_content" className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>
                <div className="flex justify-between items-center bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto" id="heroComp_searchCont">
                    <div className="flex items-center">
                        <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
                        <input type="text" placeholder="Search for jobs" className="max-sm:text-xs p-2 rounded outline-none w-full"
                            ref={titleRef} />
                    </div>
                    <div className="flex items-center">
                        <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
                        <input src="text" placeholder="Location" className="max-sm:text-xs p-2 rounded outline-none w-full"
                            ref={locationRef} />
                    </div>
                    <button className="bg-blue-600 px-6 py-2 rounded text-white m-1" onClick={onSearch}>
                        Search
                    </button>
                </div>
            </div>

            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
                <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
                    <p className="font-medium">Trusted by</p>
                    <img src={assets.microsoft_logo} alt="" className="h-6" />
                    <img src={assets.walmart_logo} alt="" className="h-6" />
                    <img src={assets.accenture_logo} alt="" className="h-6" />
                    <img src={assets.samsung_logo} alt="" className="h-6" />
                    <img src={assets.amazon_logo} alt="" className="h-6" />
                    <img src={assets.adobe_logo} alt="" className="h-6" />
                </div>
            </div>
        </div>
    )
};

export default Hero;