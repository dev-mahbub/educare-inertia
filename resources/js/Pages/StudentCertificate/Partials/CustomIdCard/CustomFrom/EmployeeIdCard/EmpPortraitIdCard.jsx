// import IdCardLogo from '../../../../../../../images/logo/logo-thumb-small.png';
import IdCardUserLogo from '../../../../../../../images/user/author.png';

const EmpPortraitIdCard = ({
    idCardCertificateData,
    headerSchoolTitleStyles,
    headerTitleTwoStyles,
    headerTitleThreeStyles,
    bodyLabelStyles,
    bodyValueStyles,
    footerTitleOneStyles,
    footerTitleTwoStyles,
    backpageTitleOneStyles,
    backpageTitleTwoStyles,
    backpageBodyLabelStyles,
    backpageBodyValueStyles,
    backpageTitleThreeStyles,
    backpageTitleFourStyles
}) => {
    return (
        <>
            <div
                className="preview-id-card-wrapper"
                style={{ backgroundColor: idCardCertificateData?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
            >
                <div
                    className="preview-id-card-header min-h-[61px]"
                    style={{ backgroundColor: idCardCertificateData?.header?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.header_background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                >
                    <div className="id-card-info-wrapper  w-full">
                        <h6
                            className={`header-school-title`}
                            style={headerSchoolTitleStyles}
                        >
                            {idCardCertificateData?.header?.school_title?.title ?? ""}
                        </h6>
                        <div className="id-card-info">
                            <p
                                className={`affiliate-text`}
                                style={headerTitleTwoStyles}
                            >
                                {idCardCertificateData?.header?.title_2?.title ?? ""}
                            </p>
                            <span
                                style={headerTitleThreeStyles}
                            >
                                {idCardCertificateData?.header?.title_3?.title ?? ""}
                            </span>
                        </div>
                        <div className="id-card-logo !left-0">
                            <img src={idCardCertificateData?.school_logo ?? ""} alt="logo" />
                        </div>
                    </div>
                    {/* backup */}
                    {/* <div className="id-card-info-wrapper">
                        <h6 className='header-school-title'>LOHIA NAGAR MT. CARMEL <br />HIGH SCHOOL</h6>
                        <div className="id-card-info">
                            <p className='affiliate-text'>Affliated to ICSE & ISC,10+2 (New Dilhi)</p>
                            <span>DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020</span>
                            <span>PH. No,- 0612-2365534, Email Id- info@lmcgroup.com</span>
                            <span>Website- www.lmcpatna.com</span>
                        </div>
                        <div className="id-card-logo">
                            <img src={IdCardLogo} alt="logo" />
                        </div>
                    </div> */}
                </div>
                <div style={{ backgroundImage: `url("${idCardCertificateData?.body_background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', backgroundColor: idCardCertificateData?.body?.background_color ?? "" }}>
                    <div
                        className="preview-id-card-img-wrapper"
                        // style={{ backgroundColor: idCardCertificateData?.body?.background_color ?? "" }}
                    >
                        <h5 className='employee-id-text'>Employee Id Card</h5>
                        <div className="body-img">
                            {/* <span className='body-img-rotet-text card-rotet-employee'>D No.-LMC/241</span> */}
                            <div className="id-card-user-logo employee-logo">
                                <img src={IdCardUserLogo} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="prev-id-card-student-name">
                        <h5>Full Name</h5>
                    </div>
                    <div
                        className="preview-id-student-info"
                        style={{ backgroundColor: idCardCertificateData?.body?.background_color ?? "" }}
                    >
                        {idCardCertificateData?.column_data && Object.keys(idCardCertificateData?.column_data)?.length > 0 &&
                            Object.values(idCardCertificateData?.column_data)?.filter(item => item?.key_name != 'student_name')?.map((item, index) => (
                                <p key={index} className="student-info">
                                    <span
                                        className={`info-name`}
                                        style={bodyLabelStyles}
                                    >{item?.label_name ?? ""} : </span>
                                </p>
                            ))
                        }
                    </div>
                </div>
                {/* backup */}
                {/* <div className="preview-id-student-info">
                    <p className="student-info"><span className='info-name'>DESIGNATION : </span> <span className='info-value'> SUPERVISOR</span></p>
                    <p className="student-info"><span className='info-name'>D.O.B : </span> <span className='info-value'> 02-12-1956</span></p>
                    <p className="student-info"><span className='info-name'>BLOOD GROUP : </span> <span className='info-value'> N/A</span></p>
                    <p className="student-info info-father-name"><span className='info-name'>F.NAME : </span> <span className='info-value'> AWADH KISHOR PRASAD</span></p>
                    <p className="student-info info-address"><span className='info-name'>ADDRESS : </span> <span className='info-value'> LOHIA NAGAR MT. CARMEL HIGH SCHOOL, NEAR GAYTRI MANDIR, KANKARBAGH, PATNA-20
                    </span></p>
                </div> */}
                <div
                    className="preview-id-card-footer"
                    style={{ backgroundColor: idCardCertificateData?.footer?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.footer_signature_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                >
                    <div className="footer-info">
                        <p
                            className={`mobile-no`}
                            style={footerTitleOneStyles}
                        >{idCardCertificateData?.footer?.title_1?.title ?? ""}
                            <span
                                style={footerTitleTwoStyles}
                            >
                                {idCardCertificateData?.footer?.title_2?.title ?? ""}
                            </span>
                        </p>
                        <p className='principle'>
                            <img src={idCardCertificateData?.footer_signature_image} alt=""
                                style={{ width: '30px' }}
                            />
                            Principle
                        </p>
                    </div>
                    {/* backup */}
                    {/* <div className="footer-info">
                        <p className='mobile-no'>MOBILE NO : <span>8768766776</span></p>
                        <p className='principle'>Principle</p>
                    </div> */}
                </div>
            </div>
            {/*back package*/}
            {idCardCertificateData?.is_with_backpage == true &&
                <div
                    className="preview-id-card-wrapper"
                    style={{ backgroundColor: idCardCertificateData?.back_page?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.backpage_background_image}")`, backgroundPosition: 'center', }}
                >
                    <div className="id-card-backpage">
                        <div className="instruction-title">
                            <p
                                style={backpageTitleOneStyles}
                            >{idCardCertificateData?.back_page?.title_1?.title ?? ""}</p>
                            <span
                                className={`instruction-desc`}
                                style={backpageTitleTwoStyles}
                            >{idCardCertificateData?.back_page?.title_2?.title ?? ""}</span>
                        </div>
                        <div className="preview-id-student-info">
                            {idCardCertificateData?.column_data && Object.keys(idCardCertificateData?.column_data)?.length > 0 &&
                                Object.values(idCardCertificateData?.column_data)?.filter(item => item?.is_with_backpage == true)?.map((item, index) => (
                                    <p key={index} className="student-info">
                                        <span
                                            className={`info-name`}
                                            style={backpageBodyLabelStyles}
                                        >{item?.label_name ?? ""} : </span>
                                    </p>
                                ))
                            }
                        </div>
                        <div className="instruction-note">
                            <p
                                className={`note-title`}
                                style={backpageTitleThreeStyles}
                            >{idCardCertificateData?.back_page?.title_3?.title ?? ""}</p>
                            <span
                                className={`note-desc`}
                                style={backpageTitleFourStyles}
                            >{idCardCertificateData?.back_page?.title_4?.title ?? ""}</span>
                        </div>
                    </div>
                    {/* backup */}
                    {/* <div className="id-card-backpage">
                        <div className="instruction-title">
                            <p>Important Instructions:</p>
                            <span className='instruction-desc'>For safety purpose this ID card must be produced</span>
                        </div>
                        <div className="instruction-note">
                            <p className='note-title'>Note: </p>
                            <span className='note-desc'>Please keep this ID safely and loss of the same should be reported to the school authorities immediately.</span>
                        </div>
                    </div> */}
                </div>
            }
        </>
    );
};

export default EmpPortraitIdCard;
