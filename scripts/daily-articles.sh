#!/bin/bash
# 每日文章归档脚本
# 通过系统 crontab 调用 claude -p 执行 translate-articles skill 的 archive 模式
#
# 用法:
#   ./daily-articles.sh          # 手动执行
#   crontab 定时执行             # 每天 7:20 自动运行
#
# 日志: <project>/logs/articles-$(date +%Y-%m-%d).log

set -euo pipefail

# ── 自动检测环境 ──

# 项目目录：脚本所在目录的上一级
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# 硬编码路径（cron 环境没有 nvm，自动检测不可靠）
export PATH="$HOME/.nvm/versions/node/v24.14.1/bin:$HOME/.bun/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
CLAUDE="$HOME/.nvm/versions/node/v24.14.1/bin/claude"

# 代理（可选）：读取环境变量或使用默认值
# 如果不需要代理，设置 NO_PROXY=1 或注释掉下面一行
: "${https_proxy:=http://127.0.0.1:7897}"
: "${http_proxy:=$https_proxy}"

# ── 执行归档 ──

LOG_DIR="$PROJECT_DIR/logs"
mkdir -p "$LOG_DIR"

TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/articles-${TODAY}.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始每日文章归档..." | tee "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] PROJECT_DIR=$PROJECT_DIR" | tee -a "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLAUDE=$CLAUDE" | tee -a "$LOG_FILE"

# 代理预检：调研步 curl 维基 + 抓 3:AM 都依赖 7897。没起就跳过当天，不产半成品。
# 设 NO_PROXY=1 可跳过本检查（仅在不需要外网时）。
if [ -z "${NO_PROXY:-}" ]; then
  if ! nc -z 127.0.0.1 7897 2>/dev/null; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 代理 127.0.0.1:7897 未运行，跳过今日归档（避免半成品）。启 Clash 后可手动 ./scripts/daily-articles.sh 补跑。" | tee -a "$LOG_FILE"
    exit 0
  fi
fi

cd "$PROJECT_DIR"

# 先同步远端（trending cron 可能已推送 data/ 改动）
git stash -q 2>/dev/null || true
git pull --rebase origin master 2>&1 | tee -a "$LOG_FILE" || true
git stash pop -q 2>/dev/null || true

# 使用 claude -p 非交互模式执行归档
# --allowedTools: 预授权所需工具，避免交互确认
# --model opus: 最高质量，确保寓言严格遵循概念揭示格式
echo "运行 /translate-articles archive 执行每日文章归档。完成后报告结果。" \
  | "$CLAUDE" -p \
    --model opus \
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
  # 主 push：~/.ssh/config 已把 github.com 映射到 ssh.github.com:443 直连
  git push origin master 2>&1 | tee -a "$LOG_FILE" || {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 直连 push 失败, 经 Clash SOCKS5 (ssh.github.com:443) 重试..." | tee -a "$LOG_FILE"
    GIT_SSH_COMMAND="ssh -o HostName=ssh.github.com -o Port=443 -o ProxyCommand='nc -X 5 -x 127.0.0.1:7897 %h %p'" \
      git push origin master 2>&1 | tee -a "$LOG_FILE"
  }
  PUSH_EXIT=$?
  if [ $PUSH_EXIT -ne 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] git push 最终失败 (exit code: $PUSH_EXIT)" | tee -a "$LOG_FILE"
    exit $PUSH_EXIT
  fi
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 全部完成" | tee -a "$LOG_FILE"
