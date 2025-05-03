import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const EditCertificateForm = ({
    certificateData = [],
    certTypes,
    viewNames,
    audiences,
 }) => {

    const [viewNamesData, setViewNamesData] = useState([]);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
    } = useForm({
        title: certificateData?.title,
        certificate_type_id: certificateData?.certificate_type_id,
        view_name: certificateData?.view_name,
        audience_type: certificateData?.audience_type,
    });

    useEffect(() => {
        const certType = certTypes?.find((item) => item?.id == certificateData?.certificate_type_id);
        const certTypeTitle = certType?.title;

        setViewNamesData(viewNames?.filter(item => item?.cert_type == certTypeTitle));
    }, [certificateData, viewNames]);

    const handleCertificate = (id) => {
        const certType = certTypes?.find((item) => item?.id == id);
        const certTypeTitle = certType?.title;

        setViewNamesData(viewNames?.filter(item => item?.cert_type == certTypeTitle));
    }

    const handleCertTemplateForm = (e) => {
        e.preventDefault();
        put(route("certificate.update_template", certificateData?.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleReset = () => {
        reset();
    }


    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <form onSubmit={handleCertTemplateForm}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Title"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
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
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Certificate Type"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    data_label="Certificate"
                                    data={certTypes}
                                    value={
                                        data.certificate_type_id
                                    }
                                    onChange={(e) => {
                                        setData("certificate_type_id", e.target.value);
                                        handleCertificate(e.target.value);
                                    }
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.certificate_type_id
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="View Name"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    data_label="Name"
                                    data={viewNamesData}
                                    value={
                                        data.view_name
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "view_name",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.view_name
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Audience"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    data_label="Audience"
                                    data={audiences}
                                    value={
                                        data.audience_type
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "audience_type",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.audience_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5  justify-end">
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                    type="button"
                                    disabled={processing}
                                    onClick={handleReset}
                                >
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Update
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCertificateForm;
