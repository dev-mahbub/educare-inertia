import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";


const ProcessSalaryTopForm = ({
    data,
    setData,
    errors,
    handleTopForm,
    staffs,
    paymentMonths,
    setAttendanceDeductionData,
    setTotalAbsentDeduction,
    setTotalAbsentDeductionAmount,
    setStaffExtraDutyData,
    setTotalExtraDutyAmount
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

            setAttendanceDeductionData([]);
            setTotalAbsentDeduction(0);
            setTotalAbsentDeductionAmount(0);
            setStaffExtraDutyData([]);
            setTotalExtraDutyAmount(0);

            const form_data = {
                employee_id: data?.employee_id,
            }

            router.post(route('salary.process'), form_data);
        }
    }
    // handle employee id change end

    // handle change staff start
    const handleChangeStaff = (value) => {
        setAttendanceDeductionData([]);
        setTotalAbsentDeduction(0);
        setTotalAbsentDeductionAmount(0);
        setStaffExtraDutyData([]);
        setTotalExtraDutyAmount(0);

        setData((prevData) => ({
            ...prevData,
            staff_id: value,
            payment_month_id: "",
        }));

        const form_data = {
            staff_id:value
        }

        router.post(route('salary.process'), form_data);
    }
    // handle change staff end

    // handle change payment month start
    const handleChangePaymentMonth = (value) => {
        setAttendanceDeductionData([]);
        setTotalAbsentDeduction(0);
        setTotalAbsentDeductionAmount(0);
        setStaffExtraDutyData([]);
        setTotalExtraDutyAmount(0);

        setData((prevData) => ({
            ...prevData,
            payment_month_id: value
        }));

        const form_data = {
            staff_id: data?.staff_id,
            payment_month_id: value
        }

        router.post(route('salary.process'), form_data);
    }
    // handle change payment month end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    Process Salary of Staffs
                </h5>
            </div>

            <form onSubmit={handleTopForm}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="employee_id"
                                            placeHolder="Search emp.code"
                                            value={data?.employee_id}
                                            onChange={(e) =>
                                                handleEmployeeIdChange(e)
                                            }
                                            onKeyPress={(e) => {
                                                handleEmployeeIdKeyPress(e)
                                            }}
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.employee_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            data_label="Staff"
                                            data={staffs}
                                            value={data.staff_id}
                                            onChange={(e) =>
                                                handleChangeStaff(e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.staff_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <select
                                            disabled={data?.staff_id ? false : true}
                                            className={`focus:border-primary focus:ring-primary block ${data?.staff_id ? '' : 'cursor-not-allowed'}`}
                                            value={data.payment_month_id}
                                            onChange={(e) =>
                                                handleChangePaymentMonth(e.target.value)
                                            }
                                        >
                                            <option value="">Select Month</option>
                                            {paymentMonths?.length &&
                                                paymentMonths?.map((item, index) => (
                                                    <option className={item?.disabled == true ? 'font-thin' : 'font-medium'} key={index} value={item.id} disabled={item?.disabled == true}>{item.title}</option>
                                                ))}
                                        </select>

                                        {/* <SelectInput
                                            data_label="Month"
                                            data={paymentMonths}
                                            value={data.payment_month_id}
                                            onChange={(e) =>
                                                handleChangePaymentMonth(e.target.value)
                                            }
                                            className={`block ${data?.staff_id ? '' : 'cursor-not-allowed'}`}
                                            disabled={data?.staff_id ? false : true}
                                        /> */}
                                        <InputError
                                            message={errors.payment_month_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {data?.payment_month_id &&
                                    <>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Basic Pay"
                                                />
                                                <TextInput
                                                    value={
                                                        data.basic_pay
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "basic_pay",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.basic_pay
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Grade Pay"
                                                />
                                                <TextInput
                                                    value={
                                                        data.grade_pay
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "grade_pay",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block disabled"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.grade_pay
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom form  */}

            </form>
        </>
    );
};

export default ProcessSalaryTopForm;
