
const LessonPlanList = ({
    classWiseReport,
    setLessonPlanData,
    lessonPlanData,
    selectedKey,
    setSelectedKey
 }) => {

    // handle filter lesson plan data start
    const handleFilterLessonPlanData = (key) => {
        setSelectedKey(key);

        const filteredData = classWiseReport[key]['lesson_plans'] ?? [];

        setLessonPlanData(filteredData);
    }
    // handle filter lesson plan data end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 lg:col-span-6">
                                <div className="lesson-plan-report-area">
                                    <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Teacher</th>
                                                    <th>Lesson Plan Created</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(classWiseReport)?.length > 0 ?
                                                    Object.values(classWiseReport)?.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className={selectedKey != null && selectedKey == (item?.subject_id+"_"+item?.teacher_id) ? 'bg-success' : ''}
                                                         >
                                                            <td>
                                                                {item?.subject_title}
                                                            </td>
                                                            <td>
                                                                {item?.teacher_name}
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className="text-info cursor-pointer"
                                                                    onClick={() => {
                                                                        handleFilterLessonPlanData(item?.subject_id + "_" + item?.teacher_id)
                                                                    }}
                                                                >
                                                                    {item?.total_count}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="3"
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
                            <div className="col-span-12 lg:col-span-6">
                                <div className="educare-admission-list-area">
                                    <div className="educare-admission-list-inner">
                                        <div className="educare-admission-list-inner-wrapper">
                                            {selectedKey != null &&
                                                <div className="educare-admission-list">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Topic</th>
                                                                <th>Activity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(lessonPlanData)?.length > 0 ?
                                                                Object.values(lessonPlanData)?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <p>{item?.start_date} to {item?.end_date}</p>
                                                                            <a
                                                                                href={route('lesson_plan.edit', item?.id)}
                                                                                target="_blank"
                                                                                className="text-info"
                                                                            >
                                                                                {item?.title}
                                                                            </a>
                                                                        </td>
                                                                        <td>{item?.topic}</td>
                                                                        <td>{item?.activity}</td>
                                                                    </tr>
                                                                ))
                                                            :
                                                                <tr>
                                                                    <td
                                                                        className="text-center text-red-500"
                                                                        colSpan="3"
                                                                    >
                                                                        Data not found
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LessonPlanList;
