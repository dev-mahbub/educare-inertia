import SelectInput from '@/Components/SelectInput';
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';

const ParentIncomeFilter = ({
    parentIncomeReport,
    guardians
}) => {

    const [guardianIds, setGuardianIds] = useState([]);
    const [parentIncomeReportData, setParentIncomeReportData] = useState([]);
    const [guardianData, setGuardianData] = useState([]);

    const parentIncome = [
        { 'id': 50000, 'title': 50000 },
        { 'id': 100000, 'title': 100000 },
        { 'id': 150000, 'title': 150000 },
        { 'id': 200000, 'title': 200000 },
    ]

    const {
        data,
        setData,
        reset,
    } = useForm({
        income_range: "",
    });

    useEffect(() => {
        setParentIncomeReportData(parentIncomeReport);
    }, [parentIncomeReport]);

    useEffect(() => {
        setGuardianData(guardians);
    }, [guardians]);

    useEffect(() => {
        setGuardianIds(parentIncomeReportData?.map(item => item?.id));
    }, [parentIncomeReportData]);

    const handleFilterGuardianData = (e) => {
        e.preventDefault();

        router.post(route('student_report.parent_income'), { range: data?.income_range, guardian_ids: guardianIds });
    }

    const handleIncomeRange = (range) => {
        setParentIncomeReportData([]);
        setGuardianData([]);

        router.post(route('student_report.parent_income'), { range })
    }

    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <div className='flex flex-wrap justify-between items-center mb-2.5'>
                        <div className="educare-card-title leading-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Father's income
                            </h5>
                        </div>
                        <div className="educare-select-field-styles">
                            <SelectInput
                                id="income_range"
                                data_label="Range"
                                data={parentIncome}
                                value={data.income_range}
                                onChange={(e) => {
                                    setData("income_range", e.target.value);
                                    handleIncomeRange(e.target.value);
                                }
                                }
                                type="text"
                                className="block"
                            />
                        </div>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Income Range</th>
                                    <th>Total ({parentIncomeReportData?.length})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.income_range != '' && parentIncomeReportData?.length > 0 ?
                                    <tr>
                                        <td>{data?.income_range != '' ? `1 - ${data?.income_range}` : ""}</td>
                                        <td>
                                            <button
                                                className="cursor-pointer text-primary"
                                                onClick={(e) => {
                                                    handleFilterGuardianData(e)
                                                }}
                                            >
                                                {parentIncomeReportData?.length}
                                            </button>
                                        </td>
                                    </tr>
                                :
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="7"
                                        >
                                            Data not found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-card-title leading-none mb-4">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Details
                                </h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Father's Name</th>
                                                <th>Admission No.</th>
                                                <th>Student's Name</th>
                                                <th>City</th>
                                                <th>Contact</th>
                                                <th>Income Per Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {guardianData?.length > 0 ?
                                                guardianData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{`${item?.first_name} ${item?.middle_name} ${item?.last_name}`}</td>
                                                        <td>{item?.student?.admission_no ?? ""}</td>
                                                        <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                        <td>{item?.city}</td>
                                                        <td>{item?.phone}</td>
                                                        <td>{item?.income_per_year}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="7"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }
                                            {/* <tr>
                                                <td>John Doe</td>
                                                <td>123456</td>
                                                <td>Jane Doe</td>
                                                <td>Cityville</td>
                                                <td>555-1234</td>
                                                <td>50,000</td>
                                            </tr>
                                            <tr>
                                                <td>Michael Smith</td>
                                                <td>789012</td>
                                                <td>Emily Smith</td>
                                                <td>Townsville</td>
                                                <td>555-5678</td>
                                                <td>60,000</td>
                                            </tr>
                                            <tr>
                                                <td>Christopher Johnson</td>
                                                <td>345678</td>
                                                <td>Amy Johnson</td>
                                                <td>Villagetown</td>
                                                <td>555-9876</td>
                                                <td>45,000</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentIncomeFilter;
