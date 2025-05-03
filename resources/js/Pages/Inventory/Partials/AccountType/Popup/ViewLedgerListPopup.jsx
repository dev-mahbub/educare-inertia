import Modal from '@/Components/Modal';

export default function ViewLedgerListPopup({
    viewLedgerListPopup,
    setViewLedgerListPopup,
    ledgersData,
    setLedgersData
 }) {

    const closeModal = () => {
        setViewLedgerListPopup(false);
        setLedgersData([]);
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={viewLedgerListPopup} onClose={closeModal} maxWidth='4xl'>
                    <div className="educare-popup-form-wrapper">
                        <div className="educare-popup-form-header py-3 px-5">
                            <h5>Ledgers List</h5>
                        </div>
                        <div className="educare-popup-form p-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Ledger Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile No</th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-border/40'>
                                                {
                                                    ledgersData.length > 0 ? (ledgersData.map((item, index) => <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.title}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.mobile}</td>
                                                    </tr>))
                                                        : (<tr>
                                                            <td
                                                                colSpan={4}
                                                                className='text-center'
                                                            >
                                                                <span className="text-danger">
                                                                    Data not found
                                                                </span>
                                                            </td>
                                                        </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
