import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from '@/Components/Loader';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from '@/Components/SelectInput';
import TextInput from "@/Components/TextInput";
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RefundFee = ({
    studentFeeInstallments = [],
    classrooms = [],
    students = [],
    feeRefundPaymentModes = [],
    studentFeePaymentRefunds = [],
    banks = [],
    student
}) => {
    const [refundDate, setRefundDate] = useState();
    const [chequeDate, setChequeDate] = useState();

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formFields, setFormFields] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalRefund, setTotalRefund] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        fee_payment_refund_array: formFields,
        refund_mode: "",
        refund_date: refundDate,
        refund_note: "",
        cheque_no: "",
        cheque_date: chequeDate,
        cheque_amount: "",
        bank_id: "",
        branch: "",
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setFilteredStudents(students.sort(customSort));
    }, [students]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));
        }
    }, [selectedStudent]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            refund_date: refundDate
        }))
    }, [refundDate])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            cheque_date: chequeDate
        }))
    }, [chequeDate])

    // set loading
    useEffect(() => {
        setLoading(false);
    }, [studentFeeInstallments])
    // end set loading


    // set formFields data
    useEffect(() => {
        setFormFields(Object.values(studentFeePaymentRefunds)?.map(item => ({
            ...item,
            refund_amount: 0,
        })));
    },[studentFeePaymentRefunds]);

    useEffect(() => {
        if (formFields) {
            setTotalPaid(formFields?.map(item => item?.total_paid)?.reduce((total, amount) => total+amount, 0 ));
            setTotalRefund(formFields?.map(item => item?.total_refund)?.reduce((total, amount) => total+amount, 0 ));
            setTotalAmount(formFields?.map(item => item?.refund_amount)?.reduce((total, amount) => total+amount, 0 ));
        }

        setData((prevData) => ({
            ...prevData,
            fee_payment_refund_array: formFields?.filter(item => selectedFeeTypeIds?.includes(item?.fee_type_id)),
        }));
    }, [formFields, selectedFeeTypeIds]);


    const handleFormChange = (event, index, field) => {
        const updatedFormFields = [...formFields];

        let value = event.target.value;

        if(field === 'refund_amount'){
            value = Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        }

        updatedFormFields[index][field] = value

        setFormFields(updatedFormFields);
    }
    //end set formFields data


    // store selected fee type ids
    const setSelectedFeeTypeId = (id) => {
        if (selectedFeeTypeIds?.includes(id)) {
            setSelectedFeeTypeIds([...selectedFeeTypeIds].filter(item => item !== id));
        }
        else {
            setSelectedFeeTypeIds([...selectedFeeTypeIds, id])
        }
    }
    // end store selected fee type ids


    // handle admnission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                admission_no: data?.admission_no,
            }

            router.post(route('fee_refund'), form_data);
        }
    }
    // handle admnission no change end


    // get student by classroom id
    const handleClassroomChange = (id) => {
        // setFilteredStudents(students?.filter(student => student?.classroom_id == id));

        setSelectedStudent({});

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: id,
            student_id: "",
        }));

        const form_data = {
            classroom_id: id
        }

        router.post(route('fee_refund'), form_data);
    }
    // end get student by classroom id


    //
    const handleChequeAmountChange = (amount) => {
        let cheque_amount = amount

        const totalRefundAmount = data?.fee_payment_refund_array?.map(item => item?.refund_amount)?.reduce((total, amount) => total + amount, 0);

        if(cheque_amount > totalRefundAmount) {
            cheque_amount = totalRefundAmount
        }

        if (Number.isNaN(parseFloat(cheque_amount))){
            cheque_amount = '';
        }
        else {
            cheque_amount = parseFloat(cheque_amount);
        }

        setData((prevData) => ({
            ...prevData,
            cheque_amount: cheque_amount,
        }))
    }
    //


    // get student fee installments
    const handleStudentChange = (e) => {
        const selectedStudent = filteredStudents.find(student => student.id == e.target.value);

        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudent?.admission_no ?? '',
            student_id: e.target.value,
        }));

        setSelectedStudent(selectedStudent);

        getStudentFeeInstallmentsById(e);
    }

    const getStudentFeeInstallmentsById = (e) => {
        e.preventDefault();

        setLoading(false);

        router.post(route('fee_refund'), { student_id: e.target.value });
    }
    // end get student fee installments

    const handleFormReset = () => {
        setSelectedFeeTypeIds([]);
        setChequeDate();
        setRefundDate();
        setFormFields(formFields?.map(item => ({
            ...item,
            refund_amount:0,
        })));

        setData((prevData) => ({
            ...prevData,
            fee_payment_refund_array: [],
            refund_mode: "",
            refund_date: "",
            refund_note: "",
            cheque_no: "",
            cheque_date: "",
            cheque_amount: "",
            bank_id: "",
            branch: "",
        }))
    }


    // save refund data
    const handleRefundFeeData = (e) => {
        e.preventDefault();

        const totalRefundAmount = data?.fee_payment_refund_array?.map(item => item?.refund_amount)?.reduce((total, amount) => total + amount, 0);

        if (data?.refund_mode === 'Cheque' && data?.cheque_amount < totalRefundAmount) {
            toast.error("Cheque amount cannot be less than total refund amount.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else if (
                data?.refund_mode === 'Cheque' &&
                (data?.refund_mode == '' || data?.refund_date == '' || data?.refund_note == '' || data?.cheque_no == '' || data?.cheque_date == '' || data?.bank_id == '' || data?.branch == '')
            ) {
            toast.error("Required fields cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else if (data?.fee_payment_refund_array?.length <= 0){
            toast.error("Please select at least one fee type.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else if (totalRefundAmount <= 0){
            toast.error("Selected fee type refund amount cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            post(route("fee_refund.save"), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    handleFormReset();

                    setLoading(false);

                    router.post(route('fee_refund'), { student_id: selectedStudent?.id });
                },
                onError: (errors) => {
                    let count = 0;

                    for (let key in errors) {
                        count++;

                        if (key === 'fee_payment_refund_array') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (key.split('.')[2] === 'refund_amount') {
                            count++;
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (count >= 1) {
                            break;
                        }
                    }

                    setLoading(false);

                    router.post(route('fee_refund'), { student_id: selectedStudent?.id });
                }
            });
        }
    };
    // end save refund data


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.roll_no != "" && b.roll_no != "") {
            return a.roll_no - b.roll_no;
        } else if (a.roll_no == "") {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Refund Fee
                                </h5>
                            </div>

                            <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="admission_no"
                                                value={
                                                    data.admission_no
                                                }
                                                onChange={(e) =>
                                                    handleAdmissionNoChange(e)
                                                }
                                                onKeyPress={(e) => {
                                                    handleAdmissionNoKeyPress(e)
                                                }}
                                                className="block"
                                                placeHolder="Ad No."
                                            />
                                            <InputError
                                                message={
                                                    errors.admission_no
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
                                                data={classrooms}
                                                value={
                                                    data.classroom_id
                                                }
                                                onChange={(e) => {
                                                    handleClassroomChange(e.target.value);
                                                }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.classroom_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="student_id"
                                                data_label="Student"
                                                data={filteredStudents}
                                                value={
                                                    data.student_id
                                                }
                                                onChange={(e) => {
                                                    handleStudentChange(e)
                                                }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.student_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Title</th>
                                            <th>Payable</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {(selectedStudent?.id != null && Object.keys(studentFeeInstallments)?.length > 0) ?
                                                Object.values(studentFeeInstallments)?.map((item, index) => (
                                                    <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')} >
                                                        <td>{++index}</td>
                                                        <td>{item?.fee?.title}</td>
                                                        <td>{item?.total_payable_amount}</td>
                                                        <td>{item?.total_paid_amount}</td>
                                                        <td>{item?.total_due_amount}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Student Does not have any fee.</td>
                                                </tr>
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    {(selectedStudent?.id != null && Object.keys(studentFeePaymentRefunds)?.length > 0 && !loading) &&
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Refund
                                </h5>
                            </div>
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Check</th>
                                                <th>Title</th>
                                                <th>Paid Amount</th>
                                                <th>Refund Amount</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(studentFeePaymentRefunds)?.length > 0 &&
                                                Object.values(studentFeePaymentRefunds)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name="refund_checkbox"
                                                                    checked={
                                                                        selectedFeeTypeIds.includes(item?.fee_type_id)
                                                                    }
                                                                    onChange={(e) =>
                                                                        setSelectedFeeTypeId(item?.fee_type_id)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>{item?.fee_type_title}</td>
                                                        <td>{item?.total_paid}</td>
                                                        <td>{item?.total_refund}</td>
                                                        <td>
                                                            <div className='educare-input-field-styles-px-8 max-w-[100px]'>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id={`refund_amount_${index}`}
                                                                        value={
                                                                            item?.refund_amount
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleFormChange(e, index, 'refund_amount')
                                                                        }
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.refund_amount
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td colSpan={2}><h5 className=' text-[15px] font-semibold text-headingLight'>Total: </h5></td>
                                                <td><h5 className=' text-[15px] font-semibold text-headingLight'>{totalPaid}</h5></td>
                                                <td><h5 className=' text-[15px] font-semibold text-headingLight'>{totalRefund} </h5></td>
                                                <td><h5 className=' text-[15px] font-semibold text-headingLight'>{totalAmount}</h5></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="educare-class-form-box-wrapper mt-[20px]">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.04)] rounded-lg">
                                        <form onSubmit={handleRefundFeeData}>
                                            <div className="educare-common-card">
                                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.04)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                                    <div className='grid grid-cols-12 gap-5'>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="refund_mode"
                                                                            value="Refund Mode"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    id="refund_mode"
                                                                    data_label=""
                                                                    data={feeRefundPaymentModes}
                                                                    value={
                                                                        data.refund_mode
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "refund_mode",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.refund_mode
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="refund_date"
                                                                            value="Refund Date"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <DatePicker
                                                                    selected={refundDate}
                                                                    onChange={(date) =>
                                                                        setRefundDate(date)
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className="w-full"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.refund_date
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-span-12'>
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="refund_mode"
                                                                            value="Refund Note"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <TextareaInput
                                                                    id="refund_note"
                                                                    value={
                                                                        data.refund_note
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "refund_note",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.refund_note
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        {
                                                            data.refund_mode === "Cheque" ?
                                                                <div className='col-span-12'>
                                                                    <div className='grid grid-cols-12 gap-5'>
                                                                        <div className="col-span-12 md:col-span-4">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        data.cheque_no
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        setData(
                                                                                            "cheque_no",
                                                                                            e.target.value
                                                                                        )
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="chequeNo*"
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
                                                                                    selected={chequeDate}
                                                                                    onChange={(date) =>
                                                                                        setChequeDate(date)
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
                                                                                    value={
                                                                                        data.cheque_amount
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        handleChequeAmountChange(e.target.value);
                                                                                    }
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Amount*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.cheque_amount
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <SelectInput
                                                                                    id="bank_id"
                                                                                    data_label="Bank"
                                                                                    data={banks}
                                                                                    value={
                                                                                        data.bank_id
                                                                                    }
                                                                                    onChange={(e) => {
                                                                                        setData('bank_id', e.target.value)
                                                                                    }
                                                                                    }
                                                                                    type="text"
                                                                                    className="block"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.bank_id
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-12 md:col-span-6">
                                                                            <div className="educare-input-field-styles">
                                                                                <TextInput
                                                                                    value={
                                                                                        data.branch
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        setData(
                                                                                            "branch",
                                                                                            e.target.value
                                                                                        )
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Branch*"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.branch
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : ""
                                                        }
                                                        <div className="col-span-12">
                                                            <div className="flex flex-wrap gap-2.5 mt-2">
                                                                <PrimaryButton
                                                                    className="educare-gray-btn-lg-stroke"
                                                                    type="button"
                                                                    onClick={()=>{
                                                                        handleFormReset();
                                                                    }}
                                                                >
                                                                    Reset
                                                                </PrimaryButton>
                                                                <PrimaryButton
                                                                    className="educare-primary-btn-lg-fill"
                                                                    type="submit"
                                                                >
                                                                    Refund Fee
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default RefundFee;
