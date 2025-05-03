import Loader from "@/Components/Loader";
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const OutstandingDueReportClassDue = ({
    classDueReportsData = [],
    loading,
    setStudentDueReportData,
    setSelectedClassroomId,
    filterParams,
    selectedClassroomIds
}) => {
    const [totalDueAmount, setTotalDueAmount] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        all_class: "",
        select_all_class_id: "",
        class_one_id: false,
        class_two_id: false,
    });

    // count total due amount start
    useEffect(() => {
        setTotalDueAmount(Object.values(classDueReportsData)?.map(item => item?.total_due_amount)?.reduce((total, amount) => total+amount, 0));
    },[classDueReportsData])
    // count total due amount end


    // handle filter student data on click class start
    const filterStudentDataByClassroomId = (id) => {
        setStudentDueReportData(classDueReportsData[id]);
        setSelectedClassroomId(id);
    }
    // handle filter student data on click class end

    // handle download student demand slip start
    const handleDownloadStudentDemandSlip = (classroomId) => {
        const params = {
            classroom_id: classroomId,
            ...filterParams
        }

        let url = route('pdf_fee_demand_slip.demand_slip_print', params);

        if (url != "") {
            window.open(url, '_blank');
        }
    }
    // handle download student demand slip end


    // handle download student due report start
    const handleDownloadStudentDueReport = (classroomId) => {
        const params = {
            classroom_id: classroomId,
            ...filterParams
        }

        let url = route('pdf_fee_demand_slip.student_due_summary', params);

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


    return (
        <div>
            <div className='flex flex-wrap gap-2 justify-between items-center mb-2'>
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Class Due: {formatNumber(totalDueAmount)}</span>
                </div>
                <div className='flex flex-wrap items-center gap-1'>
                    <i className='icon-info text-primary'></i>
                    <h5 className='text-[15px]'>Without late fee</h5>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Amount</th>
                            <th>
                                <div className='educare-filter-action-btn'>
                                    {Object.keys(classDueReportsData)?.length > 0 &&
                                        <Tooltip
                                            title=""
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                target="_blank"
                                                href={route('export_excel.class_due_report', { classroom_ids: JSON.stringify(selectedClassroomIds), ...filterParams})}
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    }
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {loading ?
                        <Loader></Loader>
                    :
                        <tbody>
                            {Object.keys(classDueReportsData)?.length > 0 &&
                                Object.values(classDueReportsData)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Tooltip
                                                title="Click"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className='hover:text-blue-600'
                                                    onClick={() => {
                                                        filterStudentDataByClassroomId(item?.classroom?.id)
                                                    }}
                                                >
                                                    {item?.classroom?.title}
                                                </button>
                                            </Tooltip>
                                        </td>
                                        <td>{formatNumber(item?.total_due_amount)}</td>
                                        <td>
                                            <div className='flex gap-1 educare-filter-action-btn student-due-report-stroke-btn'>
                                                {/* <div>
                                                    <Tooltip
                                                        title="PDF"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <Link
                                                            href="#"
                                                            className="educare-warning-btn-md-fill"
                                                        >
                                                            <i className="icon-FilePdf"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div> */}
                                                <div>
                                                    <Tooltip
                                                        title="Download demand slips in portrait page"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-warning-btn-md-fill"
                                                            onClick={(e) => {
                                                                handleDownloadStudentDemandSlip(item?.classroom?.id)
                                                            }}
                                                        >
                                                            <i className="icon-FilePdf"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Download Student Due Report"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-warning-btn-md-fill"
                                                            onClick={(e) => {
                                                                handleDownloadStudentDueReport(item?.classroom?.id)
                                                            }}
                                                        >
                                                            <i className="icon-FilePdf"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
};

export default OutstandingDueReportClassDue;
