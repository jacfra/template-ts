import "reflect-metadata";
import { TYPES } from "../../src/dependency-injection/types";
import { DemoEntity } from "../../src/entity/DemoEntity";
import { DemoResolver, IDemoResolver } from "../../src/resolver/DemoResolver";
import { IDemoSeed } from "../../src/seed/DemoSeed";
import { DemoService, IDemoService } from "../../src/service/DemoService";
import { mockContainer } from "../_setup/mockBind";

beforeEach(async () => {
  mockContainer.snapshot();
  const demoSeed = await mockContainer.getAsync<IDemoSeed>(TYPES.DemoSeed);
  await demoSeed.seed();
});

afterEach(() => {
  mockContainer.restore();
  jest.clearAllMocks();
});

describe("DemoService", () => {
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
