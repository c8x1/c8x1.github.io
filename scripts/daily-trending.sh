#!/bin/bash
# GitHub Trending 每日归档脚本
# 通过系统 crontab 调用 claude -p 执行 github-trending skill 的 archive 模式
#
# 用法:
#   ./daily-trending.sh          # 手动执行
#   crontab 定时执行             # 每天 7:03 自动运行
#
# 日志: <project>/logs/trending-$(date +%Y-%m-%d).log

set -euo pipefail

# ── 自动检测环境 ──

# 项目目录：脚本所在目录的上一级
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Node.js / claude：从 PATH 或常见位置查找
NODE_BIN="$(command -v node 2>/dev/null && dirname "$(command -v node)")" || true
if [ -z "$NODE_BIN" ]; then
  # 尝试 nvm 默认
  for d in "$HOME/.nvm/versions/node/"*/bin; do
    if [ -x "$d/node" ]; then NODE_BIN="$d"; break; fi
  done
fi
if [ -z "$NODE_BIN" ]; then
  echo "ERROR: node not found. Install Node.js or nvm first." >&2; exit 1
fi
export PATH="$NODE_BIN:$HOME/.bun/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"

# claude CLI
CLAUDE="$(command -v claude 2>/dev/null)" || true
if [ -z "$CLAUDE" ]; then
  echo "ERROR: claude CLI not found. Install: npm install -g @anthropic-ai/claude-code" >&2; exit 1
fi

# 代理（可选）：读取环境变量或使用默认值
# 如果不需要代理，设置 NO_PROXY=1 或注释掉下面一行
: "${https_proxy:=http://127.0.0.1:7897}"
: "${http_proxy:=$https_proxy}"

# ── 执行归档 ──

LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/trending-${TODAY}.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始 GitHub Trending 每日归档..." | tee "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] PROJECT_DIR=$PROJECT_DIR" | tee -a "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLAUDE=$CLAUDE" | tee -a "$LOG_FILE"

cd "$PROJECT_DIR"

# 先同步远端（article cron 7:20 可能已推送改动）
git stash -q 2>/dev/null || true
git pull --rebase origin master 2>&1 | tee -a "$LOG_FILE" || true
git stash pop -q 2>/dev/null || true

# 使用 claude -p 非交互模式执行归档
# --allowedTools: 预授权所需工具，避免交互确认
# --model sonnet: 平衡速度与成本
echo "运行 /github-trending archive 执行每日 GitHub Trending 归档。完成后报告结果。" \
  | "$CLAUDE" -p \
    --model sonnet \
    --allowedTools "Bash,Read,Write,Edit,Agent,mcp__web_reader__webReader" \
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
    https_proxy="$https_proxy" http_proxy="$http_proxy" git push origin master 2>&1 | tee -a "$LOG_FILE"
  }
  PUSH_EXIT=$?
  if [ $PUSH_EXIT -ne 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] git push 最终失败 (exit code: $PUSH_EXIT)" | tee -a "$LOG_FILE"
    exit $PUSH_EXIT
  fi
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 全部完成" | tee -a "$LOG_FILE"
