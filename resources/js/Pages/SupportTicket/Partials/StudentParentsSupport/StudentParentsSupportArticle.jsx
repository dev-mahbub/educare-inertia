import React from 'react';
import articleOne from "../../../../../images/help-desk/online-exam.png"
import articleTwo from "../../../../../images/help-desk/ptm.png"
import { Link } from '@inertiajs/react';

const StudentParentsSupportArticle = () => {
    return (
        <div className='text-center mb-[60px]'>
            <h2 className='text-[36px] mb-[35px] maxSm:text-[28px] text-heading font-semibold'>Articles/ Guides</h2>
            <div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className='educare-article text-center'>
                            <Link href="#">
                                <div className="educare-article-img inline-block">
                                    <img src={articleOne} alt="img not found" />
                                </div>
                                <h4 className='font-semibold text-headingLight text-[16px]'>How to take an Online Exam?</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className='educare-article text-center'>
                            <Link href="#">
                                <div className="educare-article-img inline-block">
                                    <img src={articleOne} alt="img not found" />
                                </div>
                                <h4 className='font-semibold text-headingLight text-[16px]'>How to take online classes?</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className='educare-article text-center'>
                            <Link href="#">
                                <div className="educare-article-img inline-block">
                                    <img src={articleTwo} alt="img not found" />
                                </div>
                                <h4 className='font-semibold text-headingLight text-[16px]'>Parent Orientation Program</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentParentsSupportArticle;