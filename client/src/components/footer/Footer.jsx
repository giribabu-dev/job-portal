import { assets } from "../../assets/assets";

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
        <div className="container px-4 2xl:px-20">
            <div>
                <div className="mb-5">
                    <img src={assets.logo} alt="Logo" width={160} />
                </div>
                <div>
                    <h6 className="font-semibold mb-2 text-base text-gray-500">Connect with us</h6>
                    <div className="flex gap-3">
                        <img src={assets.facebook_icon} alt="Facebook icon" width={35} />
                        <img src={assets.instagram_icon} alt="Instagram icon" width={35} />
                        <img src={assets.twitter_icon} alt="Twitter icon" width={35} />
                    </div>
                </div>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
};

export default Footer;