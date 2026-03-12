import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const ExpInput = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const select = fields;
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false

        },
        validate:{
            title: isNotEmpty('Title cannot be empty'),
            company: isNotEmpty('Company cannot be empty'),
            location: isNotEmpty('Location cannot be empty'),
            description: isNotEmpty('Description cannot be empty')
        }
    });
    useEffect(() => {
        if (!props.add) form.setValues({ 'title': props.title, 'company': props.company, 'location': props.location, 'description': props.description, 'startDate': new Date(props.startDate), 'endDate': new Date(props.endDate), 'working': props.working });
    }, []);

    const handleSave = () => {
        form.validate();
        if(!form.isValid())return;
        let exp = [...profile.experiences];
        if (props.add) {
            exp.push(form.getValues());
            exp[exp.length - 1].startDate = form.getValues().startDate.toISOString();
            exp[exp.length - 1].endDate = form.getValues().endDate.toISOString();
        }
        else {
            exp[props.index] = form.getValues();
            exp[props.index].startDate = form.getValues().startDate.toISOString();
            exp[props.index].endDate = form.getValues().endDate.toISOString();
        }
        let updatedProfile = { ...profile, experiences: exp };
        
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", `Experience ${props.add?"Added":"Updated"} Successfully`);
    }

    return <div data-aos="zoom-out">
        <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
        <div className=" flex gap-10  md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3" >
            <SelectInput form={form} name="title"  {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <SelectInput form={form} name="location"   {...select[2]} />
        <Textarea {...form.getInputProps("description")} withAsterisk className="my-3" label="Summary" autosize minRows={2} placeholder="Enter Summary" />
        <div className=" flex gap-10  md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
            <MonthPickerInput {...form.getInputProps("startDate")} maxDate={form.getValues().endDate || undefined} withAsterisk label="Start Date" />
            <MonthPickerInput disabled={form.getValues().working} minDate={form.getValues().startDate || undefined} maxDate={new Date()} withAsterisk label="End Date" placeholder="Pick date" {...form.getInputProps("endDate")} />
        </div>
        <Checkbox autoContrast label="Currently working here" checked={form.getValues().working} onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
        />
        <div className="my-3 flex gap-5">
            <Button color="green.8" onClick={handleSave} variant="light">Save</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}
export default ExpInput;