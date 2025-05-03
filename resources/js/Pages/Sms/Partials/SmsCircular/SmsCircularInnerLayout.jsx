import { useState } from 'react';
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsCircularForm from './SmsCircularForm';
import SmscircularList from './SmscircularList';

const SmsCircularInnerLayout = ({
    templateCategories,
    templates,
    audienceTypes,
    audienceAttributes,
    smsCirculars
}) => {

    const [selectedSmsCircular, setSelectedSmsCircular] = useState({});
    const [formMode, setFormMode] = useState('create');

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xxl:col-span-8">
                            <SmsCircularForm
                                templateCategories={templateCategories}
                                templates={templates}
                                audienceTypes={audienceTypes}
                                audienceAttributes={audienceAttributes}
                                selectedSmsCircular={selectedSmsCircular}
                                setSelectedSmsCircular={setSelectedSmsCircular}
                                formMode={formMode}
                                setFormMode={setFormMode}
                            />
                        </div>
                        <div className="col-span-12 xxl:col-span-4">
                            <SmscircularList
                                smsCirculars={smsCirculars}
                                setSelectedSmsCircular={setSelectedSmsCircular}
                                setFormMode={setFormMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmsCircularInnerLayout;
