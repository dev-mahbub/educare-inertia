import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import CustomFromBackPage from './CustomFromBackPage';
import CustomFromBody from './CustomFromBody';
import CustomFromFooter from './CustomFromFooter';
import CustomFromHeader from './CustomFromHeader';
import CustomFromTopHeader from './CustomFromTopHeader';
import EmpLandscapeIdCard from './EmployeeIdCard/EmpLandscapeIdCard';
import EmpPortraitIdCard from './EmployeeIdCard/EmpPortraitIdCard';
import GenerateCardPopup from './GenerateCardPopup/GenerateCardPopup';
import LandscapeIdCard from './StudentIdCard/LandscapeIdCard';
import PortraitIdCard from './StudentIdCard/PortraitIdCard';


const CustomFromMain = ({
    classrooms,
    headerData,
    setHeaderData,
    bodyData,
    setBodyData,
    footerData,
    setFooterData,
    backpageData,
    setBackpageData,
    data,
    setData,
    idCardCertificateData,
    students,
    handleUploadBackgroundImage,
    fontSizeArray,
    staffs,
    handleDeleteBackgroundImage
}) => {
    const [previewIdCard, setPreviewIdCard] = useState(false);

    const handlePreviewIdCard = (e) => {
        e.preventDefault();

        if (idCardCertificateData?.id != "") {
            setPreviewIdCard(true);
        }
        else {
            setPreviewIdCard(false);
        }

        // router.post(route('student_certificate.custom_id_card'), { template_id: idCardCertificateData?.id ?? "" }, {
        //     onSuccess: () =>{
        //         setPreviewIdCard(true);
        //     },
        //     onError: () => {
        //         setPreviewIdCard(false);
        //     }
        // });
    }

    //generate card popup
    const [generateCardPopup, setGenerateCardPopup] = useState(false);
    const handleGenerateCardPopupClick = () => {
        setGenerateCardPopup(!generateCardPopup);
    };

    const handleUpddateCertificate = (e) => {
        e.preventDefault();

        router.post(route('student_certificate.custom_id_card.update', idCardCertificateData?.id), { _method: "put", ...data }, {
            onSuccess: () => {
                const form_data = {
                    template_id: idCardCertificateData?.id
                }

                router.post(route('student_certificate.custom_id_card'), form_data);
            }
        });
    }


    //header style start
    //school title
    const headerSchoolTitleStyles = {
        fontWeight: idCardCertificateData?.header?.school_title?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.header?.school_title?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.header?.school_title?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.header?.school_title?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.header?.school_title?.text_align ?? '',
        fontSize: (idCardCertificateData?.header?.school_title?.font_size ?? "") + 'px',
        color: idCardCertificateData?.header?.school_title?.color ?? ""
    }

    // title 2
    const headerTitleTwoStyles = {
        fontWeight: idCardCertificateData?.header?.title_2?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.header?.title_2?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.header?.title_2?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.header?.title_2?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.header?.title_2?.text_align ?? '',
        fontSize: (idCardCertificateData?.header?.title_2?.font_size ?? "") + 'px',
        color: idCardCertificateData?.header?.title_2?.color ?? ""
    }

    // title 3
    const headerTitleThreeStyles = {
        fontWeight: idCardCertificateData?.header?.title_3?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.header?.title_3?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.header?.title_3?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.header?.title_3?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.header?.title_3?.text_align ?? '',
        fontSize: (idCardCertificateData?.header?.title_3?.font_size ?? "") + 'px',
        color: idCardCertificateData?.header?.title_3?.color ?? ""
    }

    //header style end

    //body style start
    //body label
    const bodyLabelStyles = {
        fontWeight: idCardCertificateData?.body?.body_label?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.body?.body_label?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.body?.body_label?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.body?.body_label?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.body?.body_label?.text_align ?? '',
        fontSize: (idCardCertificateData?.body?.body_label?.font_size ?? "") + 'px',
        color: idCardCertificateData?.body?.body_label?.color ?? ""
    }

    // body value
    const bodyValueStyles = {
        fontWeight: idCardCertificateData?.body?.body_value?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.body?.body_value?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.body?.body_value?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.body?.body_value?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.body?.body_value?.text_align ?? '',
        fontSize: (idCardCertificateData?.body?.body_value?.font_size ?? "") + 'px',
        color: idCardCertificateData?.body?.body_value?.color ?? ""
    }
    //body style end


    //footer style start
    // title 1
    const footerTitleOneStyles = {
        fontWeight: idCardCertificateData?.footer?.title_1?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.footer?.title_1?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.footer?.title_1?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.footer?.title_1?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.footer?.title_1?.text_align ?? '',
        fontSize: (idCardCertificateData?.footer?.title_1?.font_size ?? "") + 'px',
        color: idCardCertificateData?.footer?.title_1?.color ?? ""
    }

    // title 2
    const footerTitleTwoStyles = {
        fontWeight: idCardCertificateData?.footer?.title_2?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.footer?.title_2?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.footer?.title_2?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.footer?.title_2?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.footer?.title_2?.text_align ?? '',
        fontSize: (idCardCertificateData?.footer?.title_2?.font_size ?? "") + 'px',
        color: idCardCertificateData?.footer?.title_2?.color ?? ""
    }
    //footer style end

    //backpage style start
    // title 1
    const backpageTitleOneStyles = {
        fontWeight: idCardCertificateData?.back_page?.title_1?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.title_1?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.title_1?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.title_1?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.title_1?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.title_1?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.title_1?.color ?? ""
    }

    // title 2
    const backpageTitleTwoStyles = {
        fontWeight: idCardCertificateData?.back_page?.title_2?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.title_2?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.title_2?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.title_2?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.title_2?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.title_2?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.title_2?.color ?? ""
    }

    // body label
    const backpageBodyLabelStyles = {
        fontWeight: idCardCertificateData?.back_page?.body_label?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.body_label?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.body_label?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.body_label?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.body_label?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.body_label?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.body_label?.color ?? ""
    }

    // body value
    const backpageBodyValueStyles = {
        fontWeight: idCardCertificateData?.back_page?.body_value?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.body_value?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.body_value?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.body_value?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.body_value?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.body_value?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.body_value?.color ?? ""
    }

    // title 3
    const backpageTitleThreeStyles = {
        fontWeight: idCardCertificateData?.back_page?.title_3?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.title_3?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.title_3?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.title_3?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.title_3?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.title_3?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.title_3?.color ?? ""
    }

    // title 4
    const backpageTitleFourStyles = {
        fontWeight: idCardCertificateData?.back_page?.title_4?.font_weight_bold ? 700 : 500,
        fontStyle: idCardCertificateData?.back_page?.title_4?.font_style_italic ? 'italic' : '',
        textDecoration: idCardCertificateData?.back_page?.title_4?.text_decoration_linethrough ? 'line-through' : (idCardCertificateData?.back_page?.title_4?.text_decoration_underline ? 'underline' : ''),
        textAlign: idCardCertificateData?.back_page?.title_4?.text_align ?? '',
        fontSize: (idCardCertificateData?.back_page?.title_4?.font_size ?? "") + 'px',
        color: idCardCertificateData?.back_page?.title_4?.color ?? ""
    }
    //backpage style end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-9">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            {/* custom header top*/}
                            <CustomFromTopHeader
                                data={data}
                                setData={setData}
                                handleUploadBackgroundImage={handleUploadBackgroundImage}
                                handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                            />

                            {/* custom header*/}
                            <CustomFromHeader
                                headerData={headerData}
                                setHeaderData={setHeaderData}
                                data={data}
                                setData={setData}
                                handleUploadBackgroundImage={handleUploadBackgroundImage}
                                fontSizeArray={fontSizeArray}
                                handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                            />

                            {/* custom Body*/}
                            <CustomFromBody
                                bodyData={bodyData}
                                setBodyData={setBodyData}
                                data={data}
                                setData={setData}
                                handleUploadBackgroundImage={handleUploadBackgroundImage}
                                fontSizeArray={fontSizeArray}
                                handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                            />

                            {/* custom Footer*/}
                            <CustomFromFooter
                                footerData={footerData}
                                setFooterData={setFooterData}
                                data={data}
                                setData={setData}
                                handleUploadBackgroundImage={handleUploadBackgroundImage}
                                fontSizeArray={fontSizeArray}
                                handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                            />

                            {/* custom from back page*/}
                            {data?.is_with_backpage == true &&
                                <CustomFromBackPage
                                    backpageData={backpageData}
                                    setBackpageData={setBackpageData}
                                    data={data}
                                    setData={setData}
                                    handleUploadBackgroundImage={handleUploadBackgroundImage}
                                    fontSizeArray={fontSizeArray}
                                    handleDeleteBackgroundImage={handleDeleteBackgroundImage}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-3">
                    <div className="flex flex-wrap gap-1 justify-between">
                        <SuccessButton
                            // disabled={processing}
                            className="educare-secondary-btn-md-fill fix-btn-width"
                            onClick={handleUpddateCertificate}
                        >
                            Save
                        </SuccessButton>
                        <SuccessButton
                            // disabled={processing}
                            className="educare-success-btn-md-fill fix-btn-width"
                            onClick={handlePreviewIdCard}
                        >
                            Preview
                        </SuccessButton>
                        <PrimaryButton
                            // disabled={processing}
                            className="educare-primary-btn-md-fill fix-btn-width"
                            onClick={handleGenerateCardPopupClick}
                        >
                            Generate
                        </PrimaryButton>
                    </div>
                    {
                       idCardCertificateData?.id != null && previewIdCard ? (
                            <>
                                {(idCardCertificateData?.audience_type == 'Student' && idCardCertificateData?.orientation == 'Portrait') &&
                                    <PortraitIdCard
                                        idCardCertificateData={idCardCertificateData}
                                        headerSchoolTitleStyles={headerSchoolTitleStyles}
                                        headerTitleTwoStyles={headerTitleTwoStyles}
                                        headerTitleThreeStyles={headerTitleThreeStyles}
                                        bodyLabelStyles={bodyLabelStyles}
                                        bodyValueStyles={bodyValueStyles}
                                        footerTitleOneStyles={footerTitleOneStyles}
                                        footerTitleTwoStyles={footerTitleTwoStyles}
                                        backpageTitleOneStyles={backpageTitleOneStyles}
                                        backpageTitleTwoStyles={backpageTitleTwoStyles}
                                        backpageBodyLabelStyles={backpageBodyLabelStyles}
                                        backpageBodyValueStyles={backpageBodyValueStyles}
                                        backpageTitleThreeStyles={backpageTitleThreeStyles}
                                        backpageTitleFourStyles={backpageTitleFourStyles}
                                    />
                                }

                                {(idCardCertificateData?.audience_type == 'Student' && idCardCertificateData?.orientation == 'Landscape') &&
                                    <LandscapeIdCard
                                        idCardCertificateData={idCardCertificateData}
                                        headerSchoolTitleStyles={headerSchoolTitleStyles}
                                        headerTitleTwoStyles={headerTitleTwoStyles}
                                        headerTitleThreeStyles={headerTitleThreeStyles}
                                        bodyLabelStyles={bodyLabelStyles}
                                        bodyValueStyles={bodyValueStyles}
                                        footerTitleOneStyles={footerTitleOneStyles}
                                        footerTitleTwoStyles={footerTitleTwoStyles}
                                        backpageTitleOneStyles={backpageTitleOneStyles}
                                        backpageTitleTwoStyles={backpageTitleTwoStyles}
                                        backpageBodyLabelStyles={backpageBodyLabelStyles}
                                        backpageBodyValueStyles={backpageBodyValueStyles}
                                        backpageTitleThreeStyles={backpageTitleThreeStyles}
                                        backpageTitleFourStyles={backpageTitleFourStyles}
                                    />
                                }

                                {(idCardCertificateData?.audience_type == 'Teacher' && idCardCertificateData?.orientation == 'Portrait') &&
                                    <EmpPortraitIdCard
                                        idCardCertificateData={idCardCertificateData}
                                        headerSchoolTitleStyles={headerSchoolTitleStyles}
                                        headerTitleTwoStyles={headerTitleTwoStyles}
                                        headerTitleThreeStyles={headerTitleThreeStyles}
                                        bodyLabelStyles={bodyLabelStyles}
                                        bodyValueStyles={bodyValueStyles}
                                        footerTitleOneStyles={footerTitleOneStyles}
                                        footerTitleTwoStyles={footerTitleTwoStyles}
                                        backpageTitleOneStyles={backpageTitleOneStyles}
                                        backpageTitleTwoStyles={backpageTitleTwoStyles}
                                        backpageBodyLabelStyles={backpageBodyLabelStyles}
                                        backpageBodyValueStyles={backpageBodyValueStyles}
                                        backpageTitleThreeStyles={backpageTitleThreeStyles}
                                        backpageTitleFourStyles={backpageTitleFourStyles}
                                    />
                                }

                                {(idCardCertificateData?.audience_type == 'Teacher' && idCardCertificateData?.orientation == 'Landscape') &&
                                    <EmpLandscapeIdCard
                                        idCardCertificateData={idCardCertificateData}
                                        headerSchoolTitleStyles={headerSchoolTitleStyles}
                                        headerTitleTwoStyles={headerTitleTwoStyles}
                                        headerTitleThreeStyles={headerTitleThreeStyles}
                                        bodyLabelStyles={bodyLabelStyles}
                                        bodyValueStyles={bodyValueStyles}
                                        footerTitleOneStyles={footerTitleOneStyles}
                                        footerTitleTwoStyles={footerTitleTwoStyles}
                                        backpageTitleOneStyles={backpageTitleOneStyles}
                                        backpageTitleTwoStyles={backpageTitleTwoStyles}
                                        backpageBodyLabelStyles={backpageBodyLabelStyles}
                                        backpageBodyValueStyles={backpageBodyValueStyles}
                                        backpageTitleThreeStyles={backpageTitleThreeStyles}
                                        backpageTitleFourStyles={backpageTitleFourStyles}
                                    />
                                }

                                {/*old code */}
                                {/* <div className="preview-id-card-wrapper">
                                    <div className="preview-id-card-header">
                                        <div className="id-card-logo">
                                            <img src={IdCardLogo} alt="logo" />
                                        </div>
                                        <div className="id-card-info">
                                            <h6 className='header-school-title'>School Title</h6>
                                            <p className='header-title'>Title 2</p>
                                        </div>
                                    </div>
                                    <div className="preview-id-card-body">
                                        <div className="body-img">
                                            <p className='id-card-body-title'>Title 3</p>
                                            <div className="id-card-user-logo">
                                                <img src={IdCardUserLogo} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="preview-id-student-info">
                                        <p className="student-info"><span className='info-name'>Student Name :</span> <span className='info-value'>Johnathan Week</span></p>
                                        <p className="student-info"><span className='info-name'>Admission Number :</span> <span className='info-value'>7657657765</span></p>
                                        <p className="student-info"><span className='info-name'>Class Name :</span> <span className='info-value'>VII</span></p>
                                    </div>
                                    <div className="preview-id-card-footer">
                                        <div className="footer-info">
                                            <p>Principle</p>
                                        </div>
                                    </div>
                                </div> */}
                            </>
                        ) : ''
                    }
                </div>
            </div>
            <GenerateCardPopup
                generateCardPopup={generateCardPopup}
                setGenerateCardPopup={setGenerateCardPopup}
                classrooms={classrooms}
                idCardCertificateData={idCardCertificateData}
                students={students}
                staffs={staffs}
            />
        </>
    );
};

export default CustomFromMain;
