import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilsService {
  private readonly chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private readonly charsLength = this.chars.length;

  getRandomStr(size: number): string {
    if (size < 1) {
      throw `size should be greater than 0, your size: ${size}`;
    }
    let res = [];
    while (res.length < size) {
      const randNum = this.getRandomNumber(0, this.charsLength);
      const randChar = this.chars.charAt(randNum);
      res.push(randChar);
    }
    return res.join("");
  }

  getRandomNumber(min: number, max: number): number {
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.round(Math.random() * (max - min) + min);
  }

  isValidUrl(url: string): Promise<boolean> {
    const dns = require("dns");
    return new Promise(resolve => {
      try {
        const hostname = new URL(url).hostname;
        dns.lookup(hostname, (err) => {
          resolve(!err);
        });
      } catch (err) {
        return resolve(false);
      }
    });
  };
}