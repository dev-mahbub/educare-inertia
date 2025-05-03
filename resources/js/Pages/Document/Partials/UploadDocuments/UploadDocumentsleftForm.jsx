import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { router } from '@inertiajs/react';

const UploadDocumentsleftForm = ({
    userTypes,
    teachers,
    classrooms,
    students,
    statusArray,
    setFilteredCategories,
    // studentDocumentCategories,
    // teacherDocumentCategories,
    documentCategories,
    data,
    setData,
    errors,
    drivers
}) => {

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    // handle change user type start
    const handleChangeAudienceType = (type) => {
        setData((prevData) => ({
            ...prevData,
            audience_type: type
        }));

        // setFilteredCategories(type == 'Student' ? studentDocumentCategories : type == 'Teacher' ? teacherDocumentCategories : []);
        setFilteredCategories(documentCategories?.filter(item => item?.type == type));
    }
    // handle change user type end

    // handle classroom change start
    const handleClassroomChange = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id
        }));

        const form_data = {
            classroom_id: id,
            student_status: data?.student_status
        }

        router.post(route('document.create'), form_data);
    }
    // handle classroom change end

    // handle status change start
    const handleStatusChange = (status) => {
        setData((prevData) => ({
            ...prevData,
            student_status: status
        }));

        if (data?.classroom_id) {
            const form_data = {
                classroom_id: data?.classroom_id,
                student_status: status
            }

            router.post(route('document.create'), form_data);
        }
    }
    // handle status change end


    return (
        <>
            <div className="educare-class-form-box-wrapper">
                <div className="educare-create-school-details-form-wrap">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-upload"></i>
                            Upload documents
                        </h5>
                    </div>
                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                        <form onSubmit={handleAdmissionSourceData}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="User Type"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            data_label="User Type"
                                            data={userTypes}
                                            value={
                                                data.audience_type
                                            }
                                            onChange={(e) =>
                                                handleChangeAudienceType(e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.audience_type
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {/*select school*/}
                                {
                                    data.audience_type === "School" ? (
                                        <div className="col-span-12 hidden">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Type"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    data_label="Type"
                                                    data={[]}
                                                    value={
                                                        data.select_type
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "select_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.select_type
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    ) : ("")
                                }
                                {/*select Teacher*/}
                                {
                                    data.audience_type === "Teacher" ? (
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Teachers"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    data_label="Teacher"
                                                    data={teachers}
                                                    value={
                                                        data.teacher_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "teacher_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.teacher_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    ) : ""
                                }
                                {/*select Driver*/}
                                {
                                    data.audience_type === "Driver" ? (
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Driver"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <SelectInput
                                                    data_label="Driver"
                                                    data={drivers}
                                                    value={
                                                        data.driver_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "driver_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.driver_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    ) : ""
                                }
                                {/*select Student start*/}
                                {
                                    data.audience_type === "Student" ? (
                                        <>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Class Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={
                                                            data.classroom_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassroomChange(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.classroom_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Status"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Status"
                                                        data={statusArray}
                                                        value={
                                                            data.student_status
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Student"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Student"
                                                        data={students}
                                                        value={
                                                            data.student_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.student_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : ""
                                }
                                {/*select Student end*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadDocumentsleftForm;
