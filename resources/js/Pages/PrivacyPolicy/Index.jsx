import { Link, Head } from '@inertiajs/react';

export default function Index({ auth, siteData, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
          

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
        

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8">
                   

                            <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                                <div>
          

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        Privacy & Policy
                                    </h2>

                                    <p>&nbsp;</p>
                                    <p>These terms and conditions applies to the Erp Edu Care app (hereby referred to as "Application") for mobile devices that was created by Indiana Infotech (hereby referred to as "Service Provider") as a Free service.

                        Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.

                        The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.

                        The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone's security features, and may result in the Application not functioning correctly or at all.

                        Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:

                        *   [Google Play Services](https://policies.google.com/terms)

                        Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.

                        If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider's agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming. If you are not the bill payer for the device on which you are using the application, they assume that you have obtained permission from the bill payer.

                        Similarly, the Service Provider cannot always assume responsibility for your usage of the application. For instance, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the Service, the Service Provider cannot be held responsible.

                        In terms of the Service Provider's responsibility for your use of the application, it is important to note that while they strive to ensure that it is updated and accurate at all times, they do rely on third parties to provide information to them so that they can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on this functionality of the application.

                        The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.

                        **Changes to These Terms and Conditions**

                        The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.

                        These terms and conditions are effective as of 2024-08-04 </p>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        Permissions
                                    </h2>

                                    <p><strong>android.permission.INTERNET:</strong></p>
                                    <p>Purpose: Allows the app to open network sockets and access the internet.
                                    Use Case: Necessary for applications that need to access the internet to download data, communicate with web services, or perform online actions.</p>
                                    
                                    <p><strong>android.permission.ACCESS_NETWORK_STATE:</strong></p>
                                    <p>Purpose: Allows the app to access information about networks.
                                    Use Case: This permission lets the app determine if there is an active network connection, what type of connection it is (e.g., Wi-Fi, mobile data), and if the device is connected to the internet.</p>
                                    
                                    <p><strong>android.permission.WRITE_EXTERNAL_STORAGE:</strong></p>
                                    <p>Purpose: Allows the app to write to external storage.
                                    Use Case: Used when an app needs to save files to the device’s external storage, such as images, videos, or documents. Starting from Android 10 (API level 29), this permission is deprecated, and apps should use the scoped storage model for accessing external files.</p>
                                    
                                    <p><strong>android.permission.READ_EXTERNAL_STORAGE:</strong></p>
                                    <p>Purpose: Allows the app to read from external storage.
                                    Use Case: Required for apps that need to read files from external storage, like accessing user photos, videos, or documents. Like WRITE_EXTERNAL_STORAGE, this permission is affected by the scoped storage changes in Android 10 and later.</p>

                                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                        Contact Us
                                    </h2>
                                    <p>&nbsp;</p>
                                    <p>If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at erpeducare@gmail.com.</p>
                        
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                            ERP Edu Care
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
