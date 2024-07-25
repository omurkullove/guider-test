import React, { useState } from 'react';
import { IBookItem } from '../interfaces';
import BootItem from './book-item';

interface IBookListProps {
    books: IBookItem[];
}

const BookList = ({ books }: IBookListProps) => {
    return (
        <div className='h-full bg-secondary w-full rounded-[32px] p-[30px] gap-[20px] flex flex-col sm:p-[20px]'>
            {books.map((book, index) => (
                <BootItem
                    key={book.id}
                    bookItem={book}
                    queue={index + 1}
                />
            ))}
        </div>
    );
};

export default BookList;
