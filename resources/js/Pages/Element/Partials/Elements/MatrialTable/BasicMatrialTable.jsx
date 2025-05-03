import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function BasicMatrialTable() {
    return (
      <>
        <div className="educare-card-title mt-5">
            <h5>
                <i className="icon-ListBullets"></i>
                Basic Material Table
            </h5>
        </div>
        <div className="educare-common-mat-list w-full">
            <TableContainer component={Paper} className="mb-5">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>Fat(g)</TableCell>
                            <TableCell>Dessert</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>Fat(g)</TableCell>
                            <TableCell>Dessert</TableCell>
                            <TableCell>Dessert</TableCell>
                            <TableCell>Dessert</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>
                              <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                  <div>
                                      <Tooltip
                                          title="Edit"
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
                                          title="View"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-tertiary-btn-sm-fill"
                                          >
                                              <i className="icon-eye"></i>
                                          </button>
                                      </Tooltip>
                                  </div>
                                  <div>
                                      <Tooltip
                                          title="Delete"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-danger-btn-sm-fill"
                                          >
                                              <i className="icon-TrashSimple"></i>
                                          </button>
                                      </Tooltip>
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
                                              <Dropdown.Link href="#">
                                                  <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                  Dummy
                                              </Dropdown.Link>
                                          </Dropdown.Content>
                                      </Dropdown>
                                  </div>                         
                              </div>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>
                              <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                  <div>
                                      <Tooltip
                                          title="Edit"
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
                                          title="View"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-tertiary-btn-sm-fill"
                                          >
                                              <i className="icon-eye"></i>
                                          </button>
                                      </Tooltip>
                                  </div>
                                  <div>
                                      <Tooltip
                                          title="Delete"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-danger-btn-sm-fill"
                                          >
                                              <i className="icon-TrashSimple"></i>
                                          </button>
                                      </Tooltip>
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
                                              <Dropdown.Link href="#">
                                                  <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                  Dummy
                                              </Dropdown.Link>
                                          </Dropdown.Content>
                                      </Dropdown>
                                  </div>                         
                              </div>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>Frozen yoghurt</TableCell>
                            <TableCell>159</TableCell>
                            <TableCell>6.0</TableCell>
                            <TableCell>
                              <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                  <div>
                                      <Tooltip
                                          title="Edit"
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
                                          title="View"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-tertiary-btn-sm-fill"
                                          >
                                              <i className="icon-eye"></i>
                                          </button>
                                      </Tooltip>
                                  </div>
                                  <div>
                                      <Tooltip
                                          title="Delete"
                                          placement="top"
                                          arrow
                                      >
                                          <button type="button"
                                              className="educare-danger-btn-sm-fill"
                                          >
                                              <i className="icon-TrashSimple"></i>
                                          </button>
                                      </Tooltip>
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
                                              <Dropdown.Link href="#">
                                                  <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                  Dummy
                                              </Dropdown.Link>
                                          </Dropdown.Content>
                                      </Dropdown>
                                  </div>                         
                              </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
      </>
    );
}
