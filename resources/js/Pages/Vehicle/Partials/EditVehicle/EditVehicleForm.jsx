import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import VehicleList from "../List/VehicleList";

export default function EditVehicleForm({
    vehicleId,
    vehicles,
    drivers,
    conductors,
    providers
}) {
    const { data, setData, errors, put, reset, processing } = useForm({
        vehicle_number: vehicleId?.vehicle_number,
        total_seat: vehicleId?.total_seat,
        registration_number: vehicleId?.registration_number,
        chassis_number: vehicleId?.chassis_number,
        finance_name: vehicleId?.finance_name,
        engine_number: vehicleId?.engine_number,
        company_name: vehicleId?.company_name,
        tank_capacity: vehicleId?.tank_capacity,
        model: vehicleId?.model,
        type: vehicleId?.type,
        fuel_type: vehicleId?.fuel_type,
        owner_name: vehicleId?.owner_name,
        driver_id: vehicleId?.driver_id,
        conductor_id: vehicleId?.conductor_id,
        device_id: vehicleId?.device_id,
        transport_provider_id: vehicleId?.transport_provider_id,
        insurance_upto: vehicleId?.insurance_upto,
        road_tax_upto: vehicleId?.road_tax_upto,
        pollution_upto: vehicleId?.pollution_upto,
        permit_upto: vehicleId?.permit_upto,
        registration_date: vehicleId?.registration_date,
        description: vehicleId?.description,
        status: vehicleId?.status,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            vehicle_number: vehicleId?.vehicle_number ?? '',
            total_seat: vehicleId?.total_seat ?? '',
            registration_number: vehicleId?.registration_number ?? '',
            chassis_number: vehicleId?.chassis_number ?? '',
            finance_name: vehicleId?.finance_name ?? '',
            engine_number: vehicleId?.engine_number ?? '',
            company_name: vehicleId?.company_name ?? '',
            tank_capacity: vehicleId?.tank_capacity ?? '',
            model: vehicleId?.model ?? '',
            type: vehicleId?.type ?? '',
            fuel_type: vehicleId?.fuel_type ?? '',
            owner_name: vehicleId?.owner_name ?? '',
            driver_id: vehicleId?.driver_id ?? '',
            conductor_id: vehicleId?.conductor_id ?? '',
            device_id: vehicleId?.device_id ?? '',
            transport_provider_id: vehicleId?.transport_provider_id ?? '',
            insurance_upto: vehicleId?.insurance_upto ?? '',
            road_tax_upto: vehicleId?.road_tax_upto ?? '',
            pollution_upto: vehicleId?.pollution_upto ?? '',
            permit_upto: vehicleId?.permit_upto ?? '',
            registration_date: vehicleId?.registration_date ?? '',
            description: vehicleId?.description ?? '',
            status: vehicleId?.status ?? ''
        }));
    }, [vehicleId]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        put(route("vehicle.update", vehicleId.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleReset = () => {
        // reset();
        // setData({
        //     vehicle_number: "",
        //     total_seat: "",
        //     registration_number: "",
        //     chassis_number: "",
        //     finance_name: "",
        //     engine_number: "",
        //     company_name: "",
        //     tank_capacity: "",
        //     model: "",
        //     type: "",
        //     fuel_type: "",
        //     owner_name: "",
        //     driver_id: "",
        //     conductor_id: "",
        //     device_id: "",
        //     transport_provider_id: "",
        //     insurance_upto: "",
        //     road_tax_upto: "",
        //     pollution_upto: "",
        //     permit_upto: "",
        //     registration_date: "",
        //     description: "",
        //     status: "",
        // })

        router.get(route('vehicle.list'));
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <VehicleList vehicles={vehicles} />
                    </div>
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-Taxi"></i>
                                        Update Vehicle
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="vehicle_number"
                                                                value="Vehicle Number"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="vehicle_number"
                                                        value={
                                                            data.vehicle_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "vehicle_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g A-130"
                                                        className="block"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.vehicle_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="total_seat"
                                                                value="Total Seats"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="total_seat"
                                                        value={data.total_seat}
                                                        onChange={(e) =>
                                                            setData(
                                                                "total_seat",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g 40"
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.total_seat
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="registration_number"
                                                                value="Registration No."
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="registration_number"
                                                        value={
                                                            data.registration_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "registration_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g DL-90935"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.registration_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="chassis_number"
                                                                value="Chassis Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="chassis_number"
                                                        value={
                                                            data.chassis_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "chassis_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.chassis_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="finance_name"
                                                        value="Financer Name"
                                                    />
                                                    <TextInput
                                                        id="finance_name"
                                                        value={
                                                            data.finance_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "finance_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.finance_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="engine_number"
                                                        value="Engine Number"
                                                    />
                                                    <TextInput
                                                        id="engine_number"
                                                        value={
                                                            data.engine_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "engine_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.engine_number
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="company_name"
                                                        value="Company Name"
                                                    />
                                                    <TextInput
                                                        id="company_name"
                                                        value={
                                                            data.company_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "company_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.company_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="tank_capacity"
                                                        value="Tank Capacity"
                                                    />
                                                    <TextInput
                                                        id="tank_capacity"
                                                        value={
                                                            data.tank_capacity
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "tank_capacity",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.tank_capacity
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="model"
                                                        value="Model"
                                                    />
                                                    <TextInput
                                                        id="model"
                                                        value={data.model}
                                                        onChange={(e) =>
                                                            setData(
                                                                "model",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g Tata Bus 1800"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.model}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="type"
                                                        value="Type"
                                                    />
                                                    <TextInput
                                                        id="type"
                                                        value={data.type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g Bus/Taxi"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.type}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="fuel_type"
                                                        value="Fuel Type"
                                                    />
                                                    <TextInput
                                                        id="fuel_type"
                                                        value={data.fuel_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "fuel_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeHolder="e.g CNG"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.fuel_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="owner_name"
                                                        value="Owner Name"
                                                    />
                                                    <TextInput
                                                        id="owner_name"
                                                        value={data.owner_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "owner_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.owner_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="driver_id"
                                                        value="Driver"
                                                    />
                                                    <SelectInput
                                                        id="driver_id"
                                                        data_label="Class"
                                                        data={drivers}
                                                        value={data.driver_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "driver_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.driver_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="conductor_id"
                                                        value="Conductor"
                                                    />
                                                    <SelectInput
                                                        id="conductor_id"
                                                        data_label="Class"
                                                        data={conductors}
                                                        value={
                                                            data.conductor_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "conductor_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.conductor_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="device_id"
                                                        value="Device Id"
                                                    />
                                                    <TextInput
                                                        id="device_id"
                                                        value={data.device_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "device_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.device_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="transport_provider_id"
                                                        value="Provider Name"
                                                    />
                                                    <SelectInput
                                                        id="transport_provider_id"
                                                        data_label="Class"
                                                        data={providers}
                                                        value={
                                                            data.transport_provider_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "transport_provider_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.transport_provider_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Insurance Upto" />
                                                    <DatePicker
                                                        selected={data.insurance_upto && new Date(data.insurance_upto)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "insurance_upto",
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
                                                        placeholderText="Insurance Upto"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.insurance_upto
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Road Tax Upto" />
                                                    <DatePicker
                                                        selected={data.road_tax_upto && new Date(data.road_tax_upto)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "road_tax_upto",
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
                                                        placeholderText="Road Tax Upto"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.road_tax_upto
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Pollution Upto" />
                                                    <DatePicker
                                                        selected={data.pollution_upto && new Date(data.pollution_upto)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "pollution_upto",
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
                                                        placeholderText="Pollution Upto"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.pollution_upto
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel value="Permit Upto" />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={data.permit_upto && new Date(data.permit_upto)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "permit_upto",
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
                                                        placeholderText="Permit Upto"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.permit_upto
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Registration Date" />
                                                    <DatePicker
                                                        selected={data.registration_date && new Date(data.registration_date)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "registration_date",
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
                                                        placeholderText="Registration Date"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.registration_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        onClick={handleReset}
                                                        type="button"
                                                        disabled={processing}
                                                        className="educare-gray-btn-lg-stroke"
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
