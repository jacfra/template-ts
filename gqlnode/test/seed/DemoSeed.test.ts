import "reflect-metadata";
import { IDataSource } from "../../src/database/DatabaseConnection";
import { TYPES } from "../../src/dependency-injection/types";
import { DemoEntity } from "../../src/entity/DemoEntity";
import { IDemoSeed } from "../../src/seed/DemoSeed";
import { mockContainer } from "../_setup/mockBind";
import {
  describe,
  afterEach,
  beforeEach,
  expect,
  jest,
  test,
} from "@jest/globals";

describe("DemoSeed", () => {
  beforeEach(async () => {
    mockContainer.snapshot();
    const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();
  });

  afterEach(() => {
    mockContainer.restore();
    jest.clearAllMocks();
  });

  test(`DemoSeed.seed`, async () => {
    const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();

    const dataSource = await mockContainer.getAsync<IDataSource>(
      TYPES.DataSource
    );

    const result = await dataSource
      .getRepository(DemoEntity)
      .findOne({ where: { id: 1 } });

    const expected = { value: "Hello, World!" };

    expect(result?.value).toBe(expected.value);
  });
});
