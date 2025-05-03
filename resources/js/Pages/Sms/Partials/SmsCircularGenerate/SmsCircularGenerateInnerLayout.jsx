import { useState } from "react";
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsCircularGenerateleftSide from "./SmsCircularGenerateleftSide";
import SmsCircularGenerateRightSide from "./SmsCircularGenerateRightSide";

const SmsCircularGenerateInnerLayout = ({
    smsCirculars,
    students,
    staffs,
    classrooms
}) => {

    const [generatedData, setGeneratedData] = useState({});

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <SmsMenuCategory />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 xl:col-span-6">
                                <SmsCircularGenerateleftSide
                                    setGeneratedData={setGeneratedData}
                                    smsCirculars={smsCirculars}
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-6">
                                <SmsCircularGenerateRightSide
                                    generatedData={generatedData}
                                    students={students}
                                    staffs={staffs}
                                    classrooms={classrooms}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmsCircularGenerateInnerLayout;
