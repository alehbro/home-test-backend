import { Controller, Get, Param, Res } from "@nestjs/common";
import { UrlsService } from "./urls/urls.service";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private urlsService: UrlsService) {
  }

  @ApiOperation({ summary: "Redirect to full url" })
  @ApiParam({
    name: "tinyUrl",
    description: "a short link that was obtained from this api",
    example: "Dbqvx"
  })
  @Get(":tinyUrl")
  async redirectToFullUrl(@Param("tinyUrl") tinyUrl: string, @Res() res: Response) {
    const fullUrlDto = await this.urlsService.getFullUrl(tinyUrl);
    return res.redirect(fullUrlDto.fullUrl);
  }
}