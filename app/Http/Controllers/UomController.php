<?php

namespace App\Http\Controllers;

use App\Repositories\IUomRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Http\Requests\UomRequest;

class UomController extends Controller
{

    public function __construct(
        private IUomRepository $uomRepository
    ) {
        // do something
    }


    /**
     * Display form and list
     */
    public function show(Request $request): Response
    {
        $uoms = $this->uomRepository->getActiveAll();
        return Inertia::render('Inventory/ProductUom', [
            'uoms' => $uoms,
        ]);
    }

    /**
     * save
     */
    public function save(UomRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
            'status' => Status::ACTIVE,
        );

        $uom = $this->uomRepository->create($dataArray);
        if (!$uom) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Uom created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(UomRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? "",
        );

        $uom = $this->uomRepository->update($id, $dataArray);
        if (!$uom) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Uom updated successfully.');
    }

    /**
     * delete uom
     */
    public function destroy(String $id): RedirectResponse
    {
        $uom = $this->uomRepository->getById($id);
        if (!$uom) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        $this->uomRepository->delete($id);
        return redirect()->back()->with('message', 'Uom deleted successfully.');
    }
}
