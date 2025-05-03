import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const multipleSelectorData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
];

const GuardianWiseDueReportFilter = ({
    classrooms = [],
    fees = [],
    student_status_array = [],
    guardian_array = [],
    payment_status_array = [],
    transport_routes = [],
    guardianWiseReport,
    setLoading,
    setParams
}) => {

    const [filteredToFees, setFilteredToFees] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        payment_status: "",
        voucher: "",
        transport_route: "",
        student_status: "",
        classroom_id: "",
        guardian_type: 'guardian',
        from_fee_id: "",
        to_fee_id: "",
    });

    useEffect(() => {
        setParams({
            payment_status: data?.payment_status ?? "",
            voucher: data?.voucher ?? "",
            student_status: data?.student_status ?? "",
            transport_route: data?.transport_route ?? "",
            classroom_id: data?.classroom_id ?? "",
            guardian_type: data?.guardian_type ?? 'guardian',
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
        });
    },[data]);

    // hanlde from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        if (from_fee_id != "") {
            setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));
        }
        else {
            setFilteredToFees([]);
        }

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: "",
        }));
    }
    // hanlde from fee change end

    // handle filter report start
    const guardianWiseDueReportFilterData = (e) => {
        e.preventDefault();

        if(data?.guardian_type == "") {
            toast.error("Please select guardian.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if(data?.from_fee_id == "" || data?.to_fee_id == "") {
            toast.error("Please select from and to installment.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            setLoading(false);

            post(route("fee_report.guardian_wise_due_report"), {
                preserveScroll: true,
                onSuccess: () => { },
                onError: (errors) => { },
            });
        }
    };
    // handle filter report end


    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
    };

    console.log(selectedOptions)

    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={guardianWiseDueReportFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {Object.keys(guardianWiseReport)?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area extra-large-filter relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All"
                                                data={payment_status_array}
                                                value={data.payment_status}
                                                onChange={(e) =>
                                                    setData("payment_status", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.payment_status}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="flex gap-2">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="voucher"
                                                        name="voucher"
                                                        checked={
                                                            data.voucher
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "voucher",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="voucher"
                                                        value="Voucher"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Student"
                                                data={student_status_array}
                                                value={data.student_status}
                                                onChange={(e) =>
                                                    setData("student_status", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.student_status}
                                                className="mt-2"
                                            />
                                        </div>
                                       {/*
                                       <div className="educare-input-field-styles">
                                            <div className="educare-input-type-file-styles">
                                                <Autocomplete
                                                    multiple
                                                    id="tags-outlined"
                                                    options={multipleSelectorData}
                                                    getOptionLabel={(option) => option.title}
                                                    filterSelectedOptions
                                                    value={selectedOptions}
                                                    onChange={handleSelectChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label=""
                                                            placeholder="Select"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                       */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Route"
                                                data={transport_routes}
                                                value={data.transport_route}
                                                onChange={(e) =>
                                                    setData("transport_route", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.transport_route}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="All Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    setData("classroom_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label=""
                                                data={guardian_array}
                                                value={data.guardian_type}
                                                onChange={(e) =>
                                                    setData("guardian_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.guardian_type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="From"
                                                data={fees}
                                                value={data.from_fee_id}
                                                onChange={(e) =>
                                                    handleFromFeeChange(e)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.from_fee_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="To"
                                                data={filteredToFees}
                                                value={data.to_fee_id}
                                                onChange={(e) =>
                                                    setData("to_fee_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.to_fee_id}
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
                                        as="button"
                                    >
                                        <button
                                            type="submit"
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
                                        <Link
                                            href={route('fee_report.guardian_wise_due_report')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
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

export default GuardianWiseDueReportFilter;
