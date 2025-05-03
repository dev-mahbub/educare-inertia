import 'react-toastify/dist/ReactToastify.css';

const ClassroomTimetableList = ({
    classroomPeriods,
    timetables
}) => {

    // convert time string to local time start
    function convertToLocaleTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const currentDate = new Date();

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // convert time string to local time end

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
                                        {/* <span className="mr-2">{item?.start_time} - {item?.end_time}</span> */}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timetables?.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">{item.day}</td>
                                {classroomPeriods?.map((classroomPeriod, periodIndex) => (
                                    <td key={`${index}-${periodIndex}`} className="text-center">
                                        {item?.period_data[classroomPeriod?.id]?.map((period, innerIndex) => (
                                            <div key={innerIndex} className="time-table-list">
                                                <div className="subject-title">
                                                    {period?.subject_title}
                                                </div>
                                                <i className="icon-CaretDoubleRight"></i>
                                                <div className="teacher-title">
                                                    {period?.teacher_name}
                                                </div>
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

export default ClassroomTimetableList;

