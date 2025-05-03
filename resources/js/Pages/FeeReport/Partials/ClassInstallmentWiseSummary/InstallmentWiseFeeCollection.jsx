import InstallmentWiseTopbar from "./InstallmentWiseTopbar";

export default function InstallmentWiseFeeCollection({
    installmentWiseSummary = [],
    installmentWiseTotalAmount
}) {

    return (
        <>
            <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                <div className="educare-classroom-table-wrapper">
                    <InstallmentWiseTopbar />
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Total Collection = {installmentWiseTotalAmount}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(installmentWiseSummary)?.length > 0 &&
                                    Object.keys(installmentWiseSummary)?.map((installment, index) => (
                                        <tr key={index}>
                                            <td>{installment}</td>
                                            <td>{installmentWiseSummary[installment]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
