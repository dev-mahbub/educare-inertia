import { useMemo } from "react";

const EpfWageReportTable = ({
    staffSalaryPayments,
    totalReportCount,
    filterText
}) => {

    // filter report start
    const filteredReports = useMemo(() => {
        return staffSalaryPayments?.filter(item => {
            const employeeId = String(item?.employee_id)?.toLowerCase();
            const staffName  = item?.staff_name?.toLowerCase();
            const uan  = item?.uan?.toLowerCase();
            const grossSalary = String(item?.gross_salary)?.toLowerCase();
            const pfAmount = String(item?.pf_amount)?.toLowerCase();

            return (
                employeeId && employeeId?.includes(filterText) ||
                staffName && staffName?.includes(filterText) ||
                uan && uan?.includes(filterText) ||
                grossSalary && grossSalary?.includes(filterText) ||
                pfAmount && pfAmount?.includes(filterText)
            );
        });
    }, [filterText, staffSalaryPayments]);
    // filter report end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Employee Id</th>
                                        <th>Staff Name</th>
                                        <th>UAN</th>
                                        <th>Gross Salary</th>
                                        <th>PF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalReportCount > 0 ?
                                        filteredReports?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.employee_id}</td>
                                                <td>{item?.staff_name}</td>
                                                <td>{item?.uan}</td>
                                                <td>{item?.gross_salary}</td>
                                                <td>{item?.pf_amount}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="10"
                                            >
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

export default EpfWageReportTable;
