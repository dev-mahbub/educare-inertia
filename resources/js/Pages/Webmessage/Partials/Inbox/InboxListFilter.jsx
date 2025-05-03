import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import useScrollableFilterBar from "@/Utils/FilterArrow";


export default function InboxListFilter({ webmessages }) {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());


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
    });

    const InboxListFilterData = (e) => {
        e.preventDefault();

        post(route("webmessage.inbox"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-admission-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={InboxListFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {webmessages?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={data.start_date}
                                                onChange={(date) => setData("start_date", date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Start date"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={data.end_date}
                                                onChange={(date) => setData("end_date", date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                            />
                                        </div>
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
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div>
                                    <PrimaryButton
                                        type="submit"
                                        className="bg-supportingB educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </PrimaryButton>
                                
                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-supportingC educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </PrimaryButton>
                               
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
