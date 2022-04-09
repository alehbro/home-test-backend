import { ApiProperty } from "@nestjs/swagger";

export class FullUrlDto {
  @ApiProperty({ example: "https://www.google.com/search?q=cats", description: "Example of a full link" })
  fullUrl: string;
}
