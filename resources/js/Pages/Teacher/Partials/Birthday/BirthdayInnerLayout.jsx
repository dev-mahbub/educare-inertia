import React, { useState } from 'react';
import BirthdayFilter from './BirthdayFilter';
import CreateBirthdayList from './CreateBirthdayList';
import BirthdayBanner from '../../../../../images/bg/birthday.png'
import BirthdayWishPopupForm from './BirthdayWishPopupForm';
import BirthdaySmsWishPopupForm from './BirthdaySmsWishPopupForm';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useForm } from '@inertiajs/react';

const BirthdayInnerLayout = ({ teachers }) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        birth_date: '',
        birth_month: '',
        message: '',
        teacherIds: [],
    });

    const [PopupOpen, setPopupOpen] = useState(false);
    const [SmsPopupOpen, setSmsPopupOpen] = useState(false);
    // update
    const handleNotificationPopup = () => {
        // setEditData(editData);
        setPopupOpen(!PopupOpen);
    };

    const handleSmsNotificationPopup = () => {
        // setEditData(editData);
        setSmsPopupOpen(!SmsPopupOpen);
    };
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Teachers" />
                    </div>
                </div>
                <div className="educare-birthday-banner">
                    <div className="educare-student-birthday-thumb">
                        <img className="w-full" src={BirthdayBanner} alt="category-icon" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BirthdayFilter 
                        handleNotificationPopup={handleNotificationPopup}
                        handleSmsNotificationPopup={handleSmsNotificationPopup}
                    />
                    <CreateBirthdayList
                        teachers={teachers}
                        setBirthdayData={setData}
                    />
                </div>
            </div>
            <BirthdayWishPopupForm PopupOpen={PopupOpen} setPopupOpen={setPopupOpen} Data={data} setBirthdayData={setData} />
            <BirthdaySmsWishPopupForm PopupOpen={SmsPopupOpen} setPopupOpen={setSmsPopupOpen} Data={data} setBirthdayData={setData} />
        </div>
    );
};

export default BirthdayInnerLayout;
