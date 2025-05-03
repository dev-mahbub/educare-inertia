import Loader from "@/Components/Loader";

const SpecialFeeTypeReportTable = ({
    specialFeeTypeReport,
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
                                        <th>Roll No.</th>
                                        <th>Admission No.</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Amount</th>
                                        <th>Fee Type</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(specialFeeTypeReport)?.length > 0 ?
                                            Object.values(specialFeeTypeReport)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.roll_no}</td>
                                                        <td>{item?.admission_no}</td>
                                                        <td>{item?.student_name}</td>
                                                        <td>{item?.classroom_title}</td>
                                                        <td>{formatNumber(item?.amount)}</td>
                                                        <td>{item?.fee_type_title}</td>
                                                    </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
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

export default SpecialFeeTypeReportTable;
