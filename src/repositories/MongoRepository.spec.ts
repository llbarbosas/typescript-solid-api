import { MongoRepository } from "./MongoRepository";
import { Repository } from "./Repository";

describe("MockRepository test", () => {
  interface TestData {
    name: string;
    age: number;
  }

  const foo: TestData = { name: "foo", age: 10 };
  const bar: TestData = { name: "bar", age: 10 };
  const baz: TestData = { name: "baz", age: 25 };

  let repo: Repository<TestData>;

  beforeEach(async () => {
    repo = await MongoRepository.connect<TestData>("_spec");
    await repo.save(foo, bar, baz);
  });

  it("save and count", async () => {
    expect(await repo.count()).toBe(3);
  });

  it("find", async () => {
    const dataWithAge10 = await repo.find({ age: 10 });
    expect(dataWithAge10).toStrictEqual([foo, bar]);
  });

  it("findOne", async () => {
    const firstAge10 = await repo.findOne({ age: 10 });
    expect(firstAge10).toStrictEqual(foo);
  });

  it("update", async () => {
    await repo.update({ name: "bar" }, { name: "bar", age: 30 });
    const olderBar = await repo.findOne({ name: "bar" });
    expect(olderBar).toStrictEqual({ name: "bar", age: 30 });
  });

  it("delete", async () => {
    await repo.delete({ age: 10 });
    const data = await repo.find();
    expect(data).toStrictEqual([{ name: "baz", age: 25 }]);
  });
});
