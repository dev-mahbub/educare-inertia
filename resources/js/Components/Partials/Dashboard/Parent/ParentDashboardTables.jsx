import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

const ParentDashboardTables = ({
    students,
    studentId
}) => {
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
        student_id: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId
        }));
    }, [studentId]);

    const headerTopData = (e) => {
        e.preventDefault();
    };

    // handle student change start
    const handleStudentChange = (e) => {
        const student_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            student_id: student_id
        }));

        router.post(route('parent_profile.update_session_student_id'), {student_id: student_id});
    }
    // handle student change end

    let studentsDropdown = students.map((student) => ({
        id: student?.id,
        title: `${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
    }));
    return (
        <>
            {/* filter */}
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-5">
                    {/* <button className="transition ease-in-out duration-150 educare-primary-btn-md-fill">
                        Back To Profile
                    </button> */}
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-select-field-styles">
                            <SelectInput
                                id="student_id"
                                data_label="Student"
                                data={studentsDropdown}
                                value={data.student_id}
                                onChange={(e) =>
                                    handleStudentChange(e)
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.student_id}
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="educare-filter-action-btn flex flex-wrap gap-2">
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
                        </div> */}
                    </div>
                </div>
            </form>
            {/* end filter */}

            <div className="grid grid-cols-8 gap-5">
                {students?.length > 0 &&
                    students?.map((item, index) => (
                    <div key={item?.id} className="col-span-12 md:col-span-6 xl:col-span-6 lg:col-span-6">
                        <div className="educare-card-title items-center gap-2.5 flex pb-none mb-2.5">
                            <h5>
                                <i className="icon-user"></i>
                                    {`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}
                            </h5>
                                {item?.status == 'Inactive' && <span className="badge danger">{item?.status}</span>}
                        </div>
                        <div className="educare-default-table table-width-full">
                            <table>
                                <tbody>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Class :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.classroom?.title ?? ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Roll Number :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.classroom_roll?.roll_no ?? ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Admission Number :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.admission_no}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        House :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.student_house?.house?.name ?? ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Category :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.student_category?.category?.title ?? ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Religion :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.religion_name?.name ?? ""}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Date of Birth :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.birth_date_at}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Date of Admission :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.admission_date_at}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex flex-wrap gap-2.5 leading-none items-center">
                                                    <h5 className="text-[14px] text-headingLight font-semibold">
                                                        Blood Group :
                                                    </h5>
                                                    <span className="text-[14px] text-headingLight font-normal">
                                                        {item?.blood_group}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
                }
            </div>

            {/* talble */}
            <div className="educare-default-table xs:overflow-x-auto mt-5 hidden">
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

export default ParentDashboardTables;
