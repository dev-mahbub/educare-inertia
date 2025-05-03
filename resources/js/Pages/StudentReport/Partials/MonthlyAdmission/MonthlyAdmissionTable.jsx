
export default function MonthlyAdmissionTable({
    monthlyAdmissionReports
}) {
    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Month</th>
                                            <th>Total Admission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(monthlyAdmissionReports)?.length > 0 ?
                                            Object.values(monthlyAdmissionReports)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item?.month}</td>
                                                    <td>{item?.total_admission_count ?? 0}</td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">
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
            </div>
        </>
    );
}
