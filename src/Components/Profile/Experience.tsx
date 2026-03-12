import { ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpInput from "./ExpInput";
import ExpCard from "./ExpCard";
import { useMediaQuery } from "@mantine/hooks";

const Experience=()=>{
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 475px)');
    const profile=useSelector((state:any)=>state.profile);
    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);
    const handleClick = () => {
            setEdit(!edit);
    }
    return <div data-aos="fade-up">
    <div className="text-2xl font-semibold mb-4 flex justify-between">Experience <div className="flex gap-2"><ActionIcon onClick={() => setAddExp(true)} variant="subtle" color="brightSun.4" size={matches?"md":"lg"} ><IconPlus className="w-4/5 h-4/5" stroke={1.5} /></ActionIcon><ActionIcon onClick={ handleClick} variant="subtle" color={edit ? "red.8" : "brightSun.4"} size={matches?"md":"lg"} >{edit? <IconX className="w-4/5 h-4/5" stroke={1.5} /> : <IconPencil className="w-4/5 h-4/5" stroke={1.5} />}</ActionIcon></div></div>
    <div className="flex flex-col gap-8">
        {
            profile?.experiences?.map((exp:any, index:number) => <ExpCard edit={edit} index={index} key={index} {...exp} />)
        }
        {addExp && <ExpInput add   setEdit={setAddExp} />}
    </div>
</div>
}
export default Experience;