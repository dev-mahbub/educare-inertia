import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";


const StaffEarningDeductionForm = ({
    staffs,
    payScales,
    data,
    setData,
    errors,
    setSelectedPayScale
}) => {
    // handle employee id change start
    const handleEmployeeIdChange = (e) => {
        const employee_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            employee_id: employee_id
        }));
    }

    const handleEmployeeIdKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                employee_id: data?.employee_id,
            }

            router.post(route('salary.teacher_earning'), form_data);
        }
    }
    // handle employee id change end

    // handle change form data start
    const handleChangeFormData = (field, value) => {
        if (field == 'basic_pay' || field == 'grade_pay') {
            if (value == '' || isNaN(value)) {
                value = 0;
            } else if (value?.includes('.')) {
                value = String(value)?.split('.')[0] ?? 0;
            }

            value = parseInt(value);
        }

        setData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    }
    // handle change form data end

    // handle change staff start
    const handleChangeStaff = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: value,
            pay_scale_id: ""
        }));

        const form_data = {
            staff_id: value
        }

        router.post(route('salary.teacher_earning'), form_data);
    }
    // handle change staff end

    // handle change payscale start
    const handleChangePayScale = (value) => {
        setData((prevData) => ({
            ...prevData,
            pay_scale_id: value
        }));

        setSelectedPayScale(payScales?.find(item => item?.id == value) ?? {});
    }
    // handle change payscale end

    const handleForm = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleForm}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-card-title mr-auto pb-none mb-5">
                            <h5>
                                Staff Earning And Deduction
                            </h5>
                        </div>
                        {/* Add PayScale form start */}
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Search Staff"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data?.employee_id}
                                            onChange={(e) =>
                                                handleEmployeeIdChange(e)
                                            }
                                            onKeyPress={(e) => {
                                                handleEmployeeIdKeyPress(e)
                                            }}
                                            className="block"
                                            placeHolder="Search emp. code"
                                        />
                                        <InputError
                                            message={errors.employee_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Staff"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            data_label="Staff"
                                            data={staffs}
                                            value={
                                                data?.staff_id
                                            }
                                            onChange={(e) =>
                                                handleChangeStaff( e.target.value)
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
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Pay Scale"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            data_label="Pay Scale"
                                            data={payScales}
                                            value={
                                                data?.pay_scale_id
                                            }
                                            onChange={(e) =>
                                                handleChangePayScale(e.target.value)
                                            }
                                            className={`block ${data?.staff_id ? '' : 'cursor-not-allowed'}`}
                                            disabled={data?.staff_id ? false : true}
                                        />
                                        <InputError
                                            message={
                                                errors.pay_scale_id
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Bank Account No."
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.bank_account_no}
                                            onChange={(e) =>
                                                setData(
                                                    "bank_account_no",
                                                    e.target.value
                                                )
                                            }
                                            disabled={true}
                                            className="block disabled"
                                        />
                                        <InputError
                                            message={errors.bank_account_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Bank Name"
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.bank_name}
                                            onChange={(e) =>
                                                setData(
                                                    "bank_name",
                                                    e.target.value
                                                )
                                            }
                                            disabled={true}
                                            className="block disabled"
                                        />
                                        <InputError
                                            message={errors.bank_name}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="PF Account Number"
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.pf_account_number}
                                            onChange={(e) =>
                                                setData(
                                                    "pf_account_number",
                                                    e.target.value
                                                )
                                            }
                                            disabled={true}
                                            className="block disabled"
                                        />
                                        <InputError
                                            message={errors.pf_account_number}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="UAN"
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.uan}
                                            onChange={(e) =>
                                                setData(
                                                    "uan",
                                                    e.target.value
                                                )
                                            }
                                            disabled={true}
                                            className="block disabled"
                                        />
                                        <InputError
                                            message={errors.uan}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="IFSC"
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            value={data.ifsc}
                                            onChange={(e) =>
                                                setData(
                                                    "ifsc",
                                                    e.target.value
                                                )
                                            }
                                            disabled={true}
                                            className="block disabled"
                                        />
                                        <InputError
                                            message={errors.ifsc}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="basic_pay"
                                                    value="Basic Pay"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="basic_pay"
                                            value={data?.basic_pay}
                                            onChange={(e) =>
                                                handleChangeFormData("basic_pay", e.target.value)
                                            }
                                            // type='number'
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.basic_pay}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="grade_pay"
                                                    value="Grade Pay"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>

                                        <TextInput
                                            id="grade_pay"
                                            value={data.grade_pay}
                                            onChange={(e) =>
                                                handleChangeFormData("grade_pay", e.target.value)
                                            }
                                            // type='number'
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.grade_pay}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Add PayScale form end */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default StaffEarningDeductionForm;
