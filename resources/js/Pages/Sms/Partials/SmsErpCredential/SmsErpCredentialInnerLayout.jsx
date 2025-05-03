import { useForm } from '@inertiajs/react';
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsErpCredentialForm from './SmsErpCredentialForm';
import SmsErpCredentialList from './SmsErpCredentialList';

const SmsErpCredentialInnerLayout = ({
    audienceTypes,
    classrooms,
    students,
    teachers,
    boardingTypes,
    alumnies,
    vehicleStaffs
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        audience_type: "",
        recipient_type: "class_wise",
        boarding_type: "",
        classroom_id: "",
        selected_ids: [],

        // parents
        search: "",
        classCheck: [],
        student_ids: [],
        classroom_ids: []
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-5">
                            <SmsErpCredentialForm
                                audienceTypes={audienceTypes}
                                data={data}
                                setData={setData}
                                reset={reset}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <SmsErpCredentialList
                                data={data}
                                setData={setData}
                                classrooms={classrooms}
                                students={students}
                                teachers={teachers}
                                boardingTypes={boardingTypes}
                                alumnies={alumnies}
                                vehicleStaffs={vehicleStaffs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmsErpCredentialInnerLayout;
