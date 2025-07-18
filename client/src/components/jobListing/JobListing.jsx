import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, JobCategories, JobLocations } from "../../assets/assets";


function JobListing() {

    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

    return (
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">

            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {/* Search filter from Hero Component */}
                {
                    isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
                        <>
                            <h3 className="text-lg font-medium mb-4">Current Search</h3>
                            <div className="mb-4 text-gray-600">
                                {searchFilter.title && (
                                    <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded mr-2">
                                        {searchFilter.title}
                                        <img src={assets.cross_icon} alt="" className="cursor-pointer"
                                            onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                                        {searchFilter.location}
                                        <img src={assets.cross_icon} alt="" className="cursor-pointer"
                                            onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                {/* Category Filter */}
                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        { JobCategories.map((category, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <input type="checkbox" className="scale-125" />
                                {category}
                            </li>
                        )) }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className="max-lg:hidden">
                    <h4 className="font-medium text-lg py-4">Search by Location</h4>
                    <ul className="text-gray-600 space-y-4">
                        {JobLocations.map((location, index)=> (
                            <li key={index} className="flex items-center gap-3">
                                <input type="checkbox" className="scale-125" />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listings */}
            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
                <p className="mb-8">Get your desired job from top companies</p>

            </section>
        </div>
    )
};

export default JobListing;