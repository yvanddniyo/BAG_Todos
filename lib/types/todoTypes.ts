export type todoType = {
    map(arg0: (item: any) => import("react").JSX.Element): unknown;
    text: any;
    id: number;
    title: string;
    description: string;
    done: boolean;
}

export type TodoType = {
    title: string,
    description: string,
}