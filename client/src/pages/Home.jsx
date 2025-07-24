import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import JobListing from "../components/jobListing/JobListing";
import AppDownload from "../components/appDownload/AppDownload";
import Footer from "../components/footer/Footer";

function Home(){
    return (
        <div>
            <Navbar />
            <Hero />
            <JobListing />
            <AppDownload />
            <Footer />
        </div>
    )
};

export default Home;