import { concatName } from "@/Hooks/GlobalFunction";

const EsiReportTable = ({
    staffSalaryPayments,
    totalReportCount
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl.No </th>
                                        <th>Employee Id</th>
                                        <th>Name</th>
                                        <th>UAN</th>
                                        {/* <th>No of Days Worked</th> */}
                                        <th>Gross Salary</th>
                                        <th>Employees</th>
                                        <th>Employers</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalReportCount > 0 ?
                                        staffSalaryPayments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item?.staff?.employee_id}</td>
                                                <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                                <td>{item?.staff?.uan}</td>
                                                <td>{item?.gross_salary}</td>
                                                <td>{item?.employees_amount}</td>
                                                <td>{item?.employers_amount}</td>
                                                <td>{item?.total_amount}</td>
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
        </>
    );
};

export default EsiReportTable;
