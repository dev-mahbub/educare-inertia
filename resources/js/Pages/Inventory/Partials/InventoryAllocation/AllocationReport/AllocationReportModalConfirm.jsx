import React from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
const AllocationReportModalConfirm = ({
    className = "",
    singlePopup,
    setSinglePopup,
}) => {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        cancel_reason: "",
    });

    const singlePopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
    };
    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={singlePopup} onClose={closeModal}>
                    <form
                        onSubmit={singlePopupData}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Cancel Allocation</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="cancel_reason"
                                                value="Cancel Allocation Reason"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="cancel_reason"
                                        value={data.cancel_reason}
                                        onChange={(e) =>
                                            setData(
                                                "cancel_reason",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.cancel_reason}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
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
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default AllocationReportModalConfirm;
