<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::query()->select(
            'id', 'name', 'user_id', 'email', 'age', 'gender', 'dob', 'score', 'image'
        );

        // Filters
        $query->when($request->search, function ($q, $search) {
            $q->where(function ($sub) use ($search) {
                $sub->where('name', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('gender', 'like', "%{$search}%")
                    ->orWhere('score', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userSub) use ($search) {
                        $userSub->where('name', 'like', "%{$search}%");
                    });
            });
        });

        $query->when($request->id, fn($q, $id) => $q->where('id', $id));
        $query->when($request->gender, fn($q, $gender) => $q->where('gender', $gender));
        $query->when($request->minScore, fn($q, $minScore) => $q->where('score', '>=', $minScore));
        $query->when($request->maxScore, fn($q, $maxScore) => $q->where('score', '<=', $maxScore));
        $query->when($request->user, fn($q, $userId) => $q->where('user_id', $userId));

        // Sorting
        $query->when($request->sort, function ($q, $sort) use ($request) {
            $direction = $request->direction ?? 'asc';

            if ($sort === 'user') {
                // Alias join to avoid ambiguity
                $q->leftJoin('users as u', 'students.user_id', '=', 'u.id')
                  ->orderBy('u.name', $direction)
                  ->select('students.*');
            } else {
                $q->orderBy($sort, $direction);
            }
        });

        $students = $query->with('user')->paginate(10)->withQueryString();

        return Inertia::render('Students/Index', [
            'students'   => $students,
            'search'     => $request->search,
            'sort'       => $request->sort,
            'direction'  => $request->direction,
            'gender'     => $request->gender,
            'minScore'   => $request->minScore,
            'maxScore'   => $request->maxScore,
            'id'         => $request->id,
        ]);
    }

    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => 'required|email|unique:students,email',
            'age'    => 'required|integer|min:1',
            'gender' => 'required|in:male,female',
            'dob'    => 'required|date',
            'score'  => 'nullable|numeric|min:0|max:100',
            'image'  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('students', 'public');
        }

        Student::create(array_merge($validated, [
            'user_id' => Auth::id(),
        ]));

        // ✅ Flash message
        return redirect()->route('students.index')
            ->with('success', 'Student created successfully!');
    }

    public function edit($id) {

        $student = Student::findOrFail($id);

        return Inertia::render('Students/Edit', [
            'student' => $student,
        ]);
    }

public function update(Request $request, $id)  {

        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'email'  => [
                'required',
                'email',
                Rule::unique('students', 'email')->ignore($student->id),
            ],
            'age'    => 'required|integer|min:1',
            'gender' => 'required|in:male,female',
            'dob'    => 'required|date',
            'score'  => 'nullable|numeric|min:0|max:100',
            'image'  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('students', 'public');
        }

        $student->update($validated);

        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully!');
    }

    public function show($id) {

        $student = Student::with('user')->findOrFail($id);

        return Inertia::render('Students/View', [
            'student' => $student,
        ]);
    }

    public function destroy($id) {

       $student = Student::findOrFail($id);

       // Check if the student has an image stored and delete it
       if (!empty($student->image) && Storage::exists($student->image)) {
            Storage::delete($student->image);
        }

        $student->delete();

        return redirect()->route('students.index')
        ->with('success', 'Student deleted successfully!');
    }
}
