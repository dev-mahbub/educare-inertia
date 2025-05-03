
const DocumentDashboardStudentTable = ({
    studentDocumentSummary,
    studentDocumentCategories
}) => {
    return (
        <div>
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Student Documents Count
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            {studentDocumentCategories?.length > 0 &&
                                studentDocumentCategories.map((item, index) => (
                                    <th key={index}>{item?.title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {studentDocumentSummary?.length > 0 &&
                            studentDocumentSummary.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.classroom_title}</td>
                                    {studentDocumentCategories?.length > 0 &&
                                        studentDocumentCategories.map((category, innerIndex) => (
                                            <td key={innerIndex}>
                                                {item?.category_wise_summary?.find(categoryData => category?.title == categoryData?.document_category)?.total_count ?? 0}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentDashboardStudentTable;
