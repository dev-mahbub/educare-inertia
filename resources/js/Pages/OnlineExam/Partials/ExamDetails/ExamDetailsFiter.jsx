import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import Cookies from 'js-cookie';

const ExamDetailsFiter = ({
    virtualExam
}) => {

    // handle preview question paper start
    const handlePreviewQuestionPaper = (e) => {
        e.preventDefault();

        Cookies.set('virtual_exam_id', virtualExam?.id);

        window.open(route('pdf_generator.preview_online_exam_question'));
    }
    // handle preview question paper end

    // handle download question paper start
    const handleDownloadQuestionPaper = (e) => {
        e.preventDefault();

        Cookies.set('virtual_exam_id', virtualExam?.id);

        window.open(route('pdf_generator.download_online_exam_question'));
    }
    // handle download question paper end

    return (
        <>
            <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center mt-[40px]'>
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Assigned Questions
                    </h5>
                </div>
                <div className="educare-filter-action-btn inline-flex gap-2">
                    <button
                        type="button"
                        className="educare-primary-btn-md-fill"
                        onClick={handlePreviewQuestionPaper}
                    >
                        <i className='icon-ListBullets'></i> Preview Question Paper
                    </button>
                    <button
                        type="button"
                        className="educare-primary-btn-md-fill"
                        onClick={handleDownloadQuestionPaper}
                    >
                        <i className='icon-ListBullets'></i> Download Question Paper
                    </button>

                    {virtualExam?.is_published == false ?
                        <Link
                            className="educare-success-btn-md-fill"
                            href={route('online_exam.create_exam', {id: virtualExam?.id})}
                        >
                            <i className='icon-editing'></i> Edit
                        </Link>
                    :
                        <PrimaryButton
                            disabled={true}
                            className="educare-success-btn-md-fill"
                        >
                            <i className='icon-editing'></i> Edit
                        </PrimaryButton>
                    }
                </div>
            </div>
        </>
    );
};

export default ExamDetailsFiter;
