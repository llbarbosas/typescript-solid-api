import { Repository, compareQuery, Query } from "./Repository";
import { MongoClient, Collection, FilterQuery } from "mongodb";
import env from "../config/env";

const {
  MONGO_INITDB_DATABASE: MONGO_DB,
  MONGO_INITDB_ROOT_USERNAME: MONGO_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: MONGO_PASSWORD,
  MONGO_HOST,
} = env;

const mongoUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;

export class MongoRepository<T> implements Repository<T> {
  constructor(private collection: Collection) {}

  static async connect<T>(collectionName: string) {
    const client = new MongoClient(mongoUri);
    await client.connect();

    const collection = client.db(MONGO_DB).collection(collectionName);

    return new MongoRepository<T>(collection);
  }

  async find(query?: Query<T>): Promise<T[]> {
    return this.collection
      .find(query && (query as FilterQuery<T>))
      .project({ _id: 0 })
      .toArray();
  }

  async findOne(query: Query<T>): Promise<T | undefined> {
    return this.collection.findOne(query as FilterQuery<T>).catch(() => {});
  }

  async save(...data: T[]): Promise<void> {
    await this.collection.insertMany(data);
  }

  async update(query: Query<T>, data: T): Promise<void> {
    await this.collection.updateMany(query as FilterQuery<T>, data);
  }

  async delete(query: Query<T>): Promise<void> {
    await this.collection.deleteMany(query as FilterQuery<T>);
  }

  async count(): Promise<number> {
    return this.collection.countDocuments();
  }
}
