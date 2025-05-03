import React from "react";
import studentImg from "../../../../../images/user/user-1.png";
import { Tooltip } from "@mui/material";
import { Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
const GatePassTable = ({studentGatePass}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route("visitor_enquiry.gate_pass"), data,{
            preserveScroll: true
        });
    }

    console.log(studentGatePass);
    return (
        <>
            {/* header filter */}
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Gate Pass Management
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                {studentGatePass?.length} : Gate Pass Generated
                            </span>
                        </div>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                                placeHolder="Search here"
                                className="block"
                            />
                            <InputError
                                message={errors.search}
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
                                        onClick={(e) => handleSearch(e)}
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
            {/* end header filter */}
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Visitor</th>
                                <th>GP No.</th>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Visiting Person</th>
                                <th>Phone</th>
                                <th>Relation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { studentGatePass && studentGatePass.map((student, index) => (
                                <tr key={student?.id}>
                                    <td>
                                        {student?.visitor_image ? (
                                            <div className="educare-student-list-table-user-img">
                                                <img 
                                                    src={student?.visitor_image?.path}
                                                    width={60}
                                                    height={60}
                                                    alt="user not found"
                                                />
                                            </div>
                                        ) : (
                                            <div className="educare-student-list-table-user-img">
                                                <img
                                                    src={studentImg}
                                                    alt="user not found"
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>
                                        {`${student?.student?.first_name} ${student?.student?.middle_name} ${student?.student?.last_name}`}
                                    </td>
                                    <td>{student?.classroom?.title}</td>
                                    <td>{student?.visiting_person}</td>
                                    <td>{student?.phone}</td>
                                    <td>{student?.relation_type}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="print"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <a 
                                                        href={route('pdf_visitor.print_visitor_gate_pass', student?.id)}
                                                        target='_blank'
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-printer"></i>
                                                    </a>
                                                </Tooltip>
                                            </div>
                                        </div>
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

export default GatePassTable;
