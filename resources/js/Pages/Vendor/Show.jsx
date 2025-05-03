import DashboardLayout from '@/Layouts/DashboardLayout';

import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({ auth, siteData, mustVerifyEmail, status, schools }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        

                    {schools ?
                    schools.map((item) => (
                    <div
                      key={item.id}
                      className="educare-table-list flex border-b border-solid border-grayBorder h-12"
                    >
                      <div className="educare-table-checkboxF default-light-theme">
                        <input
                          type="checkbox"
                          id="cbi_1"
                          name="cbi"
                          defaultValue="1"
                          data-select-all="b-check"
                          className="checkme"
                        />
                      </div>
                  
                      <div className="educare-table-companyF">
                        <span> {item.title} </span>
                      </div>
                      <div className="educare-table-companyF">
                        <span> {item.school_code} </span>
                      </div>
                      <div className="educare-table-warehouseF">
                        <span> {item.date} </span>
                      </div>
                      <div className="educare-table-actionF">
                        <div className="dropdown">
                          <button
                            onClick={() => handleOpen(item.id)}
                            className="common-action-menu-style"
                          >
                            Action
                            <i className="fa-sharp fa-solid fa-caret-down"></i>
                          </button>
                          <div
                            className="dropdown-list"
                            style={{
                              display: `${
                                item.id === match && open ? "block" : "none"
                              }`,
                            }}
                          >
                            <button className="dropdown-menu-item">
                              <img src={updateIcon} alt="icon not found" />

                              <Link
                                href={`/client-orders/${item.id}`}
                              >
                            Details
                              </Link>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item.id)}
                              className="dropdown-menu-item"
                            >
                              <img src={deleteIcon} alt="icon not found" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )):
                  <>
                   <p>no list</p>
                  </>}

                    </div>

                
                </div>
            </div>
        </DashboardLayout>
    );
}
