import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomIdCardFrom = ({
    data,
    setData,
    errors,
    handleAdmissionSourceData,
    audienceTypeArray,
    orientationTypeArray,
    idCardCertificates,
    setFieldsData,
    setSelectedColumns,
    reset,
    setIdCardCertificateData,
    setIsNew,
    fields,
    initialHeaderData,
    initialBodyData,
    initialFooterdata,
    initialBackpageData,
}) => {

    // handle reset start
    const handleReset = () => {
        setFieldsData([]);
        setSelectedColumns([]);
        reset();
        setIdCardCertificateData({});
        setIsNew(true);
    }
    // handle reset end

    // handle load certificate start
    const handleLoadCertificate = () => {
        if (data?.template_id != "") {
            const selected_certificate = Object.values(idCardCertificates)?.find(item => item?.id == data?.template_id);

            if (selected_certificate?.id != null) {
                setData((prevData) => ({
                    ...prevData,
                    template_id: selected_certificate?.id ?? "",
                    is_with_backpage: selected_certificate?.is_with_backpage ?? false,
                    orientation: selected_certificate?.orientation ?? "",
                    audience_type: selected_certificate?.audience_type ?? "",
                    template_name: selected_certificate?.template_name ?? "",
                    background_color: selected_certificate?.background_color ?? "",
                    columns: selected_certificate?.columns ?? [],
                    header: selected_certificate?.header ?? initialHeaderData,
                    body: selected_certificate?.body ?? initialBodyData,
                    footer: selected_certificate?.footer ?? initialFooterdata,
                    back_page: selected_certificate?.back_page ?? initialBackpageData,
                }));

                const filteredData = fields[selected_certificate?.audience_type?.toLowerCase()] ?? [];

                let initialData = {};

                for (const key in filteredData) {
                    let is_selected = false;

                    if (selected_certificate?.columns && Object.keys(selected_certificate.columns).length > 0) {
                        for (const item of Object.values(selected_certificate.columns)) {
                            if (item?.field_name === filteredData[key]) {
                                is_selected = item?.is_selected ?? false;
                                break;
                            }
                        }
                    }

                    initialData[key] = {
                        key_name: key,
                        field_name: filteredData[key],
                        label_name: filteredData[key],
                        is_selected: is_selected,
                    }
                }

                setFieldsData(initialData);

                setSelectedColumns(selected_certificate?.columns ?? []);

                setIdCardCertificateData(selected_certificate);
                setIsNew(false);
            } else {
                setIdCardCertificateData({});
            }
        }
        else {
            toast.error("Select Certificate template.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }
    // handle load certificate end
    return (
        <>
            <div className="educare-class-form-box-wrapper">
                <div className="educare-create-school-details-form-wrap">
                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                        <form onSubmit={handleAdmissionSourceData}>
                            <div className="educare-input-field-styles mb-4">
                                <InputLabel
                                    value="Template"
                                />
                                <SelectInput
                                    data_label="Template"
                                    data={idCardCertificates}
                                    value={
                                        data.template_id
                                    }
                                    onChange={(e) =>
                                        setData('template_id', e.target.value)
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.template_id
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document mb-4">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="is_with_backpage"
                                        name="is_with_backpage"
                                        checked={
                                            data?.is_with_backpage
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "is_with_backpage",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="is_with_backpage"
                                        value="Is With backpackage?"
                                    />
                                </div>
                            </div>
                            <div className="educare-input-field-styles mb-4">
                                <InputLabel
                                    value="Orientation"
                                />
                                <SelectInput
                                    data_label="Orientation"
                                    data={orientationTypeArray}
                                    value={
                                        data.orientation
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "orientation",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.orientation
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-input-field-styles mb-4">
                                <InputLabel
                                    value="Audience"
                                />
                                <SelectInput
                                    data_label="Audience"
                                    data={audienceTypeArray}
                                    value={
                                        data.audience_type
                                    }
                                    onChange={(e) =>
                                        setData('audience_type', e.target.value)
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
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Certificate Name"
                                />
                                <TextInput
                                    id="template_name"
                                    value={
                                        data.template_name
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "template_name",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder="Certificate Name"
                                />
                                <InputError
                                    message={
                                        errors.template_name
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex flex-wrap justify-end gap-2.5 mt-5">
                                <PrimaryButton
                                    className="educare-secondary-btn-md-fill"
                                    type="button"
                                    onClick = {() => {
                                        handleReset();
                                    }}
                                >
                                    New
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick={() => {
                                        handleLoadCertificate();
                                    }}
                                >
                                    Load
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomIdCardFrom;
