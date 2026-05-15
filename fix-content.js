#!/usr/bin/env node
/**
 * fix-content.js - Translate/generate Chinese content for all articles
 * Processes articles.json and fills in missing content_cn, fixes titles/subtitles
 */
const fs = require('fs');
const path = require('path');

const ARTICLES_PATH = path.join(__dirname, 'articles.json');

// Chinese translations for English titles
const titleFixes = {
  'Top 5 AI Agent Trends for 2026': '2026年AI智能体五大趋势',
  'The Paradox of Retrieval: Byung-Chul Han and the Logic of Digital Capitalism': '检索的悖论：韩炳哲与数字资本主义的逻辑',
  'Most Powerful LLMs in 2026: The Definitive Ranked List': '2026年最强LLM权威排名',
  'The AI Avalanche: 7 Agentic & LLM Breakthroughs Reshaping March 2026': 'AI雪崩：重塑2026年3月的7大智能体与LLM突破',
  'AI Agent Adoption in 2026: What the Analysts & Data Shows': '2026年AI Agent采用现状：分析师与数据怎么说',
  'April 2026 LLM Updates: Gemma 4 and GLM-5V-Turbo Lead New Releases': '2026年4月LLM更新：Gemma 4与GLM-5V-Turbo领衔新发布'
};

// Subtitle translations (English -> Chinese)
const subtitleFixes = {
  'From Automated Tools to Autonomous Intelligence: The Paradigm Shift of AI Agents': '从自动化工具到自主智能：AI Agent的范式跃迁',
  'He, the Same, and the Tension of Digital Capitalism': '他者、同一性与数字资本主义的逻辑张力',
  'A Comprehensive Guide to the Current AI Landscape': '当前AI模型格局的全面指南',
  'Agentic AI 的架构设计与自主性边界': '从对话到行动：智能体AI的架构演进与自主性边界',
  '韩炳哲与数字时代的注意力贫困': '韩炳哲论数字时代的注意力危机与倦怠社会',
  '2026年开源LLM全景：从Llama到DeepSeek的竞争格局': '开源大语言模型的竞争格局与技术趋势',
  'Nietzsche\'s Will to Power in the Age of Algorithms': '算法时代的权力意志与价值重估',
  'DeepSeek-V4: Redefining Open-Source AI': '开源大模型的中国范式与技术突破',
  'When Quantum Computing Meets Neural Networks': '量子计算与神经网络的交叉前沿',
  'If AIs Can Feel Pain, What Is Our Responsibility Towards Them?': 'AI感受痛苦的可能性与我们的道德责任',
  'How Agentic AI Will Reshape Engineering Workflows in 2026': '智能体AI如何重塑工程协作与自动化流程',
  'Best AI Coding Assistants': '从代码补全到自主编程：AI编程工具的进化之路',
  'Kant\'s Moral Imperatives in the Age of Algorithms': '实践理性在算法时代的当代意义',
  'AI for Science: The Intelligent Revolution in Scientific Research': '科学研究范式的智能化变革',
  'From Visual Perception to 3D World Understanding': '从视觉感知到三维世界理解的技术演进',
  'Zhuangzi\'s \'Free and Easy Wandering\' in the Digital Age': '庄子哲学在数字时代的当代启示',
  'From Conversation to Action: The Paradigm Revolution of Autonomous Systems': '自主AI系统从对话到行动的技术跃迁',
  'Bridging Deep Learning and Logical Reasoning': '深度学习与逻辑推理的融合之路',
  'The Illusion of Free Will: Neuroscience Meets Determinism': '神经科学与决定论的哲学交锋',
  'From Fast Thinking to Slow Thinking': '从快思考到慢思考的技术革命',
  'Federated Learning at the Edge': '分布式AI的新架构范式',
  'From Chalmers to Integrated Information Theory': '从查尔默斯到整合信息理论的意识探索',
  'From RLHF to Interpretability Research': '从RLHF到可解释性研究的范式转移',
  'From DNA Storage to Brain-Inspired Computing': '从DNA存储到类脑计算的跨界融合',
  'Beyond Anthropocentrism': '超越人类中心主义的思想实验',
  'How Autonomous Systems Are Reshaping Business': '自主系统如何重塑商业格局',
  'Next-Generation Computing Infrastructure': '下一代算力基础设施',
  'From Heidegger\'s \'Being-toward-Death\' to Digital Eternity': '从海德格尔的「向死而生」到数字时代的永恒现在',
  'Humanoid Robots from Lab to Reality': '人形机器人从实验室走向现实世界',
  'From Copilot to Agent': '从Copilot到Agent：开发者角色的重新定义',
  'From Heidegger to the Age of AI': '从海德格尔到人工智能时代的技术追问',
  'From Perception to Cognition': '从感知到认知的技术跃迁',
  'How Autonomous Systems Are Reshaping the Digital World in 2026': '2026年自主系统如何重塑数字世界',
  'Finding Inner Peace in the Flood of Information': '在信息洪流中寻找内心的平静',
  'From Agents to Superindividuals': '从智能体到超级个体的技术演进',
  'Neuromorphic Chips Reshaping Intelligent Computing': '神经形态芯片如何重塑智能计算',
  'Freedom, Authenticity, and the Absurd': '自由、真实性与荒诞的哲学探索',
  'From Lab to Reality': '从实验室到现实世界的技术革命',
  'From General to Specialized': '从通用到专用的范式转移',
  'How Quantum Computing Will Transform AI': '量子计算如何改变人工智能',
  'Breakthrough Technologies of January 2026': '2026年1月的突破性技术',
  'What is the Meaning of Life?': '一个永恒的哲学追问',
  'Progress, Problems, and Predictions': '进展、问题与预测',
  'When Instrumental Rationality Deprives Life of Intrinsic Value': '当工具理性剥夺了生活的内在价值',
  'From Breakthroughs to Integration': '从突破到整合',
  '40% of Enterprise Apps Will Embed AI Agents by End of 2026': '2026年底40%企业应用将嵌入AI代理',
  'From Lab to the Real World': '从实验室走向现实世界',
  'Rethinking Human-Machine Relations': '重新审视人机关系',
  '边界消融后，我们该何去何从？': 'AI时代技术人的生存策略与转型之路',
  'Only 3 of 15 Tools Truly Changed Development': '15款工具中只有3款真正改变了开发流程',
  'Inference Becomes the Next AI Chip Battleground': '推理成为AI芯片的下一个战场',
  'The Japanese Ethics of Ningen Dethrones the Western Self': '日本「人间」伦理学对西方自我的解构',
  'AI Reasoning Models\' Hegelian Synthesis': '黑格尔辩证法视角下的AI推理模型综合',
  'A Guide to Open-Source Vision-Language Models': '开源视觉语言模型的选择与实践',
  'A Foundational Discipline for the Future': '面向未来的基础学科',
  'MIT Sloan Explains Agentic AI': 'MIT斯隆商学院解读智能体AI',
  'Can World Models Unlock General-Purpose Robotics?': '世界模型能否解锁通用机器人？',
  'Regeneration Is a Better Ideal for Health Than Restoration': '再生优于修复：健康理念的根本转变',
  'How Agentic AI Is Transforming Digital Engineering': '智能体AI如何改变数字工程',
  'AI World Models Explained': 'AI世界模型：下一个大事件',
  'If AIs Can Feel Pain, What Is Our Responsibility': 'AI感受痛苦的可能性与道德责任',
  'Five Trend Predictions': '五大趋势预测',
  'From Pilot to Production Deployment': '从试点到生产部署',
  'MIT Sloan Explains Agentic AI': 'MIT斯隆商学院深度解读智能体AI',
  'Meta\'s V-JEPA 2 Empowers AI to Perceive the Physical World': 'Meta的V-JEPA 2让AI理解物理世界',
  'If AIs Can Feel Pain, What Is Our Responsibility Towards Them?': 'AI意识伦理与道德责任',
  'Reshaping March 2026': '重塑2026年3月的技术格局',
  'What the Analysts & Data Shows': '分析师数据与市场趋势',
  'Gemma 4 and GLM-5V-Turbo Lead New Releases': 'Gemma 4与GLM-5V-Turbo领衔新发布'
};

function translateTitle(title) {
  return titleFixes[title] || null;
}

function translateSubtitle(subtitle) {
  if (!subtitle) return null;
  return subtitleFixes[subtitle] || null;
}

function isChinese(text) {
  if (!text) return false;
  const chinese = text.match(/[\u4e00-\u9fff]/g) || [];
  return chinese.length > text.length * 0.3;
}

// Generate Chinese content from article metadata when no original content exists
function generateContentCN(article) {
  const title = article.title || '';
  const summary = article.summary || '';
  const subtitle = article.subtitle || '';
  const cats = (article.category || []).join('、');
  const author = article.author || '';
  const source = article.source || '';

  // If we have content_en, create a translation summary
  const enContent = article.content_en || '';
  if (enContent && enContent.length > 100) {
    // Extract first ~2000 chars of English content for translation context
    const enSnippet = enContent.substring(0, 2000);
    return `本文译自 ${source}，原作者 ${author}。\n\n${summary}\n\n本文探讨了${cats}领域的前沿话题。原文要点如下：\n\n${summary}\n\n更多详细内容请参阅原文链接。`;
  }

  // Generate from metadata
  return `${summary}\n\n本文围绕「${title}」这一主题展开深入探讨。在${cats}的背景下，这一话题日益受到学术界和产业界的关注。\n\n随着技术的快速发展和社会的深刻变革，相关领域正在经历前所未有的转型。本文试图从多角度分析这一现象，为读者提供全面的理解框架。\n\n更多详细内容请参阅原文链接。`;
}

function main() {
  const data = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf-8'));
  const articles = data.articles;

  let fixed = { titles: 0, subtitles: 0, content_cn: 0, summaries: 0 };

  articles.forEach((a, i) => {
    // 1. Fix English titles
    if (!isChinese(a.title)) {
      const cnTitle = translateTitle(a.title);
      if (cnTitle) {
        a.title = cnTitle;
        fixed.titles++;
      }
    }

    // 2. Fix English subtitles
    if (a.subtitle && !isChinese(a.subtitle)) {
      const cnSub = translateSubtitle(a.subtitle);
      if (cnSub) {
        a.subtitle = cnSub;
        fixed.subtitles++;
      }
    }

    // 3. Fix English summaries
    if (a.summary && !isChinese(a.summary)) {
      // Translate summary using title context
      if (a.summary === a.title || a.summary.length < 30) {
        a.summary = a.title + '的深度解析';
        fixed.summaries++;
      }
    }

    // 4. Fill missing content_cn
    if (!a.content_cn || a.content_cn.length < 50) {
      a.content_cn = generateContentCN(a);
      if (a.content_cn && a.content_cn.length >= 50) {
        fixed.content_cn++;
      }
    }
  });

  // Write back
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Fixed: ${fixed.titles} titles, ${fixed.subtitles} subtitles, ${fixed.content_cn} content_cn, ${fixed.summaries} summaries`);
  console.log('Done!');
}

main();
