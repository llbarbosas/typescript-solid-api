export type Query<T> = { [key in keyof T]?: T[key] };

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findBy(query: Query<T>): Promise<T | undefined>;
  save(data: T): Promise<void>;
  update(query: Query<T>, data: T): Promise<void>;
  delete(query: Query<T>): Promise<void>;
}

export function compareQuery<T>(query: Query<T>, el: T) {
  return Object.keys(query).every(
    (key) => query[key as keyof T] === el[key as keyof T]
  );
}

export class FakeRepository<T> implements IRepository<T> {
  private data: T[] = [];

  async findAll(): Promise<T[]> {
    return this.data;
  }

  async findBy(query: Query<T>): Promise<T | undefined> {
    return this.data.find((el) => compareQuery(query, el));
  }

  async save(data: T): Promise<void> {
    this.data.push(data);
  }

  async update(query: Query<T>, data: T): Promise<void> {
    this.data = this.data.map((el) => (compareQuery(query, el) ? data : el));
  }

  async delete(query: Query<T>): Promise<void> {
    this.data = this.data.filter((el) => compareQuery(query, el));
  }
}
