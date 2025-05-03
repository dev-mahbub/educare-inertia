import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';
import moment from 'moment';

const ExamScheduleList = ({students, studentId, examSchedule, examScheduleDetails}) => {
     //form validation start
     const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        exam_schedule_list_check_id_parent: false,
        exam_schedule_list_check_id_2: false,
        exam_schedule_list_check_id_3: false,
    });

    const examListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {},
        });
    };
    //form validation end

    //handle checkbox start
      const handleExamScheduleCheckboxChange = (name, value) => {
        let newFormData;
    
        if (name === 'exam_schedule_list_check_id_parent') {
          newFormData = {
            ...data,
            [name]: value,
            exam_schedule_list_check_id_2: value,
            exam_schedule_list_check_id_3: value,
          };
        } else {
          newFormData = {
            ...data,
            [name]: value,
          };
    
          if (value === false) {
            newFormData.exam_schedule_list_check_id_parent = false;
          } else if (
            Object.values(newFormData).slice(1).every(Boolean) &&
            !newFormData.exam_schedule_list_check_id_parent
          ) {
            newFormData.exam_schedule_list_check_id_parent = true;
          }
        }
    
        setData(newFormData);
      };
    //handle checkbox end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={examListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="exam_schedule_list_check_id_parent"
                                                            checked={
                                                                data.exam_schedule_list_check_id_parent
                                                            }
                                                            onChange={(e) =>
                                                                handleExamScheduleCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <th>Exam Date</th>
                                            <th>Subject</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examScheduleDetails[0]?.exam_dates?.length > 0 ?
                                            examScheduleDetails[0]?.exam_dates?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-checkbox-styles">
                                                            <label className="inline-block">
                                                                <Checkbox
                                                                    name="exam_schedule_list_check_id_2"
                                                                    checked={
                                                                        data.exam_schedule_list_check_id_2
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleExamScheduleCheckboxChange(
                                                                            e.target
                                                                                .name,
                                                                            e.target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>{item?.date_at ? moment(item?.date_at).format("DD MMM, YYYY") : 'Date not set'}</td>
                                                    <td>{item?.classroom_subject?.subject?.title}</td>
                                                    <td>{item?.start_time_at ? moment(item.date_at + ' ' + item.start_time_at).format("hh:mm A") : 'Time not set'}</td>
                                                    <td>{item?.end_time_at ? moment(item.date_at + ' ' + item.end_time_at).format("hh:mm A") : 'Time not set'}</td>
                                                </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamScheduleList;