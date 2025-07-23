import {assets} from "../../assets/assets";

function AppDownload(){
    return (
        <div className="container bg-">
            <div className="flex">
                <div>
                    <h1>Download Mobile App For Better Experience</h1>
                    <div>
                        <a href="">
                            <img src={assets.play_store} alt="" />
                        </a>
                        <a href="">
                            <img src={assets.app_store} alt="" />
                        </a>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
};

export default AppDownload;