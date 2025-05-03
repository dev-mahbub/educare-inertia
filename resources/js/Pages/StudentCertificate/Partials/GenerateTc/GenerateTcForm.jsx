import Checkbox from "@/Components/Checkbox";
import InputError from '@/Components/InputError';
import Loader from '@/Components/Loader';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import NullifyPopup from "./NullifyPopup/NullifyPopup";


const GenerateTcForm = ({
    classrooms = [],
    student,
    students = [],
    feeInstallments = []
}) => {
    const [studentsData, setStudentsData] = useState([]);
    const [studentData, setStudentData] = useState({});
    const [studentFeeData, setStudentFeeData] = useState([]);
    const [hasFeeInstallment, setHasFeeInstallment] = useState(true);
    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [classroomId, setClassroomId] = useState("");
    const [checkAllFee, setCheckAllFee] = useState(false);
    const [nullifyPopup, setNullifyPopup] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        select_all_fee_id: "",
        fee_ids: [],
    });

    useEffect(() => {
        setStudentFeeData(feeInstallments);

        let hasFee = false;

        for (const installment of Object.values(feeInstallments)) {
            if (installment?.payment_status != 'Paid') {
                hasFee = true;
                break;
            }
        }

        setHasFeeInstallment(hasFee);
    }, [feeInstallments]);

    useEffect(() => {
        setStudentData(student);
    }, [student]);

    useEffect(() => {
        setStudentsData(students?.sort(customSort));
    }, [students]);


    useEffect(() => {
        if (studentData?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: studentData?.admission_no ?? "",
                classroom_id: studentData?.classroom_id ?? "",
                student_id: studentData?.id ?? "",
            }));

            setClassroomId(studentData?.classroom_id ?? "");
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: studentData?.id ?? "",
            }));

            setStudentFeeData([]);
        }
    }, [studentData]);


    const handleClassroom = (e, classroom_id) => {
        e.preventDefault();

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: classroom_id,
        }));

        setClassroomId(classroom_id);

        setStudentFeeData([]);

        router.post(route('student_certificate.generate_tc'), { 'classroom_id': classroom_id });
    }

    const handleStudent = (e, studentId) => {
        e.preventDefault();

        const form_data = {
            classroom_id: data?.classroom_id ?? classroomId,
            student_id: studentId,
        }

        setStudentFeeData([]);

        router.post(route('student_certificate.generate_tc'), form_data);

        setLoading(false);
    }


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
                classroom_id: data?.classroom_id ?? classroomId,
                admission_no: data?.admission_no ?? "",
            }

            setStudentFeeData([]);

            router.post(route('student_certificate.generate_tc'), form_data);
        }
    }
    // handle admission no change end

    // handle checkbox select start
    useEffect(() => {
        if (selectedFeeIds?.length <= 0) {
            setCheckAllFee(false);
        }
        else {
            setCheckAllFee(selectedFeeIds?.length === Object.values(studentFeeData)?.filter(item => item?.payment_status != 'Paid')?.length);
        }

        setData((prevData) => ({
            ...prevData,
            fee_ids: selectedFeeIds
        }));
    }, [selectedFeeIds, studentFeeData]);


    const handleCheckboxSelect = (name, value) => {
        if (name == 'select_all_fee_id') {
            if (value == true) {
                const feeIds = Object.values(studentFeeData)?.filter(item => item?.payment_status != 'Paid')?.map(item => item?.fee?.id);

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

            if (updatedFeeIds?.includes(value)) {
                updatedFeeIds = updatedFeeIds?.filter(item => item != value);
            }
            else {
                updatedFeeIds = [...updatedFeeIds, value];
            }

            setSelectedFeeIds(updatedFeeIds);
        }
    }
    // handle checkbox select end

    // handle generate tc start
    const handleGenerateTc = (e) => {
        e.preventDefault();

        if(hasFeeInstallment == false) {
            window.open(route('pdf_tc_generator.render_tc_form', data?.student_id));
        }
        else {
            toast.error("Please nullify fee structure first.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }

    }
    // handle generate tc end


    // handle fee nullify start
    const handleNullifyFee = (e) => {
        e.preventDefault();

        if (data?.fee_ids?.length == 0) {
            toast.error("Please select at least one fee installment.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to nullify this fee structure, this process will remove all unpaid and due amount from the fee structure.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    setNullifyPopup(true);
                }
            });
        }
    }
    // handle fee nullify end

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

    return (
        <>
            <form>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 xl:col-span-6">
                        <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                            <h5>
                                Generate TC
                            </h5>
                        </div>
                        <div className="educare-input-field-notes mb-4">
                            <ul>
                                <li> <span className='font-bold'>Note :</span> Here you can generate TC of a student, In order to generate a TC, you must have to "Nullify" fee structure of a student.</li>
                            </ul>
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
                                                    value={data.classroom_id}
                                                    onChange={(e) => handleClassroom(e, e.target.value)}
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
                                        <div className="lg:col-span-6 col-span-12">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Student"
                                                    data={studentsData}
                                                    value={data.student_id}
                                                    onChange={(e) => handleStudent(e, e.target.value)}
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
                                        {studentData?.id != null && hasFeeInstallment == false ? <div className='col-span-12 flex gap-5 justify-end'>
                                            <PrimaryButton
                                                // disabled={processing}
                                                className="educare-secondary-btn-md-fill"
                                                type="button"
                                                onClick={(e) => {
                                                    handleGenerateTc(e);
                                                }}
                                            >
                                                {/* <a target='_blank' href={route('pdf_tc_generator.render_tc_form', data?.student_id)}>
                                                    Generate TC
                                                </a> */}
                                                Generate TC
                                            </PrimaryButton>
                                            {/* <PrimaryButton
                                                // disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                                type="button"
                                            >
                                                GO
                                                <i className='icon-ArrowFatLinesRight ml-1'></i>
                                            </PrimaryButton> */}
                                        </div> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                            <h5>
                                Fee
                                {(studentData?.id != null && hasFeeInstallment == false) &&
                                    <span className="text-info">(fee cleared)</span>
                                }
                            </h5>

                            {(studentData?.id != null && Object.keys(studentFeeData)?.length > 0) &&
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                    onClick={(e) => {
                                        handleNullifyFee(e)
                                    }}
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
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                            {Object.keys(studentFeeData)?.length > 0 ? (
                                                Object.values(studentFeeData)?.map((item, index) => (
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
                                                        <td>{++index}</td>
                                                        <td>{item?.fee?.title}</td>
                                                        <td>{formatNumber(item?.total_payable_amount ?? 0)}</td>
                                                        <td>{formatNumber(item.total_paid_amount ?? 0)}</td>
                                                        <td>{formatNumber(item.total_due_amount ?? 0)}</td>
                                                    </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        {/*Student Detail start*/}
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Detail
                                </h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        {loading ? (
                                            <Loader></Loader>
                                        ) : (
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
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/*Student Detail end*/}

                        {/*Library issue Book start*/}
                        <div className="educare-classroom-table-wrapper mt-6">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Library ( Issue Book )
                                </h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Book Title</th>
                                                <th>Acc No.</th>
                                                <th>Issue Date</th>
                                                <th>Due Date</th>
                                                <th>Return</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Pother Pachali</td>
                                                <td>3453</td>
                                                <td>02-12-2023</td>
                                                <td>29-12-2023</td>
                                                <td>01-01-2024</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <NullifyPopup
                nullifyPopup={nullifyPopup}
                setNullifyPopup={setNullifyPopup}
                formData={data}
                setSelectedFeeIds={setSelectedFeeIds}
                setStudentFeeData={setStudentFeeData}
            />
        </>
    );
};

export default GenerateTcForm;



