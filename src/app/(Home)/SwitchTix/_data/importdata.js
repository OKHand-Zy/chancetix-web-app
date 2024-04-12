// importTasks.js

const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function importTasks() {
 // 讀取 JSON 檔案
  const data = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));

 // 使用 Prisma Client 將數據匯入到 Tasks 表中
  for (const task of data) {
    await prisma.tasks.create({
      data: {
        id: task.id,
        title: task.title,
        status: task.status,
        label: task.label,
        priority: task.priority,
      },
    });
  }

  console.log('Tasks imported successfully.');
}

importTasks()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });