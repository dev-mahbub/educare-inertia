import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export default function ConsolidatedDueReportList({
    consolidatedDueReports,
    loading,
    setClassroomReports,
    classroomReports,
    params
}) {

    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [classroomId, setClassroomId] = useState(null);


    useEffect(() => {
        setTotalPayable(Object.values(consolidatedDueReports)?.reduce((total, item) => total + parseFloat(item?.total_payable_amount ?? 0), 0))
        setTotalPaid(Object.values(consolidatedDueReports)?.reduce((total, item) => total + parseFloat(item?.total_paid_amount ?? 0), 0))
        setTotalDue(Object.values(consolidatedDueReports)?.reduce((total, item) => total + parseFloat(item?.total_due_amount ?? 0), 0))
    }, [consolidatedDueReports]);

    // handle classroom reports start
    const handleClassroomReports = (classroom_id) => {
        setClassroomReports(Object.values(consolidatedDueReports)?.find(item => item?.classroom?.id == classroom_id));
        setClassroomId(classroom_id);
    }
    // handle classroom reports end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-card-title pb-none mt-2">
                            <h5>
                                Classes
                            </h5>
                        </div>
                        <div className="educare-classroom-table-wrapper mt-3">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>
                                                <span className='badge warning'>Total Payable</span>
                                            </th>
                                            <th>
                                                <span className='badge success'>Total Paid</span>
                                            </th>
                                            <th>
                                                <span className='badge danger'>Total Due</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {Object.keys(consolidatedDueReports)?.length > 0 &&
                                                Object.values(consolidatedDueReports)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <Tooltip
                                                                title="Click"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={() =>
                                                                        // handleClassData(item?.classroom?.id)
                                                                        handleClassroomReports(item?.classroom?.id)
                                                                    }
                                                                >
                                                                    <h5 className=" hover:text-blue-600">
                                                                        {item?.classroom?.title}
                                                                    </h5>
                                                                </button>
                                                            </Tooltip>

                                                        </td>
                                                        <td>{item?.total_payable_amount}</td>
                                                        <td>{item?.total_paid_amount}</td>
                                                        <td>{item?.total_due_amount}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td>
                                                    <h5 className="text-headingLight font-bold">Total</h5>
                                                </td>
                                                <td>
                                                    <h5 className="text-headingLight font-bold">{totalPayable}</h5>
                                                </td>
                                                <td>
                                                    <h5 className="text-headingLight font-bold">{totalPaid}</h5>
                                                </td>
                                                <td>
                                                    <h5 className="text-headingLight font-bold">{totalDue}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    {Object.keys(classroomReports)?.length > 0 &&
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="flex justify-between items-end mb-2">
                                <div className="educare-card-title pb-none">
                                    <h5>
                                        Class - {classroomReports?.classroom?.title}
                                    </h5>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            target="_blank"
                                            href={route('export_excel.class_wise_consolidated_due_report', {
                                                classroom_id: classroomId,
                                                ...params
                                            })}
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>
                                                    <span className='badge warning'>Expected</span>
                                                </th>
                                                <th>
                                                    <span className='badge success'>Paid</span>
                                                </th>
                                                <th>
                                                    <span className='badge danger'>Due</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <Loader></Loader>
                                        :
                                            <tbody>
                                                {Object.keys(classroomReports?.fee_types_data)?.length > 0 &&
                                                    Object.values(classroomReports?.fee_types_data)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {item?.fee_type_title}
                                                            </td>
                                                            <td>
                                                                {item?.total_payable_amount ?? 0}
                                                            </td>
                                                            <td>
                                                                {item?.total_paid_amount ?? 0}
                                                            </td>
                                                            <td>
                                                                {item?.total_due_amount ?? 0}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr>
                                                    <td>
                                                        <h5 className="text-headingLight font-bold">Total</h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="text-headingLight font-bold">{classroomReports?.total_payable_amount ?? 0}</h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="text-headingLight font-bold">{classroomReports?.total_paid_amount ?? 0}</h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="text-headingLight font-bold">{classroomReports?.total_due_amount ?? 0}</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
