import { ApiProperty } from "@nestjs/swagger";

export class TinyUrlDto {
  @ApiProperty({ example: `Dbqvx`, description: "Generated short link" })
  tinyUrl: string;
}
