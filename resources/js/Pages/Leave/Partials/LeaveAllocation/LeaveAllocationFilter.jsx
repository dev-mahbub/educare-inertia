import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
const LeaveAllocationFilter = ({
    teachingTypes,
    genders,
    staffLeaveAllocations
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_type: "",
        gender: "",
        search: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    // handle filter staff leave allocation start
    const handleFilterStaffLeaveAllocation = (e) => {
        e.preventDefault();

        const form_data = {
            staff_type: data.staff_type ?? "",
            gender: data.gender ?? "",
            search: data.search ?? ""
        }

        router.post(route('leave.allocation'), form_data);
    }
    // handle filter staff leave allocation end

    return (
        <>
            <div className="flex justify-between mb-2.5">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Allocate Leave to staffs
                    </h5>
                </div>

                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                    {/* Replace changable buttons */}
                    {staffLeaveAllocations?.length > 0 &&
                        <div>
                            <Tooltip
                                title="Doownload Excel"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    target="_blank"
                                    href={route('export_excel.staff_leave_allocation', data)}
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </a>
                            </Tooltip>
                        </div>
                    }
                    {/* Replace changable buttons */}
                </div>
            </div>

            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {staffLeaveAllocations?.length}</span>
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
                                                    id="staff_type"
                                                    data_label="All"
                                                    data={teachingTypes}
                                                    value={
                                                        data.staff_type
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "staff_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.staff_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="gender"
                                                    data_label="Gender"
                                                    data={genders}
                                                    value={data.gender}
                                                    onChange={(e) =>
                                                        setData(
                                                            "gender",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.gender
                                                    }
                                                    className="mt-2"
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
                                                onClick={handleFilterStaffLeaveAllocation}
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
        </>
    );
};

export default LeaveAllocationFilter;
