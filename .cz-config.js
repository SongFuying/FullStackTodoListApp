module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation changes' },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance'
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation'
    },
    {
      value: 'build',
      name: 'build:    Changes that affect the build system or external dependencies'
    }, //打包
    { value: 'revert', name: 'revert:   Revert to a commit' } // 回退
  ],
  // scopes: [
  //   { name: 'Component A' },
  //   { name: 'Component B' },
  //   { name: 'Component C' },
  //   { name: 'Other' },
  // ],

  // allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],

  messages: {
    type: "Select the type of change you're committing:",
    //   scope: "Select the scope of this change (optional):",
    customScope: 'Enter a custom scope:',
    subject: 'A short description (required):\n',
    body: 'A longer description of the change (optional). Use "|" to break new line:\n',
    //   breaking: 'List any breaking changes (optional):\n',
    footer: 'List any related issues (optional). E.g., #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit?(y/n)'
  },
  //skipQuestions: ['body', 'footer'], //跳过步骤
  subjectLimit: 72 //默认长度为72
  // footerPrefix: 'Related issues:',
}

//Mandarin
// module.exports = {
//     types: [
//       { value: 'feat', name: 'feat:     新功能' },
//       { value: 'fix', name: 'fix:      修复bug' },
//       { value: 'docs', name: 'docs:     文档变更' },
//       { value: 'style', name: 'style:    代码格式（不影响功能的变动）' },
//       { value: 'refactor', name: 'refactor: 代码重构(既不是新增功能,也不是修复bug)' },
//       { value: 'perf', name: 'perf:     性能优化' },
//       { value: 'test', name: 'test:     增加测试' },
//       { value: 'chore', name: 'chore:    其他变更（构建过程或辅助工具的变动）' },
//     ],

//     scopes: [
//       { name: '组件A' },
//       { name: '组件B' },
//       { name: '组件C' },
//       { name: '其他' },
//     ],

//     allowCustomScopes: true,
//     allowBreakingChanges: ['feat', 'fix'],

//     messages: {
//       type: "选择提交类型:",
//       scope: "选择变更范围 (可选):",
//       customScope: "请输入自定义范围:",
//       subject: "简短描述 (必填):\n",
//       body: '更详细的描述 (可选)。使用 "|" 换行:\n',
//       breaking: '列出破坏性变更 (可选):\n',
//       footer: '列出相关的issue (可选)。例如: #31, #34:\n',
//       confirmCommit: '确认提交？',
//     },

//     footerPrefix: '相关的issue：',
//   };
