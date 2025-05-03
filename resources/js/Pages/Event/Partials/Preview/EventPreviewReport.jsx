import userImg from '../../../../../images/user/author.png';

const EventPreviewReport = ({
    eventData
}) => {

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    console.log(eventData);

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className="grid grid-cols-12 gap-[20px]">
                <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                    <div className="educare-classroom-table-wrapper  max-h-[420px]">
                        <div className="educare-default-table xs:overflow-x-auto mt-2">
                            <table>
                                <thead>
                                    <tr>
                                        <th
                                            className="!px-[1rem]"
                                        >
                                            <div
                                                className="flex justify-between"
                                            >
                                                <h3>Event Details</h3>
                                                <h4 className='badge primary'>Total Activity : { eventData?.event_activities?.length ?? 0 }</h4>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                         >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Event Title :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {eventData?.title}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                        >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Level :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {eventData?.event_level}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                        >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Venus :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {eventData?.location}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                        >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Duration :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {eventData?.start_date} - {eventData?.end_date}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                        >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Total Budget :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {formatNumber(eventData?.event_budget)}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="!pl-[0.25rem]"
                                        >
                                            <div
                                                className="flex"
                                            >
                                                <h5
                                                    className="text-right w-[20%]"
                                                >
                                                    Instruction :
                                                </h5>
                                                <p
                                                    className="text-left w-[80%] pl-2"
                                                >
                                                    {eventData?.description}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                    <div className="educare-classroom-table-wrapper max-h-[420px] overflow-y-auto">
                        <div className="educare-default-table xs:overflow-x-auto mt-2">
                            <table>
                                <thead>
                                    <tr>
                                        <th
                                            className="!px-[1rem]"
                                        >
                                            <h3>Event Incharge List</h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData?.staffs?.length > 0 &&
                                        eventData?.staffs?.map((staff, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td>
                                                    <div
                                                        className="flex"
                                                    >
                                                        <div
                                                            className="w-[50px] mr-2"
                                                        >
                                                            <img src={staff?.staff_profile_image != null ? staff?.staff_profile_image?.path : userImg} className="max-w-full w-[48px] h-[48px]"/>
                                                        </div>
                                                        <div>
                                                            <h4>{staff?.first_name} {staff?.middle_name} {staff?.last_name}</h4>
                                                            <p>
                                                                <span
                                                                    className="mr-2"
                                                                >
                                                                    <i className='icon-PhoneCall mr-2'></i>
                                                                </span>
                                                                {staff?.phone}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {eventData?.event_activities?.length > 0 &&
                eventData?.event_activities?.map((item, index) => (
                    <div className="grid grid-cols-12 gap-[20px] mt-4" key={index}>
                        <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                            <div className="educare-classroom-table-wrapper  max-h-[420px]">
                                <div className="educare-default-table xs:overflow-x-auto mt-2">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th
                                                    className="!px-[1rem]"
                                                >
                                                    <div
                                                        className="flex justify-between"
                                                    >
                                                        <h3>Activity Details - {++index}</h3>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    className="!pl-[0.25rem]"
                                                >
                                                    <div
                                                        className="flex"
                                                    >
                                                        <h5
                                                            className="text-right w-[20%]"
                                                        >
                                                            Activity  Title :
                                                        </h5>
                                                        <p
                                                            className="text-left w-[80%] pl-2"
                                                        >
                                                            {item?.title}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="!pl-[0.25rem]"
                                                >
                                                    <div
                                                        className="flex"
                                                    >
                                                        <h5
                                                            className="text-right w-[20%]"
                                                        >
                                                            Activity Type :
                                                        </h5>
                                                        <p
                                                            className="text-left w-[80%] pl-2"
                                                        >
                                                            {item?.is_group_activity == true ? 'Group Activity' : 'Individual Activity'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="!pl-[0.25rem]"
                                                >
                                                    <div
                                                        className="flex"
                                                    >
                                                        <h5
                                                            className="text-right w-[20%]"
                                                        >
                                                            Duration  :
                                                        </h5>
                                                        <p
                                                            className="text-left w-[80%] pl-2"
                                                        >
                                                            {item?.start_date} - {item?.end_date}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="!pl-[0.25rem]"
                                                >
                                                    <div
                                                        className="flex"
                                                    >
                                                        <h5
                                                            className="text-right w-[20%]"
                                                        >
                                                            Time :
                                                        </h5>
                                                        <p
                                                            className="text-left w-[80%] pl-2"
                                                        >
                                                            {item?.start_time} - {item?.end_time}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="!pl-[0.25rem]"
                                                >
                                                    <div
                                                        className="flex"
                                                    >
                                                        <h5
                                                            className="text-right w-[20%]"
                                                        >
                                                            Winners :
                                                        </h5>
                                                        <div
                                                            className="text-left w-[80%] pl-2 grid grid-cols-12 gap-[10px]"
                                                        >
                                                            {item?.winners && Object.keys(item?.winners)?.length > 0 &&
                                                                Object.values(item?.winners)?.map((winner, index) => (
                                                                    <div
                                                                        className="flex lg:col-span-6 col-span-12"
                                                                        key={index}
                                                                    >
                                                                        <div
                                                                            className="w-[50px] mr-2"
                                                                        >
                                                                            <img src={winner?.student_image != null ? winner?.student_image?.path : userImg} className="max-w-full w-[48px] h-[48px]" />
                                                                        </div>
                                                                        <div>
                                                                            <h4>{winner?.first_name} {winner?.middle_name} {winner?.last_name}</h4>
                                                                            <h6>
                                                                                {winner?.classroom_title}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                            <div className="educare-classroom-table-wrapper max-h-[420px] overflow-y-auto">
                                <div className="educare-default-table xs:overflow-x-auto mt-2">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th
                                                    className="!px-[1rem]"
                                                >
                                                    <h3>Activity - {index} ( Participants)</h3>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item?.students && Object.keys(item?.students)?.length > 0 &&
                                                Object.values(item?.students)?.map((student, innerIndex) => (
                                                    <tr
                                                        key={innerIndex}
                                                    >
                                                        <td>
                                                            <div
                                                                className="flex"
                                                            >
                                                                <div
                                                                    className="w-[50px] mr-2"
                                                                >
                                                                    <img src={student?.student_image != null ? student?.student_image?.path : userImg} className="max-w-full w-[48px] h-[48px]"/>
                                                                </div>
                                                                <div>
                                                                    <h4>{student?.first_name} {student?.middle_name} {student?.last_name}</h4>
                                                                    <h6>
                                                                        {student?.classroom_title}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default EventPreviewReport;
