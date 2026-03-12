import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const ApplicationForm = () => {
    const navigate = useNavigate();
    const {id}=useParams();
    const user = useSelector((state: any) => state.user);
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const handlePreview = () => {
        form.validate();
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (!form.isValid()) return;
        setPreview(!preview);
    }
    const handleSubmit = async() => {
        setSubmit(true);
        let resume: any = await getBase64(form.getValues().resume);
        let applicant = { ...form.getValues(),applicantId:user.id, resume: resume.split(',')[1] };
        applyJob(applicant, id).then((res) => {
            setSubmit(false);
            navigate("/job-history");
            successNotification("Success", "Job Applied Successfully");
        }).catch((err) => { 
            setSubmit(false);
            errorNotification("Error", err.response.data.errorMessage);
        });

    }

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: user.name,
            email: user.email,
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty('Name cannot be empty'),
            email: isNotEmpty('Email cannot be empty'),
            phone: isNotEmpty('Phone cannot be empty'),
            website: isNotEmpty('Website cannot be empty'),
            resume: isNotEmpty('Resume cannot be empty'),
        }
    })
    return <><LoadingOverlay className="[&>span]:!fixed [&>span]:top-1/2" visible={submit} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'brightSun.4', type: 'bars', }} /><div className="text-xl font-semibold mb-5">Submit Your Application</div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap ">
                <TextInput {...form.getInputProps("name")} readOnly={true} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} variant={preview ? "unstyled" : "default"} label="Full Name" withAsterisk placeholder="Enter name" />
                <TextInput {...form.getInputProps("email")} variant={preview ? "unstyled" : "default"} readOnly={true} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Email" withAsterisk placeholder="Enter email" />
            </div>
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap ">
                <NumberInput {...form.getInputProps("phone")} variant={preview ? "unstyled" : "default"} readOnly={preview} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} clampBehavior="strict" min={0} max={9999999999} label="Phone Number" withAsterisk placeholder="Enter  phone" hideControls />
                <TextInput {...form.getInputProps("website")} variant={preview ? "unstyled" : "default"} readOnly={preview} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Personal Website" withAsterisk placeholder="Enter url" />
            </div>
            <FileInput {...form.getInputProps("resume")} variant={preview ? "unstyled" : "default"} readOnly={preview} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} withAsterisk leftSection={<IconPaperclip stroke={1.5} />} accept="application/pdf" label="Resume/CV" placeholder="Attach Resume/CV" leftSectionPointerEvents="none" />
            <Textarea {...form.getInputProps("coverLetter")} variant={preview ? "unstyled" : "default"} readOnly={preview} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} placeholder="Type something about yourself" label="Cover Letter" autosize minRows={4} />
            {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>}
            {preview && <div className="flex gap-10">
                <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
                <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
            </div>}
        </div></>
}
export default ApplicationForm;