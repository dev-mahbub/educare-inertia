// import DashboardLayout from '@/Layouts/DashboardLayout';
// import { Head } from '@inertiajs/react';
// import VoucherSettingInnerLayout from './Partials/VoucherSetting/transport/voucher-due-setting';
// const match = '';
// const updateIcon = '';
// const deleteIcon = '';

// export default function EditVoucherSetting({ auth, siteData, mustVerifyEmail, status, schools,vouchers }) {
//     return (
//         <DashboardLayout
//             user={auth.user}
//             siteData={siteData}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Voucher Setting</h2>}
//         >
//             <Head title="Voucher Setting" />

//             <VoucherSettingInnerLayout 
//                 vouchers = {vouchers}
//             />
//         </DashboardLayout>
//     );
// }


import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditVoucherSettingInnerLayout from './Partials/EditVoucherSetting/EditVoucherSettingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function EditSetting({ auth, siteData, mustVerifyEmail, status, schools,vouchers,voucher }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Voucher Setting</h2>}
        >
            <Head title="Voucher Setting" />

            <EditVoucherSettingInnerLayout 
                vouchers = {vouchers}
                voucher = {voucher}
            />
        </DashboardLayout>
    );
}
