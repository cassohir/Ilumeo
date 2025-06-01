/**
 * An interface for executable services
 *
 * @interface
 *
 * @template Params the type of the parameters passed to the service
 * @template Result the type of the return value of the service
 */
export interface UseCase<Params, Result> {
  /**
   * Executes the service
   *
   * @param {Params} params parameters needed by the service
   *
   * @returns {Promise<Result>} the result of the service
   */
  execute(params?: Params): Promise<Result> | Result;
}
