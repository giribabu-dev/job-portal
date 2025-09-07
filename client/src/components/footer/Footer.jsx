import { assets } from "../../assets/assets";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <div className="container p-4 2xl:px-20 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3">

                {/* Left section */}
                <div className="col-span-12 md:col-span-3">
                    <div className="mb-5">
                        <img src={assets.logo} alt="Logo" width={160} />
                    </div>
                    <div>
                        <h6 className="font-semibold mb-2 text-base">Connect with us</h6>
                        <div className="flex gap-3">
                            <FaFacebookSquare className="text-gray-500" />
                            <FaInstagramSquare className="text-gray-400" />
                            <FaSquareXTwitter className="text-gray-500" />
                            <FaLinkedin className="text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Middle section */}
                <div className="col-span-12 md:col-span-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-3 text-[15px]">
                    <div>About Us</div>
                    <div>Help Center</div>
                    <div>Privacy Policy</div>
                    <div>Careers</div>
                    <div>Summons/Notices</div>
                    <div>Terms & Conditions</div>
                    <div>Employer Home</div>
                    <div>Grievances</div>
                    <div>Fraud Alert</div>
                    <div>Sitemap</div>
                    <div>Report Issue</div>
                    <div>Trust & Safety</div>
                    <div>Credits</div>
                </div>

                {/* Right section */}
                <div className="col-span-12 md:col-span-4">
                    <div className="border border-gray-200 rounded p-5">
                        <h2 className="text-[18px] font-bold">Apply on the go</h2>
                        <p className="text-[14px]">Get real-time job updates on our App</p>
                        <div className="flex gap-3 mt-4">
                            <a href="">
                                <img src={assets.play_store} alt="" className="h-9" />
                            </a>
                            <a href="">
                                <img src={assets.app_store} alt="" className="h-9" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;