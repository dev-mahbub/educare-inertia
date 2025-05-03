import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const VehicleReportFilter = ({
    vehicleData = [],
    routeData = [],
    setLoading = false,
    studentCount = 0,
}) => {
    const [routeDataTwo, setRouteDataTwo] = useState([]);
    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        vehicle_id: "",
        transport_stoppage_id: "",
    });

    const handelRoute = (id) => {
        setRouteDataTwo(routeData?.filter(item => item?.vehicle_id == id));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('transport_report.vehiclewise_report'), data);
        setLoading(false)
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('transport_report.vehiclewise_report'));
        setLoading(false)
    }

    //scrollable filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Vehicle Wise Report ( Student )
                </h5>
            </div>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {studentCount}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="vehicle_id"
                                                data_label="Vehicle"
                                                data={vehicleData}
                                                value={data.vehicle_id}
                                                onChange={(e) => {
                                                    setData("vehicle_id", e.target.value)
                                                    handelRoute(e.target.value)
                                                }
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.vehicle_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="transport_stoppage_id"
                                                data_label="Route"
                                                data={routeDataTwo}
                                                value={data.transport_stoppage_id}
                                                onChange={(e) =>
                                                    setData("transport_stoppage_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.transport_stoppage_id}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                    >
                                        <button type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handleSearch(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Excel Sheet"
                                        placement="top"
                                        arrow
                                    >
                                        <button type="button"
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="PDF"
                                        placement="top"
                                        arrow
                                    >
                                        <button type="button"
                                            className="educare-warning-btn-md-fill"
                                        >
                                            <i className="icon-FilePdf"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                    >
                                        <button type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={(e) => handleReset(e)}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VehicleReportFilter;
