import { ActionIcon } from "@mantine/core"
import { useState } from "react";
import { useSelector } from "react-redux";
import CertiInput from "./CertiInput";
import CertiCard from "./CertiCard";
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const Certification = () => {
    const profile = useSelector((state: any) => state.profile);
    const matches = useMediaQuery('(max-width: 475px)');
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleClick = () => {
        setEdit(!edit);
}
    return <div data-aos="fade-up">
        <div className="text-2xl font-semibold mb-4 flex justify-between">Certifications <div className="flex gap-2"><ActionIcon  onClick={() => setAddCerti(true)} variant="subtle" color="brightSun.4" size={matches?"md":"lg"} ><IconPlus className="w-4/5 h-4/5" stroke={1.5} /></ActionIcon><ActionIcon onClick={handleClick} variant="subtle" color={edit ? "red.8" : "brightSun.4"} size={matches?"md":"lg"} >{edit ? <IconX className="w-4/5 h-4/5" stroke={1.5} /> : <IconPencil className="w-4/5 h-4/5" stroke={1.5} />}</ActionIcon></div></div>
        <div className="flex flex-col gap-8">
            {
                profile?.certifications?.map((certi: any, index: number) => <CertiCard edit={edit} index={index} key={index} {...certi} />)
            }
            {addCerti && <CertiInput add  setEdit={setAddCerti} />}
        </div>
    </div>
}
export default Certification;