import Modal from '@/Components/Modal';
import { concatName } from "@/Hooks/GlobalFunction";
import moment from 'moment/moment';

export default function TransportDetailPopup({
    className = '',
    transportDetailPopup,
    setTransportDetailPopup,
    transportDetailData,
    setTransportDetailData
}) {

    const closeModal = () => {
        setTransportDetailPopup(false);
        setTransportDetailData({});
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={transportDetailPopup} onClose={closeModal}>
                    <div className="educare-popup-form-wrapper mb-5">
                        <div
                            className="p-[30px] pt-2.5"
                        >
                            <div className="educare-popup-form-header py-3">
                                <h5>Student Transport Detail</h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <div>
                                                    <span className='font-bold'>Student name : </span> {concatName(transportDetailData?.first_name, transportDetailData?.middle_name, transportDetailData?.last_name)}
                                                </div>
                                                <div>
                                                    <span className='font-bold'>Admission number : </span> {transportDetailData?.admission_no}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><span className='font-bold'>Route name : </span> {transportDetailData?.allocate_transport?.route_name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className='font-bold'>Transport Type : </span> {transportDetailData?.allocate_transport?.transport_type}
                                            </td>
                                            <td>
                                                <span className='font-bold'>Vehicle No : </span>
                                                {transportDetailData?.allocate_transport?.vehicle_number}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className='font-bold'>Vehicle Type : </span> {transportDetailData?.allocate_transport?.vehicle_type}
                                            </td>
                                            <td>
                                                <span className='font-bold'>Timing : </span>
                                                {transportDetailData?.allocate_transport?.timing && moment(transportDetailData?.allocate_transport?.timing, "HH:mm:ss").format("h:mm A")}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className='font-bold'>Driver  : </span> {transportDetailData?.allocate_transport?.driver_name}
                                            </td>
                                            <td>
                                                <span className='font-bold'>Conductor : </span>
                                                {transportDetailData?.allocate_transport?.conductor_name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className='font-bold'>Driver Mobile  : </span> {transportDetailData?.allocate_transport?.driver_mobile}
                                            </td>
                                            <td>
                                                <span className='font-bold'>Conductor Mobile : </span>
                                                {transportDetailData?.allocate_transport?.conductor_mobile}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className='font-bold'>Applied On  : </span> {transportDetailData?.allocate_transport?.applied_on_date_at && moment(transportDetailData?.allocate_transport?.applied_on_date_at).format("DD MMM, YYYY")}
                                            </td>
                                            <td>
                                                <span className='font-bold'>Transport Fee : </span>
                                                {transportDetailData?.allocate_transport?.transport_fee}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
