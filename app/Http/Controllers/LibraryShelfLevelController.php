<?php

namespace App\Http\Controllers;

use App\Http\Requests\Library;
use App\Http\Requests\LibrarySelfLevelRequest;
use App\Repositories\LibraryRepository;
use App\Repositories\ILibraryRepository;
use App\Repositories\LibraryShelfLevelRepository;
use App\Repositories\ILibraryShelfLevelRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LibraryShelfLevelController extends Controller
{

    public function __construct(
        private ILibraryShelfLevelRepository $libraryShelfLevelRepository,
        private ILibraryRepository $libraryRepository
    ) {
        $this->middleware('permission:view library', ['only' => ['shelfLevel']]);
        $this->middleware('permission:add library', ['only' => ['shelfLevelSave', 'shelfLevelCreate']]);
        $this->middleware('permission:edit library', ['only' => ['shelfLevelEdit']]);
    }

    /**
     * shelf level
     */
    public function shelfLevel(Request $request): Response
    {
        $librarySelfLevels = $this->libraryShelfLevelRepository->getActiveAllData();

        return Inertia::render('LibraryShelfLevel/ShelfLevel', [
            'librarySelfLevels' => $librarySelfLevels,
        ]);
    }

    /**
     * shelf level save
     */
    public function shelfLevelSave(Request $request)
    {
        try {
            $input = $request->validate(
                [
                    'items' => ['required', 'array'],
                    'items.*.parent_id' => ['nullable', 'integer'],
                    'items.*.name' => ['required', 'string', 'max:255'],
                    'items.*.description' => ['nullable', 'string', 'max:255'],
                ],
            );
            $dataArray = [
                'school_id' => getUserSchoolId() ?? null,
                'parent_id' => $input['items'][0]['parent_id'] ?? null,
                'name' => $input['items'][0]['name'] ?? null,
                'description' => $input['items'][0]['description'] ?? null,
            ];
            $this->libraryShelfLevelRepository->create($dataArray);
            return redirect()->back()->with('message', 'Save successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function shelfLevelCreate(Library $request)
    {
        // dd($request->all());
        $input = $request->validated();

        $items = $input['items'][0] ?? [];  // Access the nested array at index 0

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'parent_id' => $input['parent_id'] ?? null,
            'name' => $input['document_name'] ?? null,
            'description' => $input['description'] ?? null,
        ];

        // Assuming the libraryRepository has a method like saveData
        $libData = $this->libraryRepository->saveData($dataArray);

        return redirect()->back()->with('message', 'Library set successfully');
    }

    public function shelfLevelEdit(int $id, Library $request)
    {
        $input = $request->validated();

        $libData = $this->libraryRepository->findDataForShelf($id);

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'parent_id' => $input['parent_id'] ?? null,
            'name' => $input['document_name'] ?? null,
            'description' => $input['description'] ?? null,
        ];

        $this->libraryRepository->updateDataForShelf($id, $dataArray);

        return redirect()->back()->with('message', 'Data Update Successfuly !');
    }
}
