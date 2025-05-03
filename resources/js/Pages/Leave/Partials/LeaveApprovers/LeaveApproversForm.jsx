import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';

const LeaveApproversForm = ({
    staffs
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_id: "",
    });

    // handle save leave approver start
    const handleSaveLeaveApprover = (e) => {
        e.preventDefault();

        post(route('leave.approvers.save'), {
            onSuccess: () => {
                reset();
            },
            onError: () => {

            }
        })
    }
    // handle save leave approver end

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    Manage Leave Approver
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="staff_id"
                                            value="Select Leave Approver"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="staff_id"
                                    data_label="Staff"
                                    data={staffs}
                                    value={
                                        data.staff_id
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "staff_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.staff_id
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick={handleSaveLeaveApprover}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveApproversForm;
