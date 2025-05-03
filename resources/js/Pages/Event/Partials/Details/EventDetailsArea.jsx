import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import TertiaryButton from '@/Components/TertiaryButton';
import { useState } from 'react';
import Document from './Document/Document';
import EventsActivities from './EventsActivities/EventsActivities';
import Incharge from './Incharge/Incharge';

const EventDetailsArea = ({
    eventData,
    staffRoles,
    classGroups,
    staffs,
    fileTypes
}) => {
    const [eventDetailsValue, setEventDetailsValue] = useState('')
    const handleEventDetails = (buttonType) => {
        setEventDetailsValue(buttonType);
    }

    return (
        <>
            <div className="flex items-center flex-wrap gap-2 mb-4">
                <TertiaryButton
                    // disabled={processing}
                    className="educare-secondary-btn-md-fill"
                    onClick={() => handleEventDetails('Activities')}
                >
                    <i className='icon-event'></i> Event Activities
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-md-fill"
                    onClick={() => handleEventDetails('Incharge')}
                >
                    <i className='icon-Table'></i> Incharge
                </SuccessButton>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                    onClick={() => handleEventDetails('Documents')}
                >
                    <i className='icon-NotePencil'></i> Documents
                </PrimaryButton>
            </div>
            <div>
                {
                    eventDetailsValue === 'Activities' ? (
                        <EventsActivities
                            eventData={eventData}
                        />
                    ) : (eventDetailsValue === 'Incharge' ? (
                        <Incharge
                                staffRoles={staffRoles}
                                eventData={eventData}
                                classGroups={classGroups}
                                staffs={staffs}
                        />
                    ) :
                            (eventDetailsValue === 'Documents' ? (
                                <Document
                                    eventData={eventData}
                                    fileTypes={fileTypes}
                                />
                            ) :
                            (
                                <EventsActivities
                                        eventData={eventData}
                                />
                            )
                        )
                    )
                }
            </div>
        </>
    );
};

export default EventDetailsArea;
