import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput = (props: any) => {
    const select = fields;
    const matches = useMediaQuery('(max-width: 475px)');

    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name:'',
            issuer:'',
            issueDate:new Date(),
            certificateId:''
        },
        validate:{
            name: isNotEmpty('Title cannot be empty'),
            issuer: isNotEmpty('Issuer cannot be empty'),
            issueDate: isNotEmpty('Issue Date cannot be empty'),
            certificateId: isNotEmpty('Certificate ID cannot be empty')
        }
    });
    const handleSave = () => {
        form.validate();
        if(!form.isValid())return;
        let certis = [...profile.certifications];
        if (props.add) {
            certis.push(form.getValues());
            certis[certis.length - 1].issueDate = form.getValues().issueDate.toISOString();
        }
        else {
            certis[props.index] = form.getValues();
            certis[props.index].issueDate = form.getValues().issueDate.toISOString();
        }
        
        let updatedProfile = { ...profile, certifications: certis };
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", `Certificate Added Successfully`);
    }
    return <div data-aos="zoom-out">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className=" flex gap-10  md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3" >
            <TextInput withAsterisk {...form.getInputProps('name')} label="Title" placeholder="Enter title" />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className=" flex gap-10  md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
            <MonthPickerInput  {...form.getInputProps('issueDate')} maxDate={new Date()} withAsterisk label="Issue Date" placeholder="Pick date"  />
            <TextInput  {...form.getInputProps('certificateId')} withAsterisk label="Certificate ID" placeholder="Enter ID" />
        </div>
        <div className="my-3 flex gap-5">
            <Button  color="green.8" onClick={handleSave} variant="light">Save</Button>
            <Button  color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}
export default CertiInput;