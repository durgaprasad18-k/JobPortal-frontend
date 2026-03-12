
import { useEffect, useState } from "react";
import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";
import { getAllJobs } from "../../Services/JobService";
import { useParams } from "react-router-dom";

const RecommendedJob=()=>{
    const [jobList, setJobList] = useState([{}]);
    const {id}=useParams();
    useEffect(()=>{
        getAllJobs().then((res)=>{
            setJobList(res);
        }).catch((err)=>console.log(err));
    }, [])
    return  <div>
    <div className="text-xl font-semibold mb-5">Recommended Job</div>
    <div className="flex bs:flex-col   flex-wrap gap-5 justify-between bs-mx:justify-start">
    {
        jobList.map((job:any, index:number) =>index<6 && job.id!=id &&<JobCard key={index} {...job}  />)
    }
</div>
</div>
}
export default RecommendedJob;