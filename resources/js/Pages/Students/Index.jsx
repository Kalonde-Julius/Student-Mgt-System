import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

import DashboardLayout from '@/Layouts/DashboardLayout';

const Index = () => {
  const { students, search: initialSearch, sort, direction, flash, auth } = usePage().props;

  const [search, setSearch] = useState(initialSearch || '');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [score, setScore] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [user_id, setUserId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      '/students',
      { search, name, email, gender, minScore, maxScore },
      { preserveState: true, replace: true }
    );
  };

  const handleSort = (field) => {
    const newDirection = sort === field && direction === 'asc' ? 'desc' : 'asc';
    router.get(
      '/students',
      { search, sort: field, direction: newDirection },
      { preserveState: true, replace: true }
    );
  };

  const renderSortArrow = (field) => {
    if (sort === field) {
      return direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const handlePageChange = (url) => {
    if (url) router.visit(url);
  };

  // ✅ Fix flash message guards
  const [msg, setMsg] = useState(flash?.success || null);
  const [visible, setVisible] = useState(!!flash?.success);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMsg(null), 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [msg]);

  const safeRows = students && students.data ? students.data : [];
  const safeLinks = students && students.links ? students.links : [];

  return (
    <DashboardLayout>
      <main className="flex-1 p-6">
        {msg && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white bg-green-500
            transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            {msg}
          </div>
        )}

        <section>
          <header className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Students Page</h1>
            <p className="text-sm text-gray-500">
              Welcome to the Student management system section
            </p>
          </header>

          <article className="mb-4 flex flex-col-3 justify-between">
            <form onSubmit={handleSearch} className="flex flex-col-3 gap-2 mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Search
              </button>

              <input
                type="text"
                placeholder="Search Students"
                className="border p-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <Link
              href="/students/create"
              className="text-white font-medium mt-2 mb-3 rounded bg-green-600 w-1/4 px-4 py-2 hover:bg-green-700 transition text-center"
            >
              Add New Student
            </Link>
          </article>
        </section>

        {/* Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-100 col-span-10 text-center font-medium text-gray-700">
              {['image', 'id', 'name', 'email', 'age', 'dob', 'gender', 'score', 'user_id'].map(
                (field) => {
                  const sortField = field === 'user_id' ? 'user' : field;
                  return (
                    <th
                      key={field}
                      className={`p-2 cursor-pointer ${
                        sort === sortField ? 'font-bold text-blue-600' : ''
                      }`}
                      onClick={() => handleSort(sortField)}
                    >
                      {field === 'image'
                        ? 'Profile Picture'
                        : field === 'user_id'
                        ? 'Submitted By'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                      {renderSortArrow(sortField)}
                    </th>
                  );
                }
              )}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {safeRows.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              safeRows.map((student) => (
                <tr key={student.id} className="hover:bg-gray-200 w-full text-sm">
                  <td className="border px-4 py-2">
                    {student.image ? (
                      <img
                        src={`/storage/${student.image}`}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-700 font-semibold">
                          {student.name
                            ? student.name
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .toUpperCase()
                            : 'N/A'}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="border px-4 py-2"> {student.id} </td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.email}</td>
                  <td className="border px-4 py-2">{student.age}</td>
                  <td className="border px-4 py-2">{student.dob}</td>
                  <td className="border px-4 py-2">{student.gender}</td>
                  <td className="border px-4 py-2">{student.score}</td>

                  {/* ✅ Submitted By fix */}
                  <td className="border px-4 py-2">
                    {student.user ? student.user.name : auth?.user?.name}
                  </td>

                  <td className="border px-4 py-2 flex flex-col-3 gap-2">
                    <ul className="flex gap-4">
                      <li><FaEye className="text-blue-600 hover:text-blue-800 cursor-pointer" /></li>
                      <li><FaEdit className="text-green-600 hover:text-green-800 cursor-pointer" /></li>
                      <li><FaTrash className="text-red-600 hover:text-red-800 cursor-pointer" /></li>
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-end justify-end">
          {safeLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(link.url)}
              disabled={!link.url}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`mx-1 px-3 py-2 rounded ${
                link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Index;
