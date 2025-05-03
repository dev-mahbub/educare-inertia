import React from 'react';

const ImportBookTable = () => {
    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Import Summary
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Accno</th>
                            <th>Book Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>123456</td>
                            <td>Introduction to Programming</td>
                            <td>Available</td>
                        </tr>
                        <tr>
                            <td>123456</td>
                            <td>Introduction to Design</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>123456</td>
                            <td>Introduction to Math</td>
                            <td>Available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ImportBookTable;
