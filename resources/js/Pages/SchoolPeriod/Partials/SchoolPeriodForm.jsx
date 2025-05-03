import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import PeriodFirstHalf from './PeriodFirstHalf';
import PeriodSecondHalf from './PeriodSecondHalf';

export default function SchoolForm({
    className = "",
    schoolShifts,
    schoolPeriods
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful,
    } = useForm({
        school_shift_id: "",
    });


    // handle change school shift start
    const handleChangeSchoolShift = (value) => {
        setData((prevData) => ({
            ...prevData,
            school_shift_id: value
        }));

        const form_data = {
            school_shift_id: value
        }

        router.post(route('school_period.create'), form_data);
    }
    // handle change school shift end

    // handle save school period start
    const handleSaveSchoolPeriod = (schoolPeriod) => {
        if (!data?.school_shift_id) {
            toast.error("Please select shift!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (!schoolPeriod?.start_time || !schoolPeriod.end_time) {
            toast.error("Please select a time!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const form_data = {
                school_shift_id: data?.school_shift_id,
                start_time: schoolPeriod?.start_time,
                end_time: schoolPeriod?.end_time,
                type: schoolPeriod?.type
            }

            router.post(route('school_period.save'), form_data, {
                onFinish: () => {
                    const form_data = {
                        school_shift_id: data?.school_shift_id
                    }

                    router.post(route('school_period.create'), form_data);
                }
            });
        }
    }
    // handle save school period end

    // handle update school period start
    const handleUpdateSchoolPeriod = (schoolPeriod) => {
        if (!data?.school_shift_id) {
            toast.error("Please select shift!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (!schoolPeriod?.start_time || !schoolPeriod?.end_time) {
            toast.error("Please select a time!", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const form_data = {
                school_shift_id: data?.school_shift_id,
                start_time: schoolPeriod?.start_time,
                end_time: schoolPeriod?.end_time,
                type: schoolPeriod?.type
            }

            router.put(route('school_period.update', schoolPeriod?.id), form_data, {
                onFinish: () => {
                    const form_data = {
                        school_shift_id: data?.school_shift_id
                    }

                    router.post(route('school_period.create'), form_data);
                }
            });
        }
    }
    // handle update school period end

    // handle delete school period start
    const handleDeleteSchoolPeriod = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('school_period.delete', id), {
                    onFinish: () => {
                        const form_data = {
                            school_shift_id: data?.school_shift_id
                        }

                        router.post(route('school_period.create'), form_data);
                    }
                });
            }
        });
    }
    // handle delete school period end

    // convert time string to local date start
    function convertToLocalDate(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const currentDate = new Date();

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate;
    }
    // convert time string to local date end

    return (
        <div className="educare-master-create-periods-area maxXs:p-[15px] rounded-[10px]">
            <form>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="school-periods-select-item-wrapper py-[30px] px-[30px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="School Shift"
                                />
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
                    {data?.school_shift_id &&
                        <>
                            <div className="lg:col-span-6 col-span-12">
                                <PeriodFirstHalf
                                    schoolPeriods={schoolPeriods}
                                    handleDeleteSchoolPeriod={handleDeleteSchoolPeriod}
                                    handleSaveSchoolPeriod={handleSaveSchoolPeriod}
                                    handleUpdateSchoolPeriod={handleUpdateSchoolPeriod}
                                    convertToLocalDate={convertToLocalDate}
                                />
                            </div>
                            <div className="lg:col-span-6 col-span-12">
                                <PeriodSecondHalf
                                    schoolPeriods={schoolPeriods}
                                    handleDeleteSchoolPeriod={handleDeleteSchoolPeriod}
                                    handleSaveSchoolPeriod={handleSaveSchoolPeriod}
                                    handleUpdateSchoolPeriod={handleUpdateSchoolPeriod}
                                    convertToLocalDate={convertToLocalDate}
                                />
                            </div>
                        </>
                    }
                </div>
            </form>
        </div>
    );
}
