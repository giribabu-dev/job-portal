import { createContext, useState, useEffect } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showUserLogin, setShowUserLogin] = useState(false)
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/jobs")
            if (data.success) {
                setJobs(data.jobs)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/company/company", { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    // Function to fetch user data
    const fetchUserData = async () => {
        try {

            const { data } = await axios.get(backendUrl + "/api/users/user",
                { headers: { Authorization: `Bearer ${userToken}` } }
            )

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    // Fetch company token from local storage
    useEffect(() => {
        fetchJobs()

        const storeCompanyToken = localStorage.getItem("companyToken")
        if (storeCompanyToken) {
            setCompanyToken(storeCompanyToken)
        }
    }, []);

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken]);

    // Fetch user token from local storage
    useEffect(()=> {
        let storeUserToken = localStorage.getItem("userToken")
        if(storeUserToken){
            setUserToken(storeUserToken)
        }
    }, []);

    useEffect(() => {
        if (userToken) {
            fetchUserData()
        }
    }, [userToken]);

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showUserLogin, setShowUserLogin,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userToken, setUserToken,
        userData, setUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};