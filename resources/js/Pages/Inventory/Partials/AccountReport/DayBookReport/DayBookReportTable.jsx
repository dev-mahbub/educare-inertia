import { useEffect, useMemo, useState } from "react";

const DayBookReportTable = ({
    dayBookReport,
    filterText
}) => {

    const [totalDebitAmount, setTotalDebitAmount] = useState(0);
    const [totalCreditAmount, setTotalCreditAmount] = useState(0);

    useEffect(() => {
        const total_debit_amount = dayBookReport?.reduce((total, item) => total + parseFloat(item?.debit ?? 0), 0)?.toFixed(2);
        const total_credit_amount = dayBookReport?.reduce((total, item) => total + parseFloat(item?.credit ?? 0), 0)?.toFixed(2);

        setTotalDebitAmount(total_debit_amount);
        setTotalCreditAmount(total_credit_amount);
    }, [dayBookReport]);

    const filteredReport = useMemo(() => {
        const inputText = filterText?.toLowerCase()?.trim();

        return dayBookReport?.filter((item) => {
            const date = item?.date?.toLowerCase();
            const particulars = item?.particulars?.toLowerCase();
            const voucherType = item?.voucher_type?.toLowerCase();
            const voucherNo = String(item?.voucher_no)?.toLowerCase();
            const narration = item?.narration?.toLowerCase();
            const debit = String(item?.debit);
            const credit = String(item?.credit);

            return (
                date?.includes(inputText) ||
                particulars?.includes(inputText) ||
                voucherType?.includes(inputText) ||
                voucherNo?.includes(inputText) ||
                narration?.includes(inputText) ||
                debit?.includes(inputText) ||
                credit?.includes(inputText)
            );
        });
    }, [filterText, dayBookReport]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Particulars</th>
                                        <th>Vch Type</th>
                                        <th>Vch No.</th>
                                        <th>Narration</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReport?.length > 0 ?
                                        filteredReport.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.date}</td>
                                                <td>{item?.particulars}</td>
                                                <td>{item?.voucher_type}</td>
                                                <td>{item?.voucher_no}</td>
                                                <td>{item?.narration}</td>
                                                <td>{item?.debit != null ? parseFloat(item?.debit ?? 0)?.toFixed(2) : ''}</td>
                                                <td>{item?.credit != null ? parseFloat(item?.credit ?? 0)?.toFixed(2) : ''}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }

                                    {dayBookReport?.length > 0 &&
                                        <>
                                            <tr>
                                                <td colSpan="4"></td>
                                                <td><h6 className="text-[15px] font-semibold text-heading font-primary">Total</h6></td>
                                                <td>{totalDebitAmount}</td>
                                                <td>{totalCreditAmount}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4"></td>
                                                <td><h6 className="text-[15px] font-semibold text-heading font-primary">Net Balance</h6></td>
                                                <td>{(totalDebitAmount - totalCreditAmount) > 0 ? (totalDebitAmount - totalCreditAmount)?.toFixed(2) : ''}</td>
                                                <td>{(totalCreditAmount - totalDebitAmount) > 0 ? (totalCreditAmount - totalDebitAmount)?.toFixed(2) : ''}</td>
                                            </tr>
                                        </>
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

export default DayBookReportTable;
