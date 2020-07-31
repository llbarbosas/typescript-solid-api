export type Query<T> = { [key in keyof T]?: T[key] };

export interface Repository<T> {
  find(query?: Query<T>): Promise<T[]>;
  findOne(query: Query<T>): Promise<T | undefined>;
  save(...data: T[]): Promise<void>;
  update(query: Query<T>, data: T): Promise<void>;
  delete(query: Query<T>): Promise<void>;
  count(): Promise<number>;
}

export function compareQuery<T>(query: Query<T>, el: T) {
  return Object.keys(query).every(
    (key) => query[key as keyof T] === el[key as keyof T]
  );
}
