import BiometricUpdateList from './BiometricUpdateList';
import BiometricUpdateListFilter from './BiometricUpdateListFilter';
// import BiometricSearchBar from './BiometricSearchBar';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useState } from 'react';

const BiometricInnerLayout = ({
    studentsBio,
    classrooms,
}) => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <BiometricSearchBar /> */}
                    <BiometricUpdateListFilter
                        studentsBioLength={studentsBio?.length}
                        classrooms={classrooms}
                        setLoading={setLoading}
                        setFormData={setFormData}
                    />
                    <BiometricUpdateList
                        studentsBio={studentsBio}
                        loading={loading}
                        setLoading={setLoading}
                        formData={formData}
                    />
                </div>
            </div>
        </div>
    );
};

export default BiometricInnerLayout;
