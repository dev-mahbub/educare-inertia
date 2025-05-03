import React from "react";
import ClassSubjectReportFilter from "./ClassSubjectReportFilter";
import ClassSectioinReportFilter from "./ClassSectioinReportFilter";

export default function TeacherSubjectReportForm() {


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Class Subject Report
                                </h5>
                            </div>
                            <ClassSubjectReportFilter />
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Class</th>
                                            <th>Subject</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>X I</td>
                                            <td>English</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>VII</td>
                                            <td>Math</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Class Section Report
                                </h5>
                            </div>
                            <ClassSectioinReportFilter />
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Teacher Name</th>
                                            <th>Subject</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Shamim Ahmed</td>
                                            <td>Math</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Dhiren Sutrodhor</td>
                                            <td>English</td>
                                        </tr>
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
