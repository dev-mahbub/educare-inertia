import Loader from "@/Components/Loader";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ClassWiseFeeCollectionTopbar from "./ClassWiseFeeCollectionTopbar";
import InstallmentWiseFeeCollectionTopbar from "./InstallmentWiseFeeCollectionTopbar";

export default function DateWiseClassSummaryList({
    loading,
    feeCollectionSummary,
    params
}) {
    const [totalClassWiseAmount, setTotalClassWiseAmount] = useState(0);
    const [totalInstallmentWiseAmount, setTotalInstallmentWiseAmount] = useState(0);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        dummy_1: "",
        dummy_2: "",
    });

    useEffect(() => {
        if (Object.keys(feeCollectionSummary)?.length > 0) {
            setTotalClassWiseAmount(Object.values(feeCollectionSummary?.class_wise_data)?.reduce((total, amount) => total + amount, 0));
            setTotalInstallmentWiseAmount(Object.values(feeCollectionSummary?.installment_wise_data)?.reduce((total, amount) => total + amount, 0));
        }
        else {
            setTotalClassWiseAmount(0);
            setTotalInstallmentWiseAmount(0);
        }
    }, [feeCollectionSummary]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <ClassWiseFeeCollectionTopbar
                                params={params}
                                feeCollectionSummary={feeCollectionSummary}
                            />
                            <div className="educare-default-table xs:overflow-x-auto mt-2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>
                                                <span className='badge primary'>Total Collection = {totalClassWiseAmount}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {Object.keys(feeCollectionSummary)?.length > 0 && Object.keys(feeCollectionSummary?.class_wise_data)?.length > 0 ?
                                                Object.keys(feeCollectionSummary?.class_wise_data)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item}</td>
                                                        <td>{feeCollectionSummary?.class_wise_data[item]}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td colSpan="2" className="text-center">No Amount</td>
                                                </tr>
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <InstallmentWiseFeeCollectionTopbar
                                params={params}
                                feeCollectionSummary={feeCollectionSummary}
                            />
                            <div className="educare-default-table xs:overflow-x-auto mt-2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>
                                                <span className='badge primary'>Total Collection = {totalInstallmentWiseAmount}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {Object.keys(feeCollectionSummary)?.length > 0 && Object.keys(feeCollectionSummary?.installment_wise_data)?.length > 0 ?
                                                Object.keys(feeCollectionSummary?.installment_wise_data)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item}</td>
                                                        <td>{feeCollectionSummary?.installment_wise_data[item]}</td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td colSpan="2" className="text-center">No Amount</td>
                                                </tr>
                                            }
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
