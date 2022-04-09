import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TinyUrlDto } from "./dto/tiny-url.dto";
import { UrlsService } from "./urls.service";
import { FullUrlDto } from "./dto/full-url.dto";
import { NotFoundResponse, NotValidResponse } from "./dto/response-types";

@ApiTags("api/v1")
@Controller("api/v1")
export class UrlsController {
  constructor(private urlsService: UrlsService) {
  }

  @ApiOperation({ summary: "Generate a short url by full url" })
  @ApiResponse({ status: 201, type: TinyUrlDto })
  @ApiResponse({ status: 400, type: NotValidResponse })
  @Post("getTinyUrl")
  async getTinyUrl(@Body() fullUrlDto: FullUrlDto): Promise<TinyUrlDto> {
    return this.urlsService.getTinyUrl(fullUrlDto);
  }

  @ApiOperation({ summary: "Get back a full url by tiny url" })
  @ApiResponse({ status: 200, type: FullUrlDto })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiParam({
    name: "tinyUrl",
    description: "a short link that was obtained from this api",
    example: "Dbqvx"
  })
  @Get("getFullUrl/:tinyUrl")
  async getFullUrl(@Param("tinyUrl") tinyUrl: string): Promise<FullUrlDto> {
    return this.urlsService.getFullUrl(tinyUrl);
  }
}
