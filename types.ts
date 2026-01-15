
export interface GeneratedPrompt {
  id: string;
  originalIdea: string;
  espanglishPrompt: string;
  chinesePrompt: string;
  timestamp: number;
}

export interface Customizations {
  lighting: string;
  angle: string;
  composition: string;
  atmosphere: string;
  technique: string;
  color: string;
  dynamic: string;
  paper: string;
  focus: string;
  detail: string;
}

export const INK_STYLES = [
  "✨ AI Choose | AI 决定",
  "Anime: Cyberpunk Edge | 赛博朋克", "Anime: Studio Ghibli | 吉卜力风格", "Anime: Makoto Shinkai | 新海诚风格", "Anime: 90s Retro | 90年代复古", "Anime: Dark Fantasy | 暗黑幻想",
  "Oil: Van Gogh Impress | 梵高印象", "Oil: Renaissance | 文艺复兴", "Oil: Palette Knife | 刮刀油画", "Oil: Baroque | 巴洛克", "Oil: Abstract Exp | 抽象表现",
  "Photo: National Geo | 国家地理", "Photo: Vogue Fashion | 时尚大片", "Photo: Street Life | 街头摄影", "Photo: Macro Nature | 微距摄影", "Photo: Cinematic 35mm | 电影质感",
  "Digital: Unreal Engine 5 | 虚幻引擎5", "Digital: Concept Art | 概念设计", "Digital: 3D Render | 3D渲染", "Digital: Pixel Art | 像素艺术", "Digital: Synthwave | 合成波",
  "Traditional: Watercolor | 水彩画", "Traditional: Charcoal | 木炭画", "Traditional: Ukiyo-e | 浮世绘", "Traditional: Ink Wash | 水墨画", "Traditional: Sketch | 素描",
  "Epic: God-ray Lighting | 耶稣光", "Epic: Massive Scale | 宏大视角", "Epic: Award Winning | 获奖作品", "Epic: Hyper-realistic | 超写实", "Epic: Ethereal | 空灵"
];
