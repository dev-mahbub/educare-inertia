import GraphWeakersReportChartGraph from './GraphWeakersReportChartGraph';
export default function GraphWeakersReportList({ graphWeakerReport }) {
    return (
        <>
            <div className="educare-classroom-form-area">
                    {Object.values(graphWeakerReport)?.length > 0 ?
                        <div className="grid grid-cols-12 gap-[20px]">
                            <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Roll No.</th>
                                                    <th>Student Name</th>
                                                    <th>Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.values(graphWeakerReport)?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item?.roll_no}</td>
                                                            <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                                            <td>{item?.total_percentage}%</td>
                                                        </tr>
                                                    );
                                                })}

                                                {/* {Object.values(graphWeakerReport)?.length > 0 ?
                                                    Object.values(graphWeakerReport)?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index+1}</td>
                                                                <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                                                <td>{item?.total_percentage}%</td>
                                                            </tr>
                                                        );
                                                    })
                                                    :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="3">
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                } */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                                <GraphWeakersReportChartGraph
                                    graphWeakerReport={graphWeakerReport}
                                />
                            </div>
                        </div>
                    :
                        <div className="grid grid-cols-12 gap-[20px]">
                            <div className="col-span-12">
                                <div
                                    className='mt-2 py-2'
                                >
                                    <p className="text-center text-red-500" colSpan="3">
                                        Data not found
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
            </div>
        </>
    );
}
