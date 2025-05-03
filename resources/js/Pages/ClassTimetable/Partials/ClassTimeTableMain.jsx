import React from 'react';
import ClassTimeTableHeader from './ClassTimeTableHeader';
import ClassTimeTableLists from './ClassTimeTableLists';
import { useForm } from '@inertiajs/react';
import ClassTimeTableMorningShift from './ClassTimeTableMorningShift';
import moment from "moment";

const ClassTimeTableMain = ({shiftTypes, classrooms, timetables}) => {
    let pereodData = timetables.map((period,index) => {
        return {
            name: `Period - ${index + 1}`,
            time: `${moment(period?.start_time, 'HH:mm').format('hh:mm A')} - ${moment(period?.end_time, 'HH:mm').format('hh:mm A')}`
        }
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeTableData = {
        periods: pereodData,
        days: days.map((day) => {
                return {
                    day: day,
                    periods: timetables.map((period) => {
                        const repeatable_days = period?.repeatable_days ? JSON.parse(period.repeatable_days) : [];
                        const startDateDay = moment(period?.start_date).format('dddd');
                        const teacherData = period?.teachers?.[0] || null;
                        const teacherName = teacherData?.teacher_details?.name || teacherData?.teacher_name || '';
                        if (!repeatable_days || !repeatable_days.includes(day)) { 
                            if(startDateDay === day) {
                                return {
                                    subject: period?.subject?.title,
                                    teacher: teacherName
                                }
                            }else{
                                return {
                                    subject: '',
                                    teacher: ''
                                }
                            }
                        }
                        return {
                            subject: period?.subject?.title,
                            teacher: teacherName
                        }
                    })
                }
            })
    }

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
        select_shift: "",
    });

    return (
        <>
            <ClassTimeTableHeader
                data={data}
                setData={setData}
                errors={errors}
                timeTableData={timeTableData}
                shiftTypes={shiftTypes}
                classrooms={classrooms}
            />
            <ClassTimeTableLists
                timeTableData={timeTableData}
            />
        </>
    );
};

export default ClassTimeTableMain;