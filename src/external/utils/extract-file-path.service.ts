export class ExtractFilePathService {
  static handler(url: string): string | null {
    const regex = /\/storage\/v1\/object\/public\/[^/]+\/([^?]+)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
