import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import StudentDuePopup from './StudentDuePopup/StudentDuePopup';

const StudentDueReportFor = ({
    studentDueReportData = [],
    filterParams,
    studentDueReports = {},
    classroom,
    selctedClassroomId,
}) => {
    const studentDueData = studentDueReports.students_data;

    const [studentDueReport, setStudentDueReport] = useState([]);
    const [totalDueAmount, setTotalDueAmount] = useState(0);
    const [totalStudentCount, setTotalStudentCount] = useState(0);
    const [studentFeesData, setStudentFeesData] = useState({});
    const [installmentTotalDue, setInstallmentTotalDue] = useState(0);
    const [studentName, setStudentName] = useState('');

    //student due report popup
    const [studentDuePopup, setStudentDuePopup] = useState(false);
    const handleDueFirstPopupClick = (feesData, installmentDue, name) => {
        setStudentFeesData(feesData);
        setStudentName(name);
        setInstallmentTotalDue(installmentDue);
        setStudentDuePopup(!studentDuePopup);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_student: "",
    });

    useEffect(() => {
        setStudentDueReport(studentDueReportData);
    }, [studentDueReportData]);


    // count total due amount and total student start
    useEffect(() => {
        setTotalDueAmount(studentDueReports?.total_due_amount ?? 0);

        if (Object.keys(studentDueReports)?.length > 0) {
            setTotalStudentCount(Object.keys(studentDueReports?.students_data)?.length);
        }
        else {
            setTotalStudentCount(0);
        }
    }, [studentDueReports]);
    // count total due amount and total student start

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.roll_no != "" && b.roll_no != "") {
            return a.roll_no - b.roll_no;
        } else if (a.roll_no == "") {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end


    const handleSearchStudent = (e) => {
        e.preventDefault()
    }

    // handle download student due report start
    const handleDownloadStudentDemandSlip = (studentId) => {
        const params = {
            student_id: studentId,
            ...filterParams
        }

        let url = route('pdf_fee_demand_slip.single_demand_slip_print', params);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student due report end


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

    //handle search
    const [filterText, setFilterText] = useState('')
    const handleSearch = (e) => {
        setFilterText(e.target.value);
    }
    // handle search input change end


    // filter student by admission no and name start
    const filteredstudentDueReport = useMemo(() => {
        if (Object.keys(studentDueData)?.length > 0) {
            return Object.values(studentDueData)?.filter((item) => {
                const inputText = filterText?.toLowerCase()?.trim();
                const rollNo = item?.roll_no?.toLowerCase();
                const studentName = item?.name?.toLowerCase();
                const studentAdmissionNo = item?.admission_no?.toLowerCase();

                return (
                    rollNo && rollNo?.includes(inputText) ||
                    studentName && studentName?.includes(inputText) ||
                    studentAdmissionNo && studentAdmissionNo?.includes(inputText)
                );
            }).sort(customSort);
        }
        else {
            return [];
        }
    }, [studentDueReport, filterText]);

    // handle download student head wise due report start
    const handleDownloadHeadWiseDueReport = () => {
        let url = route('pdf_fee_demand_slip.teacher.head_wise_student_due_report', filterParams);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student head wise due report end

    // handle download student head wise due report start
    const handleDownloadInstallmentWiseDueReport = () => {
        let url = route('pdf_fee_demand_slip.teacher.installment_wise_student_due_report', filterParams);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student head wise due report end

    return (
        <>
            {filteredstudentDueReport?.length > 0 &&
                <div className='flex justify-between flex-wrap gap-2'>
                    <div className='flex flex-wrap gap-2 justify-between items-center mb-2'>
                        <div className='flex flex-wrap items-center gap-1'>
                            <i className='icon-info text-primary'></i>
                            <h5 className='text-[15px]'>Head Wise Report</h5>
                        </div>
                        <div className='flex gap-2 educare-filter-action-btn'>
                            <Tooltip
                                title=""
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.teacher.head_wise_student_due_report', filterParams)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                            <Tooltip
                                title="Download demand slips in landscape page"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    className="educare-warning-btn-md-fill"
                                    onClick={(e) => {
                                        handleDownloadHeadWiseDueReport();
                                    }}
                                >
                                    <i className="icon-FilePdf"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 justify-between items-center mb-2'>
                        <div>
                            <h5 className='font-semibold text-headingLight'>Installment Wise Report </h5>
                        </div>
                        <div className='flex gap-2 educare-filter-action-btn'>
                            <Tooltip
                                title=""
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.teacher.installment_wise_student_due_report', filterParams)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                            <Tooltip
                                title="Download demand slips in landscape page"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    className="educare-warning-btn-md-fill"
                                    onClick={(e) => {
                                        handleDownloadInstallmentWiseDueReport()
                                    }}
                                >
                                    <i className="icon-FilePdf"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            }
            <div>
                <div className='flex justify-between flex-wrap gap-2 mt-2'>
                    <h5 className='text-headingLight'>Student's Due For – class {classroom?.title} ( {totalStudentCount} )</h5>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {formatNumber(studentDueReports.total_due_amount)}</span>
                    </div>
                </div>
                <form onChange={handleSearchStudent}>
                    <div className='flex flex-wrap justify-between gap-2 my-4'>
                        <div className="educare-input-field-styles min-w-[290px]">
                            <TextInput
                                value={
                                    filterText
                                }
                                onChange={(e) =>
                                    handleSearch(e)
                                }
                                className="block"
                                placeHolder="Search by Roll No / Student name / Adm No. "
                            />
                            <InputError
                                message={
                                    errors.search_student
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </form>
                {/*student list start*/}

                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Roll</th>
                                    <th>Admission No</th>
                                    <th>Student Name</th>
                                    <th>Father</th>
                                    <th>Mobile</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredstudentDueReport.length > 0 ? filteredstudentDueReport.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.roll_no}</td>
                                            <td>{item?.admission_no}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.father_name}</td>
                                            <td>
                                                {item?.sms_phone}
                                            </td>
                                            <td>
                                                <button
                                                    className='text-supportingA hover:text-primary'
                                                    onClick={() => handleDueFirstPopupClick(item.fees_data, item.installment_total_due, item.name)}
                                                >
                                                    {formatNumber(item?.total_due_amount ?? 0)}
                                                </button>
                                                <div className='flex gap-1 mt-1'>
                                                    {/* <Tooltip
                                                        title="Download demand slips in landscape page"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="badge warning"
                                                            onClick={(e) => {
                                                                handleDownloadStudentDemandSlip(item?.id)
                                                            }}
                                                        >
                                                            <i className='icon-FilePdf mr-1'></i>
                                                            Landscape
                                                        </button>
                                                    </Tooltip> */}
                                                    <Tooltip
                                                        title="Download demand slips in portrait page"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="badge warning"
                                                            onClick={(e) => {
                                                                handleDownloadStudentDemandSlip(item?.id)
                                                            }}
                                                        >
                                                            <i className='icon-FilePdf mr-1'></i>
                                                            Portrait
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : <tr>
                                        <td colSpan={6} className='text-center'>Data not found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*student list end*/}

            </div>
            <StudentDuePopup
                studentDuePopup={studentDuePopup}
                studentName={studentName}
                setStudentDuePopup={setStudentDuePopup}
                studentFeesData={studentFeesData}
                installmentTotalDue={installmentTotalDue}
            />
        </>

    );
};

export default StudentDueReportFor;
