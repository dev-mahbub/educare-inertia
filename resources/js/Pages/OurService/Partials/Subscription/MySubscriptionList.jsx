
const MySubscriptionList = ({
    subscriptions
}) => {
    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list pb-none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Subscription</th>
                                    <th>Plan Name</th>
                                    <th>Subscription Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions?.length > 0 ?
                                    subscriptions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.service_name}</td>
                                            <td>{item?.service_type}</td>
                                            <td>{item?.subscription_no}</td>
                                        </tr>
                                    ))
                                :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="3">
                                            Data not found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySubscriptionList;
