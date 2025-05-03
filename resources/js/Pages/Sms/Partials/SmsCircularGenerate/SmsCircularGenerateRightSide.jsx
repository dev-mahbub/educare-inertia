import SmsCircularGenerateSchool from './Partials/SmsCircularGenerateSchool';
import SmsCircularGenerateStaff from './Partials/SmsCircularGenerateStaff';
import SmsCircularGenerateStudent from './Partials/SmsCircularGenerateStudent';

const SmsCircularGenerateRightSide = ({
    generatedData,
    students,
    staffs,
    classrooms
}) => {
    return (
        <>
            {generatedData?.audience_type === 'Student' &&
                <SmsCircularGenerateStudent
                    generatedData={generatedData}
                    students={students}
                    classrooms={classrooms}
                />
            }

            {generatedData?.audience_type === 'Staff' &&
                <SmsCircularGenerateStaff
                    generatedData={generatedData}
                    staffs={staffs}
                />
            }

            {generatedData?.audience_type === 'School' &&
                <SmsCircularGenerateSchool
                    generatedData={generatedData}
                    staffs={staffs}
                />
            }
        </>
    );
};

export default SmsCircularGenerateRightSide;
