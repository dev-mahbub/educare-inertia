import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdjustFeeFrom = ({
    students = [],
    classrooms = [],
    studentFeeInstallments = [],
    student
}) => {
    const [adjustDate, setAdjustDate] = useState();

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [paidFeeInstallments, setPaidFeeInstallments] = useState([]);
    const [unpaidFeeInstallments, setUnpaidFeeInstallments] = useState([]);
    const [fromFeeInstallment, setFromFeeInstallment] = useState({});
    const [toFeeInstallment, setToFeeInstallment] = useState({});

    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);
    const [totalAdjustAmount, setTotalAdjustAmount] = useState(0);

    const [formFields, setFormFields] = useState([]);
    const [selectedFeeTypeIds, setSelectedFeeTypeIds] = useState([]);

    const [feeSelected, setFeeSelected] = useState(false)

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
        from_fee_id: "",
        to_fee_id: "",
        fee_type_ids: selectedFeeTypeIds,
        adjust_amount_array: [],
        adjust_note: "",
        adjust_date: adjustDate,
    });


    useEffect(() => {
        setSelectedStudent(student);
        setFeeSelected(false);
        setFromFeeInstallment({});
        setToFeeInstallment({});
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
                from_fee_id: "",
                to_fee_id: "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
                from_fee_id: "",
                to_fee_id: "",
            }));
        }
    }, [selectedStudent]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            adjust_date: adjustDate
        }));
    }, [adjustDate]);

    // filter and set paid and unpaid fee installments
    useEffect(() => {
        setPaidFeeInstallments(Object.values(studentFeeInstallments)?.filter(item => item?.payment_status == 'Paid'));
        setUnpaidFeeInstallments(Object.values(studentFeeInstallments)?.filter(item => item?.payment_status != 'Paid'));
    }, [studentFeeInstallments])
    // filter and set paid and unpaid fee installments


    // calculate and set total paid amount
    useEffect(() => {
        if (fromFeeInstallment?.fee_type_amounts?.length > 0) {
            setTotalPaidAmount(fromFeeInstallment?.fee_type_amounts?.map(item => item?.paid_amount)?.reduce((total, amount) => total + amount, 0));
        }
        else {
            setTotalPaidAmount(0);
        }
    },[fromFeeInstallment])
    // end calculate and set total paid amount

    // set formFields data
    useEffect(() => {
        // setTotalPayableAmount(toFeeInstallment?.fee_type_amounts?.map(item => item?.payable_amount)?.reduce((total, amount) => total + amount, 0));
        setFormFields(toFeeInstallment?.fee_type_amounts?.map(item => ({
            ...item,
            adjust_amount: "",
            fee_id: toFeeInstallment?.fee?.id
        })));
    },[toFeeInstallment])
    // end set formFields data

    // calculate total payable amount and total adjust amount and set the values
    useEffect(() => {
        if (formFields?.length > 0) {
            setTotalPayableAmount(formFields?.map(item => item?.payable_amount)?.reduce((total, amount) => total + amount, 0));
            setTotalAdjustAmount(formFields?.map(item => item?.adjust_amount)?.reduce((total, amount) => total + amount, 0));

            setData((prevData) => ({
                ...prevData,
                adjust_amount_array: formFields?.filter(item => selectedFeeTypeIds?.includes(item?.fee_type_id))
            }));
        }
        else {
            setTotalPayableAmount(0);
            setTotalAdjustAmount(0);
        }

        if(selectedFeeTypeIds?.length > 0) {
            setData((prevData) => ({
                ...prevData,
                fee_type_ids: selectedFeeTypeIds
            }));
        }
    }, [formFields, selectedFeeTypeIds])
    // end calculate total payable amount and total adjust amount and set the values



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

            router.post(route('fee_refund.adjust_fee'), form_data);
        }
    }
    // handle admnission no change end


    // filter students by classroom and set form data
    const handleClassroomChange = (event) => {
        setPaidFeeInstallments([]);
        setUnpaidFeeInstallments([]);
        setFeeSelected(false);
        setFromFeeInstallment({})
        setToFeeInstallment({})

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: event.target.value,
            student_id: "",
            from_fee_id: "",
            to_fee_id: "",
        }));

        const form_data = {
            classroom_id: event.target.value
        }

        router.post(route('fee_refund.adjust_fee'), form_data);
    }
    // end filter students by classroom and set form data


	// get student fee installments by student id
    const handleStudentChange = (event) => {
        const selectedStudentData = filteredStudents?.find(student => student.id == event.target.value);

        setFeeSelected(false);

        setSelectedStudent(selectedStudentData);
        setFromFeeInstallment({})
        setToFeeInstallment({})

        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudentData?.admission_no,
            student_id: selectedStudentData?.id,
        }));

        getStudentFeeInstallmentsById(selectedStudentData?.id);
    }

    const getStudentFeeInstallmentsById = (id) => {
        const form_data = {
            student_id: id,
        }

        router.post(route('fee_refund.adjust_fee'), form_data);
    }
    // end get student fee installments by student id

    // set selected from fee
    const handleFromFeeChange = (event) => {
        setFeeSelected(false);
        setFromFeeInstallment({});

        setData((prevData) => ({
            ...prevData,
            from_fee_id: event.target.value,
        }));
    }
    // end set selected from fee


    // set selected from fee
    const handleToFeeChange = (event) => {
        setFeeSelected(false);
        setToFeeInstallment({});

        setData((prevData) => ({
            ...prevData,
            to_fee_id: event.target.value,
        }));
    }
    // end set selected from fee


    // update formFields data
    const handleFormChange = (event, index, field) => {
        const updatedFormFields = [...formFields];

        let value = Number.isNaN(parseFloat(event.target.value)) ? "" : parseFloat(event.target.value);

        if (field === 'adjust_amount' && value > updatedFormFields[index]['total_payable_amount']){
            value = updatedFormFields[index]['total_payable_amount']
        }

        updatedFormFields[index][field] = value;

        setFormFields(updatedFormFields);

        setData((prevData) => ({
            ...prevData,
            adjust_amount_array: updatedFormFields?.filter(item => selectedFeeTypeIds?.includes(item?.fee_type_id))
        }));
    }
    // end update formFields data


    // handle checkbox select and store selected fee type id
    const setSelectedFeeTypeId = (id) => {
        if ([...selectedFeeTypeIds]?.includes(id)) {
            setSelectedFeeTypeIds([...selectedFeeTypeIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeTypeIds([
                ...selectedFeeTypeIds,
                id,
            ]);
        }
    }
    // end handle checkbox select and store selected fee type id


    // set from and to fee installments data
    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (data.from_fee_id != "" && data?.to_fee_id != "") {
            setFromFeeInstallment(paidFeeInstallments?.find(item => item?.fee?.id == data.from_fee_id));
            setToFeeInstallment(unpaidFeeInstallments?.find(item => item?.fee?.id == data?.to_fee_id));
            setFeeSelected(true);
        }
        else {
            toast.error('Please select source installment and target installment', {
                position: 'top-right',
                autoClose: 1500,
            })
        }
    }
    // end set from and to fee installments data

    // reset form data
    const handleReset = () => {
        setFilteredStudents([]);
        setSelectedStudent({})
        setPaidFeeInstallments([]);
        setUnpaidFeeInstallments([]);
        setFromFeeInstallment({})
        setToFeeInstallment({})
        setFormFields([]);
        setSelectedFeeTypeIds([]);
        setFeeSelected(false)
        setAdjustDate(null);
        reset();
    }
    // end reset form data


    // handle form submit
    const handleAdjustFeeData = (e) => {
        e.preventDefault();

        data.fee_type_ids = selectedFeeTypeIds?.filter(id => formFields?.some(item => item?.fee_type_id == id))

        post(route("fee_refund.adjust_fee.save"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                handleReset();
            },
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    count++;
                    if (key === 'adjust_amount_array') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (key.split('.')[2] === 'adjust_amount') {
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
            }
        });
    };
    // end handle form submit


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
                    <div className="col-span-12 lg:col-span-4">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Adjust Fee
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="admission_no"
                                                    value="Adm No."
                                                />
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
                                                    placeHolder="Admission No"
                                                />
                                                <InputError
                                                    message={
                                                        errors.admission_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="classroom_id"
                                                    value="Select Class"
                                                />
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label=""
                                                    data={classrooms}
                                                    value={
                                                        data.classroom_id
                                                    }
                                                    onChange={(e) =>
                                                        handleClassroomChange(e)
                                                    }
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
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="student_id"
                                                    value="Select Student"
                                                />
                                                <SelectInput
                                                    id="student_id"
                                                    data_label=""
                                                    data={filteredStudents}
                                                    value={
                                                        data.student_id
                                                    }
                                                    onChange={(e) =>
                                                        handleStudentChange(e)
                                                    }
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
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="from_fee_id"
                                                    value="Source Installment"
                                                />
                                                <SelectInput
                                                    id="from_fee_id"
                                                    data_label=""
                                                    data={paidFeeInstallments?.map(item => item?.fee)}
                                                    value={
                                                        data.from_fee_id
                                                    }
                                                    onChange={(e) =>
                                                        handleFromFeeChange(e)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.from_fee_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="to_fee_id"
                                                    value="Target Installment"
                                                />
                                                <SelectInput
                                                    id="to_fee_id"
                                                    data_label=""
                                                    data={unpaidFeeInstallments?.map(item => item?.fee)}
                                                    value={
                                                        data.to_fee_id
                                                    }
                                                    onChange={(e) =>
                                                        handleToFeeChange(e)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.to_fee_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap gap-2.5 mt-2">
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="button"
                                                    onClick={(e) => {
                                                        handleSubmitClick(e)
                                                    }}
                                                >
                                                    Submit
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        <form onSubmit={handleAdjustFeeData}>
                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-12">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Installment Details
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6">
                                    <div className="educare-classroom-table-wrapper">
                                        <div className="educare-default-table xs:overflow-x-auto">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={3}>Source Installment ( Admission Fee )</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Check</th>
                                                        <th>Title</th>
                                                        <th>Paid Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fromFeeInstallment?.fee_type_amounts?.length > 0 &&
                                                        fromFeeInstallment?.fee_type_amounts?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            name="fee_type_id"
                                                                            checked={
                                                                                selectedFeeTypeIds?.includes(item?.fee_type_id)
                                                                            }
                                                                            onChange={(e) =>
                                                                                setSelectedFeeTypeId(item?.fee_type_id)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>{item?.fee_type_title}</td>
                                                                <td>{item?.paid_amount}</td>
                                                            </tr>
                                                        ))
                                                    }

                                                    <tr>
                                                        <td colSpan={2}>
                                                            <h5 className="font-bold text-headingLight">Total:</h5>
                                                        </td>
                                                        <td>
                                                            <h5 className="font-bold text-headingLight">{totalPaidAmount}</h5>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan={3}>Target Installment ( March Fee )</th>
                                                </tr>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Payable Amount</th>
                                                    <th>Adjust Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formFields?.length > 0 &&
                                                    formFields?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.fee_type_title}</td>
                                                            <td>{item?.payable_amount}</td>
                                                        <td>
                                                            <div className='educare-input-field-styles-px-8 max-w-[80px]'>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        value={
                                                                            item?.adjust_amount
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleFormChange(e, index, "adjust_amount")
                                                                        }
                                                                        className="block"
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.adjust_amount
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
                                                    <td>
                                                        <h5 className="font-bold text-headingLight">Total:</h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="font-bold text-headingLight">{totalPayableAmount}</h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="font-bold text-headingLight">{totalAdjustAmount}</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {feeSelected &&
                                    <div className="col-span-12">
                                        <div className="educare-common-card">
                                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 md:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="adjust_date"
                                                                        value="Adjust Date"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <DatePicker
                                                                selected={adjustDate}
                                                                onChange={(date) =>
                                                                    setAdjustDate(date)
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Adjust date"
                                                                className="w-full"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.adjust_date
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="adjust_note"
                                                                value="Adjust Note"
                                                            />
                                                            <TextareaInput
                                                                id="adjust_note"
                                                                value={
                                                                    data.adjust_note
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "adjust_note",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.adjust_note
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                                            <PrimaryButton
                                                                className="educare-gray-btn-lg-stroke"
                                                            >
                                                                Reset
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                className="educare-primary-btn-lg-fill"
                                                            >
                                                                Save
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdjustFeeFrom;
