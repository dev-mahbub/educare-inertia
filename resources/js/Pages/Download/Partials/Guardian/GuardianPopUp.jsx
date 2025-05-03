import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
const GuardianPopUp = ({
    className = "",
    singlePopup,
    setSinglePopup,
    selectedGuardian,
    setSelectedGuardian
}) => {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        patch,
        errors,
    } = useForm({
        guardianid: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            guardianid: selectedGuardian?.guardianid ?? "",
        }));
    }, [selectedGuardian]);

    const singlePopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
        setSelectedGuardian({});
    };

    // handle update guardian id start
    const handleUpdateGuardianId = (e) => {
        e.preventDefault();

        patch(route('download.guardian.update', selectedGuardian?.id), {
            onSuccess: () => {
                closeModal()
            },
            onError: () => {
            }
        })
    }
    // handle update guardian id end


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
                                <h5>Update GuardianId</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="guardianid"
                                            value={`Guardian Name : ${selectedGuardian?.guardian_name ?? ""}`}
                                        />
                                        <TextInput
                                            id="guardianid"
                                            value={data.guardianid}
                                            onChange={(e) =>
                                                setData(
                                                    "guardianid",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.guardianid}
                                            className="mt-2"
                                        />
                                    </div>
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
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                onClick={(e) => {
                                    handleUpdateGuardianId(e)
                                }}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default GuardianPopUp;
