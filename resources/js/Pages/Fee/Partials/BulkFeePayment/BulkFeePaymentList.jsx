import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const BulkFeePaymentList = ({
    banks = [],
    bankAccounts = [],
    paymentModes = [],
    studentFeeInstallments = [],
    loading,
    students,
    feeId,
    selectedStudentIds,
    setSelectedStudentIds,
    setFormFields,
    formFields,
    feeTypeAmountData,
    setFeeTypeAmountData
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
        is_copy_payment_details: false,
        check_payment: "",
        payment_mode: "",
        school_receipt_no: "",
        payment_note: ""
    });

    const dummyData = (e) => {
        e.preventDefault();
    };

    // handle copy payment details start
    const handleCopyPaymentDetails = (e) => {
        const is_copy_payment_details = e.target.checked;

        if (is_copy_payment_details == true) {
            const firstStudentData = Object.values(formFields)?.find(item => item?.student_id == selectedStudentIds[0] ?? "");

            if (firstStudentData) {
                const updatedFields = { ...formFields };

                selectedStudentIds?.forEach(id => {
                    let totalAmount = studentFeeInstallments[id]?.fee_type_amounts?.reduce((total, item) => total + item?.payable_amount ?? 0, 0);

                    updatedFields[id]['payment_mode'] = firstStudentData['payment_mode'];
                    updatedFields[id]['payment_date'] = firstStudentData['payment_date'];
                    updatedFields[id]['school_receipt_no'] = firstStudentData['school_receipt_no'];
                    updatedFields[id]['payment_note'] = firstStudentData['payment_note'];
                    updatedFields[id]['cheque_no'] = firstStudentData['cheque_no'];
                    updatedFields[id]['cheque_date'] = firstStudentData['cheque_date'];
                    updatedFields[id]['cheque_amount'] = totalAmount;
                    updatedFields[id]['bank_id'] = firstStudentData['bank_id'];
                    updatedFields[id]['branch'] = firstStudentData['branch'];
                    updatedFields[id]['bank_account_id'] = firstStudentData['bank_account_id'];
                    updatedFields[id]['dd_bank'] = firstStudentData['dd_bank'];
                    updatedFields[id]['dd_number'] = firstStudentData['dd_number'];
                    updatedFields[id]['dd_date'] = firstStudentData['dd_date'];
                    updatedFields[id]['dd_amount'] = totalAmount;
                    updatedFields[id]['paytm_ref_no'] = firstStudentData['paytm_ref_no'];
                    updatedFields[id]['paytm_mobile'] = firstStudentData['paytm_mobile'];
                    updatedFields[id]['neft_number'] = firstStudentData['neft_number'];
                    updatedFields[id]['neft_desc'] = firstStudentData['neft_desc'];
                    updatedFields[id]['upi_description'] = firstStudentData['upi_description'];
                    updatedFields[id]['upi_transaction_id'] = firstStudentData['upi_transaction_id'];
                });

                setFormFields(updatedFields);
            }
        }

        setData((prevData) => ({
            ...prevData,
            is_copy_payment_details: is_copy_payment_details
        }));
    }
    // handle copy payment details end


    // initialize form fields data start
    useEffect(() => {
        const formFieldsData = {};

        students?.forEach((student) => {
            const studentFeeTypeAmounts = studentFeeInstallments[student?.id] ? studentFeeInstallments[student?.id]?.fee_type_amounts : [];

            const feeInstallmentsArray = studentFeeTypeAmounts?.map(item => ({
                id: item?.id,
                student_id: item?.student_id ?? student?.id,
                discount_id: item?.discount_id ?? null,
                fee_id: item?.fee_id,
                fee_type_id: item?.fee_type_id,
                amount: item?.amount,
                payable_amount: item?.payable_amount,
                paid_amount: item?.payable_amount,
                discount_amount: item?.discount_amount,
                payment_status: item?.payment_status,
            }));

            formFieldsData[student?.id] = {
                student_id: student?.id,
                fee_installments_array: feeInstallmentsArray,
                payment_mode: "",
                payment_date: new Date(),
                school_receipt_no: "",
                payment_note: "",
                //cheque
                cheque_no: "",
                cheque_date: "",
                cheque_amount: "",
                bank_id: "",
                branch: "",
                //Bank Process form
                bank_account_id: "",
                //Demand Draft
                dd_bank: "",
                dd_number: "",
                dd_date: "",
                dd_amount: "",
                //Paytm
                paytm_ref_no: "",
                paytm_mobile: "",
                //Neft
                neft_number: "",
                neft_desc: "",
                //UPI
                upi_description: "",
                upi_transaction_id: "",
            };
        });

        if (Object.keys(formFieldsData)?.length > 0) {
            setFormFields(formFieldsData);
        }
        else {
            setFormFields({});
        }
    }, [students]);
    // initialize form fields data end


    // handle checkbox select start
    const handleCheckboxSelect = (id) => {
        // update selected student ids start
        let studentIds = [...selectedStudentIds];

        if (selectedStudentIds?.includes(id)) {
            setSelectedStudentIds([...selectedStudentIds]?.filter(item => item !== id)?.sort((a, b) => a - b));
            studentIds = [...selectedStudentIds]?.filter(item => item !== id)?.sort((a, b) => a - b);
        }
        else {
            setSelectedStudentIds([...selectedStudentIds, id]?.sort((a, b) => a - b));
            studentIds = [...selectedStudentIds, id]?.sort((a, b) => a - b);
        }

        if ([...selectedStudentIds]?.length == 0) {
            setData((prevData) => ({
                ...prevData,
                is_copy_payment_details: false
            }));
        }
        // update selected student ids end

        // calculate selected student fee amounts by fee type start
        if (Object.keys(studentFeeInstallments[id]?.fee_type_amounts)?.length > 0){
            const feeTypeAmounts = studentFeeInstallments[id]?.fee_type_amounts;
            const updatedData = feeTypeAmountData;

            Object.values(feeTypeAmounts).forEach(item => {
                const prevAmount = updatedData[item?.fee_type_title] ?? 0;

                if (studentIds?.includes(id)){
                    updatedData[item?.fee_type_title] = prevAmount + (item?.payable_amount ?? 0);
                }
                else {
                    if (prevAmount > 0) {
                        updatedData[item?.fee_type_title] = prevAmount - (item?.payable_amount ?? 0);
                    }
                    else {
                        updatedData[item?.fee_type_title] = 0;
                    }
                }
            });

            // Create a new object containing only non-zero values
            const filteredData = Object.fromEntries(
                Object.entries(updatedData).filter(([key, value]) => value !== 0)
            );

            setFeeTypeAmountData(filteredData);
        }
        // calculate selected student fee amounts by fee type end

        // update form fields data start
        const updatedFields = { ...formFields };

        updatedFields[id] = {
            ...updatedFields[id],
            payment_mode: "",
            payment_date: new Date(),
            school_receipt_no: "",
            payment_note: "",
            //cheque
            cheque_no: "",
            cheque_date: "",
            cheque_amount: "",
            bank_id: "",
            branch: "",
            //Bank Process form
            bank_account_id: "",
            //Demand Draft
            dd_bank: "",
            dd_number: "",
            dd_date: "",
            dd_amount: "",
            //Paytm
            paytm_ref_no: "",
            paytm_mobile: "",
            //Neft
            neft_number: "",
            neft_desc: "",
            //UPI
            upi_description: "",
            upi_transaction_id: "",
        };

        setFormFields(updatedFields);
        // update form fields data end
    }
    // handle checkbox select end


    // handle form value change start
    const handleFormValueChange = (studentId, key, value) => {
        const updatedFields = { ...formFields };

        updatedFields[studentId][key] = value;

        setFormFields(updatedFields);
    }
    // handle form value change end


    // handle change payment mode start
    const handleChangePaymentMode = (e, studentId) => {
        const payment_mode = e.target.value;

        if (payment_mode == 'Cheque' || payment_mode == 'Demand Draft') {
            let totalAmount = studentFeeInstallments[studentId]?.fee_type_amounts?.reduce((total, item) => total + item?.payable_amount ?? 0, 0);
            const updatedFields = { ...formFields };

            updatedFields[studentId]['cheque_amount'] = totalAmount;
            updatedFields[studentId]['dd_amount'] = totalAmount;
        }
    }
    // handle change payment mode end


    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end

    return (
        <div className="educare-admission-list-area">
            <form onSubmit={dummyData}>
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-[350px]">Student Name (Adm.No.)</th>
                                        <th>
                                            <div className="flex flex-wrap justify-between gap-2">
                                                <h5 className="text-headingLight">Payment Detail</h5>
                                                <div>
                                                {selectedStudentIds?.length > 0 &&
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="is_copy_payment_details"
                                                                name="is_copy_payment_details"
                                                                checked={
                                                                    data.is_copy_payment_details
                                                                }
                                                                onChange={(e) =>
                                                                    handleCopyPaymentDetails(e)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="is_copy_payment_details"
                                                                value="Copy first student payment details for all selected student"
                                                            />
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(students)?.length > 0 ?
                                            Object.values(students)?.sort(customSort)?.map((student, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {(studentFeeInstallments[student?.id] && studentFeeInstallments[student?.id]?.payment_status == 'Due') ?
                                                            <div>
                                                                <div>
                                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                            <Checkbox
                                                                                id="student_id"
                                                                                name="student_id"
                                                                                checked={
                                                                                   selectedStudentIds?.includes(student?.id)
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleCheckboxSelect(student?.id)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="educare-create-school-settings-list-title width-full">
                                                                            <InputLabel
                                                                                htmlFor="student_id"
                                                                                value={`${student?.classroom_roll?.roll_no ?? ""} - ${student?.first_name ?? ""} ${student?.middle_name ?? ""} ${student?.last_name ?? ""} (${student?.admission_no ?? ""})`}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {(Object.keys(studentFeeInstallments[student?.id]?.fee_type_amounts)?.length > 0 && selectedStudentIds?.includes(student?.id)) &&
                                                                    <div>
                                                                        <ul>
                                                                            <li>
                                                                                <span className="font-semibold">Payable Amount:</span>
                                                                                <span>{formatNumber(studentFeeInstallments[student?.id]?.total_payable_amount ?? 0)}</span>
                                                                            </li>
                                                                            {Object.values(studentFeeInstallments[student?.id]?.fee_type_amounts)?.map((item, index) => (
                                                                                <li key={index}>
                                                                                    <span className="font-semibold">{item?.fee_type_title}:</span>
                                                                                    <span>{ formatNumber(item?.payable_amount ?? 0)}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                }
                                                            </div>
                                                            :
                                                            <div className="flex flex-wrap gap-1">
                                                                {`${student?.classroom_roll?.roll_no ?? ""} - ${student?.first_name ?? ""} ${student?.middle_name ?? ""} ${student?.last_name ?? ""} (${student?.admission_no ?? ""})`}

                                                                {studentFeeInstallments[student?.id] ?
                                                                    studentFeeInstallments[student?.id]?.payment_status == 'Paid' ?
                                                                        <span className="badge success">Paid</span>
                                                                        :
                                                                        <span className="badge warning">Partial Paid</span>
                                                                :
                                                                    feeId != null && feeId != "" ?
                                                                        <span className="badge danger">Structure not define</span>
                                                                    : ""
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                        <td>
                                                        {(studentFeeInstallments[student?.id] && studentFeeInstallments[student?.id]?.payment_status == 'Due' && selectedStudentIds?.includes(student?.id)) &&
                                                                <div className="grid grid-cols-12 gap-2">
                                                                    <div className="col-span-3">
                                                                        <div className="educare-input-field-styles">
                                                                            <SelectInput
                                                                                data_label="Payment Mode"
                                                                                data={paymentModes}
                                                                                value={
                                                                                    formFields[student?.id]?.payment_mode
                                                                                }
                                                                                onChange={(e) => {
                                                                                        handleChangePaymentMode(e, student?.id)
                                                                                        handleFormValueChange(student?.id, 'payment_mode', e.target.value)
                                                                                    }
                                                                                }
                                                                                className="block"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.payment_mode
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <div className="educare-input-field-styles">
                                                                            <DatePicker
                                                                            selected={formFields[student?.id]?.payment_date}
                                                                            onChange={(date) => handleFormValueChange(student?.id, 'payment_date', date)}
                                                                                showYearDropdown
                                                                                showMonthDropdown
                                                                                useShortMonthInDropdown
                                                                                showPopperArrow={false}
                                                                                peekNextMonth
                                                                                dropdownMode="select"
                                                                                isClearable
                                                                                dateFormat="dd/MM/yyyy"
                                                                                placeholderText="Date"
                                                                                className="w-full"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    formFields[student?.id]?.school_receipt_no
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleFormValueChange(student?.id, 'school_receipt_no', e.target.value)
                                                                                }
                                                                                className="block"
                                                                                placeHolder="School Receipt No."
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.school_receipt_no
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-3">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                value={
                                                                                    formFields[student?.id]?.payment_note
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleFormValueChange(student?.id, 'payment_note', e.target.value)

                                                                                }
                                                                                className="block"
                                                                                placeHolder="Payment Note"
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.payment_note
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {/* If Enable Bank Process Start */}
                                                            {formFields[student?.id]?.payment_mode === "Bank Process" ? (
                                                                <div className="col-span-3">
                                                                    <div className="educare-input-field-styles">
                                                                        <SelectInput
                                                                            id="bank_account_id"
                                                                            data_label="Account"
                                                                            data={bankAccounts[student?.id] ?? []}
                                                                            value={formFields[student?.id]?.bank_account_id}
                                                                            onChange={(e) =>
                                                                                handleFormValueChange(student?.id, 'bank_account_id', e.target.value)
                                                                            }
                                                                            className="block"
                                                                        />
                                                                        <InputError
                                                                            message={errors.bank_account_id}
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable Bank Process End */}

                                                            {/* If Enable Cheque Start */}
                                                            {formFields[student?.id]?.payment_mode === "Cheque" ? (
                                                                <div className="col-span-12">
                                                                    <div className="grid grid-cols-12 gap-5">
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.cheque_no}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'cheque_no', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Cheque No*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.cheque_no
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <DatePicker
                                                                                    selected={formFields[student?.id]?.cheque_date}
                                                                                    onChange={(date) =>
                                                                                        handleFormValueChange(student?.id, 'cheque_date', date)
                                                                                    }
                                                                                    showYearDropdown
                                                                                    showMonthDropdown
                                                                                    useShortMonthInDropdown
                                                                                    showPopperArrow={false}
                                                                                    peekNextMonth
                                                                                    dropdownMode="select"
                                                                                    isClearable
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    placeholderText="Date*"
                                                                                    className="w-full"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.cheque_amount}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'cheque_amount', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Amount*"
                                                                                />
                                                                                <InputError
                                                                                    message={errors.cheque_amount}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <SelectInput
                                                                                    id="bank_id"
                                                                                    data_label="Bank"
                                                                                    data={banks}
                                                                                    value={formFields[student?.id]?.bank_id}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'bank_id', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                />
                                                                                <InputError
                                                                                    message={errors.bank_id}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.branch}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'branch', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Branch*"
                                                                                />
                                                                                <InputError
                                                                                    message={errors.branch}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable Cheque End */}

                                                            {/* If Enable Demand Draft Start */}
                                                            {formFields[student?.id]?.payment_mode === "Demand Draft" ? (
                                                                <div className="col-span-12">
                                                                    <div className="grid grid-cols-12 gap-5">
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.dd_bank}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'dd_bank', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="DdBank*"
                                                                                />
                                                                                <InputError
                                                                                    message={errors.dd_bank}
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.dd_number}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'dd_number', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="DdNumber*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.dd_number
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <DatePicker
                                                                                    selected={formFields[student?.id]?.dd_date}
                                                                                    onChange={(date) =>
                                                                                        handleFormValueChange(student?.id, 'dd_date', date)
                                                                                    }
                                                                                    showYearDropdown
                                                                                    showMonthDropdown
                                                                                    useShortMonthInDropdown
                                                                                    showPopperArrow={false}
                                                                                    peekNextMonth
                                                                                    dropdownMode="select"
                                                                                    isClearable
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    placeholderText="DdDate*"
                                                                                    className="w-full"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.dd_amount}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'dd_amount', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Amount*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.dd_amount
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable Demand Draft End */}

                                                            {/* If Enable Paytm Start */}
                                                            {formFields[student?.id]?.payment_mode === "Paytm" ? (
                                                                <div className="col-span-12">
                                                                    <div className="grid grid-cols-12 gap-5">
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        formFields[student?.id]?.paytm_ref_no
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'paytm_ref_no', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Paytm Ref. No*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.paytm_ref_no
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        formFields[student?.id]?.paytm_mobile
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'paytm_mobile', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Paytm Mobile*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                            errors.paytm_mobile
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable Paytm End */}

                                                            {/* If Enable Neft Start */}
                                                            {formFields[student?.id]?.payment_mode === "Neft" ? (
                                                                <div className="col-span-12">
                                                                    <div className="grid grid-cols-12 gap-5">
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.neft_number}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'neft_number', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Neft Number*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.neft_number
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={formFields[student?.id]?.neft_desc}
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'neft_desc', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Neft Desc*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.neft_desc
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable Neft End */}

                                                            {/* If Enable UPI Start */}
                                                            {formFields[student?.id]?.payment_mode === "UPI" ? (
                                                                <div className="col-span-12">
                                                                    <div className="grid grid-cols-12 gap-5">
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        formFields[student?.id]?.upi_transaction_id
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'upi_transaction_id', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="UPI Transaction ID*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.upi_transaction_id
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        formFields[student?.id]?.upi_description
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleFormValueChange(student?.id, 'upi_description', e.target.value)
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="UPI Description*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.upi_description
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* If Enable UPI End */}
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                        {/* <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-1">
                                                    AISHA PANDA (41848)
                                                    <span className="badge primary">Paid</span>
                                                </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-1">
                                                    Adnan (75645)
                                                    <span className="badge warning">Partial Paid</span>
                                                </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-1">
                                                    Abrar (64543)
                                                    <span className="badge danger">Structure not define</span>
                                                </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <div>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id="check_payment"
                                                                    name="check_payment"
                                                                    checked={
                                                                        data.check_payment
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "check_payment",
                                                                            e.target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor="check_payment"
                                                                    value="Ajay (021)"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        data.is_student_pay === "is_student_pay" && <div>
                                                            <ul>
                                                                <li><span className="font-semibold">Payable Amount:</span> <span>3050</span></li>
                                                                <li><span className="font-semibold">Tuition Fees:</span> <span>2000</span></li>
                                                                <li><span className="font-semibold">Late Fee:</span> <span>1050</span></li>
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    data.is_student_pay === "is_student_pay" &&
                                                    (<div className="grid grid-cols-12 gap-2">
                                                        <div className="col-span-3">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Payment Mode"
                                                                    data={paymentModes}
                                                                    value={
                                                                        data.payment_mode
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "payment_mode",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.payment_mode
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-3">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={startDate}
                                                                    onChange={(date) => setStartDate(date)}
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    placeholderText="Date"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-3">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.school_receipt_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "school_receipt_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="School Receipt No."
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.school_receipt_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-3">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.payment_note
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "payment_note",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Payment Note"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.payment_note
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                            </td>
                                        </tr> */}
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BulkFeePaymentList;
