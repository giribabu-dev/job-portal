import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, JobCategories, JobLocations } from "../../assets/assets";
import JobCard from "../jobCard/JobCard";

function JobListing() {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(jobs.length / 6)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleCategoryFilters = (category)=> {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
    };

    const handleLocationFilters = (location)=> {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location]
        );
    };

    useEffect(()=> {
        
    }, [selectedCategories, selectedLocations]);

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

                <button className="lg:hidden border border-gray-400 rounded px-6 py-1.5" onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? "Close" : "Filters"}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        {JobCategories.map((category, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <input type="checkbox" className="scale-125" value={selectedCategories}
                                    onClick={()=> handleCategoryFilters(category)}
                                    checked={selectedCategories.includes(category)} />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
                    <ul className="text-gray-600 space-y-4">
                        {JobLocations.map((location, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <input type="checkbox" className="scale-125" value={selectedLocations}
                                    onClick={()=> handleLocationFilters(location)}
                                    checked={selectedLocations.includes(location)} />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {jobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                {jobs.length > 0 && (
                    <div className="flex justify-center items-center mt-10 space-x-2">
                        <a href="#job-list">
                            <img src={assets.left_arrow_icon} alt="Go to previous page" onClick={handleToPreviousPage}
                                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none cursor-default' : 'cursor-pointer'}`} />
                        </a>
                        {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, index) => (
                            <a href="#job-list">
                                <button className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded cursor-pointer
                                    ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                                    onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list" >
                            <img src={assets.right_arrow_icon} alt="Go to next page" onClick={handleToNextPage}
                                className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none cursor-default' : 'cursor-pointer'}`} />
                        </a>
                    </div>
                )}

            </section>
        </div>
    )
};

export default JobListing;