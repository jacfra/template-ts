import "reflect-metadata";
import { TYPES } from "../../src/dependency-injection/types";
import { DemoEntity } from "../../src/entity/DemoEntity";
import { DemoResolver, IDemoResolver } from "../../src/resolver/DemoResolver";
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

describe("DemoResolver", () => {
  beforeEach(async () => {
    mockContainer.snapshot();
    const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();
  });

  afterEach(() => {
    mockContainer.restore();
    jest.clearAllMocks();
  });

  test(`DemoResolver.demo`, async () => {
    const demoResolver = await mockContainer.getAsync<IDemoResolver>(
      DemoResolver
    );

    const results = await demoResolver.demo();

    const expected = { value: "Hello, World!" };

    const result = results.pop();

    expect(result?.value).toBe(expected.value);
  });
});
