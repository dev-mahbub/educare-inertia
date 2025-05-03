import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

export default function RegistrationListFilter({
    className = "",
    statusArray,
    registrations,
    regModeArray,
    academicYears,
    classNames,
    ewsStatusArray,
    admissionExamStatusArray,
    physicalConditionArray,
    academicYearId
}) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        exam_status: "",
        ews_status: "",
        search: "",
        physical_condition: "",
        academic_year_id: academicYearId ?? "",
        class_name_id: "",
        registration_status: "",
        registration_mode: "",
        from_date: "",
        to_date: "",
    });

    // handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
            class_name_id: ""
        }));

        const form_data = {
            exam_status: data?.exam_status ?? "",
            ews_status: data?.ews_status ?? "",
            search: data?.search ?? "",
            physical_condition: data?.physical_condition ?? "",
            academic_year_id: data?.academic_year_id ?? "",
            class_name_id: "",
            registration_status: data?.registration_status ?? "",
            registration_mode: data?.registration_mode ?? "",
            from_date: data?.from_date ?? "",
            to_date: data?.to_date ?? "",
        }

        router.post(route('admission.registration_list'), form_data);
    }
    // handle academic year change end

    // handle filter registration data start
    const handleFilterRegistrationData = (e) => {
        e.preventDefault();

        const form_data = {
            exam_status: data?.exam_status,
            ews_status: data?.ews_status,
            search: data?.search,
            physical_condition: data?.physical_condition,
            academic_year_id: data?.academic_year_id,
            class_name_id: data?.class_name_id,
            registration_status: data?.registration_status,
            registration_mode: data?.registration_mode,
            from_date: data?.from_date,
            to_date: data?.to_date,
        }

        router.post(route('admission.registration_list'), form_data);
    }
    // handle filter registration data end

    const registrationFilterData = (e) => {
        e.preventDefault();
    };

    // handle download excel start
    const handleDownloadExcel = (e) => {
        e.preventDefault();

        const params = {
            exam_status: data?.exam_status ?? "",
            ews_status: data?.ews_status ?? "",
            search: data?.search ?? "",
            physical_condition: data?.physical_condition ?? "",
            academic_year_id: data?.academic_year_id ?? "",
            class_name_id: data?.class_name_id ?? "",
            registration_status: data?.registration_status ?? "",
            registration_mode: data?.registration_mode ?? "",
            from_date: data?.from_date ?? "",
            to_date: data?.to_date ?? "",
        }

        const url = route('export_excel.registration_report', params);

        window.open(url);
    }
    // handle download excel end

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={registrationFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {registrations?.length}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area extra-large-filter relative">
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
                                            <div className="educare-input-field-styles lg:hidden"></div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="exam_status"
                                                    data_label="Exam Status"
                                                    data={admissionExamStatusArray}
                                                    value={data.exam_status}
                                                    onChange={(e) =>
                                                        setData(
                                                            "exam_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.exam_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="ews_status"
                                                    data_label="EWS"
                                                    data={ewsStatusArray}
                                                    value={data.ews_status}
                                                    onChange={(e) =>
                                                        setData(
                                                            "ews_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.ews_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="physical_condition"
                                                    data_label="Special Child"
                                                    data={physicalConditionArray}
                                                    value={data.class}
                                                    onChange={(e) =>
                                                        setData(
                                                            "physical_condition",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.physical_condition
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="academic_year_id"
                                                    data_label="Year"
                                                    data={academicYears}
                                                    value={data.academic_year_id}
                                                    onChange={(e) =>
                                                        handleAcademicYearChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.academic_year_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="class_name_id"
                                                    data_label="Class"
                                                    data={classNames}
                                                    value={data.class_name_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "class_name_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.class_name_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="registration_status"
                                                    data_label="Reg Status"
                                                    data={statusArray}
                                                    value={data.registration_status}
                                                    onChange={(e) =>
                                                        setData(
                                                            "registration_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.registration_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="registration_mode"
                                                    data_label="Reg Mode"
                                                    data={regModeArray}
                                                    value={data.registration_mode}
                                                    onChange={(e) =>
                                                        setData(
                                                            "registration_mode",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.registration_mode}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search"
                                                    value={
                                                        data.search
                                                    }
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
                                                    message={
                                                        errors.search
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={
                                                        data?.from_date &&
                                                        new Date(
                                                            data?.from_date
                                                        )
                                                    }
                                                    onChange={(date) =>
                                                        setData(
                                                            "from_date",
                                                            date
                                                        )
                                                    }
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
                                                    selected={
                                                        data?.to_date &&
                                                        new Date(data?.to_date)
                                                    }
                                                    onChange={(date) =>
                                                        setData(
                                                            "to_date",
                                                            date
                                                        )
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
                                                onClick={(e) => {
                                                    handleFilterRegistrationData(e)
                                                }}
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
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) => {
                                                    handleDownloadExcel(e)
                                                }}
                                            >
                                                <i className="icon-FileX"></i>
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
                                                href={route('admission.registration_list')}
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
}
