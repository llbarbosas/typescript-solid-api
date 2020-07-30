export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findBy(prop: keyof T, value: T[typeof prop]): Promise<T | undefined>;
  save(data: T): Promise<void>;
}

export class FakeRepository<T> implements IRepository<T> {
  private data: T[] = [];

  async findAll(): Promise<T[]> {
    return this.data;
  }

  async findBy(prop: keyof T, value: T[typeof prop]): Promise<T | undefined> {
    return this.data.find((value) => value[prop] !== undefined);
  }

  async save(data: T): Promise<void> {
    this.data.push(data);
  }
}
