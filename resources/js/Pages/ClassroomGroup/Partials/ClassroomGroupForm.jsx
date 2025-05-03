import React, { useEffect, useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import TextareaInput from "@/Components/TextareaInput";
import ClassroomGroupEditPopupForm from "./ClassroomGroupEditPopupForm";

export default function ClassroomGroupForm({ classroomGroups }) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const handleContactEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        discussion: ""
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("classroom_group.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
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
                router.delete(`/class-group/delete/${id}`);
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
                                    Class groups list <span>(Total : {classroomGroups?.length})</span>
                                </h5>
                            </div>

                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classroomGroups?.length ?
                                            classroomGroups?.map((item, index) => (
                                                <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.title}</td>
                                                    <td>{item?.discussion}</td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleContactEditPopup(item)}
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
                                                <td className="text-center text-red-500" colSpan="7">Classroom not found</td>
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
                                        Add class group
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Class group name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="city"
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
                                                        htmlFor="discussion"
                                                        value="Description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextareaInput
                                                        id="discussion"
                                                        value={data?.discussion}
                                                        onChange={(e) => setData('discussion', e.target.value)}
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                >
                                                    Add Class Group
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
            <ClassroomGroupEditPopupForm editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} editData={editData}></ClassroomGroupEditPopupForm>
        </>
    );
}
