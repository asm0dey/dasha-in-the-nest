import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { createReadStream, ReadStream } from 'fs';

@Injectable()
export class StorageService {
  async writeFile(data: Uint8Array, name: string) {
    return await fs.writeFile(join(process.cwd(), 'data', name), data, {
      flag: 'w+',
    });
  }

  getFileStream(name: string): ReadStream {
    return createReadStream(join(process.cwd(), 'data', name));
  }
}
