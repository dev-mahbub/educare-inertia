import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const GenerateTcList = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_fee_id: "",
        fee_one_id: false,
        fee_two_id: false,
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_fee_id") {
            newFormData = {
                ...data,
                [name]: value,
                fee_one_id: value,
                fee_two_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_fee_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.fee_one_id === true &&
                newFormData.fee_two_id === true
            ) {
                newFormData.select_all_fee_id = true;
            }
        }

        setData(newFormData);
    };
    //handle Checkbox end


    return (
        <>
            <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                <h5>
                    Fee <span className="text-info">(fee cleared)</span>
                </h5>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                >
                    Nullify fee structure
                </PrimaryButton>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="select_all_fee_id"
                                            name="select_all_fee_id"
                                            checked={
                                                data.select_all_fee_id
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>Sr.</th>
                            <th>Title</th>
                            <th>Payable</th>
                            <th>Paid</th>
                            <th>Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="fee_one_id"
                                            name="fee_one_id"
                                            checked={
                                                data.fee_one_id
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>1</td>
                            <td>fees</td>
                            <td>800</td>
                            <td>800</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="fee_two_id"
                                            name="fee_two_id"
                                            checked={
                                                data.fee_two_id
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>2</td>
                            <td>April fee</td>
                            <td>800</td>
                            <td>800</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                            <td>3</td>
                            <td>Previous Due</td>
                            <td>800</td>
                            <td>800</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GenerateTcList;
