import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import OutstandingFollowUpPopup from './OutstandingFollowUpPopup/OutstandingFollowUpPopup';

const OutstandingStudentDueFor = ({
    studentDueReportData = [],
    filterText,
    setFilterText,
    filterParams,
    selctedClassroomId,
    getFeeDuesReportData,
    formData
}) => {

    const [studentDueReports, setStudentDueReports] = useState([]);
    const [totalDueAmount, setTotalDueAmount] = useState(0);
    const [totalStudentCount, setTotalStudentCount] = useState(0);
    const [studentData, setStudentData] = useState({});

    const [followUpPopup, setFollowUpPopup] = useState(false);

    const handlePopupClick = (studentId) => {
        setFollowUpPopup(!followUpPopup);

        setStudentData(Object.values(studentDueReports?.students_data)?.find(item => item?.id == studentId));
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
        setStudentDueReports(studentDueReportData);
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


    // handle search input change start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            search_student: filterText
        }));
    },[filterText]);

    const handleSearch = (e) => {
        setFilterText(e.target.value);
    }
    // handle search input change end


    // filter student by admission no and name start
    const filteredStudentDueReports = useMemo(() => {
        if (Object.keys(studentDueReports)?.length > 0) {
            return Object.values(studentDueReports?.students_data)?.filter((item) => {
                const inputText = filterText?.toLowerCase()?.trim();
                const rollNo = item?.roll_no?.toLowerCase();
                const studentName = item?.name?.toLowerCase();
                const studentAdmissionNo = item?.admission_no?.toLowerCase();

                return(
                    rollNo && rollNo?.includes(inputText) ||
                    studentName && studentName?.includes(inputText) ||
                    studentAdmissionNo && studentAdmissionNo?.includes(inputText)
                );
            }).sort(customSort);
        }
        else {
            return [];
        }
    }, [studentDueReports, filterText])
    // filter student by admission no and name end

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


    // handle download student head wise due report start
    const handleDownloadHeadWiseDueReport = () => {
         const params = {
             classroom_id: selctedClassroomId,
            ...filterParams
        }

        let url = route('pdf_fee_demand_slip.student_due_summary_head_wise', params);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student head wise due report end


    // handle download student head wise due report start
    const handleDownloadInstallmentWiseDueReport = () => {
         const params = {
             classroom_id: selctedClassroomId,
            ...filterParams
        }

        let url = route('pdf_fee_demand_slip.student_due_summary_installment_wise', params);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student head wise due report end

    // handle send sms start
    const handleSendSms = (phone) => {
        const form_data = {
            numbers: phone
        }

        router.post(route('send_sms.fee_due'), form_data, {
            onSuccess: () => {
                getFeeDuesReportData(formData);
            },
            onError: () => {
                getFeeDuesReportData(formData);
            },
        });
    }
    // handle send sms end

    // handle send bulk sms start
    const handleSendBulkSms = () => {
        const numbers = filteredStudentDueReports?.map(item => item?.sms_phone)?.filter(Boolean);

        const form_data = {
            numbers: numbers
        }

        router.post(route('send_sms.bulk_fee_due'), form_data, {
            onSuccess: () => {
                getFeeDuesReportData(formData);
            },
            onError: () => {
                getFeeDuesReportData(formData);
            },
        });
    }
    // handle send bulk sms end

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
            <div>
                {filteredStudentDueReports?.length > 0 &&
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
                                        href={route('export_excel.head_wise_outstanding_due_report', {
                                            classroom_id: selctedClassroomId,
                                            ...filterParams
                                        })}
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
                                        href={route('export_excel.installment_wise_outstanding_due_report', {
                                            classroom_id: selctedClassroomId,
                                            ...filterParams
                                        })}
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
                <div className='flex justify-between flex-wrap gap-2 mt-2'>
                    <h5 className='text-headingLight'>Student's Due For – class {studentDueReports?.classroom?.title} ( {totalStudentCount} )</h5>
                    <div className="educare-header-filtar-bar-count">
                        <span>Total: {formatNumber(totalDueAmount)}</span>
                    </div>
                </div>
                <form onChange={handleSearchStudent}>
                    <div className='flex flex-wrap justify-between gap-2 my-4'>
                        <div className="educare-input-field-styles min-w-[290px]">
                            <TextInput
                                value={
                                    data.search_student
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
                        <div className='flex flex-wrap justify-between gap-2'>
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                            >
                                <i className='icon-notifications'></i>
                                Notify to all student
                            </PrimaryButton>
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-secondary-btn-md-fill"
                                type="button"
                                onClick={handleSendBulkSms}
                            >
                                <i className='icon-email mr-1'></i>
                                Send sms to all student
                            </PrimaryButton>
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
                                    <th>SMS</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudentDueReports?.length > 0 &&
                                    filteredStudentDueReports?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.roll_no}</td>
                                            <td>{item?.admission_no}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.father_name}</td>
                                            <td>
                                                {item?.sms_phone}
                                                <div className='flex gap-1 mt-1'>
                                                    <button
                                                        onClick={(e) => {
                                                            handlePopupClick(item?.id);
                                                        }}
                                                        className='badge success'
                                                    >
                                                        <i className='icon-PhoneCall mr-1'></i>
                                                        Follow Up
                                                    </button>
                                                    {/* <Link
                                                        href="#"
                                                        className="badge warning"
                                                    >
                                                        <i className='icon-FilePdf mr-1'></i>
                                                        Landscape
                                                    </Link> */}
                                                </div>
                                            </td>
                                            <td>
                                                {formatNumber(item?.total_due_amount)}
                                                <div className='flex gap-1 mt-1'>
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
                                                    <button
                                                        type="button"
                                                        className="badge info"
                                                        onClick={() => {
                                                            handleSendSms(item?.sms_phone)
                                                        }}
                                                    >
                                                        <i className='icon-email mr-1'></i>
                                                        Send Sms
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*student list end*/}

            </div>
            <OutstandingFollowUpPopup
                followUpPopup={followUpPopup}
                setFollowUpPopup={setFollowUpPopup}
                studentData={studentData}
                setStudentData={setStudentData}
                getFeeDuesReportData={getFeeDuesReportData}
                formData={formData}
            />
        </>

    );
};

export default OutstandingStudentDueFor;
