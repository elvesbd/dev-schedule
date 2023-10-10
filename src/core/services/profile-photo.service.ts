import { Injectable } from '@nestjs/common';
import { FileInput } from '@core/shared/types';
import { FileStorageService } from '@core/shared/ports/storage';

@Injectable()
export class ProfilePhotoService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async getUrl(input: FileInput, folderName: string): Promise<string> {
    const path = await this.fileStorageService.upload(input, folderName);
    return await this.fileStorageService.getUrl(path);
  }
}
