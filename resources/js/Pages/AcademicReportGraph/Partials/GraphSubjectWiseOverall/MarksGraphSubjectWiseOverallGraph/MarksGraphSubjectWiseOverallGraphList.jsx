import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import { useState, useEffect } from "react";
import MarksSubjectWiseReportGraph from "./MarksSubjectWiseReportGraph";
import MarksGraphSubjectWiseOverallListPieGraph from "./MarksGraphSubjectWiseOverallListPieGraph";

export default function MarksGraphSubjectWiseOverallGraphList({
    markRanges = [],
}) {
    const [toggleValue, setToggleValue] = useState("Show PieChart");
    const [totalStudents, setTotalStudents] = useState(0);

    // Calculate total students dynamically when ranges change

    useEffect(() => {
        setTotalStudents(markRanges.reduce((sum, item) => sum + item.total_student, 0));
    }, [markRanges]);

    const handleToggle = () => {
        if (toggleValue === "Show PieChart") {
            setToggleValue("Show GraphChart");
        } else {
            setToggleValue("Show PieChart");
        }
    };

    return (
        <>
            <h5 className="text-headingLight font-semibold mt-5  mb-2">
                Subject Wise Overall Performance of the class(Marks graph)
            </h5>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        {toggleValue === "Show PieChart" ? (
                            <MarksSubjectWiseReportGraph
                                markRanges={markRanges}
                            />
                        ) : (
                            <MarksGraphSubjectWiseOverallListPieGraph
                                markRanges={markRanges}
                            />
                        )}
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Range ( Marks )</th>
                                            <th>No. of students</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {markRanges?.length > 0 &&
                                            markRanges?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{`${item?.min}-${item?.max}`}</td>
                                                    <td>
                                                        {item?.total_student}
                                                    </td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td>Total</td>
                                            <td>{totalStudents > 0 ? totalStudents : 0}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-5">
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                onClick={handleToggle}
                            >
                                {toggleValue}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
