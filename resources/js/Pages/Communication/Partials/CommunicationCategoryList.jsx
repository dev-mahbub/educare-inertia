import React from 'react';
import { Link } from '@inertiajs/react';
import CategoryBirthdayIcon from '../../../../images/category/birthday.png'
import CategoryEventIcon from '../../../../images/category/event.png'
import CategoryNewsIcon from '../../../../images/category/news.png'
import CategoryNoticeIcon from '../../../../images/category/notice.png'
import CategoryMessageIcon from '../../../../images/category/message.png'
import CategoryBroadcastIcon from '../../../../images/category/broadcast.png'
import chatIcon from "../../../../images/category/teacher/chat.png"
import messageIcon from "../../../../images/category/teacher/message.png"
import whatsappIcon from "../../../../images/category/teacher/social.png"
import complaintIcon from "../../../../images/category/teacher/complaint.png"
import feedbackIcon from "../../../../images/category/teacher/feedback.png"

const CommunicationCategoryList = ({siteData}) => {
    console.log(siteData);
    return (
        <div className="educare-academic-category mt-5">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>Manage Communications</h5>
            </div>
            { (siteData?.authRoles.indexOf("Super Admin") > -1 || siteData?.authRoles.indexOf("Admin") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_birthday || siteData?.isSuperAdmin) && 
                <Link href="/student/birthday/list">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBirthdayIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Birthday</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_event || siteData?.isSuperAdmin) && 
                <Link href="/events">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Events</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_news || siteData?.isSuperAdmin) && 
                <Link href="/news">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>News</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_notice || siteData?.isSuperAdmin) && 
                <Link href="/notices">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNoticeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Notices</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_sms || siteData?.isSuperAdmin) && 
                <Link href="/sms">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryMessageIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Bulk SMS</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_message || siteData?.isSuperAdmin) && 
                <Link href={route('webmessage.inbox')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBroadcastIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Web Message</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_message || siteData?.isSuperAdmin) && 
                <Link href={route('webmessage.inbox')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBroadcastIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>WP Message</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_mail || siteData?.isSuperAdmin) && 
                <Link href={route('webmessage.inbox')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryBroadcastIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Mail</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }
            
            { (siteData?.authRoles.indexOf("Teacher") > -1) &&
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] administrative-detail-teacher">
                { (siteData?.authModules?.module_message || siteData?.isSuperAdmin) && 
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={chatIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Chat</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_message || siteData?.isSuperAdmin) && 
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={messageIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Web Message</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_notice || siteData?.isSuperAdmin) && 
                <Link href="/notices">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNoticeIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Notices</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_news || siteData?.isSuperAdmin) && 
                <Link href="/news">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryNewsIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>News</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_event || siteData?.isSuperAdmin) && 
                <Link href="/events">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={CategoryEventIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Events</h5>
                        </div>
                    </div>
                </Link>
                }
                
                { (siteData?.authModules?.module_message || siteData?.isSuperAdmin) && 
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={whatsappIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>WP Message</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_complaints || siteData?.isSuperAdmin) && 
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={complaintIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Complaints</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_feedback || siteData?.isSuperAdmin) && 
                <Link href="#">
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={feedbackIcon} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Feedback</h5>
                        </div>
                    </div>
                </Link>
                }
            </div>
            }
        </div>
    );
};

export default CommunicationCategoryList;