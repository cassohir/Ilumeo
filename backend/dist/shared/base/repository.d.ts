import { FindOptionsWhere } from 'typeorm';
type Filters<M> = FindOptionsWhere<M> & {
    [P in keyof M]?: M[P] | FindOptionsWhere<M[P]>;
};
export type NONE = null | undefined;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Model<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type PartialModel<T> = Omit<{
    [K in keyof T]?: T[K];
}, 'id'>;
export declare abstract class Repository<M> {
    abstract index(page: number, limit: number): Promise<M[]>;
    abstract find(filters: Filters<M>): Promise<M[]>;
}
export {};
