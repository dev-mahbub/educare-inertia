import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import { useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

const UpdateBiometricCodeTable = () => {

    const dummyTableData = [
        {
            id: 1,
            name: "A.k. Singh",
            designation: "Pricipal",
            phone: "01798888888"
        },
        {
            id: 2,
            name: "Admin2",
            designation: "Director",
            phone: "01798888888"
        },
        {
            id: 3,
            name: "Arti	",
            designation: "Teacher",
            phone: "01798888888"
        },
        {
            id: 4,
            name: "Charita",
            designation: "Teacher",
            phone: "01798888888"
        },
    ];



    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        type_Staff_name_to_search: "",
        biometric_codes: Array(dummyTableData.length).fill(""),
    });


    const handleBiometricCodeChange = (index, value) => {
        const updatedBiometricCodes = [...data.biometric_codes];
        updatedBiometricCodes[index] = value;
        setData("biometric_codes", updatedBiometricCodes);
    };

    const dummyData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    return (
        <>
            <form onSubmit={dummyData}>
                <div className="flex justify-between flex-wrap gap-2 items-end mb-2">
                    <div className="educare-card-title">
                        <h5>
                            Allocate Biometric codes to staffs
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="educare-input-field-styles">
                            <TextInput
                                value={
                                    data.type_Staff_name_to_search
                                }
                                onChange={(e) =>
                                    setData(
                                        "type_Staff_name_to_search",
                                        e.target.value
                                    )
                                }
                                className="block"
                                placeHolder="type staff name to search"
                            />
                            <InputError
                                message={
                                    errors.type_Staff_name_to_search
                                }
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-fill"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </div>
                <div className="educare-admission-list pb-none">
                    <table>
                        <thead>
                            <tr>
                                <th>Staff</th>
                                <th>Designation</th>
                                <th>Phone</th>
                                <th>Biometric codes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyTableData.map((item, index) => (
                                <tr key={item.id}>
                                    <td> {item.name} </td>
                                    <td> {item.designation} </td>
                                    <td> {item.phone} </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`biometric_code_${item.id}`}
                                                    value={data.biometric_codes[index]}
                                                    onChange={(e) =>
                                                        handleBiometricCodeChange(index, e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.biometric_code}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Save"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleOpenModal(item.id)
                                                        }
                                                        type="button"
                                                        className="educare-success-btn-sm-fill"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <div className="flex justify-end mt-2">
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                    type="submit"
                >
                    Save
                </PrimaryButton>
            </div>
        </>
    );
};

export default UpdateBiometricCodeTable;
