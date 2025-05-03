import Checkbox from "@/Components/Checkbox";
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { router, useForm } from '@inertiajs/react';
import moment from "moment";
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const MakeInactiveFrom = ({
    classrooms = [],
    students = [],
    classroomId = '',
    student = '',
    feeInstallments = []
}) => {
    const [studentsData, setStudentsData] = useState([]);
    const [studentData, setStudentData] = useState(student);

    const [feeInstallmentsData, setFeeInstallmentsData] = useState([]);
    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [checkAllFee, setCheckAllFee] = useState(false);
    const [inactiveDate, setInactiveDate] = useState(new Date());


    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        status_date_at: "",
        custom_date_at: "",
        admission_no: "",
        classroom_id: classroomId,
        student_id: "",
        reason: "",
        //nullify fee
        fee_ids: []
    });

    useEffect(() => {
        setFeeInstallmentsData(feeInstallments);
    }, [feeInstallments]);

    useEffect(() => {
        setStudentsData(students?.sort(customSort));
    }, [students]);


    useEffect(() => {
        // setData((prevData) => ({
        //     ...prevData,
        //     student_id: student?.id,
        //     admission_no: student?.admission_no,
        //     classroom_id: student?.classroom_id,
        // }));

        setStudentData(student);
    }, [student]);

    useEffect(() => {
        if (studentData?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: studentData?.admission_no ?? "",
                classroom_id: studentData?.classroom_id ?? "",
                student_id: studentData?.id ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: studentData?.id ?? "",
            }));

            setFeeInstallmentsData([]);
        }
    }, [studentData]);



    // handle classroom change start
    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroomId,
        }));
        // setStudentsData(students?.filter((item) => item?.classroom_id == classroomId));

        setFeeInstallmentsData([]);
        setSelectedFeeIds([]);

        const form_data = {
            type: 'filter_student',
            classroom_id: classroomId
        }

        router.post(route('student.make_inactive'), form_data);
    }
    // handle classroom change end


    // handle student change start
    const handleStudent = (e, studentId) => {
        e.preventDefault();

        setFeeInstallmentsData([]);
        setSelectedFeeIds([]);

        const form_data = {
            type: 'filter_student',
            classroom_id: data?.classroom_id ?? '',
            student_id: studentId,
        }

        router.post(route('student.make_inactive'), form_data);
    }
    // handle student change end



    // handle admission no change start
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
                type: 'filter_student',
                classroom_id: data?.classroom_id ?? "",
                admission_no: data?.admission_no ?? "",
            }

            setFeeInstallmentsData([]);

            router.post(route('student.make_inactive'), form_data);
        }
    }
    // handle admission no change end

    const handleDatePicker = (date) => {
        setData((prevData) => ({
            ...prevData,
            status_date_at: date,
            custom_date_at: moment(date).format("YYYY-MM-DD"),
        }));
    }

    // hanlde make inactive form submit start
    const handleMakeInActive = (e) => {
        e.preventDefault();
        if (data?.reason == "" && (data?.status_date_at == "" || data?.custom_date_at)) {
            toast.error("Date and reason is required", {
                position: 'top-right',
                autoClose: 1500,
            });
        }else {
            Swal.fire({
                title: 'Are you sure to inactive the student?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Inactive it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route('student.make_inactive'), data,{
                        onSuccess: () => {
                            toast.success("Status change successfully", {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }
                    });
                    handleReset();
                }
            });
        }
    }
    // hanlde make inactive form submit start

    // handle reset start
    const handleReset = () => {
        reset();
    }
    // handle reset end


    // handle checkbox select start
    useEffect(() => {
        if (selectedFeeIds?.length <= 0) {
            setCheckAllFee(false)
        }
        else {
            setCheckAllFee(selectedFeeIds?.length === Object.values(feeInstallmentsData)?.filter(item => item?.payment_status != 'Paid')?.length)
        }

        setData((prevData) => ({
            ...prevData,
            fee_ids: selectedFeeIds
        }));
    }, [selectedFeeIds, feeInstallmentsData]);


    const handleCheckboxSelect = (name, value) => {
        if(name == 'select_all_fee_id') {
            if(value == true) {
                const feeIds = Object.values(feeInstallmentsData)?.filter(item => item?.payment_status != 'Paid')?.map(item => item?.fee?.id);

                setSelectedFeeIds(feeIds);
                setCheckAllFee(true);
            }
            else {
                setSelectedFeeIds([]);
                setCheckAllFee(false);
            }
        }
        else {
            let updatedFeeIds = [...selectedFeeIds];

            if(updatedFeeIds?.includes(value)){
                updatedFeeIds = updatedFeeIds?.filter(item => item != value);
            }
            else {
                updatedFeeIds = [...updatedFeeIds, value];
            }

            setSelectedFeeIds(updatedFeeIds);
        }
    }
    // handle checkbox select end


    // handle fee nullify start
    const handleNullifyFee = (e) => {
        e.preventDefault();

        if(data?.status_date_at == "") {
            toast.error("Date field is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.reason == "") {
            toast.error("Reason field is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.fee_ids?.length == 0) {
            toast.error("Please select at least one fee installment.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            post(route('student.nullify_fee'), {
                onSuccess: ({ props }) => {
                    router.post(route('student.make_inactive'), { 'student_id': data?.student_id });
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if(key == 'fee_ids') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }

                        break;
                    }

                    router.post(route('student.make_inactive'), { 'student_id': data?.student_id });
                },
            });
        }
    }
    // handle fee nullify end

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
        <>
            <form>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                            <h5>
                                Make Student Inactive
                            </h5>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-wrap-border">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="lg:col-span-6 col-span-12">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.admission_no
                                                    }
                                                    // onChange={(e) =>
                                                    //     setData(
                                                    //         "admission_no",
                                                    //         e.target.value
                                                    //     )
                                                    // }
                                                    onChange={(e) =>
                                                        handleAdmissionNoChange(e)
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
                                        <div className="lg:col-span-6 col-span-12">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Class"
                                                    data={classrooms}
                                                    onChange={(e) => handleClassroom(e.target.value)}
                                                    className="block"
                                                    value={data?.classroom_id}
                                                />
                                                <InputError
                                                    message={
                                                        errors.classroom_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-6 col-span-12">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Student"
                                                    data={studentsData}
                                                    onChange={(e) => handleStudent(e, e.target.value)}
                                                    className="block"
                                                    value={data?.student_id}
                                                />
                                                <InputError
                                                    message={
                                                        errors.student_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-6 col-span-12">
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={data?.status_date_at && new Date(data?.status_date_at)}
                                                    onChange={(val) => handleDatePicker(val)}
                                                //    onChange={(date) =>
                                                //         setData(
                                                //             "status_date_at",
                                                //             date
                                                //         )
                                                //     }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full"
                                                />
                                                <InputError
                                                    message={
                                                        errors.status_date_at
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <TextareaInput
                                                    value={
                                                        data.reason
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "reason",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeholder="Type reason..."
                                                />
                                                <InputError
                                                    message={
                                                        errors.reason
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-12 flex gap-5 justify-end'>
                                            <PrimaryButton
                                                className="educare-warning-btn-md-fill"
                                                type="button"
                                                onClick={(e) => handleMakeInActive(e)}
                                            >
                                                Make Inactive
                                            </PrimaryButton>
                                            {/* <PrimaryButton
                                                // disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                                type="button"
                                                onClick={(e) => handleStudentDetail(e)}
                                            >
                                                GO
                                                <i className='icon-ArrowFatLinesRight ml-1'></i>
                                            </PrimaryButton> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                            <h5>
                                Fee
                            </h5>
                            {Object.values(feeInstallmentsData)?.length > 0 &&
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                    onClick={handleNullifyFee}
                                >
                                    Nullify fee structure
                                </PrimaryButton>
                            }
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_fee_id"
                                                        name="select_all_fee_id"
                                                        checked={checkAllFee}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Sr.</th>
                                        <th>Title</th>
                                        <th>Payable</th>
                                        <th>Paid</th>
                                        <th>Due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(feeInstallmentsData)?.length > 0 ?
                                        Object.values(feeInstallmentsData)?.map((item, index) => (
                                            <tr key={index} className={item?.payment_status == 'Paid' ? 'bg-success' : (item?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                                <td>
                                                    {item?.payment_status != 'Paid' &&
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`fee_id_${item?.fee?.id}`}
                                                                    name={`fee_id_${item?.fee?.id}`}
                                                                    checked={
                                                                        selectedFeeIds?.includes(item?.fee?.id)
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(e.target.name, item?.fee?.id)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </td>
                                                <td>{index+1}</td>
                                                <td>{item?.fee?.title}</td>
                                                <td>{formatNumber(item?.total_payable_amount ?? 0)}</td>
                                                <td>{formatNumber(item.total_paid_amount ?? 0)}</td>
                                                <td>{formatNumber(item.total_due_amount ?? 0)}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">The student does not have the fee structure defined</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Detail
                                </h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='w-[50%]'>
                                                    <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Student Name:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{concatName(studentData?.first_name, studentData?.middle_name, studentData?.last_name)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Admission no:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{studentData?.admission_no}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='w-[50%]'>
                                                    <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Roll:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{studentData?.classroom_roll?.roll_no}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Class:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{studentData?.classroom?.title}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='w-[50%]'>
                                                    <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Father Name:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{concatName(studentData?.father?.first_name, studentData?.father?.middle_name, studentData?.father?.last_name)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Mother Name:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{concatName(studentData?.mother?.first_name, studentData?.mother?.middle_name, studentData?.mother?.last_name)}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='w-[50%]'>
                                                    <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Father Mobile:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{studentData?.father?.phone}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                        <h5 className='text-[16px] text-headingLight font-semibold'>Mother Mobile:</h5>
                                                        <span className='text-[15px] text-headingLight font-normal'>{studentData?.mother?.phone}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MakeInactiveFrom;



