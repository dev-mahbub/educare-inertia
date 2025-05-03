import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ClassNamesList from "../List/ClassNamesList";


export default function CreateClassNameForm({ classNames }) {

    // const [editPopupOpen, setEditPopupOpen] = useState(false);
    // const [editData, setEditData] = useState([]);
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        sections: [],
        description: ""
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        if(data?.sections?.length == 0) {
            toast.error("Please select at least one section!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.sections?.length > 0 && data.sections.some(item => item == '')) {
            toast.error("Section cannot be empty!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route("class_name.save"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setFormFields([
                        // { sections: '' }
                    ]);
                }
            });
        }
    };

    // update
    // const handleEditPopup = (editData) => {
    //     setEditData(editData);
    //     setEditPopupOpen(!editPopupOpen);
    // };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('class_name.destroy', id));
            }
        });
    }

    //repeatable form fields start
    // const [formFields, setFormFields] = useState([
    //     { add_field_section: '' },
    // ])
    const [formFields, setFormFields] = useState([
        // {sections: ''}
    ])

    const handleFormChange = (event, index) => {
        const newFormFields = [...formFields];
        newFormFields[index]['sections'] = event.target.value;
        setFormFields(newFormFields);
        setData("sections", newFormFields?.map(item => item?.sections));
    }

    const addFields = () => {
        const newFormFields = [...formFields, { sections: "" }];
        setFormFields(newFormFields);
        // setFormFields([...formFields, { sections: "" }]);
        setData("sections", newFormFields?.map(item => item?.sections));
    }

    const removeFields = (index) => {
        const newFormFields = [...formFields];
        newFormFields.splice(index, 1)
        setFormFields(newFormFields)
        setData("sections", newFormFields?.map(item => item?.sections));
    }
    //repeatable form fields end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <ClassNamesList classNames={classNames} />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add Class
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
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
                                                <button type="button" className="educare-primary-btn-md-fill bg-primary" onClick={addFields}>
                                                    <i className="icon-PlusCircle mr-0.5"></i>Add Section
                                                </button>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="flex flex-col gap-[20px] w-full">
                                                        {formFields.map((form, index) => (
                                                            <div className="educare-input-singel-field w-full" key={index}>
                                                                <div className="flex items-center gap-[10px]">
                                                                    <div className="educare-input-field-styles w-full">
                                                                        <TextInput
                                                                            id="add_field_section"
                                                                            name="add_field_section[]"
                                                                            value={form?.sections}
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
                                        <div className="educare-classroom-button-wrappers">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    type="submit"
                                                    className="educare-primary-btn-lg-fill bg-primary"
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
