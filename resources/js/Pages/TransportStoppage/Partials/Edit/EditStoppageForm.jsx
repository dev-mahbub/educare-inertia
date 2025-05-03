import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import moment from "moment";
import DatePicker from "react-datepicker";

export default function CreateStoppageForm({
    transport,
    areas,
    routes,
}) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
    } = useForm({
        area_id: transport?.area_id,
        transport_route_id: transport?.transport_route_id,
        order: transport?.order,
        stoppage: transport?.stoppage,
        // area_id: transport?.area_id,
        pick_price: transport?.pick_price,
        drop_price: transport?.drop_price,
        pickup_time_at: moment(transport?.pickup_time_at, "HH:mm:ss").toDate(),
        drop_time_at: moment(transport?.drop_time_at, "HH:mm:ss").toDate(),
        distance: transport?.distance,
        pick_drop_price: transport?.pick_drop_price,
    });

    const handleTransportStopage = (e) => {
        e.preventDefault();
        put(route("transport_stoppage.update", transport.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // handle reset start
    const handelReset = () => {
        router.get(route('transport_stoppage.list'));
    }
    // handle reset end

    // handle change area start
    const handleChangeArea = (value) => {
        const area = areas?.find(item => item?.id == value);

        setData((prevData) => ({
            ...prevData,
            area_id: value,
            pick_price: area?.pick_price ?? '',
            drop_price: area?.drop_price ?? '',
            pick_drop_price: area?.pick_drop_price ?? ''
        }));
    }
    // handle change area end

    // handle change pickup price start
    const handleChangePickupPrice = (value) => {
        let pickAndDropPrice = value && !isNaN(value) ? parseFloat(value) : '';

        if (!isNaN(data?.drop_price) && data?.drop_price > 0) {
            pickAndDropPrice += parseFloat(data?.drop_price);
        }

        setData((prevData) => ({
            ...prevData,
            pick_price: isNaN(value) ? '' : value,
            pick_drop_price: pickAndDropPrice
        }));
    }
    // handle change pickup price end

    // handle change drop price start
    const handleChangeDropPrice = (value) => {
        let pickAndDropPrice = value && !isNaN(value) ? parseFloat(value) : '';

        if (!isNaN(data?.pick_price) && data?.pick_price > 0) {
            pickAndDropPrice += parseFloat(data?.pick_price);
        }

        setData((prevData) => ({
            ...prevData,
            drop_price: isNaN(value) ? '' : value,
            pick_drop_price: pickAndDropPrice
        }));
    }
    // handle change drop price end

    // handle change pickup and drop price start
    const handleChangePickupAndDropPrice = (value) => {
        setData((prevData) => ({
            ...prevData,
            pick_drop_price: isNaN(value) ? '' : value
        }));
    }
    // handle change pickup and drop price end

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Edit Stoppage
                    </h5>
                </div>
                <form onSubmit={handleTransportStopage}>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="transport_route_id"
                                        value="Route"
                                    />
                                    <SelectInput
                                        id="transport_route_id"
                                        data_label="Route"
                                        data={routes}
                                        value={
                                            data.transport_route_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "transport_route_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.transport_route_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="order"
                                        value="Order List"
                                    />
                                    <TextInput
                                        id="order"
                                        value={
                                            data.order
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "order",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.order
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="stoppage"
                                        value="Stopage Name"
                                    />
                                    <TextInput
                                        id="stoppage"
                                        value={
                                            data.stoppage
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "stoppage",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.stoppage
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="area_id"
                                        value="Area"
                                    />
                                    <SelectInput
                                        id="area_id"
                                        data_label="Area"
                                        data={areas}
                                        value={
                                            data.area_id
                                        }
                                        onChange={(e) =>
                                            handleChangeArea(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.area_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="pick_price"
                                        value="Pick Price"
                                    />
                                    <TextInput
                                        id="pick_price"
                                        value={
                                            data.pick_price
                                        }
                                        onChange={(e) =>
                                            handleChangePickupPrice(e.target.value)
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.pick_price
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="drop_price"
                                        value="Drop Price"
                                    />
                                    <TextInput
                                        id="drop_price"
                                        value={
                                            data.drop_price
                                        }
                                        onChange={(e) =>
                                            handleChangeDropPrice(e.target.value)
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.drop_price
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="pick_drop_price"
                                        value="Pick & Drop Price"
                                    />
                                    <TextInput
                                        id="pick_drop_price"
                                        value={
                                            data.pick_drop_price
                                        }
                                        onChange={(e) =>
                                            handleChangePickupAndDropPrice(e.target.value)
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.pick_drop_price
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="pickup_time_at"
                                        value="Pick up Time(h:m)"
                                    />
                                    <DatePicker
                                        selected={data?.pickup_time_at}
                                        onChange={(date) =>
                                            setData(
                                                "pickup_time_at",
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
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Pick up Time"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="drop_time_at"
                                        value="Drop Time(h:m)"
                                    />
                                    <DatePicker
                                        selected={data?.drop_time_at}
                                        onChange={(date) =>
                                            setData(
                                                "drop_time_at",
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
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Drop Time"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 minMaxMd:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="distance"
                                        value="Distance(KM)"
                                    />
                                    <TextInput
                                        id="distance"
                                        value={
                                            data.distance
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "distance",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.distance
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                    >
                                        Update
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        type="button"
                                        onClick={handelReset}
                                    >
                                        Reset
                                    </PrimaryButton>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
