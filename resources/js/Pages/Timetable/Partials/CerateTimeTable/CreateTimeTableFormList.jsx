import SelectInput from "@/Components/SelectInput";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTimeTableFormList = ({
    classroomPeriods,
    timetableDays,
    subjects,
    teachers,
    timetableData,
    setTimetableData
}) => {

    const [tempData, setTempData] = useState({});

    useEffect(() => {
        setTimetableData(timetableDays?.map(day => {
            const periodData = classroomPeriods?.flatMap(classroomPeriod => {
                if (classroomPeriod?.classroomTimetables?.length > 0) {
                    return classroomPeriod?.classroomTimetables?.filter(timetable => timetable?.day == day?.title)?.map(timetable => ({
                        id: timetable?.id,
                        classroom_period_id: classroomPeriod?.id,
                        type: classroomPeriod?.type,
                        subject_id: timetable?.subject_id,
                        staff_id: timetable?.staff_id
                    }));
                }

                return null;
            }).filter(Boolean);

            return {
                day: day.title,
                period_data: periodData
            }
        }));
    }, [timetableDays, classroomPeriods]);

    // convert time string to local time start
    function convertToLocaleTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const currentDate = new Date();

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // convert time string to local time end

    // handle change temp data start
    const handleTempDataChange = (index, classroomPeriodId, field, value) => {
        setTempData((prev) => ({
            ...prev,
            [`${index}-${classroomPeriodId}`]: {
                ...(prev[`${index}-${classroomPeriodId}`] || {}),
                [field]: value,
            },
        }));
    }
    // handle change temp data end

    // handle add period data start
    const handleAddPeriodData = (index, classroomPeriodId) => {
        const key = `${index}-${classroomPeriodId}`;
        const selectedData = tempData[key];

        if (!selectedData || !selectedData.subject_id || !selectedData.staff_id) {
            toast.error("Please select both a subject and a teacher.", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }

        const updatedTimetableData = timetableData.map((item, formIndex) => {
            if (formIndex == index) {
                let updatedPeriodData = [...item.period_data];
                const existingEntries = updatedPeriodData;

                // Check if the combination already exists
                const isDuplicate = existingEntries.some(
                    (entry) =>
                        entry.subject_id == selectedData.subject_id &&
                        entry.staff_id == selectedData.staff_id &&
                        entry.classroom_period_id == classroomPeriodId
                );

                if (isDuplicate) {
                    toast.error("This combination already exists for this period.", {
                        position: 'top-right',
                        autoClose: 1500,
                    });

                    return item;
                }

                // Add new subject-teacher combination
                updatedPeriodData = [
                    ...existingEntries,
                    {
                        id: null,
                        classroom_period_id: classroomPeriods?.find(classroomPeriod => classroomPeriod?.id == classroomPeriodId)?.id,
                        type: classroomPeriods?.find(classroomPeriod => classroomPeriod?.id == classroomPeriodId)?.type,
                        subject_id: selectedData.subject_id,
                        staff_id: selectedData.staff_id,
                    }
                ];

                return { ...item, period_data: updatedPeriodData };
            }

            return item;
        });

        setTimetableData(updatedTimetableData);

        // Clear temporary data for this period
        setTempData((prev) => {
            const updatedTempData = { ...prev };
            delete updatedTempData[key];
            return updatedTempData;
        });
    }
    // handle add period data end

    // handle remove period data start
    const handleRemovePeriodData = (index, classroomPeriodId, subjectId, staffId) => {
        const updatedTimetableData = timetableData.map((item, formIndex) => {
            if (formIndex == index) {
                const updatedPeriodData = [...item?.period_data];
                const selectedIndex = updatedPeriodData?.findIndex(period => period?.classroom_period_id == classroomPeriodId && period?.subject_id == subjectId && period?.staff_id == staffId);

                updatedPeriodData?.splice(selectedIndex, 1);

                return { ...item, period_data: updatedPeriodData };
            }

            return item;
        });

        setTimetableData(updatedTimetableData);
    }
    // handle remove period data start

    // handle copy period data start
    const handleCopyPeriodData = () => {
        const mondayData = timetableData.find((item) => item.day == "Monday").period_data;

        const updatedTimetableData = timetableData.map((item) => {
            if (item.day != "Monday") {
                return { ...item, period_data: mondayData };
            }

            return item;
        });

        setTimetableData(updatedTimetableData);
    }
    // handle copy period data end

    return (
        <div className="educare-admission-list-inner-wrapper mb-4">
            <div className="educare-admission-list baseline-table-row">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center">Day</th>
                            {classroomPeriods?.map((item, index) => (
                                <th key={index} className="text-center">
                                    Period - {index + 1}
                                    <div className="flex items-center justify-center copy-input-value-style copy-input-btn-small">
                                        <span className="mr-2">{convertToLocaleTime(item?.start_time)} - {convertToLocaleTime(item?.end_time)}</span>
                                        <button
                                            onClick={handleCopyPeriodData}
                                        >
                                            C
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData?.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">{item.day}</td>
                                {classroomPeriods?.map((classroomPeriod, periodIndex) => (
                                    <td key={`${index}-${periodIndex}`} className="text-center">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-10 md:col-span-5">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Subject"
                                                        data={subjects}
                                                        value={
                                                            tempData[`${index}-${classroomPeriod?.id}`]?.subject_id || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleTempDataChange(
                                                                index,
                                                                classroomPeriod?.id,
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-10 md:col-span-5">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Teacher"
                                                        data={teachers}
                                                        value={
                                                            tempData[`${index}-${classroomPeriod?.id}`]?.staff_id || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleTempDataChange(
                                                                index,
                                                                classroomPeriod?.id,
                                                                "staff_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="educare-filter-action-btn">
                                                <Tooltip title="Add" placement="top" arrow>
                                                    <button
                                                        type="button"
                                                        className="educare-success-btn-md-fill"
                                                        onClick={() =>
                                                            handleAddPeriodData(index, classroomPeriod?.id)
                                                        }
                                                    >
                                                        <i className="icon-plus"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        {item?.period_data?.filter(period => period?.classroom_period_id == classroomPeriod?.id)?.map((period, innerIndex) => (
                                            <div key={innerIndex} className="time-table-list">
                                                <div className="subject-title">
                                                    {subjects?.find(subject => subject?.id == period?.subject_id)?.title}
                                                </div>
                                                <i className="icon-CaretDoubleRight"></i>
                                                <div className="teacher-title">
                                                    {teachers?.find(teacher => teacher?.id == period?.staff_id)?.title}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemovePeriodData(
                                                            index,
                                                            classroomPeriod?.id,
                                                            period?.subject_id,
                                                            period?.staff_id
                                                        )
                                                    }
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateTimeTableFormList;

