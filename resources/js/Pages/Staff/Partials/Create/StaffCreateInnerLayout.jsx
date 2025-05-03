import StaffCreateForm from './StaffCreateForm';

const StaffCreateInnerLayout = ({
    auth,
    siteData,
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
                    <StaffCreateForm
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

export default StaffCreateInnerLayout;
