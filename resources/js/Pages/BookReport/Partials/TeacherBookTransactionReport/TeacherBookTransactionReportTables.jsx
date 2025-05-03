import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const TeacherBookTransactionReportTables = ({
    teacherIssuesBook = [],
    teacherReturnBook = [],
}) => {
    const [loading, setLoading] = useState(false);
    const {
        data,
        setData,
    } = useForm({
        start_date_at: "",
        end_date_at: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('book_report.teacher_transaction_book'), data);
        setLoading(false);
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('book_report.teacher_transaction_book'));
        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
    }, [teacherIssuesBook, teacherReturnBook]);


    return (
        <>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-end items-center mb-4">
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <DatePicker
                                selected={
                                    data.start_date_at && new Date(data.start_date_at)
                                }
                                onChange={(date) => setData("start_date_at", date)}
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="From"
                                className="w-full"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <DatePicker
                                selected={
                                    data.end_date_at && new Date(data.end_date_at)
                                }
                                onChange={(date) => setData("end_date_at", date)}
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="To"
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
                                    <button
                                        type="button"
                                        onClick={(e) => handleSearch(e)}
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        type="button"
                                        onClick={(e) => handleReset(e)}
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* all table */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="flex justify-between flex-wrap mb-2.5">
                        <div className="educare-card-title mr-auto pb-none">
                            <h5>
                                <i className="icon-BookBookmark"></i>
                                Book Issued To Staff
                            </h5>
                        </div>
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {teacherIssuesBook?.length}
                            </span>
                        </div>
                    </div>
                    {/* table */}

                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Person Name</th>
                                    <th>Acc No.</th>
                                    <th>Book Title</th>
                                    <th>Issued Date</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {teacherIssuesBook?.length > 0 ? (
                                        teacherIssuesBook?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                                <td>{item?.book_acc_no?.acc_no}</td>
                                                <td>{item?.book_item?.book_title}</td>
                                                <td>{moment(item?.issued_date_at).format("DD MMM, YYYY")}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                {/* right table */}
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="flex justify-between flex-wrap mb-2.5">
                        <div className="educare-card-title mr-auto pb-none">
                            <h5>
                                <i className="icon-BookBookmark"></i>
                                Returned Book
                            </h5>
                        </div>
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {teacherReturnBook?.length}
                            </span>
                        </div>
                    </div>
                    {/* table */}

                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Person Name</th>
                                    <th>Acc No.</th>
                                    <th>Book Title</th>
                                    <th>Returned Date</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {teacherReturnBook?.length > 0 ? (
                                        teacherReturnBook?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
                                                <td>{item?.book_acc_no?.acc_no}</td>
                                                <td>{item?.book_item?.book_title}</td>
                                                <td>{moment(item?.issued_date_at).format("DD MMM, YYYY")}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherBookTransactionReportTables;
