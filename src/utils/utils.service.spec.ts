import { Test, TestingModule } from "@nestjs/testing";
import { UtilsService } from "./utils.service";

describe("UtilsService", () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
      ]
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get random string",() => {
      let randStr = service.getRandomStr(5);
      randStr = randStr.replace(/[^A-Za-z]/g, '');
      expect(randStr.length).toEqual(5);
    });

  it("should get random number ",() => {
    const randomNum = service.getRandomNumber(10, 11);
    expect(randomNum).toBeGreaterThanOrEqual(10);
    expect(randomNum).toBeLessThanOrEqual(11);
  });

  it("should validate got url", async () => {
    expect(await service.isValidUrl("https://www.google.com/")).toBeTruthy();
    expect(await service.isValidUrl("https://www.google2.com/")).toBeFalsy();
  });
});