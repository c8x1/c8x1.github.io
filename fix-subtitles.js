#!/usr/bin/env node
/**
 * fix-subtitles.js - Index-based subtitle/title translation fix
 */
const fs = require('fs');
const path = require('path');
const ARTICLES_PATH = path.join(__dirname, 'articles.json');

// Direct index-based fixes
const fixes = {
  1:  { title: '检索的悖论：韩炳哲对数字资本主义的批判' },
  2:  { title: '2026年最强LLM权威指南' },
  3:  { subtitle: '智能体AI的架构模式：自主性、工具使用与安全防护' },
  4:  { subtitle: '韩炳哲论算法时代的倦怠社会与注意力危机' },
  5:  { subtitle: '2026年开源LLM技术对比分析' },
  6:  { subtitle: '算法时代的权力意志与一切价值的重估' },
  7:  { subtitle: '开源大模型的中国范式与技术突破' },
  8:  { subtitle: '量子计算与神经网络的交叉前沿' },
  9:  { subtitle: 'AI感受痛苦的可能性与我们的道德责任' },
  10: { subtitle: '智能体AI如何重塑2026年的工程工作流程' },
  11: { subtitle: '2026年最佳AI编程工具：从代码助手到部署伙伴' },
  12: { subtitle: '算法时代的实践理性与道德律令' },
  13: { subtitle: '科学研究范式的智能化革命' },
  14: { subtitle: '从视觉感知到三维世界理解的技术演进' },
  15: { subtitle: '庄子哲学在数字时代的当代启示' },
  16: { subtitle: '从对话到行动的自主AI系统范式革命' },
  17: { subtitle: '深度学习与逻辑推理的融合之路' },
  18: { subtitle: '神经科学与决定论的哲学交锋' },
  19: { subtitle: '从快思考到慢思考的AI推理革命' },
  20: { subtitle: '分布式AI的新架构范式' },
  21: { subtitle: '从查尔默斯到整合信息理论的意识探索' },
  22: { subtitle: '从RLHF到可解释性研究的范式转移' },
  23: { subtitle: '从DNA存储到类脑计算的跨界融合' },
  24: { subtitle: '超越人类中心主义的思想实验' },
  25: { subtitle: '自主系统如何重塑商业格局' },
  26: { subtitle: '下一代算力基础设施' },
  27: { subtitle: '从海德格尔的「向死而生」到数字时代的永恒现在' },
  28: { subtitle: '人形机器人从实验室走向现实世界' },
  29: { subtitle: '从Copilot到Agent：开发者与智能机器的协作' },
  30: { subtitle: '从海德格尔到AI时代的技术追问' },
  31: { subtitle: '从感知到认知的多模态技术跃迁' },
  32: { subtitle: '2026年自主系统如何重塑数字世界' },
  33: { subtitle: '在信息洪流中寻找内心平静' },
  34: { subtitle: '从智能体到超级个体的技术演进' },
  35: { subtitle: '神经形态芯片如何重塑智能计算' },
  36: { subtitle: '自由、真实性与荒诞的哲学探索' },
  37: { subtitle: '2026年最值得关注的AI突破与新闻' },
  38: { subtitle: '2025年大语言模型趋势与未来展望' },
  39: { subtitle: '量子计算如何改变人工智能的未来' },
  40: { subtitle: '2026年1月工业AI的突破性技术' },
  41: { subtitle: '一个永恒的哲学追问' },
  42: { subtitle: '大语言模型的进展、问题与预测' },
  43: { subtitle: '当工具理性剥夺了生活的内在价值' },
  44: { subtitle: '从突破到整合的AI研究格局' },
  46: { subtitle: '量子计算最新研究与技术进展' },
  47: { subtitle: '技术与哲学对话2025-2026' },
  49: { subtitle: '我们评测了15款AI编程Agent，只有3款改变了开发流程' },
  51: { subtitle: '日本「人间」伦理学如何解构西方自我概念' },
  52: { subtitle: '黑格尔辩证法视角下的AI推理模型综合与展望' },
  53: { subtitle: '2026年最佳开源视觉语言模型选择指南' },
  54: { subtitle: 'AI时代的哲学：面向未来的基础学科' },
  55: { title: '智能体AI详解', subtitle: 'MIT斯隆商学院深度解读智能体AI' },
  56: { subtitle: '世界模型能否解锁通用机器人？' },
  57: { subtitle: '向前看而非回头看：再生作为健康的更好理念' },
  58: { subtitle: '智能体AI如何改变2025年的数字工程' },
  59: { subtitle: 'LLM之后，世界模型是AI的下一个大事件' },
  60: { subtitle: 'AI感受痛苦的可能性与道德责任' },
  61: { subtitle: '2026年AI的五大趋势预测' },
  62: { subtitle: '2026年企业级智能体AI架构：从试点到生产' },
  63: { title: '智能体AI详解', subtitle: '生成式AI的下一个进化：智能体AI全面解读' },
  64: { subtitle: 'Meta的V-JEPA 2让AI感知和导航物理世界' },
  65: { subtitle: 'AI意识伦理与道德责任的哲学审视' },
  67: { title: '2026年AI Agent采用现状：数据与分析' },
  71: { subtitle: '2026年4月开源AI模型更新：Gemma 4系列、GLM-5V-Turbo及最新榜单' }
};

const data = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
let count = 0;

Object.keys(fixes).forEach(idx => {
  const i = parseInt(idx);
  const fix = fixes[i];
  if (fix.title && data.articles[i]) {
    data.articles[i].title = fix.title;
    count++;
  }
  if (fix.subtitle && data.articles[i]) {
    data.articles[i].subtitle = fix.subtitle;
    count++;
  }
});

fs.writeFileSync(ARTICLES_PATH, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Fixed ${count} fields across ${Object.keys(fixes).length} articles`);
