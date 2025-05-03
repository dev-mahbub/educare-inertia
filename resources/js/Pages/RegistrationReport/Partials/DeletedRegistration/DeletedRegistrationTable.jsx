
const DeletedRegistrationTable = ({
    registrations
}) => {
    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Registration No.</th>
                                        <th>Date</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {registrations?.length > 0 ? (
                                        registrations?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.registration_no}</td>
                                            <td>{item?.date_of_registration}</td>
                                            <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                            <td>{item?.class_title}</td>
                                            <td>
                                                {`${item?.father_first_name ?? ""} ${item?.father_middle_name ?? ""} ${item?.father_last_name ?? ""}`}
                                            </td>
                                            <td>{item?.father_mobile}</td>
                                            <td>{formatNumber(item?.academic_fee ?? 0)}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td className="text-center text-red-500" colSpan="7">
                                            Data not found
                                        </td>
                                        </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeletedRegistrationTable;
