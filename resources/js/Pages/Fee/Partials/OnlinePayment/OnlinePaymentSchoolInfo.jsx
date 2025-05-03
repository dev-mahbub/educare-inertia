// import logo from '../../../../../images/logo/logo-thumb.png'

const OnlinePaymentSchoolInfo = ({
    school,
    siteData
}) => {
    return (
        <>
            <div className="educare-common-card relative">
                <div className="bg-dark shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] py-[10px] maxXs:px-[15px]">
                    <div className="front-container relative">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-2 hidden lg:block">
                                <div className="school-logo h-[80px] w-[80px]">
                                    <img className="h-full" src={siteData?.schoolLogo ?? ''} alt="" />
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                <div className="flex justify-center items-center flex-col">
                                    <h2 className="text-[30px] text-lightest font-semibold text-center">{school?.title}</h2>
                                    <p className="text-white/90">{school?.street_address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="school-status-badge hidden lg:block">
                            ONLINE FEE PAYMENT
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnlinePaymentSchoolInfo;
