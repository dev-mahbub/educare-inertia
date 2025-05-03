import { Link } from '@inertiajs/react';

const UserSurveyLists = ({
    surveys
}) => {
    return (
        <>
            <div className="flex justify-between items-center flex-wrap mb-5">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Survey
                    </h5>
                </div>
            </div>

            {/* card */}
            {surveys?.length > 0 &&
                surveys?.map((survey, index) => (
                    <div key={index} className="bg-white/70 mt-5 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="divSurveyList">
                            <h3 className="font-semibold">{survey?.title}</h3>
                            <small>
                                <strong> Opened on : </strong> {survey?.opened_date},
                                <strong> Audience: </strong> {survey?.survey_audience}
                            </small>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-5">
                            <Link
                                href={route('survey.take', survey?.id)}
                                className="educare-success-btn-md-fill"
                            >
                                <i className='icon-Notepad'></i> Participate in Survey
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default UserSurveyLists;
