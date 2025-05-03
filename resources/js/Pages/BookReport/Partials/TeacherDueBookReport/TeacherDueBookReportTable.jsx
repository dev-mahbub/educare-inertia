import DatePicker from "react-datepicker";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const TeacherDueBookReportTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_teacher: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Over Due Book Report
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : 10
                            </span>
                        </div>

                        <div className="educare-input-field-styles">
                            <DatePicker
                                selected={
                                    data.start_date && new Date(data.start_date)
                                }
                                onChange={(date) => setData("start_date", date)}
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                className="w-full"
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

            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Accno</th>
                                <th>Teacher Name</th>
                                <th>Book Title</th>
                                <th>Issued Date</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>Mr. Smith</td>
                                <td>The Art of Teaching</td>
                                <td>2023-12-15</td>
                                <td>2024-01-15</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Ms. Johnson</td>
                                <td>Science Explained</td>
                                <td>2024-01-05</td>
                                <td>2024-01-20</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>Dr. Brown</td>
                                <td>History Unveiled</td>
                                <td>2024-01-10</td>
                                <td>2024-02-10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TeacherDueBookReportTable;
