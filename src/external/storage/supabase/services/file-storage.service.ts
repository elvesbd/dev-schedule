import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractFilePathService } from '@external/utils';
import { SupaBaseClientService } from '@external/storage/supabase/client';
import {
  FileStorageUploadException,
  FileStorageGetUrlException,
  FileStorageRemoveException,
} from '@external/storage/exceptions';
import { FileInput } from '@core/shared/types';

@Injectable()
export class SupaBaseFileStorageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supaBaseClientService: SupaBaseClientService,
  ) {}

  private readonly logger = new Logger(SupaBaseClientService.name);
  private readonly SUPABASE_BUCKET = this.configService.get('SUPABASE_BUCKET');

  async upload(file: FileInput, type: string): Promise<string> {
    const { originalname, buffer } = file;
    const supabase = await this.getSupaBaseClient();
    const baseFolder = 'profile-photo';

    try {
      const {
        data: { path },
      } = await supabase.storage
        .from(this.SUPABASE_BUCKET)
        .upload(`${baseFolder}/${type}/${originalname}`, buffer, {
          upsert: true,
        });
      return path;
    } catch (error) {
      this.logger.error(error.message);
      throw new FileStorageUploadException();
    }
  }

  async getUrl(path: string): Promise<string> {
    const supabase = await this.getSupaBaseClient();

    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.SUPABASE_BUCKET).getPublicUrl(path);

      return publicUrl;
    } catch (error) {
      this.logger.error(error.message);
      throw new FileStorageGetUrlException();
    }
  }

  async remove(path: string): Promise<void> {
    const supabase = await this.getSupaBaseClient();
    const bucketPath = ExtractFilePathService.handler(path);

    const { error } = await supabase.storage
      .from(this.SUPABASE_BUCKET)
      .remove([bucketPath]);

    if (error) {
      this.logger.error(error.message);
      throw new FileStorageRemoveException();
    }
  }

  private async getSupaBaseClient() {
    return this.supaBaseClientService.getClient();
  }
}
