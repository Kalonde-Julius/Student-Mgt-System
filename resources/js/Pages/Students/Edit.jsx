import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ student }) {
  const { data, setData, put, processing, errors } = useForm({
    name: student.name,
    email: student.email,
    age: student.age,
    dob: student.dob,
    gender: student.gender,
    score: student.score,
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Use PUT to update the existing student
    put(`/students/${student.id}`, {
      forceFormData: true, // ensures file uploads are handled correctly
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Student</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => setData('age', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter age"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => setData('dob', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              value={data.gender}
              onChange={(e) => setData('gender', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Score */}
          <div>
            <label className="block text-gray-700 mb-1">Score</label>
            <input
              type="number"
              value={data.score}
              onChange={(e) => setData('score', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter score"
            />
            {errors.score && <p className="text-red-500 text-sm">{errors.score}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setData('image', e.target.files[0])}
              className="w-full border rounded px-3 py-2"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-auto"
          >
            {processing ? 'Saving...' : 'Update Student'}
          </button>
        </form>

        <section className="mt-6 text-center">
          <article className="mt-6 text-center text-gray-600 flex flex-col-2 justify-between gap-4">
            <Link
              href="/students"
              className="text-white font-medium rounded bg-gray-600 px-4 py-2 hover:bg-gray-700 transition"
            >
              Students List
            </Link>

            <Link
              href="/dashboard"
              className="text-white font-medium rounded bg-gray-600 px-4 py-2 hover:bg-gray-700 transition"
            >
              Dashboard
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
}
