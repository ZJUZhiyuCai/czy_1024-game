# 1024游戏 - 网页版

一个优雅的基于JavaScript开发的1024游戏网页版本。游戏的目标是通过合并相同数字的方块来获得1024或更高的分数。这是一个轻量级但功能完整的益智游戏，完美适配PC和移动设备。

## 游戏特点

- 经典的1024游戏玩法，简单易上手
- 流畅的触摸控制和键盘控制支持
  - 使用方向键（↑↓←→）或滑动屏幕来移动方块
  - 支持触摸屏设备的多点触控操作
- 智能的方块合并系统
  - 相同数字的方块相撞时自动合并
  - 90%概率生成数字2，10%概率生成数字4
- 完整的游戏状态管理
  - 实时分数统计
  - 自动保存最高分记录
  - 一键开始新游戏
- 响应式界面设计
  - 完美适配各种屏幕尺寸
  - 清晰的游戏说明
  - 优雅的视觉效果

## 在线体验

你可以通过以下链接在线体验游戏：
https://github.com/your-username/1024-game

## 本地运行

1. 克隆仓库到本地：
```bash
git clone https://github.com/your-username/1024-game.git
```

2. 使用浏览器打开index.html文件即可开始游戏

## 技术栈

- HTML5：构建游戏界面
- CSS3：实现响应式设计和动画效果
- 原生JavaScript：
  - ES6类的实现
  - DOM操作和事件处理
  - LocalStorage实现数据持久化
  - 触摸事件处理

## 主要功能实现

- 使用二维数组实现游戏网格
- 实现了高效的方块移动和合并算法
- 使用LocalStorage存储最高分
- 完整的游戏状态检测机制
- 优化的触摸事件处理，确保移动端的流畅体验

## 贡献

欢迎提交Issue和Pull Request来帮助改进游戏。您可以：

- 报告bug
- 提出新功能建议
- 改进代码实现
- 优化游戏体验

## 许可证

MIT License - 查看 LICENSE 文件了解更多详情。

## 作者

如果您觉得这个项目有帮助，欢迎给个Star！