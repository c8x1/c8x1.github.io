# -*- coding: utf-8 -*-
import json

with open('/Users/noctis/Workspace/trySth/c8x1.github.io/articles.json', 'r') as f:
    d = json.load(f)

# Article 1: Rolf Harris
cn1 = [
    "那句老话——千万别去见你的偶像，因为他们注定会让你失望——我并不信服。我对人类的卓越性，从来不想如此犬儒地看待。",
    "是的，我深切而痛苦地意识到，这个世界充斥着可怕的事件和坏人。但我庆幸自己，仅仅凭借出生的机缘，就生活在一个——我指的不仅是我的邻里——善良、慷慨，乃至文明，并非例外的地方。",
    "新闻行业让原本颇为普通的人获得了接触名望与名流的独特渠道。四十年的新闻从业生涯中，我有幸——这是许多人得不到的机缘——见到了一些我最仰慕的人。我得说，大概十次里有八次，我并未失望。也许我只是运气好，撞上了这样的概率！",
    "演员和音乐家。前任与现任首相及政府高官。运动员。视觉艺术家。澳大利亚最负盛名的小说家、剧作家、电影和戏剧导演。还有一些仅仅因为出名而出名的人。他们大多不负我的期待。",
    "然而，最令人失望、也最令人震惊的个人经历——一个演艺者精心经营的大众形象与其真实人格如此明显地相悖——发生在二十多年前，我在伦敦遇见演艺者罗尔夫·哈里斯的时候。",
    "那只是那样一个私人时刻——让你重新审视童年的记忆，审视它们如何顽固地延续到成年之后。",
    "我（比喻意义上）是在哈里斯的陪伴下长大的，他是我童年文化世界里的核心人物，与《游戏学校》和\"涂鸦先生\"齐名。他在电视上扮演\"三腿杰克\"的绝活，他那感染力十足的歌曲，他对摇摆板的妙用，以及他作为视觉艺术漫画家的技巧，都令人目眩神迷。他似乎是那个时代最完美的童年娱乐者。",
    "我曾记述过，我童年最温暖的记忆之一，就是坐在墨尔本一座维多利亚时代的宏伟老剧院的座位上，夹在妈妈和爸爸之间，旁边是姐姐。我大概四五岁。聚光灯下，舞台上唱着《把我袋鼠绑下来，伙计》的，正是罗尔夫·哈里斯——我（黑白电视、六十年代末）屏幕上的偶像。",
    "连同我上学的第一天，这长久以来一直是我对遥远童年的一段令人欣慰的成年记忆，充满了对笑声、掌声的温暖，更不消说，还有家人的团聚。",
    "我不禁将对哈里斯的喜爱带入了成年。他是那个在伦敦大获成功的澳大利亚人。他为女王画过肖像。他甚至把齐柏林飞艇乐队《天堂阶梯》那段土味演绎搞得有点酷。",
    "我并非孤例。一代澳大利亚（和英国）孩子热爱哈里斯。他看上去（最具欺骗性地）安全而可信赖，他的幽默干净——整套包装完美无瑕。他在英国取得了狂飙式的成功；鉴于英澳之间那种殖民自卑感，澳大利亚有理由为哈里斯庆祝数十年。直到因为最不堪的理由，这一切不再成立。",
    "在那场很久以前伦敦的社交活动上，我想告诉他，想感谢他为我的童年带来了如此多的欢乐。那感觉像是我欠他的，是他赋予我童年的那份快乐的债务。\"哦，是的，\"他傲慢地说，带着一种刻意而冰冷的漠然，然后转身离去。",
    "也许我不该如此伤心和震惊。或许他只是厌倦了名望——那种别人优雅承受的名望——厌倦了澳大利亚侨民在鸡尾酒会上拦住他，说他曾是他们童年中多么美好的一部分？",
    "一位大约同一时期也在伦敦见过他的记者朋友形容他是\"一个彻头彻尾的讨厌鬼，自以为是的混蛋\"。考虑到其余那些事，这还算客气的。仅仅是那座掠夺性冰山在社会层面的尖端。",
    "哈里斯侵害的那越来越多的受创女性和女孩——她们因为信任他的名望而接近他，当他以最恶劣的方式滥用这份信任时，她们因之而感到被困——她们的勇气，她们挺身而出，值得被赞颂。",
    "与此同时，我们这些与他有过短暂却难忘交集的人，只能去思索遇见偶像的社会与情感审慎——以及我们是否真能将艺术与艺术家分开。",
    "有时，也许我们可以，也应该如此。",
    "但面对罗尔夫·哈里斯这样的恶魔则不然——他将美好的记忆化为尘土，将名望变为恶名，将信任变为侵害。"
]

en1 = [
    "I'm not convinced by the old adage that we should never meet our idols because they are bound to disappoint us. I've never wanted to approach human exceptionalism quite so cynically.",
    "Yes, I'm acutely, painfully conscious that the world is replete with terrible events and bad people. But I'm counting myself fortunate that purely by dint of birth I live somewhere (and I don't just mean my neighbourhood) where human capacity for kindness, generosity and, yes, civility, are not the exception.",
    "Journalism gives otherwise pretty regular people unique access to fame and celebrity. And across four decades in journalism I've had the privilege, one not afforded to so many others, to meet some of the people I've most admired. And I've got to say that probably eight out of 10 times I haven't been disappointed. Maybe I'm lucky to have struck such odds!",
    "Actors and musicians. Former and serving prime ministers and senior government members. Sports people. Visual artists. Australia's most celebrated novelists, playwrights, and film and theatre directors. Other people who are simply famous for being famous. For the most part they have lived up to my expectations.",
    "But the biggest, most disappointing, and the most striking personal experience of where an entertainer's carefully cultivated public image was so evidently at odds with their actual persona, came 20-something years ago when I met entertainer Rolf Harris in London.",
    "It was simply one of those personal moments that made you check your childhood memories, and how they can hold fast into adulthood.",
    "I grew up (figuratively) with Harris as a central figure in my childhood cultural world, along with Play School and Mr Squiggle. His wizardry on TV as Jake the Peg (with the extra leg), his infectious songs, his magic with the wobble board and skill as a visual art caricaturist, were totally mesmerising. He seemed the perfect childhood entertainer for his epoch.",
    "I've previously recounted how one of my warmest memories as a kid was of sitting in a stall with my elder sister, between Mum and Dad, in one of Melbourne's grand old Victorian-era theatres. I was perhaps four or five. Spot-lit on the stage singing Tie Me Kangaroo Down, Sport, was Rolf Harris – my idol from (black and white, late 1960s) TV.",
    "Together with my first day at school, it had long been an enduringly comforting adult memory of my very distant childhood, one full of warmth for all of its laughter, applause and, not least, family togetherness.",
    "I couldn't help but take my fondness for Harris into adulthood. He was the Australian who'd made it big in London. He'd painted a portrait of the queen. He'd even made a daggy rendition of Led Zep's Stairway to Heaven kind of cool.",
    "I wasn't alone. A generation of Australian (and British kids) loved Harris. He seemed (most deceptively) safe and trustworthy, his humour clean – the entire package wholesome. He was riotously successful in the UK; given the British-antipodean colonial cringe, that was a reason for Australia to celebrate Harris for decades. Until for all the worst reasons possible, it wasn't.",
    "At that long ago social event in London I wanted to tell him, to thank him for bringing such joy to my childhood. It felt like something I owed him, the debt of happiness he had brought to my childhood. \"Oh yes,\" he said, arrogantly, with a studied, cold diffidence before turning away.",
    "Maybe I shouldn't have been so saddened and shocked. Perhaps he was just weary of the fame that others wore with so much grace – tired of Aussie expats stopping him on the cocktail circuit to say what a delightful part of their childhoods he'd been?",
    "A journalist friend who also met him in London around the same time described him as \"a totally obnoxious, up-himself arsehole\". This was kind, given the rest of it. Just the social tip of a predatory iceberg.",
    "The growing list of traumatised women and girls that Harris abused (because they trusted him due to his fame and when he abused it in the worst way possible, felt entrapped because of it) should be celebrated for their courage in coming forward.",
    "Meanwhile, those of us who had fleeting if memorable interactions with him are left to ponder the social and emotional prudence of meeting our idols – and if we can truly separate the art from the artist.",
    "Sometimes, perhaps, we can and we should.",
    "But not in the case of a monster like Rolf Harris, who turned fond memories into dust, fame into infamy and trust into abuse."
]

# Article 2: AI Absolutism
cn2 = [
    "我们听到关于人工智能的一切说法都是相互矛盾的，而且关于它的讨论似乎无处不在。AI是糟糕的。AI是美好的。它将毁灭世界。它将变革未来。拥抱它是必不可少的。抵制使用它是一种道德义务。",
    "AI已经被预测将产生近乎难以估量的收入。在2025年最后一个季度，它贡献了美国经济增长的近60%。评论家和经济学家已经在焦虑地担忧，如果AI泡沫破裂，将会有什么灾祸降临我们头上。",
    "自ChatGPT——第一个大型语言模型——于2022年末发布以来，仅科技行业就有超过五十万工人失去了工作。任何提到AI的地方，往往都伴随着警告：更多行业更深层的裁员即将波及我们所有人。芯片巨头英伟达的首席执行官黄仁勋在2025年说：\"每一份工作都将受到影响，而且是立竿见影的。这是毋庸置疑的。你不会因为AI而失去工作，但你会因为使用AI的人而失去工作。\"今年一月，Anthropic的首席执行官达里奥·阿莫代预测：\"AI不是替代特定的人类岗位，而是替代人类的一般劳动力。\"",
    "所有这些看似不同却同样带有末日色彩的观点，共同之处在于它们的AI绝对主义——一种将AI视为类神力量的思维方式，认为它要么将加速一个生产力和创新的黄金时代，要么将使人类走向毁灭。它映射了我们时代的政治极化，甚至映射了宗教狂热中的那种偏执。这是刻意设计的。尽管这些论点和焦虑彼此矛盾，但它们都完美契合了构建这项技术的人所传递的核心信息：AI的主导地位是不可逆转的。要么上车，要么被抛弃。我们这个时代的强盗贵族不仅能从对其明星产品的狂热追捧中获取暴利，同样也能从人们对它的恐惧中大肆获利。",
    "哥伦比亚大学经济学系教授苏雷什·奈杜说：\"如果你想为IPO中的巨额估值提供正当理由，你就需要指向未来将产生的收入流。你只需要让人觉得你拥有一个能吞噬地球上所有工作的东西，这样投资者就会想：'哦，天哪，我可不想错过这个东西。'\"",
    "奈杜并非在反驳AI将削减就业或颠覆某些行业的说法。他称这项技术\"具有变革性\"，并表示自己在研究和学术工作中每天都在使用它。只是当他拉开视角，将AI及其一切附带承诺和警告置于历史语境之中时，他看到了大量的炒作。",
    "初创公司Glitch的前首席执行官安尼尔·达什，数十年来一直在撰写关于科技的文章，他同样不确信我们被推销的AI会实现科技CEO们所预测的那些功能。",
    "他说：\"任何你投入万亿美元的技术，都会能够做很多事情，无论好坏。AI是一个飞跃。我认为我们从未有过一个机器学习系统，能像这次一样做这么多事情。\"但\"噪音太多，很难判断它的适用领域究竟在哪里。\"他说编程是个例外。测试AI模型的编程输出更容易，因为它要么能运行，要么不能。这项技术的许多其他应用则更加主观，因此不太容易被立即替代人力。",
    "正因为如此，科技行业到目前为止才制造了最深度的裁员——不过，在亚马逊、Meta和Block等公司裁员之际，已有员工爆料称，他们的老板所大肆宣扬的AI生产力增益是被夸大的。",
    "即便是AI在这些裁员和初级岗位缩减中所扮演的角色，也不是完全清晰的。加州大学伯克利分校哈斯商学院研究技术创新与商业周期的教授马丁·贝拉哈说，近期那些将ChatGPT发布与初级软件岗位下降联系起来的研究是\"有问题的\"。",
    "贝拉哈说：\"疫情期间科技行业出现了岗位累积，一旦消费模式从线上回归现实世界，我们就有太多行业里不需要的人在工作了。\"",
    "一些最庞大、最响亮地拥护AI的科技玩家，也得出了与AI批评者类似的结论。风险投资家马克·安德烈森在三月份宣称，人浮于事的公司正在把AI当作\"万能借口\"来清理冗员。五月，OpenAI的首席执行官山姆·奥特曼退让了他此前关于AI将大规模替代岗位的一些说法，表示：\"我原以为到现在初级白领岗位被消灭的影响会比实际已经发生的更大。\"",
    "而且，即使AI对科技岗位的最坏情景真的上演——这对许多人来说确实会很糟糕——那也远不及许多人恐惧的那种劳动末日。\"它真的会摧毁所有工作吗？\"奈杜问道。\"我不信。就拿软件来说。软件只占GDP的4%到6%。所以它不少，但也不是说整个经济都能被Claude Code替代。\"",
    "让人们相信AI将大规模替代人类工作者，是一种精明的营销策略。它不仅刺激了狂热的投资者投机，还转移了人们对AI在全球劳动力中更现实应用的注意力——这种应用远超科技行业的边界：用AI来监控和微观管理员工，从他们身上榨取更多的生产力，同时施压让他们对还有任何工作可做感到庆幸。零工经济中的劳动者——那些在Uber上接你上车、在DoorDash等平台上为你送餐的人——已经成为这种算法管理的实验对象，而劳动专家预测这种做法将会蔓延。",
    "在AI崛起这件事上，我们感觉像是活在一场实验之中。奈杜希望我们更新这种表述。\"实验意味着有一个不受影响的对照组。这里没有对照组，\"他说。",
    "我们被推销的AI版本，不必是我们买下的版本。它也不必是我们所相信的故事。",
    "相反，这是一种对温和与节制的主张。加州大学伯克利分校的贝拉哈教授说，人们过多地将AI聚焦为岗位替代技术。他说，在科技等少数行业之外，研究表明人和公司使用AI最有效的方式不是替代工作者，而是学得更多、学得更快。",
    "达什说：\"我认为我们必须认识到，可以有替代方案。我们可以想象的不是ChatGPT杀手，而是许多来自小型负责任玩家的许多不同的小型AI。\"已经有少数这样的项目在悄然涌现，呼应着互联网历史中更早、更乐观的日子，让人窥见如果人们将AI掌握在自己手中，可能实现什么。",
    "而对于那些被AI颠覆的行业和岗位来说，动荡可能反而为工人力量的复兴开辟道路——当白领工作者开始看到团结的吸引力，无论是与办公室里的同事还是蓝领世界的工人。",
    "毕竟，工业革命——那个与我们当下奇异映照的早期重大技术变革时期——正是劳工运动的关键催化剂——即便它的胜利需要时间才得以实现。"
]

en2 = [
    "Everything we hear about artificial intelligence is conflicting, and hearing about it feels inescapable. AI is terrible. AI is wonderful. It will break the world. It will transform the future. It's essential to embrace it. It's a moral imperative to abstain from using it.",
    "Already, AI is projected to generate nearly unfathomable amounts of revenue. In the last quarter of 2025, it represented nearly 60% of the growth in the US economy. Already, pundits and economists wring their hands about what calamity will befall us if and when the AI bubble bursts.",
    "Since ChatGPT, the first of the large language models, was released in late 2022, more than half a million workers in the tech industry alone have lost their jobs. Any mention of AI tends to be accompanied by warnings that deeper jobs cuts across many more industries are coming for us all. Jensen Huang, CEO of chip giant Nvidia, said in 2025: \"Every job will be affected, and immediately. It is unquestionable. You're not going to lose your job to an AI, but you're going to lose your job to someone who uses AI.\" In January, Anthropic's CEO, Dario Amodei, predicted: \"AI isn't a substitute for specific human jobs but rather a general labor substitute for humans.\"",
    "What all these divergently apocalyptic ideas hold in common is their AI absolutism – a way of seeing AI as a godlike force that will either hasten a golden age of productivity and innovation, or will doom humanity. It mirrors the political polarization of our era and even the zealotry found in religious fanaticism. This is by design. Contradictory as they may be, all these arguments and anxieties fit neatly into the overarching message of the people building this technology: AI's dominance is inevitable. Get on board or you will be left behind. The robber barons of our age stand to profit wildly from not only enthusiasm about their star product, but also, the terror of it.",
    "\"If you want to justify this enormous valuation in your IPO, you need to point to the revenue stream that you're going to generate in the future,\" said Suresh Naidu, a professor at Columbia University's department of economics. \"You just need to make it look like you have something that can eat all the work on the planet, so that an investor will think: 'Oh wow, I don't want to miss out on this thing.'\"",
    "Naidu isn't refuting claims that AI will cut into jobs or upend certain industries. He called the technology \"transformative\" and said that he uses it every day in his work as a researcher and academic. It's just that when he zooms out and puts AI and all its attendant promises and warnings in historical context, he sees a lot of hype.",
    "Anil Dash, the former CEO of the startup Glitch, who's been writing about tech for decades, is also unconvinced that the AI we're being sold will do all the things tech CEOs are predicting it will do.",
    "\"Any technology that you invest like a trillion dollars into is going to be able to do a lot of things, good or bad. [AI is] a leap forward. I don't think we've ever had a machine learning system that can do as many things as this one does,\" he said. But \"there's so much noise that it's hard to tell what the domains of applicability are.\" Coding is an exception, he said. It's easier to test an AI model's coding output because it will clearly work, or it won't. Many other applications for the tech are much more subjective and therefore less prone to immediate job replacement.",
    "That's why the tech industry has made the deepest job cuts so far – though, amid layoffs at companies such as Amazon, Meta and Block, reports from employees have emerged saying the AI productivity gains their bosses trumpet are overblown.",
    "Even the role AI is playing in those layoffs and reductions to entry-level positions isn't entirely clear. Martin Beraja, a professor at UC Berkeley Haas School of Business who studies technological innovation and business cycles, said recent studies that have drawn connections between the release of ChatGPT and a decline in entry-level software jobs are \"problematic\".",
    "There was \"a buildup of jobs in [tech] coming out of the pandemic, and once … consumption patterns moved away from online to the real world again, now we had too many people working in the industry that we didn't really need\", Beraja said.",
    "Some of the biggest and most loudly pro-AI players in tech have arrived at similar conclusions as AI critics. Venture capitalist Marc Andreessen proclaimed in March that overstaffed companies are using AI as a \"silver-bullet excuse\" to clean house. In May, OpenAI's CEO, Sam Altman, retreated on some of his prior claims of massive job replacement by AI, saying: \"I thought there would have been more impact on entry-level white-collar jobs being eliminated by now than has actually happened.\"",
    "And if AI's worst-case scenario for tech jobs plays out – which would indeed be very bad for many people – that's still nowhere near the apocalyptic future of labor that many fear. \"Is it, in fact, going to destroy all of the jobs?\" Naidu asked. \"I'm not convinced. Even take software. Software is only about 4 to 6% of GDP. So it's a lot, but it's not like the whole economy can be replaced by Claude Code.\"",
    "Convincing people that AI will replace human workers in droves is a clever marketing tactic. Not only does it stoke rabid investor speculation, but it distracts from a more realistic application of AI for the global workforce, stretching far beyond the borders of the tech industry: using AI to surveil and micromanage employees to squeeze yet more productivity out of them, all the while pressuring them to feel grateful that they have any kind of work at all. Gig workers, the people who pick you up in Ubers and deliver your food on platforms like DoorDash, have already been the guinea pigs for this kind of algorithmic management, and labor experts predict it will spread.",
    "It can feel like we're living in an experiment when it comes to the rise of AI. Naidu would like us to update that framing. \"An experiment implies a control group of something that's not affected. There's no control group here,\" he said.",
    "The version of AI that we're being sold doesn't have to be the version we buy. Nor does it need to be the story we believe in.",
    "Instead, this is an argument for moderation. Beraja, the UC Berkeley professor, said there was too much focus on AI as a job replacement technology. Outside a few industries like tech, he said studies show that the most effective ways for people and companies to use AI is not to replace workers, but to learn more, and learn faster.",
    "\"Where I think we have to get to is, there can be alternatives,\" said Dash. \"What we can imagine is, rather than the ChatGPT killer, a lot of different little AIs from little responsible players.\" A few are already quietly cropping up, harkening back to earlier and more optimistic days in the internet's history, and offering a glimpse of what could be possible if people took AI into their own hands.",
    "And for the industries and jobs that AI is upending, upheaval may open the way for a resurgence in worker power as white-collar workers begin to see the appeal of solidarity, whether with colleagues in their office or workers in the blue-collar world.",
    "After all, the Industrial Revolution, an earlier time of great technological transformation that strangely mirrors our current moment, was a key catalyst for the labor movement – even if its wins took time."
]

# Article 3: Hilbert's Hotel Parable
cn3 = [
    "无穷城坐落在一片被称为「数的疆域」的广袤平原上，城中所有建筑都沿一条直线排列，从第一号房屋一直延伸到视线不可及之处。这座城市的中心是一座名为「无尽旅馆」的巨大建筑——它拥有一间一号房、一间二号房、一间三号房，如此类推，永远没有最后一间。旅馆的主人吕衡是一位精瘦的老人，他的眼睛里总带着一种近乎安详的倦意，仿佛他早已见过一切可能的景象，而所有景象最终都指向同一个答案：还有更多。",
    "某天傍晚，旅馆的每一间房都已住满了客人。吕衡坐在前厅的柜台后，翻阅一本永远翻不到末页的账簿。一位风尘仆仆的旅人推门而入，恳求一间住处。吕衡没有犹豫，拿起柜台上的铜铃摇了一声。刹那间，一号房的客人搬到了二号房，二号房的客人搬到了三号房，三号房的客人搬到了四号房——每一位客人从n号房搬到了n+1号房。这条搬迁的指令如涟漪般传向无穷远处，没有一个人无处可去，因为对于任何一个房间号，总有下一个房间号等着它。旅人微笑着走进了一号房。",
    "不久之后，一辆无尽的列车缓缓驶入无穷城车站——车上有无穷多位新客人，每一位都需要一间房。吕衡的助手惊慌地说：「一间一号房可以腾出来，但无穷多位客人怎能全部安顿？」吕衡却只是平静地摇了第二次铜铃。这一次的指令不同：每一位老客人从n号房搬到了2n号房——一号房的客人去二号房，二号房的客人去四号房，三号房的客人去六号房。所有偶数号房间被老客人填满，而所有奇数号房间——一号、三号、五号、七号……——像一条被拨开的珍珠项链，忽然全部空了出来。无穷多位新客人鱼贯而入，每人住进一间奇数号房，旅馆再次满了，但没有人被遗弃在门外。",
    "然而那天夜里，吕衡第一次失眠了。他走出旅馆，仰望无穷城的夜空——星辰如同房间号，一颗接一颗，永远没有尽头。他忽然意识到一件令人不安的事：旅馆从未真正「满」过。满是一个有限的概念，它意味着每一间房都有人住，没有空余。但在这里，满与不满之间的区别消失了——即使每一间房都有人，他仍然可以容纳一位新客人、十位、一百位，甚至无穷多位。这意味着「满」这个词在无尽旅馆中毫无意义，就像对一条无限延伸的河流谈论「尽头」一样荒谬。",
    "第二天清晨，吕衡试图做一件他从未做过的事：清点旅馆中的所有客人。他从一号房开始，一间一间地数。一号房一位，二号房一位，三号房一位……他数了一上午，数了一整天，数了一整夜。每当他以为自己快接近终点时，前方仍有同样多的房间等待被数。他停下来思索：如果清点本身永远不会结束，那么「总数」这个概念也不存在。旅馆中没有叫做「客人总数」的数字——不是因为数字太大写不出来，而是因为这件事本身就不属于数字所能描述的范畴。",
    "吕衡关上账簿，走回柜台。他终于明白了一件事：无穷不是一种规模，而是一种性质。有限的世界里，「满」意味着容纳的极限，「数」意味着可以被穷尽的总量。但在无尽旅馆中，这些概念像旧衣服一样不合身——它们被撑破、被颠覆、被证明只是更小世界的规矩，而非天地间普遍的铁律。旅馆走廊延伸至无限，不是因为房间很多，而是因为这里遵循着一种截然不同的逻辑：一种不惧怕新增、不畏惧填满、也不承认终点的逻辑。",
    "这则寓言映射的是数学中著名的「希尔伯特旅馆悖论」（Hilbert's Hotel paradox）。1924年，数学家大卫·希尔伯特（David Hilbert）在一次讲座中提出了这个思想实验：一家拥有无穷多个房间且每间都已住满客人的旅馆，仍然可以再容纳一位新客人——只需让每位客人从n号房搬到n+1号房；甚至可以容纳无穷多位新客人——只需让每位老客人从n号房搬到2n号房，腾出所有奇数号房间。这个悖论揭示的不仅仅是「无穷大可以容纳更多」这一表面事实，而是一个更深刻的真相：无穷不是一个很大的数字，而是一种根本不同的数学性质。在有限的世界中，「满」意味着没有余量，「数」意味着可以被完成的计数过程。但当对象的数量是无穷时，这些从有限经验中提炼出的直觉全部失效——部分可以等于整体，添加不会增加总量，计数永远无法终结。希尔伯特旅馆不是关于容量的问题，而是关于我们对「多少」这个概念本身的理解是否已经走到了它的边界。"
]

en3 = [
    "Infinity City sits upon a vast plain known as the Realm of Numbers, where all buildings stand in a single line—from the first house to a point beyond the reach of any eye. At the city's heart stands a colossal edifice called The Endless Inn. It possesses a Room One, a Room Two, a Room Three, and so on, forever, with no final room. The inn's proprietor, Lü Heng, is a lean old man whose eyes carry a serene weariness, as though he has long since witnessed every possible scene, and all scenes ultimately point to the same answer: there is more.",
    "One evening, every room in the inn was occupied. Lü Heng sat behind the front desk, leafing through a ledger whose pages never ran out. A travel-worn guest pushed open the door and begged for a place to stay. Lü Heng did not hesitate. He picked up the bronze bell on the counter and rang it once. Instantly, the guest in Room One moved to Room Two, the guest in Room Two moved to Room Three, the guest in Room Three moved to Room Four—each guest shifted from room n to room n+1. The relocation order rippled toward infinity, and no one was left without a destination, because for every room number, the next room number was always waiting. The newcomer walked into Room One with a smile.",
    "Not long after, an endless train slowly pulled into Infinity City station—carrying infinitely many new guests, each requiring a room. Lü Heng's assistant panicked: \"We can free one room, but how can we possibly settle infinitely many newcomers?\" Lü Heng merely rang the bell a second time, calmly. This time the order was different: every existing guest moved from room n to room 2n—the guest in Room One went to Room Two, Room Two's guest went to Room Four, Room Three's guest went to Room Six. All the even-numbered rooms were filled by old guests, and all the odd-numbered rooms—Room One, Room Three, Room Five, Room Seven—lay empty like a necklace of pearls suddenly unclasped. The infinitely many newcomers filed in, each taking an odd-numbered room. The inn was full again, yet no one had been left outside the door.",
    "That night, however, Lü Heng could not sleep—the first time this had ever happened. He stepped outside the inn and gazed up at Infinity City's night sky, where stars hung like room numbers, one after another, with no end. He suddenly realized something unsettling: the inn had never truly been \"full.\" Full is a finite concept—it means every room is taken, with no vacancies. But here, the distinction between full and not-full had dissolved. Even when every room was occupied, he could still accommodate one new guest, ten, a hundred, even infinitely many. The word \"full\" was meaningless at The Endless Inn, just as it would be absurd to speak of the \"end\" of a river that stretches infinitely on.",
    "The next morning, Lü Heng attempted something he had never done before: count all the guests in the inn. He started from Room One, counting one by one. One guest in Room One, one guest in Room Two, one guest in Room Three. He counted all morning, all day, all night. Whenever he thought he was nearing the end, just as many rooms remained ahead. He paused to consider: if the counting itself can never finish, then the concept of \"total number\" does not exist here. There is no number called \"the total number of guests\" in the inn—not because the number is too large to write down, but because this matter falls outside the very category that numbers can describe.",
    "Lü Heng closed the ledger and returned to the counter. He finally understood: infinity is not a magnitude, but a nature. In the finite world, \"full\" means the limit of capacity, \"count\" means a total that can be exhausted. But at The Endless Inn, these concepts fit like old clothes on a grown body—stretched, torn, overturned, revealed to be rules of a smaller world, not universal iron laws of all existence. The inn's corridors stretch to infinity not because there are many rooms, but because a fundamentally different logic prevails here: a logic unafraid of addition, undaunted by filling, and unwilling to acknowledge any terminus.",
    "This parable mirrors the famous \"Hilbert's Hotel paradox\" in mathematics. In 1924, the mathematician David Hilbert proposed this thought experiment in a lecture: a hotel with infinitely many rooms, all occupied, can still accommodate one new guest—simply move each guest from room n to room n+1; it can even accommodate infinitely many new guests—move each existing guest from room n to room 2n, freeing all the odd-numbered rooms. What this paradox reveals is not merely the surface fact that \"infinity can hold more,\" but a deeper truth: infinity is not a very large number—it is a fundamentally different mathematical nature. In the finite world, \"full\" means no surplus remains, and \"count\" means a process that can be completed. But when the quantity of things is infinite, every intuition distilled from finite experience collapses—a part can equal the whole, additions do not increase the total, and counting can never conclude. Hilbert's Hotel is not a question about capacity; it is a question about whether our understanding of the very concept of \"how many\" has reached its own boundary."
]

# Build article objects
def make_paragraphs(cn, en):
    return [{"cn": c, "en": e} for c, e in zip(cn, en)]

def word_count(cn_list):
    return sum(len(p.split()) for p in cn_list)

article1 = {
    "id": "rolf-harris-can-we-separate-the-art-from-the-person",
    "title": "罗尔夫·哈里斯：我们能否将艺术与艺术家分开？",
    "subtitle": "",
    "author": "Guardian Australia",
    "source": "The Guardian",
    "date": "2026-06-12",
    "category": ["哲学/伦理学"],
    "tags": ["艺术与艺术家", "伦理学", "Rolf Harris", "偶像与真相"],
    "summary": cn1[5] + "——这篇文章探讨了一个经典的伦理学问题：当一位艺术家的人格与其艺术作品的美完全相悖时，我们是否还能将艺术与艺术家分开？作者以与罗尔夫·哈里斯的个人经历为线索，讲述了童年偶像如何从表面上的温暖与安全，变成了现实中冷酷与侵害的化身。",
    "file": "articles/2026/06/2026-06-12-rolf-harris-can-we-separate-the-art-from-the-person.html",
    "originalUrl": "https://www.theguardian.com/commentisfree/2026/jun/12/rolf-harris-can-we-separate-the-art-from-the-person",
    "stats": {"wordCount": word_count(cn1), "readTime": 4},
    "content_cn": "\n\n".join(cn1),
    "content_en": "\n\n".join(en1),
    "paragraphs": make_paragraphs(cn1, en1)
}

article2 = {
    "id": "ai-absolutism-apocalyptic-future",
    "title": "AI绝对主义与末日叙事",
    "subtitle": "所谓AI将释放无限潜力与生产力的梦幻承诺，同样不成立",
    "author": "Samantha Oltman",
    "source": "The Guardian",
    "date": "2026-06-12",
    "category": ["科学哲学"],
    "tags": ["AI绝对主义", "技术批判", "AI泡沫", "劳工权益"],
    "summary": cn2[0][:200],
    "file": "articles/2026/06/2026-06-12-ai-absolutism-apocalyptic-future.html",
    "originalUrl": "https://www.theguardian.com/technology/2026/jun/11/ai-absolutism-apocalyptic-future",
    "stats": {"wordCount": word_count(cn2), "readTime": 5},
    "content_cn": "\n\n".join(cn2),
    "content_en": "\n\n".join(en2),
    "paragraphs": make_paragraphs(cn2, en2)
}

article3 = {
    "id": "the-inn-that-never-fills",
    "title": "永不满的旅馆",
    "subtitle": "",
    "author": "AI Parable (inspired by David Hilbert)",
    "source": "每日精选",
    "date": "2026-06-12",
    "category": ["寓言故事"],
    "tags": ["希尔伯特旅馆悖论", "Hilbert's Hotel paradox", "David Hilbert"],
    "summary": cn3[0][:200],
    "file": "articles/2026/06/2026-06-12-the-inn-that-never-fills.html",
    "originalUrl": "",
    "stats": {"wordCount": word_count(cn3), "readTime": 3},
    "content_cn": "\n\n".join(cn3),
    "content_en": "\n\n".join(en3),
    "paragraphs": make_paragraphs(cn3, en3)
}

# Add all 3 articles
d['articles'].append(article1)
d['articles'].append(article2)
d['articles'].append(article3)

# Write back
with open('/Users/noctis/Workspace/trySth/c8x1.github.io/articles.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)

print(f"Added 3 articles. Total: {len(d['articles'])}")
for a in d['articles'][-3:]:
    print(f"  id={a['id']}, title={a['title']}, category={a['category']}, paragraphs={len(a['paragraphs'])}")