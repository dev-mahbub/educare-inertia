import React from "react";

const TeacherTimeTableLists = ({timeTableData}) => {

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        {timeTableData.periods.map((period, index) => (
                                            <th key={index}>
                                                {period.name} <br />
                                                {period.time}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeTableData.days.length > 0 ? (timeTableData.days.map((dayData, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className='badge primary'>{dayData.day}</span>
                                            </td>
                                            {dayData.periods.map((period, periodIndex) => (
                                                <td key={periodIndex}>
                                                    <div className="flex justify-between items-center gap-2 px-2">
                                                        {period.subject && <span className='badge success'>{period.subject}</span>}
                                                        {period.subject && <span><i className="icon-CaretDoubleRight"></i></span>}
                                                        {period.teacher && <span className='badge info'>{period.teacher}</span>}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan={4}>Data not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherTimeTableLists;
