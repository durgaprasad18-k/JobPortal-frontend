import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDispatch } from "react-redux";
import { useDebouncedState, useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState<[number, number]>([0, 50]);
    const [name, setName] =  useState('');;
    const handleChange = (name:any, event:any) => {
        if(name=="exp"){
            dispatch(updateFilter({exp:event}));
        }
        else{
            dispatch(updateFilter({name:event.target.value}));
            setName(event.target.value);
        }
    }

    return (<div>
        <div className="flex justify-end">

         {matches&&<Button onClick={toggle} m="sm" radius="lg" className="align" variant="outline" color="brightSun.4" autoContrast >{opened?"Close":"Filters"}</Button>}
        </div>
        <Collapse in={(opened || !matches)}>
        <div className="px-5 py-8 lg-mx:!flex-wrap items-center !text-mine-shaft-100 flex ">
            <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 flex items-center ">
                <div className="bg-mine-shaft-900 rounded-full mr-2 text-bright-sun-400 p-1"><IconUserCircle size={20} /> </div>
                <Input defaultValue={name} onChange={(e)=>handleChange("name",e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
            </div>
            <Divider className="sm-mx:hidden"  mr="xs" size="xs" orientation="vertical" />
            
            {
                searchFields.map((item, index) => {
                    return <React.Fragment key={index}><div key={index} className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1  " ><MultiInput title={item.title} icon={item.icon} options={item.options} />
                    </div>
                        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" /></React.Fragment>

                })
            }
            <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%]  sm-mx:w-[48%] xs-mx:w-full text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10 xs-mx:mb-1 ">
                <div className="flex mb-1 justify-between">
                    <div>Experience (Year)</div>
                    <div>{value[0]}  - {value[1]} </div>
                </div>
                <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={(e)=>handleChange("exp", e)} />
            </div>
        </div>
        </Collapse>
        </div>
    )
}
export default SearchBar;