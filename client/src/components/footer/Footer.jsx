import { assets } from "../../assets/assets";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        // <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
        //     <img src={assets.logo} alt="" width={160} />
        //     <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        //         Copyright @giriskillhub | All rights reserved.
        //     </p>
        //     <div className="flex gap-2.5">
        //         <img src={assets.facebook_icon} alt="" width={38} />
        //         <img src={assets.twitter_icon} alt="" width={38} />
        //         <img src={assets.instagram_icon} alt="" width={38} />
        //     </div>
        // </div>
        <div className="container p-4 2xl:px-20">
            <div className="grid grid-cols-3">
                <div className="">
                    <div className="mb-5">
                        <img src={assets.logo} alt="Logo" width={160} />
                    </div>
                    <div>
                        <h6 className="font-semibold mb-2 text-base">Connect with us</h6>
                        <div className="flex gap-3">
                            {/* <img src={assets.facebook_icon} alt="Facebook icon" width={35} /> */}
                            {/* <img src={assets.instagram_icon} alt="Instagram icon" width={35} /> */}
                            {/* <img src={assets.twitter_icon} alt="Twitter icon" width={35} /> */}
                            <FaFacebookSquare className="text-gray-500" />
                            <FaInstagramSquare className="text-gray-400" />
                            <FaSquareXTwitter className="text-gray-500" />
                            <FaLinkedin className="text-gray-500" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 space-y-3 text-[15px]">
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
                <div className="border border-gray-200 rounded p-4">
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
    )
};

export default Footer;