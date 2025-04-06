//.prettierrc 也可以是这个文件名
//eslint和prettier之间有一些冲突问题 根据下方终端显示的内容 在eslint中进行off warn error的设置

module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  //react import的设置
  importOrder: [
    // 内部依赖
    '^../(.*)',

    // 本地依赖项，样式除外
    '^./((?!scss).)*$',

    // 其他
    '^./(.*)'
  ],
  importOrderSeparation: true, //导入顺序之间是否需要空行来分隔。
  importOrderSortSpecifiers: true, //是否对每个导入语句中的标识符进行排序。

  semi: false, //是否尾随分号
  singleQuote: true, //单引号代替双引号
  printWidth: 80, //每行的最大字符宽度。超过此宽度将自动换行，80 是常见的宽度限制。
  tabWidth: 2, //指定代码缩进的空格数量为 2 个空格。
  useTabs: false, //使用空格而不是制表符（tabs）进行缩进。
  endOfLine: 'lf', //设置行尾字符为 LF（Line Feed），适用于 Unix/Linux 系统。
  arrowParens: 'avoid', //在箭头函数中，如果参数只有一个，不需要括号。例如：x => x 而不是 (x) => x。
  proseWrap: 'preserve', //保留 Markdown 文件中的原始换行方式，而不是自动换行或展开。
  htmlWhitespaceSensitivity: 'strict', //控制 HTML 文件中空白字符的敏感度。设置为 strict 意味着严格保留 HTML 中的空白。
  trailingComma: 'none', //是否在对象或数组的最后一个元素后添加逗号。none 表示不添加。
  bracketSpacing: true //在对象的花括号 {} 内是否添加空格。例如：{ foo: bar } 而不是 {foo: bar}。
}
