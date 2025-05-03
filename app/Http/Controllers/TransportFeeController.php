<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ICompanyRepository;
use App\Repositories\TransportRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\ISiteSettingRepository;
use App\Http\Requests\TransportFeeSettingRequest;


class TransportFeeController extends Controller
{
    public function __construct(
        private ITransportRepository $transportRepository,
        private ICompanyRepository $companyRepository,
        private ISiteSettingRepository $siteSettingRepository,
    ) {
        $this->middleware('permission:view transport', ['only' => ['feeSetting']]);
        $this->middleware('permission:add transport', ['only' => ['save', 'saveTransportVoucherSetting']]);
    }

    public function feeSetting(): Response
    {
        $companies = $this->companyRepository->getActiveAll();
        $transportSettingsData = getSiteSettingDataByType('Transport');

        return Inertia::render('Transport/FeeSetting', [
            'companies' => $companies,
            'transportSettingsData' => !empty($transportSettingsData['Transport']) ? $transportSettingsData['Transport'] : [],
        ]);
    }


    /*
    *   save transport fee setting
    */
    public function save(Request $request): RedirectResponse
    {
        $input = $request->all();

        $dataArray = array(
            'transport_teacher_payable' => !empty($input['teacher_transport_payable']) ? $input['teacher_transport_payable'] : null,
            'transport_company' => !empty($input['company']) ? $input['company'] : null,
        );

        $feeSetting = setSiteSettingDataArray('Transport', $dataArray);

        if (!$feeSetting) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('transport.fee_setting')->with('message', 'Transport Setting successfully.');
    }

    /*
    *   save transport voucher setting
    */
    public function saveTransportVoucherSetting(Request $request)
    {
        $input = $request->all();

        $transportFeeStructure = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Transport', 'transport_fee_structure');

        if ($transportFeeStructure != null) {
            return redirect()->route('transport.fee_setting')->with('error', 'You have already changed setting for this session, you cannot change setting in this session.');
        }

        $dataArray = array(
            'transport_fee_structure' => !empty($input['fee_structure']) ? $input['fee_structure'] : 'fee',
        );

        $feeSetting = setSiteSettingDataArray('Transport', $dataArray);

        if (!$feeSetting) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('transport.fee_setting')->with('message', 'Transport Setting successfully.');
    }
}
