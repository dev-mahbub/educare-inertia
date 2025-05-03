import StaffEditForm from './StaffEditForm';

const StaffEditInnerLayout = ({
    staff,
    userRolls,
    genders,
    teachingTypes,
    states,
    houses,
    categories,
    empCats,
    staffCats,
    religions,
    jobTypes,
    departments,
    designations,
    bloodGroups,
    customFields
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffEditForm
                        staff={staff}
                        userRolls={userRolls}
                        genders={genders}
                        teachingTypes={teachingTypes}
                        states={states}
                        houses={houses}
                        categories={categories}
                        empCats={empCats}
                        staffCats={staffCats}
                        religions={religions}
                        jobTypes={jobTypes}
                        departments={departments}
                        designations={designations}
                        bloodGroups={bloodGroups}
                        customFields={customFields}
                    />
                </div>
            </div>
        </div>
    );
};

export default StaffEditInnerLayout;
