import UpdateStudentMenu from '../UpdateStudentMenu';
import UpdateStudentForm from './UpdateStudentForm';

const UpdateStudentInnerLayout = ({
    classrooms = [],
    columns = [],
    columnLabels = []
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <UpdateStudentMenu title="Import Data" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <UpdateStudentForm
                        className=""
                        classrooms={classrooms}
                        columns={columns}
                        columnLabels={columnLabels}
                     />
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentInnerLayout;
