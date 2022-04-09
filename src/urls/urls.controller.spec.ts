import { UrlsController } from "./urls.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { UrlsService } from "./urls.service";

describe("UrlsController", () => {
  let controller: UrlsController;

  const mockUrlsService = {
    getTinyUrl: jest.fn(() => {
      return Promise.resolve({
        tinyUrl: "qwert"
      });
    }),

    getFullUrl: jest.fn(() => {
      return Promise.resolve({
        fullUrl: "www.google.com"
      });
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [UrlsService]
    })
      .overrideProvider(UrlsService)
      .useValue(mockUrlsService)
      .compile();

    controller = module.get<UrlsController>(UrlsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get tiny url by full url", async () => {
    const fullUrlDto = { fullUrl: "www.google.com" };
    const expectedTinyUrlDto = { tinyUrl: "qwert" };

    const tinyUrlDto = await controller.getTinyUrl(fullUrlDto);

    expect(tinyUrlDto).toEqual(expectedTinyUrlDto);
    expect(mockUrlsService.getTinyUrl).toHaveBeenCalledWith(fullUrlDto);
  });

  it("should get back full url by tiny url", async () => {
    const tinyUrl = 'qwert';
    const expectedFullUrlDto = { fullUrl: "www.google.com" };

    const fullUrlDto = await controller.getFullUrl(tinyUrl);

    expect(fullUrlDto).toEqual(expectedFullUrlDto);
    expect(mockUrlsService.getFullUrl).toHaveBeenCalledWith(tinyUrl);
  });
});