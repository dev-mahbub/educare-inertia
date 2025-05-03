import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const TcSummaryReportLeftDiv = ({
    tcSummery = [],
    setLoading,
    setParams
}) => {

    const [selectedItem, setSelectedItem] = useState('');

    const handleClassroom = (e, classroomId, isDraft = false, isGenerated = false) => {
        e.preventDefault();

        const form_data = {
            classroom_id: classroomId,
            is_draft: isDraft,
            is_generated: isGenerated
        }

        router.post(route('student_certificate.tc_summary_report'), form_data);

        setLoading(false);
        setSelectedItem(classroomId);

        setParams(form_data);
    }

    return (
        <>
            {/* topbar  */}
            <div className=" educare-header-filtar-bar-inner-main mb-5">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Class Wise SLC Report
                    </h5>
                </div>

                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                    {/* Replace changable buttons */}

                    <div>
                        <Tooltip
                            title="Download Excel"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <a
                                target="_blank"
                                href={route('export_excel.class_wise_tc_report')}
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </a>
                        </Tooltip>
                    </div>

                    {/* Replace changable buttons */}
                </div>
            </div>
            {/* topbar End  */}

            {/* table */}

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Total Student</th>
                            <th>Saved Draft</th>
                            <th>Generated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tcSummery?.length > 0 ? (
                            tcSummery?.map((item, index) => (
                                <tr className={`${selectedItem === item?.id ? 'educare-table-row-active' : ''}`} key={index} >
                                    <td>{item?.title}</td>
                                    <td>{item?.students_count}</td>
                                    <td>
                                        <span
                                        className="cursor-pointer text-primary"
                                            onClick={(e) => handleClassroom(e, item?.id, true, false)}
                                        >
                                            {item?.student_draft_tc_count}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                        className="cursor-pointer text-primary"
                                            onClick={(e) => handleClassroom(e, item?.id, false, true)}
                                        >
                                            {item?.student_generate_tc_count}
                                        </span>
                                    </td>
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
                </table>
            </div>
        </>
    );
};

export default TcSummaryReportLeftDiv;
