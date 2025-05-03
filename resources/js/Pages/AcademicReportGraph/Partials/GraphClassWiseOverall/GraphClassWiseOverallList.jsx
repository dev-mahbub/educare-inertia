import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import GraphClassWiseOverallListBarGraph from "./GraphClassWiseOverallListBarGraph";
import GraphClassWiseOverallListPieGraph from "./GraphClassWiseOverallListPieGraph";


export default function GraphClassWiseOverallList({
    ranges = [],
    classWiseOverallReport
}) {
    const [toggleValue, setToggleValue] = useState("Show PieChart")
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        // Calculate total students dynamically when ranges change
        const total = classWiseOverallReport?.reduce((acc, range) => acc + range?.total_student ?? 0, 0);
        setTotalStudents(total);
    }, [ranges]);

    const handleToggle = () => {
        if (toggleValue === "Show PieChart") {
            setToggleValue("Show GraphChart")
        } else {
            setToggleValue("Show PieChart")
        }
    }


    return (
        <>
            <div className="educare-classroom-form-area">
                {classWiseOverallReport?.length > 0 ?
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                            {toggleValue === "Show PieChart" ? (
                                <GraphClassWiseOverallListBarGraph ranges={classWiseOverallReport} />
                            ) : (
                                <GraphClassWiseOverallListPieGraph ranges={classWiseOverallReport} />
                            )}
                        </div>
                        <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Range</th>
                                                <th>No. of students</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classWiseOverallReport?.length > 0 &&
                                                classWiseOverallReport?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{`${item?.min}-${item?.max}`}</td>
                                                        <td>{item?.total_student}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td>Total</td>
                                                <td>{totalStudents}</td>
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
                :
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12">
                            <div
                                className="mt-2 py-2"
                            >
                                <p
                                    className="text-center text-danger"
                                >
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
