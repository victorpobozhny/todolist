export type BaseAction<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">;
