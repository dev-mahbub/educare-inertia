import { useState } from "react";
import TcSummaryReportLeftDiv from "./TcSummaryReportLeftDiv";
import TcSummaryReportRightDiv from "./TcSummaryReportRightDiv";

const TcSummaryReportTables = ({ tcSummery, tcStudents }) => {

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                        <TcSummaryReportLeftDiv
                            tcSummery={tcSummery}
                            setLoading={setLoading}
                            setParams={setParams}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                        <TcSummaryReportRightDiv
                            loading={loading}
                            setLoading={setLoading}
                            tcStudents={tcStudents}
                            params={params}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TcSummaryReportTables;
