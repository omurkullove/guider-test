export interface IBookItem {
    title: string;
    author: string;
    date: string;
    price: number;
    illustrator?: string;
    tags: string[];
    id: number;
}

export interface IActiveOption {
    title: string;
    direction: boolean;
}
