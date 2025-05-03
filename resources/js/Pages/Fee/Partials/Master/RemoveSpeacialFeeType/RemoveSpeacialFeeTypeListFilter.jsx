import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const RemoveSpeacialFeeTypeListFilter = ({
    specialFeeTypes = [],
    classrooms = [],
    setFeeTypeId,
    sendClassNameIdToParent,
    sendClassRoomIdToParent,
    removeSpecialFeeType,
    studentIds = [],
    specialFeeAssignedStudents = [],
    setLoading,
    setSelectedStudentIds
}) => {

    const [classroomId, setClassroomId] = useState(null);
    const [classNameId, setClassNameId] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        fee_type_id: "",
        classroom_id: classroomId,
        class_name_id: classNameId,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId
        }));
    }, [classroomId]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: classNameId
        }));
    }, [classNameId]);


    const handleFeeTypeChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            fee_type_id: event.target.value
        }))

        setFeeTypeId(event.target.value)

        handleGetSpecialFeeAssignedStudents('fee_type_id', event)
    }


    const handleClassroomChange = (event) => {
        setClassroomId(event.target.value)
        setClassNameId(classrooms.filter((item) => item.id == event.target.value)[0]?.class_name_id)
        sendClassRoomIdToParent(event.target.value);
        sendClassNameIdToParent(classrooms.filter((item) => item.id == event.target.value)[0]?.class_name_id)
        setSelectedStudentIds([]);

        handleGetSpecialFeeAssignedStudents('classroom_id', event)
    }


    const specialFeeFilterData = (e) => {
        e.preventDefault();

        // post(route("school.save"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.landmarks_id) {
        //         //     reset("landmarks_id");
        //         //     landmarksInput.current.focus();
        //         // }
        //     },
        // });
    };

    const handleGetSpecialFeeAssignedStudents = (name, e) => {
        e.preventDefault();

        data[name] = e.target.value;

        setLoading(false);

        post(route("fee.remove_special_type"), data, {
            preserveScroll: true,
            // onSuccess: () => reset()
        });
    }


    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-admission-filtar-bar">
                <div className="educare-admission-filtar-bar-filter">
                    <form onSubmit={specialFeeFilterData}>
                        <div className="educare-admission-filtar-bar-count">
                            <span>Total: {Object.keys(specialFeeAssignedStudents).length}</span>
                        </div>
                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative flex flex-wrap items-end gap-2.5">
                            <div className="educare-select-field-styles">
                                <InputLabel htmlFor="fee_type_id" value="" />
                                <SelectInput
                                    id="fee_type_id"
                                    data_label="Fee Type"
                                    data={specialFeeTypes}
                                    value={data.fee_type_id}
                                    onChange={(e) => {
                                            handleFeeTypeChange(e)
                                        }
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.fee_type_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-select-field-styles">
                                <InputLabel htmlFor="classroom_id" value="" />
                                <SelectInput
                                    id="classroom_id"
                                    data_label="Class"
                                    data={classrooms}
                                    value={data.classroom_id}
                                    onChange={(e) => {
                                            handleClassroomChange(e)
                                        }
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.classroom_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="educare-select-field-styles">
                                <DangerButton
                                    // disabled={processing}
                                    className="educare-danger-btn-md-fill"
                                    type="button"
                                    onClick={(e) => {
                                        if (classNameId == null) {
                                            toast.error("Please select a class.", {
                                                position: 'top-right',
                                                autoClose: 1500,
                                            });
                                        }
                                        else if (studentIds.length <= 0) {
                                            toast.error("Please select at least one student.", {
                                                position: 'top-right',
                                                autoClose: 1500,
                                            });
                                        }
                                        else {
                                            removeSpecialFeeType(e, (studentIds.length > 0 ? [...studentIds]: []), data?.fee_type_id, classNameId);
                                        }
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i> Delete
                                </DangerButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RemoveSpeacialFeeTypeListFilter;
