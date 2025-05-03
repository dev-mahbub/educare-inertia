import React from 'react';
import { Link } from '@inertiajs/react';
import academicCategoryIconFour from '../../../../images/category/class-work.png'
import academicCategoryIconUpload from '../../../../images/category/upload.png'
import academicCategoryIconPermission from '../../../../images/category/permission.png'
import academicCategoryIconConfiguration from '../../../../images/category/config.png'
import webIcon from '../../../../images/category/web.png'

const SetupSchoolCategoryList = ({siteData}) => {
    return (
        
        <div className="educare-academic-category">
            <div className="educare-academic-category-title flex items-center gap-2">
                <span><i className="icon-pen"></i></span>
                <h5 className='text-[18px] font-semibold text-headingLight'>School Settings</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
                { (siteData?.authModules?.module_classes || siteData?.isSuperAdmin) && 
                <Link href={route('classroom.time_table_list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconFour} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Manage Classes</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_permissions || siteData?.isSuperAdmin) && 
                <Link href={route('permission.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconPermission} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>User Permissions</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_classes || siteData?.isSuperAdmin) && 
                <Link href={route('configuration.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconConfiguration} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>School Settings</h5>
                        </div>
                    </div>
                </Link>
                }
                { (siteData?.authModules?.module_school_import || siteData?.isSuperAdmin) && 
                <Link href={route('import.student_create')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={academicCategoryIconUpload} alt="category-icon" /></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Data Import</h5>
                        </div>
                    </div>
                </Link>
                } 
                { (siteData?.authModules?.module_school_import || siteData?.isSuperAdmin) && 
                <Link href={route('page.list')}>
                    <div className="educare-academic-category-item">
                        <div className="educare-academic-category-icon">
                            <span><img src={webIcon} alt="category-icon" className='max-w-11'/></span>
                        </div>
                        <div className="educare-academic-category-content">
                            <h5>Public Pages</h5>
                        </div>
                    </div>
                </Link>
                } 
            </div>
        </div>
    );
};

export default SetupSchoolCategoryList;