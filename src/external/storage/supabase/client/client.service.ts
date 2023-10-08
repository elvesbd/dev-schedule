import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupaBaseClientService {
  private readonly logger = new Logger(SupaBaseClientService.name);
  private supabaseClient: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.supabaseClient) {
      this.logger.log('client exists - returning for current Scope');
      return this.supabaseClient;
    }

    this.logger.log('initializing new supabase client');

    this.supabaseClient = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
      {
        auth: {
          persistSession: false,
        },
      },
    );

    return this.supabaseClient;
  }
}
