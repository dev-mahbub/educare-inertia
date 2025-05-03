
export default function AdmissionMisRegReport({
    classWiseRegistrationSummary
}) {
    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Class wise Registration
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto overflow-y-auto h-[478px]">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Total Reg.</th>
                                    <th>Taken</th>
                                    <th>Total Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(classWiseRegistrationSummary?.reports && Object.keys(classWiseRegistrationSummary?.reports)?.length > 0) &&
                                    Object.values(classWiseRegistrationSummary?.reports)?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.class_title}</td>
                                            <td>{item?.total_registration}</td>
                                            <td>{item?.total_admission}</td>
                                            <td>{item?.total_fee}</td>
                                        </tr>
                                    ))
                                }

                                <tr>
                                    <td></td>
                                    <td>{classWiseRegistrationSummary?.total_registration}</td>
                                    <td>{classWiseRegistrationSummary?.total_admission}</td>
                                    <td>{classWiseRegistrationSummary?.total_fee}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
