import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import moment from "moment";
import { useEffect } from "react";

const StudentAgeReportTable = ({ studentData = [], loading, setLoading }) => {

    useEffect(() => {
        setLoading(false);
    }, [studentData]);

    function calculateAge(birthdate) {
        const today = moment();
        const birthdateMoment = moment(birthdate);

        const years = today.diff(birthdateMoment, 'years');
        birthdateMoment.add(years, 'years');

        const months = today.diff(birthdateMoment, 'months');
        birthdateMoment.add(months, 'months');

        const days = today.diff(birthdateMoment, 'days');

        return `${years}y, ${months}m, ${days}d`;
    }

    function calculateYear(birthdate) {
        const today = moment();
        const birthdateMoment = moment(birthdate);

        let years = today.diff(birthdateMoment, 'years');
        birthdateMoment.add(years, 'years');

        const months = today.diff(birthdateMoment, 'months');
        birthdateMoment.add(months, 'months');

        if(months >= 6) {
            years = years + 1;
        }

        return `${years}y`;
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SrNo</th>
                                        <th>Class</th>
                                        <th>Student Name</th>
                                        <th>DOB</th>
                                        <th>Age</th>
                                        <th>Age Close to</th>
                                        <th>Father</th>
                                        <th>Adm No.</th>
                                        <th>Roll No.</th>
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
                                                    <td>{item?.classroom?.title ?? ""}</td>
                                                    <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    <td>{moment(item?.birth_date_at).format("DD MMM, YYYY")}</td>
                                                    <td>{calculateAge(item?.birth_date_at)}</td>
                                                    <td>{calculateYear(item?.birth_date_at)}</td>
                                                    <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{item?.classroom_roll?.roll_no ?? ""}</td>
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

export default StudentAgeReportTable;
