import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import moment from "moment";
import { useEffect } from "react";

const StudentPromotedReportTable = ({ students = [], loading, setLoading }) => {


    useEffect(() => {
        setLoading(false);
    }, [students]);


    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll No.</th>
                                <th>Adm No.</th>
                                <th>Father Name</th>
                                <th>Mobile</th>
                                <th>Promoted To Class</th>
                                <th>Promoted From Class</th>
                                <th>Promoted Date</th>
                                <th>Promoted By</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {students?.length > 0 ? (
                                    students?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                            <td>{item?.classroom_roll?.roll_no}</td>
                                            <td>{item?.admission_no}</td>
                                            <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                            <td>{item?.father?.phone}</td>
                                            <td>{item?.classroomData?.title ?? ""}</td>
                                            <td>{`(${item?.previous_academic_year?.academic_session ?? ""}) ${item?.previous_classroom?.title ?? ""}`}</td>
                                            <td>{item?.classroom_student?.promoted_date_at != null ? moment(item?.classroom_student?.promoted_date_at).format("DD MMM, YYYY") : ''}</td>
                                            <td>{`${item?.classroom_student?.user?.first_name ?? ""} ${item?.classroom_student?.user?.middle_name ?? ""} ${item?.classroom_student?.user?.last_name ?? ""}`}</td>
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
                        {/* <tbody>
                            <tr>
                                <td>Anish Mahapatra</td>
                                <td>250</td>
                                <td>29</td>
                                <td>Anish Mahapatra</td>
                                <td>0099989898</td>
                                <td>II A</td>
                                <td>II B</td>
                                <td>1-Jan-2002</td>
                                <td>Pooja Roy</td>
                            </tr>
                        </tbody> */}
                    </table>
                </div>
            </div>
        </>
    );
};

export default StudentPromotedReportTable;
