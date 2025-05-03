import DownloadHeaderMenus from '@/Components/Partials/Menus/Download/DownloadHeaderMenus';
import { useState } from 'react';
import GuardianFilter from './GuardianFilter';
import GuardianTable from './GuardianTable';

const GuardianInnerLayout = ({
    guardians = []
}) => {
    const [guardiansData, setGuardiansData] = useState([]);

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                        <DownloadHeaderMenus title="Download Management"/>
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <GuardianFilter
                            guardians={guardians}
                            setGuardiansData={setGuardiansData}
                        />
                        <GuardianTable
                            guardians={guardiansData}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};

export default GuardianInnerLayout;
