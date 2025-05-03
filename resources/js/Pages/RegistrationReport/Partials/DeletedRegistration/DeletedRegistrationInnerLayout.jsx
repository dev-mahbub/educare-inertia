import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import DeletedRegistrationFilter from "./DeletedRegistrationFilter";
import DeletedRegistrationTable from "./DeletedRegistrationTable";
const DeletedRegistrationInnerLayout = ({
    registrations,
    academicYears
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                   <DeletedRegistrationFilter
                    registrations = {registrations}
                    academicYears = {academicYears}
                   />
                    <DeletedRegistrationTable
                        registrations = {registrations}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeletedRegistrationInnerLayout;
