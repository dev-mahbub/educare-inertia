import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function EditRouteForm({
    vehicles,
    teachers,
    routeId,
    routes
}) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        name: routeId?.name,
        vehicle_id: routeId?.vehicle_id,
        staff_id: routeId?.staff_id,
        pickup_time_at: routeId?.pickup_time_at && moment(routeId?.pickup_time_at, "HH:mm:ss").toDate(),
        drop_time_at: routeId?.drop_time_at && moment(routeId?.drop_time_at, "HH:mm:ss").toDate(),
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            name: routeId?.name ?? '',
            vehicle_id: routeId?.vehicle_id ?? '',
            staff_id: routeId?.staff_id ?? '',
            pickup_time_at: routeId?.pickup_time_at ? moment(routeId?.pickup_time_at, "HH:mm:ss").toDate() : '',
            drop_time_at: routeId?.drop_time_at ? moment(routeId?.drop_time_at, "HH:mm:ss").toDate() : ''
        }));
    }, [routeId]);

    const handleEditRouteData = (e) => {
        e.preventDefault();
        put(route("transport_route.update", routeId.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleReset = (e) => {
        // e.preventDefault();
        // setData({
        //     name: "",
        //     vehicle_id: "",
        //     staff_id: "",
        //     pickup_time_at: "",
        //     drop_time_at: "",
        // });

        router.get(route("transport_route.list"));
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("transport_route.destroy", id));
            }
        });
    };

    // handle edit start
    const handleEdit = (id) => {
        router.post(route("transport_route.edit"), { id: id });
    }
    // handle edit end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Routes List
                                    <span>(Total : {routes?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Route Name</th>
                                            <th>First Pick Up Time</th>
                                            <th>Last Pick Up Time</th>
                                            <th>Vehicle No.</th>
                                            <th>Co-ordinator</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {routes?.length > 0 ? (
                                            routes?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.pickup_time_at && moment(item?.pickup_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>{item?.drop_time_at && moment(item?.drop_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>{item?.vehicle_no}</td>
                                                    <td>{concatName(item?.staff_first_name, item?.staff_middle_name, item?.staff_last_name)}</td>
                                                    <td>{item?.status}</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleEdit(item?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="12"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-MouseSimple"></i>
                                        Edit Route
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleEditRouteData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="name"
                                                                value="Route Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="name"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.name}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="First Pick Up Time" />
                                                    <DatePicker
                                                        selected={data?.pickup_time_at && new Date(data?.pickup_time_at)}
                                                        onChange={(time) =>
                                                            setData(
                                                                "pickup_time_at",
                                                                time
                                                            )
                                                        }
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
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Last Pick Up Time" />
                                                    <DatePicker
                                                        selected={data?.drop_time_at && new Date(data?.drop_time_at)}
                                                        onChange={(time) =>
                                                            setData(
                                                                "drop_time_at",
                                                                time
                                                            )
                                                        }
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
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="vehicle_id"
                                                                value="Vehicle"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="vehicle_id"
                                                        data_label="Vehicle"
                                                        data={vehicles}
                                                        value={data.vehicle_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "vehicle_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.vehicle_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="staff_id"
                                                                value="Co-ordinator"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="staff_id"
                                                        data_label="Co-ordinator"
                                                        data={teachers}
                                                        value={data.staff_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "staff_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.staff_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        type="button"
                                                        onClick={(e) => handleReset(e)}
                                                        className="educare-gray-btn-lg-fill"
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
