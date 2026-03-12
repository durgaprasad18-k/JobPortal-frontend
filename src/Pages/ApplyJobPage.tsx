import { Button, Divider } from "@mantine/core";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
import { hideOverlay, showOverlay } from "../Slices/OverlaySlice";
import { useDispatch } from "react-redux";
const ApplyJobPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const [job, setJob] = useState<any>(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        dispatch(showOverlay());
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((err)=>console.log(err))
        .finally(()=>dispatch(hideOverlay()));
    },[id])
    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <Divider size="xs" mb="xs" />
            <Button color="brightSun.4" mb="xs" onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20} />} variant="light">Back</Button>
        
        <ApplyJobComp {...job}/>
    </div>
}
export default ApplyJobPage;