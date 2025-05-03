import React from "react";

export default function ImportItemTableList() {

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Import Summary
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table className="bg-supportingA/10">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Issue</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Item 1</td>
                                <td>Technical problem</td>
                                <td>In Progress</td>
                            </tr>
                            <tr>
                                <td>Item 2</td>
                                <td>Delivery delay</td>
                                <td>Open</td>
                            </tr>
                            <tr>
                                <td>Item 3</td>
                                <td>Quality concern</td>
                                <td>Resolved</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
