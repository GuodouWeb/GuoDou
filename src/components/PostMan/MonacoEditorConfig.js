

/**
 * 编辑器配置
 * */
export const opts = {
    value: '',
    readOnly: false, // 是否可编辑 // 是否为只读模式
    language: "json", // 语言类型
    theme: "vs", // 编辑器主题
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart" //-如果设置off 编辑器上的代码补全显示了,但却不补上
    accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    accessibilitySupport: "off", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoIndent: true, // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
    folding: true, // 是否启用代码折叠
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
}
