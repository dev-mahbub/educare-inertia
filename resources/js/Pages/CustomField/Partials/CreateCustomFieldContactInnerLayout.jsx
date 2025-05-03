import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";
import CustomFieldForm from "./CustomFieldForm";

const CreateCustomFieldInnerLayout = ({
    custom_fields,
    field_form_types,
    student_staff_types,
    data_types
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Custom field" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CustomFieldForm
                        custom_fields={custom_fields}
                        field_form_types={field_form_types}
                        student_staff_types={student_staff_types}
                        data_types={data_types}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCustomFieldInnerLayout;
