import React from "react";

const ClassTimeTableMorningShift = ({ data }) => {
    const timeTableShiftData = [
        {
            shift: 'Morning',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        {
            shift: 'Evening',
            days: ['Monday', 'Wednesday', 'Friday', 'Saturday']
        },
    ];

    const selectedShiftData = timeTableShiftData.filter(daysData => daysData.shift.toLowerCase() === data.select_shift.toLowerCase());
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={7}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedShiftData.length > 0 ? (
                                            selectedShiftData.map((shiftData, index) => (
                                                shiftData.days.map((day, index) => <tr key={index}>
                                                    <td className="text-center">
                                                        <span className="badge primary min-w-full">{day}</span>
                                                    </td>
                                                </tr>)
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="text-center">No Data Available</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassTimeTableMorningShift;
