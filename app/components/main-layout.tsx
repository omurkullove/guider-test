import React, { ReactNode } from 'react';
import Header from './header';
import SortBlock from './sort-block';

interface IMainLayoutProps {
    children: ReactNode;
}
const MainLayout = ({ children }: IMainLayoutProps) => {
    return (
        <main className='bg-main min-h-full h-auto py-[100px] px-[10px]'>
            <div className='flex flex-col mx-auto gap-[20px] max-w-[500px] w-full'>
                <Header />
                {children}
            </div>
        </main>
    );
};

export default MainLayout;
