import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import JobListing from "../components/jobListing/JobListing";
import AppDownload from "../components/appDownload/AppDownload";
import Footer from "../components/footer/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCategories from "../components/JobCategories";

function Home() {

    const { userData } = useContext(AppContext)

    return (
        <>
            <Navbar />
            <Hero />
            <JobListing />
            <JobCategories />
            {!userData && <AppDownload />}
            <Footer />
        </>
    )
};

export default Home;