import { useEffect, useState } from "react";

const LedgerReportTable = ({
    ledgerReport,
    openingBalance,
    amountType,
    filteredLedgerReport
}) => {
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        setTotalDebit(ledgerReport?.reduce((total, item) => parseFloat(item?.debit ?? 0) + total, 0));
        setTotalCredit(ledgerReport?.reduce((total, item) => parseFloat(item?.credit ?? 0) + total, 0));
    }, [ledgerReport]);

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (num != '' && !isNaN(num) && !Number.isInteger(parseFloat(num))) {
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
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Particulars</th>
                                <th>Voucher Type</th>
                                <th>Vch No.</th>
                                <th>Narration</th>
                                <th>Debit</th>
                                <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLedgerReport?.length > 0 ?
                                filteredLedgerReport.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.date}</td>
                                        <td>{item?.ledger_title}</td>
                                        <td>{item?.voucher_type}</td>
                                        <td>{item?.receipt_no}</td>
                                        <td>{item?.description}</td>
                                        <td>{formatNumber(item?.debit ?? 0)}</td>
                                        <td>{formatNumber(item?.credit ?? 0)}</td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="7"
                                    >
                                        Select ledger and click on search button
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td colSpan={4}> </td>
                                <td className="font-semibold"> Opening Balance </td>
                                <td className="font-semibold">{amountType == 'Debit(Dr)' ? parseFloat(openingBalance ?? 0).toFixed(2) : ''}</td>
                                <td className="font-semibold">{amountType == 'Credit(Cr)' ? parseFloat(openingBalance ?? 0).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}> </td>
                                <td className="font-semibold"> Current Total </td>
                                <td className="font-semibold"> {parseFloat(totalDebit).toFixed(2)} </td>
                                <td className="font-semibold"> {parseFloat(totalCredit).toFixed(2)} </td>
                            </tr>
                            <tr>
                                <td colSpan={4}> </td>
                                <td className="font-semibold"> Closing Balance </td>
                                <td className="font-semibold">{((amountType == 'Debit(Dr)' ? (openingBalance + totalDebit) : totalDebit) - totalCredit) > 0 ? parseFloat((amountType == 'Debit(Dr)' ? (openingBalance + totalDebit) : totalDebit) - totalCredit).toFixed(2) : ''}</td>
                                <td className="font-semibold">{((amountType == 'Credit(Cr)' ? (openingBalance + totalCredit) : totalCredit) - totalDebit) > 0 ? parseFloat((amountType == 'Credit(Cr)' ? (openingBalance + totalCredit) : totalCredit) - totalDebit).toFixed(2) : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LedgerReportTable;
