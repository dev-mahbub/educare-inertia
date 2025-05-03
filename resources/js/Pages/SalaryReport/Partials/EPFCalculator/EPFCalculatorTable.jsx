import { concatName } from "@/Hooks/GlobalFunction";

const EPFCalculatorTable = ({
    earningTypeTitles,
    totalReportCount,
    staffSalaryPayments
}) => {
    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Employee Id</th>
                                    <th>Name</th>
                                    <th>UAN</th>
                                    <th>PF No.</th>
                                    {earningTypeTitles?.length > 0 &&
                                        <th>{earningTypeTitles?.join('+')}</th>
                                    }
                                    <th>PF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalReportCount > 0 ?
                                    staffSalaryPayments.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.staff?.employee_id}</td>
                                            <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                            <td>{item?.staff?.uan}</td>
                                            <td>{item?.staff?.pf_account_number}</td>
                                            {earningTypeTitles?.length > 0 &&
                                                <td>{item?.total_earning}</td>
                                            }
                                            <td>{item?.pf_amount}</td>
                                        </tr>
                                    ))
                                :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">
                                            Data not found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EPFCalculatorTable;
