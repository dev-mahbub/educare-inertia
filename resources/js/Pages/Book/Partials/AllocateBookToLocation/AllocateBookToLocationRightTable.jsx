import Checkbox from "@/Components/Checkbox";
import { useForm } from "@inertiajs/react";
import React from "react";

const AllocateBookToLocationRightTable = ({ accnoView }) => {


    const sampleData = [
        { accNo: "N2023-2024:11", barCode: "bar code", position: "Rack-1.1", checkValue: "checkOne" },
        { accNo: "N2023-2024:12", barCode: "bar code", position: "Rack-1.1", checkValue: "checkTwo" },
        { accNo: "N2023-2024:13", barCode: "bar code", position: "Almira, Rack-2", checkValue: "checkThree" },
    ];

    // Initialize checkbox states for each checkValue to false
    const initialCheckboxStates = sampleData.reduce(
        (acc, item) => ({ ...acc, [`checkbox_${item.checkValue}`]: false }),
        {}
    );
    // console.log(initialCheckboxStates);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        checkValue: "",
        // Initialize checkbox states for each checkValue to false

        ...initialCheckboxStates,
    });
    // console.log(data)

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>AccNo</th>
                            <th>Barcode</th>
                            <th>Position</th>
                            <th>Allocate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accnoView ? (
                            <>
                                {sampleData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.accNo}</td>
                                        <td>{item?.barCode}</td>
                                        <td>
                                            <span className='badge success'>{item?.position}</span>
                                        </td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name={`checkbox_${item.checkValue}`}
                                                        checked={data[`checkbox_${item.checkValue}`]}
                                                        onChange={(e) =>
                                                            setData(`checkbox_${item.checkValue}`, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={4}>data not found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllocateBookToLocationRightTable;
