
const DailyAdmissionReportTable = ({
    dailyAdmissionReport
 }) => {

    // handle view studnet details start
    const handleViewStudentDetails = (id) => {
        if(id != null) {
            window.open(route('student.details', id));
        }
    }
    // handle view studnet details end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student Name </th>
                                        <th>Class</th>
                                        <th>Reg No</th>
                                        <th>Reg Date</th>
                                        <th> Adm No </th>
                                        <th>Adm Date</th>
                                        <th>Father Name</th>
                                        <th>Taken By</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(dailyAdmissionReport)?.length > 0 ?
                                        Object.values(dailyAdmissionReport)?.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="text-primary cursor-pointer"
                                                        onClick={() => {
                                                            handleViewStudentDetails(item?.student_id)
                                                        }}
                                                     >
                                                        {item?.student_name}
                                                    </button>
                                                </td>
                                                <td>{item?.class}</td>
                                                <td>{item?.registration_no}</td>
                                                <td>{item?.registration_date}</td>
                                                <td>{item?.admission_no}</td>
                                                <td>{item?.admission_date}</td>
                                                <td>{item?.father_name}</td>
                                                <td>{item?.taken_by}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
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

export default DailyAdmissionReportTable;
