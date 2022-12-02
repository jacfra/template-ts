import "reflect-metadata";
import { TYPES } from "../../dependency-injection/types";
import { DemoResolver, IDemoResolver } from "../../resolver/DemoResolver";
import { IDemoSeed } from "../../seed/DemoSeed";
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
