import fs from 'fs';
import path from 'path';

// 定義 Page 類型
interface Page {
  url: string;
  lastModified: Date;
}

// 定義存放頁面的資料夾
const appDirectory = path.join(process.cwd(), './src/app/(Home)');

export async function getPages(): Promise<Page[]> {
  // 遞迴讀取資料夾中所有檔案的路徑
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      } else {
        arrayOfFiles.push(filePath);
      }
    });

    return arrayOfFiles;
  };

  const allFiles = getAllFiles(appDirectory);
  
  // 過濾並處理 page.tsx 檔案
  const pageFiles: Page[] = allFiles
    .filter((file) => 
      file.endsWith('.tsx') && 
      !file.includes('_app') && 
      !file.includes('_document') && 
      !file.includes('_components') && 
      !file.includes('ticket-user-info') &&
      !file.includes('sellticket') &&
      !file.includes('not-found') && 
      !file.includes('loading') && 
      !file.includes('error') 
    )
    .map((file) => {
      // 移除資料夾路徑和檔案副檔名，僅保留檔案路徑作為 slug
      const relativePath = file
        .replace(appDirectory, '')
        .replace(/\.tsx$/, '')
        .replace(/\\/g, '/'); // 針對 Windows 檔案路徑進行處理

      // 過濾掉特定資料夾和頁面檔案
      const cleanedPath = relativePath
        .split('/')
        .filter((segment) => !segment.startsWith('(') && segment !== 'page' )
        .join('/');

      // 獲取檔案的最後修改時間
      const stats = fs.statSync(file);
      const lastModified = stats.mtime;

      // 根據檔案路徑生成 URL
      const url = `https://www.chancetix.com${cleanedPath === '/index' ? '' : `${cleanedPath}`}`;
      console.log(url)
      // 回傳頁面資訊
      return {
        url,
        lastModified,
      };
    });

  return pageFiles;
}
