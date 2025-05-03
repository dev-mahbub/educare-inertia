import Checkbox from "@/Components/Checkbox";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import ExamChangeStatusFilter from "./ExamChangeStatusFilter";

const ExamChangeStatusStudent = ({
    registrations,
    sendSelectedEnquiryIdToParent,
    selectedEnquiryIds,
    examStatusArray,
    data,
    setData,
    handleFilterAdmissionData
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex justify-between flex-wrap gap-2.5 items-center mb-2.5">
                        <div className="flex flex-wrap gap-2.5 items-center">
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">Total Appeared: 10</span>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">Total Not Appeared: 10</span>
                        </div>
                        <div className="flex items-center gap-2.5 educare-header-filtar-bar-action educare-filter-action-btn">
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Import"
                                    placement="top"
                                    arrow
                                >
                                    <Link
                                        href="/import/student"
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <ExamChangeStatusFilter
                        examStatusArray = {examStatusArray}
                        data={data}
                        setData={setData}
                        handleFilterAdmissionData={handleFilterAdmissionData}
                    />
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>Reg. No</th>
                                        <th>Test Date</th>
                                        <th>Status</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations?.length > 0 ?
                                        registrations?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="check_student_one"
                                                                name="check_student_one"
                                                                checked={
                                                                    selectedEnquiryIds.includes(item?.id)
                                                                }
                                                                onChange={(e) =>
                                                                    sendSelectedEnquiryIdToParent(item?.id)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.first_name} {item.middle_name} {item.last_name}</td>
                                                <td>{item.father_first_name} {item.father_middle_name} {item.father_last_name}</td>
                                                <td>{item.father_mobile}</td>
                                                <td>{item.registration_no}</td>
                                                <td>{item.test_date} </td>
                                                <td>
                                                    <span className={`badge ${item?.exam_status == 'Selected' ? 'success' : (item?.exam_status == 'Not Selected' ? 'danger' : 'warning')}`}>
                                                        {item.exam_status ?? "Pending"}
                                                    </span>
                                                </td>
                                                <td>{item?.result}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="8">
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamChangeStatusStudent;
