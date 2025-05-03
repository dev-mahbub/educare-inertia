import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import Swal from "sweetalert2";
import OccupationEditPopupForm from "./OccupationEditPopupForm";

export default function OccupationForm({ occupations }) {

    const [occupationEditPopupOpen, setOccupationEditPopupOpen] = useState(false);
    const [occupationData, setOccupationData] = useState([]);

    const handleOccupationEditPopup = (occupationData) => {
        setOccupationData(occupationData);
        setOccupationEditPopupOpen(!occupationEditPopupOpen);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        name: "",
        details: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("occupation.save"), {
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
                router.delete(`/occupation/delete/${id}`);
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
                                    Occupations List
                                    <span>
                                        (Total : {occupations?.length})
                                    </span>
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
                                        {occupations?.length > 0 ?
                                            occupations?.map((item, index) => (
                                                <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.details.slice(0, 80)}</td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleOccupationEditPopup(item)}
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
                                                <td className="text-center text-red-500" colSpan="7">Occupations not found</td>
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
                                        Add new a occupations
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFormDataInsert}>
                                        {/* Start Field  */}
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Occupation title*"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="name"
                                                    value={data?.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
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
                                                        errors?.name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="col-span-12 my-4">
                                            <InputLabel htmlFor="details" value="Description" />
                                            <TextareaInput
                                                id="details"
                                                value={data?.details}
                                                onChange={(e) => setData('details', e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex gap-[15px]">
                                                <PrimaryButton
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                    disabled={processing}
                                                >
                                                    Add Occupation
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
            <OccupationEditPopupForm occupationEditPopupOpen={occupationEditPopupOpen} setOccupationEditPopupOpen={setOccupationEditPopupOpen} occupationData={occupationData} />
        </>
    );
}
