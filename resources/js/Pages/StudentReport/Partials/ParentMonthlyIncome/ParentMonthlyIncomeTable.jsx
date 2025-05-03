import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import React from "react";


const ParentMonthlyIncomeTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_range: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };
    return (
        <div className="educare-parent-montly-income-area">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <form onSubmit={CommonHeaderFilterData} className="mb-2.5">
                        <div className="flex flex-wrap gap-2.5 justify-between">
                            {/* delete count if don't need */}
                            <div className="educare-card-title pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Father's income
                                </h5>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    id="select_range"
                                    data_label="Range"
                                    data={[]}
                                    value={data.select_range}
                                    onChange={(e) =>
                                        setData("select_range", e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.select_range}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </form>

                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Income Range</th>
                                    <th>Total (50)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> 15000 - 35000 </td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td> 15000 - 35000 </td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <div className="educare-card-title pb-5">
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
                                        <th>Income Per Month</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ibrahim Khalil</td>
                                        <td> 012541542 </td>
                                        <td>Mariya Luica</td>
                                        <td>Dhaka</td>
                                        <td>021542451541</td>
                                        <td>20000</td>
                                    </tr>
                                    <tr>
                                        <td>Vijay Vangda</td>
                                        <td> 012541542 </td>
                                        <td>Mariya Luica</td>
                                        <td>Dhaka</td>
                                        <td>021542451541</td>
                                        <td>20000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentMonthlyIncomeTable;
