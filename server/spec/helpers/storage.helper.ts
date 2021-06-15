import fs from 'fs';

export class StorageHelper {
  readonly DIRECTORY = './storage/test';

  purgeStorage = () => {
    if (fs.existsSync(this.DIRECTORY)) {
      const files = fs.readdirSync(this.DIRECTORY);

      files.forEach((file) => {
        fs.unlinkSync(`${this.DIRECTORY}/${file}`);
      });
    }
  }
}

export default StorageHelper;
