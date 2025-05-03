import { concatName } from "@/Hooks/GlobalFunction";
import { useMemo } from "react";

const BankStatementTable = ({
    staffSalaryPayments,
    filterText
}) => {

    const totalPaidAmount = staffSalaryPayments?.reduce((total, item) => total + parseInt(item?.paid_amount ?? 0), 0);

    // filter by search start
    const filteredSalaryPayments = useMemo(() => {
        return staffSalaryPayments?.filter(item => {
            const inputText = filterText?.trim()?.toLowerCase();

            const employeeId = String(item?.staff?.employee_id)?.toLowerCase();
            const staffName = concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)?.toLowerCase();
            const uan = item?.staff?.uan?.toLowerCase();
            const bankAccountNo = item?.staff?.bank_account_no?.toLowerCase();
            const ifsc = item?.staff?.ifsc?.toLowerCase();
            const designtaion = item?.staff?.designtaion?.name?.toLowerCase();

            return ((employeeId && employeeId?.includes(inputText)) ||
                (staffName && staffName?.includes(inputText)) ||
                (uan && uan?.includes(inputText)) ||
                (bankAccountNo && bankAccountNo?.includes(inputText)) ||
                (ifsc && ifsc?.includes(inputText)) ||
                (designtaion && designtaion?.includes(inputText)));
        });
    }, [staffSalaryPayments, filterText]);
    // filter by search end

    return (
        <div className="educare-admission-list-inner-wrapper">
            <div className="educare-admission-list">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>UAN</th>
                            <th>Account Number</th>
                            <th>IFSC</th>
                            <th>Designation</th>
                            <th>Total Payable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaryPayments?.length > 0 &&
                            filteredSalaryPayments.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.staff?.employee_id}</td>
                                    <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                    <td>{item?.staff?.uan}</td>
                                    <td>{item?.staff?.bank_account_no}</td>
                                    <td>{item?.staff?.ifsc}</td>
                                    <td>{item?.staff?.designation?.name}</td>
                                    <td>{parseInt(item?.paid_amount ?? 0)}</td>
                                </tr>
                            ))
                        }

                        <tr>
                            <td colSpan={6}></td>
                            <td className="font-semibold">Total</td>
                            <td className="font-semibold">{totalPaidAmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BankStatementTable;
