document.addEventListener('DOMContentLoaded', function() {
  // 游戏主类
  class Game1024 {
    constructor() {
      this.grid = [];
      this.score = 0;
      this.bestScore = 0;
      this.gameOver = false;
      this.startX = 0;
      this.startY = 0;
      
      // 初始化DOM元素引用
      this.gridElement = document.getElementById('grid');
      this.scoreElement = document.getElementById('score');
      this.bestScoreElement = document.getElementById('best-score');
      this.gameOverElement = document.getElementById('game-over');
      this.newGameButton = document.getElementById('new-game-btn');
      
      // 绑定事件处理
      this.bindEvents();
      
      // 初始化游戏
      this.initGame();
    }
    
    // 初始化游戏
    initGame() {
      // 创建4x4的网格
      this.grid = Array(4).fill().map(() => Array(4).fill(0));
      
      // 初始化分数
      this.score = 0;
      
      // 从本地存储加载最高分
      const savedBestScore = localStorage.getItem('bestScore');
      this.bestScore = savedBestScore ? parseInt(savedBestScore) : 0;
      
      // 重置游戏状态
      this.gameOver = false;
      
      // 添加两个初始数字
      this.addRandomTile();
      this.addRandomTile();
      
      // 更新视图
      this.updateView();
    }
    
    // 绑定事件处理
    bindEvents() {
      // 新游戏按钮点击事件
      this.newGameButton.addEventListener('click', () => this.initGame());
      
      // 键盘事件
      document.addEventListener('keydown', (e) => {
        if (this.gameOver) return;
        
        switch(e.key) {
          case 'ArrowUp':
            this.move('up');
            break;
          case 'ArrowRight':
            this.move('right');
            break;
          case 'ArrowDown':
            this.move('down');
            break;
          case 'ArrowLeft':
            this.move('left');
            break;
        }
      });
      
      // 触摸事件
      const gameContainer = document.getElementById('game-container');
      
      gameContainer.addEventListener('touchstart', (e) => {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        e.preventDefault(); // 防止滚动
      }, { passive: false });
      
      gameContainer.addEventListener('touchend', (e) => {
        if (this.gameOver) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        // 计算滑动方向
        const dx = endX - this.startX;
        const dy = endY - this.startY;
        
        // 确定主要方向（水平或垂直）
        if (Math.abs(dx) > Math.abs(dy)) {
          // 水平滑动
          if (dx > 0) {
            this.move('right');
          } else {
            this.move('left');
          }
        } else {
          // 垂直滑动
          if (dy > 0) {
            this.move('down');
          } else {
            this.move('up');
          }
        }
        
        e.preventDefault(); // 防止滚动
      }, { passive: false });
    }
    
    // 添加随机数字(2或4)
    addRandomTile() {
      // 获取所有空格子
      const emptyCells = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.grid[i][j] === 0) {
            emptyCells.push({row: i, col: j});
          }
        }
      }
      
      // 如果没有空格子，返回
      if (emptyCells.length === 0) return;
      
      // 随机选择一个空格子
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      // 90%概率生成2，10%概率生成4
      this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
    
    // 更新分数
    updateScore(score) {
      this.score = score;
      this.scoreElement.textContent = score;
      
      // 更新最高分
      if (score > this.bestScore) {
        this.bestScore = score;
        this.bestScoreElement.textContent = score;
        localStorage.setItem('bestScore', score);
      }
    }
    
    // 检查游戏是否结束
    checkGameOver() {
      // 检查是否有空格子
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.grid[i][j] === 0) return false;
        }
      }
      
      // 检查是否有可以合并的相邻格子
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // 检查右侧
          if (j < 3 && this.grid[i][j] === this.grid[i][j+1]) return false;
          // 检查下方
          if (i < 3 && this.grid[i][j] === this.grid[i+1][j]) return false;
        }
      }
      
      // 没有空格子且没有可合并的格子，游戏结束
      return true;
    }
    
    // 移动和合并数字
    move(direction) {
      // 如果游戏已结束，不处理移动
      if (this.gameOver) return;
      
      // 复制当前网格状态
      const previousGrid = JSON.parse(JSON.stringify(this.grid));
      let score = this.score;
      
      // 根据方向处理移动
      switch(direction) {
        case 'up':
          score = this.moveUp(score);
          break;
        case 'right':
          score = this.moveRight(score);
          break;
        case 'down':
          score = this.moveDown(score);
          break;
        case 'left':
          score = this.moveLeft(score);
          break;
      }
      
      // 检查网格是否有变化
      let changed = false;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.grid[i][j] !== previousGrid[i][j]) {
            changed = true;
            break;
          }
        }
        if (changed) break;
      }
      
      // 如果有变化，添加新的随机数字并更新视图
      if (changed) {
        this.addRandomTile();
        this.updateScore(score);
        
        // 检查游戏是否结束
        this.gameOver = this.checkGameOver();
        
        // 更新视图
        this.updateView();
      }
    }
    
    // 向上移动
    moveUp(score) {
      for (let j = 0; j < 4; j++) {
        // 合并同一列中的数字
        for (let i = 1; i < 4; i++) {
          if (this.grid[i][j] !== 0) {
            let row = i;
            while (row > 0 && this.grid[row-1][j] === 0) {
              // 移动数字
              this.grid[row-1][j] = this.grid[row][j];
              this.grid[row][j] = 0;
              row--;
            }
            
            // 合并相同的数字
            if (row > 0 && this.grid[row-1][j] === this.grid[row][j]) {
              this.grid[row-1][j] *= 2;
              this.grid[row][j] = 0;
              score += this.grid[row-1][j]; // 增加分数
            }
          }
        }
      }
      return score;
    }
    
    // 向右移动
    moveRight(score) {
      for (let i = 0; i < 4; i++) {
        // 合并同一行中的数字
        for (let j = 2; j >= 0; j--) {
          if (this.grid[i][j] !== 0) {
            let col = j;
            while (col < 3 && this.grid[i][col+1] === 0) {
              // 移动数字
              this.grid[i][col+1] = this.grid[i][col];
              this.grid[i][col] = 0;
              col++;
            }
            
            // 合并相同的数字
            if (col < 3 && this.grid[i][col+1] === this.grid[i][col]) {
              this.grid[i][col+1] *= 2;
              this.grid[i][col] = 0;
              score += this.grid[i][col+1]; // 增加分数
            }
          }
        }
      }
      return score;
    }
    
    // 向下移动
    moveDown(score) {
      for (let j = 0; j < 4; j++) {
        // 合并同一列中的数字
        for (let i = 2; i >= 0; i--) {
          if (this.grid[i][j] !== 0) {
            let row = i;
            while (row < 3 && this.grid[row+1][j] === 0) {
              // 移动数字
              this.grid[row+1][j] = this.grid[row][j];
              this.grid[row][j] = 0;
              row++;
            }
            
            // 合并相同的数字
            if (row < 3 && this.grid[row+1][j] === this.grid[row][j]) {
              this.grid[row+1][j] *= 2;
              this.grid[row][j] = 0;
              score += this.grid[row+1][j]; // 增加分数
            }
          }
        }
      }
      return score;
    }
    
    // 向左移动
    moveLeft(score) {
      for (let i = 0; i < 4; i++) {
        // 合并同一行中的数字
        for (let j = 1; j < 4; j++) {
          if (this.grid[i][j] !== 0) {
            let col = j;
            while (col > 0 && this.grid[i][col-1] === 0) {
              // 移动数字
              this.grid[i][col-1] = this.grid[i][col];
              this.grid[i][col] = 0;
              col--;
            }
            
            // 合并相同的数字
            if (col > 0 && this.grid[i][col-1] === this.grid[i][col]) {
              this.grid[i][col-1] *= 2;
              this.grid[i][col] = 0;
              score += this.grid[i][col-1]; // 增加分数
            }
          }
        }
      }
      return score;
    }
    
    // 更新视图
    updateView() {
      // 清空网格
      this.gridElement.innerHTML = '';
      
      // 创建格子和方块
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          
          if (this.grid[i][j] !== 0) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${this.grid[i][j]}`;
            tile.textContent = this.grid[i][j];
            cell.appendChild(tile);
          }
          
          this.gridElement.appendChild(cell);
        }
      }
      
      // 更新分数
      this.scoreElement.textContent = this.score;
      this.bestScoreElement.textContent = this.bestScore;
      
      // 显示或隐藏游戏结束提示
      this.gameOverElement.style.display = this.gameOver ? 'flex' : 'none';
    }
  }
  
  // 创建游戏实例
  const game = new Game1024();
});