
const ListViewList = ({
    exams,
    events,
    holidays
}) => {
    return (
        <>
            <div className="educare-common-card mb-5">
                <div className="bg-white/50 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-Bag"></i>
                            Holidays
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holidays?.length > 0 ?
                                        holidays.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.start}</td>
                                                <td>{item?.end}</td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
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
            <div className="educare-common-card mb-5">
                <div className="bg-white/50 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-calender"></i>
                            Events
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events?.length > 0 ?
                                        events.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.start}</td>
                                                <td>{item?.end}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
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
            <div className="educare-common-card">
                <div className="bg-white/50 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-BookBookmark"></i>
                            Exams
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams?.length > 0 ?
                                        exams.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.start}</td>
                                                <td>{item?.end}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
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
        </>
    );
};

export default ListViewList;
