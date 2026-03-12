
import Sort from "./Sort";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";
import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const Jobs = () => {
    const dispatch=useDispatch();
    const [jobList, setJobList] = useState([]);
    const filter=useSelector((state:any)=>state.filter);
    const sort=useSelector((state:any)=>state.sort);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    
    useEffect(()=>{
        // dispatch(resetFilter());
        dispatch(resetSort());
        dispatch(showOverlay())
        getAllJobs().then((res)=>{
            setJobList(res.filter((job:any)=>job.jobStatus=="ACTIVE"));
        }).catch((err)=>console.log(err))
        .finally(()=>dispatch(hideOverlay()));
        return ()=>{
            if(!filter.page)dispatch(resetFilter());
          }
    }, [])
    useEffect(()=>{
        if(sort=="Most Recent"){
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
        }
        else if(sort=="Salary: Low to High"){
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
        }
        else if(sort=="Salary: High to Low"){
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
        }

    }, [sort])
    useEffect(()=>{
        let filtered = jobList;
        if(filter["Job Title"] && filter["Job Title"].length>0)filtered=filtered.filter((job:any)=>filter["Job Title"]?.some((x:any)=>job.jobTitle?.toLowerCase().includes(x.toLowerCase())));
        if(filter.Location && filter.Location.length>0)filtered=filtered.filter((job:any)=>filter.Location?.some((x:any)=>job.location?.toLowerCase().includes(x.toLowerCase())));
          if(filter.Experience && filter.Experience.length>0)filtered=filtered.filter((job:any)=>filter.Experience?.some((x:any)=>job.experience?.toLowerCase().includes(x.toLowerCase())));
          if(filter["Job Type"] && filter["Job Type"].length>0)filtered=filtered.filter((job:any)=>filter["Job Type"]?.some((x:any)=>job.jobType?.toLowerCase().includes(x.toLowerCase())));
          if(filter.salary && filter.salary.length>0)filtered=filtered.filter((jobs:any)=>filter.salary[0]<=jobs.packageOffered && jobs.packageOffered<=filter.salary[1]);
        setFilteredJobs(filtered);
    },[filter,jobList])
    return <div className="px-5 py-5">
        <div className="flex justify-between flex-wrap mt-5">
            <div className="text-2xl xs-mx:text-xl flex gap-3 items-center font-semibold">Recommended jobs   {Object.keys(filter).length>0&&<Button onClick={()=>dispatch(resetFilter())} className="font-body transition duration-300 " size="compact-sm" leftSection={<IconX stroke={1.5} size={20}/>} variant="filled" color="brightSun.4" autoContrast >Clear Filters</Button>}</div>
            <Sort sort="job" />
        </div>
        <div className="flex mt-10 flex-wrap gap-5">
            {
                filteredJobs.length>0?filteredJobs.map((job:any, index:any) => <JobCard key={index} {...job} />):<div className="font-medium text-lg">
                    No job found
                </div>
            }
        </div>
    </div>
}
export default Jobs;