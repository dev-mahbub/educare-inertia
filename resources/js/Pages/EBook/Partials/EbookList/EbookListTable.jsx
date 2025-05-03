import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const EbookListTable = ({
    ebookList = []
}) => {

    const handleDownload = (e, document_url) => {
        e.preventDefault();
        router.post(route('ebook.download'), { document_url: document_url });
    }

    // delete
    const handleDelete = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("ebook.destroy", id));
            }
        });
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            eBooks
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Book Title</th>
                                        <th>File Name</th>
                                        <th>Edition</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ebookList.length > 0 ? (
                                        ebookList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.book_title}</td>
                                                <td>{item?.document_name}</td>
                                                <td>{item?.edition}</td>
                                                <td>{item?.author}</td>
                                                <td>{item?.book_category?.title}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Download"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={(e) => handleDownload(e, item?.document?.path)}
                                                                    download
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-DownloadSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="View"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a target="__blank"
                                                                    type="button"
                                                                    className="educare-tertiary-btn-sm-fill"
                                                                    href={item?.document?.path}
                                                                >
                                                                    <i className="icon-eye"></i>
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handleDelete(e, item?.id)}
                                                                    className="educare-danger-btn-sm-fill"
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EbookListTable;
