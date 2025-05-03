import React from 'react';
import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const AddDocumentCategoriesTableList = () => {
    return (
        <div className="educare-default-table xs:overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th>Document category</th>
                        <th>Type</th>
                        <th>Edit|Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TC </td>
                        <td>Student</td>
                        <td>
                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                <div>
                                    <Tooltip
                                        title="Edit Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-warning-btn-sm-fill"
                                        >
                                            <i className="icon-editing"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Delete Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-danger-btn-sm-fill"
                                        >
                                            <i className="icon-TrashSimple"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Aaadhar Card</td>
                        <td>Teacher</td>
                        <td>
                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                <div>
                                    <Tooltip
                                        title="Edit Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-warning-btn-sm-fill"
                                        >
                                            <i className="icon-editing"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Delete Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-danger-btn-sm-fill"
                                        >
                                            <i className="icon-TrashSimple"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Driver License</td>
                        <td>Driver</td>
                        <td>
                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                <div>
                                    <Tooltip
                                        title="Edit Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-warning-btn-sm-fill"
                                        >
                                            <i className="icon-editing"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Delete Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-danger-btn-sm-fill"
                                        >
                                            <i className="icon-TrashSimple"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Doc</td>
                        <td>School</td>
                        <td>
                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                <div>
                                    <Tooltip
                                        title="Edit Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-warning-btn-sm-fill"
                                        >
                                            <i className="icon-editing"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Delete Document"
                                        placement="top"
                                        arrow
                                    >
                                        <Link
                                            href="#"
                                            className="educare-danger-btn-sm-fill"
                                        >
                                            <i className="icon-TrashSimple"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AddDocumentCategoriesTableList;