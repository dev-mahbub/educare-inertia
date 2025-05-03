import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
const RegisterViewReportTable = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_month: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            {/*  filter */}
            <form onSubmit={headerTopData}>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Register View Leave Report
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-select-field-styles">
                            <SelectInput
                                id="select_month"
                                data_label="Month"
                                data={[]}
                                value={data.select_month}
                                onChange={(e) =>
                                    setData("select_month", e.target.value)
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.select_month}
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-filter-action-btn flex flex-wrap gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* end  filter */}

            {/* large table */}
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list educare-full-container-scrollable-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Emp Id</th>
                                <th>Teacher Name</th>
                                <th>Designation</th>
                                <th>Mobile</th>
                                {/* 30 date */}
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                                <th>13</th>
                                <th>14</th>
                                <th>15</th>
                                <th>16</th>
                                <th>17</th>
                                <th>18</th>
                                <th>19</th>
                                <th>20</th>
                                <th>21</th>
                                <th>22</th>
                                <th>23</th>
                                <th>24</th>
                                <th>25</th>
                                <th>26</th>
                                <th>27</th>
                                <th>28</th>
                                <th>29</th>
                                <th>30</th>
                                <th>31</th>

                                {/* end 30 date */}
                                <th>PL</th>
                                <th>PL_Balance</th>
                                <th>CL</th>
                                <th>CL_Balance</th>
                                <th>ML</th>
                                <th>ML_Balance</th>
                                <th>SL</th>
                                <th>SL_Balance</th>
                                <th>LWP</th>
                                <th>LWP_Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0214</td>
                                <td>Neha Kumar</td>
                                <td>Teacher</td>
                                <td>9430056700</td>
                                {/* 30 date */}
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                {/* end 30 date */}
                                <td>10</td>
                                <td>0.00</td>
                                <td>9.5</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                            </tr>
                            <tr>
                                <td>0214</td>
                                <td>Neha Kumar</td>
                                <td>Teacher</td>
                                <td>9430056700</td>
                                {/* 30 date */}
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                {/* end 30 date */}
                                <td>10</td>
                                <td>0.00</td>
                                <td>9.5</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                                <td>10.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* end large table */}
        </>
    );
};

export default RegisterViewReportTable;
