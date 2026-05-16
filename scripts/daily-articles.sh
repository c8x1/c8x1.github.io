#!/bin/bash
# 每日文章归档脚本
# 通过系统 crontab 调用 claude -p 执行 translate-articles skill 的 archive 模式
#
# 用法:
#   ./daily-articles.sh          # 手动执行
#   crontab 定时执行             # 每天 7:20 自动运行
#
# 日志: ~/Workspace/trySth/c8x1.github.io/logs/articles-$(date +%Y-%m-%d).log

set -euo pipefail

# crontab 环境精简，需手动设置 PATH 和代理
export PATH="$HOME/.nvm/versions/node/v24.14.1/bin:$HOME/.bun/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
export https_proxy=http://127.0.0.1:7897
export http_proxy=http://127.0.0.1:7897

PROJECT_DIR="$HOME/Workspace/trySth/c8x1.github.io"
LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/articles-${TODAY}.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始每日文章归档..." | tee "$LOG_FILE"

cd "$PROJECT_DIR"

# 先同步远端（trending cron 7:03 可能已推送 data/ 改动）
git stash -q 2>/dev/null || true
git pull --rebase origin master 2>&1 | tee -a "$LOG_FILE" || true
git stash pop -q 2>/dev/null || true

# 使用 claude -p 非交互模式执行归档
# --allowedTools: 预授权所需工具，避免交互确认
# --model sonnet: 平衡速度与成本
# 通过 stdin 传递 prompt，避免中文参数解析问题
echo "运行 /translate-articles archive 执行每日文章归档。完成后报告结果。" \
  | /Users/noctis/.nvm/versions/node/v24.14.1/bin/claude -p \
    --model sonnet \
    --allowedTools "Bash,Read,Write,Edit,Agent,WebSearch,mcp__web_reader__webReader" \
  2>&1 | tee -a "$LOG_FILE"

# 用 PIPESTATUS 获取管道中 claude 的退出码（tee 会掩盖 claude 的错误）
CLAUDE_EXIT=${PIPESTATUS[0]}
if [ $CLAUDE_EXIT -ne 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] claude 执行失败 (exit code: $CLAUDE_EXIT)" | tee -a "$LOG_FILE"
  exit $CLAUDE_EXIT
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 归档完成" | tee -a "$LOG_FILE"

# 检查 git push 是否成功 — claude 内部 commit 后可能 push 失败
cd "$PROJECT_DIR"
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/master 2>/dev/null || echo "none")

if [ "$LOCAL" != "$REMOTE" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 检测到未推送的提交, 尝试 push..." | tee -a "$LOG_FILE"
  git push origin master 2>&1 | tee -a "$LOG_FILE" || {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] git push 失败, 使用代理重试..." | tee -a "$LOG_FILE"
    https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 git push origin master 2>&1 | tee -a "$LOG_FILE"
  }
  PUSH_EXIT=$?
  if [ $PUSH_EXIT -ne 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] git push 最终失败 (exit code: $PUSH_EXIT)" | tee -a "$LOG_FILE"
    exit $PUSH_EXIT
  fi
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 全部完成" | tee -a "$LOG_FILE"
