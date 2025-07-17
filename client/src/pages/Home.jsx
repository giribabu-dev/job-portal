import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import JobListing from "../components/jobListing/JobListing";

function Home(){
    return (
        <div>
            <Navbar />
            <Hero />
            <JobListing />
        </div>
    )
};

export default Home;