export type todoType = {
    map(arg0: (item: any) => import("react").JSX.Element): unknown;
    text: any;
    id: string | number;
    title: string;
    description: string;
    userId: string  
    done: boolean;
}

export type createTypes = {
    title: string,
    description: string,
}