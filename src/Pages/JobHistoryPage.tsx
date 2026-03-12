import {Divider } from "@mantine/core";
import JobHistory from "../Components/JobHistory/JobHistory";

const JobHistoryPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4  ">
            <Divider/>
            <div className="my-5">
                <JobHistory/>
            </div>
        </div>
    )
}
export default JobHistoryPage;