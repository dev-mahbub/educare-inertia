import Dropdown from "@/Components/Dropdown";
import SelectInput from "@/Components/SelectInput";
import { Link, router } from "@inertiajs/react";
import chevronDown from '../../../../images/icon/chevron-down.png';
import sidebarBarIcon from '../../../../images/icon/filter-icon.png';
import handIcon from '../../../../images/icon/hand.png';
import sidebarLogo from '../../../../images/logo/sidebar-logo.png';
import userImg from '../../../../images/user/author.png';
import notifyUserOne from '../../../../images/user/user-1.png';
import notifyUserTwo from '../../../../images/user/user-2.png';
import notifyUserThree from '../../../../images/user/user-3.png';
import notifyUserFour from '../../../../images/user/user-4.png';
import notifyUserFive from '../../../../images/user/user-5.png';

const Header = ({ user, siteData, onClick }) => {

    const handelAcademicYear = (id) => {
        if(id) {
            router.get('/academic-year/set-session?ay='+ id);
        }
    }

    window.Echo.private('webmessage.user.1592')
        .listen("WebMessageSent", (response) => {
            console.log("header");
            console.log(response);
            if (response.message) {
                
                // const messageExists = messages.value.some(msg => msg.id === response.message.id);
                // if (!messageExists) {
                //     if ((response.message.sender_id === props.sender.id && response.message.receiver_id === props.receiver.id) || 
                //         (response.message.sender_id === props.receiver.id && response.message.receiver_id === props.sender.id)) {
                //         messages.value.push(response.message);
                //     }
                // }
            }
    });


    return (
        <div className="educare-dashboard-header-main">
            <div className="educare-dashboard-header-left">
                <div className="educare-dashboard-header-logo-wrap">
                    <div className="educare-dashboard-header-logo">
                        <Link href={route('dashboard')}>
                            <img src={(siteData?.schoolLogo != null) ? siteData?.schoolLogo : sidebarLogo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="educare-dashboard-header-bar">
                        <button type="button" onClick={onClick}>
                            <i>
                                <img src={sidebarBarIcon} alt="sidebar logo" />
                            </i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="educare-dashboard-header-right">
                { siteData?.authRoles.indexOf("Super Admin") > -1 ?
                    <div className="educare-dashboard-header-logged">
                        <div className="educare-dashboard-header-logged-icon">
                            <i>
                                <img src={handIcon} alt="hand icon" />
                            </i>
                        </div>
                        <div className="educare-dashboard-header-logged-text">
                            <h4>Logged as super admin</h4>
                            <span>Please do not do any change</span>
                        </div>
                    </div>
                :
                    <div className="educare-dashboard-header-logged">
                        {/* &nbsp; */}
                        <div className="educare-dashboard-header-logged-text flex items-center">
                            <h4>{siteData?.schoolName}</h4>
                        </div>
                    </div>
                }

                <div className="educare-dashboard-header-info">
                    <div className="educare-dashboard-header-info-date">
                        <i className="icon-time text-white/50"></i>
                        <div className="educare-dashboard-header-info-date-select">
                            <form>
                                <SelectInput
                                    id="academic_session"
                                    data_label="Session"
                                    data={siteData.AcademicYears}
                                    value={siteData.ActiveAcademicYearId}
                                    onChange={(e) => handelAcademicYear(e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="educare-dashboard-header-info-notification">
                        <div className="educare-dashboard-header-info-notification-email">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button">
                                        <i className="icon-message"></i>
                                        <span className="bg-danger">0</span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="educare-notify-dropdown hidden">
                                        <ul>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserOne}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Alex Send
                                                                youMessage
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2023 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserTwo}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Unlock New
                                                                Opportunities:
                                                                Exciting LMS
                                                                Announcements
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={
                                                                notifyUserThree
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Resport created
                                                                successfully
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserFour}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                {" "}
                                                                Important
                                                                Updates from
                                                                Deschool
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserFive}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                We are thrilled
                                                                to introduce a
                                                                brand new course
                                                                React
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="educare-dashboard-header-info-notification-noti">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button">
                                        <i className="icon-notifications"></i>
                                        <span className="bg-success">0</span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="educare-notify-dropdown hidden">
                                        <ul>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserOne}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Alex Send
                                                                youMessage
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2023 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserTwo}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Unlock New
                                                                Opportunities:
                                                                Exciting LMS
                                                                Announcements
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={
                                                                notifyUserThree
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                Resport created
                                                                successfully
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserFour}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                {" "}
                                                                Important
                                                                Updates from
                                                                Deschool
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="educare-notify-dropdown-item">
                                                    <div className="thumb">
                                                        <img
                                                            src={notifyUserFive}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="content">
                                                        <h6>
                                                            <a href="#">
                                                                We are thrilled
                                                                to introduce a
                                                                brand new course
                                                                React
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            31 Dec 2021 - 08:36
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="educare-dashboard-header-info-profile">
                        <div className="educare-dashboard-header-info-profile-img maxMd:hidden">
                            <button type="button">
                            {siteData?.authProfileImage?.staff_profile_image?.path ?
                                <img src={siteData?.authProfileImage?.staff_profile_image?.path} alt="user img" />
                            :
                            <img src={userImg} alt="user img" />
                            }
                            </button>
                        </div>
                        <div className="educare-dashboard-header-info-profile-text">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div
                                        type="button"
                                        className="inline-flex items-center text-[16px] font-medium text-light cursor-pointer gap-x-2 maxMd:hidden"
                                    >
                                        {`${siteData?.authUser?.first_name} ${(siteData?.authUser?.middle_name != null) ? siteData?.authUser?.middle_name : ''} ${(siteData?.authUser?.last_name != null) ? siteData?.authUser?.last_name : ''}`}
                                        <i>
                                            <img src={chevronDown} className="h-1.5 w-2.5 object-fill" alt="" />
                                        </i>
                                    </div>
                                    <button type="button" className="lg:hidden profile-user-img">
                                        {siteData?.authProfileImage?.staff_profile_image?.path ?
                                        <img src={siteData?.authProfileImage?.staff_profile_image?.path} alt="user img" />
                                        :
                                        <img src={siteData?.authProfileImage?.staff_profile_image?.path} alt="user img userImg" />
                                        }
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                            <span className="maxMd:hidden">{siteData?.authRoles ? siteData?.authRoles.join(', ') : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
