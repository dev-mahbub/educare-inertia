import React, { useState } from "react";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import Swal from "sweetalert2";

export default function PurchaseLeftFormPopup({
    className = "",
    listPopup,
    setListPopup,
    bookTypes = [],
}) {
    const closeModal = () => {
        setListPopup(false);
        reset();
    };

    const {
        data,
        setData,
        errors,
        reset,
        processing,
    } = useForm({
        id: "",
        title: "",
    });

    const handleBookTypeDataInsert = (e) => {
        e.preventDefault();
        router.post(route('book.book_type_create_update'), data);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('book.book_type_destroy', id));
            }
        });
    }

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3 mb-4">
                                <h5>Book Type</h5>
                            </div>

                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 ">
                                    <form>
                                        <div className="educare-input-field-styles mb-2.5">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel value="Type" />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                value={data?.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="block"
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>
                                        <div className="flex flex-wrap justify-end gap-2.5">
                                            <PrimaryButton
                                                className="educare-gray-btn-md-stroke"
                                                onClick={closeModal}
                                                disabled={processing}
                                                type="button"
                                            >
                                                Close
                                            </PrimaryButton>
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                                disabled={processing}
                                                type="button"
                                                onClick={(e) => handleBookTypeDataInsert(e)}
                                            >
                                                {data?.id ? 'Update' : 'Save'}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-span-12">
                                    <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Sr. No.</th>
                                                        <th> Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bookTypes?.length > 0 ?
                                                        bookTypes?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{++index}</td>
                                                                <td>{item.title}</td>
                                                                <td>
                                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Edit"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-warning-btn-sm-fill"
                                                                                    onClick={() => setData(item)}
                                                                                >
                                                                                    <i className="icon-editing"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Delete"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    onClick={(e) => handleDelete(e, item?.id)}

                                                                                >
                                                                                    <i className="icon-TrashSimple"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
