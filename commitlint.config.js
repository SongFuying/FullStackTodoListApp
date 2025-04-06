module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  rules: {
    //type类型定义,表示git提交的必须在以下范围内
    'type-enum': [
      //错误级别
      2,
      //在什么情况下验证
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'build',
        'revert'
      ]
    ],
    //大小写不做检验
    'subject-case': [0],
    'scope-empty': [2, 'never']
  }
}
