import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const StudentPaymentsFilter = ({
    classrooms = [],
    students = [],
    selectedStudent,
    setSelectedStudent,
    setLoading
}) => {
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        admission_no: "",
        student_id: "",
    });

    useEffect(() => {
        setParams({
            classroom_id: data?.classroom_id ?? "",
            student_id: data?.student_id ?? "",
        });
    }, [data]);

    useEffect(() => {
        setFilteredStudents(students.sort(customSort));
    }, [students]);

    useEffect(() => {
        if (selectedStudent?.id != null){
            setData((prevData) => ({
                ...prevData,
                classroom_id: selectedStudent?.classroom_id ?? "",
                admission_no: selectedStudent?.admission_no ?? "",
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

    // handle classroom change start
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
                admission_no: data?.admission_no ?? "",
                filter_type: 'filter_report',
            }

            router.post(route('fee_report.student_payments'), form_data);
        }
    }
    // handle classroom change end

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            admission_no: "",
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id,
        }

        router.post(route('fee_report.student_payments'), form_data);
    }
    // handle classroom change end

    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;
        const student = students?.find(item => item?.id == student_id);

        setSelectedStudent(student);

        setData((prevData) => ({
            ...prevData,
            admission_no: student?.admission_no ?? "",
            student_id: student?.id ?? "",
        }));
    }
    // handle student change end

    // handle filter student fee payment reports start
    const handleFilterFeePaymentReports = (e) => {
        e.preventDefault();

        setLoading(false);

        const form_data = {
            ...data,
            filter_type: 'filter_report',
        }

        router.post(route('fee_report.student_payments'), form_data);
    }
    // handle filter student fee payment reports end

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };


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
            <form onSubmit={CommonHeaderFilterTopData}>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student Payments
                        </h5>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={
                                data?.admission_no
                            }
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
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Class"
                            data={classrooms}
                            value={
                                data?.classroom_id
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
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Student"
                            data={filteredStudents}
                            value={
                                data?.student_id
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
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                            >
                                <button type='button'
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) => {
                                        handleFilterFeePaymentReports(e)
                                    }}
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Download Excel"
                                placement="top"
                                arrow
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.student_payment_report', params)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Download Pdf"
                                placement="top"
                                arrow
                            >
                                <a
                                    target="_blank"
                                    href={route('pdf_fee_demand_slip.student_payment_report', params)}
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <Link
                                    href={route('fee_report.student_payments')}
                                    className="educare-gray-btn-md-fill"
                                >
                                    <i className="icon-ArrowsClockwise"></i>
                                </Link>
                            </Tooltip>
                        </div>
                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
            <div className='mb-5'></div>
        </>
    );
};

export default StudentPaymentsFilter;
