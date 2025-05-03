import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const EnquiryTypeForm = ({activeVisitorType, setActiveVisitorType}) => {

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        id: activeVisitorType ? activeVisitorType.id : "",
        title: activeVisitorType ? activeVisitorType.title : "",
        description: activeVisitorType ? activeVisitorType.description : "",
    });

    React.useEffect(() => {
        if (activeVisitorType) {
            setData({
                id: activeVisitorType.id || "",
                title: activeVisitorType.title || "",
                description: activeVisitorType.description || ""
            });
        }
    }, [activeVisitorType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id) {
            put(route('visitor_enquiry.type_update', data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setActiveVisitorType(null);
                },
            });
            return;
        }
        post(route('visitor_enquiry.type_save'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    }

    const buttontText = data.id ? "Update" : "Save";
    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-info"></i>
                    Add Enquiry Type
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="title"
                                                value="Title"
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
                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        type = "submit"
                                        className="educare-primary-btn-lg-fill"
                                    >
                                        {buttontText}
                                    </PrimaryButton>
                                    <PrimaryButton
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
    );
};

export default EnquiryTypeForm;