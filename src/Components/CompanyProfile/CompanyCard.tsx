import { ActionIcon, Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const CompanyCard=(props:any)=>{
    return(
        <div className="flex justify-between bg-mine-shaft-900 rounded-lg items-center p-2">
        <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-md">
                <img className="h-7" src={`/Icons/${props.name}.png`} alt="" />
            </div>
            <div className="flex flex-col ">
                <div className="font-semibold ">{props.name}</div>
                <div className="text-xs text-mine-shaft-300">{props.employees} Employees</div>
            </div>
        </div>
        <Link to="/company">
       <ActionIcon variant="subtle" color="brightSun.4" aria-label="Settings"> <IconExternalLink/></ActionIcon></Link>
    </div>
    )
}
export default CompanyCard;