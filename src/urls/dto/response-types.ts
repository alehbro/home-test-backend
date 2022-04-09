import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
  @ApiProperty({ default: "404" })
  statusCode: number;
  @ApiProperty({ default: "Full url not found" })
  message: string;
}

export class NotValidResponse {
  @ApiProperty({ default: "400" })
  statusCode: number;
  @ApiProperty({ default: "Sent url is not valid" })
  message: string;
}