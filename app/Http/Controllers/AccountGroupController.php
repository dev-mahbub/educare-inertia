<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Status;
use App\Http\Requests\AccountGroupRequest;
use App\Repositories\IAccountGroupRepository;

class AccountGroupController extends Controller
{

    public function __construct(
        private IAccountGroupRepository $accountGroupRepository
    ) {
        $this->middleware('permission:view account group', ['only' => ['show']]);
        $this->middleware('permission:add account group', ['only' => ['save', 'saveAcademicGradeItem']]);
        $this->middleware('permission:edit account group', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete account group', ['only' => ['destroy']]);
    }


    /**
     * display form and list
     */
    public function show(Request $request): Response
    {
        $accountGroups = $this->accountGroupRepository->getActiveAll();

        $accountGroups?->loadMissing(['ledgers' => function ($query) {
            $query->where('school_id', getUserSchoolId())
                ->select('id', 'account_group_id', 'title', 'mobile', 'email');
        }]);

        // parent title
        $parentData = $this->accountGroupRepository->getParentNameAndId();
        $parentTitles = $parentData->map(fn($pd) => ['id' => $pd->id, 'title' => $pd->title])->all();


        return Inertia::render('Inventory/CreateAccountGroup', [
            'parentTitles' => $parentTitles,
            'accountGroups' => $accountGroups,
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function save(AccountGroupRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'parent_id' => $input['parent_id'] ?? null,
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'is_system_default' => true,
            'status' => Status::ACTIVE,
        );

        $accountGroup = $this->accountGroupRepository->create($dataArray);
        if (!$accountGroup) {
            return redirect()->route('account_group.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('account_group.list')->with('message', 'Account group created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('account_group.list');
        }

        $accountGroups = $this->accountGroupRepository->getActiveAll();

        $accountGroups?->loadMissing(['ledgers' => function ($query) {
            $query->where('school_id', getUserSchoolId())
                ->select('id', 'account_group_id', 'title', 'mobile', 'email');
        }]);

        $accountGroup = $this->accountGroupRepository->getById($id);

        // parent title
        $parentData = $this->accountGroupRepository->getParentNameAndId();
        $parentTitles = $parentData->map(fn($pd) => ['id' => $pd->id, 'title' => $pd->title])->all();


        return Inertia::render('Inventory/EditAccountGroup', [
            'parentTitles' => $parentTitles,
            'accountGroup' => $accountGroup,
            'accountGroups' => $accountGroups,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(AccountGroupRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'parent_id' => $input['parent_id'] ?? null,
            'title' => $input['title'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );

        $accountGroup = $this->accountGroupRepository->update($id, $dataArray);
        if (!$accountGroup) {
            return redirect()->route('account_group.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('account_group.list')->with('message', 'Account group updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $accountGroup = $this->accountGroupRepository->getById($id);
        if (!$accountGroup) {
            return redirect()->route('account_group.list')->with('error', 'Data not found.');
        }
        $this->accountGroupRepository->delete($id);
        return redirect()->route('account_group.list')->with('message', 'Account group deleted successfully.');
    }
}
