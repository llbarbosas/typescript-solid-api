import { Repository, compareQuery, Query } from "./Repository";

export class MockRepository<T> implements Repository<T> {
  private data: T[] = [];

  async find(query?: Query<T>): Promise<T[]> {
    return this.data.filter((el) => (query ? compareQuery(query, el) : true));
  }

  async findOne(query: Query<T>): Promise<T | undefined> {
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
