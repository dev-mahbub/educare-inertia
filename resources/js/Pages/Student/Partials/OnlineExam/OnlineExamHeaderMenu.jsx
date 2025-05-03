import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';


const OnlineExamHeaderMenu = ({ title }) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>Online Exam<span className='text-headingLight text-[16px]'></span></h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Link href={route('student_online_exam.index')}>Todays Exam</Link>
                                </li>
                                <li>
                                    <Link href={route('student_online_exam.attempted_exam')}>Attempted Exam</Link>
                                </li>
                                <li>
                                    <Link href={route('student_online_exam.unattempted_exam')}>Unattempted Exam</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineExamHeaderMenu;
