type RedactOptions = {
    paths: string[];
    censor?: string;
};
export declare function fastRedact(obj: Record<string, unknown>, options: RedactOptions): string;
export {};
