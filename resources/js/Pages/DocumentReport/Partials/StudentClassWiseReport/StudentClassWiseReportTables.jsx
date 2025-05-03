import { useState } from "react";
import StudentClassWiseReportFilter from "./StudentClassWiseReportFilter";
import StudentClassWiseReportLeftTable from "./StudentClassWiseReportLeftTable";
import StudentClassWiseReportRightTable from "./StudentClassWiseReportRightTable";

const StudentClassWiseReportTables = ({
    classrooms,
    studentDocumentCategories,
    studentDocumentReports
}) => {
    const [selectValue, setSelectValue] = useState("Document");

    return (
        <>
            <StudentClassWiseReportFilter
                setSelectValue={setSelectValue}
                classrooms={classrooms}
                studentDocumentCategories={studentDocumentCategories}
                studentDocumentReports={studentDocumentReports}
            />
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <StudentClassWiseReportLeftTable
                            selectValue={selectValue}
                            studentDocumentReports={studentDocumentReports}
                         />
                    </div>
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <StudentClassWiseReportRightTable
                            selectValue={selectValue}
                            studentDocumentReports={studentDocumentReports}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentClassWiseReportTables;
