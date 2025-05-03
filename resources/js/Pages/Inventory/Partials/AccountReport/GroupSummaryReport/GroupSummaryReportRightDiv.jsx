
const GroupSummaryReportRightDiv = ({
    groupSummary,
    selectedAccountGroup
}) => {
    return (
        <>
            <div className="educare-card-title pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Group Summary {selectedAccountGroup?.title}
                </h5>
            </div>
            {/* table */}
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th className="font-semibold">Sr.</th>
                            <th className="font-semibold">Title</th>
                            <th className="font-semibold">Debit Amount</th>
                            <th className="font-semibold">Credit Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedAccountGroup?.id != null && groupSummary?.length > 0 ?
                            <>
                                {groupSummary.map((item, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item?.title}</td>
                                        <td>{parseFloat(item.debit ?? 0)?.toFixed(2)}</td>
                                        <td>{parseFloat(item.credit ?? 0)?.toFixed(2)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={1}> </td>
                                    <td className="font-semibold">Total</td>
                                    <td className="font-semibold">{groupSummary.reduce((total, item) => total + parseFloat(item?.debit ?? 0), 0)?.toFixed(2)}</td>
                                    <td className="font-semibold">{groupSummary.reduce((total, item) => total + parseFloat(item?.credit ?? 0), 0)?.toFixed(2)}</td>
                                </tr>
                            </>
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="4">
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

export default GroupSummaryReportRightDiv;
