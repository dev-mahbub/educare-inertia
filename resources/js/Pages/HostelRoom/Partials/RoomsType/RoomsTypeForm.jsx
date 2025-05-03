import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

const RoomsTypeForm = ({
    hostEditData = []
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        id: "",
        title: "",
        no_of_bed: "",
        description: "",
    });

    const handleInsert = (e) => {
        e.preventDefault();
        post(route("hostel_room.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('hostel_room.list'));
    }

    useEffect(() => {
        setData({
            ...data,
            id: hostEditData?.id,
            title: hostEditData?.title,
            no_of_bed: hostEditData?.no_of_bed,
            description: hostEditData?.description,
        });
    }, [hostEditData]);

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5> Add New Room Type</h5>
            </div>
            <div className="educare-common-card">
                <form onSubmit={handleInsert}>
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="title"
                                                value="Room type title"
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
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="no_of_bed"
                                                value="No of bed"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="no_of_bed"
                                        value={
                                            data.no_of_bed
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "no_of_bed",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        type="number"
                                    />
                                    <InputError
                                        message={
                                            errors.no_of_bed
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 lg-col-span-12 md:col-span-8">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <TextareaInput
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
                                        placeholder="Room type description"
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
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
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
                                        onClick={(e) => handleReset(e)}
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

export default RoomsTypeForm;
