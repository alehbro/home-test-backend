import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Urls } from "./urls.model";
import { TinyUrlDto } from "./dto/tiny-url.dto";
import { FullUrlDto } from "./dto/full-url.dto";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Urls) private urlsRepository: typeof Urls,
              private utilsService: UtilsService) {
  }

  async getTinyUrl(dto: FullUrlDto): Promise<TinyUrlDto> {
    const { fullUrl } = dto;
    if (!(await this.utilsService.isValidUrl(fullUrl))) {
      throw new HttpException("Sent url is not valid", HttpStatus.BAD_REQUEST);
    }
    const [url] = await this.urlsRepository.findOrCreate({
      where: { fullUrl },
      defaults: { tinyUrl: await this.getUniqTinyUrl() }
    });
    return { tinyUrl: url.tinyUrl };
  }

  async getFullUrl(tinyUrl: string): Promise<FullUrlDto> {
    const url = await this.urlsRepository.findOne({
      where: { tinyUrl }
    });
    if (!url) {
      throw new HttpException("Full url not found", HttpStatus.NOT_FOUND);
    }
    return { fullUrl: url.fullUrl };
  }

  private async existByTinyUrl(tinyUrl: string): Promise<boolean> {
    try {
      await this.getFullUrl(tinyUrl);
      return true;
    } catch (err) {
      return false;
    }
  }

  private async getUniqTinyUrl(): Promise<string> {
    const size = Number(process.env.TINY_URL_SIZE);
    let res;
    do {
      res = this.utilsService.getRandomStr(size);
    } while (await this.existByTinyUrl(res));
    return res;
  }
}
