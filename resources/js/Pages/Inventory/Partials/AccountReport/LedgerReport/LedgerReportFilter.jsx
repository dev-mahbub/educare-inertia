import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LedgerReportFilter = ({
    ledgers,
    ledgerReport,
    setFilterText
}) => {
    const [params, setParams] = useState({});

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
        start_date: new Date(),
        end_date: new Date(),
        ledger_id: "",
    });

    useEffect(() => {
        setParams({
            ledger_id: data?.ledger_id ?? "",
            start_date: data?.start_date ?? new Date(),
            end_date: data?.end_date ?? new Date()
        });
    }, [data?.start_date, data?.end_date, data?.ledger_id]);

    useEffect(() => {
        setFilterText(data?.search);
    }, [data?.search]);

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // handle filter ledger report data start
    const handleFilterLedgerReportData = (e) => {
        e.preventDefault();

        if(data.ledger_id == "") {
            toast.error("Select a ledger!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                ledger_id: data?.ledger_id,
                start_date: data?.start_date,
                end_date: data?.end_date,
            }

            router.post(route('ledger_report.list'), form_data);
        }
    }
    // handle filter ledger report data end


    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Ledger Report
                                </h5>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span
                                        className="educare-header-filter-prev"
                                        onClick={handlePrevClick}
                                    >
                                        <i className="icon-left-chevron"></i>
                                    </span>
                                    <div
                                        className="educare-header-filtar-bar-fields-wrap"
                                        ref={listRef}
                                        style={{
                                            transform: `translateX(-${
                                                currentIndex * 120
                                            }px)`,
                                        }}
                                    >
                                        {/* Replace changable inputs */}

                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="ledger_id"
                                                data_label="Ledger"
                                                data={ledgers}
                                                value={data.ledger_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "ledger_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.ledger_id}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date
                                                        ? new Date(
                                                              data?.start_date
                                                          )
                                                        : null
                                                }
                                                onChange={(date) =>
                                                    setData("start_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.end_date
                                                        ? new Date(
                                                              data?.end_date
                                                          )
                                                        : null
                                                }
                                                onChange={(date) =>
                                                    setData("end_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-full"
                                            />
                                        </div>
                                        {ledgerReport?.length > 0 &&
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={data.search}
                                                    onChange={(e) =>
                                                        setData(
                                                            "search",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeHolder="Search"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.search}
                                                    className="mt-2"
                                                />
                                            </div>
                                        }
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span
                                        className="educare-header-filter-next"
                                        onClick={handleNextClick}
                                    >
                                        <i className="icon-chevron"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                {/* Replace changable buttons */}
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
                                            onClick={handleFilterLedgerReportData}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>

                                {ledgerReport?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.inventory.ledger_report', params)}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href="#"
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LedgerReportFilter;
