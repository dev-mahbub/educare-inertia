import React, { useEffect } from "react";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { router, useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Swal from "sweetalert2";

export default function DriverLogBook({
    stoppageData = [],
    vehicleData = [],
    driverLogBooks = [],
}) {
    const [formFields, setFormFields] = useState([
        {
            date_at: "",
            in_time_at: "",
            out_time_at: "",
            from_transport_stoppage_id: "",
            to_transport_stoppage_id: "",
            starting_km: "",
            last_km: "",
            total_km: "",
            fuel_ltr: "",
            fuel_rate: "",
            mileage: "",
        },
    ])

    const [driverLogBookData, setDriverLogBookData] = useState();
    const handelDriver = (vehicleId) => {
        const filteredDriver = driverLogBooks?.filter(item => item.vehicle_id == vehicleId);
        setDriverLogBookData(filteredDriver);
    }

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        vehicle_id: "",
        items: formFields,
    });

    const handleFormChange = (event, index, field, selectedValue) => {

        const updatedFields = [...formFields];
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        }
        else {
            updatedFields[index][field] = event.target.value;
        }

        // Calculate total distance if either starting_km or last_km is changed
        if (field === 'starting_km' || field === 'last_km') {
            const startingKm = parseFloat(updatedFields[index]['starting_km']) || 0;
            const lastKm = parseFloat(updatedFields[index]['last_km']) || 0;
            updatedFields[index]['total_km'] = lastKm - startingKm;
        }

        // Calculate mileage if total_km or fuel_ltr is changed
        if (field === 'total_km' || field === 'fuel_ltr') {
            const totalKm = parseFloat(updatedFields[index]['total_km']) || 0;
            const fuelLtr = parseFloat(updatedFields[index]['fuel_ltr']) || 0;
            updatedFields[index]['mileage'] = totalKm === 0 ? 0 : totalKm / fuelLtr;
        }

        setData(prevData => ({
            ...prevData,
            items: updatedFields,
        }));
    }

    const addFields = () => {
        setFormFields([...formFields,
        {
            date_at: "",
            in_time_at: "",
            out_time_at: "",
            from_transport_stoppage_id: "",
            to_transport_stoppage_id: "",
            starting_km: "",
            last_km: "",
            total_km: "",
            fuel_ltr: "",
            fuel_rate: "",
            mileage: "",
        },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);
        setData((prevData) => ({
            ...prevData,
            items: updatedFormFields,
        }));

    }

    const handelReset = () => {
        setFormFields([
            {
                date_at: "",
                in_time_at: "",
                out_time_at: "",
                from_transport_stoppage_id: "",
                to_transport_stoppage_id: "",
                starting_km: "",
                last_km: "",
                total_km: "",
                fuel_ltr: "",
                fuel_rate: "",
                mileage: "",
            },
        ]);
        setData({
            vehicle_id: "",
            items: [],
        });

        setAccountGroupSelect(null);
        setPaymentDate(new Date());
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("transport_report.drivers_log_book_save"), {
            preserveScroll: true,
            onSuccess: () => {
                handelReset();
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('transport_report.drivers_log_book_delete', id));
                setDriverLogBookData(prevData => prevData.filter(item => item.id !== id));
            }
        });
    }

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="educare-classroom-table-wrapper">
                    <div className="flex justify-between gap-5 mb-2">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Driver's Log Book
                            </h5>
                        </div>
                        <div className="flex gap-5">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    data_label="Vehicle"
                                    data={vehicleData}
                                    value={
                                        data.vehicle_id
                                    }
                                    onChange={(e) => {
                                        setData(
                                            "vehicle_id",
                                            e.target.value
                                        )
                                        handelDriver(e.target.value)
                                    }
                                    }
                                    className="block"
                                    required
                                />
                                <InputError
                                    message={
                                        errors.vehicle_id
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                disabled={processing}
                                className="educare-primary-btn-md-fill"
                                onClick={addFields}
                                type="button"
                            >
                                Add
                            </PrimaryButton>
                            <PrimaryButton
                                disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="submit"
                            >
                                Save all
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table className="pb-[300px]">
                                <thead>
                                    <tr>
                                        <th>
                                            Date
                                            <span className="text-danger">*</span>
                                        </th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>From
                                            <span className="text-danger">*</span>
                                        </th>
                                        <th>To
                                            <span className="text-danger">*</span>
                                        </th>
                                        <th>Starting km.</th>
                                        <th>Last Km.</th>
                                        <th>Total Km</th>
                                        <th>Fuel ltr.</th>
                                        <th>Fuel Rate</th>
                                        <th>Mileage</th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formFields?.length > 0 ?
                                        formFields?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-input-field-styles min-w-[130px] max-w-[150px]">
                                                        <DatePicker
                                                            selected={item?.date_at && new Date(item?.date_at)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            className="w-full"
                                                            onChange={(date) => handleFormChange(null, index, "date_at", date)}
                                                            placeholderText="Select Date"
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles min-w-[120px] max-w-[120px]">
                                                        <DatePicker
                                                            selected={item?.in_time_at && new Date(item?.in_time_at)}
                                                            onChange={(date) => handleFormChange(null, index, "in_time_at", date)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={1}
                                                            timeCaption="Time"
                                                            dateFormat="h:mm aa"
                                                            className="w-full"
                                                            placeholderText="Select Time"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles min-w-[120px] max-w-[120px]">
                                                        <DatePicker
                                                            selected={item?.out_time_at && new Date(item?.out_time_at)}
                                                            onChange={(date) => handleFormChange(null, index, "out_time_at", date)}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={1}
                                                            timeCaption="Time"
                                                            dateFormat="h:mm aa"
                                                            className="w-full"
                                                            placeholderText="Select Time"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="min-w-[150px]">
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                data_label="from"
                                                                data={stoppageData}
                                                                value={
                                                                    data.from_transport_stoppage_id
                                                                }
                                                                onChange={(event, value) => handleFormChange(event, index, "from_transport_stoppage_id", value)}
                                                                className="block"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="min-w-[150px]">
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                data_label="from"
                                                                data={stoppageData}
                                                                value={
                                                                    data.to_transport_stoppage_id
                                                                }
                                                                onChange={(event, value) => handleFormChange(event, index, "to_transport_stoppage_id", value)}
                                                                className="block"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.starting_km}
                                                                onChange={(event, value) => handleFormChange(event, index, "starting_km", value)}
                                                                className="block"
                                                                placeHolder="Start. Km"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.last_km}
                                                                onChange={(event, value) => handleFormChange(event, index, "last_km", value)}
                                                                className="block"
                                                                placeHolder="Last Km"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.total_km}
                                                                className="block disabled"
                                                                placeHolder="Total Km"
                                                                disabled={true}
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.fuel_ltr}
                                                                onChange={(event, value) => handleFormChange(event, index, "fuel_ltr", value)}
                                                                className="block"
                                                                placeHolder="Fuel Ltr"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.fuel_rate}
                                                                onChange={(event, value) => handleFormChange(event, index, "fuel_rate", value)}
                                                                className="block"
                                                                placeHolder="Fuel Rate"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.mileage}
                                                                placeHolder="Mileage"
                                                                className="block disabled"
                                                                disabled={true}
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Remove"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={(e) => removeFields(index)}
                                                                >
                                                                    X
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        ' '
                                    }
                                    {driverLogBookData?.length > 0 ?
                                        driverLogBookData?.map((item2, index) => (
                                            <tr key={index}>
                                                <td>{moment(item2?.date_at).format("MMM DD, YYYY")}</td>
                                                <td>{moment(item2?.in_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{moment(item2?.out_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{item2?.from_stoppage?.stoppage}</td>
                                                <td>{item2?.to_stoppage?.stoppage}</td>
                                                <td>{item2?.starting_km}</td>
                                                <td>{item2?.last_km}</td>
                                                <td>{item2?.total_km}</td>
                                                <td>{item2?.fuel_ltr}</td>
                                                <td>{item2?.fuel_rate}</td>
                                                <td>{item2?.mileage}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() => handleDelete(item2.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        ''
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
