'use strict';
module.exports = {
  types: [
    {
      value: 'WIP',
      name : '💪  WIP: 暫存工作。'
    },
    {
      value: 'Feat',
      name : '✨  Feat: 新增功能。'
    },
    {
      value: 'Fix',
      name : '🐞  Fix: 修復 bug。'
    },
    {
      value: 'Docs',
      name : '📚  Docs: 修改文件。'
    },
    {
      value: 'Style',
      name : '💅  Style: 修改程式碼的風格，不會對產品有任何的功能變動 (空白鍵、格式化、分號...等)。'
    },
    {
      value: 'Refactor',
      name : '🛠  Refactor: 重構、優化程式碼，不是新功能或是修復 bug。'
    },
    { 
      value: 'Perf', 
      name: '🐎  Perf: 提升性能' 
    },
    {
      value: 'Test',
      name : '🏁  Test: 新增或修改現有的測試'
    },
    {
      value: 'Revert',
      name : '⏪  Revert: 撤銷、復原一次 git commit。'
    },
    {
      value: 'Chore',
      name : '🗯  Chore: 修改建置流程、包管理、構建過程或輔助工具的變動。不包含修改測試檔、src 裡的檔案。'
    },
    { 
      value: 'Merge', 
      name: '⌛  Merge: 合併分支' 
    },
    { 
      value: 'Build', 
      name: '📦  Build: 模組打包' 
    },
    { 
      value: 'CI', 
      name: '🔧  CI: 持續集成' 
    },
    { 
      value: 'Release', 
      name: '🚀  Release: 發布新版本' 
    },
    { 
      value: 'Other', 
      name: '🌈  Other: 其它改動，例如:建構流程, 套件管理' 
    },
    
  ],

  // scopes: [
  //   {
  //     value: "HTML",
  //     name: '針對 HTML 結構'
  //   },
  //   {
  //     value: "CSS",
  //     name: '針對 CSS 樣式'
  //   },
  //   {
  //     value: "Javascript",
  //     name: '針對套件'
  //   }
  // ],
  messages: {
    type: '<type> 說明 commit 的類別: \n',
    scope: '<scope> 影響範圍，比如會影響到哪個模塊/性能/哪一層（業務層，持久層，緩存，rpc），如果是特性代碼，可以寫特性名稱 (可選): \n',
    customScope: '<scope> 自定義影響範圍，請精簡扼要但不失去原意: \n',
    subject: '<subject> 目的的簡短描述，不超過 100 個字符: \n',
    body: '<body> 對本次 commit 的詳細描述，使用第一人稱，應該說明代碼變動的動機，以及與以前行為的對比，可以使用 "|" 分成多行 (可選):\n',
    breaking: '<breaking> 對破壞性變動(Breaking Change)的描述、以及變動理由和遷移方法 (可選):\n',
    footer: '<footer> 針對的 issue，像是：#520, #1314 (可選):\n',
    confirmCommit: '<confirm commit> 請確認以上描述。',
  },
  upperCaseSubject: true,
  footerPrefix: 'Related issue:',
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix", "refactor"],
};