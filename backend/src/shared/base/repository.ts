import { FindOptionsWhere } from 'typeorm';

type Filters<M> = FindOptionsWhere<M> & {
  [P in keyof M]?: M[P] | FindOptionsWhere<M[P]>;
};

export type NONE = null | undefined;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Model<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type PartialModel<T> = Omit<
  {
    [K in keyof T]?: T[K];
  },
  'id'
>;

export abstract class Repository<M> {
  /**
   * Lists all available models
   *
   * @template M a domain model
   * @return {Promise<M>} a promise that resolves to an array of domain models
   */
  abstract index(page: number, limit: number): Promise<M[]>;

  // /**
  //  * Lists all models that match a given condition (filter). If none is provided, all models are returned
  //  *
  //  * @template M a domain model
  //  * @return {Promise<M[]>} a promise that resolves to an array of domain models
  //  */
  // abstract find(filters: Filters<M>): Promise<M[]>;
}
