
const AllotmentList = ({
    schoolPeriods,
    timetables
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Class
                                        </th>
                                        {schoolPeriods?.map((item, index) => (
                                            <th key={index} className="text-center">
                                                Period - {index + 1}
                                                <div className="flex items-center justify-center copy-input-value-style copy-input-btn-small">
                                                    <span className="mr-2">{item?.start_time} - {item?.end_time}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timetables?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{item?.classroom_title}</td>
                                            {schoolPeriods?.map((schoolPeriod, periodIndex) => (
                                                <td key={`${index}-${periodIndex}`} className="text-center">
                                                    {item?.period_data[schoolPeriod?.id]?.length > 0 ?
                                                        item.period_data[schoolPeriod?.id].map((period, innerIndex) => (
                                                            <div key={innerIndex} className="time-table-list">
                                                                <div className="subject-title">
                                                                    {period?.subject_title}
                                                                </div>
                                                                <i className="icon-CaretDoubleRight"></i>
                                                                <div className="teacher-title">
                                                                    {period?.teacher_name}
                                                                </div>
                                                            </div>
                                                        ))
                                                     :
                                                        <span>N/A</span>
                                                     }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllotmentList;
