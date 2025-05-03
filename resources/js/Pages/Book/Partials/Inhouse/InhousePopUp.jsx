import React, { useState } from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from "@mui/material";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
const InhousePopUp = ({ className = "", listPopup, setListPopup }) => {
    const [selectBookType, setSelectBookType] = useState("");
    const closeModal = () => {
        setListPopup(false);
        reset();
    };

    const dummyData = [
        {
            id: 1,
            type: "Noval",
        },
        {
            id: 2,
            type: "Refrence",
        },
        {
            id: 3,
            type: "Dummy",
        },
    ];

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        book_type: "",
    });
    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Book Type</h5>
                            </div>

                            {/* form */}
                            <div className="educare-common-card mt-2.5">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="book_type"
                                                            value="Type"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="book_type"
                                                    value={
                                                        data.book_type
                                                            ? data.book_type
                                                            : selectBookType
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "book_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.book_type}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12">
                                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="educare-gray-btn-md-stroke"
                                                >
                                                    Close
                                                </button>
                                                <PrimaryButton className="educare-primary-btn-md-fill">
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end */}

                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dummyData.map((item) => (
                                                <tr key={item.id}>
                                                    <td> {item.id} </td>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        onClick={() =>
                                                                            setSelectBookType(
                                                                                item.type
                                                                            )
                                                                        }
                                                                        type="button"
                                                                        className="educare-warning-btn-sm-fill"
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
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};

export default InhousePopUp;
