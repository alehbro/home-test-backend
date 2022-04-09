import { getModelToken } from "@nestjs/sequelize";
import { UrlsService } from "./urls.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Urls } from "./urls.model";
import { UtilsService } from "../utils/utils.service";

describe("UrlsService", () => {
  let service: UrlsService;

  const urlsModel = { tinyUrl: "qwert", fullUrl: "https://www.google.com/" };

  const mockUrlsRepository = {
    findOrCreate: jest.fn().mockImplementation(() => (
      Promise.resolve([
        urlsModel,
        true
      ])
    )),
    findOne: jest.fn().mockImplementation(data => {
      if (data.where.tinyUrl === "trewq") {
        return Promise.resolve(urlsModel);
      }
      return Promise.resolve(null);
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        UtilsService,
        {
          provide: getModelToken(Urls),
          useValue: mockUrlsRepository
        }
      ]
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get a tiny url by full url",
    async () => {
      const fullUrlDto = { fullUrl: "https://www.google.com/" };
      const expectedTinyUrlDto = { tinyUrl: "qwert" };
      const tinyUrlDto = await service.getTinyUrl(fullUrlDto);
      expect(tinyUrlDto).toEqual(expectedTinyUrlDto);
      expect(mockUrlsRepository.findOrCreate).toHaveBeenCalled();
    });

  it("should get back full url by tiny url", async () => {
    const tinyUrl = "trewq";
    const expectedFullUrlDto = { fullUrl: "https://www.google.com/" };
    const fullUrlDto = await service.getFullUrl(tinyUrl);
    expect(fullUrlDto).toEqual(expectedFullUrlDto);
    expect(mockUrlsRepository.findOne).toHaveBeenCalled();
  });
});