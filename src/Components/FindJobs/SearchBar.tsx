import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";

import MultiInput from "./MultiInput";
import React, { useEffect, useState } from "react";
import { dropdownData } from "../../Data/JobsData";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery('(max-width: 475px)');
    const filter=useSelector((state:any)=>state.filter);
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));
    }
    useEffect(()=>{
        if(!filter.salary)setValue([0, 300]);
    }, [filter])




    return (<div>
        <div className="flex justify-end">

         {matches&&<Button onClick={toggle} m="sm" radius="lg" className="align" variant="outline" color="brightSun.4" autoContrast >{opened?"Close":"Filters"}</Button>}
        </div>
        <Collapse in={(opened || !matches)}>
        <div className="px-5 lg-mx:!flex-wrap py-8 items-center !text-mine-shaft-100 flex ">

            {
                dropdownData.map((item, index) => {
                    return <React.Fragment key={index}><div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1" ><MultiInput title={item.title} icon={item.icon} options={item.options} />
                    </div>
                        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" /></React.Fragment>

                })
            }
            <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] xs-mx:mb-1 sm-mx:w-[48%] text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10 xs-mx:w-full">
                <div className="flex mb-1 justify-between">
                    <div>Salary</div>
                    <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
                </div>
                <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange} />
            </div>
        </div>
        </Collapse>
    </div>
    )
}
export default SearchBar;