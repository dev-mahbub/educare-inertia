<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\HostelRoomTypeRequest;
use App\Repositories\HostelRoomRepository;
use App\Repositories\IHostelRoomRepository;
use App\Repositories\HostelRepository;
use App\Repositories\IHostelRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HostelRoomController extends Controller
{

    public function __construct(
        private IHostelRepository $hostelRepository,
        private IHostelRoomRepository $hostelRoomRepository,
    ) {
        $this->middleware('permission:view hostel', ['only' => ['index']]);
        $this->middleware('permission:add hostel', ['only' => ['save']]);
        $this->middleware('permission:delete hostel', ['only' => ['destroy']]);
    }

    /**
     * index
     */
    public function index(Request $request): Response
    {
        $hostelRoomType = $this->hostelRoomRepository->getActiveAll();
        return Inertia::render('HostelRoom/Show', [
            'hostelRoomType' => $hostelRoomType,
        ]);
    }

    /**
     * save
     */
    public function save(HostelRoomTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $conditionData = array(
            'school_id' => getUserSchoolId(),
            'id' => $input['id'] ?? null,
        );
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? null,
            'no_of_bed' => $input['no_of_bed'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );
        $this->hostelRoomRepository->updateOrCreate($conditionData, $dataArray);
        return redirect()->back()->with('message', 'Save successfully.');
    }

    /**
     * destroy
     */
    public function destroy(int $id): RedirectResponse
    {
        $hostelRoomType = $this->hostelRoomRepository->getById($id);
        if (!$hostelRoomType) {
            return redirect()->route('hostel_room.list')->with('errors', 'Something goes wrong.');
        }
        $this->hostelRoomRepository->delete($id);
        return redirect()->route('hostel_room.list')->with(['message' => 'Deleted successfully.']);
    }
}
