import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const StudentDashboardTables = () => {
    const dummyStudentInfo = [
        {
            id: 1,
            property: "Class",
            value: "NURSERY A",
        },
        {
            id: 2,
            property: "Roll Number",
            value: "001421",
        },
        {
            id: 3,
            property: "Admission Number",
            value: "DM0002",
        },
        {
            id: 4,
            property: "House",
            value: "",
        },
        {
            id: 5,
            property: "Category",
            value: "OBC",
        },
        {
            id: 6,
            property: "Religion",
            value: "MUSLIM",
        },
        {
            id: 7,
            property: "Date of Birth",
            value: "05-Mar-2022",
        },
        {
            id: 8,
            property: "Date of Admission",
            value: "NURSERY A",
        },
        {
            id: 9,
            property: "Blood Group",
            value: "O(-)",
        },
    ];

    const dummuTable = [
        {
            id: 1,
            name: "Puja Sah",
        },
        {
            id: 2,
            name: "Palak Verma  ",
            inActive: "InActive",
        },
        {
            id: 3,
            name: "Ganesh Sah ",
        },
        {
            id: 4,
            name: "Suresh Verma ",
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
        select_student: "",
    });

    const headerTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {/* filter */}

            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-5">
                    <button className="transition ease-in-out duration-150 educare-primary-btn-md-fill">
                        Back To Profile
                    </button>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-select-field-styles">
                            <SelectInput
                                id="select_student"
                                data_label="Student"
                                data={[]}
                                value={data.select_student}
                                onChange={(e) =>
                                    setData("select_student", e.target.value)
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.select_student}
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* end filter */}
            <div className="grid grid-cols-12 gap-5">
                {dummuTable.map((item) => (
                    <div
                        key={item.id}
                        className="col-span-12 md:col-span-6 xl:col-span-6 lg:col-span-6"
                    >
                        <div className="educare-card-title items-center gap-2.5 flex pb-none mb-2.5">
                            <h5>
                                <i className="icon-user"></i>
                                {item.name}
                            </h5>
                            {item.inActive && <span className="badge danger">{item.inActive}</span>}
                        </div>
                        <div className="educare-default-table table-width-full">
                            <table>
                                <tbody>
                                    {dummyStudentInfo.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        {item.property} :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item.value
                                                            ? item.value
                                                            : ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* talble */}

            <div className="educare-default-table xs:overflow-x-auto mt-5">
                <table>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Sent By</th>
                            <th>Sent On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link
                                    href="#"
                                    className="font-semibold text-primary"
                                >
                                    {" "}
                                    School open{" "}
                                </Link>
                            </td>
                            <td>Suneel Kumar</td>
                            <td>16 Jan, 2024</td>
                        </tr>
                        <tr>
                            <td>
                                <Link
                                    href="#"
                                    className="font-semibold text-primary"
                                >
                                    {" "}
                                    Today is holiday{" "}
                                </Link>
                            </td>
                            <td>Hemant</td>
                            <td>8 Jan, 2024</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StudentDashboardTables;
