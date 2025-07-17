import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

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
            </div>
        </div>
    )
};

export default JobListing;