import React from 'react';

const StudentListTableWithHouse = ( {getData} ) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6 px-4">
                <h4 className='text-xl font-semibold text-gray-800'>
                    House Wise Students
                </h4>
            </div>
            <div className="educare-admission-list pb-none h-96 overflow-y-scroll">
                <table>
                    <thead className='sticky top-0 left-0 z-10 bg-white'>
                        <tr>
                            <th>House</th>
                            <th>Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData.map((item, index) => (
                            <tr key={index}>
                                <td className='border-b border-gray-900'>{item.name}</td>
                                <td className='border-b border-gray-900'>{item.students_count}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>
                                {getData.reduce((acc, item) => acc + item.students_count, 0)}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default StudentListTableWithHouse;