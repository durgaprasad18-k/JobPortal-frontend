
import { Link, useLocation } from "react-router-dom";

const NavLinks=()=>{
    
    const links=[
        {name:"Find Jobs",url:"find-jobs"},
        {name:"Find Talent",url:"find-talent"},
        {name:"Post Job",url:"post-job/0"},
        {name:"Posted Jobs",url:"posted-jobs/0"},
        {name:"Job History", url:"job-history"}
    ]
    const location =useLocation();
    return <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
        {   
        links.map((link, index)=><div key={index} className={`${location.pathname=="/"+link.url?"border-bright-sun-400 text-bright-sun-400":"border-transparent"} border-t-[3px] h-full flex items-center`}>
                <Link className="hover:text-mine-shaft-200 " key={index} to={link.url} >{link.name}</Link>
            </div>)
            
        }
</div>
}
export default NavLinks;