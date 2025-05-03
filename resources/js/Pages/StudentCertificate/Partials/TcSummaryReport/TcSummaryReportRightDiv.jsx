import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const TcSummaryReportRightDiv = ({
    loading,
    setLoading,
    tcStudents = [],
    params
}) => {

    const [tcData, setTcData] = useState(tcStudents);

    useEffect(() => {
        setTcData(tcStudents)
        setLoading(false);
    }, [tcStudents]);

    return (
        <>
            {/* top bar  */}
            <div className=" educare-header-filtar-bar-inner-main mb-5">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Student SLC Report
                    </h5>
                </div>

                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                    {/* Replace changeable buttons */}

                    {tcData?.length > 0 &&
                        <div>
                            <Tooltip
                                title="Download Report"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.class_wise_student_tc_report', params)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                    }

                    {tcData?.length > 0 &&
                        <div>
                            <Tooltip
                                title="Print/Publish All"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target="_blank"
                                    href={route('pdf_tc_generator.render_bulk_tc_form', params)}
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-printer"></i>
                                </a>
                            </Tooltip>
                        </div>
                    }

                    {/* Replace changeable buttons */}
                </div>
            </div>
            {/* top bar End  */}

            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Student</th>
                                <th>AdmissionNo.</th>
                                <th>TcNo</th>
                                <th>Issue date</th>
                                <th>GeneratedOn</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {tcData?.length > 0 ? (
                                    tcData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>
                                                <a
                                                    className="text-primary"
                                                    href={route('pdf_tc_generator.render_tc_form', item?.student_id)}
                                                    target="_blank"
                                                 >
                                                    {concatName(item?.first_name, item?.middle_name, item?.last_name)}
                                                 </a>
                                            </td>
                                            <td>{item?.admission_no}</td>
                                            <td>{item?.certificate_no}</td>
                                            <td>{item?.issue_date_at != "" && item?.issue_date_at != null ? moment(item?.issue_date_at).format("DD MMM, YYYY") : ''}</td>
                                            <td>{item?.generated_date_at != "" && item?.generated_date_at != null ? moment(item?.generated_date_at).format("DD MMM, YYYY") : ''}</td>
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
        </>
    );
};

export default TcSummaryReportRightDiv;
