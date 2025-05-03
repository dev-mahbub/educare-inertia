
const DocumentDashboardSchoolDriverTeacherTable = ({
    teacherDocumentSummary,
    driverDocumentSummary,
    schoolDocumentSummary
}) => {
    return (
        <div className='mb-5'>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i> Documents Overview
                </h5>
            </div>
            <div className='educare-parent-montly-income-area'>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-center' colSpan={2}>Driver</th>
                                    </tr>
                                    <tr>
                                        <th className='!bg-transparent'>Document Category</th>
                                        <th className='!bg-transparent'>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driverDocumentSummary?.length > 0 &&
                                        driverDocumentSummary.map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td>{item?.document_category}</td>
                                                <td>{item?.total_count}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-center' colSpan={2}>School</th>
                                    </tr>
                                    <tr>
                                        <th className='!bg-transparent'>Document Category</th>
                                        <th className='!bg-transparent'>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schoolDocumentSummary?.length > 0 &&
                                        schoolDocumentSummary.map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td>{item?.document_category}</td>
                                                <td>{item?.total_count}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-center' colSpan={2}>Teacher</th>
                                    </tr>
                                    <tr>
                                        <th className='!bg-transparent'>Document Category</th>
                                        <th className='!bg-transparent'>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacherDocumentSummary?.length > 0 &&
                                        teacherDocumentSummary.map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td>{item?.document_category}</td>
                                                <td>{item?.total_count}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentDashboardSchoolDriverTeacherTable;
