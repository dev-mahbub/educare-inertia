import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

const NoMenusHeaderMenus = ({ title = '' }) => {
    return (
        <div className='educare-mis-report-menu-area'>
            <div className="educare-mis-report-menu">
                <div className="educare-mis-report-menu-left">
                    <div className="educare-mis-report-menu-left-inner">
                        <i className='icon-cap'></i>
                        <h4>{title}</h4>
                    </div>
                </div>
                <div className="educare-mis-report-menu-right">
                    <div className="educare-mis-report-category">
                        <div className="educare-mis-report-category-wrap">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoMenusHeaderMenus;
