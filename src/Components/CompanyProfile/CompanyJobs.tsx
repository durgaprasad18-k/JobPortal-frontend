import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs=()=>{
    return <div className="flex mt-10 flex-wrap gap-5">
    {
        jobList.map((job, index) => <JobCard key={index} {...job} />)
    }
</div>
}
export default CompanyJobs;