
const LessonPlanList = ({
    lessonPlans
 }) => {


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Submitted By</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Title</th>
                                        <th>Topic</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessonPlans?.length > 0 ?
                                        lessonPlans?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.teacher?.first_name} {item?.teacher?.middle_name} {item?.teacher?.last_name}</td>
                                                <td>{item?.classroom_titles}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.lesson_topic}</td>
                                                <td>{item?.start_date}</td>
                                                <td>{item?.end_date}</td>
                                                {/* <td></td> */}
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="8">Data not found</td>
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

export default LessonPlanList;
