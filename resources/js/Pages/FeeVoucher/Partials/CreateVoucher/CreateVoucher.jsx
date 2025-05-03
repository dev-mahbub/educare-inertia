import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function CreateVoucher({
    classrooms = [],
    voucher_modes = [],
    feeTypes = [],
    students = [],
    selectedStudent,
    setSelectedStudent,
    studentFeeVouchers = []
}) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [classroomId, setClassroomId] = useState("");
    const [studentId, setStudentId] = useState("")
    const [admissionNo, setAdmissionNo] = useState("");
    const [studentsData, setStudentsData] = useState([])
    const [feeVouchersData, setFeeVouchersData] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [loading, setLoading] = useState(0)

    const [formFields, setFormFields] = useState([
        {
            fee_type_id: "",
            amount: "",
        },
    ])


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        voucher_mode: "Individual",
        admission_no: selectedStudent?.admission_no ?? "",
        classroom_id: "",
        student_id: "",
        title: "",
        start_date: startDate,
        end_date: endDate,
        fee_type_amounts: formFields,
    });

    useEffect(() => {
        setStudentsData(students.sort(customSort))
    }, [students]);

    useEffect(() => {
        setFeeVouchersData(studentFeeVouchers);
        setLoading(false);
    }, [studentFeeVouchers]);

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_type_amounts: formFields,
        }))
    }, [formFields])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));
    }, [classroomId])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId,
        }));
    }, [studentId]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            admission_no: admissionNo,
        }));
    }, [admissionNo]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setClassroomId(selectedStudent?.classroom_id ?? "");
            setStudentId(selectedStudent?.id ?? "");
            setAdmissionNo(selectedStudent?.admission_no ?? "");
        }
        else {
            setStudentId("");
            setAdmissionNo(admissionNo ?? "");
        }

        setData((prevData) => ({
            ...prevData,
            classroom_id: selectedStudent?.classroom_id ?? classroomId ?? "",
            admission_no: selectedStudent?.admission_no ?? admissionNo ?? "",
            student_id: selectedStudent?.id ?? ""
        }));
    }, [selectedStudent]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            start_date: startDate,
        }));
    }, [startDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            end_date: endDate,
        }));
    }, [endDate]);
    // handle form data start


    // handle voucher mode change start
    const handleVoucherModeChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            voucher_mode: e.target.value,
            admission_no: "",
            classroom_id: "",
            student_id: "",
            title: "",
            start_date: "",
            end_date: "",
            fee_type_amounts: "",
        }));

        handleFormReset();
    }
    // handle voucher mode change start


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        // setClassroomId(classroom_id);
        setFeeVouchersData([]);

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            student_id: "",
            admission_no: "",
        }));

        const form_data = {
            classroom_id: classroom_id,
        }

        router.post(route('fee_voucher.create'), form_data)
    }
    // handle classroom change end


    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;

        const selected_student = studentsData.find(student => student.id == student_id);

        if(selected_student?.id != null) {
            setSelectedStudent(selected_student);

            const form_data = {
                student_id: student_id,
            }

            getFeeVouchersByStudent(form_data);
        }
        else {
            setAdmissionNo("");
            setSelectedStudent({});
            setFeeVouchersData([]);
        }

        setData((prevData) => ({
            ...prevData,
            student_id: selected_student?.id ?? "",
            admission_no: selected_student?.admission_no ?? "",
        }));

    }
    // handle student change end


    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setAdmissionNo(admission_no);

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no,
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                admission_no: admissionNo,
                student_id: "",
            }

            getFeeVouchersByStudent(form_data);
        }
    }
    // handle admission no change end



    // count total selected fee type amount start
    const updateTotalAmount = () => {
        const newTotalAmount = formFields.reduce((total, field) => {
            const amountValue = parseInt(field.amount, 10) || 0;
            return total + amountValue;
        }, 0);

        setTotalAmount(newTotalAmount);
    };
    // count total selected fee type amount end


    //repeatable form fields start
    const [fieldCount, setFieldCount] = useState(1); // Initialize count to 1
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        if (event.target.type === 'date') {
            updatedFields[index][field] = event.target.valueAsDate; // Use valueAsDate for the date field
        }
        else {
            updatedFields[index][field] = event.target.value;
        }
        setFormFields(updatedFields);

        setData(prevData => ({
            ...prevData,
            [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        }));
    }

    const addFields = () => {
        setFormFields([...formFields,
        {
            fee_type_id: "",
            amount: "",
        },
        ]);
        setFieldCount(prevCount => prevCount + 1); // Increase count
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];

        const removedItem = updatedFormFields.splice(index, 1)[0];

        setFormFields(updatedFormFields);
        setFieldCount(prevCount => prevCount - 1); // Decrease count

        const amountValue = parseInt(removedItem.amount, 10) || 0;

        setTotalAmount((prevTotal) => prevTotal - amountValue);
    }
    //repeatable form fields end


    // get student fee vouchers start
    const getFeeVouchersByStudent = (form_data) => {
        setLoading(false)
        router.post(route('fee_voucher.create'), form_data)
    }
    // get student fee vouchers end


    // handle voucher form submit start
    const handleStudentFeeVoucherData = (e) => {
        e.preventDefault();

        resetErrorMessages();

        post(route("fee_voucher.save"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                handleFormSuccess();
            },
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    if (key.split('.')[0] == 'fee_type_amounts') {
                        count++;

                        toast.error("Please select fee type and add amount.", {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (count >= 1) {
                        break;
                    }
                }
            },
        });
    };
    // handle voucher form submit end


    //handle delete voucher start
    const handleStudentFeeVoucherDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("fee_voucher.destroy", id), {
                    onSuccess: () => {
                        const form_data = {
                            student_id: studentId
                        }

                        setLoading(false);
                        getFeeVouchersByStudent(form_data);
                    }
                });
            }
        });
    }
    //handle delete voucher end

    // handle form submit success start
    const handleFormSuccess = () => {
        setStartDate("");
        setEndDate("");
        setFormFields([
            {
                fee_type_id: "",
                amount: "",
            },
        ]);

        data.title = "";

        if(data.voucher_mode == "Individual") {
            const form_data = {
                student_id: studentId
            }

            setLoading(false);
            getFeeVouchersByStudent(form_data);
        }
        else {
            data.classroom_id = "";
            data.voucher_mode = "Individual";
        }
    }
    // handle form submit success end

    // handle form reset start
    const handleFormReset = () => {
        setClassroomId("");
        setStudentId("");
        setAdmissionNo("");
        setStartDate("");
        setEndDate("");
        setStudentsData([]);
        setSelectedStudent({});
        setFeeVouchersData([]);
        setFormFields([
            {
                fee_type_id: "",
                amount: "",
            },
        ]);
    }

    const resetErrorMessages = () => {
        errors.title = "";
        errors.student_id = "";
        errors.start_date = "";
        errors.end_date = "";
    }
    // handle form reset end


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
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
                <form onSubmit={handleStudentFeeVoucherData}>
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-school-form-action-title">
                            <h5><i className="icon-info"></i> Manage Vouchers</h5>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-4">
                                    <div className="select-mode educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="voucher_mode"
                                            value="Select Mode"
                                        />
                                        <SelectInput
                                            data_label="Individual"
                                            data={voucher_modes}
                                            value={
                                                data.voucher_mode
                                            }
                                            onChange={(e) => {
                                                    handleVoucherModeChange(e)
                                                }
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.voucher_mode
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {
                                    data.voucher_mode === 'Individual' ?
                                        <div className="col-span-12">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="admission_no"
                                                            value="Adm No."
                                                        />
                                                        <TextInput
                                                            value={
                                                                data.admission_no
                                                            }
                                                            onChange={(e) => {
                                                                handleAdmissionNoChange(e)
                                                            }
                                                            }
                                                            onKeyPress={(e) => {
                                                                handleAdmissionNoKeyPress(e)
                                                            }}
                                                            className="block"
                                                            placeHolder="Admission No."
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.admission_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="classroom_id"
                                                            value="Select Class"
                                                        />
                                                        <SelectInput
                                                            data_label="Class"
                                                            data={classrooms}
                                                            value={
                                                                data.classroom_id
                                                            }
                                                            onChange={(e) => {
                                                                    handleClassroomChange(e);
                                                                }
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
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="student_id"
                                                            value="Student"
                                                        />
                                                        <SelectInput
                                                            data_label="Student"
                                                            data={studentsData}
                                                            value={
                                                                data.student_id
                                                            }
                                                            onChange={(e) => {
                                                                    handleStudentChange(e)
                                                                }
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
                                            </div>
                                        </div>
                                        : <div className="col-span-12">
                                            <div className="grid grid-cols-12 gap-5">
                                                <div className="col-span-12 md:col-span-4">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="classroom_id"
                                                            value="Select Class"
                                                        />
                                                        <SelectInput
                                                            data_label="Class"
                                                            data={classrooms}
                                                            value={
                                                                data.classroom_id
                                                            }
                                                            onChange={(e) => {
                                                                    setData("classroom_id", e.target.value);
                                                                }
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
                                            </div>
                                        </div>
                                }
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="title"
                                                    value="Title"
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
                                                setData("title", e.target.value)
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
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="start_date"
                                                    value="Start Date"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Start date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={
                                                errors.start_date
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
                                                    htmlFor="end_date"
                                                    value="End Date"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) =>
                                                setEndDate(date)
                                            }
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End Date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={
                                                errors.end_date
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-design-survey-area shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
                        <div className="grid grid-cols-12 sm:gap-[20px]">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="educare-survey-timeline-area">
                                            <div className="educare-survey-timeline-question">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="educare-add-question-counter  ">
                                                            <button
                                                                type="button"
                                                                className="educare-success-btn-lg-fill transition ease-in-out duration-150 bg-success"
                                                                onClick={addFields}
                                                            >
                                                                <i className="icon-PlusCircle"></i> Add Fee Type
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <div className="educare-add-question-counter flex h-full items-center justify-end">
                                                            <Tooltip
                                                                title="Cheque Added"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button type="button" className="educare-secondary-btn-md-fill">{fieldCount}</button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={` bg-supportingA/5 p-0.5 font-primary ${fieldCount === 0 ? 'mt-0' : 'mt-[30px]'}`}>
                                                <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                                                    <div className="educare-classroom-table-wrapper">
                                                        <div className="educare-default-table xs:overflow-x-auto">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Fee Type</th>
                                                                        <th>Amount</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {formFields.map((form, index) => (

                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="educare-input-field-styles">
                                                                                    <SelectInput
                                                                                        data_label="Fee Type"
                                                                                        id="fee_type_id"
                                                                                        name="fee_type_id"
                                                                                        data={feeTypes}
                                                                                        value={
                                                                                            form.fee_type_id
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            handleFormChange(e, index, "fee_type_id")
                                                                                        }
                                                                                        className="block"
                                                                                    />
                                                                                    <InputError
                                                                                        message={
                                                                                            errors.fee_type_id
                                                                                        }
                                                                                        className="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="educare-input-field-styles">
                                                                                    <TextInput
                                                                                        id="amount"
                                                                                        name="amount"
                                                                                        onChange={(e) =>{
                                                                                            handleFormChange(e, index, "amount")
                                                                                            updateTotalAmount()
                                                                                        }}
                                                                                        value={form.amount}
                                                                                        className="block"
                                                                                        placeHolder="Amount"
                                                                                    />
                                                                                    <InputError
                                                                                        message={
                                                                                            errors.amount
                                                                                        }
                                                                                        className="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                                    <div className="z-[1] mx-auto">
                                                                                        <div>
                                                                                            <Tooltip
                                                                                                title="Delete"
                                                                                                placement="top"
                                                                                                arrow
                                                                                                as="button"
                                                                                            >
                                                                                                <button
                                                                                                type="button"
                                                                                                className="educare-danger-btn-md-fill"
                                                                                                onClick={() => {
                                                                                                    removeFields(index)
                                                                                                }}
                                                                                                >
                                                                                                    <i className="icon-TrashSimple"></i>
                                                                                                </button>
                                                                                            </Tooltip>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>

                                                                    ))}
                                                                    <tr>
                                                                        <td colSpan={2} className="text-heading font-bold w-full">Total Ammount: </td>
                                                                        <td>
                                                                            <span className='badge warning'>{totalAmount}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-button-field-styles mt-2.5 text-end">
                            <div className="educare-classroom-button-wrapper">
                                <div className="flex justify-end gap-2.5">
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        type="button"
                                        onClick={() => {
                                            reset();
                                            resetErrorMessages();
                                            handleFormReset();
                                        }}
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-span-12 md:col-span-6">
                <div className="educare-admission-list-area">
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Title</th>
                                            <th>Amount</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {feeVouchersData?.length > 0 ? (
                                                feeVouchersData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                                        <td>{item?.title}</td>
                                                        <td>{item?.total_amount}</td>
                                                        <td>{item?.total_paid}</td>
                                                        <td>{item?.total_due}</td>
                                                        <td>
                                                            {item?.payment_status === 'Due' &&
                                                                <span className='badge danger'>Due</span>
                                                            }

                                                            {item?.payment_status === 'Paid' &&
                                                                <span className='badge success'>Paid</span>
                                                            }

                                                            {item?.payment_status === 'Partial' &&
                                                                <span className='badge danger'>Partial</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            {item?.payment_status === 'Due' &&
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href={route('fee_voucher.edit', item?.id)}
                                                                                className="educare-warning-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={() =>
                                                                                    handleStudentFeeVoucherDelete(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                    </tr>
                                            )}
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}
