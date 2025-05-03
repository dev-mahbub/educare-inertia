import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const ActivityDateWiseFilter = ({ enqueryReportList }) => {
    const [startDate, setStartDate] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        start_date: startDate,
    });

    useEffect(() =>  {
        setData('start_data', startDate)
    },[startDate])

    const dateWiseData = (e) => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('admission.activity_date_report'), {start_date: startDate});
    }

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     if (data) {
    //         router.post(route('allocation_report.list'), data);
    //         setLoading(false);
    //     }
    // }

    return (
        <form onSubmit={dateWiseData}>
            <div className="activity-date-wise-filter-area flex gap-2.5 flex-wrap items-center justify-between mb-5">
                <div className="activity-date-wise-filter-title inline-flex items-center gap-1">
                    <i className="icon-ListBullets text-[20px] inline-block"></i>
                    <h5 className="text-[18px] text-headingLight font-semibold">
                        Activity Date Wise Report
                    </h5>
                </div>
                <div className="activity-date-wise-filter-action flex gap-2.5">
                    <div className="educare-admission-filtar-bar-count">
                        <span>Total: {enqueryReportList.length}</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                            showPopperArrow={false}
                            peekNextMonth
                            dropdownMode="select"
                            isClearable
                            placeholderText="Select Date"
                            className="w-full"
                        />
                    </div>
                    <div className="educare-filter-action-btn">
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) =>{
                                        handleSearch(e)
                                    }}
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ActivityDateWiseFilter;
