import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
 
const StatusPopUp = ({ className = "", changeStatus, setChangeStatus }) => {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        select_status:"",
    });

    const singlePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setChangeStatus(false);
        reset();
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={changeStatus} onClose={closeModal}>
                    <form
                        onSubmit={singlePopupData}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Change Applicant's Status</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="select_status"
                                        value="Applicant's Status"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <SelectInput
                                id="select_status"
                                data_label="Status"
                                data={[]}
                                value={
                                    data.select_status
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_status",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_status
                                }
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

export default StatusPopUp;
