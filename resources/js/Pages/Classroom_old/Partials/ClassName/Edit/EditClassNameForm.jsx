import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import TextareaInput from "@/Components/TextareaInput";
import { Tooltip } from "@mui/material";
import ClassNamesList from "../List/ClassNamesList";
import { useEffect } from "react";



export default function EditClassNameForm({ classNames, className, dataSections }) {

    const [formFields, setFormFields] = useState(dataSections)
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        title: className.title,
        old_title: className.title,
        sections: dataSections,
        old_sections: dataSections,
        description: className.description
    });

    // useEffect(() => {
    //     setData(className);
    //    // formFields(className.sections)
    // }, [className]);


    //repeatable form fields start


    const handleFormChange = (event, index) => {
        const newFormFields = [...formFields];
        newFormFields[index] = event.target.value;
        setFormFields(newFormFields);
        setData("sections", newFormFields);
        console.log(newFormFields);
    }
    const addFields = () => {
        setFormFields([...formFields, ""])
    }
    const removeFields = (index) => {
        const newFormFields = [...formFields];
        newFormFields.splice(index, 1)
        setFormFields(newFormFields)
        setData("sections", newFormFields);
    }
    //repeatable form fields end

    const handleFormDataUpdate = (e) => {
        e.preventDefault();
        put(route("class_name.update", className.id), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    console.log(formFields);

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <ClassNamesList classNames={classNames}/>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Update Class
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataUpdate}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="title"
                                                        value="Name*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="title"
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData("title", e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextareaInput
                                                        id="description"
                                                        value={data?.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <button type="button" className="educare-primary-btn bg-primary" onClick={addFields}><i className="icon-plus"></i>Add Section</button>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="flex flex-col gap-[20px] w-full">
                                                        {formFields.map((title, index) => (
                                                            <div className="educare-input-singel-field w-full" key={index}>
                                                                <div className="flex items-center gap-[10px]">
                                                                    <div className="educare-input-field-styles w-full">
                                                                        <TextInput
                                                                            id="add_field_section"
                                                                            name="add_field_section[]"
                                                                            value={title}
                                                                            onChange={event => handleFormChange(event, index)}
                                                                            type="text"
                                                                            className="block"
                                                                        />
                                                                    </div>
                                                                    <div className="input-field-close-button">
                                                                        <div className="educare-input-action-button btn-red">
                                                                            <PrimaryButton type="button" onClick={() => removeFields(index)}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </PrimaryButton>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    type="submit"
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <CourseCategoryEditPopupForm editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} editData={editData}></CourseCategoryEditPopupForm> */}
        </>
    );
}
