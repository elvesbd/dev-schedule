import { FileInput } from '@core/shared/types';

export abstract class FileStorageService {
  abstract upload(file: FileInput, type: string): Promise<string>;
  abstract getUrl(path: string): Promise<string>;
  abstract remove(path: string): Promise<void>;
}
