import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import moment from "moment";
import { useEffect } from "react";

const StudentDocumentReportTable = ({studentData = [], loading, setLoading}) => {

    useEffect(() => {
        setLoading(false);
    }, [studentData]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Adm No.</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>DOB</th>
                                        <th>Father</th>
                                        <th>Documents Submitted </th>
                                        <th>Documents Not Submitted</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentData?.length > 0 ? (
                                            studentData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    <td>{item?.classroom?.title ?? ""}</td>
                                                    <td>{item?.birth_date_at != null ? moment(item?.birth_date_at).format("DD MMM, YYYY") : ""}</td>
                                                    <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                                    <td>{item?.attached_documents ?? ""}</td>
                                                    <td>{item?.unattached_documents ?? ""}</td>
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
                </div>
            </div>
        </>
    );
};

export default StudentDocumentReportTable;
