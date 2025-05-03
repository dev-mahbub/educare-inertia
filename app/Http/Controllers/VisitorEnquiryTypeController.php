<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VisitorRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\VisitorEnquiryRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IVisitorEnquiryRepository;
use App\Http\Requests\VisitorEnquiryTypeRequest;
use App\Repositories\IVisitorEnquiryRepositoryType;

class VisitorEnquiryTypeController extends Controller
{
    
    public function __construct( 
        private IVisitorEnquiryRepository $visitorEnquiryRepository,
        private IVisitorEnquiryRepositoryType $visitorEnquiryRepositoryType
    ) 
    {
        $this->middleware('permission:view enquiry', ['only' => ['enquiry', 'type', 'setting', 'gatePass', 'gatePassClassWise']]);
        $this->middleware('permission:add enquiry', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit enquiry', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete enquiry', ['only' => ['destroy']]);
    }

     /**
     * Display The Enquiry Type List.
     */
    public function index(Request $request): Response
    {
        $visitorsTypes = $this->visitorEnquiryRepositoryType->getActiveAll();
        $singleVisitorType = null;
        if(!empty($request->id)){
            $singleVisitorType = $this->visitorEnquiryRepositoryType->getById($request->id);
        }

        return Inertia::render('VisitorEnquiry/EnquiryType', [
            'visitorsTypes' => $visitorsTypes,
            'singleVisitorType' => $singleVisitorType,
        ]);
    }

    /**
     * Save The Enquiry Type.
     */
    public function save(VisitorEnquiryTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'description' => !empty($input['description']) ? $input['description'] : "",
            'status' => Status::ACTIVE,
        );

        $this->visitorEnquiryRepositoryType->create($dataArray);
        
        return redirect()->back()->with('message', 'Visitor Enquiry Type Created successfully');
    }

    /**
     * Update the Enquiry Type.
    */
    public function update(VisitorEnquiryTypeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'description' => !empty($input['description']) ? $input['description'] : "",
            'status' => Status::ACTIVE,
        );

        $this->visitorEnquiryRepositoryType->update($id, $dataArray);
        
        return redirect()->back()->with('message', 'Visitor Enquiry Type Updated successfully');
    }

    /**
     * Delete the Enquiry Type.
    */
    public function destroy(int $id): RedirectResponse
    {
        $visitorEnquiry = $this->visitorEnquiryRepositoryType->getById($id);
        
        if(empty($visitorEnquiry)){
            return redirect()->back()->with('error', 'Visitor Enquiry Type not found');
        }

        $this->visitorEnquiryRepositoryType->delete($id);

        return redirect()->back()->with('message', 'Visitor Enquiry Type Deleted successfully');
    }
}
