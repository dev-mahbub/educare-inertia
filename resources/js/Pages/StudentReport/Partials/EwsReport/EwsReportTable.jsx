import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const EwsReportTable = ({
    ewsReports
}) => {
    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Adm No.</th>
                                <th>Roll No.</th>
                                <th>Class</th>
                                <th>DOB</th>
                                <th>Father</th>
                                <th>Mobile No</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(ewsReports)?.length > 0 ?
                                Object.values(ewsReports)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.student_name}</td>
                                        <td>{item?.admission_no}</td>
                                        <td>{item?.roll_no}</td>
                                        <td>{item?.classroom_title}</td>
                                        <td>{item?.birth_date}</td>
                                        <td>{item?.father_name}</td>
                                        <td>{item?.father_phone}</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href={route('student.edit', item?.student_id)}
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td className="text-center text-red-500" colSpan="12">
                                        Data not found
                                    </td>
                                </tr>
                            }

                            {/* <tr>
                                <td>Aarohi Thakur</td>
                                <td>251</td>
                                <td>30</td>
                                <td>II A</td>
                                <td>2-Jan-2002</td>
                                <td>Paul Mahapatra</td>
                                <td>0099989888</td>
                                <td>
                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                        <div>
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-sm-fill"
                                                >
                                                    <i className="icon-editing"></i>
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
        </>
    );
};

export default EwsReportTable;
