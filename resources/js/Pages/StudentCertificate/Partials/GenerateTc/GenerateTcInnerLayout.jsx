import NoMenusHeaderMenus from '@/Components/Partials/Menus/NoMenus/NoMenusHeaderMenus';
import GenerateTcForm from './GenerateTcForm';

const GenerateTcInnerLayout = ({
    classrooms,
    students,
    student,
    feeInstallments
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <NoMenusHeaderMenus title="Transfer Certificate" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <GenerateTcForm
                            classrooms={classrooms}
                            students={students}
                            student={student}
                            feeInstallments={feeInstallments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerateTcInnerLayout;
