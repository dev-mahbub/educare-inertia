import React from 'react';

const StudentDueBookReportTableList = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Accno</th>
                                        <th>Roll No</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Book Title</th>
                                        <th>Issued Date</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123456</td>
                                        <td>101</td>
                                        <td>John Doe</td>
                                        <td>Class 10A</td>
                                        <td>The Great Gatsby</td>
                                        <td>2024-01-08</td>
                                        <td>2024-02-01</td>
                                    </tr>
                                    <tr>
                                        <td>789012</td>
                                        <td>205</td>
                                        <td>Jane Smith</td>
                                        <td>Class 9B</td>
                                        <td>To Kill a Mockingbird</td>
                                        <td>2024-01-09</td>
                                        <td>2024-02-15</td>
                                    </tr>
                                    <tr>
                                        <td>345678</td>
                                        <td>308</td>
                                        <td>Alice Johnson</td>
                                        <td>Class 11C</td>
                                        <td>1984</td>
                                        <td>2024-01-10</td>
                                        <td>2024-02-28</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDueBookReportTableList;