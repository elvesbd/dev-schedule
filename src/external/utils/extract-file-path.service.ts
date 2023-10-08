export class ExtractFilePathService {
  static handler(url: string): string | null {
    const match = url.match(/\/public\/[^\/]+\/(.+)\?t=/);
    return match ? match[1] : null;
  }
}
