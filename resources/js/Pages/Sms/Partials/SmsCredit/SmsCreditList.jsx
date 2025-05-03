
const SmsCreditList = ({
    serviceOrders
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Credit Sms History
                            <span>
                                (Total : {serviceOrders?.length})
                            </span>
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sms Credited</th>
                                        <th>Credited On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceOrders?.length > 0 &&
                                        serviceOrders.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.credited_on}</td>
                                            </tr>
                                        ))
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

export default SmsCreditList;
