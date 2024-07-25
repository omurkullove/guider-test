'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Tag from './tag';
import Cookies from 'js-cookie';
import { IActiveOption } from '../interfaces';
import { useRouter } from 'next/navigation';

const OPTIONS = [
    {
        title: 'price',
        id: 1,
        direction: false,
    },
    {
        title: 'author',
        id: 2,
        direction: false,
    },
    {
        title: 'date',
        id: 3,
        direction: false,
    },
];

interface ISortBlockProps {
    defaultActiveOption: IActiveOption | null;
    defaultActiveTags: string[];
}

const SortBlock = ({ defaultActiveOption, defaultActiveTags }: ISortBlockProps) => {
    const [isTagBoxOpen, setIsTagBoxOpen] = useState(false);
    const [activeTags, setActiveTags] = useState<string[]>(defaultActiveTags ?? []);
    const [activeOption, setActiveOption] = useState<IActiveOption | null>(defaultActiveOption);

    const router = useRouter();
    const tagBoxRef = useRef<HTMLDivElement>(null);
    const tagIconRef = useRef<HTMLDivElement>(null);

    const handleAddOptionsToSS = (option: IActiveOption) => {
        setActiveOption((prev) => {
            let newOption;

            if (prev?.title === option.title) {
                newOption = { ...prev, direction: !prev.direction };
            } else {
                newOption = { ...option, direction: !option.direction };
            }

            Cookies.set('option', JSON.stringify(newOption), { expires: 7 });

            return newOption;
        });

        setTimeout(() => {
            router.refresh();
        }, 500);
    };

    const handleAddTagToSS = (title: string) => {
        setActiveTags((prev) => {
            const isTagActive = prev.includes(title);

            const newTags = isTagActive ? prev.filter((item) => item !== title) : [...prev, title];
            Cookies.set('activeTags', JSON.stringify(newTags), { expires: 7 });

            return newTags;
        });

        setTimeout(() => {
            router.refresh();
        }, 500);
    };

    const handleResetRules = () => {
        Cookies.remove('option');
        Cookies.remove('activeTags');
        setActiveOption(null);
        setActiveTags([]);

        setTimeout(() => {
            router.refresh();
        }, 500);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            tagBoxRef.current &&
            !tagBoxRef.current.contains(event.target as Node) &&
            tagIconRef.current &&
            !tagIconRef.current.contains(event.target as Node)
        ) {
            setIsTagBoxOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='bg-secondary text-highLight font-normal w-full h-[75px] rounded-[32px] text-[12px] flex items-center px-[30px] sm:px-[15px] justify-between'>
            <section className='flex gap-[30px] items-center sm:gap-[10px]'>
                {OPTIONS.map((option) => (
                    <div
                        className='flex items-center gap-[4px] cursor-pointer'
                        key={option.id}
                        onClick={() => handleAddOptionsToSS(option)}
                    >
                        <p className='text-[12px]'>{option.title}</p>
                        <Image
                            className={`transition-transform duration-300 transform ${
                                activeOption?.title === option.title && activeOption.direction
                                    ? 'rotate-180'
                                    : 'rotate-0'
                            }`}
                            src='./arrow.svg'
                            width={8}
                            height={8}
                            alt='arrow'
                        />
                    </div>
                ))}
            </section>

            <section className='flex items-center gap-[30px] sm:gap-[10px]'>
                <div
                    ref={tagIconRef}
                    className='cursor-pointer flex items-center gap-[5px] relative'
                    onClick={() => setIsTagBoxOpen(!isTagBoxOpen)}
                >
                    <p className='font-bold text-[15px] sm:text-[12px]'>Tags</p>
                    <Image
                        src='./tag-icon.svg'
                        className={`transition-transform duration-300 transform ${
                            isTagBoxOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        alt='tag-icon'
                        width={13}
                        height={13}
                    />
                    {isTagBoxOpen && (
                        <div
                            ref={tagBoxRef}
                            className='absolute bg-secondaryDark top-[30px] min-w-[120px] w-max p-[10px] grid grid-cols-2 gap-2'
                        >
                            {[
                                'Climate change',
                                'Sci-Fi',
                                'History',
                                'Technology',
                                'Health',
                                'Biochemistry',
                            ].map((tag) => (
                                <Tag
                                    isActive={activeTags.includes(tag)}
                                    onClick={handleAddTagToSS}
                                    key={tag}
                                    title={tag}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={handleResetRules}>reset rules</button>
            </section>
        </div>
    );
};

export default SortBlock;
