import { useEffect, useState } from "react";
import ClassWiseTopbar from "./ClassWiseTopbar";
import InstallmentWiseFeeCollection from "./InstallmentWiseFeeCollection";

export default function ClassWiseFeeCollection({
    feeCollectionSummary = []
}) {
    const [classWiseSummary, setClassWiseSummary] = useState([]);
    const [installmentWiseSummary, setInstallmentWiseSummary] = useState([]);
    const [classWiseTotalAmount, setClassWiseTotalAmount] = useState(0);
    const [installmentWiseTotalAmount, setInstallmentWiseTotalAmount] = useState(0);

    useEffect(() => {
        const classWiseSummaryData = feeCollectionSummary['class_wise_summary'] ?? [];
        const installmentWiseSummaryData = feeCollectionSummary['installment_wise_summary'] ?? [];

        setClassWiseSummary(classWiseSummaryData);
        setInstallmentWiseSummary(installmentWiseSummaryData);

        setClassWiseTotalAmount(Object.values(classWiseSummaryData)?.reduce((total, amount) => total + amount, 0));
        setInstallmentWiseTotalAmount(Object.values(installmentWiseSummaryData)?.reduce((total, amount) => total + amount, 0));
    },[feeCollectionSummary]);


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <ClassWiseTopbar />
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Total Collection = {classWiseTotalAmount}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(classWiseSummary)?.length > 0 &&
                                            Object.keys(classWiseSummary)?.map((classroom, index) => (
                                                <tr key={index}>
                                                    <td>{classroom}</td>
                                                    <td>{classWiseSummary[classroom]}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <InstallmentWiseFeeCollection
                            installmentWiseSummary={installmentWiseSummary}
                            installmentWiseTotalAmount={installmentWiseTotalAmount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
