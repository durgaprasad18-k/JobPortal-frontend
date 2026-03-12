import { Badge, Divider, Tabs } from "@mantine/core";
import Job from "../JobDesc/Job";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props:any) => {
    const [tab, setTab]=useState("overview");
    const [arr, setArr]=useState<any>([]);
    const handleTab=(value:any)=>{
        setTab(value);
        if(value=="applicants")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="APPLIED"));
        else if(value=="invited")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"));
        else if(value=="offered")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFERED"));
        else if(value=="rejected")setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="REJECTED"));
    }
    useEffect(()=>{
        handleTab("overview");
    }, [props]);
    return <div data-aos="zoom-out" className=" w-3/4 md-mx:w-full px-5 md-mx:p-0">
        {props.jobTitle?<><div className="text-2xl xs-mx:text-xl font-semibold flex items-center ">{props?.jobTitle} <Badge variant="light" ml="sm" color="brightSun.4" size="sm">{props?.jobStatus}</Badge></div>
        <div className="font-medium xs-mx:text-sm text-mine-shaft-300 mb-5">{props?.location}</div>
        <div className="">
            <Tabs value={tab} onChange={handleTab} radius="lg" autoContrast variant="outline">
                <Tabs.List className="font-semibold [&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button]:!text-xl sm-mx:[&_button]:!text-lg  xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-2 mb-5 [&_button[data-active='true']]:text-bright-sun-400 xs-mx:font-medium">
                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                    <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="overview" className="[&>div]:w-full">{props.jobStatus=="CLOSED"?<Job {...props} edit={true} closed />:<Job {...props} edit={true}  />}</Tabs.Panel>
                <Tabs.Panel value="applicants"><div className="flex mt-10 flex-wrap gap-5 justify-around">
                    {arr?.length?arr.map((talent:any, index:any) =>  <TalentCard key={index} {...talent} posted={true}/>):"No Applicants Yet"
                    }
                </div></Tabs.Panel>
                <Tabs.Panel value="invited"><div className="flex mt-10 flex-wrap gap-5 justify-around">
                    {
                        arr?.length?arr.map((talent:any, index:any) =>  <TalentCard key={index} {...talent} invited/>):"No Applicants Invited Yet"
                    }
                </div></Tabs.Panel>
                <Tabs.Panel value="offered"><div className="flex mt-10 flex-wrap gap-5 justify-around">
                    {
                         arr?.length?arr.map((talent:any, index:any) =>  <TalentCard key={index} {...talent} offered/>):"No Applicants Offered Yet"
                    }
                </div></Tabs.Panel>
                <Tabs.Panel value="rejected"><div className="flex mt-10 flex-wrap gap-5 justify-around">
                    {
                         arr?.length?arr?.map((talent:any, index:any) =>  <TalentCard key={index} {...talent} offered/>):"No Applicants Rejected Yet"
                    }
                </div></Tabs.Panel>
                
            </Tabs>
        </div></>:<div className="text-2xl font-semibold flex items-center justify-center min-h-[70vh]">Job Not Found.</div>}
    </div>
}
export default PostedJobDesc;