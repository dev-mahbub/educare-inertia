
const ExamDetailsTop = ({
    virtualExam
}) => {

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-0 lg:gap-5">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="exam-details-wrapper">
                                <ul>
                                    <li>
                                        <p>Exam Name:</p>
                                        <span>{virtualExam?.title}</span>
                                    </li>
                                    <li>
                                        <p>Mode:</p>
                                        <span>{virtualExam?.exam_mode}</span>
                                    </li>
                                    <li>
                                        <p>Start Date:</p>
                                        <span>{`${virtualExam?.start_date} ${virtualExam?.start_time}`}</span>
                                    </li>
                                    <li>
                                        <p>End Date:</p>
                                        <span>{`${virtualExam?.end_date} ${virtualExam?.end_time}`}</span>
                                    </li>
                                    <li>
                                        <p>Pass/Full Marks:</p>
                                        <span>{parseInt(virtualExam?.pass_mark ?? 0)}/{parseInt(virtualExam?.total_mark ?? 0)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="exam-details-wrapper">
                                <ul>
                                    <li>
                                        <p>Exam Code:</p>
                                        <span>{virtualExam?.exam_code}</span>
                                    </li>
                                    <li>
                                        <p>Duration:</p>
                                        <span>{virtualExam?.duration_hour ?? 0}h, {virtualExam?.duration_minute ?? 0}min</span>
                                    </li>
                                    <li>
                                        <p>Subject:</p>
                                        <span>{virtualExam?.subject?.title}</span>
                                    </li>
                                    <li>
                                        <p>Class:</p>
                                        <span>{virtualExam?.class_name?.title}</span>
                                    </li>
                                    <li>
                                        <p>Assigned Class:</p>
                                        <span>{virtualExam?.classroom_titles}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamDetailsTop;
