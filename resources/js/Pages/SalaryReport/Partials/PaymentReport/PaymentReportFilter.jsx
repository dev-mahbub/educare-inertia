import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router } from "@inertiajs/react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField, Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const PaymentReportFilter = ({
    paymentMonths,
    staffTypes,
    statusArr,
    data,
    setData,
    salaryPaymentReport
}) => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [paymentMonthIds, setPaymentMonthIds] = useState([]);
    const [params, setParams] = useState({});

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    useEffect(() => {
        setPaymentMonthIds(selectedOptions?.map(item => item?.id));
    }, [selectedOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            payment_month_ids: paymentMonthIds,
        }));
    }, [paymentMonthIds]);

    useEffect(() => {
        setParams({
            staff_type: data?.staff_type,
            status: data?.status,
            payment_month_ids: JSON.stringify(data?.payment_month_ids)
        });
    }, [data]);

    // handle select month start
    const handleSelectMonth = (event, value) => {
        setSelectedOptions(value);
    };
    // handle select month end

    // handle filter salary payment report start
    const handleFilterSalaryPaymentReport = (e) => {
        e.preventDefault();

        if (data?.payment_month_ids?.length == 0) {
            toast.error("Please select month!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            router.post(route('salary_report.payment'), data);
        }
    }
    // handle filter salary payment report end
   
    // const [selectedMonths, setSelectedMonths] = React.useState([]);
    // console.log(selectedMonths)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedOptions(
            // Ensure the selected data is stored as objects
            typeof value === 'string'
                ? value.split(',').map((id) => paymentMonths.find((option) => option.id === Number(id)))
                : value.map((id) => paymentMonths.find((option) => option.id === id))
        );
        // setSelectedMonths(
        //     // Ensure the selected data is stored as objects
        //     typeof value === 'string'
        //         ? value.split(',').map((id) => paymentMonths.find((option) => option.id === Number(id)))
        //         : value.map((id) => paymentMonths.find((option) => option.id === id))
        // );
    };


    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <div className=" educare-header-filtar-bar-inner-main">
                        {/* delete count if don't need */}
                        <div className="educare-card-title mr-auto pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Payment Report
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
                                        transform: `translateX(-${currentIndex * 120
                                            }px)`,
                                    }}
                                >
                                    {/* Replace changable inputs */}
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
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="staff_type"
                                            data_label="All"
                                            data={staffTypes}
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
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="status"
                                            data_label="All"
                                            data={statusArr}
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            className="block"
                                        />
                                    </div>
                                    {/* <div className="educare-input-type-file-styles min-w-[160px]">
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={paymentMonths}
                                            value={selectedOptions}
                                            onChange={handleSelectMonth}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.title}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <CheckboxA
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={paymentMonthIds?.includes(option.id)}
                                                    />
                                                    {option.title}
                                                </li>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} placeholder="Payment Month" />
                                            )}
                                        />
                                    </div> */}

                                    <div className="educare-input-field-styles select-count">
                                        <div className="educare-input-type-file-styles">
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={selectedOptions.map((item) => item.id)}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="Month" />}
                                                    renderValue={(selected) => `${selected.length} selected`}
                                                >
                                                    {paymentMonths.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            <Checkbox
                                                                checked={selectedOptions.some(
                                                                    (item) => item.id === option.id
                                                                )}
                                                            />
                                                            <ListItemText primary={option.title} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
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
                                        onClick={handleFilterSalaryPaymentReport}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>

                            {salaryPaymentReport?.length > 0 &&
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            href={route('export_excel.salary.salary_payment_report', params)}
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
                                        href={route('salary_report.payment')}
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            {/* Replace changable buttons */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentReportFilter;
