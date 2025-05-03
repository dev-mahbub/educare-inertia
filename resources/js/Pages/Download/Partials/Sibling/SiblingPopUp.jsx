import React from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
const SiblingPopUp = ({ className = "", listPopup, setListPopup }) => {
    const closeModal = () => {
        setListPopup(false);
        reset();
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        father_first_name: "",
        father_middle_name: "",
        father_last_name: "",
        father_mobile: "",
        mother_first_name: "",
        mother_middle_name: "",
        mother_last_name: "",
        mother_mobile: "",
    });

    const handlePopUpdata = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Previous Parent</h5>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Father Name</th>
                                                <th> Mother Name</th>
                                                <th>Father Mobile</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* form */}
                            <form
                                onSubmit={handlePopUpdata}
                                className="mt-2.5 mb-2.5"
                            >
                                <div className="educare-card-title mr-auto pb-none mt-5 mb-5">
                                    <h5>
                                        <i className="icon-user"></i>
                                        Add Parent Detail
                                    </h5>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="father_first_name"
                                                        value="Father First Name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                id="father_first_name"
                                                value={data.father_first_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "father_first_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.father_first_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="father_middle_name"
                                                value="Father Middle Name"
                                            />
                                            <TextInput
                                                id="father_middle_name"
                                                value={data.father_middle_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "father_middle_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.father_middle_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="father_last_name"
                                                value="Father Last Name"
                                            />
                                            <TextInput
                                                id="father_last_name"
                                                value={data.father_last_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "father_last_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.father_last_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="father_mobile"
                                                        value="Father Mobile"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                id="father_mobile"
                                                value={data.father_mobile}
                                                onChange={(e) =>
                                                    setData(
                                                        "father_mobile",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.father_mobile}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="mother_first_name"
                                                        value="Mother First Name"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextInput
                                                id="mother_first_name"
                                                value={data.mother_first_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "mother_first_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.mother_first_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="mother_middle_name"
                                                value="Mother Middle Name"
                                            />
                                            <TextInput
                                                id="mother_middle_name"
                                                value={data.mother_middle_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "mother_middle_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.mother_middle_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="mother_last_name"
                                                value="Mother Last Name"
                                            />
                                            <TextInput
                                                id="mother_last_name"
                                                value={data.mother_last_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "mother_last_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.mother_last_name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="mother_mobile"
                                                value="Mother Mobile"
                                            />
                                            <TextInput
                                                id="mother_mobile"
                                                value={data.mother_mobile}
                                                onChange={(e) =>
                                                    setData(
                                                        "mother_mobile",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.mother_mobile}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-2.5 col-span-12">
                                        <PrimaryButton
                                            className="educare-gray-btn-md-stroke"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </PrimaryButton>
                                        <PrimaryButton className="educare-primary-btn-md-fill">
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};

export default SiblingPopUp;
