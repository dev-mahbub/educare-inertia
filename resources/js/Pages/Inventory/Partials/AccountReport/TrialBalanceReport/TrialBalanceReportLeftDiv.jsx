import TrialBalanceReportLeftFilter from "./TrialBalanceReportLeftFilter";

const TrialBalanceReportLeftDiv = ({
    setSelectedAccountGroup,
    accountGroupSummary
}) => {

    // handle select account group data start
    const handleSelectAccountGroup = (id) => {
        const accountGroup = accountGroupSummary?.find((item) => item?.id == id);

        setSelectedAccountGroup(accountGroup ?? {});
    }
    // handle select account group data end

    return (
        <>
            <TrialBalanceReportLeftFilter
                accountGroupSummary={accountGroupSummary}
                setSelectedAccountGroup={setSelectedAccountGroup}
            />

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th>Debit</th>
                            <th>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountGroupSummary?.length > 0 ?
                            <>
                                {accountGroupSummary.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            {" "}
                                            <button
                                                className="font-semibold text-primary"
                                                type="button"
                                                onClick={() => handleSelectAccountGroup(item?.id)}
                                            >
                                                {item?.title}
                                            </button>{" "}
                                        </td>
                                        <td>{parseFloat(item.debit ?? 0)?.toFixed(2)}</td>
                                        <td>{parseFloat(item.credit ?? 0)?.toFixed(2)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td>Total</td>
                                    <td>{accountGroupSummary?.reduce((total, item) => total + parseFloat(item.debit ?? 0), 0)?.toFixed(2)}</td>
                                    <td>{accountGroupSummary?.reduce((total, item) => total + parseFloat(item.credit ?? 0), 0)?.toFixed(2)}</td>
                                </tr>
                            </>
                        :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="3"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrialBalanceReportLeftDiv;
