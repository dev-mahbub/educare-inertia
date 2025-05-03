import { Tooltip } from '@mui/material';

const AudiencewiseReportList = ({
    surveys
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-sms-templates-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Sr. No
                                        </th>
                                        <th>Survey Title</th>
                                        <th>Opened date</th>
                                        <th>Opened By</th>
                                        <th>Close Date</th>
                                        <th>Close By</th>
                                        <th>Participation</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {surveys?.length > 0 ?
                                        surveys?.map((survey, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{survey?.title}</td>
                                                <td>{survey?.opened_date}</td>
                                                <td>{survey?.opened_by?.first_name}</td>
                                                <td>{survey?.closed_date}</td>
                                                <td>{survey?.closed_by?.first_name}</td>
                                                <td>{survey?.total_participants}</td>
                                                <td>
                                                    {survey?.total_participants > 0 &&
                                                        <div className="educare-admission-list-action-btn">
                                                            <div className="educare-list-button-field-styles">
                                                                <Tooltip title="Download Excel" placement="top" arrow>
                                                                    <a
                                                                        href={route('export_excel.teacher.survey_response_report', survey?.id)}
                                                                        target='_blank'
                                                                        className="bg-success/80 inline-block"
                                                                    >
                                                                        <i className="icon-FileXls"></i>
                                                                    </a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    : ""}
                                    {/* <tr>
                                        <td>#01</td>
                                        <td>Executive Summary</td>
                                        <td>Jun 12, 2024</td>
                                        <td>Chandragupt kmje</td>
                                        <td>Jun 12, 2024</td>
                                        <td>Chandragupt kmje</td>
                                        <td>02</td>
                                        <td>
                                            <div className="educare-admission-list-action-btn">
                                                <div className="educare-list-button-field-styles">
                                                    <Tooltip title="Download Excel" placement="top" arrow>
                                                        <Link href="#" className="bg-success/80 inline-block">
                                                            <i className="icon-FileXls"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#02</td>
                                        <td>Executive Summary</td>
                                        <td>Jun 16, 2024</td>
                                        <td>Chandragupt kmje</td>
                                        <td>Jun 16, 2024</td>
                                        <td>Chandragupt kmje</td>
                                        <td>0</td>
                                        <td>
                                            <div className="educare-admission-list-action-btn">
                                                <div className="educare-list-button-field-styles">
                                                    <Tooltip title="Download Excel" placement="top" arrow>
                                                        <Link href="#" className="bg-success/80 inline-block">
                                                            <i className="icon-FileXls"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudiencewiseReportList;
