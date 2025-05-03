import React from 'react';
import breadcrumbThumb from '../../../../images/illustration/breadcrumb.png';

const AcademicContentManagement = () => {
    return (
        <div className="educare-academic-content-grid">
            <div className="educare-breadcrumb-banner-area bg-gray-50">
                <div className="educare-breadcrumb-banner-wrapper">
                    <div className="grid grid-cols-12 gap-[30px] items-center">
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="educare-breadcrumb-banner-content">
                                <h1><span>Academic</span> content Management</h1>
                                <p>Challenges and Solutions in Academic Content Management</p>
                            </div>
                        </div>
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="educare-breadcrumb-banner-thumb max-w-[250px]">
                                <img src={breadcrumbThumb} alt="breadcrumb thumb not found" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicContentManagement;