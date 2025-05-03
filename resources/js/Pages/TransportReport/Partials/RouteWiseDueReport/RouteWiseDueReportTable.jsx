import React from "react";

const RouteWiseDueReportTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Student Name</th>
                                        <th>Father Name</th>
                                        <th>Adm.No.</th>
                                        <th>Phone</th>
                                        <th>Installment</th>
                                        <th>Vouchar</th>
                                        <th>Route Name</th>
                                        <th>Total Due</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe</td>
                                        <td>Michael Doe</td>
                                        <td>12345</td>
                                        <td>555-1234</td>
                                        <td>100</td>
                                        <td>V123456</td>
                                        <td>Bus Route A</td>
                                        <td>50</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jane Smith</td>
                                        <td>Robert Smith</td>
                                        <td>67890</td>
                                        <td>555-5678</td>
                                        <td>150</td>
                                        <td>V789012</td>
                                        <td>Bus Route B</td>
                                        <td>75</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>John Doe</td>
                                        <td>Michael Doe</td>
                                        <td>12345</td>
                                        <td>555-1234</td>
                                        <td>100</td>
                                        <td>V123456</td>
                                        <td>Bus Route A</td>
                                        <td>50</td>
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

export default RouteWiseDueReportTable;
