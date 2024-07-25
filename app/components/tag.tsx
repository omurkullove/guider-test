import React from 'react';

interface ITagProps {
    title: string;
    onClick: (title: string) => void;
    isActive: boolean;
}

const Tag = ({ title, onClick, isActive }: ITagProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, title: string) => {
        e.stopPropagation();
        onClick(title);
    };

    return (
        <button
            className={`text-nowrap bg-highLight text-black rounded-xl p-[5px] border-highLight border-2 opacity-90  hover:opacity-100 transition-all ${
                isActive ? 'text-highLight bg-secondaryDark' : ''
            }`}
            onClick={(e) => handleClick(e, title)}
        >
            {title}
        </button>
    );
};

export default Tag;
