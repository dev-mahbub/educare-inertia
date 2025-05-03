import React from 'react';
import CreateStudentForm from './RegistrationCreateForm';

const RegistrationCreateInnerLayout = ({
    classNames,
    houses,
    status,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    admissionNo,
    states
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateStudentForm
                        classNames={classNames}
                        houses={houses}
                        status={status}
                        admissionNumbers={admissionNumbers}
                        schBoaArr={schBoaArr}
                        casteArr={casteArr}
                        genderArr={genderArr}
                        categories={categories}
                        bloodGroups={bloodGroups}
                        religions={religions}
                        countries={countries}
                        catEmps={catEmps}
                        subCasteArr={subCasteArr}
                        accountArr={accountArr}
                        banks={banks}
                        admissionNo={admissionNo}
                        states={states}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationCreateInnerLayout;
