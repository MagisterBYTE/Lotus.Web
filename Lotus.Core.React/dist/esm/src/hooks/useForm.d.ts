import type { ChangeEvent } from 'react';
export declare const useForm: <TContent>(defaultValues: TContent) => (handler: (content: TContent) => void) => (event: ChangeEvent<HTMLFormElement>) => Promise<void>;
