export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findBy(prop: keyof T, value: T[typeof prop]): Promise<T | undefined>;
  save(data: T): Promise<void>;
  update(prop: keyof T, value: T[typeof prop], data: T): Promise<void>;
  delete(prop: keyof T, value: T[typeof prop]): Promise<void>;
}

export class FakeRepository<T> implements IRepository<T> {
  private data: T[] = [];

  async findAll(): Promise<T[]> {
    return this.data;
  }

  async findBy(prop: keyof T, value: T[typeof prop]): Promise<T | undefined> {
    return this.data.find((el) => el[prop] === value);
  }

  async save(data: T): Promise<void> {
    this.data.push(data);
  }

  async update(prop: keyof T, value: T[typeof prop], data: T): Promise<void> {
    this.data = this.data.map((el) => (el[prop] === value ? data : el));
  }

  async delete(prop: keyof T, value: T[typeof prop]): Promise<void> {
    this.data = this.data.filter((el) => el[prop] !== value);
  }
}
