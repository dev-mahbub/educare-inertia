import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const LeaveTypeForm = ({
    editableData,
    setEditableData,
    formMode,
    setFormMode
}) => {
    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        acronym: "",
        description: "",
        display_order: "",
        auto_leave_deduction_order: ""
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: editableData.title ?? "",
            acronym: editableData.acronym ?? "",
            description: editableData.description ?? "",
            display_order: editableData.display_order ?? "",
            auto_leave_deduction_order: editableData.auto_leave_deduction_order ?? ""
        }));
    }, [editableData]);

    // handle save leave type start
    const handleSaveLeaveType = (e) => {
        e.preventDefault();

        post(route('leave.save_type'), {
            onSuccess: () => {
                handleResetForm();
            }
        });
    }
    // handle save leave type end

    // handle update leave type start
    const handleUpdateLeaveType = (e) => {
        e.preventDefault();

        put(route('leave.update_type', editableData?.id), {
            onSuccess: () => {
                handleResetForm();
            }
        });
    }
    // handle update leave type end

    // handle reset form start
    const handleResetForm = () => {
        setEditableData({});
        setFormMode('create');
        reset();
    }
    // handle reset form end

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>Leave Type</h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-7 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Leave Type"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="title"
                                    value={
                                        data.title
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.title
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-5 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="acronym"
                                            value="Acronym"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="acronym"
                                    value={
                                        data.acronym
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "acronym",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.acronym
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-7 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="description"
                                    value="Detail"
                                />
                                <TextInput
                                    id="description"
                                    value={
                                        data.description
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.description
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-5 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="display_order"
                                    value="Display Order"
                                />
                                <TextInput
                                    id="display_order"
                                    value={
                                        data.display_order
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "display_order",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.display_order
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-7 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="auto_leave_deduction_order"
                                            value="Auto Leave Deducted Order"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="auto_leave_deduction_order"
                                    value={
                                        data.auto_leave_deduction_order
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "auto_leave_deduction_order",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.auto_leave_deduction_order
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    type="button"
                                    className="educare-gray-btn-md-stroke"
                                    onClick={handleResetForm}
                                >
                                    Reset
                                </PrimaryButton>
                                {formMode == 'create' &&
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                        type="button"
                                        onClick={handleSaveLeaveType}
                                    >
                                        Save
                                    </PrimaryButton>
                                }

                                {formMode == 'edit' &&
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                        type="button"
                                        onClick={handleUpdateLeaveType}
                                    >
                                        Update
                                    </PrimaryButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveTypeForm;
