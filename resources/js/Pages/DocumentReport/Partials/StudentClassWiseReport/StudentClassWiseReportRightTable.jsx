import { Tooltip } from "@mui/material";

const StudentClassWiseReportRightTable = ({
    selectValue,
    studentDocumentReports
}) => {
    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                         {selectValue} submitted
                    </h5>
                </div>

                <div className="educare-header-filtar-bar-count">
                    <span>Count: {studentDocumentReports?.document_not_submitted?.length ?? 0}</span>
                </div>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Adm No.</th>
                            <th>Name</th>
                            <th>Father Name</th>
                            <th>Father Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentDocumentReports?.document_not_submitted?.length > 0 ?
                            studentDocumentReports.document_not_submitted.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title={item?.student_status == 'Promoted' ? 'Promoted' : 'New'}
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        className={item?.student_status == 'Promoted' ? 'educare-warning-btn-sm-fill' : 'educare-success-btn-sm-fill'}
                                                    >
                                                        {item?.student_status == 'Promoted' ? 'P' : 'N'}
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{item?.admission_no}</td>
                                    <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                    <td>{item?.father?.first_name} {item?.father?.middle_name} {item?.father?.last_name}</td>
                                    <td>{item?.father?.phone}</td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td className="text-center" colSpan="7">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StudentClassWiseReportRightTable;
