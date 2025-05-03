// import IdCardLogo from '../../../../../../../images/logo/logo-thumb-small.png';
import IdCardUserLogo from '../../../../../../../images/user/author.png';

const LandscapeIdCard = ({
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
                className="preview-id-card-wrapper landscape-wrapper"
                style={{ backgroundColor: idCardCertificateData?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top' }}
            >
                <div
                    className="preview-id-card-header min-h-[54px]"
                    style={{ backgroundColor: idCardCertificateData?.header?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.header_background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                >
                    <div className="id-card-info-wrapper w-full">
                        <h6
                            className={`header-school-title`}
                            style={headerSchoolTitleStyles}
                        >
                            {idCardCertificateData?.header?.school_title?.title ?? ""}
                        </h6>
                        <div className="id-card-info landscape-info">
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
                        <div className="id-card-logo logo-landscape !left-0">
                            <img src={idCardCertificateData?.school_logo ?? ""} alt="logo" />
                        </div>
                    </div>

                    {/* backup */}
                    {/* <div className="id-card-info-wrapper">
                        <h6 className='header-school-title'>LOHIA NAGAR MT. CARMEL HIGH SCHOOL</h6>
                        <div className="id-card-info landscape-info">
                            <p className='affiliate-text'>Affliated to ICSE & ISC,10+2 (New Dilhi)</p>
                            <span>DS/16, NEAR GAYATRI MANDIR, KANKARBAGH, PATNA-80020</span>
                            <span>PH. No,- 0612-2365534, Email Id- info@lmcgroup.com</span>
                            <span>Website- www.lmcpatna.com</span>
                        </div>
                        <div className="id-card-logo logo-landscape">
                            <img src={IdCardLogo} alt="logo" />
                        </div>
                    </div> */}
                </div>
                <div
                    className="landscape-card-body"
                    style={{ backgroundColor: idCardCertificateData?.body?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.body_background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                >
                    <h3 className='student-name'>Full Name</h3>
                    <div className="landscape-card-body">
                        <span className='landscape-img-rotet-text text-identity-landscape'>IDENTITY CARD</span>
                        <div className="student-img">
                            <div className="id-card-user-logo">
                                <img src={IdCardUserLogo} alt="" />
                            </div>
                            <div className="icon-drop prev-drop-icon">
                                <i className='icon-Drop icon-color-danger'></i>
                                <span className='blood-group prev-blood-group font-bold'>AB+</span>
                            </div>
                        </div>
                        <div className="student-info-wrapper-landscape">
                            <div className="preview-id-student-info landscape-student-info">
                                {idCardCertificateData?.column_data && Object.keys(idCardCertificateData?.column_data)?.length > 0 &&
                                    Object.values(idCardCertificateData?.column_data)?.filter(item => item?.key_name != 'student_name' && item?.key_name != 'blood_group')?.map((item, index) => (
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
                        {/* <div className="student-info-wrapper-landscape">
                            <div className="preview-id-student-info style-two">
                                <p className="student-info"><span className='info-name'>CLASS : </span> <span className='info-value'> X</span></p>
                                <p className="student-info"><span className='info-name'>SECTION : </span> <span className='info-value'> A</span></p>
                                <p className="student-info"><span className='info-name'>ROLL NO : </span> <span className='info-value'> 10</span></p>
                            </div>
                            <div className="preview-id-student-info landscape-student-info">
                                <p className="student-info"><span className='info-name'>D.O.B : </span> <span className='info-value'> 24-04-2001</span></p>
                                <p className="student-info info-father-name"><span className='info-name'>F.NAME : </span> <span className='info-value'> MANOJ SINGH</span></p>
                                <p className="student-info info-address"><span className='info-name'>ADDRESS : </span> <span className='info-value'> S.CHANDMARI ROAD, DRRAM GROUND SINGH PATH,KANKARBAGH, PATNA
                                </span></p>
                            </div>
                        </div> */}
                        <span className='landscape-img-rotet-text text-year-landscape'> {idCardCertificateData?.academic_session ?? ""}</span>
                        {/* backup */}
                        {/* <span className='landscape-img-rotet-text text-year-landscape'> 2023 - 24</span> */}
                    </div>
                </div>
                <div
                    className="preview-id-card-footer-landscape"
                    style={{ backgroundColor: idCardCertificateData?.footer?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.footer_background_image}")`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}
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
                            style={{width: '25px'}}
                            />
                            <span>Principle</span>
                        </p>
                    </div>

                    {/* backup */}
                    {/* <div className="footer-info">
                        <p className='mobile-no'>MOBILE NO : <span>8768766776</span></p>
                        <p className='principle'>Principle</p>
                    </div> */}
                </div>
            </div>
            {/*back page*/}
            {idCardCertificateData?.is_with_backpage == true &&
                <div
                    className="preview-id-card-wrapper-landscape"
                    style={{ backgroundColor: idCardCertificateData?.back_page?.background_color ?? "", backgroundImage: `url("${idCardCertificateData?.backpage_background_image}")`, backgroundPosition: 'center', backgroundPosition: 'center', }}
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
                        <div className="preview-id-student-info landscape-student-info">
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

export default LandscapeIdCard;
