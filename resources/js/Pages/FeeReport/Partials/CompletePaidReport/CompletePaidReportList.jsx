import Loader from "@/Components/Loader";

const CompletePaidReportList = ({
    completePaidReport = [],
    loading
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

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
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
                                        <th>
                                        Sr. No
                                        </th>
                                        <th>Roll No.</th>
                                        <th>Admission no</th>
                                        <th>Student Name</th>
                                        <th>Father Name</th>
                                        <th>Class</th>
                                        <th>Mobile No</th>
                                        <th>Address</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(completePaidReport)?.length > 0 ?
                                            Object.values(completePaidReport)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{item?.student?.classroom_roll?.roll_no ?? ""}</td>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>
                                                        {`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}
                                                    </td>
                                                    <td>
                                                        {`${item?.student?.father?.first_name ?? ""} ${item?.student?.father?.middle_name ?? ""} ${item?.student?.father?.last_name ?? ""}`}
                                                    </td>
                                                    <td>{item?.student?.classroom?.title ?? 0}</td>
                                                    <td>{item?.student?.father?.phone ?? 0}</td>
                                                    <td>{item?.student?.present_address ?? 0}</td>
                                                    <td>{formatNumber(item?.total_paid)}</td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="9">
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompletePaidReportList;
