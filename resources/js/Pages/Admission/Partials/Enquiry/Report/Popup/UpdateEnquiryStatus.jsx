import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateEnquiryStatus({
    className = '',
    enquiryStatusPopup,
    setEnquiryStatusPopup,
    enquiryStatusArray,
    enquiryReportData,
    setEnquiryReportData,
    formData
}) {

    const {
        data,
        setData,
        delete: destroy,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        enquiry_status: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            enquiry_status: enquiryReportData?.enquiry_status ?? ""
        }))
    }, [enquiryReportData]);

    const updateEnquiryStatusData = (e) => {
        e.preventDefault();

        if(data?.enquiry_status != "") {
            put(route('admission_enquery_reg.update_enquiry_status', enquiryReportData?.id), {
                onSuccess: () => {
                    closeModal();

                    router.post(route("admission_enquery_reg.enquiry_report"), formData);
                }
            });
        }
        else {
            toast.error("Status is required.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }

    };

    const closeModal = () => {
        setEnquiryReportData({});
        setEnquiryStatusPopup(false);
        reset();
    };


    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={enquiryStatusPopup} onClose={closeModal}>
                <form onSubmit={updateEnquiryStatusData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Confirmation</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Enquiry No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.id}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Father Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{`${enquiryReportData?.father_first_name} ${enquiryReportData?.father_middle_name} ${enquiryReportData?.father_last_name}`}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Student Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{`${enquiryReportData?.first_name} ${enquiryReportData?.middle_name} ${enquiryReportData?.last_name}`}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Academic Year : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.academic_session}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Visitor Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.contact_name}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Mobile No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.father_mobile}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Class : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.class_title}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Enquiry Date : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{enquiryReportData?.enquiry_date_at}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="enquiry_status"
                                            value="Enquiry Status"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="enquiry_status"
                                    data_label="Status"
                                    data={enquiryStatusArray}
                                    value={
                                        data.enquiry_status
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "enquiry_status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.enquiry_status
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton type="button" className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill">Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
