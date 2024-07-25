import { IActiveOption, IBookItem } from '@/app/interfaces';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const mock_books: IBookItem[] = [
    {
        title: 'Plastic: A Novel',
        author: 'Scott Guild',
        date: 'February 2024',
        price: 420,
        tags: ['Climate change', 'Sci-Fi'],
        id: 1,
    },
    {
        title: 'Space Oddities: The Mysterious Anomalies Challenging Our Understanding of the Universe',
        author: 'Harry Cliff',
        date: 'March 2024',
        price: 542,
        tags: ['Climate change', 'History'],
        id: 2,
    },
    {
        title: 'H is for Hope: Climate Change from A to Z',
        author: 'Elizabeth Kolbert',
        illustrator: 'Wesley Allsbrook',
        date: 'March 2024',
        price: 674,
        tags: ['Climate change', 'Technology'],
        id: 3,
    },
    {
        title: 'The Exquisite Machine: The New Science of the Heart',
        author: 'Sian E. Harding',
        date: 'February 2024',
        price: 981,
        tags: ['Health', 'Biochemistry'],
        id: 4,
    },
];

const getLastName = (author: string): string => {
    const parts = author.split(' ');
    return parts[parts.length - 1];
};

const parseDate = (dateString: string): Date => {
    const [month, year] = dateString.split(' ');
    const monthIndex = new Date(Date.parse(month + ' 1, 2021')).getMonth();
    return new Date(`${year}-${monthIndex + 1}-01`);
};

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const cookieStore = cookies();
    const optionCookie: IActiveOption | null = JSON.parse(
        cookieStore.get('option')?.value ?? 'null'
    );
    const activeTagsCookie: string[] | null = JSON.parse(
        cookieStore.get('activeTags')?.value ?? 'null'
    );

    let books = [...mock_books];

    if (activeTagsCookie && activeTagsCookie.length) {
        books = books.filter((item) => item.tags.some((tag) => activeTagsCookie.includes(tag)));
    }

    if (optionCookie) {
        switch (optionCookie.title) {
            case 'price':
                books = books.sort((a, b) =>
                    optionCookie.direction ? b.price - a.price : a.price - b.price
                );
                break;
            case 'author':
                books = books.sort((a, b) => {
                    const lastNameA = getLastName(a.author);
                    const lastNameB = getLastName(b.author);
                    return optionCookie.direction
                        ? lastNameA.localeCompare(lastNameB)
                        : lastNameB.localeCompare(lastNameA);
                });
                break;
            case 'date':
                books = books.sort((a, b) => {
                    const dateA = parseDate(a.date);
                    const dateB = parseDate(b.date);
                    return optionCookie.direction
                        ? dateA.getTime() - dateB.getTime()
                        : dateB.getTime() - dateA.getTime();
                });
                break;
            default:
                break;
        }
    }

    return NextResponse.json(books);
}
