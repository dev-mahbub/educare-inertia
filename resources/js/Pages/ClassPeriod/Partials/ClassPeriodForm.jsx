import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import ClassPeriodFirstHalf from './ClassPeriodFirstHalf';
import ClassPeriodSecondHalf from './ClassPeriodSecondHalf';

export default function ClassPeriodForm({
    className = "",
    schoolShifts,
    schoolPeriods,
    classrooms,
    classroomPeriods
}) {

    const firstHalfSchoolPeriods = schoolPeriods?.filter(item => item.type == 'First Half');
    const secondHalfSchoolPeriods = schoolPeriods?.filter(item => item.type == 'Second Half');
    const firstHalfClassroomPeriods = classroomPeriods?.filter(item => item.type == 'First Half');
    const secondHalClassroomPeriods = classroomPeriods?.filter(item => item.type == 'Second Half');

    const [classroomsWithoutPeriod, setClassroomsWithoutPeriod] = useState([]);
    const [classroomsWithPeriod, setClassroomsWithPeriod] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
        school_shift_id: "",
        without_period_classroom_ids: [],
        with_period_classroom_ids: [],
        copy_period: "",
        copy_and_reset_period: "",
        copy_select_all: false,
        copy_and_reset_select_all: false
    });

    useEffect(() => {
        setClassroomsWithoutPeriod(classrooms?.filter(item => data?.classroom_id && data?.classroom_id != item?.id && data?.school_shift_id && item?.has_period == false));
        setClassroomsWithPeriod(classrooms?.filter(item => data?.classroom_id && data?.classroom_id != item?.id && data?.school_shift_id && item?.has_period == true));
    },[classrooms, data.classroom_id, data.school_shift_id]);

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: value
        }));

        if (data?.school_shift_id) {
            const form_data = {
                classroom_id: value,
                school_shift_id: data?.school_shift_id
            }

            router.post(route('classroom_period.create'), form_data);
        }
    }
    // handle change class end

    // handle change school shift start
    const handleChangeSchoolShift = (value) => {
        setData((prevData) => ({
            ...prevData,
            school_shift_id: value
        }));

        if (data?.classroom_id) {
            const form_data = {
                classroom_id: data?.classroom_id,
                school_shift_id: value
            }

            router.post(route('classroom_period.create'), form_data);
        }
    }
    // handle change school shift end


    // convert time string to local date start
    function convertToLocalDate(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const currentDate = new Date();

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate;
    }
    // convert time string to local date end

    // convert time string to local time start
    function convertToLocaleTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const currentDate = new Date();

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // convert time string to local time end

    // Handle checkbox selection
    const handleCopyTimeTable = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedClassId = [...data.without_period_classroom_ids];

        if (name === "copy_select_all") {
            newFormData.copy_select_all = value;

            if (value) {
                newCheckedClassId = classroomsWithoutPeriod.map(item => item.id);
            } else {
                newCheckedClassId = [];
            }

            newFormData.without_period_classroom_ids = newCheckedClassId;
        } else {
            if (value) {
                newCheckedClassId.push(id);
            } else {
                newCheckedClassId = newCheckedClassId.filter(checkedId => checkedId !== id);
            }

            newFormData.without_period_classroom_ids = newCheckedClassId;
            newFormData.copy_select_all = classroomsWithoutPeriod?.length > 0 && newCheckedClassId.length === classroomsWithoutPeriod.length;
        }

        setData(newFormData);
    };

    // Handle checkbox selection
    const handleCopyAndResetTimeTable = (name, value, id) => {
        let newFormData = { ...data };
        let newCheckedClassResetId = [...data.with_period_classroom_ids];

        if (name === "copy_and_reset_select_all") {
            newFormData.copy_and_reset_select_all = value;

            if (value) {
                newCheckedClassResetId = classroomsWithPeriod.map(item => item.id);
            } else {
                newCheckedClassResetId = [];
            }

            newFormData.with_period_classroom_ids = newCheckedClassResetId;
        } else {
            if (value) {
                newCheckedClassResetId.push(id);
            } else {
                newCheckedClassResetId = newCheckedClassResetId.filter(checkedId => checkedId !== id);
            }

            newFormData.with_period_classroom_ids = newCheckedClassResetId;
            newFormData.copy_and_reset_select_all = classroomsWithPeriod?.length > 0 && newCheckedClassResetId.length === classroomsWithPeriod.length;
        }

        setData(newFormData);
    };

    // handle cancel copy start
    const handleCancelCopy = (e) => {
        e.preventDefault();

        setData((prevData) => ({
            ...prevData,
            without_period_classroom_ids: [],
            copy_period: "",
            copy_select_all: false
        }));
    }
    // handle cancel copy end

    // handle cancel copy start
    const handleCancelCopyAndReset = (e) => {
        e.preventDefault();

        setData((prevData) => ({
            ...prevData,
            with_period_classroom_ids: [],
            copy_and_reset_period: "",
            copy_and_reset_select_all: false
        }));
    }
    // handle cancel copy end

    // handle delete classroom period start
    const handleDeleteClassroomPeriod = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('classroom_period.delete', id), {
                    onFinish: () => {
                        const form_data = {
                            classroom_id: data?.classroom_id,
                            school_shift_id: data?.school_shift_id
                        }

                        router.post(route('classroom_period.create'), form_data);
                    }
                });
            }
        });
    }
    // handle delete classroom period end

    // handle copy classroom period start
    const handleCopyClassroomPeriod = (e) => {
        e.preventDefault();

        if(data?.copy_period == true) {
            if (!data?.classroom_id) {
                toast.error("Please select class.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            } else if (!data?.school_shift_id) {
                toast.error("Please select shift.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else if (data?.without_period_classroom_ids?.length == 0) {
                toast.error("Please select at least one class.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            } else {
                const form_data = {
                    classroom_id: data?.classroom_id,
                    school_shift_id: data?.school_shift_id,
                    classroom_ids: data?.without_period_classroom_ids
                }

                router.post(route('classroom_period.copy'), form_data, {
                    onSuccess: () => {
                        setData((prevData) => ({
                            ...prevData,
                            without_period_classroom_ids: [],
                            copy_period: "",
                            copy_select_all: false
                        }));
                    },
                    onFinish: () => {
                        router.post(route('classroom_period.create'), {
                            classroom_id: data?.classroom_id,
                            school_shift_id: data?.school_shift_id
                        });
                    }
                });
            }
        }
    }
    // handle copy classroom period end

    // handle copy and reset classroom period start
    const handleCopyAndResetClassroomPeriod = (e) => {
        e.preventDefault();

        if(data?.copy_and_reset_period == true) {
            if (!data?.classroom_id) {
                toast.error("Please select class.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            } else if (!data?.school_shift_id) {
                toast.error("Please select shift.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            }
            else if (data?.with_period_classroom_ids?.length == 0) {
                toast.error("Please select at least one class.", {
                    position: 'top-right',
                    autoClose: 1500,
                });
            } else {
                const form_data = {
                    classroom_id: data?.classroom_id,
                    school_shift_id: data?.school_shift_id,
                    classroom_ids: data?.with_period_classroom_ids
                }

                router.post(route('classroom_period.copy_reset'), form_data, {
                    onSuccess: () => {
                        setData((prevData) => ({
                            ...prevData,
                            with_period_classroom_ids: [],
                            copy_and_reset_period: "",
                            copy_and_reset_select_all: false
                        }));
                    },
                    onFinish: () => {
                        router.post(route('classroom_period.create'), {
                            classroom_id: data?.classroom_id,
                            school_shift_id: data?.school_shift_id
                        });
                    }
                });
            }
        }
    }
    // handle copy and reset classroom period end


    return (
        <div className="educare-master-create-periods-area maxXs:p-[15px] rounded-[10px]">
            <form>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="school-periods-select-item-wrapper py-[30px] px-[30px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            data_label="Class"
                                            data={classrooms}
                                            value={data.classroom_id}
                                            onChange={(e) =>
                                                handleChangeClass(e.target.value)
                                            }
                                            type="text"
                                            className="mt-1 block w-full"
                                        />

                                        <InputError
                                            message={errors.classroom_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            data_label="Shift"
                                            data={schoolShifts}
                                            value={data.school_shift_id}
                                            onChange={(e) =>
                                                handleChangeSchoolShift(e.target.value)
                                            }
                                            type="text"
                                            className="mt-1 block w-full"
                                        />

                                        <InputError
                                            message={errors.school_shift_id}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <ClassPeriodFirstHalf
                            convertToLocaleTime={convertToLocaleTime}
                            schoolPeriods={firstHalfSchoolPeriods}
                            classroomPeriods={firstHalfClassroomPeriods}
                            formData={data}
                            handleDeleteClassroomPeriod={handleDeleteClassroomPeriod}
                        />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <ClassPeriodSecondHalf
                            convertToLocaleTime={convertToLocaleTime}
                            schoolPeriods={secondHalfSchoolPeriods}
                            classroomPeriods={secondHalClassroomPeriods}
                            formData={data}
                            handleDeleteClassroomPeriod={handleDeleteClassroomPeriod}
                        />
                    </div>
                    <div className="col-span-12">
                        <div className="educare-master-create-school-periods-wrapper py-[30px] px-[30px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                            <div>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="copy_period"
                                            name="copy_period"
                                            checked={
                                                data.copy_period
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "copy_period",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="copy_period"
                                            value="Copy this to other class"
                                        />
                                    </div>
                                </div>
                                {
                                    data?.copy_period ? (
                                        <div className="my-5">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="copy_select_all"
                                                        name="copy_select_all"
                                                        checked={data.copy_select_all || false}
                                                        onChange={(e) =>
                                                            handleCopyTimeTable(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="copy_select_all"
                                                        value="All"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-5 mt-1">
                                                {
                                                    classroomsWithoutPeriod.map((item, i) => (
                                                        <div key={i} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"class_" + item.id}
                                                                    checked={data.without_period_classroom_ids.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleCopyTimeTable(e.target.name, e.target.checked, item.id)
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={"class_" + item.id}
                                                                    value={item.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                <PrimaryButton
                                                    className="educare-primary-btn-md-fill"
                                                    type="button"
                                                    onClick={handleCopyClassroomPeriod}
                                                >
                                                    Copy
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    className="educare-gray-btn-md-stroke"
                                                    type="button"
                                                    onClick={handleCancelCopy}
                                                >
                                                    Cancel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                            <div>
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="copy_and_reset_period"
                                            name="copy_and_reset_period"
                                            checked={
                                                data.copy_and_reset_period
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "copy_and_reset_period",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-master-create-list-title">
                                        <p className="text-danger">Copy and remove time table(please check this option only when you need to reset existing timetable)</p>
                                    </div>
                                </div>
                                {
                                    data?.copy_and_reset_period ? (
                                        <div className="my-5">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="copy_and_reset_select_all"
                                                        name="copy_and_reset_select_all"
                                                        checked={data.copy_and_reset_select_all || false}
                                                        onChange={(e) =>
                                                            handleCopyAndResetTimeTable(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="copy_and_reset_select_all"
                                                        value="All"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-5 mt-1">
                                                {
                                                    classroomsWithPeriod.map((item, i) => (
                                                        <div key={i} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={"class_reset_" + item.id}
                                                                    checked={data.with_period_classroom_ids.includes(item.id)}
                                                                    onChange={(e) =>
                                                                        handleCopyAndResetTimeTable(e.target.name, e.target.checked, item.id)
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={"class_reset_" + item.id}
                                                                    value={item.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                <PrimaryButton
                                                    className="educare-primary-btn-md-fill"
                                                    type="button"
                                                    onClick={handleCopyAndResetClassroomPeriod}
                                                >
                                                    Copy & Reset Time Table
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    className="educare-gray-btn-md-stroke"
                                                    type="button"
                                                    onClick={handleCancelCopyAndReset}
                                                >
                                                    Cancel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
