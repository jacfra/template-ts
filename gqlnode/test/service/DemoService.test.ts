import "reflect-metadata";
import { TYPES } from "../../src/dependency-injection/types";
import { IDemoSeed } from "../../src/seed/DemoSeed";
import { IDemoService } from "../../src/service/DemoService";
import { mockContainer } from "../_setup/mockBind";
import {
  describe,
  afterEach,
  beforeEach,
  expect,
  jest,
  test,
} from "@jest/globals";

describe("DemoService", () => {
  beforeEach(async () => {
    mockContainer.snapshot();
    const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
    await demoSeed.seed();
  });

  afterEach(() => {
    mockContainer.restore();
    jest.clearAllMocks();
  });

  test(`DemoService.demo`, async () => {
    const demoService = await mockContainer.getAsync<IDemoService>(
      TYPES.DemoService
    );

    const results = await demoService.demo();

    const expected = { value: "Hello, World!" };

    const result = results.pop();

    expect(result?.value).toBe(expected.value);
  });
});
