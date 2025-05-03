import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import List from "../List/List";

export default function AddNewAreaForm({
    areas
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        pick_price: "",
        drop_price: "",
        pick_drop_price: "",
        description: "",
    });

    const handleAreaInsert = (e) => {
        e.preventDefault();
        post(route("area.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleReset = () => {
        reset();
    }

    // handle change pickup price start
    const handleChangePickupPrice = (value) => {
        let pickAndDropPrice = value && !isNaN(value) ? parseFloat(value) : '';

        if(!isNaN(data?.drop_price) && data?.drop_price > 0) {
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

        if(!isNaN(data?.pick_price) && data?.pick_price > 0) {
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
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <List areas={areas} />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New Area
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAreaInsert}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Area Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={
                                                            data.title
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="pick_price"
                                                                value="Pick Price"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="pick_price"
                                                        value={
                                                            data.pick_price
                                                        }
                                                        onChange={(e) =>
                                                            handleChangePickupPrice(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.pick_price
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="drop_price"
                                                                value="Drop Price"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="drop_price"
                                                        value={
                                                            data.drop_price
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeDropPrice(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.drop_price
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="pick_drop_price"
                                                                value="Pick & Drop Price"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="pick_drop_price"
                                                        value={
                                                            data.pick_drop_price
                                                        }
                                                        onChange={(e) =>
                                                            handleChangePickupAndDropPrice(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.pick_drop_price
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
                                                    <TextInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
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
                                                        disabled={processing}
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        disabled={processing}
                                                        onClick={handleReset}
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
