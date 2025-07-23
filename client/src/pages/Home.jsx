import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import JobListing from "../components/jobListing/JobListing";
import AppDownload from "../components/appDownload/AppDownload";

function Home(){
    return (
        <div>
            <Navbar />
            <Hero />
            <JobListing />
            <AppDownload />
        </div>
    )
};

export default Home;