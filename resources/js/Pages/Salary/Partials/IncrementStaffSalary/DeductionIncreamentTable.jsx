import React from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function DeductionIncreamentTable({ data, setData, errors }) {


    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2} className="text-center">Deductions</th>
                                </tr>
                                <tr>
                                    <th>Deduction Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PF</td>
                                    <td>
                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.pf_amount
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pf_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="1400"
                                                    disabled={true}
                                                    className={`block ${data.select_Current_basic ? 'enabled' : 'disabled'}`}
                                                />
                                                <InputError
                                                    message={
                                                        errors.pf_amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>ESIC</td>
                                    <td>
                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data.esic_amount
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "esic_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="200"
                                                    disabled={true}
                                                    className={`block ${data.select_Current_basic ? 'enabled' : 'disabled'}`}
                                                />
                                                <InputError
                                                    message={
                                                        errors.esic_amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Deduction</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">1600</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
