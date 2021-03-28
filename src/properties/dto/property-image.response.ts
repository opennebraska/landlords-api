import { Expose } from 'class-transformer';

export class PropertyImageResponse {
  @Expose({ name: 'image_url' })
  imageUrl: string;

  constructor(url: string) {
    this.imageUrl = url;
  }
}
