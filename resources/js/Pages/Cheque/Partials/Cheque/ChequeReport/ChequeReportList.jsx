import Checkbox from "@/Components/Checkbox";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const ChequeReportList = ({ chequeDateReports = [] }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [filteredChequeReports, setFilteredChequeReports] = useState([]);
    const [selectedChequeIds, setSelectedChequeIds] = useState([]);
    const [loading, setLoading] = useState(false);


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_cheque_id: "",
        from_date: fromDate,
        to_date: toDate,
        cheque_ids: selectedChequeIds,
    });

    useEffect(() => {
        setFilteredChequeReports(chequeDateReports);
        setLoading(false);
    }, [chequeDateReports])

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            cheque_ids: selectedChequeIds
        }));
    }, [selectedChequeIds])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            from_date: fromDate
        }));
    }, [fromDate]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            to_date: toDate
        }));
    }, [toDate]);
    // handle form data end


    //handle Checkbox start
    useEffect(() => {
        if (selectedChequeIds?.length <= 0) {
            setSelectAllChecked(false)
        }
        else {
            setSelectAllChecked(selectedChequeIds?.length === filteredChequeReports?.length)
        }

    }, [filteredChequeReports, selectedChequeIds]);

    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_cheque_id") {
            if (value === true) {
                setSelectedChequeIds(filteredChequeReports.map((item) => item.id))
            }
            else {
                setSelectedChequeIds([])
            }

            setSelectAllChecked(value);
        }
    };

    const setSelectedChequeId = (id) => {
        if ([...selectedChequeIds]?.includes(id)) {
            setSelectedChequeIds([...selectedChequeIds].filter((item) => item !== id));
        }
        else {
            setSelectedChequeIds([
                ...selectedChequeIds,
                id,
            ]);
        }

        const updateSelectedChequeIds = [...selectedChequeIds];

        setData('cheque_ids', updateSelectedChequeIds);
    };
    //handle Checkbox end


    // handle filter reports start
    const filterChequeReports = (e) => {
        e.preventDefault();

        const form_data = {
            from_date: data?.from_date,
            to_date: data?.to_date
        }

        router.post(route("cheque.cheque_report"), form_data)
    };
    // handle filter reports end


    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Cheque Date Report
                </h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter">
                        <form>
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {filteredChequeReports?.length}</span>
                            </div>

                            <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn ">
                                <div className="educare-select-field-styles">
                                    <DatePicker
                                        selected={fromDate}
                                        onChange={(date, e) => {
                                                setFromDate(date)
                                            }
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Cheque from date"
                                        className="w-full"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <DatePicker
                                        selected={toDate}
                                        onChange={(date, e) => {
                                                setToDate(date)
                                            }
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Cheque to date"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => {
                                                filterChequeReports(e)
                                            }}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Compose"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Compose
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('cheque.cheque_report')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div><div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="select_all_cheque_id"
                                                name="select_all_cheque_id"
                                                checked={
                                                    selectAllChecked
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                }
                                            />
                                        </div>
                                    </th>
                                    <th>Cheque Date</th>
                                    <th>Cheque No.</th>
                                    <th>Receipt No</th>
                                    <th>Amount</th>
                                    <th>Student Name</th>
                                    <th>Adm No.</th>
                                    <th>Father's Name</th>
                                    <th>SMS No</th>
                                    <th>Class</th>
                                    <th>Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChequeReports?.length > 0 ? (
                                    filteredChequeReports?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="cheque_id"
                                                        name="cheque_id"
                                                        checked={
                                                            selectedChequeIds.includes(item?.id)
                                                        }
                                                        onChange={(e) => {
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                                setSelectedChequeId(item?.id)
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>{item?.cheque_date}</td>
                                            <td>{item?.cheque_no}</td>
                                            <td>{item?.receipt_no}</td>
                                            <td>{parseFloat(item?.cheque_amount ?? 0)}</td>
                                            <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                            <td>{item?.student?.admission_no}</td>
                                            <td>
                                                {`${item?.student?.father?.first_name} ${item?.student?.father?.middle_name} ${item?.student?.father?.last_name}`}
                                            </td>
                                            <td>{item?.student?.father?.sms_phone}</td>
                                            <td>{item?.student?.classroom?.title}</td>
                                            <td>{item?.payment_date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="11"
                                        >
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>







        </>
    );
};

export default ChequeReportList;
