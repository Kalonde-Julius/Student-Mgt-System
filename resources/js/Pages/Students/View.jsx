import DashboardLayout from '@/Layouts/DashboardLayout'
import React from 'react'
import { Link, usePage } from "@inertiajs/react";
import { FaDownload, FaPrint } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const View = ({ student }) => {
  const { auth } = usePage().props; // now auth is defined

  // Utility function for shorter date format
  const formatShortDate = (dateString) => {

        if (!dateString) return "";

        const options = {
            weekday: "short", year: "numeric", month: "short", day: "numeric"
        };

        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // PDF download handler
     const handleDownloadPDF = () => {
        const element = document.getElementById("print-area");
        const opt = { margin: 0.5, filename: `${student.name}-profile.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

  return (

    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div id="print-area" className="max-w-3xl w-full bg-white shadow-lg rounded-xl overflow-visible">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Student Profile</h1>
            <p className="text-sm opacity-80">Detailed information</p>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">

            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {student.image ? (
                <img
                  src={`/storage/${student.image}`}
                  alt={student.name}
                  className="w-40 h-40 rounded-full object-cover"
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

            </div>

            {/* Student Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800"> {student.name} </h2>

              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {student.email}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Age:</span>
                {""} {student.age}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Date of Birth:</span>
                {""} {formatShortDate(student.dob)}
              </p>

              <p className="text-gray-600"><span className="font-medium">Gender:</span>
                {""} {student.gender}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Score:</span> {student.score}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Submitted By:</span>
                {""} {student.user ? student.user.name : auth?.user?.name}
              </p>

            </div>
          </div>

          {/* Page break marker */}
          <div className="page-break"></div>


        </div>
      </div>

                {/* Footer Actions */}
          <div className="flex justify-end gap-4 border-t p-6 no-print">
            <Link href={route('students.index')} className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
              Back to List
            </Link>

            <button onClick={() => window.print()}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition" >
                <FaPrint size={18} />
            </button>

             <button onClick={handleDownloadPDF} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition" >
                <FaDownload size={18} />
            </button>

          </div>

    </DashboardLayout>
  );
};

export default View;
