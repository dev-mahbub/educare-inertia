import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

export default function PurchaseHistoryPopup({
    listPopup,
    setListPopup,
    bookList = [],
}) {
    const [bookListData, setBookListData] = useState(bookList)
    const closeModal = () => {
        setListPopup(false);
    };
    useEffect(() => {
        setBookListData(bookList);
    }, [bookList]);

    return (
        <>
            <section
                className="educare-admission-follow-up-area space-y-6"
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3 mb-4">
                                <h5>Book details</h5>
                            </div>

                            <div className="grid grid-cols-12 gap-5 mb-7">
                                <div className="col-span-12">
                                    <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>SL. No</th>
                                                        <th>Book title</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bookListData?.length > 0 ?
                                                        bookListData?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{++index}</td>
                                                                <td>{item?.book_title}</td>
                                                                <td>{item?.quantity}</td>
                                                                <td>{item?.price}</td>
                                                                <td>{item?.item_total_price}</td>
                                                            </tr>
                                                        )) :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-end gap-2.5">
                                <PrimaryButton
                                    className="educare-gray-btn-md-stroke"
                                    onClick={closeModal}
                                    type="button"
                                >
                                    Close
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
