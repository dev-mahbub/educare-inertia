import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';


const OnlineExamHeaderMenu = ({ title }) => {
    return (
        <div className='educare-mis-report-menu-area bg-white'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4> Exam Mangement <span className='text-headingLight text-[16px]'>_{title}</span></h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            <ul>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Assets <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('online_exam.create_asset')}>Add an Asset</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam.asset_list')}>Assets List</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Question <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('online_exam.create_question')}>New Question</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam.question_list')}>Question List</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam.import_question')}>Import</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Exam <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('online_exam.create_exam')}>New Exam</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam.exam_list')}>Exam List</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam.exam_schedule')}>Exam Schedules</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Report <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('online_exam_report.live_exam')}>Live Exam</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam_report.taken_exam')}>Taken Exam</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam_report.export_exam_mark')}>Export Marks</Dropdown.Link>
                                            <Dropdown.Link href={route('online_exam_report.exam_summary')}>Summary</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Link href={route('online_exam.question_bank')}>Question Bank</Link>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <div type="button" className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2" >
                                                Buy <i className='icon-CaretDown'></i>
                                            </div>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('online_exam.buy_question')}>Question Preview</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                                {/* do not remove this menu */}
                                {/* <li>
                                    <Link href='#'>Get Help</Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineExamHeaderMenu;
