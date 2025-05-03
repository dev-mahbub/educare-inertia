import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';

export default function ApprovePopup({
    className = '',
    approvePopup,
    setApprovePopup,
    selectedStaffSalaryIncrement,
    setSelectedStaffSalaryIncrement,
    formData
}) {

    const {
        data,
        setData,
        patch,
        processing,
        reset,
        errors,
    } = useForm({
        approval_note: ''
    });

    const approvePopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setApprovePopup(false);
        reset();
        setSelectedStaffSalaryIncrement({});
    };


    // handle approve staff salary increment start
    const handleApproveStaffSalaryIncrement = (e) => {
        e.preventDefault();

        patch(route('salary.increment_staff_salary.approve', selectedStaffSalaryIncrement?.id), {
            onSuccess: () => {
                closeModal();

                const form_data = {
                    staff_id: formData?.staff_id
                }

                router.post(route('salary.increment_staff_salary'), form_data);
            }
        });
    }
    // handle approve staff salary increment end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={approvePopup} onClose={closeModal}>
                    <form onSubmit={approvePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Approve Increment</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-4 mb-2.5">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Increament Date"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>

                                            <TextInput
                                                value={
                                                    selectedStaffSalaryIncrement?.increment_date
                                                }
                                                className="block cursor-not-allowed"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        value="Approval Note"
                                                    />
                                                </div>
                                            </div>
                                            <TextareaInput
                                                value={
                                                    data?.approval_note
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "approval_note",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.approval_note
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                type="button"
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleApproveStaffSalaryIncrement(e);
                                }}
                            >
                                Approve
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
