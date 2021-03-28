import axios from 'axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class ZillowWrapper {
  static getZillowPropertyUrl = (
    address: string,
    city: string,
    zip: string,
  ): string => {
    const url = `${address} ${city} NE ${zip}_rb`;
    return `https://zillow.com/homes/${encodeURIComponent(url)}`;
  };

  async getPropertyImageUrl(
    address: string,
    city: string,
    zip: string,
  ): Promise<string> {
    const url = ZillowWrapper.getZillowPropertyUrl(address, city, zip);
    // Headers to bypass captcha from https://gist.github.com/scrapehero/5f51f344d68cf2c022eb2d23a2f1cf95
    const zillowResponse = await axios.get(url, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      },
    });
    const $ = cheerio.load(zillowResponse.data);
    const imageUrl = $('.media-stream-photo.media-stream-photo--initial').attr(
      'src',
    );
    return imageUrl;
  }
}
