import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import JobListing from "../components/jobListing/JobListing";
import AppDownload from "../components/appDownload/AppDownload";
import Footer from "../components/footer/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Home() {

    const { userData } = useContext(AppContext)

    return (
        <div>
            <Navbar />
            <Hero />
            <JobListing />
            {!userData && <AppDownload />}
            <Footer />
        </div>
    )
};

export default Home;