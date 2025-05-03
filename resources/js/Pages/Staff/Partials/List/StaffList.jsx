import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { Tab, Tabs, Tooltip } from '@mui/material';
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
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StaffCredentialPopup from '../Popup/StaffCredentialPopup';


const Menus = [
    { id: 1, menu: 'All' },
    { id: 2, menu: 'A' },
    { id: 3, menu: 'B' },
    { id: 4, menu: 'C' },
    { id: 5, menu: 'D' },
    { id: 6, menu: 'E' },
    { id: 7, menu: 'F' },
    { id: 8, menu: 'G' },
    { id: 9, menu: 'H' },
    { id: 10, menu: 'I' },
    { id: 11, menu: 'J' },
    { id: 12, menu: 'K' },
    { id: 13, menu: 'L' },
    { id: 14, menu: 'M' },
    { id: 15, menu: 'N' },
    { id: 16, menu: 'O' },
    { id: 17, menu: 'P' },
    { id: 18, menu: 'Q' },
    { id: 19, menu: 'R' },
    { id: 20, menu: 'S' },
    { id: 21, menu: 'T' },
    { id: 22, menu: 'U' },
    { id: 23, menu: 'V' },
    { id: 24, menu: 'W' },
    { id: 25, menu: 'X' },
    { id: 26, menu: 'Y' },
    { id: 27, menu: 'Z' },
];

function createData(id, sl_no, employee_id, name, staff_type, department_name, designation_name, user_roll_type, phone, email, username, parent_pass) {
    return {
        id, sl_no, employee_id, name, staff_type, department_name, designation_name, user_roll_type, phone, email, username, parent_pass
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
        label: "Sl. No",
    },
    {
        id: "employee_id",
        numeric: true,
        disablePadding: false,
        label: "Emp. ID",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Staff Name",
    },
    {
        id: "staff_type",
        numeric: true,
        disablePadding: false,
        label: "Staff Type",
    },
    {
        id: "department_name",
        numeric: true,
        disablePadding: false,
        label: "Department",
    },
    {
        id: "designation_name",
        numeric: true,
        disablePadding: false,
        label: "Designation",
    },
    {
        id: "user_roll_type",
        numeric: true,
        disablePadding: false,
        label: "Role",
    },
    {
        id: "phone",
        numeric: true,
        disablePadding: false,
        label: "Phone",
    },
];


const StaffList = ({ staffs }) => {
    const [value, setValue] = useState(0);
    const [staffCreditData, setStaffCreditData] = useState(staffs?.email);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [staffCredentialPopup, setStaffCredentialPopup] = useState(false);
    const handleCredentialModalClick = (id, email, phone, username, pass) => {
        setStaffCreditData({ id, email, phone, username, pass });
        setStaffCredentialPopup(!staffCredentialPopup);
    };

    const concatName = (first_name = "Name", middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    // delete
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
                router.delete(route('staff.destroy', id));
            }
        });
    }

    // make in inactive
    // make inactive
    const handelInactive = (id) => {
        let reasonInputValue; // Variable to store the input value

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure to make this staff inactive?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Reason",
                    input: "text",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "Confirm",
                    showLoaderOnConfirm: true,
                    preConfirm: (reason) => {
                        reasonInputValue = reason;
                        return reason;
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.post(route('staff.inactive', id), reasonInputValue);
                    }
                });
            }
        });
    };

    const handleStaffOrder = (e, order_text) => {
        e.preventDefault();
        router.post(route('staff.list'), { order_text });
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        router.post(route('staff.edit'), {id: id});
    }

    const handleDetails = (e, id) => {
        e.preventDefault();
        router.post(route('staff.staff_details'), {id: id});
    }

    // material ui table
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const rows = staffs.map((item, index) =>
        createData(item.id, index + 1, item?.employee_id, concatName(item?.first_name, item?.middle_name, item?.last_name), item?.staff_type, item?.department_name, item?.designation_name, item?.user_roll_type, item?.phone, item?.email, item?.username, item?.parent_pass)
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

    return (
        <>
            <div className="educare-letter-filter-area pt-2">
                <div className="educare-letter-filter">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        className='mb-5'
                    >
                        {Menus.map((menu, index) => (
                            <Tab key={index} onClick={(e) => handleStaffOrder(e, menu.menu)} label={menu.menu} />
                        ))}
                    </Tabs>

                    {Menus.map((menu, index) => (
                        <div key={index} hidden={value !== index}>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
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
                                                                        <TableCell>{row.employee_id}</TableCell>
                                                                        <TableCell>{row.name}</TableCell>
                                                                        <TableCell>{row.staff_type}</TableCell>
                                                                        <TableCell>{row.department_name}</TableCell>
                                                                        <TableCell>{row.designation_name}</TableCell>
                                                                        <TableCell>{row.user_roll_type}</TableCell>
                                                                        <TableCell>{row.phone}</TableCell>
                                                                        <TableCell>
                                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                                <div>
                                                                                    <Tooltip
                                                                                        title="Make Inactive"
                                                                                        placement="top"
                                                                                        arrow
                                                                                        as="button"
                                                                                    >
                                                                                        <button
                                                                                            type='button'
                                                                                            onClick={(e) => handelInactive(row.id)}
                                                                                            className="educare-danger-btn-sm-fill"
                                                                                        >
                                                                                            <i className="icon-warning"></i>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                <div>
                                                                                    <Tooltip
                                                                                        title="Edit"
                                                                                        placement="top"
                                                                                        arrow
                                                                                    >
                                                                                        <Link
                                                                                            href="#" onClick={(e) => handleEdit(e, row.id)}
                                                                                            className="educare-warning-btn-sm-fill"
                                                                                        >
                                                                                            <i className="icon-editing"></i>
                                                                                        </Link>
                                                                                    </Tooltip>
                                                                                </div>
                                                                                <div>
                                                                                    <PrimaryButton
                                                                                        onClick={(e) => handleDelete(row.id)}
                                                                                        type="button"
                                                                                        className="educare-danger-btn-sm-fill"
                                                                                    >
                                                                                        <i className="icon-TrashSimple"></i>
                                                                                    </PrimaryButton>
                                                                                </div>
                                                                                <div className='relative'>
                                                                                    <Dropdown>
                                                                                        <Dropdown.Trigger>
                                                                                            <div className="educare-dropdown-menu">
                                                                                                <button type="button" className="educare-dark-btn-sm-fill">
                                                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                                </button>
                                                                                            </div>
                                                                                        </Dropdown.Trigger>
                                                                                        <Dropdown.Content>
                                                                                            <Dropdown.Link href="#" onClick={(e) => handleDetails(e, row.id)}>
                                                                                                <i className="icon-man text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                                Staff Details
                                                                                            </Dropdown.Link>
                                                                                            <a
                                                                                                href={route('pdf_staff.print_staff_details', row.id)}
                                                                                                target='_blank'
                                                                                            >
                                                                                                <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                                Print
                                                                                            </a>
                                                                                            <button type="button" onClick={() => handleCredentialModalClick(row?.id, row?.email, row?.phone, row?.username, row?.parent_pass)}>
                                                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                                Credential
                                                                                            </button>
                                                                                        </Dropdown.Content>
                                                                                    </Dropdown>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <StaffCredentialPopup
                staffCredentialPopup={staffCredentialPopup}
                setStaffCredentialPopup={setStaffCredentialPopup}
                staffCreditData={staffCreditData}
            />
        </>
    );
};

export default StaffList;
