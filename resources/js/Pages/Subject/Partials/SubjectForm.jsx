import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from '@/Components/RadioInput';
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import SubjectEditPopupForm from "./SubjectEditPopupForm";

export default function SubjectForm({
    subjects = [],
    eLearningSubjects = [],
}) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        id: "",
        title: "",
        e_learning_subject_id: "",
        short_title: "",
        is_practical_paper: "No",
        is_co_scholastic: "No",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // handle edit
    const handleEdit = (e, item) => {
        e.preventDefault();
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

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
                router.delete(route('subject.destroy', id));
            }
        });
    }


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Subjects List
                                    <span>
                                        (Total : {subjects?.length})
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th>Subject Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {subjects?.length > 0 ?
                                            subjects?.map((item, index) => (
                                                <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.title} {item?.is_co_scholastic === 'Yes' && <span className='badge primary'>{item?.is_co_scholastic === 'Yes' ? 'C' : ''}</span>} </td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => setData(item)}
                                                                    className="bg-warning/80 "
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="bg-danger/80 "
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Subjects not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        {data?.id ? 'Update' : 'Add'} subject
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFormDataInsert}>

                                        {/* Start Field  */}
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="title"
                                                        value="Subject Name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="title"
                                                    value={data?.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target
                                                                .value
                                                        )
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
                                        {/* Start Field  */}

                                        <div className="col-span-12 mt-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="e_learning_subject_id"
                                                    value="Link with e-learning subject"
                                                />
                                                <SelectInput
                                                    id="e_learning_subject_id"
                                                    data_label="Class"
                                                    data={eLearningSubjects}
                                                    value={
                                                        data.e_learning_subject_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "e_learning_subject_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.e_learning_subject_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12 mt-4">
                                            <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is it a practical paper ? <span className="text-danger">*</span></h6>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name="is_practical_paper"
                                                        value="Yes"
                                                        checked={data.is_practical_paper === "Yes"}
                                                        onChange={() => setData("is_practical_paper", "Yes")}
                                                    />
                                                    <RadioInput
                                                        name="is_practical_paper"
                                                        value="No"
                                                        checked={data.is_practical_paper === "No"}
                                                        onChange={() => setData("is_practical_paper", "No")}
                                                    />
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.is_practical_paper
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12 mt-4">
                                            <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Is it a Co-Scholastic ? <span className="text-danger">*</span></h6>
                                            <div className="educare-create-school-settings-list-check min-width-full">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name="is_co_scholastic"
                                                        value="Yes"
                                                        checked={data.is_co_scholastic === "Yes"}
                                                        onChange={() => setData("is_co_scholastic", "Yes")}
                                                    />
                                                    <RadioInput
                                                        name="is_co_scholastic"
                                                        value="No"
                                                        checked={data.is_co_scholastic === "No"}
                                                        onChange={() => setData("is_co_scholastic", "No")}
                                                    />
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.is_co_scholastic
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Start Field  */}
                                        <div className="col-span-12 my-4">
                                            <InputLabel htmlFor="short_title" value="Description" />
                                            <TextareaInput
                                                id="short_title"
                                                value={data?.short_title}
                                                onChange={(e) => setData('short_title', e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError
                                                message={
                                                    errors?.short_title
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Start Field  */}

                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex gap-[15px]">
                                                {/* <PrimaryButton
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                    disabled={processing}
                                                    type="submit"
                                                >
                                                    {data?.id ? 'Update' : 'Add'} subject
                                                </PrimaryButton> */}
                                                <PrimaryButton
                                                    className="educare-primary-btn-md-fill"
                                                    disabled={processing}
                                                    type="submit"
                                                >
                                                    {data?.id ? 'Update' : 'Add'} subject
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    className="educare-gray-btn-md-stroke"
                                                    disabled={processing}
                                                    type="button"
                                                    onClick={() => {
                                                        setEditData([])
                                                        reset()
                                                    }}
                                                >
                                                    Reset
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SubjectEditPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData} />
        </>
    );
}
