import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const CopyInputValue = () => {
    const [plData, setPLDataArray] = useState([]);
    const [plSingle, setPlSingleData] = useState("");
    //
    const [clData, setclDataArray] = useState([]);
    const [clSingle, setClSingleData] = useState("");

    // ml
    const [mlData, setmlDataArray] = useState([]);
    const [mlSingle, setmlSingleData] = useState("");

    // sl

    const [slData, setslDataArray] = useState([]);
    const [slSingle, setslSingleData] = useState("");

    // lwp

    const [lwpData, setlwpDataArray] = useState([]);
    const [lwpSingle, setlwpSingleData] = useState("");

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        pl: "",
        cl: "",
        ml: "",
        sl: "",
        lwp: "",
    });

    const handleData = (e) => {
        e.preventDefault();
        setPlSingleData(data.pl);
        setPLDataArray([]);
    };
    const handleDataCl = (e) => {
        e.preventDefault();
        setClSingleData(data.cl);
        setclDataArray([]);
    };

    const handleDataML = (e) => {
        e.preventDefault();
        setmlSingleData(data.ml);
        setmlDataArray([]);
    };
    const handleDatasl = (e) => {
        e.preventDefault();
        setslSingleData(data.ml);
        setslDataArray([]);
    };
    const handleDatalwp = (e) => {
        e.preventDefault();
        setlwpSingleData(data.lwp);
        setlwpDataArray([]);
    };

    const handleSingleData = (index) => (e) => {
        const updatedList = [...plData];
        updatedList[index] = e.target.value;
        setPLDataArray(updatedList);
    };

    const handleSingleDatacl = (index) => (e) => {
        const updatedList = [...clData];
        updatedList[index] = e.target.value;
        setclDataArray(updatedList);
    };
    const handleSingleDataml = (index) => (e) => {
        const updatedList = [...mlData];
        updatedList[index] = e.target.value;
        setmlDataArray(updatedList);
    };
    const handleSingleDatasl = (index) => (e) => {
        const updatedList = [...slData];
        updatedList[index] = e.target.value;
        setslDataArray(updatedList);
    };
    const handleSingleDatalwp = (index) => (e) => {
        const updatedList = [...lwpData];
        updatedList[index] = e.target.value;
        setlwpDataArray(updatedList);
    };

    const dummyTableData = [
        {
            id: 1,
            staff: "sandeep",
            designation: "Teacher",
        },
        {
            id: 2,
            staff: "Ramashish Kumar",
            designation: "Teacher",
        },
    ];
    

    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    One Click Copy Input Value
                </h5>
            </div>
            <div className="educare-admission-list-inner-wrapper mb-4">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Emp Id</th>
                                <th>Staff</th>
                                <th>Designation</th>
                                <th>
                                    PL
                                    <div className="flex items-center copy-input-value-style">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="pl"
                                                value={data.pl}
                                                onChange={(e) =>
                                                    setData(
                                                        "pl",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.pl}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleData}
                                            >
                                                C
                                            </button>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    CL
                                    <div className="flex items-center copy-input-value-style">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="cl"
                                                value={data.cl}
                                                onChange={(e) =>
                                                    setData(
                                                        "cl",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.cl}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleDataCl}
                                            >
                                                C
                                            </button>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    ML
                                    <div className="flex items-center copy-input-value-style">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="ml"
                                                value={data.ml}
                                                onChange={(e) =>
                                                    setData(
                                                        "ml",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.ml}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleDataML}
                                            >
                                                C
                                            </button>
                                        </div>
                                    </div>
                                </th>

                                <th>
                                    SL
                                    <div className="flex items-center copy-input-value-style">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="sl"
                                                value={data.sl}
                                                onChange={(e) =>
                                                    setData(
                                                        "sl",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.sl}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleDatasl}
                                            >
                                                C
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    LWP
                                    <div className="flex items-center copy-input-value-style">
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="lwp"
                                                value={data.lwp}
                                                onChange={(e) =>
                                                    setData(
                                                        "lwp",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.lwp}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleDatalwp}
                                            >
                                                C
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyTableData.map((item, index) => (
                                <tr key={item.id}>
                                    <td> {item.id} </td>
                                    <td>{item.staff}</td>
                                    <td>{item.designation}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`pl_${index}`}
                                                    value={
                                                        plData[index] !==
                                                        undefined
                                                            ? plData[index]
                                                            : plSingle
                                                    }
                                                    onChange={handleSingleData(
                                                        index
                                                    )}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.pl}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`cl_${index}`}
                                                    value={
                                                        clData[index] !==
                                                        undefined
                                                            ? clData[index]
                                                            : clSingle
                                                    }
                                                    onChange={handleSingleDatacl(
                                                        index
                                                    )}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.pl}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`ml_${index}`}
                                                    value={
                                                        mlData[index] !==
                                                        undefined
                                                            ? mlData[index]
                                                            : mlSingle
                                                    }
                                                    onChange={handleSingleDataml(
                                                        index
                                                    )}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.pl}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`sl_${index}`}
                                                    value={
                                                        slData[index] !==
                                                        undefined
                                                            ? slData[index]
                                                            : slSingle
                                                    }
                                                    onChange={handleSingleDatasl(
                                                        index
                                                    )}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.sl}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id={`lwp_${index}`}
                                                    value={
                                                        lwpData[index] !==
                                                        undefined
                                                            ? lwpData[index]
                                                            : lwpSingle
                                                    }
                                                    onChange={handleSingleDatalwp(
                                                        index
                                                    )}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.lwp}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="educare-success-btn-sm-fill">
                                            <i className="icon-check-1"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CopyInputValue;
