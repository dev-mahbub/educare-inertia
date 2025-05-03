import React from "react";

const RegisterViewDetail = () => {
    return (
        <>
            <div className="educare-admission-list-area mt-5">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student Attendance Detail
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                        Total working days
                                        </th>
                                        <th>Sum of Boys Presentee</th>
                                        <th>Sum of Girls Presentee</th>
                                        <th>Avg presentee of boys</th>
                                        <th>Avg presentee of girls</th>
                                        <th>Total average attendance of class</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9</td>
                                        <td>64</td>
                                        <td>18</td>
                                        <td>7.11</td>
                                        <td>2</td>
                                        <td>9.11</td>
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

export default RegisterViewDetail;
