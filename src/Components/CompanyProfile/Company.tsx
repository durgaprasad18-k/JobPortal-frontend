import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin} from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

const Company = () => {
    const section=["About", "Jobs", "Employees"]
    return <div className="w-3/4">
        <div className="relative">
            <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
            <img className="w-36 h-36 border-mine-shaft-950 p-2 bg-mine-shaft-950 border-8 absolute -bottom-1/4 left-5 rounded-3xl" src="/Icons/Google.png" alt="" />
        </div>
        <div className="px-7 mt-12">
            <div className="text-3xl font-semibold flex justify-between">Google <Avatar.Group >
                <Avatar src="/avatar.png" />
                <Avatar src="/avatar1.png" />
                <Avatar src="/avatar2.png" />
                <Avatar className="[&>span]:!text-xs">+10k</Avatar>
            </Avatar.Group></div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5" stroke={1.5} /> New York, United States
            </div>
        </div>
        <Divider my="xl"/>
        <div>
            <Tabs  variant="outline"  radius="md" defaultValue={section[0].toLowerCase()}>
                <Tabs.List className="font-semibold [&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button]:!text-xl mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                    {
                        section.map((item, index) => <Tabs.Tab key={index} value={item.toLowerCase()} >
                            {item}
                        </Tabs.Tab>)
                    }

                </Tabs.List>
                <Tabs.Panel value="about">
                    <AboutComp/>
                </Tabs.Panel>

                <Tabs.Panel value="jobs">
                    <CompanyJobs/>
                </Tabs.Panel>

                <Tabs.Panel value="employees">
                    <CompanyEmployees/>
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}
export default Company;