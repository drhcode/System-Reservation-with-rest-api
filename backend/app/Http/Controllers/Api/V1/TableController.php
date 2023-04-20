<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Table;
use App\Http\Controllers\Controller;
use App\Http\Requests\TableStoreRequest;
use App\Http\Requests\TableUpdateRequest;
use App\Http\Resources\V1\TableCollection;
use App\Http\Resources\V1\TableResource;

class TableController extends Controller
{
    public function index()
    {
        return new TableCollection(Table::paginate());
    }
    public function show(Table $table)
    {
        return new TableResource($table);
    }
    public function store(TableStoreRequest $request)
    {
        Table::create($request->validated());
        return response()->json('Table Created Successfully');
    }
    public function update(TableUpdateRequest $request, Table $table)
    {
        $table->update($request->validated());
        return response()->json('Table Updated Successfully');
    }
    public function destroy(Table $table)
    {
        $table->delete();
        return response()->json('Table deleted Successfully');
    }
}
