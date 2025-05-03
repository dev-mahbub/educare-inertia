import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import UpdateStudentFeeGroupForm from './UpdateStudentFeeGroupForm';

const UpdateStudentFeeGroupInnerLayout = ({ classrooms = [], studentFeeInstallments = [], students = [], feeStructureLists = [] }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <UpdateStudentFeeGroupForm classrooms={classrooms} studentFeeInstallments={studentFeeInstallments} students={students} feeStructureLists ={feeStructureLists}/>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentFeeGroupInnerLayout;
