import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

export default function StudentPaymentReportList({ vouchers, students, StudentFees }) {

/* table dynamic */
const rowsData = [
    {
      id: 1,
      sr: 1,
      studentName: "Vineet Raj Singh	",
      admissionNumber: 54,
      className: "XI A",
      routeName: "popoopop",
      stoppageName: "tiss",
      vehicles: 5677777,
      phone: 1234567898,
      transportType: "PickAndDrop",
      transportFee: 1000,
      allocationDate: "12-Dec-2023",
      prevDue: 1000,
      fromDate: 1000,
      toDate: 600,
      totalAmount: 2600,
    },
    {
      id: 2,
      sr: 2,
      studentName: "Vineet Raj",
      admissionNumber: 55,
      className: "XI B",
      routeName: "popoopop",
      stoppageName: "tiss",
      vehicles: 5677777,
      phone: 1234567898,
      transportType: "PickAndDrop",
      transportFee: 600,
      allocationDate: "12-Dec-2023",
      prevDue: 800,
      fromDate: 900,
      toDate: 700,
      totalAmount: 2300,
    },
  ];

  const rows = rowsData.map((item) =>
    createData(item.id, item.sr, item.studentName, item.admissionNumber, item.className, item.routeName, item.stoppageName, item.vehicles, item.phone, item.transportType, item.transportFee, item.allocationDate, item.prevDue, item.fromDate, item.toDate, item.totalAmount)
  );

  function createData(id, sr, studentName, admissionNumber, className, routeName, stoppageName, vehicles, phone, transportType, transportFee, allocationDate,
      prevDue, fromDate, toDate, totalAmount ) {
    return {
      id, sr, studentName, admissionNumber, className, routeName, stoppageName, vehicles, phone, transportType, transportFee, allocationDate,
      prevDue, fromDate, toDate, totalAmount
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
      id: "sr",
      numeric: false,
      disablePadding: true,
      label: "Sr",
    },
    {
      id: "studentName",
      numeric: true,
      disablePadding: false,
      label: "Student Name",
    },
    {
      id: "admissionNumber",
      numeric: true,
      disablePadding: false,
      label: "Admission Number",
    },
    {
      id: "className",
      numeric: true,
      disablePadding: false,
      label: "Class Name",
    },
    {
      id: "routeName",
      numeric: true,
      disablePadding: false,
      label: "Route Name",
    },
    {
      id: "stoppageName",
      numeric: true,
      disablePadding: false,
      label: "Stoppage Name",
    },
    {
      id: "vehicles",
      numeric: true,
      disablePadding: false,
      label: "Vehicles",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "transportType",
      numeric: true,
      disablePadding: false,
      label: "Transport Type",
    },
    {
      id: "transportFee",
      numeric: true,
      disablePadding: false,
      label: "Transport Fee",
    },
    {
      id: "allocationDate",
      numeric: true,
      disablePadding: false,
      label: "Allocation Date",
    },
    {
      id: "prevDue",
      numeric: true,
      disablePadding: false,
      label: "Prev. Due",
    },
    {
      id: "fromDate",
      numeric: true,
      disablePadding: false,
      label: "From Date",
    },
    {
      id: "toDate",
      numeric: true,
      disablePadding: false,
      label: "To Date",
    },
    {
      id: "totalAmount",
      numeric: true,
      disablePadding: false,
      label: "Total Amount",
    }
  ];
    /* End table dynamic */

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <div className="educare-common-mat-list w-full">
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
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === "desc" ? "sorted descending" : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
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
                      <TableCell>{row.sr}</TableCell>
                      <TableCell>{row.studentName}</TableCell>
                      <TableCell>{row.admissionNumber}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.routeName}</TableCell>
                      <TableCell>{row.stoppageName}</TableCell>
                      <TableCell>{row.vehicles}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.transportType}</TableCell>
                      <TableCell>{row.transportFee}</TableCell>
                      <TableCell>{row.allocationDate}</TableCell>
                      <TableCell>{row.prevDue}</TableCell>
                      <TableCell>{row.fromDate}</TableCell>
                      <TableCell>{row.toDate}</TableCell>
                      <TableCell>{row.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={15} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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
    </>
  );
}
