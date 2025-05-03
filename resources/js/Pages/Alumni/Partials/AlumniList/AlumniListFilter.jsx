import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const AlumniListFilter = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_keyword: "",
        select_alumni: "",
        select_country: "",
        select_city: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
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
        <div>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Alumni List
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total Count: 3</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            {/* Replace changable inputs */}
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_keyword"
                                                    value={data.search_keyword}
                                                    onChange={(e) => setData("search_keyword", e.target.value)}
                                                    placeHolder="Enter Keyword"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.search_keyword} className="mt-2" />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="select_alumni"
                                                    data_label="Alumni Type"
                                                    data={[]}
                                                    value={data.select_alumni}
                                                    onChange={(e) =>
                                                        setData("select_alumni", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.select_alumni}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="select_country"
                                                    data_label="Country"
                                                    data={[]}
                                                    value={data.select_country}
                                                    onChange={(e) =>
                                                        setData("select_country", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.select_country}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="select_city"
                                                    data_label="City"
                                                    data={[]}
                                                    value={data.select_city}
                                                    onChange={(e) =>
                                                        setData("select_city", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.select_city}
                                                    className="mt-2"
                                                />
                                            </div>
                                            {/* Replace changable inputs */}
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
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
                                            <Link
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
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
        </div>
    );
};

export default AlumniListFilter;
