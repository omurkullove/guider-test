import React from 'react';
import SortBlock from './components/sort-block';
import BookList from './components/book-list';
import axios from 'axios';
import { cookies, headers } from 'next/headers';

const handleFetchBooks = async () => {
    try {
        const res = await axios(`${headers().get('x-url')}api/books`, {
            withCredentials: true,
            headers: { Cookie: cookies().toString() },
        });
        const data = await res.data;

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const HomePage = async () => {
    const cookieStore = cookies();

    const books = await handleFetchBooks();

    const defaultActiveOption = cookieStore.get('option')?.value as unknown as string | undefined;
    const defaultActiveTags = cookieStore.get('activeTags')?.value as unknown as string | undefined;

    const parsedActiveOption = JSON.parse(defaultActiveOption ?? 'null');
    const parsedActiveTags = JSON.parse(defaultActiveTags ?? 'null');

    return (
        <div className='flex flex-col items-center gap-[20px]'>
            <SortBlock
                defaultActiveOption={parsedActiveOption}
                defaultActiveTags={parsedActiveTags}
            />
            <BookList books={books} />
        </div>
    );
};

export default HomePage;
