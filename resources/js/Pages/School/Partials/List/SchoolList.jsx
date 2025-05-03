import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import FollowUpPopupForm from './FollowUpPopupForm';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";


function createData(id, sl_no, title, client_name, street_address, mail, phone, is_generated_domain, phone_2, school_key, city, zip, is_inactive, image) {
    return {
        id, sl_no, title, client_name, street_address, mail, phone, is_generated_domain, phone_2, school_key, city, zip, is_inactive, image
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: "sl_no",
        numeric: true,
        disablePadding: true,
        label: "ID. No",
    },
    {
        id: "photo",
        numeric: true,
        disablePadding: false,
        label: "Logo",
    },
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "School Name",
    },
    {
        id: "client_name",
        numeric: true,
        disablePadding: false,
        label: "Client Name",
    },
    {
        id: "street_address",
        numeric: true,
        disablePadding: false,
        label: "Address",
    },
    {
        id: "mail",
        numeric: true,
        disablePadding: false,
        label: "Mail",
    },
    {
        id: "phone",
        numeric: true,
        disablePadding: false,
        label: "Phone",
    },
    {
        id: "is_generated_domain",
        numeric: true,
        disablePadding: false,
        label: "Domain",
    },
    {
        id: "is_inactive",
        numeric: true,
        disablePadding: false,
        label: "Status",
    },
];

const SchoolList = ({ schools, domain_name }) => {

    const [modalFollowUpOpen, setModalFollowUpOpen] = useState(false);
    const handleModalFollowUpClick = () => {
        setModalFollowUpOpen(!modalFollowUpOpen);
    };

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false])
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        admission_check_id_parent: false,
        admission_check_id_2: false,
        admission_check_id_3: false,
    });

    const AdmissionListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    //form validation end

    // handle checkbox start
    const handleCheckboxChange = (name, value) => {
        let newFormData;

        if (name === 'admission_check_id_parent') {
            newFormData = {
                ...data,
                [name]: value,
                admission_check_id_2: value,
                admission_check_id_3: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            if (value === false) {
                newFormData.admission_check_id_parent = false;
            } else if (
                Object.values(newFormData).slice(1).every(Boolean) &&
                !newFormData.admission_check_id_parent
            ) {
                newFormData.admission_check_id_parent = true;
            }
        }

        setData(newFormData);
    };
    //handle checkbox end

    const handleGenerateDomain = (id, scode) => {
        Swal.fire({
            title: 'Do you want to create domain for this school?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, create domain!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.get('create-school-site?sid=' + id + '&domain=' + scode);
            }

        });
    }

    // handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('school.destroy', id));
            }
        });
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        router.post(route('school.edit'), { id: id });
    }

    // material ui table
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const rows = schools.map((item, index) =>
        createData(item.id,
            index + 1,
            item?.title,
            item?.client_name,
            item?.street_address,
            item?.mail,
            item?.phone,
            item?.is_generated_domain,
            item?.phone_2,
            item?.school_key,
            item?.city, 
            item?.zip, 
            item?.is_inactive, 
            item?.image)
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rows]
    );

    const handleMarkInactive = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, mark inactive!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('school.mark_as_inactive', id), { id: id }, {
                    preserveScroll: true
                });
            }
        });
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={AdmissionListData}>
                            <div className="educare-admission-list">
                                <Box sx={{ width: "100%" }}>
                                    <Paper sx={{ width: "100%", mb: 2 }}>
                                        <TableContainer>
                                            <Table aria-labelledby="tableTitle">
                                                <TableHead>
                                                    <TableRow>
                                                        {headCells.map((headCell) => (
                                                            <TableCell
                                                                key={headCell.id}
                                                                align={headCell.numeric ? "left" : "left"}
                                                                padding={headCell.disablePadding ? "none" : "normal"}
                                                                sortDirection={orderBy === headCell.id ? order : false}

                                                            >
                                                                <TableSortLabel
                                                                    active={orderBy === headCell.id}
                                                                    direction={orderBy === headCell.id ? order : "asc"}
                                                                    onClick={(event) => handleRequestSort(event, headCell.id)}
                                                                    className='!bg-transparent'
                                                                    sx={{
                                                                        '&.MuiButtonBase-root': {
                                                                            color: 'inherit',
                                                                            fontWeight: 'inherit',
                                                                        }
                                                                    }}
                                                                >
                                                                    {headCell.label}
                                                                    {orderBy === headCell.id ? (
                                                                        <Box component="span" sx={visuallyHidden}>
                                                                            {/* {order === "desc" ? "sorted descending" : "sorted ascending"} */}
                                                                        </Box>
                                                                    ) : null}
                                                                </TableSortLabel>
                                                            </TableCell>
                                                        ))}
                                                        <TableCell>
                                                            Actions
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {visibleRows.map((row, index) => (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.id}
                                                            sx={{ cursor: "pointer" }}
                                                        >
                                                            <TableCell>{row.sl_no}</TableCell>
                                                            <TableCell>
                                                                {row?.image?.path ? (
                                                                    <img
                                                                        className="w-10 h-10 rounded-full"
                                                                        src={
                                                                            row?.image?.path
                                                                        }
                                                                        alt={row.title}
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        className="w-10 h-10 rounded-full"
                                                                        src={
                                                                            studentImg
                                                                        }
                                                                        alt={row.title}
                                                                    />
                                                                )}

                                                            </TableCell>
                                                            <TableCell>{row.title}</TableCell>
                                                            <TableCell>{row.client_name}</TableCell>
                                                            <TableCell>
                                                                {row.street_address}
                                                                <br />
                                                                {row.city} {row.zip}
                                                            </TableCell>
                                                            <TableCell>{row.mail}</TableCell>
                                                            <TableCell>
                                                                {row.phone}
                                                                {row.phone_2 ? ', ' + row.phone_2 : ''}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.is_generated_domain == 1 ? (
                                                                    <a href={`https://${row.school_key}.${domain_name}`} target="_blank">
                                                                        {`https://${row.school_key}.${domain_name}`}
                                                                    </a>
                                                                ) : 'Not generate yet!'
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className={row.is_inactive == 0 ? "badge success" : "badge danger"}>{row.is_inactive == 0 ? "Active" : "Inactive"}</span>
                                                            </TableCell>
                                                            <TableCell>

                                                                <div className="educare-admission-list-action-btn">
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Tooltip
                                                                            title="Create Domain"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href="#" as="button"
                                                                                className="educare-dark-btn-md-fill !flex items-center justify-center" 
                                                                                data-domain={row.school_key}
                                                                                data-sid={row.id}
                                                                                onClick={() => handleGenerateDomain(row.id, row.school_key)}
                                                                            >
                                                                                <i className="icon-upload"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Tooltip title="Edit" placement="top" arrow>
                                                                            <Link href="#" onClick={(e) => handleEdit(e, row.id)} className="bg-supportingB/80 inline-block">
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    {/* <div className="educare-list-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleDelete(row.id)}
                                                                    className="bg-danger/80 "
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
                                                            </div> */}
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Dropdown>
                                                                            <Dropdown.Trigger>
                                                                                <div
                                                                                    type="button"
                                                                                    className="educare-dropdown-menu"
                                                                                >
                                                                                    <PrimaryButton className="bg-dark/80 inline-block">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </PrimaryButton>
                                                                                </div>
                                                                            </Dropdown.Trigger>

                                                                            <Dropdown.Content>
                                                                                <Dropdown.Link href="#" type="button" 
                                                                                    onClick={() => handleMarkInactive(row.id)}
                                                                                >
                                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                                    Make Inactive
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-Money text-[20px] text-supportingA"></i>{" "}
                                                                                    Make Payment
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-email text-[20px] text-supportingA"></i>{" "}
                                                                                    Sent Email
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-envelope text-[20px] text-supportingA"></i>{" "}
                                                                                    Sent Welcome Email
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-ChartLineUp text-[20px] text-supportingA"></i>{" "}
                                                                                    School Implementation Plan
                                                                                </Dropdown.Link>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={
                                                                                        handleModalFollowUpClick
                                                                                    }
                                                                                >
                                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                                    Follow Up
                                                                                </button>

                                                                            </Dropdown.Content>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Link href="#" className="bg-supportingC/80 hidden">
                                                                            <i className="icon-eye"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Link href="#" className="bg-danger/80 hidden">
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell colSpan={5} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[50, 100, 250, 500]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </Box>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FollowUpPopupForm modalFollowUpOpen={modalFollowUpOpen} setModalFollowUpOpen={setModalFollowUpOpen} />
        </>
    );
};

export default SchoolList;
