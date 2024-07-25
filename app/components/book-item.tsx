import React from 'react';
import { IBookItem } from '../interfaces';

interface IBootItemProps {
    bookItem: IBookItem;
    queue: number;
}

const BootItem = ({ bookItem: { author, date, price, tags, title }, queue }: IBootItemProps) => {
    return (
        <div className='bg-secondaryDark w-full p-[15px] rounded-[30px] flex flex-col text-highLight'>
            <p className='text-[16px] sm:text-[13px]'>
                {queue} <span className='font-bold'>{title}</span>
            </p>

            <div className='flex flex-col mt-[10px] text-[12px sm:text-[10px]'>
                <span>by {author}</span>
                <span>{date}</span>
                <span>{price}$</span>
            </div>

            <div className='border-t-highLight border-t mt-[10px] py-[12px] flex gap-[10px] flex-wrap'>
                {tags?.map((item) => (
                    <div
                        key={item}
                        className='bg-highLight text-black text-[12px] rounded-[30px] p-[10px] sm:p-[7px] sm:rounded-[20px] sm:text-[10px]'
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BootItem;
