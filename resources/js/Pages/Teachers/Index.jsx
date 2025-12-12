import React from 'react'
import { DashboardLayout } from '@/Layouts/DashboardLayout';
//import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';

const Teachers = () => {
    const { user_name } = usePage().props;
   // const { t, i18n } = useTranslation();

  return (

        <main className='flex-1 p-6'>
            <header className='mb-6 border-b pb-4'>
                <h1 className='text-2xl font-bold text-gray-800'>
                    Teachers Page
                </h1>
                <p className='text-sm text-gray-500'>
                    Welcome to the Teacher management system section.
                </p>
                <p> Welcome</p>
            </header>

            <section className='space-y-4'>
                <div className="bg-white p-6 rounded shadow">
                    <p>
                        Here you can manage teacher data, view details and perform actions.
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow text-sm text-gray-600">
                    <p> <strong> Name: </strong> </p>
                    <p> <strong> Last Name: </strong> </p>
                    <p> The user is: {user_name} </p>
                </div>
            </section>
        </main>

  );
}

/*
Teachers.layout = function(page) {
    return <DashboardLayout> { page } </DashboardLayout>
}
*/

Teachers.layout = page => <DashboardLayout> { page } </DashboardLayout>

export default Teachers
