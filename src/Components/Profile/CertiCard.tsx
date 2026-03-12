import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard = (props: any) => {
    const [edit, setEdit]=useState(false);
    const dispatch = useDispatch();
    const profile=useSelector((state:any)=>state.profile);
    const matches = useMediaQuery('(max-width: 475px)');
    const handleDelete=()=>{
        let updatedProfile={...profile};
        updatedProfile.certifications=updatedProfile.certifications.filter((exp:any, index:number)=>index!==props.index);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success","Certificate Deleted Successfully");
    }
    return <div data-aos="zoom-out">
        <div className="flex justify-between sm-mx:flex-wrap">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
                    <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold xs-mx:text-sm">{props.name}</div>
                    <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{props.issuer}</div>
                </div>
            </div>
            <div className="flex gap-2 ">
                <div className="flex flex-col items-end sm-mx:flex-row sm-mx:gap-2">
                    <div className="text-sm xs-mx:text-xs text-mine-shaft-300">Issued {formatDate(props.issueDate)}</div>
                    <div className="text-sm xs-mx:text-xs text-mine-shaft-300">ID: {props.certificateId}</div>
                </div>
                { props.edit&&<ActionIcon onClick={handleDelete} variant="subtle" color="red.8" size={matches?"md":"lg"} ><IconTrash className="w-4/5 h-4/5" stroke={1.5} /></ActionIcon>}
            </div>
        </div>

    </div>
}
export default CertiCard;