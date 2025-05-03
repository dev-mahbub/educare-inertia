import React from 'react';

const StudentListTableWithSession = ( {getData} ) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6 px-4">
                <h4 className='text-xl font-semibold text-gray-800'>
                    Session Wise Students
                </h4>
            </div>
            <div className="educare-admission-list pb-none h-96 overflow-y-scroll">
                <table>
                    <thead className='sticky top-0 left-0 z-10 bg-white'>
                        <tr>
                            <th>Session</th>
                            <th>Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.map((item, index) => (
                            <tr key={index}>
                                <td className='border-b border-gray-900'>{item.academic_session}</td>
                                <td className='border-b border-gray-900'>{item.total_student}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>
                                {getData.reduce((acc, item) => acc + item.total_student, 0)}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default StudentListTableWithSession;