# my-sparrow

简易的可视化图表库

# 环境

- 测试：jest-electron
- 编译：babel
- 代码规范：eslint

## 代码构建 rollup

- rollup-plugin-babel 用babel对待吗进行编译
- rollup-plugin-node-resolve 保证代码能够正确加载文件

## 版本管理 Git
1. 代码检查并且规范提交信息：
   - husky： husky 能让你创建勾子（Hook），这些钩子会在指定时候执行。
   - commitlint：commitlint 会按照一定的规则对你的提交信息进行检查。
   - lint-staged：lint-staged 只会对你的新加入暂存区的文件进行指定的操作。
2. 