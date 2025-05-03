import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function ImprovePresenceForm({
    presenceSettings = [],
}) {
    const {
        data,
        setData,
        post,
        reset,
        processing,
    } = useForm({
        selected_data: presenceSettings,
    });

    const createImprovePresenceData = (e) => {
        e.preventDefault();
        post(route("mail_setting.improve_presence.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleSelectedData = (type, key, value) => {
        const isSelected = data?.selected_data?.some((item) => item.key === key);
        const updatedSelectedData = isSelected
            ? data.selected_data.map((item) =>
                item.key === key ? { ...item, value: value } : item
            )
            : [...data.selected_data, { type: type, key: key, value: value }];

        setData({
            ...data,
            selected_data: updatedSelectedData
        });
    };

    const getSelectedDataValue = (key) => {
        const selectedItem = data?.selected_data?.find(item => item.key === key);
        return selectedItem ? selectedItem.value : '';
    };

    useEffect(() => {
        setData({
            ...data,
            selected_data: presenceSettings
        })
    }, [presenceSettings]);

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={createImprovePresenceData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Forgot Password
                                    </h5>
                                    <Link
                                        href={route('password.request')}
                                        className="educare-secondary-btn-sm-stroke"
                                    >
                                        Preview
                                    </Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="forgot_password_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="forgot_password_title"
                                                    value={getSelectedDataValue('forgot_password_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'forgot_password_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="forgot_password_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="forgot_password_description"
                                                    value={getSelectedDataValue('forgot_password_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'forgot_password_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="forgot_password_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="forgot_password_keyword"
                                                    value={getSelectedDataValue('forgot_password_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'forgot_password_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Login Request
                                    </h5>
                                    <Link href="#" className="educare-secondary-btn-sm-stroke">Preview</Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="login_request_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="login_request_title"
                                                    value={getSelectedDataValue('login_request_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'login_request_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="login_request_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="login_request_description"
                                                    value={getSelectedDataValue('login_request_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'login_request_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="login_request_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="login_request_keyword"
                                                    value={getSelectedDataValue('login_request_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'login_request_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Contact Us
                                    </h5>
                                    <Link href="#" className="educare-secondary-btn-sm-stroke">Preview</Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="contact_us_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="contact_us_title"
                                                    value={getSelectedDataValue('contact_us_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'contact_us_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="contact_us_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="contact_us_description"
                                                    value={getSelectedDataValue('contact_us_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'contact_us_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="contact_us_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="contact_us_keyword"
                                                    value={getSelectedDataValue('contact_us_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'contact_us_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Parent FeedBack
                                    </h5>
                                    <Link
                                        href={route('support_ticket.parent_feedback')}
                                        className="educare-secondary-btn-sm-stroke"
                                    >
                                        Preview
                                    </Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="parent_feedback_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="parent_feedback_title"
                                                    value={getSelectedDataValue('parent_feedback_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'parent_feedback_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="parent_feedback_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="parent_feedback_description"
                                                    value={getSelectedDataValue('parent_feedback_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'parent_feedback_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="parent_feedback_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="parent_feedback_keyword"
                                                    value={getSelectedDataValue('parent_feedback_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'parent_feedback_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Payment
                                    </h5>
                                    <Link
                                        href={route('fee_online_payment.index')}
                                        className="educare-secondary-btn-sm-stroke"
                                    >
                                        Preview
                                    </Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="payment_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="payment_title"
                                                    value={getSelectedDataValue('payment_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'payment_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="payment_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="payment_description"
                                                    value={getSelectedDataValue('payment_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'payment_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="payment_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="payment_keyword"
                                                    value={getSelectedDataValue('payment_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'payment_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-info"></i>
                                        Generate Transfer Certificate
                                    </h5>
                                    <Link href="#" className="educare-secondary-btn-sm-stroke">Preview</Link>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="generate_transfer_certificate_title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="generate_transfer_certificate_title"
                                                    value={getSelectedDataValue('generate_transfer_certificate_title')}
                                                    onChange={(e) => handleSelectedData('Presence', 'generate_transfer_certificate_title', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="generate_transfer_certificate_description"
                                                            value="Description"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="generate_transfer_certificate_description"
                                                    value={getSelectedDataValue('generate_transfer_certificate_description')}
                                                    onChange={(e) => handleSelectedData('Presence', 'generate_transfer_certificate_description', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="generate_transfer_certificate_keyword"
                                                            value="Keyword"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextareaInput
                                                    id="generate_transfer_certificate_keyword"
                                                    value={getSelectedDataValue('generate_transfer_certificate_keyword')}
                                                    onChange={(e) => handleSelectedData('Presence', 'generate_transfer_certificate_keyword', e.target.value)}
                                                    className="block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-[30px] text-end">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                        type="submit"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
