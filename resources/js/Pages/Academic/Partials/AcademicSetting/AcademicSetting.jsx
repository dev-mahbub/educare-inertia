import RadioInput from "@/Components/RadioInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AcademicSetting({ siteSettingsReportCard }) {

    const [selectedImages, setSelectedImages] = useState({
        digital_signature: siteSettingsReportCard.digital_signature,
        watermark_image: siteSettingsReportCard.watermark_image,
    });

    const {
        data,
        setData,
    } = useForm({
        is_teamWise: siteSettingsReportCard.is_teamWise ?? '',
        digital_signature: siteSettingsReportCard.digital_signature ?? '',
        watermark_image: siteSettingsReportCard.watermark_image ?? '',
    });

    const handleImage = (type, key, image) => {
        const imageData = { type, key, image }
        router.post(route('academic.settings.image_save'), imageData);
        // post(route("academic.settings.image_save"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset()
        // });
    };

    // handle checked
    const handelChecked = (type, key, value, seedKey) => {

        let key_value_array = [
            { type, key, value }
        ];

        if (seedKey != null) {
            key_value_array.push({ type, key: seedKey, value: data[seedKey] })
        }
        const sendData = { key_value_array };
        router.post(route('academic.settings.save'), sendData);
    }

    const handleImageChange = (e, image_for) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImages({
                ...selectedImages,
                [image_for]: reader.result,
            })
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <form>
                <div className="educare-classroom-form-area mb-5 pb-4">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12 xl:col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="mb-5">
                                        <div className="educare-card-title">
                                            <h5>
                                                <i className="icon-ListBullets"></i>
                                                TermWise Report card Setting
                                            </h5>
                                        </div>
                                        <div className="educare-input-field-notes">
                                            <ul>
                                                <li>
                                                    <strong>Note :</strong> If this option is enable, so you can create multiple term wise report card for one class !! But make Sure this option will use only one time. Before create term wise exams !!
                                                </li>
                                                <li className="pt-2">
                                                    Don't make any changes after create term wise report card.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        <div className="grid grid-cols-12">
                                            <div className="col-span-12">
                                                <div className="educare-create-school-settings-list">
                                                    <div className="educare-create-school-settings-list-title">
                                                        <h6>Create Report card with TermWise?</h6>
                                                    </div>
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="is_teamWise"
                                                                value="YES"
                                                                checked={data.is_teamWise === "yes"}
                                                                onChange={() => setData("is_teamWise", "yes")}
                                                            />
                                                            <RadioInput
                                                                name="is_teamWise"
                                                                value="NO"
                                                                checked={data.is_teamWise === "no"}
                                                                onChange={() => setData("is_teamWise", "no")}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-2 col-span-2">
                                                        <div className="educare-list-action-btn my-5 text-end">
                                                            <button
                                                                className="educare-success-btn-sm-fill"
                                                                onClick={() => handelChecked('Team Wise Report Card', 'is_teamWise', data?.is_teamWise)}
                                                                type="button"
                                                            >
                                                                <i className="icon-check-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12 xl:col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="mb-1">
                                        <div className="educare-card-title">
                                            <h5>
                                                <i className="icon-ListBullets"></i>
                                                Digital Signature & Watermark for All Certificates/Documents
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 mb-7">
                                            <div className="col-span-4">
                                                <div className="educare-create-school-settings-list">
                                                    <div className="educare-create-school-settings-list-title">
                                                        <h6>Digital Authorized Signature</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="digital_signature"
                                                            type="file"
                                                            name="digital_signature"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                setData("digital_signature", e.target.files[0]);
                                                                handleImageChange(e, 'digital_signature');
                                                            }
                                                            }
                                                        />
                                                    </div>
                                                    {selectedImages?.digital_signature ? <img src={selectedImages?.digital_signature} alt="academic syllabus" className="pt-2" style={{ width: '120px', height: 'auto' }} /> : ''}

                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={(e) => handleImage('Team Wise Report Card', 'digital_signature', data?.digital_signature)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 mb-7">
                                            <div className="col-span-4">
                                                <div className="educare-create-school-settings-list">
                                                    <div className="educare-create-school-settings-list-title">
                                                        <h6>Water Mark Image</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="watermark_image"
                                                            type="file"
                                                            name="watermark_image"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                setData("watermark_image", e.target.files[0]);
                                                                handleImageChange(e, 'watermark_image');
                                                            }
                                                            }

                                                        />
                                                    </div>
                                                    {selectedImages?.watermark_image ? <img src={selectedImages?.watermark_image} alt="academic syllabus" className="pt-2" style={{ width: '120px', height: 'auto' }} /> : ''}
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={(e) => handleImage('Team Wise Report Card', 'watermark_image', data?.watermark_image)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
