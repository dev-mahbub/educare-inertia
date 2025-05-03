import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import GraphSubjectWiseOverallListPieGraph from "./GraphSubjectWiseOverallListPieGraph";
import SubjectWiseReportGraph from "./SubjectWiseReportGraph";

export default function GraphSubjectWiseOverallList({ ranges = [] }) {
    const [toggleValue, setToggleValue] = useState("Show PieChart");
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        // Calculate total students dynamically when ranges change
        const total = ranges.reduce(
            (acc, range) => acc + range.total_student,
            0
        );
        setTotalStudents(total);
    }, [ranges]);

    const handleToggle = () => {
        if (toggleValue === "Show PieChart") {
            setToggleValue("Show GraphChart");
        } else {
            setToggleValue("Show PieChart");
        }
    };

    return (
        <>
            <h5 className="text-headingLight font-semibold mb-2">
                Subject Wise Overall Performance of the class(Percentage graph)
            </h5>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        {toggleValue === "Show PieChart" ? (
                            <SubjectWiseReportGraph ranges={ranges} />
                        ) : (
                            <GraphSubjectWiseOverallListPieGraph
                                ranges={ranges}
                            />
                        )}
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Range (%)</th>
                                            <th>No. of students</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ranges?.length > 0 &&
                                            ranges?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{`${item?.min}-${item?.max}`}</td>
                                                    <td>
                                                        {item?.total_student}
                                                    </td>
                                                </tr>
                                            ))}

                                        <tr>
                                            <td>Total</td>
                                            <td>
                                                {totalStudents > 0
                                                    ? totalStudents
                                                    : 0}
                                            </td>
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
