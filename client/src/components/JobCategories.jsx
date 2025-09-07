import { assets } from "../assets/assets";
import { House, Building2, CircleCheckBig, Award, Briefcase, Rocket, Users, Settings, Airplay, GraduationCap, ChevronRight } from "lucide-react";

function JobCategories() {
    return (
        <div className="container px-4 2xl:px-20 mx-auto">
            <div className="">
                <img src={assets.naukri_banner} alt="" />
            </div>
            <div className="flex">
                <div className="flex items-center gap-2 border border-gray-200">
                    <div>
                        <House />
                    </div>
                    <div className="flex items-center">
                        Remote
                        <ChevronRight />
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default JobCategories;