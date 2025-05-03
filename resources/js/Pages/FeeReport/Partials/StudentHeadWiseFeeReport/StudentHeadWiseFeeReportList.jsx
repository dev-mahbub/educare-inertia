import Loader from "@/Components/Loader";

const StudentHeadWiseFeeReportList = ({
    studentHeadWiseReports,
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

        if(newNum.split('.')[1] == '00') {
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
                        <div className="educare-admission-list custom-scroll-style">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.N.</th>
                                        <th>ADM. N.</th>
                                        <th>NAME</th>
                                        <th>Roll No.</th>
                                        <th>CLASS</th>
                                        <th>FATHER NAME</th>
                                        <th>FATHER MOBILE</th>
                                        <th>
                                            {studentHeadWiseReports?.hasVoucher == true ? 'TOTAL FEE WITH VOUCHER' : 'TOTAL FEE'}
                                        </th>
                                        <th>DISCOUNT</th>
                                        <th>TOTAL PAYABLE</th>
                                        <th>TOTAL PAID</th>
                                        {studentHeadWiseReports?.fee_type_amounts != null && Object.keys(studentHeadWiseReports?.fee_type_amounts)?.length > 0 &&
                                            Object.keys(studentHeadWiseReports?.fee_type_amounts)?.map((feeType, index) => (
                                                <th key={index}>{feeType}</th>
                                            ))
                                        }
                                        <th>Total Due</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {studentHeadWiseReports?.reports != null && Object.keys(studentHeadWiseReports?.reports)?.length > 0 ?
                                                <>
                                                {Object.values(studentHeadWiseReports?.reports)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item?.student?.admission_no ?? ""}</td>
                                                        <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                        <td>{item?.student?.classroom_roll?.roll_no ?? ""}</td>
                                                        <td>{item?.student?.classroom?.title ?? ""}</td>
                                                        <td>{`${item?.student?.father?.first_name ?? ""} ${item?.student?.father?.middle_name ?? ""} ${item?.student?.father?.last_name ?? ""}`}</td>
                                                        <td>{item?.student?.father?.phone ?? ""}</td>
                                                        <td>{formatNumber(item?.total_amount ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_discount ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_payable ?? 0)}</td>
                                                        <td>{formatNumber(item?.total_paid ?? 0)}</td>
                                                        {studentHeadWiseReports?.fee_type_amounts != null && Object.keys(studentHeadWiseReports?.fee_type_amounts)?.length > 0 &&
                                                            Object.keys(studentHeadWiseReports?.fee_type_amounts)?.map((feeType) => (
                                                                <td>{formatNumber(item?.fee_type_amounts[feeType] ?? 0)}</td>
                                                            ))
                                                        }
                                                        <td>{formatNumber(item?.total_due ?? 0)}</td>
                                                        <td>{item?.student?.student_status?.toUpperCase() ?? ""}</td>
                                                    </tr>
                                                ))}

                                                < tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Totals</td>
                                                    <td></td>
                                                    <td>{formatNumber(studentHeadWiseReports?.total_amount ?? 0)}</td>
                                                    <td>{formatNumber(studentHeadWiseReports?.total_discount ?? 0)}</td>
                                                    <td>{formatNumber(studentHeadWiseReports?.total_payable ?? 0)}</td>
                                                    <td>{formatNumber(studentHeadWiseReports?.total_paid ?? 0)}</td>

                                                    {studentHeadWiseReports?.fee_type_amounts != null && Object.keys(studentHeadWiseReports?.fee_type_amounts)?.length > 0 &&
                                                        Object.keys(studentHeadWiseReports?.fee_type_amounts)?.map((feeType) => (
                                                            <td>{formatNumber(studentHeadWiseReports?.fee_type_amounts[feeType] ?? 0)}</td>
                                                        ))
                                                    }

                                                    <td>{formatNumber(studentHeadWiseReports?.total_due ?? 0)}</td>
                                                    <td></td>
                                                </ tr>
                                                </>
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="12">
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

export default StudentHeadWiseFeeReportList;
