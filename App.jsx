/* =====================================================================
   HSK VIỆT — Nền tảng tự học tiếng Trung HSK 1–9 (React, 1 file)
   PHẦN 1/6: IMPORT + DỮ LIỆU HỌC TẬP
   Ghép nối tiếp: Phần 1 → 2 → 3 → 4 → 5 → 6 trong cùng file App.jsx
   ===================================================================== */
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react';
import {
  Home,
  Map,
  CalendarCheck,
  BookOpen,
  Book,
  Mic,
  Headphones,
  PenTool,
  Layers,
  ListChecks,
  ClipboardList,
  MessageCircle,
  BarChart2,
  Settings,
  Volume2,
  Play,
  Square,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  Target,
  Award,
  Lock,
  Eye,
  EyeOff,
  Shuffle,
  Download,
  Upload,
  Trash2,
  Menu,
  GraduationCap,
  Sparkles,
  Info,
  Moon,
  Sun,
  FileText,
  Bot,
  Copy,
  Globe,
  Brain,
  Languages,
  Send,
  Star,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar as RBar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Tulip,
  GardenRose,
  Ranunculus,
  Peony,
  MiniBloom,
  LeafSprig,
  TulipBouquet,
  RoseCluster,
  RanunculusCluster,
  FloralCorner,
  WelcomeGarden,
  GardenBackdrop,
  PetalFall,
} from './FloralDecorations.jsx';
/* ---------- Quy ước dữ liệu ----------
      Từ vựng (mỗi dòng): 汉字|pinyin|nghĩa|loại|câu ví dụ (tách từ bằng dấu cách)|pinyin câu|dịch|emoji
      Dòng chỉ có chữ Hán = nhắc lại từ đã có ở bài trước.
      Hội thoại (mỗi dòng): Vai|câu (tách từ)|pinyin|dịch
      Câu hỏi ngữ pháp: đề|đáp án đúng|nhiễu 1|nhiễu 2|nhiễu 3|giải thích
      Dữ liệu từ vựng do website biên soạn theo chủ đề HSK 1 — CHƯA phải danh sách chính thức. */

const POS = {
  d: 'danh từ',
  v: 'động từ',
  a: 'tính từ',
  r: 'đại từ',
  m: 'số từ',
  q: 'lượng từ',
  p: 'phó từ',
  u: 'trợ từ',
  c: 'liên từ',
  g: 'giới từ',
  x: 'cụm từ',
  t: 'từ chỉ thời gian',
  n: 'động từ năng nguyện',
};

const SKILLS = {
  pron: 'Phát âm',
  listen: 'Nghe',
  speak: 'Nói',
  read: 'Đọc',
  write: 'Viết',
  vocab: 'Từ vựng',
  grammar: 'Ngữ pháp',
};

/* ===================== HSK 1 — TUẦN 1–8 (bài học có nội dung) ===================== */
const HSK1_WEEKS = [
  {
    w: 1,
    t: 'Pinyin: thanh mẫu, vận mẫu, thanh điệu',
    ls: [
      {
        t: 'Bốn thanh điệu và thanh nhẹ',
        g: 'tone',
        v: `
   妈妈|māma|mẹ|d|这 是 我 妈妈 。|Zhè shì wǒ māma.|Đây là mẹ tôi.|👩
   爸爸|bàba|bố, ba|d|我 爸爸 是 老师 。|Wǒ bàba shì lǎoshī.|Bố tôi là giáo viên.|👨
   马|mǎ|con ngựa|d|这 是 马 。|Zhè shì mǎ.|Đây là con ngựa.|🐴
   八|bā|tám (8)|m|我 有 八 本 书 。|Wǒ yǒu bā běn shū.|Tôi có tám quyển sách.|
   不|bù|không (phủ định)|p|我 不 是 老师 。|Wǒ bú shì lǎoshī.|Tôi không phải là giáo viên.|
   吗|ma|không? (trợ từ hỏi)|u|你 是 老师 吗 ？|Nǐ shì lǎoshī ma?|Bạn là giáo viên phải không?|`,
        d: `
   A|爸爸 ， 妈妈 ！|Bàba, māma!|Bố ơi, mẹ ơi!
   B|你 好 吗 ？|Nǐ hǎo ma?|Con khỏe không?
   A|我 很 好 ！|Wǒ hěn hǎo!|Con rất khỏe!`,
      },
      {
        t: 'Thanh mẫu b p m f d t n l g k h',
        g: 'init',
        v: `
   你|nǐ|bạn, anh, chị (ngôi thứ hai)|r|你 是 学生 吗 ？|Nǐ shì xuésheng ma?|Bạn là học sinh phải không?|
   好|hǎo|tốt, khỏe, hay|a|这 个 很 好 。|Zhège hěn hǎo.|Cái này rất tốt.|👍
   他|tā|anh ấy, ông ấy|r|他 是 我 哥哥 。|Tā shì wǒ gēge.|Anh ấy là anh trai tôi.|
   她|tā|cô ấy, bà ấy|r|她 是 我 妈妈 。|Tā shì wǒ māma.|Bà ấy là mẹ tôi.|
   喝|hē|uống|v|我 喝 水 。|Wǒ hē shuǐ.|Tôi uống nước.|
   大|dà|to, lớn|a|我 家 很 大 。|Wǒ jiā hěn dà.|Nhà tôi rất to.|
   来|lái|đến, tới|v|你 来 吗 ？|Nǐ lái ma?|Bạn có đến không?|`,
        d: `
   A|你 好 ！|Nǐ hǎo!|Xin chào!
   B|你 好 ！ 他 来 吗 ？|Nǐ hǎo! Tā lái ma?|Chào bạn! Anh ấy có đến không?
   A|他 来 ， 她 不 来 。|Tā lái, tā bù lái.|Anh ấy đến, cô ấy không đến.`,
      },
      {
        t: 'Thanh mẫu j q x · zh ch sh r · z c s',
        g: 'zcs',
        v: `
   七|qī|bảy (7)|m|我 妹妹 七 岁 。|Wǒ mèimei qī suì.|Em gái tôi bảy tuổi.|
   十|shí|mười (10)|m|我 有 十 个 朋友 。|Wǒ yǒu shí ge péngyou.|Tôi có mười người bạn.|
   四|sì|bốn (4)|m|我 家 有 四 口 人 。|Wǒ jiā yǒu sì kǒu rén.|Nhà tôi có bốn người.|
   吃|chī|ăn|v|我 吃 米饭 。|Wǒ chī mǐfàn.|Tôi ăn cơm.|
   茶|chá|trà|d|我 喝 茶 。|Wǒ hē chá.|Tôi uống trà.|🍵
   水|shuǐ|nước|d|请 喝 水 。|Qǐng hē shuǐ.|Mời uống nước.|💧`,
        d: `
   A|你 吃 什么 ？|Nǐ chī shénme?|Bạn ăn gì?
   B|我 不 吃 ， 我 喝 茶 。|Wǒ bù chī, wǒ hē chá.|Tôi không ăn, tôi uống trà.
   A|我 喝 水 。|Wǒ hē shuǐ.|Tôi uống nước.`,
      },
      {
        t: 'Vận mẫu, quy tắc viết Pinyin và biến điệu',
        g: 'sandhi',
        v: `
   你好|nǐ hǎo|xin chào|x|你好 ， 我 叫 安娜 。|Nǐ hǎo, wǒ jiào Ānnà.|Xin chào, tôi tên là Anna.|👋
   谢谢|xièxie|cảm ơn|v|谢谢 你 ！|Xièxie nǐ!|Cảm ơn bạn!|🙏
   不客气|bú kèqi|không có gì (đáp lời cảm ơn)|x|不客气 ， 请 喝 茶 。|Bú kèqi, qǐng hē chá.|Không có gì, mời uống trà.|
   再见|zàijiàn|tạm biệt|v|老师 ， 再见 ！|Lǎoshī, zàijiàn!|Tạm biệt thầy/cô!|
   对不起|duìbuqǐ|xin lỗi|v|对不起 ， 我 来 晚 了 。|Duìbuqǐ, wǒ lái wǎn le.|Xin lỗi, tôi đến muộn.|
   没关系|méi guānxi|không sao|x|没关系 ， 明天 见 。|Méi guānxi, míngtiān jiàn.|Không sao, mai gặp nhé.|`,
        d: `
   A|谢谢 ！|Xièxie!|Cảm ơn!
   B|不客气 ！|Bú kèqi!|Không có gì!
   A|对不起 ！|Duìbuqǐ!|Xin lỗi!
   B|没关系 。 再见 ！|Méi guānxi. Zàijiàn!|Không sao. Tạm biệt!`,
      },
    ],
  },

  {
    w: 2,
    t: 'Chào hỏi, giới thiệu bản thân, quốc tịch',
    ls: [
      {
        t: 'Chào hỏi',
        g: 'greet',
        v: `
   您|nín|ông, bà, ngài (kính trọng)|r|您 好 ！|Nín hǎo!|Chào ông/bà!|
   早上|zǎoshang|buổi sáng|t|早上 好 ！|Zǎoshang hǎo!|Chào buổi sáng!|🌅
   老师|lǎoshī|giáo viên, thầy/cô|d|老师 好 ！|Lǎoshī hǎo!|Em chào thầy/cô!|👩‍🏫
   同学|tóngxué|bạn học|d|我们 是 同学 。|Wǒmen shì tóngxué.|Chúng tôi là bạn học.|
   我们|wǒmen|chúng tôi, chúng ta|r|我们 是 越南 人 。|Wǒmen shì Yuènán rén.|Chúng tôi là người Việt Nam.|
   你们|nǐmen|các bạn|r|你们 好 ！|Nǐmen hǎo!|Chào các bạn!|`,
        d: `
   A|老师 ， 早上 好 ！|Lǎoshī, zǎoshang hǎo!|Em chào cô buổi sáng ạ!
   B|同学们 好 ！|Tóngxuémen hǎo!|Chào các em!
   A|老师 ， 再见 ！|Lǎoshī, zàijiàn!|Em chào cô, tạm biệt ạ!
   B|再见 ！|Zàijiàn!|Tạm biệt!`,
      },
      {
        t: 'Giới thiệu bản thân',
        g: 'jiao',
        v: `
   我|wǒ|tôi|r|我 是 越南 人 。|Wǒ shì Yuènán rén.|Tôi là người Việt Nam.|🙋
   你
   叫|jiào|gọi là, tên là|v|我 叫 安娜 。|Wǒ jiào Ānnà.|Tôi tên là Anna.|
   什么|shénme|cái gì|r|你 叫 什么 名字 ？|Nǐ jiào shénme míngzi?|Bạn tên là gì?|
   名字|míngzi|tên|d|我 的 名字 是 安娜 。|Wǒ de míngzi shì Ānnà.|Tên của tôi là Anna.|
   是|shì|là|v|他 是 老师 。|Tā shì lǎoshī.|Anh ấy là giáo viên.|`,
        d: `
   A|你 叫 什么 名字 ？|Nǐ jiào shénme míngzi?|Bạn tên là gì?
   B|我 叫 安娜 。 你 叫 什么 名字 ？|Wǒ jiào Ānnà. Nǐ jiào shénme míngzi?|Tôi tên là Anna. Bạn tên là gì?
   A|我 叫 大卫 。|Wǒ jiào Dàwèi.|Tôi tên là David.`,
      },
      {
        t: 'Quốc tịch',
        g: 'shi',
        v: `
   哪|nǎ|nào|r|你 是 哪 国 人 ？|Nǐ shì nǎ guó rén?|Bạn là người nước nào?|
   国|guó|nước, quốc gia|d|中国 是 一 个 大 国 。|Zhōngguó shì yí ge dà guó.|Trung Quốc là một nước lớn.|
   人|rén|người|d|他 是 中国 人 。|Tā shì Zhōngguó rén.|Anh ấy là người Trung Quốc.|🧑
   中国|Zhōngguó|Trung Quốc|d|我 想 去 中国 。|Wǒ xiǎng qù Zhōngguó.|Tôi muốn đi Trung Quốc.|
   越南|Yuènán|Việt Nam|d|我 家 在 越南 。|Wǒ jiā zài Yuènán.|Nhà tôi ở Việt Nam.|
   他们|tāmen|họ|r|他们 是 我 的 朋友 。|Tāmen shì wǒ de péngyou.|Họ là bạn của tôi.|`,
        d: `
   A|你 是 哪 国 人 ？|Nǐ shì nǎ guó rén?|Bạn là người nước nào?
   B|我 是 越南 人 。 你 是 中国 人 吗 ？|Wǒ shì Yuènán rén. Nǐ shì Zhōngguó rén ma?|Tôi là người Việt Nam. Bạn là người Trung Quốc à?
   A|是 ， 我 是 中国 人 。|Shì, wǒ shì Zhōngguó rén.|Đúng, tôi là người Trung Quốc.`,
      },
      {
        t: 'Rất vui được làm quen',
        g: 'mane',
        v: `
   认识|rènshi|quen, quen biết|v|认识 你 很 高兴 。|Rènshi nǐ hěn gāoxìng.|Rất vui được làm quen với bạn.|🤝
   很|hěn|rất|p|我 很 好 。|Wǒ hěn hǎo.|Tôi rất khỏe.|
   高兴|gāoxìng|vui, vui mừng|a|今天 我 很 高兴 。|Jīntiān wǒ hěn gāoxìng.|Hôm nay tôi rất vui.|😊
   也|yě|cũng|p|我 也 是 学生 。|Wǒ yě shì xuésheng.|Tôi cũng là học sinh.|
   学生|xuésheng|học sinh, sinh viên|d|我 是 学生 。|Wǒ shì xuésheng.|Tôi là học sinh.|🧑‍🎓
   呢|ne|còn… thì sao? (trợ từ hỏi)|u|我 很 好 ， 你 呢 ？|Wǒ hěn hǎo, nǐ ne?|Tôi khỏe, còn bạn?|`,
        d: `
   A|认识 你 很 高兴 ！|Rènshi nǐ hěn gāoxìng!|Rất vui được làm quen với bạn!
   B|我 也 很 高兴 。 你 是 学生 吗 ？|Wǒ yě hěn gāoxìng. Nǐ shì xuésheng ma?|Tôi cũng rất vui. Bạn là học sinh à?
   A|是 ， 我 是 学生 。 你 呢 ？|Shì, wǒ shì xuésheng. Nǐ ne?|Vâng, tôi là học sinh. Còn bạn?
   B|我 是 老师 。|Wǒ shì lǎoshī.|Tôi là giáo viên.`,
      },
    ],
  },

  {
    w: 3,
    t: 'Gia đình, tên gọi, tuổi tác, nghề nghiệp',
    ls: [
      {
        t: 'Gia đình tôi',
        g: 'you',
        v: `
   家|jiā|nhà, gia đình|d|我 家 有 四 口 人 。|Wǒ jiā yǒu sì kǒu rén.|Nhà tôi có bốn người.|🏠
   有|yǒu|có|v|我 有 一 个 哥哥 。|Wǒ yǒu yí ge gēge.|Tôi có một anh trai.|
   口|kǒu|(lượng từ chỉ người trong nhà); miệng|q|你 家 有 几 口 人 ？|Nǐ jiā yǒu jǐ kǒu rén?|Nhà bạn có mấy người?|
   哥哥|gēge|anh trai|d|我 哥哥 是 医生 。|Wǒ gēge shì yīshēng.|Anh trai tôi là bác sĩ.|👦
   姐姐|jiějie|chị gái|d|我 姐姐 很 忙 。|Wǒ jiějie hěn máng.|Chị gái tôi rất bận.|👩
   和|hé|và, với|c|爸爸 和 妈妈 都 是 老师 。|Bàba hé māma dōu shì lǎoshī.|Bố và mẹ đều là giáo viên.|
   没有|méiyǒu|không có|v|我 没有 弟弟 。|Wǒ méiyǒu dìdi.|Tôi không có em trai.|`,
        d: `
   A|你 家 有 几 口 人 ？|Nǐ jiā yǒu jǐ kǒu rén?|Nhà bạn có mấy người?
   B|我 家 有 四 口 人 ： 爸爸 、 妈妈 、 姐姐 和 我 。|Wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ.|Nhà tôi có bốn người: bố, mẹ, chị gái và tôi.
   A|你 有 哥哥 吗 ？|Nǐ yǒu gēge ma?|Bạn có anh trai không?
   B|我 没有 哥哥 。|Wǒ méiyǒu gēge.|Tôi không có anh trai.`,
      },
      {
        t: 'Thành viên gia đình và đồ vật của ai',
        g: 'de',
        v: `
   弟弟|dìdi|em trai|d|我 弟弟 八 岁 。|Wǒ dìdi bā suì.|Em trai tôi tám tuổi.|
   妹妹|mèimei|em gái|d|我 有 两 个 妹妹 。|Wǒ yǒu liǎng ge mèimei.|Tôi có hai em gái.|
   的|de|của (trợ từ sở hữu)|u|这 是 我 的 书 。|Zhè shì wǒ de shū.|Đây là sách của tôi.|
   朋友|péngyou|bạn bè|d|他 是 我 的 好 朋友 。|Tā shì wǒ de hǎo péngyou.|Anh ấy là bạn tốt của tôi.|
   谁|shéi|ai|r|他 是 谁 ？|Tā shì shéi?|Anh ấy là ai?|
   这|zhè|này, đây|r|这 是 我 爸爸 。|Zhè shì wǒ bàba.|Đây là bố tôi.|
   狗|gǒu|con chó|d|这 是 我 的 狗 。|Zhè shì wǒ de gǒu.|Đây là con chó của tôi.|🐶
   猫|māo|con mèo|d|我 喜欢 猫 。|Wǒ xǐhuan māo.|Tôi thích mèo.|🐱`,
        d: `
   A|这 是 谁 ？|Zhè shì shéi?|Đây là ai?
   B|这 是 我 妹妹 。|Zhè shì wǒ mèimei.|Đây là em gái tôi.
   A|这 是 你 的 狗 吗 ？|Zhè shì nǐ de gǒu ma?|Đây là con chó của bạn à?
   B|不 是 ， 是 我 朋友 的 。|Bú shì, shì wǒ péngyou de.|Không phải, là của bạn tôi.`,
      },
      {
        t: 'Tuổi tác',
        g: 'age',
        v: `
   一|yī|một (1)|m|我 有 一 个 姐姐 。|Wǒ yǒu yí ge jiějie.|Tôi có một chị gái.|
   二|èr|hai (2)|m|我 二十 岁 。|Wǒ èrshí suì.|Tôi hai mươi tuổi.|
   三|sān|ba (3)|m|我 女儿 三 岁 。|Wǒ nǚ'ér sān suì.|Con gái tôi ba tuổi.|
   几|jǐ|mấy (hỏi số nhỏ)|r|你 几 岁 ？|Nǐ jǐ suì?|Em mấy tuổi?|
   岁|suì|tuổi|q|我 妈妈 五十 岁 。|Wǒ māma wǔshí suì.|Mẹ tôi năm mươi tuổi.|
   多大|duō dà|bao nhiêu tuổi|x|你 今年 多大 ？|Nǐ jīnnián duō dà?|Năm nay bạn bao nhiêu tuổi?|
   今年|jīnnián|năm nay|t|我 今年 二十五 岁 。|Wǒ jīnnián èrshíwǔ suì.|Năm nay tôi 25 tuổi.|
   女儿|nǚ'ér|con gái|d|我 女儿 是 学生 。|Wǒ nǚ'ér shì xuésheng.|Con gái tôi là học sinh.|👧
   儿子|érzi|con trai|d|他 儿子 三 岁 。|Tā érzi sān suì.|Con trai anh ấy ba tuổi.|👶`,
        d: `
   A|你 女儿 几 岁 ？|Nǐ nǚ'ér jǐ suì?|Con gái bạn mấy tuổi?
   B|她 三 岁 。 你 今年 多大 ？|Tā sān suì. Nǐ jīnnián duō dà?|Cháu ba tuổi. Năm nay bạn bao nhiêu tuổi?
   A|我 今年 二十八 岁 。|Wǒ jīnnián èrshíbā suì.|Năm nay tôi 28 tuổi.`,
      },
      {
        t: 'Nghề nghiệp',
        g: 'zai',
        v: `
   做|zuò|làm|v|你 做 什么 工作 ？|Nǐ zuò shénme gōngzuò?|Bạn làm nghề gì?|
   工作|gōngzuò|công việc; làm việc|d|我 的 工作 很 忙 。|Wǒ de gōngzuò hěn máng.|Công việc của tôi rất bận.|💼
   医生|yīshēng|bác sĩ|d|我 妈妈 是 医生 。|Wǒ māma shì yīshēng.|Mẹ tôi là bác sĩ.|🧑‍⚕️
   在|zài|ở, tại|g|她 在 医院 工作 。|Tā zài yīyuàn gōngzuò.|Cô ấy làm việc ở bệnh viện.|
   医院|yīyuàn|bệnh viện|d|医院 在 哪儿 ？|Yīyuàn zài nǎr?|Bệnh viện ở đâu?|🏥
   学校|xuéxiào|trường học|d|我 在 学校 学习 汉语 。|Wǒ zài xuéxiào xuéxí Hànyǔ.|Tôi học tiếng Trung ở trường.|🏫
   忙|máng|bận|a|你 忙 吗 ？|Nǐ máng ma?|Bạn có bận không?|`,
        d: `
   A|你 做 什么 工作 ？|Nǐ zuò shénme gōngzuò?|Bạn làm nghề gì?
   B|我 是 医生 ， 我 在 医院 工作 。|Wǒ shì yīshēng, wǒ zài yīyuàn gōngzuò.|Tôi là bác sĩ, tôi làm việc ở bệnh viện.
   A|你 忙 吗 ？|Nǐ máng ma?|Bạn có bận không?
   B|很 忙 。|Hěn máng.|Rất bận.`,
      },
    ],
  },

  {
    w: 4,
    t: 'Số đếm, ngày tháng, giờ giấc',
    ls: [
      {
        t: 'Số đếm',
        g: 'num',
        v: `
   五|wǔ|năm (5)|m|我 有 五 本 书 。|Wǒ yǒu wǔ běn shū.|Tôi có năm quyển sách.|
   六|liù|sáu (6)|m|我 弟弟 六 岁 。|Wǒ dìdi liù suì.|Em trai tôi sáu tuổi.|
   九|jiǔ|chín (9)|m|现在 九 点 。|Xiànzài jiǔ diǎn.|Bây giờ là chín giờ.|
   零|líng|số không (0)|m|一百 零 五 。|Yìbǎi líng wǔ.|Một trăm linh năm.|
   百|bǎi|trăm|m|这 本 书 一百 块 。|Zhè běn shū yìbǎi kuài.|Quyển sách này 100 tệ.|
   两|liǎng|hai (dùng trước lượng từ)|m|我 有 两 个 哥哥 。|Wǒ yǒu liǎng ge gēge.|Tôi có hai anh trai.|
   个|gè|cái, chiếc (lượng từ chung)|q|这 个 学生 很 好 。|Zhège xuésheng hěn hǎo.|Học sinh này rất giỏi.|
   多少|duōshao|bao nhiêu|r|你 有 多少 本 书 ？|Nǐ yǒu duōshao běn shū?|Bạn có bao nhiêu quyển sách?|
   本|běn|quyển (lượng từ cho sách)|q|我 有 三 本 书 。|Wǒ yǒu sān běn shū.|Tôi có ba quyển sách.|`,
        d: `
   A|你 有 多少 本 汉语 书 ？|Nǐ yǒu duōshao běn Hànyǔ shū?|Bạn có bao nhiêu quyển sách tiếng Trung?
   B|我 有 两 本 。 你 呢 ？|Wǒ yǒu liǎng běn. Nǐ ne?|Tôi có hai quyển. Còn bạn?
   A|我 有 五 本 。|Wǒ yǒu wǔ běn.|Tôi có năm quyển.`,
      },
      {
        t: 'Ngày tháng và thứ',
        g: 'date',
        v: `
   年|nián|năm|d|今年 是 二〇二六 年 。|Jīnnián shì èr líng èr liù nián.|Năm nay là năm 2026.|
   月|yuè|tháng|d|今天 是 十一 月 十八 号 。|Jīntiān shì shíyī yuè shíbā hào.|Hôm nay là ngày 18 tháng 11.|📅
   号|hào|ngày (trong tháng); số|d|你 的 生日 是 几 月 几 号 ？|Nǐ de shēngrì shì jǐ yuè jǐ hào?|Sinh nhật bạn là ngày mấy tháng mấy?|
   今天|jīntiān|hôm nay|t|今天 星期三 。|Jīntiān xīngqīsān.|Hôm nay là thứ Tư.|
   明天|míngtiān|ngày mai|t|明天 见 ！|Míngtiān jiàn!|Mai gặp nhé!|
   昨天|zuótiān|hôm qua|t|昨天 是 星期二 。|Zuótiān shì xīngqī'èr.|Hôm qua là thứ Ba.|
   星期|xīngqī|tuần; thứ|d|今天 星期 几 ？|Jīntiān xīngqī jǐ?|Hôm nay thứ mấy?|`,
        d: `
   A|今天 几 月 几 号 ？|Jīntiān jǐ yuè jǐ hào?|Hôm nay là ngày mấy tháng mấy?
   B|今天 十一 月 十八 号 ， 星期三 。|Jīntiān shíyī yuè shíbā hào, xīngqīsān.|Hôm nay là ngày 18 tháng 11, thứ Tư.
   A|明天 是 星期四 吗 ？|Míngtiān shì xīngqīsì ma?|Ngày mai là thứ Năm phải không?
   B|对 。|Duì.|Đúng.`,
      },
      {
        t: 'Giờ giấc',
        g: 'time',
        v: `
   点|diǎn|giờ|q|现在 几 点 ？|Xiànzài jǐ diǎn?|Bây giờ là mấy giờ?|🕗
   分|fēn|phút|q|现在 八 点 十 分 。|Xiànzài bā diǎn shí fēn.|Bây giờ là 8 giờ 10 phút.|
   半|bàn|rưỡi, một nửa|m|我 七 点 半 起床 。|Wǒ qī diǎn bàn qǐchuáng.|Tôi dậy lúc 7 giờ rưỡi.|
   现在|xiànzài|bây giờ|t|我 现在 很 忙 。|Wǒ xiànzài hěn máng.|Bây giờ tôi rất bận.|
   上午|shàngwǔ|buổi sáng (trước trưa)|t|我 上午 在 学校 。|Wǒ shàngwǔ zài xuéxiào.|Buổi sáng tôi ở trường.|
   下午|xiàwǔ|buổi chiều|t|下午 三 点 见 。|Xiàwǔ sān diǎn jiàn.|Ba giờ chiều gặp nhé.|
   时候|shíhou|lúc, khi|d|你 什么 时候 来 ？|Nǐ shénme shíhou lái?|Khi nào bạn đến?|`,
        d: `
   A|现在 几 点 ？|Xiànzài jǐ diǎn?|Bây giờ là mấy giờ?
   B|现在 八 点 十 分 。|Xiànzài bā diǎn shí fēn.|Bây giờ là 8 giờ 10 phút.
   A|你 什么 时候 上课 ？|Nǐ shénme shíhou shàngkè?|Khi nào bạn vào học?
   B|九 点 半 。|Jiǔ diǎn bàn.|9 giờ rưỡi.`,
      },
      {
        t: 'Sinh nhật và lời mời',
        g: 'ba',
        v: `
   生日|shēngrì|sinh nhật|d|今天 是 我 的 生日 。|Jīntiān shì wǒ de shēngrì.|Hôm nay là sinh nhật tôi.|🎂
   快乐|kuàilè|vui vẻ|a|生日 快乐 ！|Shēngrì kuàilè!|Chúc mừng sinh nhật!|🎉
   晚上|wǎnshang|buổi tối|t|晚上 我 看 书 。|Wǎnshang wǒ kàn shū.|Buổi tối tôi đọc sách.|🌙
   去|qù|đi|v|我 明天 去 北京 。|Wǒ míngtiān qù Běijīng.|Ngày mai tôi đi Bắc Kinh.|
   吧|ba|nhé, đi (trợ từ đề nghị)|u|我们 走 吧 ！|Wǒmen zǒu ba!|Chúng ta đi thôi!|
   想|xiǎng|muốn; nhớ; nghĩ|n|我 想 喝 茶 。|Wǒ xiǎng hē chá.|Tôi muốn uống trà.|`,
        d: `
   A|明天 是 我 的 生日 。|Míngtiān shì wǒ de shēngrì.|Ngày mai là sinh nhật tôi.
   B|生日 快乐 ！ 明天 晚上 我们 去 吃 饭 吧 ！|Shēngrì kuàilè! Míngtiān wǎnshang wǒmen qù chī fàn ba!|Chúc mừng sinh nhật! Tối mai chúng ta đi ăn nhé!
   A|好 啊 ！ 你 想 吃 什么 ？|Hǎo a! Nǐ xiǎng chī shénme?|Hay quá! Bạn muốn ăn gì?
   B|我 想 吃 中国 菜 。|Wǒ xiǎng chī Zhōngguó cài.|Tôi muốn ăn món Trung Quốc.`,
      },
    ],
  },

  {
    w: 5,
    t: 'Hoạt động hằng ngày, sở thích',
    ls: [
      {
        t: 'Một ngày của tôi',
        g: 'neg',
        v: `
   起床|qǐchuáng|thức dậy|v|我 每天 六 点 起床 。|Wǒ měi tiān liù diǎn qǐchuáng.|Mỗi ngày tôi dậy lúc 6 giờ.|⏰
   睡觉|shuìjiào|đi ngủ|v|我 晚上 十一 点 睡觉 。|Wǒ wǎnshang shíyī diǎn shuìjiào.|Tôi đi ngủ lúc 11 giờ tối.|😴
   上课|shàngkè|vào học, lên lớp|v|我们 八 点 上课 。|Wǒmen bā diǎn shàngkè.|Chúng tôi vào học lúc 8 giờ.|
   回|huí|về|v|我 下午 五 点 回 家 。|Wǒ xiàwǔ wǔ diǎn huí jiā.|Tôi về nhà lúc 5 giờ chiều.|
   每天|měi tiān|mỗi ngày|t|我 每天 学习 汉语 。|Wǒ měi tiān xuéxí Hànyǔ.|Mỗi ngày tôi đều học tiếng Trung.|
   没|méi|không, chưa (phủ định việc đã xảy ra)|p|我 今天 没 去 学校 。|Wǒ jīntiān méi qù xuéxiào.|Hôm nay tôi không đi học.|`,
        d: `
   A|你 每天 几 点 起床 ？|Nǐ měi tiān jǐ diǎn qǐchuáng?|Mỗi ngày bạn dậy lúc mấy giờ?
   B|六 点 。 今天 我 没 去 上课 ， 七 点 起床 。|Liù diǎn. Jīntiān wǒ méi qù shàngkè, qī diǎn qǐchuáng.|6 giờ. Hôm nay tôi không đi học nên 7 giờ mới dậy.
   A|你 几 点 睡觉 ？|Nǐ jǐ diǎn shuìjiào?|Bạn ngủ lúc mấy giờ?
   B|十一 点 。|Shíyī diǎn.|11 giờ.`,
      },
      {
        t: 'Sở thích',
        g: 'xihuan',
        v: `
   喜欢|xǐhuan|thích|v|我 喜欢 看 书 。|Wǒ xǐhuan kàn shū.|Tôi thích đọc sách.|❤️
   看|kàn|xem, nhìn, đọc|v|我 晚上 看 电视 。|Wǒ wǎnshang kàn diànshì.|Buổi tối tôi xem tivi.|👀
   书|shū|sách|d|这 是 我 的 汉语 书 。|Zhè shì wǒ de Hànyǔ shū.|Đây là sách tiếng Trung của tôi.|📖
   电视|diànshì|tivi|d|我 不 喜欢 看 电视 。|Wǒ bù xǐhuan kàn diànshì.|Tôi không thích xem tivi.|📺
   电影|diànyǐng|phim, điện ảnh|d|我们 去 看 电影 吧 。|Wǒmen qù kàn diànyǐng ba.|Chúng ta đi xem phim nhé.|🎬
   听|tīng|nghe|v|我 喜欢 听 中国 歌 。|Wǒ xǐhuan tīng Zhōngguó gē.|Tôi thích nghe bài hát Trung Quốc.|🎧
   打球|dǎ qiú|chơi bóng|v|周末 我 和 朋友 打球 。|Zhōumò wǒ hé péngyou dǎ qiú.|Cuối tuần tôi chơi bóng với bạn.|⚽`,
        d: `
   A|你 喜欢 做 什么 ？|Nǐ xǐhuan zuò shénme?|Bạn thích làm gì?
   B|我 喜欢 看 电影 ， 也 喜欢 听 歌 。|Wǒ xǐhuan kàn diànyǐng, yě xǐhuan tīng gē.|Tôi thích xem phim, cũng thích nghe nhạc.
   A|我 喜欢 打球 。|Wǒ xǐhuan dǎ qiú.|Tôi thích chơi bóng.`,
      },
      {
        t: 'Học tiếng Trung',
        g: 'hui',
        v: `
   学习|xuéxí|học, học tập|v|我 在 学习 汉语 。|Wǒ zài xuéxí Hànyǔ.|Tôi đang học tiếng Trung.|📚
   汉语|Hànyǔ|tiếng Hán, tiếng Trung|d|汉语 不 太 难 。|Hànyǔ bú tài nán.|Tiếng Trung không khó lắm.|
   中文|Zhōngwén|tiếng Trung, Trung văn|d|你 会 说 中文 吗 ？|Nǐ huì shuō Zhōngwén ma?|Bạn biết nói tiếng Trung không?|
   说|shuō|nói|v|他 说 汉语 。|Tā shuō Hànyǔ.|Anh ấy nói tiếng Trung.|🗣️
   写|xiě|viết|v|我 会 写 我 的 名字 。|Wǒ huì xiě wǒ de míngzi.|Tôi biết viết tên mình.|✍️
   字|zì|chữ|d|这 个 字 怎么 读 ？|Zhège zì zěnme dú?|Chữ này đọc thế nào?|
   会|huì|biết (làm gì, nhờ học)|n|我 会 说 一点儿 汉语 。|Wǒ huì shuō yìdiǎnr Hànyǔ.|Tôi biết nói một chút tiếng Trung.|`,
        d: `
   A|你 会 说 汉语 吗 ？|Nǐ huì shuō Hànyǔ ma?|Bạn biết nói tiếng Trung không?
   B|我 会 说 一点儿 。|Wǒ huì shuō yìdiǎnr.|Tôi biết nói một chút.
   A|你 会 写 汉字 吗 ？|Nǐ huì xiě Hànzì ma?|Bạn biết viết chữ Hán không?
   B|我 会 写 我 的 名字 。|Wǒ huì xiě wǒ de míngzi.|Tôi biết viết tên của mình.`,
      },
      {
        t: 'Cuối tuần',
        g: 'yiqi',
        v: `
   周末|zhōumò|cuối tuần|t|周末 你 想 做 什么 ？|Zhōumò nǐ xiǎng zuò shénme?|Cuối tuần bạn muốn làm gì?|
   一起|yìqǐ|cùng nhau|p|我们 一起 去 吧 。|Wǒmen yìqǐ qù ba.|Chúng ta cùng đi nhé.|
   玩儿|wánr|chơi|v|周末 我 去 朋友 家 玩儿 。|Zhōumò wǒ qù péngyou jiā wánr.|Cuối tuần tôi đến nhà bạn chơi.|🎮
   能|néng|có thể (có khả năng, điều kiện)|n|明天 你 能 来 吗 ？|Míngtiān nǐ néng lái ma?|Mai bạn đến được không?|
   时间|shíjiān|thời gian|d|你 今天 有 时间 吗 ？|Nǐ jīntiān yǒu shíjiān ma?|Hôm nay bạn có thời gian không?|⏳
   都|dōu|đều|p|我们 都 是 学生 。|Wǒmen dōu shì xuésheng.|Chúng tôi đều là học sinh.|`,
        d: `
   A|周末 你 有 时间 吗 ？|Zhōumò nǐ yǒu shíjiān ma?|Cuối tuần bạn có thời gian không?
   B|有 。 你 想 做 什么 ？|Yǒu. Nǐ xiǎng zuò shénme?|Có. Bạn muốn làm gì?
   A|我们 一起 去 看 电影 吧 。|Wǒmen yìqǐ qù kàn diànyǐng ba.|Chúng ta cùng đi xem phim nhé.
   B|好 ！ 我们 都 喜欢 看 电影 。|Hǎo! Wǒmen dōu xǐhuan kàn diànyǐng.|Được! Chúng ta đều thích xem phim.`,
      },
    ],
  },

  {
    w: 6,
    t: 'Ăn uống, gọi món',
    ls: [
      {
        t: 'Đồ ăn',
        g: 'adj',
        v: `
   米饭|mǐfàn|cơm|d|我 每天 吃 米饭 。|Wǒ měi tiān chī mǐfàn.|Ngày nào tôi cũng ăn cơm.|🍚
   面条|miàntiáo|mì sợi|d|我 想 吃 面条 。|Wǒ xiǎng chī miàntiáo.|Tôi muốn ăn mì.|🍜
   包子|bāozi|bánh bao|d|这 个 包子 很 好吃 。|Zhège bāozi hěn hǎochī.|Cái bánh bao này rất ngon.|
   饺子|jiǎozi|sủi cảo|d|我 喜欢 吃 饺子 。|Wǒ xǐhuan chī jiǎozi.|Tôi thích ăn sủi cảo.|🥟
   菜|cài|món ăn; rau|d|中国 菜 很 好吃 。|Zhōngguó cài hěn hǎochī.|Món Trung Quốc rất ngon.|🥬
   好吃|hǎochī|ngon|a|妈妈 做 的 菜 很 好吃 。|Māma zuò de cài hěn hǎochī.|Món mẹ nấu rất ngon.|😋
   饭|fàn|cơm, bữa ăn|d|我们 去 吃 饭 吧 。|Wǒmen qù chī fàn ba.|Chúng ta đi ăn cơm nhé.|`,
        d: `
   A|你 想 吃 什么 ？|Nǐ xiǎng chī shénme?|Bạn muốn ăn gì?
   B|我 想 吃 饺子 。|Wǒ xiǎng chī jiǎozi.|Tôi muốn ăn sủi cảo.
   A|这儿 的 饺子 很 好吃 。|Zhèr de jiǎozi hěn hǎochī.|Sủi cảo ở đây rất ngon.`,
      },
      {
        t: 'Thức uống',
        g: 'mw',
        v: `
   咖啡|kāfēi|cà phê|d|我 早上 喝 咖啡 。|Wǒ zǎoshang hē kāfēi.|Buổi sáng tôi uống cà phê.|☕
   牛奶|niúnǎi|sữa bò|d|我 喝 牛奶 。|Wǒ hē niúnǎi.|Tôi uống sữa.|🥛
   杯|bēi|cốc, ly (lượng từ)|q|我 要 一 杯 茶 。|Wǒ yào yì bēi chá.|Tôi muốn một cốc trà.|
   杯子|bēizi|cái cốc|d|这 是 我 的 杯子 。|Zhè shì wǒ de bēizi.|Đây là cốc của tôi.|🥤
   热|rè|nóng|a|我 想 喝 热 茶 。|Wǒ xiǎng hē rè chá.|Tôi muốn uống trà nóng.|🔥
   冷|lěng|lạnh|a|今天 很 冷 。|Jīntiān hěn lěng.|Hôm nay rất lạnh.|🥶`,
        d: `
   A|你 喝 咖啡 吗 ？|Nǐ hē kāfēi ma?|Bạn uống cà phê không?
   B|不 喝 ， 我 喝 茶 。|Bù hē, wǒ hē chá.|Không, tôi uống trà.
   A|热 茶 还是 冷 茶 ？|Rè chá háishi lěng chá?|Trà nóng hay trà lạnh?
   B|热 茶 ， 一 杯 。|Rè chá, yì bēi.|Trà nóng, một cốc.`,
      },
      {
        t: 'Gọi món',
        g: 'yao',
        v: `
   要|yào|muốn, cần (gọi món)|n|我 要 一 碗 米饭 。|Wǒ yào yì wǎn mǐfàn.|Tôi muốn một bát cơm.|
   饭店|fàndiàn|nhà hàng; khách sạn|d|这 个 饭店 的 菜 很 好吃 。|Zhège fàndiàn de cài hěn hǎochī.|Món ăn ở nhà hàng này rất ngon.|🍽️
   服务员|fúwùyuán|nhân viên phục vụ|d|服务员 ， 我 要 一 杯 茶 。|Fúwùyuán, wǒ yào yì bēi chá.|Phục vụ ơi, cho tôi một cốc trà.|
   请|qǐng|mời; xin, vui lòng|v|请 坐 ！|Qǐng zuò!|Mời ngồi!|
   碗|wǎn|bát (lượng từ)|q|我 要 两 碗 面条 。|Wǒ yào liǎng wǎn miàntiáo.|Tôi muốn hai bát mì.|🥣
   菜单|càidān|thực đơn|d|请 给 我 菜单 。|Qǐng gěi wǒ càidān.|Vui lòng cho tôi thực đơn.|📋`,
        d: `
   A|服务员 ， 请 给 我们 菜单 。|Fúwùyuán, qǐng gěi wǒmen càidān.|Phục vụ ơi, cho chúng tôi thực đơn.
   B|好 的 。 你们 要 什么 ？|Hǎo de. Nǐmen yào shénme?|Vâng. Các anh chị dùng gì ạ?
   A|我们 要 两 碗 面条 和 一 杯 茶 。|Wǒmen yào liǎng wǎn miàntiáo hé yì bēi chá.|Chúng tôi lấy hai bát mì và một cốc trà.`,
      },
      {
        t: 'Bữa ăn hằng ngày',
        g: 'le',
        v: `
   早饭|zǎofàn|bữa sáng|d|你 吃 早饭 了 吗 ？|Nǐ chī zǎofàn le ma?|Bạn ăn sáng chưa?|🍳
   午饭|wǔfàn|bữa trưa|d|我们 十二 点 吃 午饭 。|Wǒmen shí'èr diǎn chī wǔfàn.|Chúng tôi ăn trưa lúc 12 giờ.|
   晚饭|wǎnfàn|bữa tối|d|晚饭 我 吃 了 饺子 。|Wǎnfàn wǒ chī le jiǎozi.|Bữa tối tôi đã ăn sủi cảo.|
   饿|è|đói|a|我 饿 了 。|Wǒ è le.|Tôi đói rồi.|😫
   了|le|rồi, đã (trợ từ)|u|我 吃 了 两 个 包子 。|Wǒ chī le liǎng ge bāozi.|Tôi đã ăn hai cái bánh bao.|
   水果|shuǐguǒ|hoa quả|d|我 每天 吃 水果 。|Wǒ měi tiān chī shuǐguǒ.|Ngày nào tôi cũng ăn hoa quả.|🍇
   苹果|píngguǒ|quả táo|d|这 个 苹果 很 大 。|Zhège píngguǒ hěn dà.|Quả táo này rất to.|🍎`,
        d: `
   A|你 吃 早饭 了 吗 ？|Nǐ chī zǎofàn le ma?|Bạn ăn sáng chưa?
   B|还 没 吃 ， 我 很 饿 。|Hái méi chī, wǒ hěn è.|Chưa ăn, tôi đói lắm.
   A|我 有 苹果 ， 你 吃 吧 。|Wǒ yǒu píngguǒ, nǐ chī ba.|Tôi có táo, bạn ăn đi.`,
      },
    ],
  },

  {
    w: 7,
    t: 'Mua sắm, giá cả, số lượng',
    ls: [
      {
        t: 'Đi mua sắm',
        g: 'price',
        v: `
   买|mǎi|mua|v|我 想 买 一 件 衣服 。|Wǒ xiǎng mǎi yí jiàn yīfu.|Tôi muốn mua một bộ quần áo.|🛒
   东西|dōngxi|đồ, đồ vật|d|你 去 商店 买 什么 东西 ？|Nǐ qù shāngdiàn mǎi shénme dōngxi?|Bạn đi cửa hàng mua gì?|
   商店|shāngdiàn|cửa hàng|d|商店 在 学校 前面 。|Shāngdiàn zài xuéxiào qiánmian.|Cửa hàng ở phía trước trường học.|🏪
   衣服|yīfu|quần áo|d|这 件 衣服 很 好看 。|Zhè jiàn yīfu hěn hǎokàn.|Bộ quần áo này rất đẹp.|👕
   钱|qián|tiền|d|这 个 多少 钱 ？|Zhège duōshao qián?|Cái này bao nhiêu tiền?|💰
   块|kuài|đồng, tệ (đơn vị tiền khẩu ngữ)|q|十 块 钱 。|Shí kuài qián.|Mười tệ.|
   好看|hǎokàn|đẹp, dễ nhìn|a|你 的 手机 很 好看 。|Nǐ de shǒujī hěn hǎokàn.|Điện thoại của bạn rất đẹp.|`,
        d: `
   A|你 好 ， 这 件 衣服 多少 钱 ？|Nǐ hǎo, zhè jiàn yīfu duōshao qián?|Chào chị, bộ quần áo này bao nhiêu tiền?
   B|一百二十 块 。|Yìbǎi èrshí kuài.|120 tệ.
   A|很 好看 。 我 买 一 件 。|Hěn hǎokàn. Wǒ mǎi yí jiàn.|Đẹp quá. Tôi mua một bộ.`,
      },
      {
        t: 'Giá cả và mặc cả',
        g: 'tai',
        v: `
   贵|guì|đắt|a|这 件 衣服 太 贵 了 ！|Zhè jiàn yīfu tài guì le!|Bộ quần áo này đắt quá!|💸
   便宜|piányi|rẻ|a|这 个 苹果 很 便宜 。|Zhège píngguǒ hěn piányi.|Quả táo này rất rẻ.|
   太|tài|quá, lắm|p|今天 太 热 了 。|Jīntiān tài rè le.|Hôm nay nóng quá.|
   卖|mài|bán|v|这儿 卖 水果 吗 ？|Zhèr mài shuǐguǒ ma?|Ở đây có bán hoa quả không?|
   一点儿|yìdiǎnr|một chút|x|便宜 一点儿 吧 ！|Piányi yìdiǎnr ba!|Rẻ một chút đi!|
   可以|kěyǐ|có thể, được (phép)|n|我 可以 看看 吗 ？|Wǒ kěyǐ kànkan ma?|Tôi xem thử được không?|`,
        d: `
   A|太 贵 了 ！ 便宜 一点儿 吧 。|Tài guì le! Piányi yìdiǎnr ba.|Đắt quá! Rẻ một chút đi.
   B|一百 块 ， 可以 吗 ？|Yìbǎi kuài, kěyǐ ma?|100 tệ, được không?
   A|可以 。|Kěyǐ.|Được.`,
      },
      {
        t: 'Màu sắc và kích cỡ',
        g: 'zhena',
        v: `
   那|nà|kia, đó|r|那 是 我 的 书 。|Nà shì wǒ de shū.|Kia là sách của tôi.|
   件|jiàn|chiếc, bộ (lượng từ cho quần áo)|q|我 买 了 两 件 衣服 。|Wǒ mǎi le liǎng jiàn yīfu.|Tôi đã mua hai bộ quần áo.|
   小|xiǎo|nhỏ, bé|a|这 件 衣服 太 小 了 。|Zhè jiàn yīfu tài xiǎo le.|Bộ quần áo này nhỏ quá.|
   新|xīn|mới|a|这 是 我 的 新 手机 。|Zhè shì wǒ de xīn shǒujī.|Đây là điện thoại mới của tôi.|✨
   红色|hóngsè|màu đỏ|d|我 喜欢 红色 。|Wǒ xǐhuan hóngsè.|Tôi thích màu đỏ.|🔴
   白色|báisè|màu trắng|d|那 件 白色 的 衣服 很 好看 。|Nà jiàn báisè de yīfu hěn hǎokàn.|Bộ quần áo màu trắng kia rất đẹp.|⚪
   手机|shǒujī|điện thoại di động|d|我 的 手机 在 哪儿 ？|Wǒ de shǒujī zài nǎr?|Điện thoại của tôi đâu rồi?|📱`,
        d: `
   A|这 件 太 小 了 ， 有 大 的 吗 ？|Zhè jiàn tài xiǎo le, yǒu dà de ma?|Bộ này nhỏ quá, có cỡ lớn không?
   B|有 。 你 要 红色 的 还是 白色 的 ？|Yǒu. Nǐ yào hóngsè de háishi báisè de?|Có. Bạn lấy màu đỏ hay màu trắng?
   A|我 要 白色 的 。|Wǒ yào báisè de.|Tôi lấy màu trắng.`,
      },
      {
        t: 'Thanh toán',
        g: 'gei',
        v: `
   给|gěi|cho, đưa; cho (ai)|g|请 给 我 一 杯 水 。|Qǐng gěi wǒ yì bēi shuǐ.|Làm ơn cho tôi một cốc nước.|
   找|zhǎo|tìm; trả lại (tiền thừa)|v|我 找 你 五 块 。|Wǒ zhǎo nǐ wǔ kuài.|Tôi trả lại bạn năm tệ.|
   还|hái|còn, vẫn|p|你 还 要 别的 吗 ？|Nǐ hái yào biéde ma?|Bạn còn cần gì khác không?|
   别的|biéde|cái khác|r|我 不 要 别的 。|Wǒ bú yào biéde.|Tôi không cần gì khác.|
   多|duō|nhiều|a|商店 里 人 很 多 。|Shāngdiàn li rén hěn duō.|Trong cửa hàng rất đông người.|
   少|shǎo|ít|a|我 的 钱 很 少 。|Wǒ de qián hěn shǎo.|Tôi có rất ít tiền.|`,
        d: `
   A|一共 多少 钱 ？|Yígòng duōshao qián?|Tổng cộng bao nhiêu tiền?
   B|九十五 块 。 你 还 要 别的 吗 ？|Jiǔshíwǔ kuài. Nǐ hái yào biéde ma?|95 tệ. Bạn còn cần gì nữa không?
   A|不 要 了 。 给 你 一百 块 。|Bú yào le. Gěi nǐ yìbǎi kuài.|Không cần nữa. Gửi bạn 100 tệ.
   B|找 你 五 块 。|Zhǎo nǐ wǔ kuài.|Trả lại bạn 5 tệ.`,
      },
    ],
  },

  {
    w: 8,
    t: 'Địa điểm, phương hướng, đi lại',
    ls: [
      {
        t: 'Ở đâu?',
        g: 'where',
        v: `
   哪儿|nǎr|ở đâu|r|你 家 在 哪儿 ？|Nǐ jiā zài nǎr?|Nhà bạn ở đâu?|
   这儿|zhèr|ở đây|r|我 在 这儿 。|Wǒ zài zhèr.|Tôi ở đây.|
   那儿|nàr|ở đó, đằng kia|r|书 在 那儿 。|Shū zài nàr.|Sách ở đằng kia.|
   前面|qiánmian|phía trước|d|医院 在 学校 前面 。|Yīyuàn zài xuéxiào qiánmian.|Bệnh viện ở phía trước trường học.|
   后面|hòumian|phía sau|d|商店 在 饭店 后面 。|Shāngdiàn zài fàndiàn hòumian.|Cửa hàng ở phía sau nhà hàng.|
   里|lǐ|trong|d|杯子 里 有 茶 。|Bēizi li yǒu chá.|Trong cốc có trà.|
   桌子|zhuōzi|cái bàn|d|这 是 我 的 新 桌子 。|Zhè shì wǒ de xīn zhuōzi.|Đây là cái bàn mới của tôi.|`,
        d: `
   A|请问 ， 医院 在 哪儿 ？|Qǐngwèn, yīyuàn zài nǎr?|Xin hỏi, bệnh viện ở đâu?
   B|在 学校 后面 。|Zài xuéxiào hòumian.|Ở phía sau trường học.
   A|谢谢 ！|Xièxie!|Cảm ơn!`,
      },
      {
        t: 'Phương hướng',
        g: 'fang',
        v: `
   左边|zuǒbian|bên trái|d|商店 在 左边 。|Shāngdiàn zài zuǒbian.|Cửa hàng ở bên trái.|⬅️
   右边|yòubian|bên phải|d|学校 在 医院 右边 。|Xuéxiào zài yīyuàn yòubian.|Trường học ở bên phải bệnh viện.|➡️
   上面|shàngmian|phía trên|d|书 在 桌子 上面 。|Shū zài zhuōzi shàngmian.|Sách ở trên bàn.|⬆️
   下面|xiàmian|phía dưới|d|狗 在 桌子 下面 。|Gǒu zài zhuōzi xiàmian.|Con chó ở dưới gầm bàn.|⬇️
   旁边|pángbiān|bên cạnh|d|我 家 在 学校 旁边 。|Wǒ jiā zài xuéxiào pángbiān.|Nhà tôi ở bên cạnh trường.|
   北京|Běijīng|Bắc Kinh|d|北京 很 大 。|Běijīng hěn dà.|Bắc Kinh rất lớn.|`,
        d: `
   A|商店 在 哪儿 ？|Shāngdiàn zài nǎr?|Cửa hàng ở đâu?
   B|在 饭店 旁边 ， 饭店 的 左边 。|Zài fàndiàn pángbiān, fàndiàn de zuǒbian.|Ở cạnh nhà hàng, bên trái nhà hàng.
   A|我 的 手机 呢 ？|Wǒ de shǒujī ne?|Điện thoại của tôi đâu?
   B|在 桌子 上面 。|Zài zhuōzi shàngmian.|Ở trên bàn.`,
      },
      {
        t: 'Đi lại',
        g: 'zenme',
        v: `
   坐|zuò|ngồi; đi (xe, tàu, máy bay)|v|我 坐 出租车 去 机场 。|Wǒ zuò chūzūchē qù jīchǎng.|Tôi đi taxi ra sân bay.|
   车|chē|xe|d|你 的 车 是 新 的 吗 ？|Nǐ de chē shì xīn de ma?|Xe của bạn là xe mới à?|🚗
   出租车|chūzūchē|xe taxi|d|我们 坐 出租车 吧 。|Wǒmen zuò chūzūchē ba.|Chúng ta đi taxi nhé.|🚕
   飞机|fēijī|máy bay|d|我 坐 飞机 去 北京 。|Wǒ zuò fēijī qù Běijīng.|Tôi đi máy bay đến Bắc Kinh.|✈️
   火车站|huǒchēzhàn|ga tàu hỏa|d|火车站 在 哪儿 ？|Huǒchēzhàn zài nǎr?|Ga tàu ở đâu?|🚉
   怎么|zěnme|thế nào, bằng cách nào|r|去 火车站 怎么 走 ？|Qù huǒchēzhàn zěnme zǒu?|Đi đến ga tàu như thế nào?|
   机场|jīchǎng|sân bay|d|我 明天 去 机场 。|Wǒ míngtiān qù jīchǎng.|Ngày mai tôi ra sân bay.|🛫`,
        d: `
   A|你 怎么 去 机场 ？|Nǐ zěnme qù jīchǎng?|Bạn đi sân bay bằng gì?
   B|我 坐 出租车 去 。|Wǒ zuò chūzūchē qù.|Tôi đi taxi.
   A|我们 一起 去 吧 。|Wǒmen yìqǐ qù ba.|Chúng ta đi cùng nhé.`,
      },
      {
        t: 'Hỏi đường',
        g: 'li',
        v: `
   路|lù|đường|d|你 认识 路 吗 ？|Nǐ rènshi lù ma?|Bạn có biết đường không?|🛣️
   远|yuǎn|xa|a|学校 离 我 家 不 远 。|Xuéxiào lí wǒ jiā bù yuǎn.|Trường học cách nhà tôi không xa.|
   近|jìn|gần|a|商店 很 近 。|Shāngdiàn hěn jìn.|Cửa hàng rất gần.|
   走路|zǒulù|đi bộ|v|我 每天 走路 去 学校 。|Wǒ měi tiān zǒulù qù xuéxiào.|Mỗi ngày tôi đi bộ đến trường.|🚶
   到|dào|đến, tới|v|我 到 了 ！|Wǒ dào le!|Tôi đến rồi!|
   离|lí|cách (khoảng cách)|g|我 家 离 学校 很 近 。|Wǒ jiā lí xuéxiào hěn jìn.|Nhà tôi cách trường rất gần.|
   开车|kāichē|lái xe|v|我 爸爸 开车 去 工作 。|Wǒ bàba kāichē qù gōngzuò.|Bố tôi lái xe đi làm.|`,
        d: `
   A|火车站 离 这儿 远 吗 ？|Huǒchēzhàn lí zhèr yuǎn ma?|Ga tàu có xa đây không?
   B|不 远 ， 很 近 。 走路 十 分钟 。|Bù yuǎn, hěn jìn. Zǒulù shí fēnzhōng.|Không xa, rất gần. Đi bộ 10 phút.
   A|怎么 走 ？|Zěnme zǒu?|Đi thế nào?
   B|一直 走 ， 到 了 路口 往 右 。|Yìzhí zǒu, dào le lùkǒu wǎng yòu.|Đi thẳng, đến ngã tư thì rẽ phải.`,
      },
    ],
  },
];

/* Tuần 9–10: buổi tổng hợp, ôn tập và kiểm tra cuối cấp (sinh tự động từ dữ liệu tuần 1–8) */
const HSK1_W9 = [
  { t: 'Tổng hợp từ vựng tuần 1–4', type: 'synth', wk: [1, 4], f: 'vocab' },
  { t: 'Tổng hợp từ vựng tuần 5–8', type: 'synth', wk: [5, 8], f: 'vocab' },
  { t: 'Tổng hợp ngữ pháp HSK 1', type: 'synth', wk: [1, 8], f: 'grammar' },
  { t: 'Luyện hội thoại tổng hợp', type: 'synth', wk: [2, 8], f: 'dialog' },
  { t: 'Kiểm tra tổng hợp tuần 9', type: 'review', wk: [1, 8] },
];
const HSK1_W10 = [
  { t: 'Ôn phát âm và thanh điệu', type: 'synth', wk: [1, 8], f: 'pron' },
  { t: 'Ôn toàn bộ từ vựng', type: 'synth', wk: [1, 8], f: 'vocab' },
  { t: 'Ôn ngữ pháp và đọc hiểu', type: 'synth', wk: [1, 8], f: 'read' },
  { t: 'Ôn nghe và hội thoại', type: 'synth', wk: [1, 8], f: 'listen' },
  { t: 'Kiểm tra cuối cấp HSK 1', type: 'final', wk: [1, 8] },
];

/* ===================== NGỮ PHÁP & QUY TẮC PHÁT ÂM HSK 1 =====================
      t: tên · f: công thức · e: giải thích · x: ví dụ · u: cách dùng · mt: lỗi người Việt hay mắc
      m: "câu sai|câu đúng|ghi chú" (dùng cho bài Tìm lỗi / Sửa câu) · q: câu hỏi luyện · pt: có dạng điền trợ từ/lượng từ */
const GR = {
  tone: {
    t: 'Bốn thanh điệu và thanh nhẹ',
    f: 'Thanh 1 ā (55) · Thanh 2 á (35) · Thanh 3 ǎ (214) · Thanh 4 à (51) · Thanh nhẹ a',
    e: 'Mỗi âm tiết có một thanh điệu; đổi thanh là đổi nghĩa: 妈 mā (mẹ) – 麻 má (cây gai) – 马 mǎ (ngựa) – 骂 mà (mắng). Thanh nhẹ đọc ngắn, nhẹ và không đánh dấu.',
    x: [
      '妈妈 骂 马 吗 ？|Māma mà mǎ ma?|Mẹ mắng con ngựa à?',
      '爸爸 好 ！|Bàba hǎo!|Chào bố!',
    ],
    u: 'Học mọi từ kèm thanh điệu; khi nghe, chú ý giọng đi lên, đi xuống hay giữ ngang.',
    mt: 'Đọc thanh 4 thành thanh huyền (thấp, kéo dài) — thanh 4 phải rơi nhanh từ cao xuống thấp. Đọc thanh 1 chưa đủ cao. Đọc thanh 3 thành thanh hỏi quá ngắn.',
    q: [
      '马 (con ngựa) mang thanh mấy?|Thanh 3|Thanh 1|Thanh 2|Thanh 4|马 = mǎ; dấu ˇ là thanh 3.',
      'Âm tiết nào đọc thanh nhẹ?|ma thứ hai trong 妈妈|mā đầu tiên trong 妈妈|bà đầu tiên trong 爸爸|mǎ (马)|Âm tiết thứ hai của từ láy như 妈妈, 爸爸 đọc nhẹ.',
    ],
  },
  init: {
    t: 'Thanh mẫu b p m f d t n l g k h · âm bật hơi',
    f: 'Không bật hơi: b d g — Bật hơi: p t k',
    e: "b/p, d/t, g/k khác nhau ở luồng hơi: p, t, k phải bật mạnh hơi ra. 'b' tiếng Trung không rung dây thanh như 'b' tiếng Việt, nghe gần 'p' nhẹ. 'h' xát mạnh ở cuống lưỡi.",
    x: ['你 好 ！|Nǐ hǎo!|Xin chào!', '他 来 。|Tā lái.|Anh ấy đến.'],
    u: 'Đặt một tờ giấy trước miệng: khi đọc p, t, k tờ giấy phải rung.',
    mt: "Đọc 'b' như 'b' tiếng Việt; đọc p/t/k thiếu hơi; nhầm 'n' và 'l'; đọc 'h' quá nhẹ.",
    q: [
      'Âm nào là âm bật hơi?|p|b|d|g|p, t, k là các âm bật hơi.',
      '他 (anh ấy) đọc là?|tā|dā|tà|dà|他 = tā, thanh 1, phụ âm t bật hơi.',
    ],
  },
  zcs: {
    t: 'Nhóm j q x · zh ch sh r · z c s',
    f: 'Uốn lưỡi: zh ch sh r — Đầu lưỡi thẳng: z c s — Mặt lưỡi: j q x',
    e: 'zh/ch/sh/r: cong đầu lưỡi lên chạm ngạc cứng. z/c/s: đầu lưỡi thẳng, đặt sau răng cửa trên. j/q/x: mặt lưỡi áp vào ngạc, môi dẹt, chỉ đi với i và ü. ch, c, q là âm bật hơi.',
    x: [
      '四 是 四 ， 十 是 十 。|Sì shì sì, shí shì shí.|Bốn là bốn, mười là mười.',
      '我 喝 茶 。|Wǒ hē chá.|Tôi uống trà.',
    ],
    u: 'Luyện theo cặp: zhī–zī–jī, chī–cī–qī, shī–sī–xī.',
    mt: "Đọc 'x' như 'x' tiếng Việt (phải dùng mặt lưỡi, môi dẹt); đọc zh/ch như 'tr/ch' tiếng Việt nhưng chưa đủ uốn lưỡi; đọc 'q' như 'k'; đọc 'r' rung lưỡi.",
    q: [
      '七 (số 7) đọc là?|qī|chī|cī|jī|七 = qī; q là âm mặt lưỡi bật hơi.',
      'Âm tiết nào có thanh mẫu uốn lưỡi?|shí|sì|xī|cí|sh là âm uốn lưỡi; s, x, c không uốn lưỡi.',
    ],
  },
  sandhi: {
    t: 'Quy tắc viết Pinyin và biến điệu',
    f: '3 + 3 → 2 + 3 · 不 + thanh 4 → bú · 一 + thanh 4 → yí · 一 + thanh 1/2/3 → yì',
    e: "Hai thanh 3 liền nhau: thanh 3 đầu đọc thành thanh 2 (你好 viết nǐ hǎo, đọc 'ní hǎo'). 不 đọc bú trước thanh 4 (不是 bú shì). 一 đọc yí trước thanh 4 (一个 yí ge), yì trước thanh 1, 2, 3 (一天 yì tiān). Dấu thanh đặt trên a, e; có 'ou' thì đặt trên o; còn lại đặt trên nguyên âm sau (liù, duì). ü sau j, q, x, y viết thành u (qù, xué).",
    x: ['你好 ！|Nǐ hǎo!|Xin chào!', '不客气 。|Bú kèqi.|Không có gì.'],
    u: 'Từ điển ghi thanh gốc; khi nói phải áp dụng biến điệu. Giáo trình thường ghi luôn biến điệu của 不 và 一.',
    mt: 'Đọc 你好 đủ hai thanh 3 (nghe gượng); đọc 不是 thành bù shì; quên quy tắc ü viết thành u sau j, q, x.',
    q: [
      '你好 thực tế đọc là?|ní hǎo|nǐ hǎo|nì hǎo|ní hào|Hai thanh 3 liền nhau: thanh 3 đầu đọc thành thanh 2.',
      '不 trong 不是 đọc là?|bú|bù|bǔ|bū|不 trước thanh 4 đọc thành thanh 2.',
      '一 trong 一天 đọc là?|yì|yí|yī|yǐ|一 trước thanh 1, 2, 3 đọc thành thanh 4.',
    ],
  },
  greet: {
    t: 'Chào hỏi với 好 và hậu tố 们',
    f: 'Người / thời điểm + 好！ · Đại từ / danh từ chỉ người + 们',
    e: 'Ghép 好 sau người hoặc thời điểm để chào: 你好, 您好 (kính trọng), 老师好, 早上好. 们 đặt sau đại từ hoặc danh từ chỉ người để chỉ số nhiều: 我们, 你们, 同学们.',
    x: [
      '老师 好 ！|Lǎoshī hǎo!|Em chào thầy/cô!',
      '你们 好 ！|Nǐmen hǎo!|Chào các bạn!',
      '早上 好 ！|Zǎoshang hǎo!|Chào buổi sáng!',
    ],
    u: 'Dùng 您 với người lớn tuổi, cấp trên, khách hàng.',
    mt: 'Thêm 们 sau danh từ chỉ vật (书们 ✗). Thêm 们 khi đã có số lượng (三个同学们 ✗).',
    m: '三 个 同学们 来 了 。|三 个 同学 来 了 。|Đã có số lượng thì không thêm 们.',
    q: [
      'Chào thầy giáo một cách lễ phép:|老师好！|好老师！|老师是好！|你好老师们！|Cấu trúc: người + 好.',
      'Số nhiều của 我 là?|我们|我的|我们们|们我|们 đứng sau đại từ: 我们.',
    ],
  },
  jiao: {
    t: 'Giới thiệu tên với 叫',
    f: 'Chủ ngữ + 叫 + tên · 你叫什么名字？',
    e: "叫 nghĩa là 'tên là, gọi là'. Hỏi tên: 你叫什么名字？ Trả lời: 我叫 + tên. Cũng có thể nói 我的名字是 + tên (trang trọng hơn).",
    x: [
      '我 叫 安娜 。|Wǒ jiào Ānnà.|Tôi tên là Anna.',
      '你 叫 什么 名字 ？|Nǐ jiào shénme míngzi?|Bạn tên là gì?',
      '他 叫 大卫 。|Tā jiào Dàwèi.|Anh ấy tên là David.',
    ],
    u: 'Dùng khi làm quen, tự giới thiệu.',
    mt: "Dịch từng chữ 'tôi là tên Anna' → 我是叫安娜 ✗. Đưa từ để hỏi lên đầu câu như tiếng Anh (什么你叫名字 ✗) — tiếng Trung giữ nguyên trật tự câu trần thuật.",
    m: '我 是 叫 安娜 。|我 叫 安娜 。|Không dùng 是 trước 叫.',
    q: [
      '我___安娜。|叫|是叫|名字|什么|叫 + tên.',
      "Hỏi 'Bạn tên là gì?'|你叫什么名字？|什么你叫名字？|你叫名字什么？|你是叫什么？|Từ để hỏi 什么 đứng ở vị trí của thông tin cần hỏi.",
    ],
  },
  shi: {
    t: 'Câu chữ 是 · hỏi quốc tịch',
    f: 'A + 是 + B · A + 不是 + B · 你是哪国人？',
    e: "是 nối hai danh từ ('là'). Phủ định dùng 不是 (đọc bú shì). Hỏi quốc tịch: 你是哪国人？ → 我是越南人。",
    x: [
      '我 是 越南 人 。|Wǒ shì Yuènán rén.|Tôi là người Việt Nam.',
      '他 不 是 老师 。|Tā bú shì lǎoshī.|Anh ấy không phải giáo viên.',
      '你 是 哪 国 人 ？|Nǐ shì nǎ guó rén?|Bạn là người nước nào?',
    ],
    u: 'Giới thiệu nghề nghiệp, quốc tịch, danh tính. Không dùng 是 trước tính từ.',
    mt: 'Dùng 是 trước tính từ: 我是很高兴 ✗. Đặt 不 sau 是: 他是不老师 ✗.',
    m: '他 是 不 老师 。|他 不 是 老师 。|不 đứng trước 是.',
    q: [
      'Tôi không phải người Trung Quốc:|我不是中国人。|我是不中国人。|我没是中国人。|不我是中国人。|Phủ định của 是 là 不是.',
      '你是___国人？|哪|什么|那|谁|Hỏi quốc tịch dùng 哪国人.',
    ],
  },
  mane: {
    t: 'Câu hỏi với 吗 và 呢 · vị trí của 也, 很',
    f: 'Câu trần thuật + 吗？ · (Danh từ/đại từ) + 呢？',
    e: "Thêm 吗 cuối câu trần thuật để tạo câu hỏi có/không. 呢 dùng hỏi lại 'còn … thì sao?' khi chủ đề đã rõ: 我很好，你呢？ 也 (cũng), 很 (rất) đứng trước động từ/tính từ.",
    x: [
      '你 是 学生 吗 ？|Nǐ shì xuésheng ma?|Bạn là học sinh phải không?',
      '我 是 越南 人 ， 你 呢 ？|Wǒ shì Yuènán rén, nǐ ne?|Tôi là người Việt Nam, còn bạn?',
      '我 也 很 高兴 。|Wǒ yě hěn gāoxìng.|Tôi cũng rất vui.',
    ],
    u: '吗 cho câu hỏi có/không; câu đã có từ để hỏi (什么, 哪, 几…) thì không thêm 吗.',
    mt: 'Thêm 吗 vào câu đã có từ để hỏi: 你叫什么名字吗 ✗. Đặt 也 trước chủ ngữ: 也我是学生 ✗.',
    m: '你 叫 什么 名字 吗 ？|你 叫 什么 名字 ？|Câu đã có 什么 thì không dùng 吗.',
    pt: 1,
    q: [
      '你好___？(Bạn khỏe không?)|吗|呢|的|吧|Câu hỏi có/không dùng 吗.',
      "我很好，你___？|呢|吗|的|了|Hỏi lại 'còn bạn?' dùng 呢.",
      'Tôi cũng là học sinh:|我也是学生。|也我是学生。|我是也学生。|我是学生也。|也 đứng sau chủ ngữ, trước động từ.',
    ],
  },
  you: {
    t: '有 / 没有 · hỏi số người trong gia đình',
    f: 'A + 有 + (số + lượng từ) + N · A + 没有 + N · 你家有几口人？',
    e: '有 = có; phủ định duy nhất là 没有 (không dùng 不有). Đếm thành viên gia đình dùng lượng từ 口: 你家有几口人？',
    x: [
      '我 家 有 四 口 人 。|Wǒ jiā yǒu sì kǒu rén.|Nhà tôi có bốn người.',
      '我 没有 哥哥 。|Wǒ méiyǒu gēge.|Tôi không có anh trai.',
      '你 有 姐姐 吗 ？|Nǐ yǒu jiějie ma?|Bạn có chị gái không?',
    ],
    u: 'Nói về sở hữu hoặc sự tồn tại.',
    mt: 'Dùng 不有 ✗. Quên lượng từ: 我有两哥哥 ✗ → 我有两个哥哥.',
    m: '我 不 有 弟弟 。|我 没有 弟弟 。|Phủ định của 有 là 没有.',
    pt: 1,
    q: [
      '我___妹妹。(Tôi không có em gái)|没有|不有|不是|没是|有 → 没有.',
      '你家有几___人？|口|个|本|杯|Đếm thành viên gia đình dùng 口.',
    ],
  },
  de: {
    t: 'Trợ từ 的 chỉ sở hữu',
    f: 'Người/vật sở hữu + 的 + vật bị sở hữu',
    e: "的 tương đương 'của' nhưng đứng TRƯỚC danh từ chính: 我的书 = sách của tôi. Với người thân hoặc tập thể thân thuộc có thể bỏ 的: 我妈妈, 我家.",
    x: [
      '这 是 我 的 书 。|Zhè shì wǒ de shū.|Đây là sách của tôi.',
      '他 是 我 的 朋友 。|Tā shì wǒ de péngyou.|Anh ấy là bạn tôi.',
      '我 妈妈 是 医生 。|Wǒ māma shì yīshēng.|Mẹ tôi là bác sĩ.',
    ],
    u: "Nói 'của ai'. Trật tự ngược tiếng Việt: 'sách của tôi' → 我的书.",
    mt: 'Giữ trật tự tiếng Việt: 书的我 ✗.',
    m: '这 是 书 的 我 。|这 是 我 的 书 。|Người sở hữu + 的 + vật.',
    pt: 1,
    q: [
      'Bạn của tôi:|我的朋友|朋友的我|的我朋友|我朋友的|Trật tự: sở hữu + 的 + danh từ.',
      '这是老师___书。|的|了|吗|呢|的 nối người sở hữu với vật.',
    ],
  },
  age: {
    t: 'Hỏi tuổi · câu vị ngữ danh từ',
    f: '你几岁？(trẻ nhỏ) · 你多大？(người trẻ) · 您多大年纪？(người cao tuổi) · Chủ ngữ + số + 岁',
    e: 'Khi nói tuổi, ngày tháng, giá tiền có thể bỏ 是: 我二十岁. Hỏi trẻ nhỏ dùng 几岁, người trẻ dùng 多大, người cao tuổi dùng 多大年纪.',
    x: [
      '你 几 岁 ？|Nǐ jǐ suì?|Em mấy tuổi?',
      '我 今年 二十 岁 。|Wǒ jīnnián èrshí suì.|Năm nay tôi 20 tuổi.',
      '你 今年 多大 ？|Nǐ jīnnián duō dà?|Năm nay bạn bao nhiêu tuổi?',
    ],
    u: 'Chọn cách hỏi theo tuổi của người nghe để lịch sự.',
    mt: "Thêm 有: 我有二十岁 ✗ (dịch từ 'có 20 tuổi'). Hỏi người cao tuổi bằng 几岁 là thiếu lịch sự.",
    m: '我 有 二十 岁 。|我 二十 岁 。|Nói tuổi không dùng 有.',
    q: [
      'Hỏi tuổi một em bé 5 tuổi:|你几岁？|您多大年纪？|你几个岁？|你多少岁吗？|Trẻ nhỏ dùng 几岁.',
      'Tôi 30 tuổi:|我三十岁。|我有三十岁。|我三十个岁。|我三十岁吗。|Câu vị ngữ danh từ: chủ ngữ + số + 岁.',
    ],
  },
  zai: {
    t: '在 + nơi chốn + động từ',
    f: 'Chủ ngữ + 在 + nơi chốn + động từ (+ tân ngữ)',
    e: "Nơi diễn ra hành động đứng TRƯỚC động từ (tiếng Việt nói 'làm việc ở bệnh viện', tiếng Trung nói 'ở bệnh viện làm việc'): 我在医院工作.",
    x: [
      '她 在 医院 工作 。|Tā zài yīyuàn gōngzuò.|Cô ấy làm việc ở bệnh viện.',
      '你 在 哪儿 工作 ？|Nǐ zài nǎr gōngzuò?|Bạn làm việc ở đâu?',
      '我 在 学校 学习 汉语 。|Wǒ zài xuéxiào xuéxí Hànyǔ.|Tôi học tiếng Trung ở trường.',
    ],
    u: 'Nói hành động xảy ra ở đâu.',
    mt: 'Đặt địa điểm cuối câu như tiếng Việt: 我工作在医院 ✗.',
    m: '我 工作 在 医院 。|我 在 医院 工作 。|在 + nơi chốn đứng trước động từ.',
    q: [
      'Anh ấy học ở trường:|他在学校学习。|他学习在学校。|在学校他学习在。|他学校在学习。|在 + nơi chốn + động từ.',
      '你在哪儿___？(Bạn làm việc ở đâu?)|工作|是|有|在|Động từ đứng sau cụm 在 + nơi chốn.',
    ],
  },
  num: {
    t: 'Số đếm · 二 và 两 · lượng từ 个',
    f: 'Số + lượng từ + danh từ · 两 + lượng từ · 一百零五',
    e: '11–99: 十一, 二十, 九十九. 二 dùng khi đếm số; trước lượng từ dùng 两: 两个人. Giữa số và danh từ phải có lượng từ, 个 là lượng từ phổ biến nhất. Số 0 ở giữa đọc 零: 一百零五.',
    x: [
      '我 有 两 个 哥哥 。|Wǒ yǒu liǎng ge gēge.|Tôi có hai anh trai.',
      '一百 零 五|yìbǎi líng wǔ|một trăm linh năm',
      '你 有 多少 本 书 ？|Nǐ yǒu duōshao běn shū?|Bạn có bao nhiêu quyển sách?',
    ],
    u: '几 hỏi số nhỏ và cần lượng từ; 多少 hỏi số bất kỳ.',
    mt: 'Nói 二个人 ✗ → 两个人. Bỏ lượng từ: 三书 ✗ → 三本书.',
    m: '我 有 二 个 妹妹 。|我 有 两 个 妹妹 。|Trước lượng từ dùng 两.',
    pt: 1,
    q: [
      'Hai người:|两个人|二个人|两人个|二人|Trước lượng từ dùng 两.',
      'Ba quyển sách:|三本书|三书|三个本书|书三本|Số + lượng từ 本 + 书.',
    ],
  },
  date: {
    t: 'Ngày, tháng, năm và thứ',
    f: '年 → 月 → 号/日 → 星期… (từ lớn đến nhỏ)',
    e: 'Trật tự ngược tiếng Việt: năm → tháng → ngày → thứ. 星期一 … 星期六 là thứ Hai … thứ Bảy; 星期天/星期日 là Chủ nhật. Hỏi: 今天几月几号？ 今天星期几？',
    x: [
      '今天 是 十一 月 十八 号 。|Jīntiān shì shíyī yuè shíbā hào.|Hôm nay là ngày 18 tháng 11.',
      '今天 星期 几 ？|Jīntiān xīngqī jǐ?|Hôm nay thứ mấy?',
      '明天 是 星期四 。|Míngtiān shì xīngqīsì.|Ngày mai là thứ Năm.',
    ],
    u: 'Khẩu ngữ dùng 号, văn viết dùng 日.',
    mt: 'Nhầm 星期一 là Chủ nhật (thực ra là thứ Hai). Viết theo thứ tự tiếng Việt: 十八号十一月 ✗.',
    m: '今天 是 十八 号 十一 月 。|今天 是 十一 月 十八 号 。|Tháng đứng trước ngày.',
    q: [
      'Thứ Hai là?|星期一|星期二|星期天|星期日|星期一 = thứ Hai; 星期二 = thứ Ba.',
      'Ngày 2 tháng 9:|九月二号|二号九月|九号二月|二月九号|Tháng trước, ngày sau.',
    ],
  },
  time: {
    t: 'Giờ giấc và vị trí từ chỉ thời gian',
    f: '… 点 … 分 · 半 (rưỡi) · Chủ ngữ + thời gian + động từ',
    e: 'Nói giờ: 八点十分 (8:10), 三点半 (3:30), 两点 (2 giờ — dùng 两). Từ chỉ thời gian đứng TRƯỚC động từ: ở đầu câu hoặc ngay sau chủ ngữ.',
    x: [
      '现在 几 点 ？|Xiànzài jǐ diǎn?|Bây giờ là mấy giờ?',
      '我 七 点 半 起床 。|Wǒ qī diǎn bàn qǐchuáng.|Tôi dậy lúc 7 giờ rưỡi.',
      '下午 三 点 我们 上课 。|Xiàwǔ sān diǎn wǒmen shàngkè.|3 giờ chiều chúng tôi vào học.',
    ],
    u: 'Thời gian lớn trước, nhỏ sau: 明天上午九点.',
    mt: 'Đặt thời gian cuối câu: 我起床七点 ✗. Nói 二点 ✗ → 两点.',
    m: '我 起床 七 点 。|我 七 点 起床 。|Thời gian đứng trước động từ.',
    q: [
      '2 giờ 30:|两点半|二点半|半两点|两半点|2 giờ nói 两点; rưỡi = 半.',
      'Tôi ăn trưa lúc 12 giờ:|我十二点吃午饭。|我吃午饭十二点。|吃午饭我十二点。|十二点午饭我吃。|Thời gian đứng trước động từ.',
    ],
  },
  ba: {
    t: 'Trợ từ 吧 · 想 + động từ',
    f: 'Câu + 吧 (đề nghị / phỏng đoán) · Chủ ngữ + 想 + động từ',
    e: '吧 cuối câu làm lời đề nghị mềm mại: 我们走吧. Cũng dùng để phỏng đoán: 你是安娜吧？ 想 + động từ = muốn làm gì; phủ định 不想.',
    x: [
      '我们 去 吃 饭 吧 ！|Wǒmen qù chī fàn ba!|Chúng ta đi ăn cơm nhé!',
      '你 是 老师 吧 ？|Nǐ shì lǎoshī ba?|Chắc bạn là giáo viên nhỉ?',
      '我 想 喝 茶 。|Wǒ xiǎng hē chá.|Tôi muốn uống trà.',
    ],
    u: 'Rủ rê, đề nghị; nói mong muốn.',
    mt: "Dùng 吗 thay 吧 khi rủ rê (我们走吗 = 'chúng ta đi à?').",
    pt: 1,
    q: [
      'Chúng ta cùng đi nhé!|我们一起去吧！|我们一起去吗！|我们一起去呢！|我们一起去的！|Đề nghị, rủ rê dùng 吧.',
      'Tôi muốn đi Bắc Kinh:|我想去北京。|我去想北京。|想我去北京。|我想北京去。|想 + động từ.',
    ],
  },
  neg: {
    t: 'Phủ định với 不 và 没',
    f: '不 + V/Adj (thói quen, ý muốn, hiện tại/tương lai) · 没 + V (việc đã không xảy ra)',
    e: '不 phủ định ý muốn, thói quen, hiện tại/tương lai: 我不喝咖啡. 没 phủ định sự việc đã xảy ra: 我昨天没去学校. Câu dùng 没 thì không dùng 了.',
    x: [
      '我 不 喝 咖啡 。|Wǒ bù hē kāfēi.|Tôi không uống cà phê.',
      '我 今天 没 去 学校 。|Wǒ jīntiān méi qù xuéxiào.|Hôm nay tôi không đi học.',
      '他 不 是 医生 。|Tā bú shì yīshēng.|Anh ấy không phải bác sĩ.',
    ],
    u: '是, 喜欢, 想, 会 phủ định bằng 不; 有 phủ định bằng 没.',
    mt: 'Dùng 没 với 是: 他没是医生 ✗. Dùng 没…了: 我没去了 ✗.',
    m: '我 昨天 没 去 了 。|我 昨天 没 去 。|Câu phủ định với 没 không dùng 了.',
    q: [
      'Hôm qua tôi không ăn sáng:|我昨天没吃早饭。|我昨天不吃早饭。|我昨天没吃早饭了。|我昨天不吃了早饭。|Việc đã không xảy ra dùng 没, bỏ 了.',
      'Tôi không thích cà phê:|我不喜欢咖啡。|我没喜欢咖啡。|我不喜欢了咖啡。|我喜欢不咖啡。|喜欢 phủ định bằng 不.',
    ],
  },
  xihuan: {
    t: '喜欢 + động từ / danh từ',
    f: 'Chủ ngữ + (很/不) + 喜欢 + V/N',
    e: '喜欢 có thể đi với danh từ (喜欢猫) hoặc cụm động từ (喜欢看书). Mức độ: 很喜欢; phủ định: 不喜欢. Hỏi: 你喜欢做什么？',
    x: [
      '我 喜欢 看 书 。|Wǒ xǐhuan kàn shū.|Tôi thích đọc sách.',
      '她 很 喜欢 猫 。|Tā hěn xǐhuan māo.|Cô ấy rất thích mèo.',
      '你 喜欢 做 什么 ？|Nǐ xǐhuan zuò shénme?|Bạn thích làm gì?',
    ],
    u: 'Nói về sở thích.',
    mt: 'Đặt 很 sau 喜欢: 我喜欢很看书 ✗.',
    m: '我 喜欢 很 看 电影 。|我 很 喜欢 看 电影 。|很 đứng trước 喜欢.',
    q: [
      'Tôi rất thích nghe nhạc:|我很喜欢听歌。|我喜欢很听歌。|很我喜欢听歌。|我听很喜欢歌。|很 + 喜欢 + V.',
      '你喜欢___什么？|做|是|有|在|喜欢做什么 = thích làm gì.',
    ],
  },
  hui: {
    t: 'Động từ năng nguyện 会 · 能 · 可以',
    f: '会 + V (biết, nhờ học) · 能 + V (có khả năng/điều kiện) · 可以 + V (được phép)',
    e: '会: kỹ năng có được nhờ học (会说汉语). 能: có khả năng hoặc điều kiện (明天我能来). 可以: được phép (这儿可以坐吗？). Phủ định: 不会, 不能, 不可以.',
    x: [
      '我 会 说 一点儿 汉语 。|Wǒ huì shuō yìdiǎnr Hànyǔ.|Tôi biết nói một chút tiếng Trung.',
      '明天 你 能 来 吗 ？|Míngtiān nǐ néng lái ma?|Mai bạn đến được không?',
      '我 可以 坐 这儿 吗 ？|Wǒ kěyǐ zuò zhèr ma?|Tôi ngồi đây được không?',
    ],
    u: 'Xin phép dùng 可以; hỏi kỹ năng dùng 会.',
    mt: 'Đặt 会 sau động từ: 我说会汉语 ✗. Dùng 会 để xin phép (我会进来吗 ✗).',
    m: '我 说 会 汉语 。|我 会 说 汉语 。|会 đứng trước động từ.',
    q: [
      'Bạn biết viết chữ Hán không?|你会写汉字吗？|你写会汉字吗？|你会汉字写吗？|会你写汉字吗？|会 + động từ.',
      'Tôi vào được không? (xin phép)|我可以进来吗？|我会进来吗？|我可以吗进来？|可以我进来吗？|Xin phép dùng 可以.',
    ],
  },
  yiqi: {
    t: '和 … 一起 + V · vị trí của 也 / 都',
    f: 'A + 和 + B + 一起 + V · Chủ ngữ + 也/都 + V',
    e: '和…一起 = cùng với ai làm gì; cả cụm đứng trước động từ. 也 (cũng), 都 (đều) đứng sau chủ ngữ, trước động từ; có cả hai thì nói 也都.',
    x: [
      '我 和 朋友 一起 打球 。|Wǒ hé péngyou yìqǐ dǎ qiú.|Tôi chơi bóng cùng bạn.',
      '我们 都 是 学生 。|Wǒmen dōu shì xuésheng.|Chúng tôi đều là học sinh.',
      '他们 也 都 喜欢 中国 菜 。|Tāmen yě dōu xǐhuan Zhōngguó cài.|Họ cũng đều thích món Trung Quốc.',
    ],
    u: 'Kể hoạt động cùng người khác; nói điểm chung.',
    mt: 'Đặt 一起 cuối câu: 我和朋友打球一起 ✗. Đặt 都 trước chủ ngữ: 都我们是学生 ✗.',
    m: '我 和 妈妈 去 商店 一起 。|我 和 妈妈 一起 去 商店 。|一起 đứng trước động từ.',
    q: [
      'Chúng tôi đều thích trà:|我们都喜欢茶。|都我们喜欢茶。|我们喜欢都茶。|我们喜欢茶都。|都 đứng trước động từ.',
      'Tôi đi xem phim cùng bạn:|我和朋友一起去看电影。|我和朋友去看电影一起。|我一起和朋友去看电影。|一起我和朋友去看电影。|和…一起 + V.',
    ],
  },
  adj: {
    t: 'Câu vị ngữ tính từ',
    f: 'Chủ ngữ + 很/太/不 + tính từ',
    e: "Tính từ làm vị ngữ trực tiếp, KHÔNG dùng 是. Câu khẳng định thường thêm 很 (nghĩa 'rất' rất nhẹ). Phủ định: 不 + tính từ.",
    x: [
      '中国 菜 很 好吃 。|Zhōngguó cài hěn hǎochī.|Món Trung Quốc rất ngon.',
      '今天 不 冷 。|Jīntiān bù lěng.|Hôm nay không lạnh.',
      '我 很 忙 。|Wǒ hěn máng.|Tôi rất bận.',
    ],
    u: 'Miêu tả tính chất, trạng thái.',
    mt: "Thêm 是 trước tính từ: 饺子是好吃 ✗ (dịch từ 'là ngon').",
    m: '这 个 菜 是 好吃 。|这 个 菜 很 好吃 。|Tính từ làm vị ngữ không dùng 是.',
    q: [
      'Mì rất ngon:|面条很好吃。|面条是好吃。|面条是很好吃。|很面条好吃。|Chủ ngữ + 很 + tính từ.',
      'Hôm nay không nóng:|今天不热。|今天是不热。|今天热不。|不今天热。|Phủ định tính từ dùng 不.',
    ],
  },
  mw: {
    t: 'Lượng từ 杯 · 碗 · 本 · 件 · 个 · 口',
    f: 'Số / 这 / 那 + lượng từ + danh từ',
    e: 'Mỗi danh từ đi với lượng từ phù hợp: 一杯茶 (cốc), 一碗米饭 (bát), 一本书 (quyển), 一件衣服 (chiếc/bộ), 一个人 (chung nhất), 四口人 (thành viên gia đình).',
    x: [
      '我 要 一 杯 咖啡 。|Wǒ yào yì bēi kāfēi.|Tôi muốn một cốc cà phê.',
      '我 要 两 碗 米饭 。|Wǒ yào liǎng wǎn mǐfàn.|Tôi muốn hai bát cơm.',
      '我 买 了 一 本 书 。|Wǒ mǎi le yì běn shū.|Tôi đã mua một quyển sách.',
    ],
    u: 'Khi không chắc, 个 an toàn nhất trong khẩu ngữ (trừ sách, quần áo, đồ uống…).',
    mt: 'Bỏ lượng từ: 一茶 ✗. Dùng 个 cho sách: 一个书 ✗ → 一本书.',
    m: '我 要 一 茶 。|我 要 一 杯 茶 。|Phải có lượng từ giữa số và danh từ.',
    pt: 1,
    q: [
      '一___牛奶|杯|本|件|口|Đồ uống trong cốc dùng 杯.',
      '两___衣服|件|本|碗|杯|Quần áo dùng 件.',
      '三___书|本|件|杯|碗|Sách dùng 本.',
    ],
  },
  yao: {
    t: '要 / 想 khi gọi món · 请',
    f: '我要 + (số + lượng từ) + N · 我想 + V · 请 + V',
    e: '要 + danh từ: muốn có, gọi món (dứt khoát): 我要一杯茶. 想 + động từ: mong muốn: 我想吃饺子. 请 + động từ: mời / vui lòng: 请坐, 请给我菜单.',
    x: [
      '服务员 ， 我 要 一 碗 面条 。|Fúwùyuán, wǒ yào yì wǎn miàntiáo.|Phục vụ ơi, cho tôi một bát mì.',
      '我 想 吃 饺子 。|Wǒ xiǎng chī jiǎozi.|Tôi muốn ăn sủi cảo.',
      '请 给 我 菜单 。|Qǐng gěi wǒ càidān.|Vui lòng cho tôi thực đơn.',
    ],
    u: 'Khi gọi món, 我要… là cách nói tự nhiên.',
    mt: "Phủ định 要 thành 不要 mang nghĩa 'đừng / không cần'; muốn nói 'không muốn' nên dùng 不想.",
    q: [
      'Gọi một cốc trà:|我要一杯茶。|我要茶一杯。|一杯我要茶。|我杯一要茶。|要 + số + lượng từ + danh từ.',
      'Mời ngồi!|请坐！|坐请！|请你坐吗！|坐吧请！|请 + động từ.',
    ],
  },
  le: {
    t: 'Trợ từ 了',
    f: "V + 了 (+ số lượng + N): đã hoàn thành · Câu + 了: thay đổi trạng thái, 'rồi'",
    e: '了 sau động từ cho biết hành động đã hoàn thành: 我吃了两个包子. 了 cuối câu báo hiệu thay đổi: 我饿了. Hỏi: …了吗？ Phủ định dùng 没 và bỏ 了.',
    x: [
      '我 吃 了 两 个 包子 。|Wǒ chī le liǎng ge bāozi.|Tôi đã ăn hai cái bánh bao.',
      '我 饿 了 。|Wǒ è le.|Tôi đói rồi.',
      '你 吃 早饭 了 吗 ？|Nǐ chī zǎofàn le ma?|Bạn ăn sáng chưa?',
    ],
    u: 'Kể việc đã làm; thông báo thay đổi.',
    mt: "Coi 了 là 'thì quá khứ' và dùng cho mọi việc trong quá khứ (thói quen trong quá khứ không dùng 了). Dùng 了 cùng 没.",
    m: '我 没 吃 了 早饭 。|我 没 吃 早饭 。|Câu có 没 không dùng 了.',
    pt: 1,
    q: [
      "Bạn ăn tối chưa?|你吃晚饭了吗？|你吃晚饭了呢？|你了吃晚饭吗？|你吃了吗晚饭？|Hỏi 'đã… chưa': …了吗？",
      'Tôi đói rồi:|我饿了。|我了饿。|我是饿。|饿我了。|Thay đổi trạng thái: tính từ + 了.',
    ],
  },
  price: {
    t: 'Hỏi giá: 多少钱',
    f: 'N + 多少钱？ · Số + 块 (钱)',
    e: 'Hỏi giá: 这个多少钱？ Trả lời: 十块 (钱). Khẩu ngữ: 块 = 元 (tệ), 毛 = 角 (hào, 1/10 tệ). Hỏi tổng: 一共多少钱？',
    x: [
      '这 个 多少 钱 ？|Zhège duōshao qián?|Cái này bao nhiêu tiền?',
      '这 件 衣服 一百 块 。|Zhè jiàn yīfu yìbǎi kuài.|Bộ quần áo này 100 tệ.',
      '一共 多少 钱 ？|Yígòng duōshao qián?|Tổng cộng bao nhiêu tiền?',
    ],
    u: 'Mua sắm, hỏi giá.',
    mt: 'Dùng 几 để hỏi giá: 几钱 ✗.',
    m: '这 个 几 钱 ？|这 个 多少 钱 ？|Hỏi giá dùng 多少钱.',
    q: [
      "Hỏi 'Cái này bao nhiêu tiền?'|这个多少钱？|这个几钱？|多少钱这个吗？|这个钱多少个？|Hỏi giá: 多少钱.",
      'Hai mươi tệ:|二十块|二十个|两十块|二十本|Đơn vị tiền khẩu ngữ là 块.',
    ],
  },
  tai: {
    t: '太 … 了 · tính từ + 一点儿',
    f: '太 + tính từ + 了 (… quá) · Tính từ + 一点儿 (… hơn một chút)',
    e: '太…了 diễn tả mức độ quá cao, thường để cảm thán hoặc chê: 太贵了！ Khi mặc cả: 便宜一点儿吧. Không nói 一点儿便宜.',
    x: [
      '这 件 衣服 太 贵 了 ！|Zhè jiàn yīfu tài guì le!|Bộ quần áo này đắt quá!',
      '便宜 一点儿 吧 ！|Piányi yìdiǎnr ba!|Rẻ một chút đi!',
      '今天 太 热 了 。|Jīntiān tài rè le.|Hôm nay nóng quá.',
    ],
    u: 'Mặc cả, nhận xét.',
    mt: 'Quên 了 sau 太 + tính từ. Đảo vị trí: 一点儿便宜 ✗ → 便宜一点儿.',
    m: '一点儿 便宜 吧 。|便宜 一点儿 吧 。|Tính từ + 一点儿.',
    q: [
      'Đắt quá!|太贵了！|贵太了！|太了贵！|很贵太！|太 + tính từ + 了.',
      'Rẻ hơn một chút được không?|便宜一点儿，可以吗？|一点儿便宜，可以吗？|便宜很一点儿可以吗？|可以一点儿便宜吗？|Tính từ + 一点儿.',
    ],
  },
  zhena: {
    t: '这 / 那 + lượng từ + danh từ',
    f: '这/那 + (số) + lượng từ + N · Màu sắc + 的',
    e: "这 (này), 那 (kia) đứng trước lượng từ: 这件衣服, 那本书. Dùng 'màu/tính từ + 的' thay cho danh từ đã rõ: 我要白色的.",
    x: [
      '这 件 衣服 很 好看 。|Zhè jiàn yīfu hěn hǎokàn.|Bộ quần áo này rất đẹp.',
      '那 本 书 是 我 的 。|Nà běn shū shì wǒ de.|Quyển sách kia là của tôi.',
      '我 要 白色 的 。|Wǒ yào báisè de.|Tôi lấy cái màu trắng.',
    ],
    u: 'Chỉ định đồ vật khi mua sắm.',
    mt: 'Đặt 这 sau danh từ như tiếng Việt: 衣服这件 ✗.',
    m: '衣服 这 件 很 贵 。|这 件 衣服 很 贵 。|这 + lượng từ + danh từ.',
    pt: 1,
    q: [
      'Chiếc áo này:|这件衣服|衣服这件|这衣服件|件这衣服|这 + lượng từ + danh từ.',
      'Tôi lấy cái màu đỏ:|我要红色的。|我要的红色。|我红色要的。|我要红色个。|Màu + 的 thay cho danh từ.',
    ],
  },
  gei: {
    t: '给: cho, đưa cho, làm cho ai',
    f: 'A + 给 + B + vật · A + 给 + B + V',
    e: 'Động từ 给: 我给你五块 (tôi đưa bạn 5 tệ). Giới từ 给 + người + động từ: 我给妈妈买了一件衣服; cụm 给 + người đứng trước động từ chính.',
    x: [
      '请 给 我 一 杯 水 。|Qǐng gěi wǒ yì bēi shuǐ.|Vui lòng cho tôi một cốc nước.',
      '我 给 妈妈 买 了 一 件 衣服 。|Wǒ gěi māma mǎi le yí jiàn yīfu.|Tôi mua cho mẹ một bộ quần áo.',
      '我 找 你 五 块 。|Wǒ zhǎo nǐ wǔ kuài.|Tôi trả lại bạn 5 tệ.',
    ],
    u: 'Thanh toán, nhờ vả, tặng quà.',
    mt: 'Đặt vật trước người: 我给一杯茶你 ✗ → 我给你一杯茶.',
    m: '我 给 一 杯 茶 你 。|我 给 你 一 杯 茶 。|给 + người + vật.',
    q: [
      'Cho tôi xem một chút:|给我看看。|看看给我我。|我给看看。|给看看我。|给 + người + động từ.',
      'Tôi mua cho mẹ một bộ quần áo:|我给妈妈买了一件衣服。|我买了给妈妈一件衣服。|给妈妈我买了一件衣服。|我妈妈给买了一件衣服。|给 + người đứng trước động từ.',
    ],
  },
  where: {
    t: '在 làm động từ: ở đâu · nơi chốn + 有',
    f: 'Người/vật + 在 + nơi chốn · … 在哪儿？ · Nơi chốn + 有 + vật',
    e: "在 làm động từ chính nghĩa là 'ở': 我在家. Hỏi vị trí: …在哪儿？ Nói sự tồn tại dùng 有: 杯子里有茶.",
    x: [
      '你 家 在 哪儿 ？|Nǐ jiā zài nǎr?|Nhà bạn ở đâu?',
      '我 在 这儿 。|Wǒ zài zhèr.|Tôi ở đây.',
      '杯子 里 有 茶 。|Bēizi li yǒu chá.|Trong cốc có trà.',
    ],
    u: 'Hỏi và chỉ vị trí người, đồ vật.',
    mt: 'Dùng 是 thay cho 在: 医院是哪儿 ✗. Nhầm 在 (ở) và 有 (có).',
    m: '医院 是 哪儿 ？|医院 在 哪儿 ？|Hỏi vị trí dùng 在哪儿.',
    q: [
      'Điện thoại của tôi ở đâu?|我的手机在哪儿？|我的手机是哪儿？|哪儿我的手机在？|我的手机有哪儿？|Hỏi vị trí: 在哪儿.',
      'Trên bàn có một quyển sách:|桌子上有一本书。|桌子上在一本书。|一本书有桌子上。|有桌子上一本书。|Nơi chốn + 有 + vật.',
    ],
  },
  fang: {
    t: 'Phương vị từ: 左边 · 右边 · 前面 · 后面 · 旁边 · 上面 · 下面',
    f: 'Vật + 在 + mốc + phương vị từ',
    e: 'Phương vị từ đứng SAU danh từ làm mốc (ngược tiếng Việt): 学校前面 = phía trước trường; 桌子上面 = trên bàn. Có thể thêm 的: 医院的左边.',
    x: [
      '商店 在 学校 前面 。|Shāngdiàn zài xuéxiào qiánmian.|Cửa hàng ở trước trường học.',
      '我 家 在 医院 旁边 。|Wǒ jiā zài yīyuàn pángbiān.|Nhà tôi ở cạnh bệnh viện.',
      '书 在 桌子 上面 。|Shū zài zhuōzi shàngmian.|Sách ở trên bàn.',
    ],
    u: 'Chỉ đường, miêu tả vị trí.',
    mt: 'Đặt phương vị từ trước mốc như tiếng Việt: 在前面学校 ✗.',
    m: '商店 在 左边 医院 。|商店 在 医院 左边 。|Mốc + phương vị từ.',
    q: [
      'Ở bên phải trường học:|在学校右边|在右边学校|右边在学校|学校右边在|Mốc + phương vị từ.',
      'Con mèo ở dưới gầm bàn:|猫在桌子下面。|猫在下面桌子。|下面猫在桌子。|猫桌子在下面。|Mốc 桌子 + 下面.',
    ],
  },
  zenme: {
    t: '怎么 + động từ · 坐 + phương tiện + 去',
    f: '怎么 + V? · 坐 + phương tiện + 去/来 + nơi chốn',
    e: '怎么 hỏi cách thức, đứng ngay trước động từ: 去机场怎么走？ 你怎么去学校？ Phương tiện: 坐 + 车/出租车/飞机 + 去…; 开车 (lái xe), 走路 (đi bộ).',
    x: [
      '你 怎么 去 学校 ？|Nǐ zěnme qù xuéxiào?|Bạn đến trường bằng cách nào?',
      '我 坐 出租车 去 机场 。|Wǒ zuò chūzūchē qù jīchǎng.|Tôi đi taxi ra sân bay.',
      '去 火车站 怎么 走 ？|Qù huǒchēzhàn zěnme zǒu?|Đến ga tàu đi thế nào?',
    ],
    u: 'Hỏi đường, nói về phương tiện.',
    mt: "Đặt phương tiện cuối câu như tiếng Việt ('đi Bắc Kinh bằng máy bay'): 我去北京坐飞机 — câu này lại mang nghĩa 'đến Bắc Kinh để đi máy bay'.",
    m: '我 去 北京 坐 飞机 。|我 坐 飞机 去 北京 。|坐 + phương tiện đứng trước 去 + nơi chốn.',
    q: [
      'Tôi đi máy bay đến Bắc Kinh:|我坐飞机去北京。|我飞机坐去北京。|坐飞机我北京去。|我去坐北京飞机。|坐 + phương tiện + 去 + nơi chốn.',
      'Bạn đi làm bằng gì?|你怎么去工作？|你去工作怎么？|怎么你工作去？|你工作怎么去去？|怎么 đứng trước động từ.',
    ],
  },
  li: {
    t: 'A 离 B + 远/近',
    f: 'A + 离 + B + (很/不) + 远/近',
    e: '离 diễn tả khoảng cách giữa hai địa điểm: 我家离学校很近. Hỏi: …离…远吗？',
    x: [
      '我 家 离 学校 很 近 。|Wǒ jiā lí xuéxiào hěn jìn.|Nhà tôi cách trường rất gần.',
      '机场 离 这儿 远 吗 ？|Jīchǎng lí zhèr yuǎn ma?|Sân bay có xa đây không?',
      '医院 离 这儿 不 远 。|Yīyuàn lí zhèr bù yuǎn.|Bệnh viện cách đây không xa.',
    ],
    u: 'Hỏi và nói về khoảng cách.',
    mt: 'Dùng 从 thay 离: 我家从学校很近 ✗.',
    m: '我 家 从 学校 很 近 。|我 家 离 学校 很 近 。|Khoảng cách dùng 离.',
    q: [
      'Trường cách nhà tôi rất xa:|学校离我家很远。|学校从我家很远。|学校离很远我家。|离学校我家很远。|A + 离 + B + 很远.',
      '火车站___这儿远吗？|离|在|从|到|Hỏi khoảng cách dùng 离.',
    ],
  },
};

/* Cặp trái nghĩa / gần nghĩa (bài tập B11) */
const ANT =
  '大-小 多-少 冷-热 来-去 买-卖 远-近 贵-便宜 前面-后面 左边-右边 上面-下面 早上-晚上 有-没有 起床-睡觉 上午-下午';
const SYN = '中文-汉语';

/* Chữ đa âm / thanh nhẹ: loại khỏi bài nghe thanh điệu một chữ */
const POLY = new Set(
  '了的得地着还都和长行乐只为觉重会号分几吗呢吧个们哪那给'.split('')
);
/* Từ chỉ thời gian: cho phép đổi chỗ với chủ ngữ khi sắp xếp câu */
const TIME_W = new Set([
  '今天',
  '明天',
  '昨天',
  '现在',
  '早上',
  '上午',
  '下午',
  '晚上',
  '每天',
  '周末',
  '今年',
]);

/* ===================== GIAO TIẾP THỰC TẾ (20 tình huống) =====================
      w: "汉字|pinyin|nghĩa;..." · d: hội thoại · lv: trình độ gợi ý (không chính thức) · mono: văn bản một người viết */
const COMM = [
  {
    t: 'Chào hỏi',
    ic: '👋',
    lv: 'HSK 1',
    w: '你好|nǐ hǎo|xin chào;最近|zuìjìn|dạo này;怎么样|zěnmeyàng|thế nào;谢谢|xièxie|cảm ơn',
    d: `
   A|你好 ！|Nǐ hǎo!|Xin chào!
   B|你好 ！ 最近 怎么样 ？|Nǐ hǎo! Zuìjìn zěnmeyàng?|Chào bạn! Dạo này thế nào?
   A|很 好 ， 谢谢 。 你 呢 ？|Hěn hǎo, xièxie. Nǐ ne?|Rất tốt, cảm ơn. Còn bạn?
   B|我 也 很 好 。|Wǒ yě hěn hǎo.|Tôi cũng rất khỏe.`,
  },
  {
    t: 'Giới thiệu bản thân',
    ic: '🙋',
    lv: 'HSK 1–2',
    w: '来自|láizì|đến từ;专业|zhuānyè|chuyên ngành;大家|dàjiā|mọi người;认识|rènshi|quen biết',
    d: `
   A|大家 好 ， 我 叫 阮 明 。|Dàjiā hǎo, wǒ jiào Ruǎn Míng.|Chào mọi người, tôi tên là Nguyễn Minh.
   A|我 来自 越南 河内 。|Wǒ láizì Yuènán Hénèi.|Tôi đến từ Hà Nội, Việt Nam.
   B|你 是 学生 吗 ？|Nǐ shì xuésheng ma?|Bạn là sinh viên à?
   A|是 的 ， 我 的 专业 是 汉语 。|Shì de, wǒ de zhuānyè shì Hànyǔ.|Đúng vậy, chuyên ngành của tôi là tiếng Trung.
   B|认识 你 很 高兴 ！|Rènshi nǐ hěn gāoxìng!|Rất vui được làm quen với bạn!`,
  },
  {
    t: 'Gia đình',
    ic: '👨‍👩‍👧',
    lv: 'HSK 1–2',
    w: '家人|jiārén|người nhà;照片|zhàopiàn|ảnh;结婚|jiéhūn|kết hôn;孩子|háizi|con, trẻ em',
    d: `
   A|这 是 你 家人 的 照片 吗 ？|Zhè shì nǐ jiārén de zhàopiàn ma?|Đây là ảnh gia đình bạn à?
   B|对 ， 这 是 我 爸爸 、 妈妈 和 妹妹 。|Duì, zhè shì wǒ bàba, māma hé mèimei.|Đúng, đây là bố, mẹ và em gái tôi.
   A|你 结婚 了 吗 ？|Nǐ jiéhūn le ma?|Bạn kết hôn chưa?
   B|结婚 了 ， 我 有 一 个 孩子 。|Jiéhūn le, wǒ yǒu yí ge háizi.|Rồi, tôi có một đứa con.`,
  },
  {
    t: 'Ăn uống',
    ic: '🍜',
    lv: 'HSK 1–2',
    w: '点菜|diǎn cài|gọi món;辣|là|cay;买单|mǎidān|tính tiền;打包|dǎbāo|gói mang về',
    d: `
   A|服务员 ， 我们 点菜 。|Fúwùyuán, wǒmen diǎn cài.|Phục vụ ơi, chúng tôi gọi món.
   B|好 的 ， 你们 想 吃 什么 ？|Hǎo de, nǐmen xiǎng chī shénme?|Vâng, các anh chị muốn ăn gì?
   A|一 个 宫保 鸡丁 ， 不 要 太 辣 。|Yí ge gōngbǎo jīdīng, bú yào tài là.|Một đĩa gà Kung Pao, đừng cay quá.
   A|服务员 ， 买单 ！ 剩下 的 帮 我 打包 。|Fúwùyuán, mǎidān! Shèngxià de bāng wǒ dǎbāo.|Phục vụ ơi, tính tiền! Phần còn lại gói giúp tôi.`,
  },
  {
    t: 'Mua sắm',
    ic: '🛍️',
    lv: 'HSK 2',
    w: '试|shì|thử;打折|dǎzhé|giảm giá;刷卡|shuākǎ|quẹt thẻ;合适|héshì|vừa vặn, phù hợp',
    d: `
   A|这 件 衣服 可以 试 一下 吗 ？|Zhè jiàn yīfu kěyǐ shì yíxià ma?|Tôi có thể thử bộ đồ này không?
   B|可以 ， 试衣间 在 那边 。|Kěyǐ, shìyījiān zài nàbiān.|Được ạ, phòng thử đồ ở bên kia.
   A|有点儿 大 ， 有 小 号 的 吗 ？|Yǒudiǎnr dà, yǒu xiǎo hào de ma?|Hơi rộng, có cỡ nhỏ không?
   B|有 。 今天 打 八 折 。|Yǒu. Jīntiān dǎ bā zhé.|Có. Hôm nay giảm 20%.
   A|可以 刷卡 吗 ？|Kěyǐ shuākǎ ma?|Có quẹt thẻ được không?`,
  },
  {
    t: 'Du lịch',
    ic: '🧳',
    lv: 'HSK 2–3',
    w: '旅游|lǚyóu|du lịch;门票|ménpiào|vé vào cửa;导游|dǎoyóu|hướng dẫn viên;景点|jǐngdiǎn|điểm tham quan',
    d: `
   A|你好 ， 长城 的 门票 多少 钱 ？|Nǐ hǎo, Chángchéng de ménpiào duōshao qián?|Xin chào, vé vào Vạn Lý Trường Thành bao nhiêu tiền?
   B|四十 块 一 张 。|Sìshí kuài yì zhāng.|40 tệ một vé.
   A|这儿 有 中文 导游 吗 ？|Zhèr yǒu Zhōngwén dǎoyóu ma?|Ở đây có hướng dẫn viên tiếng Trung không?
   B|有 ， 也 有 英文 的 。|Yǒu, yě yǒu Yīngwén de.|Có, cũng có cả tiếng Anh.`,
  },
  {
    t: 'Đặt khách sạn',
    ic: '🏨',
    lv: 'HSK 2–3',
    w: '预订|yùdìng|đặt trước;房间|fángjiān|phòng;护照|hùzhào|hộ chiếu;退房|tuìfáng|trả phòng',
    d: `
   A|你好 ， 我 预订 了 一 个 房间 。|Nǐ hǎo, wǒ yùdìng le yí ge fángjiān.|Xin chào, tôi đã đặt một phòng.
   B|请 给 我 看 一下 您 的 护照 。|Qǐng gěi wǒ kàn yíxià nín de hùzhào.|Vui lòng cho tôi xem hộ chiếu của quý khách.
   A|好 的 。 早饭 几 点 开始 ？|Hǎo de. Zǎofàn jǐ diǎn kāishǐ?|Vâng. Bữa sáng bắt đầu lúc mấy giờ?
   B|七 点 。 退房 时间 是 中午 十二 点 。|Qī diǎn. Tuìfáng shíjiān shì zhōngwǔ shí'èr diǎn.|7 giờ. Giờ trả phòng là 12 giờ trưa.`,
  },
  {
    t: 'Đi taxi',
    ic: '🚕',
    lv: 'HSK 2',
    w: '师傅|shīfu|bác tài;地址|dìzhǐ|địa chỉ;停|tíng|dừng;发票|fāpiào|hóa đơn',
    d: `
   A|师傅 ， 去 这个 地址 。|Shīfu, qù zhège dìzhǐ.|Bác tài, cho tôi đến địa chỉ này.
   B|好 ， 大概 二十 分钟 。|Hǎo, dàgài èrshí fēnzhōng.|Được, khoảng 20 phút.
   A|师傅 ， 前面 停 一下 。|Shīfu, qiánmian tíng yíxià.|Bác tài, dừng ở phía trước một chút.
   A|请 给 我 发票 。|Qǐng gěi wǒ fāpiào.|Cho tôi xin hóa đơn.`,
  },
  {
    t: 'Gọi điện thoại',
    ic: '📞',
    lv: 'HSK 2–3',
    w: '喂|wéi|alô;请问|qǐngwèn|xin hỏi;回电话|huí diànhuà|gọi lại;告诉|gàosu|báo, nói cho biết',
    d: `
   A|喂 ， 你好 ！ 请问 王 经理 在 吗 ？|Wéi, nǐ hǎo! Qǐngwèn Wáng jīnglǐ zài ma?|Alô, xin chào! Xin hỏi giám đốc Vương có ở đó không?
   B|他 现在 不 在 ， 您 是 哪 位 ？|Tā xiànzài bú zài, nín shì nǎ wèi?|Anh ấy hiện không có ở đây, xin hỏi ai đang gọi ạ?
   A|我 是 阮 明 。 请 他 给 我 回 电话 。|Wǒ shì Ruǎn Míng. Qǐng tā gěi wǒ huí diànhuà.|Tôi là Nguyễn Minh. Nhờ anh ấy gọi lại cho tôi.
   B|好 的 ， 我 会 告诉 他 。|Hǎo de, wǒ huì gàosu tā.|Vâng, tôi sẽ báo anh ấy.`,
  },
  {
    t: 'Hẹn gặp',
    ic: '📅',
    lv: 'HSK 2',
    w: '有空|yǒu kòng|rảnh;见面|jiànmiàn|gặp mặt;咖啡馆|kāfēiguǎn|quán cà phê;不见不散|bú jiàn bú sàn|không gặp không về',
    d: `
   A|明天 下午 你 有空 吗 ？|Míngtiān xiàwǔ nǐ yǒu kòng ma?|Chiều mai bạn rảnh không?
   B|有空 。 我们 在 哪儿 见面 ？|Yǒu kòng. Wǒmen zài nǎr jiànmiàn?|Rảnh. Chúng ta gặp nhau ở đâu?
   A|三 点 在 学校 旁边 的 咖啡馆 ， 怎么样 ？|Sān diǎn zài xuéxiào pángbiān de kāfēiguǎn, zěnmeyàng?|3 giờ ở quán cà phê cạnh trường, được không?
   B|好 ， 不见不散 ！|Hǎo, bú jiàn bú sàn!|Được, không gặp không về!`,
  },
  {
    t: 'Giao tiếp công sở',
    ic: '🏢',
    lv: 'HSK 3–4',
    w: '同事|tóngshì|đồng nghiệp;开会|kāihuì|họp;报告|bàogào|báo cáo;加班|jiābān|tăng ca',
    d: `
   A|小 李 ， 今天 下午 几 点 开会 ？|Xiǎo Lǐ, jīntiān xiàwǔ jǐ diǎn kāihuì?|Tiểu Lý, chiều nay mấy giờ họp?
   B|两 点 半 ， 在 三 号 会议室 。|Liǎng diǎn bàn, zài sān hào huìyìshì.|Hai giờ rưỡi, ở phòng họp số 3.
   A|报告 我 已经 发 给 你 了 。|Bàogào wǒ yǐjīng fā gěi nǐ le.|Báo cáo tôi đã gửi cho bạn rồi.
   B|谢谢 ！ 今天 我们 可能 要 加班 。|Xièxie! Jīntiān wǒmen kěnéng yào jiābān.|Cảm ơn! Hôm nay chúng ta có thể phải tăng ca.`,
  },
  {
    t: 'Gặp gỡ khách hàng',
    ic: '🤝',
    lv: 'HSK 3–4',
    w: '客户|kèhù|khách hàng;名片|míngpiàn|danh thiếp;欢迎|huānyíng|hoan nghênh;合作|hézuò|hợp tác',
    d: `
   A|欢迎 您 来 我们 公司 ！|Huānyíng nín lái wǒmen gōngsī!|Chào mừng ông đến công ty chúng tôi!
   B|谢谢 。 这 是 我 的 名片 。|Xièxie. Zhè shì wǒ de míngpiàn.|Cảm ơn. Đây là danh thiếp của tôi.
   A|很 高兴 认识 您 ， 希望 我们 合作 愉快 。|Hěn gāoxìng rènshi nín, xīwàng wǒmen hézuò yúkuài.|Rất vui được gặp ông, mong chúng ta hợp tác vui vẻ.
   B|我 也 是 。|Wǒ yě shì.|Tôi cũng vậy.`,
  },
  {
    t: 'Giao tiếp thương mại',
    ic: '💼',
    lv: 'HSK 4–5',
    w: '报价|bàojià|báo giá;订单|dìngdān|đơn đặt hàng;交货|jiāohuò|giao hàng;付款|fùkuǎn|thanh toán',
    d: `
   A|请 您 给 我们 一 个 报价 。|Qǐng nín gěi wǒmen yí ge bàojià.|Xin ông gửi cho chúng tôi một bản báo giá.
   B|如果 订单 超过 一千 件 ， 我们 可以 打 九 折 。|Rúguǒ dìngdān chāoguò yìqiān jiàn, wǒmen kěyǐ dǎ jiǔ zhé.|Nếu đơn hàng trên 1.000 chiếc, chúng tôi có thể giảm 10%.
   A|什么 时候 可以 交货 ？|Shénme shíhou kěyǐ jiāohuò?|Khi nào có thể giao hàng?
   B|收到 付款 后 三十 天 内 交货 。|Shōudào fùkuǎn hòu sānshí tiān nèi jiāohuò.|Giao hàng trong vòng 30 ngày sau khi nhận được thanh toán.`,
  },
  {
    t: 'Đàm phán hợp đồng',
    ic: '📝',
    lv: 'HSK 5',
    w: '合同|hétong|hợp đồng;条款|tiáokuǎn|điều khoản;价格|jiàgé|giá cả;让步|ràngbù|nhượng bộ',
    d: `
   A|关于 价格 ， 我们 还 有 一些 问题 。|Guānyú jiàgé, wǒmen hái yǒu yìxiē wèntí.|Về giá cả, chúng tôi vẫn còn một số vấn đề.
   B|我们 可以 在 付款 方式 上 做 一些 让步 。|Wǒmen kěyǐ zài fùkuǎn fāngshì shang zuò yìxiē ràngbù.|Chúng tôi có thể nhượng bộ một chút về phương thức thanh toán.
   A|好 的 ， 请 把 修改 后 的 条款 写 进 合同 。|Hǎo de, qǐng bǎ xiūgǎi hòu de tiáokuǎn xiě jìn hétong.|Được, xin đưa các điều khoản đã sửa vào hợp đồng.
   B|没 问题 ， 明天 发 给 您 。|Méi wèntí, míngtiān fā gěi nín.|Không vấn đề gì, ngày mai tôi gửi ông.`,
  },
  {
    t: 'Họp với đối tác',
    ic: '📊',
    lv: 'HSK 4–5',
    w: '会议|huìyì|cuộc họp;议程|yìchéng|chương trình nghị sự;进度|jìndù|tiến độ;总结|zǒngjié|tổng kết',
    d: `
   A|我们 开始 开会 吧 。 今天 的 议程 有 三 项 。|Wǒmen kāishǐ kāihuì ba. Jīntiān de yìchéng yǒu sān xiàng.|Chúng ta bắt đầu họp nhé. Chương trình hôm nay có ba mục.
   B|首先 ， 请 介绍 一下 项目 的 进度 。|Shǒuxiān, qǐng jièshào yíxià xiàngmù de jìndù.|Trước tiên, xin giới thiệu qua tiến độ dự án.
   A|目前 已经 完成 了 百分之 七十 。|Mùqián yǐjīng wánchéng le bǎi fēn zhī qīshí.|Hiện đã hoàn thành 70%.
   B|很 好 。 最后 我们 总结 一下 。|Hěn hǎo. Zuìhòu wǒmen zǒngjié yíxià.|Rất tốt. Cuối cùng chúng ta tổng kết lại.`,
  },
  {
    t: 'Giới thiệu công ty',
    ic: '🏭',
    lv: 'HSK 4',
    w: '公司|gōngsī|công ty;成立|chénglì|thành lập;员工|yuángōng|nhân viên;产品|chǎnpǐn|sản phẩm',
    d: `
   A|我们 公司 成立 于 二〇一五 年 。|Wǒmen gōngsī chénglì yú èr líng yī wǔ nián.|Công ty chúng tôi thành lập năm 2015.
   A|现在 有 两百 多 名 员工 。|Xiànzài yǒu liǎngbǎi duō míng yuángōng.|Hiện có hơn 200 nhân viên.
   B|你们 的 主要 产品 是 什么 ？|Nǐmen de zhǔyào chǎnpǐn shì shénme?|Sản phẩm chính của các anh là gì?
   A|主要 是 电子 产品 ， 出口 到 二十 多 个 国家 。|Zhǔyào shì diànzǐ chǎnpǐn, chūkǒu dào èrshí duō ge guójiā.|Chủ yếu là sản phẩm điện tử, xuất khẩu sang hơn 20 quốc gia.`,
  },
  {
    t: 'Trao đổi về sở hữu trí tuệ',
    ic: '⚖️',
    lv: 'HSK 5–6',
    w: '知识产权|zhīshi chǎnquán|sở hữu trí tuệ;侵权|qīnquán|xâm phạm quyền;保护|bǎohù|bảo vệ, bảo hộ;授权|shòuquán|cấp phép, ủy quyền',
    d: `
   A|我们 非常 重视 知识产权 保护 。|Wǒmen fēicháng zhòngshì zhīshi chǎnquán bǎohù.|Chúng tôi rất coi trọng việc bảo hộ sở hữu trí tuệ.
   B|如果 使用 我们 的 技术 ， 需要 先 获得 授权 。|Rúguǒ shǐyòng wǒmen de jìshù, xūyào xiān huòdé shòuquán.|Nếu sử dụng công nghệ của chúng tôi, cần được cấp phép trước.
   A|明白 。 我们 不 希望 出现 侵权 问题 。|Míngbai. Wǒmen bù xīwàng chūxiàn qīnquán wèntí.|Tôi hiểu. Chúng tôi không muốn xảy ra vấn đề xâm phạm quyền.
   B|那 我们 签 一 份 许可 协议 吧 。|Nà wǒmen qiān yí fèn xǔkě xiéyì ba.|Vậy chúng ta ký một thỏa thuận cấp phép nhé.`,
  },
  {
    t: 'Đăng ký nhãn hiệu và bằng sáng chế',
    ic: '®️',
    lv: 'HSK 5–6',
    w: '商标|shāngbiāo|nhãn hiệu;专利|zhuānlì|bằng sáng chế;注册|zhùcè|đăng ký;申请|shēnqǐng|nộp đơn, đơn',
    d: `
   A|我们 想 在 中国 注册 商标 ， 需要 准备 什么 材料 ？|Wǒmen xiǎng zài Zhōngguó zhùcè shāngbiāo, xūyào zhǔnbèi shénme cáiliào?|Chúng tôi muốn đăng ký nhãn hiệu ở Trung Quốc, cần chuẩn bị hồ sơ gì?
   B|需要 商标 图样 、 申请人 信息 和 商品 类别 。|Xūyào shāngbiāo túyàng, shēnqǐngrén xìnxī hé shāngpǐn lèibié.|Cần mẫu nhãn hiệu, thông tin người nộp đơn và nhóm hàng hóa.
   A|发明 专利 申请 一般 需要 多 长 时间 ？|Fāmíng zhuānlì shēnqǐng yìbān xūyào duō cháng shíjiān?|Đơn sáng chế thường mất bao lâu?
   B|时间 比较 长 ， 具体 要 看 审查 情况 。|Shíjiān bǐjiào cháng, jùtǐ yào kàn shěnchá qíngkuàng.|Khá lâu, cụ thể còn tùy tình hình thẩm định.`,
  },
  {
    t: 'Viết email tiếng Trung',
    ic: '✉️',
    lv: 'HSK 4–5',
    mono: 1,
    w: '邮件|yóujiàn|thư điện tử;尊敬的|zūnjìng de|kính gửi;附件|fùjiàn|tệp đính kèm;查收|cháshōu|kiểm tra và nhận',
    d: `
   A|尊敬 的 王 经理 ：|Zūnjìng de Wáng jīnglǐ:|Kính gửi giám đốc Vương,
   A|您好 ！ 附件 是 我们 公司 的 报价单 ， 请 查收 。|Nín hǎo! Fùjiàn shì wǒmen gōngsī de bàojiàdān, qǐng cháshōu.|Xin chào ông! Tệp đính kèm là bảng báo giá của công ty chúng tôi, mong ông kiểm tra.
   A|如 有 问题 ， 请 随时 联系 我 。|Rú yǒu wèntí, qǐng suíshí liánxì wǒ.|Nếu có vấn đề gì, xin liên hệ tôi bất cứ lúc nào.
   A|此致 敬礼 ！ 阮 明|Cǐzhì jìnglǐ! Ruǎn Míng|Trân trọng! Nguyễn Minh`,
  },
  {
    t: 'Thảo luận vấn đề chuyên môn',
    ic: '🧠',
    lv: 'HSK 5–6',
    w: "方案|fāng'àn|phương án;建议|jiànyì|đề xuất;风险|fēngxiǎn|rủi ro;数据|shùjù|số liệu",
    d: `
   A|关于 这个 方案 ， 大家 有 什么 建议 ？|Guānyú zhège fāng'àn, dàjiā yǒu shénme jiànyì?|Về phương án này, mọi người có đề xuất gì?
   B|我 觉得 成本 有点儿 高 ， 风险 也 比较 大 。|Wǒ juéde chéngběn yǒudiǎnr gāo, fēngxiǎn yě bǐjiào dà.|Tôi thấy chi phí hơi cao, rủi ro cũng khá lớn.
   A|你 有 数据 支持 吗 ？|Nǐ yǒu shùjù zhīchí ma?|Anh có số liệu hỗ trợ không?
   B|有 ， 我 下午 把 分析 报告 发 给 大家 。|Yǒu, wǒ xiàwǔ bǎ fēnxī bàogào fā gěi dàjiā.|Có, chiều nay tôi sẽ gửi báo cáo phân tích cho mọi người.`,
  },
];

/* ===================== BÀI ĐỌC HSK 1 ===================== */
const READ = [
  {
    t: '我的家 · Gia đình tôi',
    s: [
      '我 叫 安娜 ， 我 是 越南 人 。|Wǒ jiào Ānnà, wǒ shì Yuènán rén.|Tôi tên là Anna, tôi là người Việt Nam.',
      '我 家 有 四 口 人 ： 爸爸 、 妈妈 、 哥哥 和 我 。|Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.|Nhà tôi có bốn người: bố, mẹ, anh trai và tôi.',
      '我 爸爸 是 老师 ， 妈妈 是 医生 。|Wǒ bàba shì lǎoshī, māma shì yīshēng.|Bố tôi là giáo viên, mẹ tôi là bác sĩ.',
      '我 哥哥 二十五 岁 ， 他 在 北京 工作 。|Wǒ gēge èrshíwǔ suì, tā zài Běijīng gōngzuò.|Anh trai tôi 25 tuổi, anh ấy làm việc ở Bắc Kinh.',
      '我 是 学生 ， 我 在 学习 汉语 。|Wǒ shì xuésheng, wǒ zài xuéxí Hànyǔ.|Tôi là học sinh, tôi đang học tiếng Trung.',
    ],
    q: [
      'Nhà Anna có mấy người?|4 người|3 người|5 người|Câu 2: 我家有四口人.',
      'Mẹ của Anna làm nghề gì?|Bác sĩ|Giáo viên|Học sinh|妈妈是医生.',
      'Anh trai Anna làm việc ở đâu?|Bắc Kinh|Hà Nội|Thượng Hải|他在北京工作.',
    ],
    sum: 'Anna là người Việt Nam, nhà có bốn người; bố là giáo viên, mẹ là bác sĩ, anh trai làm việc ở Bắc Kinh, còn Anna đang học tiếng Trung.',
  },
  {
    t: '我的一天 · Một ngày của tôi',
    s: [
      '我 每天 六 点 半 起床 。|Wǒ měi tiān liù diǎn bàn qǐchuáng.|Mỗi ngày tôi dậy lúc 6 giờ rưỡi.',
      '七 点 我 吃 早饭 ， 我 喜欢 喝 牛奶 。|Qī diǎn wǒ chī zǎofàn, wǒ xǐhuan hē niúnǎi.|7 giờ tôi ăn sáng, tôi thích uống sữa.',
      '我 八 点 上课 ， 下午 五 点 回 家 。|Wǒ bā diǎn shàngkè, xiàwǔ wǔ diǎn huí jiā.|Tôi vào học lúc 8 giờ, 5 giờ chiều về nhà.',
      '晚上 我 看 书 ， 有时候 看 电视 。|Wǎnshang wǒ kàn shū, yǒu shíhou kàn diànshì.|Buổi tối tôi đọc sách, thỉnh thoảng xem tivi.',
      '我 十一 点 睡觉 。|Wǒ shíyī diǎn shuìjiào.|Tôi đi ngủ lúc 11 giờ.',
    ],
    q: [
      'Người viết dậy lúc mấy giờ?|6 giờ 30|7 giờ|8 giờ|六点半起床.',
      'Bữa sáng người viết thích uống gì?|Sữa|Trà|Cà phê|喜欢喝牛奶.',
      'Mấy giờ người viết về nhà?|5 giờ chiều|8 giờ sáng|11 giờ tối|下午五点回家.',
    ],
    sum: 'Người viết dậy lúc 6 giờ rưỡi, ăn sáng và uống sữa lúc 7 giờ, học từ 8 giờ, 5 giờ chiều về nhà, buổi tối đọc sách hoặc xem tivi và ngủ lúc 11 giờ.',
  },
  {
    t: '在饭店 · Ở nhà hàng',
    s: [
      '今天 晚上 我 和 朋友 去 饭店 吃 饭 。|Jīntiān wǎnshang wǒ hé péngyou qù fàndiàn chī fàn.|Tối nay tôi và bạn đi nhà hàng ăn cơm.',
      '我 要 了 一 碗 面条 ， 朋友 要 了 饺子 。|Wǒ yào le yì wǎn miàntiáo, péngyou yào le jiǎozi.|Tôi gọi một bát mì, bạn tôi gọi sủi cảo.',
      '我们 还 要 了 两 杯 茶 。|Wǒmen hái yào le liǎng bēi chá.|Chúng tôi còn gọi hai cốc trà.',
      '菜 很 好吃 ， 也 不 贵 ， 一共 八十 块 。|Cài hěn hǎochī, yě bú guì, yígòng bāshí kuài.|Món ăn rất ngon, cũng không đắt, tổng cộng 80 tệ.',
    ],
    q: [
      'Người viết gọi món gì?|Một bát mì|Sủi cảo|Cơm|我要了一碗面条.',
      'Họ gọi đồ uống gì?|Hai cốc trà|Hai cốc cà phê|Một cốc sữa|两杯茶.',
      'Bữa ăn hết bao nhiêu tiền?|80 tệ|18 tệ|100 tệ|一共八十块.',
    ],
    sum: 'Người viết và bạn ăn tối ở nhà hàng: một bát mì, sủi cảo và hai cốc trà; món ăn ngon, không đắt, tổng cộng 80 tệ.',
  },
  {
    t: '去商店 · Đi cửa hàng',
    s: [
      '星期六 我 去 商店 买 东西 。|Xīngqīliù wǒ qù shāngdiàn mǎi dōngxi.|Thứ Bảy tôi đi cửa hàng mua đồ.',
      '我 想 买 一 件 衣服 。|Wǒ xiǎng mǎi yí jiàn yīfu.|Tôi muốn mua một bộ quần áo.',
      '那 件 红色 的 很 好看 ， 但是 太 贵 了 。|Nà jiàn hóngsè de hěn hǎokàn, dànshì tài guì le.|Bộ màu đỏ kia rất đẹp nhưng đắt quá.',
      '我 买 了 一 件 白色 的 ， 一百 块 。|Wǒ mǎi le yí jiàn báisè de, yìbǎi kuài.|Tôi đã mua một bộ màu trắng, 100 tệ.',
    ],
    q: [
      'Người viết đi cửa hàng vào ngày nào?|Thứ Bảy|Chủ nhật|Thứ Hai|星期六.',
      'Vì sao người viết không mua bộ màu đỏ?|Vì đắt quá|Vì không đẹp|Vì quá nhỏ|太贵了.',
      'Người viết đã mua bộ màu gì?|Màu trắng|Màu đỏ|Màu đen|买了一件白色的.',
    ],
    sum: 'Thứ Bảy người viết đi mua quần áo; bộ màu đỏ đẹp nhưng quá đắt nên đã mua bộ màu trắng giá 100 tệ.',
  },
  {
    t: '我的朋友 · Bạn của tôi',
    s: [
      '我 有 一 个 中国 朋友 ， 她 叫 王 丽 。|Wǒ yǒu yí ge Zhōngguó péngyou, tā jiào Wáng Lì.|Tôi có một người bạn Trung Quốc, cô ấy tên là Vương Lệ.',
      '她 在 河内 学习 越南语 。|Tā zài Hénèi xuéxí Yuènányǔ.|Cô ấy học tiếng Việt ở Hà Nội.',
      '我们 周末 常常 一起 去 喝 咖啡 。|Wǒmen zhōumò chángcháng yìqǐ qù hē kāfēi.|Cuối tuần chúng tôi thường cùng đi uống cà phê.',
      '我 教 她 越南语 ， 她 教 我 汉语 。|Wǒ jiāo tā Yuènányǔ, tā jiāo wǒ Hànyǔ.|Tôi dạy cô ấy tiếng Việt, cô ấy dạy tôi tiếng Trung.',
    ],
    q: [
      'Vương Lệ là người nước nào?|Trung Quốc|Việt Nam|Nhật Bản|中国朋友.',
      'Vương Lệ học gì ở Hà Nội?|Tiếng Việt|Tiếng Trung|Tiếng Anh|学习越南语.',
      'Cuối tuần họ thường làm gì?|Cùng đi uống cà phê|Cùng xem phim|Cùng đi mua sắm|一起去喝咖啡.',
    ],
    sum: 'Người viết có bạn Trung Quốc tên Vương Lệ đang học tiếng Việt ở Hà Nội; cuối tuần hai người hay uống cà phê và dạy nhau tiếng Việt, tiếng Trung.',
  },
];

/* ===================== ĐỀ VIẾT / NÓI MỞ (chấm bằng tiêu chí + bài mẫu, AI nếu có) ===================== */
const WRITE = [
  {
    k: 'pic',
    t: 'Miêu tả bức tranh gia đình',
    sc: '👨 👩 👦 👧 🏠 🐶',
    p: 'Viết 3–5 câu miêu tả gia đình trong tranh.',
    w: '家 口 爸爸 妈妈 狗',
    min: 20,
    s: '这 是 我 的 家 。 我 家 有 四 口 人 ： 爸爸 、 妈妈 、 哥哥 和 我 。 我们 还 有 一 只 狗 。 我 很 爱 我 的 家 。|Zhè shì wǒ de jiā. Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ. Wǒmen hái yǒu yì zhī gǒu. Wǒ hěn ài wǒ de jiā.|Đây là nhà tôi. Nhà tôi có bốn người: bố, mẹ, anh trai và tôi. Chúng tôi còn có một con chó. Tôi rất yêu gia đình mình.',
  },
  {
    k: 'pic',
    t: 'Buổi sáng của tôi',
    sc: '⏰ 🍳 🥛 🍎 🏫',
    p: 'Dựa vào tranh, viết về buổi sáng của bạn.',
    w: '起床 早饭 喝 吃 学校',
    min: 20,
    s: '我 每天 七 点 起床 。 早饭 我 喝 牛奶 ， 吃 一 个 苹果 。 八 点 我 去 学校 。|Wǒ měi tiān qī diǎn qǐchuáng. Zǎofàn wǒ hē niúnǎi, chī yí ge píngguǒ. Bā diǎn wǒ qù xuéxiào.|Mỗi ngày tôi dậy lúc 7 giờ. Bữa sáng tôi uống sữa, ăn một quả táo. 8 giờ tôi đến trường.',
  },
  {
    k: 'para',
    t: 'Giới thiệu bản thân',
    p: 'Viết đoạn văn 4–6 câu: tên, quốc tịch, tuổi, nghề nghiệp, sở thích.',
    w: '叫 是 岁 喜欢',
    min: 30,
    s: "你们 好 ！ 我 叫 阮 明 ， 我 是 越南 人 。 我 今年 二十二 岁 ， 是 大学生 。 我 喜欢 看 中国 电影 ， 也 喜欢 学习 汉语 。 认识 你们 很 高兴 ！|Nǐmen hǎo! Wǒ jiào Ruǎn Míng, wǒ shì Yuènán rén. Wǒ jīnnián èrshí'èr suì, shì dàxuéshēng. Wǒ xǐhuan kàn Zhōngguó diànyǐng, yě xǐhuan xuéxí Hànyǔ. Rènshi nǐmen hěn gāoxìng!|Chào các bạn! Tôi tên là Nguyễn Minh, tôi là người Việt Nam. Năm nay tôi 22 tuổi, là sinh viên. Tôi thích xem phim Trung Quốc, cũng thích học tiếng Trung. Rất vui được làm quen với các bạn!",
  },
  {
    k: 'sum',
    t: 'Tóm tắt bài đọc “Ở nhà hàng”',
    read: 2,
    p: 'Đọc hoặc nghe bài “在饭店”, tóm tắt bằng 1–2 câu tiếng Trung (hoặc tiếng Việt nếu mới bắt đầu).',
    w: '饭店 面条 饺子 茶',
    min: 10,
    s: '我 和 朋友 在 饭店 吃 了 面条 和 饺子 ， 喝 了 茶 ， 一共 八十 块 。|Wǒ hé péngyou zài fàndiàn chī le miàntiáo hé jiǎozi, hē le chá, yígòng bāshí kuài.|Tôi và bạn ăn mì, sủi cảo và uống trà ở nhà hàng, tổng cộng 80 tệ.',
  },
  {
    k: 'msg',
    t: 'Tin nhắn hẹn bạn xem phim',
    p: 'Viết tin nhắn WeChat hẹn bạn đi xem phim: thời gian, địa điểm, hỏi bạn có rảnh không.',
    w: '明天 电影 一起 吗',
    min: 15,
    s: '小 王 ， 明天 晚上 七 点 我们 一起 去 看 电影 ， 好 吗 ？ 在 学校 前面 见 。|Xiǎo Wáng, míngtiān wǎnshang qī diǎn wǒmen yìqǐ qù kàn diànyǐng, hǎo ma? Zài xuéxiào qiánmian jiàn.|Tiểu Vương, 7 giờ tối mai chúng ta cùng đi xem phim nhé? Gặp nhau trước cổng trường.',
  },
  {
    k: 'msg',
    t: 'Email xin nghỉ học',
    p: 'Viết email ngắn cho thầy/cô xin nghỉ học ngày mai vì bị ốm.',
    w: '老师 明天 不 能 谢谢',
    min: 20,
    s: '王 老师 ： 您好 ！ 我 生病 了 ， 明天 不 能 去 上课 。 对不起 ！ 谢谢 您 ！ 学生 ： 安娜|Wáng lǎoshī: Nín hǎo! Wǒ shēngbìng le, míngtiān bù néng qù shàngkè. Duìbuqǐ! Xièxie nín! Xuésheng: Ānnà|Thưa thầy Vương! Em bị ốm, ngày mai không thể đi học. Em xin lỗi! Em cảm ơn thầy! Học sinh: Anna',
  },
  {
    k: 'op',
    t: 'Học tiếng Trung có khó không?',
    p: 'Trình bày ý kiến 3–5 câu: học tiếng Trung khó hay dễ? Vì sao? Dùng mẫu 我觉得…，因为…',
    w: '我 觉得 因为 汉语',
    min: 20,
    s: '我 觉得 汉语 不 太 难 。 因为 我 每天 学习 ， 也 常常 和 中国 朋友 说 汉语 。 汉字 有点儿 难 ， 但是 很 有意思 。|Wǒ juéde Hànyǔ bú tài nán. Yīnwèi wǒ měi tiān xuéxí, yě chángcháng hé Zhōngguó péngyou shuō Hànyǔ. Hànzì yǒudiǎnr nán, dànshì hěn yǒu yìsi.|Tôi thấy tiếng Trung không khó lắm. Vì tôi học mỗi ngày và cũng hay nói tiếng Trung với bạn người Trung Quốc. Chữ Hán hơi khó nhưng rất thú vị.',
  },
];
const RUBRIC = [
  'Hoàn thành đúng yêu cầu đề bài',
  'Dùng đúng từ vựng và ngữ pháp đã học',
  'Câu văn rõ ràng, mạch lạc',
];

/* ===================== KIỂM TRA ĐẦU VÀO (ước lượng, KHÔNG phải chứng nhận HSK) =====================
      cấp|kỹ năng|đề|câu phát âm (nếu nghe)|đáp án|nhiễu1|nhiễu2|nhiễu3 */
const PLACE = [
  '1|vocab|谢谢 nghĩa là gì?||Cảm ơn|Xin lỗi|Tạm biệt|Không sao',
  '1|vocab|“Bố” trong tiếng Trung là?||爸爸|妈妈|哥哥|朋友',
  '1|grammar|你是中国人___？||吗|呢|的|了',
  '1|listen|Nghe và chọn nghĩa đúng|我叫安娜。|Tôi tên là Anna|Tôi là người Việt Nam|Tôi rất vui|Tôi là học sinh',
  '2|vocab|准备 nghĩa là gì?||chuẩn bị|quyết định|chính xác|tham gia',
  '2|grammar|Chọn câu đúng (so sánh):||他比我高。|他比我很高。|他比我非常高。|他比我太高了。',
  '2|listen|Nghe và chọn nghĩa đúng|我已经吃过饭了。|Tôi đã ăn cơm rồi|Tôi chưa ăn cơm|Tôi muốn ăn cơm|Tôi đang nấu cơm',
  '2|read|因为下雨，所以他没去公园。Vì sao anh ấy không đi công viên?||Vì trời mưa|Vì bận việc|Vì bị ốm|Vì không có tiền',
  '3|vocab|经常 nghĩa là gì?||thường xuyên|thỉnh thoảng|không bao giờ|vừa mới',
  '3|grammar|你___我一起去吧。||跟|对|给|被',
  '3|listen|Nghe và chọn nghĩa đúng|这件衣服虽然很漂亮，但是太贵了。|Áo đẹp nhưng đắt quá|Áo vừa rẻ vừa đẹp|Áo không đẹp lắm|Áo rất vừa người',
  '3|read|我把作业写完了，现在可以去玩儿了。Câu này nói gì?||Đã làm xong bài tập nên có thể đi chơi|Chưa làm bài tập|Không muốn đi chơi|Đang làm bài tập',
  '4|vocab|尽管 nghĩa là gì?||mặc dù|vì vậy|hơn nữa|ngay cả',
  '4|grammar|___他很努力，___还是没通过考试。||尽管…但是|因为…所以|只要…就|如果…就',
  '4|read|随着科技的发展，人们的生活越来越方便。Ý chính?||Khoa học công nghệ phát triển làm cuộc sống ngày càng tiện lợi|Cuộc sống ngày càng khó khăn|Con người không thích công nghệ|Khoa học phát triển chậm',
  '4|listen|Nghe và chọn nghĩa đúng|他不但会说汉语，而且还会说日语。|Anh ấy nói được cả tiếng Trung lẫn tiếng Nhật|Anh ấy chỉ nói được tiếng Trung|Anh ấy không biết tiếng Nhật|Anh ấy đang học tiếng Nhật',
];

/* ===================== PINYIN ===================== */
const PY_INIT =
  'b|八|bā p|爬|pá m|妈|mā f|发|fā d|大|dà t|他|tā n|拿|ná l|拉|lā g|哥|gē k|课|kè h|喝|hē j|鸡|jī q|七|qī x|西|xī zh|知|zhī ch|吃|chī sh|诗|shī r|日|rì z|字|zì c|词|cí s|四|sì';
const PY_FIN =
  'a|大|dà o|波|bō e|饿|è i|一|yī u|五|wǔ ü|鱼|yú ai|爱|ài ei|飞|fēi ao|好|hǎo ou|口|kǒu an|安|ān en|门|mén ang|忙|máng eng|冷|lěng ong|东|dōng er|二|èr ia|家|jiā ie|谢|xiè iao|小|xiǎo iu|六|liù ian|天|tiān in|新|xīn iang|想|xiǎng ing|听|tīng iong|用|yòng ua|花|huā uo|我|wǒ uai|快|kuài ui|对|duì uan|晚|wǎn un|春|chūn uang|黄|huáng üe|学|xué üan|远|yuǎn ün|云|yún';
const PY_TONES = [
  [
    '妈',
    'mā',
    1,
    '55',
    'Cao và bằng, giữ giọng ở mức cao suốt âm tiết — giống thanh ngang nhưng cao hơn.',
  ],
  [
    '麻',
    'má',
    2,
    '35',
    'Đi lên từ giữa lên cao, gần thanh sắc của tiếng Việt nhưng lên đều, không gắt.',
  ],
  [
    '马',
    'mǎ',
    3,
    '214',
    'Hạ thấp rồi hơi lên. Khi đứng trước thanh khác thường chỉ đọc nửa đầu (hạ thấp).',
  ],
  [
    '骂',
    'mà',
    4,
    '51',
    'Rơi mạnh và nhanh từ cao xuống thấp, dứt khoát — không kéo dài như thanh huyền.',
  ],
  [
    '吗',
    'ma',
    5,
    '—',
    'Thanh nhẹ: ngắn, nhẹ, độ cao phụ thuộc âm tiết đứng trước.',
  ],
];
const PY_PAIRS = [
  ['zh / z / j', '知', 'zhī', '资', 'zī', '鸡', 'jī'],
  ['ch / c / q', '吃', 'chī', '词', 'cí', '七', 'qī'],
  ['sh / s / x', '诗', 'shī', '四', 'sì', '西', 'xī'],
  ['n / l', '你', 'nǐ', '里', 'lǐ'],
  ['r / l', '热', 'rè', '乐', 'lè'],
  ['u / ü', '路', 'lù', '绿', 'lǜ'],
  ['-n / -ng', '班', 'bān', '帮', 'bāng'],
  ['en / eng', '门', 'mén', '忙', 'máng'],
  ['in / ing', '新', 'xīn', '星', 'xīng'],
  ['b / p', '八', 'bā', '爬', 'pá'],
  ['d / t', '大', 'dà', '他', 'tā'],
  ['g / k', '哥', 'gē', '课', 'kè'],
];
const PY_TIPS = [
  "Thanh 3 đứng một mình đọc đủ (xuống rồi lên); trước thanh 1, 2, 4 chỉ đọc 'nửa thanh 3' (hạ thấp).",
  'Thanh 4 rơi nhanh từ cao xuống thấp; người Việt hay đọc thành thanh huyền (thấp và kéo dài).',
  'Thanh 1 giữ cao và bằng đến hết âm tiết, không hạ giọng ở cuối.',
  'zh, ch, sh, r: cong đầu lưỡi lên; z, c, s: đầu lưỡi thẳng sau răng cửa; j, q, x: mặt lưỡi áp ngạc, môi dẹt.',
  'p, t, k, q, c, ch là âm bật hơi: đặt tờ giấy trước miệng, giấy phải rung.',
  "ü: tròn môi như khi nói 'u' nhưng giữ vị trí lưỡi như 'i'.",
  "e (饿 è) không giống 'e' tiếng Việt: gần 'ơ' nhưng lưỡi lùi về sau.",
  "-n: đầu lưỡi chạm lợi trên; -ng: cuống lưỡi nâng lên như 'ng' tiếng Việt.",
];

/* Mẫu hội thoại cho phần Nghe 3 của đề thi thử HSK 1 (chọn hình) */
const MOCK_TPL = [
  [
    '你 想 吃 什么 ？|Nǐ xiǎng chī shénme?',
    '我 想 吃 {h} 。|Wǒ xiǎng chī {p}.',
    '米饭 面条 饺子 苹果',
  ],
  ['你 喝 什么 ？|Nǐ hē shénme?', '我 喝 {h} 。|Wǒ hē {p}.', '茶 咖啡 牛奶 水'],
  [
    '你 去 哪儿 ？|Nǐ qù nǎr?',
    '我 去 {h} 。|Wǒ qù {p}.',
    '医院 学校 商店 机场 火车站 饭店',
  ],
  [
    '你 想 买 什么 ？|Nǐ xiǎng mǎi shénme?',
    '我 想 买 {h} 。|Wǒ xiǎng mǎi {p}.',
    '衣服 手机 书 杯子',
  ],
];

/* ===================== SỐ LIỆU ĐỀ CƯƠNG (đối chiếu từ nguồn tổng hợp, cần kiểm tra lại trước khi thi) ===================== */
const OFFICIAL = {
  src: '《HSK 考试大纲》 — CLEC công bố 11/2025, áp dụng từ 7/2026. Số liệu tổng hợp từ các trang trích đề cương; hãy đối chiếu tại chinesetest.cn trước khi thi.',
  head: [
    'Cấp',
    'Từ vựng (tích lũy)',
    'Chữ Hán nhận biết',
    'Chữ Hán viết tay',
    'Điểm ngữ pháp',
  ],
  rows: [
    ['1', 300, 246, 0, 70],
    ['2', 500, 371, 100, 148],
    ['3', 1000, 655, 250, 244],
    ['4', 2000, 1096, 400, 339],
    ['5', 3600, 1527, 550, 409],
    ['6', 5400, 1940, 700, 459],
    ['7–9', 11000, 3088, 1200, 593],
  ],
  examHead: ['Cấp', 'Bài thi viết', 'Thời lượng', 'Thi nói'],
  exam: [
    ['1', '40 câu: nghe 20, đọc 20', '~40 phút', 'Không'],
    ['2', '60 câu: nghe 25, đọc 25, viết 10', '~60 phút', 'Không'],
    ['3', '70 câu: nghe, đọc, viết', '~83 phút', '15 câu, ~15 phút'],
    ['4', '70 câu: nghe, đọc, viết', '~85 phút', '5 câu, ~20 phút'],
    ['5', '72 câu: nghe, đọc, viết', '~110 phút', '5 câu, ~23 phút'],
    ['6', '82 câu: nghe, đọc, viết', '~125 phút', '5 câu, ~23 phút'],
    [
      '7–9',
      '98 câu: nghe, đọc, viết, dịch, nói',
      '~210 phút',
      'Nằm trong bài thi',
    ],
  ],
  notes: [
    'Ba hệ quy chiếu khác nhau: (1) Chuẩn năng lực GF 0025-2021 (cấp 1: 500 từ); (2) Đề cương thi HSK 2025 (cấp 1: 300 từ) — website dùng hệ này; (3) HSK 2.0 cũ (cấp 1: 150 từ, cấp 6: 5.000 từ).',
    "CTI tổ chức thi HSK 3.0 toàn cầu từ 13/12/2026; nhãn 'HSK 1–6' không tự cho biết phiên bản — hãy kiểm tra phiên bản khi đăng ký.",
    'Ngưỡng đạt HSK 1 bản 2.0 là 120/200; ngưỡng của bản 3.0 chưa được xác minh — website chỉ hiển thị để tham khảo.',
    'Các ngưỡng 80% / 75% trong website là tiêu chuẩn nội bộ để chuyển bài, không phải điểm đỗ chính thức.',
  ],
};

/* ===================== LỘ TRÌNH HSK 2–9 (khung chương trình; nội dung chi tiết DỰ KIẾN BỔ SUNG) ===================== */
const ROAD = [
  {
    lv: '2',
    wk: 8,
    goal: 'Giao tiếp trong đời sống; nói về hoạt động, trải nghiệm và kế hoạch đơn giản.',
    plan: [
      'Tuần 1: Sinh hoạt và hoạt động hằng ngày',
      'Tuần 2: Sở thích, thể thao, giải trí',
      'Tuần 3: Giao thông và phương hướng',
      'Tuần 4: Du lịch, đặt phòng, mua sắm',
      'Tuần 5: Sức khỏe, cơ thể, cảm xúc',
      'Tuần 6: Công việc, học tập, kế hoạch',
      'Tuần 7: Ngữ pháp và hội thoại tổng hợp',
      'Tuần 8: Kiểm tra và thi thử',
    ],
    ex: 'Nghe hội thoại dài hơn · kể lại việc đã xảy ra · hỏi–đáp · viết câu ngắn · giảm phụ thuộc Pinyin',
  },
  {
    lv: '3',
    wk: 12,
    goal: 'Giao tiếp độc lập trong tình huống quen thuộc; hiểu hội thoại và đọc văn bản cơ bản.',
    plan: [
      'Tuần 1–2: Giao tiếp xã hội, quan hệ cá nhân',
      'Tuần 3–4: Du lịch, khách sạn, dịch vụ',
      'Tuần 5–6: Sức khỏe và cuộc sống',
      'Tuần 7–8: Công việc, trường học, giao tiếp thực tế',
      'Tuần 9: Kể chuyện, mô tả trải nghiệm',
      'Tuần 10: Đọc hiểu và nghe hiểu',
      'Tuần 11: Viết, ngữ pháp, phản xạ nói',
      'Tuần 12: Ôn tập và thi thử (có thi nói)',
    ],
    ex: 'Nghe và ghi thông tin · sắp xếp hội thoại · đọc đoạn văn · viết đoạn ngắn · đóng vai · kể chuyện theo tranh',
  },
  {
    lv: '4',
    wk: 18,
    goal: 'Tham gia hội thoại, trình bày ý kiến, đọc và viết nội dung tương đối phức tạp.',
    plan: [
      'Giai đoạn 1 (3 tuần): Mở rộng từ vựng, ngữ pháp nâng cao',
      'Giai đoạn 2: Giao tiếp xã hội, trình bày ý kiến',
      'Giai đoạn 3: Văn hóa, giáo dục, đời sống',
      'Giai đoạn 4: Công việc, giải quyết vấn đề',
      'Giai đoạn 5: Đọc hiểu, nghe hiểu, viết đoạn văn',
      'Giai đoạn 6: Luyện thi và củng cố',
    ],
    ex: 'Tóm tắt hội thoại · tìm ý chính · so sánh hai quan điểm · phân tích lỗi sai · viết đoạn · trình bày quan điểm',
  },
  {
    lv: '5',
    wk: 24,
    goal: 'Đọc văn bản tương đối dài, hiểu nội dung công việc, giao tiếp trong bối cảnh chuyên nghiệp.',
    plan: [
      'Giai đoạn 1 (4 tuần): Từ vựng và ngữ pháp trung cao cấp',
      'Giai đoạn 2: Đọc báo, nghe tin tức',
      'Giai đoạn 3: Giao tiếp công việc và thương mại',
      'Giai đoạn 4: Phân tích, trình bày quan điểm',
      'Giai đoạn 5: Email, thuyết trình, dịch thuật',
      'Giai đoạn 6: Luyện đề và kiểm tra',
    ],
    ex: 'Nghe phỏng vấn · đọc tin tức · email công việc · dịch Trung–Việt / Việt–Trung · thảo luận xã hội · tóm tắt · thuyết trình 3–5 phút',
  },
  {
    lv: '6',
    wk: 30,
    goal: 'Hiểu văn bản và hội thoại phức tạp, dùng tiếng Trung linh hoạt trong giao tiếp và công việc.',
    plan: [
      'Giai đoạn 1 (5 tuần): Từ vựng chuyên sâu, diễn đạt trang trọng',
      'Giai đoạn 2: Đọc văn bản dài',
      'Giai đoạn 3: Nghe tốc độ tự nhiên',
      'Giai đoạn 4: Phân tích và phản biện',
      'Giai đoạn 5: Tóm tắt, viết luận, dịch thuật',
      'Giai đoạn 6: Ôn tập và thi thử',
    ],
    ex: 'Nghe rồi tóm tắt · phân tích văn bản · viết luận · chỉnh sửa câu · sắc thái từ đồng nghĩa · tranh luận · dịch chuyên môn',
  },
  {
    lv: '7–9',
    wk: 0,
    goal: 'Chương trình dài hạn trình độ cao: học thuật, chuyên ngành, biên–phiên dịch.',
    plan: [
      'Kinh tế và thương mại',
      'Pháp luật và sở hữu trí tuệ',
      'Khoa học và công nghệ',
      'Văn hóa và xã hội',
      'Quan hệ quốc tế',
      'Học thuật và nghiên cứu',
      'Thuyết trình và đàm phán',
      'Biên dịch và phiên dịch',
    ],
    ex: 'Nghe bài giảng · đọc tài liệu học thuật · dịch chuyên ngành · viết phân tích · tranh luận · thuyết trình · tóm tắt văn bản dài · phân tích lập luận · luyện theo cấu trúc thi 7–9',
  },
];

/* ===================== 35 DẠNG BÀI TẬP =====================
      [nhóm, số, tên, mã bộ sinh câu hỏi, kỹ năng] — mã bắt đầu bằng "@" mở công cụ riêng, "w:" là đề viết */
const TYPES = [
  ['A', 1, 'Nghe và chọn thanh điệu', 'tone', 'pron'],
  ['A', 2, 'Nghe và chọn Pinyin đúng', 'py', 'pron'],
  ['A', 3, 'Ghép thanh mẫu với vận mẫu', 'combo', 'pron'],
  ['A', 4, 'Nghe và chọn chữ Hán', 'hz', 'listen'],
  ['A', 5, 'Nghe và điền Pinyin còn thiếu', 'fillpy', 'pron'],
  ['A', 6, 'Ghi âm, nghe lại và so sánh', 'rec', 'speak'],
  ['B', 7, 'Flashcard Hán – Việt', '@flash:zv', 'vocab'],
  ['B', 8, 'Flashcard Việt – Hán', '@flash:vz', 'vocab'],
  ['B', 9, 'Ghép từ với nghĩa', 'matchm', 'vocab'],
  ['B', 10, 'Ghép từ với hình ảnh', 'matchi', 'vocab'],
  ['B', 11, 'Chọn từ trái nghĩa / gần nghĩa', 'ant', 'vocab'],
  ['B', 12, 'Điền từ thích hợp vào câu', 'fillw', 'vocab'],
  ['B', 13, 'Trò chơi lật thẻ ghi nhớ', '@memory', 'vocab'],
  ['B', 14, 'Luyện viết chữ Hán theo nét', '@write', 'write'],
  ['C', 15, 'Sắp xếp từ thành câu', 'order', 'grammar'],
  ['C', 16, 'Điền trợ từ / lượng từ', 'part', 'grammar'],
  ['C', 17, 'Tìm câu sai', 'err', 'grammar'],
  ['C', 18, 'Sửa câu sai', 'fix', 'grammar'],
  ['C', 19, 'Nối câu hỏi với câu trả lời', 'qa', 'read'],
  ['C', 20, 'Chọn cấu trúc ngữ pháp đúng', 'gq', 'grammar'],
  ['C', 21, 'Dịch câu Việt – Trung', 'tr', 'write'],
  ['D', 22, 'Nghe hội thoại và chọn đáp án', 'dlg', 'listen'],
  ['D', 23, 'Nghe chép chính tả', 'dict', 'listen'],
  ['D', 24, 'Nghe và điền vào chỗ trống', 'lfill', 'listen'],
  ['D', 25, 'Đọc đoạn văn và trả lời câu hỏi', 'read', 'read'],
  ['D', 26, 'Đọc và chọn Đúng / Sai', 'tf', 'read'],
  ['D', 27, 'Sắp xếp câu thành đoạn hội thoại', 'para', 'read'],
  ['D', 28, 'Nghe và nói nhại (shadowing)', 'shadow', 'speak'],
  ['E', 29, 'Đóng vai hội thoại', 'role', 'speak'],
  ['E', 30, 'Miêu tả tranh bằng tiếng Trung', 'w:pic', 'write'],
  ['E', 31, 'Viết đoạn văn theo chủ đề', 'w:para', 'write'],
  ['E', 32, 'Tóm tắt văn bản', 'w:sum', 'write'],
  ['E', 33, 'Viết tin nhắn / email', 'w:msg', 'write'],
  ['E', 34, 'Trình bày ý kiến', 'w:op', 'write'],
  ['E', 35, 'Thi thử HSK tổng hợp', '@exam', 'read'],
];
const TYPE_GROUPS = {
  A: 'Phát âm và Pinyin',
  B: 'Từ vựng và chữ Hán',
  C: 'Ngữ pháp',
  D: 'Nghe và đọc',
  E: 'Giao tiếp và viết',
};

/* ========================= HẾT PHẦN 1/6 ========================= */
/* =====================================================================
   PHẦN 2/6: TIỆN ÍCH · PINYIN · PHÁT ÂM · LƯU TRỮ · SRS · BỘ SINH BÀI TẬP
   Dán ngay sau Phần 1, trong cùng file App.jsx
   ===================================================================== */

/* ---------- 0. Đính chính dữ liệu Phần 1 (cặp âm chưa chuẩn) ---------- */
PY_PAIRS.forEach((p, i) => {
  if (p[0] === 'en / eng')
    PY_PAIRS[i] = ['en / eng', '分', 'fēn', '风', 'fēng'];
  if (p[0] === 'r / l') PY_PAIRS[i] = ['r / l', '入', 'rù', '路', 'lù'];
});

/* ---------- 1. Tiện ích chung ---------- */
const DAY = 864e5;
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const uniq = (a) => [...new Set(a)];
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const dkey = (d = new Date()) => {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(x.getDate()).padStart(2, '0')}`;
};
const fmtDate = (t) => new Date(t).toLocaleDateString('vi-VN');
let UID_N = 0;
const uid = () => `k${Date.now().toString(36)}${(UID_N++).toString(36)}`;
function pickDistinct(cands, n, key, taken) {
  const seen = new Set(taken || []),
    out = [];
  for (const c of cands) {
    if (!c) continue;
    const k = key(c);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(c);
    if (out.length >= n) break;
  }
  return out;
}

/* Câu tiếng Trung lưu dạng tách từ bằng dấu cách → hiển thị bằng zh(), lấy token bằng toks() */
const PUNCT = /^[，。！？、：；“”‘’…,.!?:;（）()《》—~～]+$/;
const zh = (s = '') => s.replace(/ /g, '');
const toks = (s = '') => s.split(' ').filter((t) => t && !PUNCT.test(t));
const hasHz = (s = '') => /[\u3400-\u9fff]/.test(s);
const hzStrip = (s = '') =>
  s.replace(/[\s，。！？、：；“”‘’…,.!?:;（）()《》—~～'"]/g, '');
const hzNorm = (s = '') => hzStrip(s).replace(/她/g, '他'); // 他/她 cùng âm tā → chấp nhận cả hai khi nghe

/* ---------- 2. Pinyin ---------- */
const TONE_CH = 'āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ';
const PV = 'aeiouüv' + TONE_CH;
const SYL_RE = new RegExp(
  `(?:zh|ch|sh|[bpmfdtnlgkhjqxrzcswy])?[${PV}]+(?:(?:ng|n)(?![${PV}]))?(?:r(?![${PV}]))?`,
  'g'
);
const toneOf = (syl = '') => {
  for (const c of syl.toLowerCase()) {
    const i = TONE_CH.indexOf(c);
    if (i >= 0) return (i % 4) + 1;
  }
  return 5;
};
const plainPy = (s = '') =>
  [...s]
    .map((c) => {
      const l = c.toLowerCase(),
        i = TONE_CH.indexOf(l);
      if (i < 0) return c;
      const b = 'aeiouü'[Math.floor(i / 4)];
      return c === l ? b : b.toUpperCase();
    })
    .join('');
function markSyl(syl, t) {
  // đặt dấu thanh theo quy tắc: a/e → ou → nguyên âm cuối
  syl = syl.replace(/v/g, 'ü').replace(/V/g, 'Ü');
  if (!(t >= 1 && t <= 4)) return syl;
  const low = syl.toLowerCase();
  let i = low.search(/[ae]/);
  if (i < 0) i = low.indexOf('ou');
  if (i < 0)
    for (let k = low.length - 1; k >= 0; k--)
      if ('iouü'.includes(low[k])) {
        i = k;
        break;
      }
  if (i < 0) return syl;
  const ch = TONE_CH['aeiouü'.indexOf(low[i]) * 4 + t - 1];
  return (
    syl.slice(0, i) +
    (syl[i] === low[i] ? ch : ch.toUpperCase()) +
    syl.slice(i + 1)
  );
}
const setTone = (syl, t) => markSyl(plainPy(syl), t);
const numToMark = (s = '') =>
  s
    .replace(/u:/gi, 'ü')
    .replace(/([a-zA-ZüÜ]+)([0-5])/g, (m, syl, t) => markSyl(syl, +t));
const PY_KEEP = new RegExp(`[^a-zü${TONE_CH}]`, 'g');
const pyKey = (s = '') =>
  numToMark(s.normalize('NFC'))
    .toLowerCase()
    .replace(/v/g, 'ü')
    .replace(PY_KEEP, '');
const noTone = (s = '') => plainPy(pyKey(s));
function mapSylls(py = '', fn) {
  const low = py.toLowerCase();
  let out = '',
    last = 0,
    i = 0,
    m;
  SYL_RE.lastIndex = 0;
  while ((m = SYL_RE.exec(low))) {
    out +=
      py.slice(last, m.index) +
      fn(py.slice(m.index, m.index + m[0].length), i++);
    last = m.index + m[0].length;
  }
  return out + py.slice(last);
}
const sylls = (py = '') => {
  const a = [];
  mapSylls(py, (s) => (a.push(s), s));
  return a;
};
const spokenTones = (sy) => {
  const t = sy.map(toneOf);
  for (let i = 0; i < t.length - 1; i++)
    if (t[i] === 3 && t[i + 1] === 3) t[i] = 2;
  return t;
};
const sandhiPy = (py = '') => {
  const t = spokenTones(sylls(py));
  return mapSylls(py, (s, i) => (t[i] !== toneOf(s) ? setTone(s, t[i]) : s));
};
const hzChars = (h = '') => [...h].filter((c) => /[\u3400-\u9fff〇]/.test(c));
const parsePyList = (s) =>
  s.split(' ').map((x) => {
    const [k, c, p] = x.split('|');
    return { k, c, p };
  });
const PY_INIT_L = parsePyList(PY_INIT),
  PY_FIN_L = parsePyList(PY_FIN);
const INITS = PY_INIT_L.map((x) => x.k).sort((a, b) => b.length - a.length);
const FINS = PY_FIN_L.map((x) => x.k).filter((f) => f !== 'er');
const CONF = [
  ['zh', 'z', 'j'],
  ['ch', 'c', 'q'],
  ['sh', 's', 'x'],
  ['b', 'p', 'm'],
  ['d', 't', 'n'],
  ['g', 'k', 'h'],
  ['n', 'l', 'r'],
  ['f', 'h'],
];
function splitIF(syl) {
  // tách thanh mẫu + vận mẫu (bỏ qua âm tiết không có thanh mẫu, y/w, âm cuốn lưỡi)
  const p = plainPy(syl).toLowerCase();
  if (/r$/.test(p)) return null;
  const ini = INITS.find((i) => p.startsWith(i));
  if (!ini || p.length === ini.length) return null;
  let fin = p.slice(ini.length);
  if ('jqx'.includes(ini) && fin[0] === 'u') fin = 'ü' + fin.slice(1);
  return FINS.includes(fin) ? [ini, fin] : null;
}

/* ---------- 3. Phát âm: Web Speech API (đọc), nhận dạng giọng nói, ghi âm ---------- */
const SPEECH = { rate: 1, voice: '' };
const ttsOK = () =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof window.SpeechSynthesisUtterance !== 'undefined';
let VOICES = [];
const refreshVoices = () => {
  try {
    VOICES = window.speechSynthesis.getVoices() || [];
  } catch (e) {
    VOICES = [];
  }
  return VOICES;
};
if (ttsOK()) {
  refreshVoices();
  try {
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
  } catch (e) {
    /* trình duyệt cũ */
  }
}
/* ===== PHẦN 2b/6 — tiếp nối ngay sau dòng `if (ttsOK()) { refreshVoices(); ... }` ===== */
const zhVoices = () =>
  (VOICES.length ? VOICES : refreshVoices()).filter(
    (v) =>
      /^(zh|cmn)/i.test(v.lang) || /chinese|mandarin|普通话|中文/i.test(v.name)
  );
function pickVoice(alt) {
  // ưu tiên giọng Phổ thông (zh-CN), tránh giọng Quảng Đông / Đài Loan
  const all = zhVoices(),
    md = all.filter((v) => !/HK|TW|yue|粤|台/i.test(`${v.lang} ${v.name}`)),
    pool = md.length ? md : all;
  if (!pool.length) return null;
  const main =
    pool.find((v) => v.voiceURI === SPEECH.voice) ||
    pool.find((v) => /zh[-_]CN/i.test(v.lang)) ||
    pool[0];
  return alt ? pool.find((v) => v !== main) || main : main;
}
let SEQ = 0; // mã phiên phát chuỗi; phát câu khác sẽ dừng chuỗi đang chạy
function speak(text, o = {}) {
  if (!ttsOK() || !text) return false;
  if (!o.seq) SEQ++;
  const s = window.speechSynthesis;
  try {
    s.cancel();
  } catch (e) {
    /* bỏ qua */
  }
  const u = new window.SpeechSynthesisUtterance(zh(text));
  u.lang = 'zh-CN';
  const v = pickVoice(o.alt);
  if (v) u.voice = v;
  u.rate = 0.9 * (o.rate || SPEECH.rate || 1); // 0,75x · 1x · 1,25x
  u.pitch = o.pitch || 1;
  if (o.onend) {
    u.onend = o.onend;
    u.onerror = o.onend;
  }
  s.speak(u);
  return true;
}
function speakSeq(items, onIdx, onDone) {
  // đọc lần lượt các câu hội thoại; vai B dùng giọng/cao độ khác
  if (!ttsOK() || !items.length) return () => {};
  const my = ++SEQ;
  let i = 0;
  const next = () => {
    if (my !== SEQ) return;
    if (i >= items.length) {
      onIdx && onIdx(-1);
      onDone && onDone();
      return;
    }
    const l = items[i],
      b = !!l.sp && l.sp !== (items[0].sp || 'A');
    onIdx && onIdx(i);
    speak(l.s, {
      seq: true,
      alt: b,
      pitch: b && zhVoices().length < 2 ? 1.3 : 1,
      onend: () => {
        i++;
        setTimeout(next, 450);
      },
    });
  };
  next();
  return () => {
    SEQ++;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      /* bỏ qua */
    }
    onIdx && onIdx(-1);
  };
}
const stopSpeak = () => {
  SEQ++;
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    /* bỏ qua */
  }
};
const getSR = () =>
  (typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)) ||
  null;
const canRecord = () =>
  typeof navigator !== 'undefined' &&
  !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) &&
  typeof window.MediaRecorder !== 'undefined';

/* So khớp chữ nhận dạng được với câu mẫu — CHỈ so văn bản, KHÔNG phải chấm điểm phát âm/thanh điệu */
function lcsMask(target, got) {
  const show = [...hzStrip(target)],
    A = [...hzNorm(target)],
    B = [...hzNorm(got)],
    n = A.length,
    m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] =
        A[i] === B[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const mask = new Array(n).fill(false);
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (A[i] === B[j]) {
      mask[i] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return {
    chars: show,
    mask,
    score: n ? Math.round((dp[0][0] / Math.max(n, m)) * 100) : 0,
  };
}

/* ---------- 4. Lưu trữ: localStorage (có dự phòng bộ nhớ tạm) + sao lưu ---------- */
const STORE_KEY = 'hsk-viet-v1';
let MEM_STORE = null;
const DEF_STATE = () => ({
  v: 1,
  profile: {
    onboarded: false,
    name: '',
    level: '0',
    goal: 'all',
    minutes: 30,
    start: Date.now(),
  },
  settings: {
    dark: false,
    py: true,
    vi: true,
    rate: 1,
    voice: '',
    flex: false,
    ai: '',
    dur: 30,
  },
  lessons: {},
  srs: {},
  mist: {},
  skills: {},
  hist: [],
  days: {},
  exams: [],
  wr: {},
  recent: [],
});
function mergeState(o) {
  const d = DEF_STATE();
  if (!o || typeof o !== 'object') return d;
  const obj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    ...d,
    profile: { ...d.profile, ...obj(o.profile) },
    settings: { ...d.settings, ...obj(o.settings) },
    lessons: obj(o.lessons),
    srs: obj(o.srs),
    mist: obj(o.mist),
    skills: obj(o.skills),
    days: obj(o.days),
    wr: obj(o.wr),
    hist: arr(o.hist),
    exams: arr(o.exams),
    recent: arr(o.recent),
  };
}
function storageOK() {
  try {
    const k = '__hsk_test';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}
function loadState() {
  let raw = null;
  try {
    raw = window.localStorage.getItem(STORE_KEY);
  } catch (e) {
    raw = MEM_STORE;
  }
  if (!raw) return DEF_STATE();
  try {
    return mergeState(JSON.parse(raw));
  } catch (e) {
    return DEF_STATE();
  }
}
function saveState(s) {
  const txt = JSON.stringify(s);
  MEM_STORE = txt;
  try {
    window.localStorage.setItem(STORE_KEY, txt);
    return true;
  } catch (e) {
    return false;
  }
}
const exportState = (s) =>
  JSON.stringify({
    app: 'hsk-viet',
    version: 1,
    exported: new Date().toISOString(),
    data: s,
  });
function importState(text) {
  const o = JSON.parse(text),
    data = o && o.app === 'hsk-viet' ? o.data : o;
  if (!data || typeof data !== 'object' || !data.profile || !data.settings)
    throw new Error('Tệp không đúng định dạng sao lưu của website.');
  return mergeState(data);
}
function downloadText(name, text) {
  try {
    const url = URL.createObjectURL(
      new Blob([text], { type: 'application/json' })
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------- 5. Ôn tập ngắt quãng (Spaced Repetition, biến thể SM-2) ---------- */
const MASTER_IV = 4; // khoảng ôn ≥ 4 ngày → tính là "đã thuộc"
const NEW_PER_DAY = { 15: 5, 30: 10, 45: 15, 60: 20 };
const srsNew = (now = Date.now()) => ({
  ef: 2.5,
  iv: 0,
  reps: 0,
  laps: 0,
  ok: 0,
  bad: 0,
  xok: 0,
  xbad: 0,
  due: now,
  seen: now,
  last: 0,
});
const badOf = (r) => (r ? (r.bad || 0) + (r.xbad || 0) : 0);
function srsGrade(rec, g, now = Date.now()) {
  // g: 0 = Chưa thuộc · 1 = Cần ôn tập · 2 = Đã thuộc
  const r = { ...srsNew(now), ...(rec || {}) },
    q = [1, 3, 5][g];
  r.ef = Math.max(
    1.3,
    Math.round((r.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)) * 100) / 100
  );
  if (g === 0) {
    r.iv = 0;
    r.reps = 0;
    r.laps++;
    r.bad++;
    r.due = now + 10 * 60e3;
  } // gặp lại sau 10 phút
  else {
    r.reps++;
    r.ok++;
    r.iv =
      g === 1
        ? r.iv < 1
          ? 1
          : Math.round(r.iv * 1.2 + 0.5)
        : r.iv < 1
        ? 1
        : r.iv < 3
        ? 3
        : Math.round(r.iv * r.ef);
    r.due = now + r.iv * DAY;
  }
  r.last = now;
  r.lg = g;
  return r;
}
const srsStatus = (r, now = Date.now()) =>
  !r ? 'new' : r.due <= now ? 'due' : r.iv >= MASTER_IV ? 'known' : 'learning';
const SRS_LABEL = {
  new: 'Chưa học',
  due: 'Cần ôn',
  learning: 'Đang học',
  known: 'Đã thuộc',
};

/* ---------- 6. Chỉ mục nội dung (đọc dữ liệu Phần 1) ---------- */
const WORDS = {},
  LESSONS = [],
  LESSON_BY = {},
  WEEKS = [];
const splitLines = (s = '') =>
  s
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
const parseDlg = (s = '') =>
  splitLines(s).map((l) => {
    const [sp, t, py, vi] = l.split('|');
    return { sp, s: t, py, vi };
  });
HSK1_WEEKS.forEach((W) => {
  const wk = { w: W.w, t: W.t, lessons: [] };
  W.ls.forEach((L, i) => {
    const id = `1.${W.w}.${i + 1}`,
      words = [],
      fresh = [];
    splitLines(L.v).forEach((ln) => {
      const f = ln.split('|');
      if (f.length === 1) {
        if (WORDS[f[0]]) words.push(f[0]);
        return;
      } // từ nhắc lại từ bài trước
      const [h, py, vi, pos, ex, exPy, exVi, em] = f;
      if (!WORDS[h]) {
        WORDS[h] = {
          id: h,
          h,
          py,
          vi,
          pos,
          ex,
          exPy,
          exVi,
          em: em || '',
          lv: 1,
          src: 'hsk1',
          les: id,
          w: W.w,
          topic: W.t,
        };
        fresh.push(h);
      }
      words.push(h);
    });
    const les = {
      id,
      lv: 1,
      w: W.w,
      i: i + 1,
      t: L.t,
      type: 'learn',
      g: L.g,
      words: uniq(words),
      fresh,
      dlg: parseDlg(L.d),
    };
    LESSONS.push(les);
    wk.lessons.push(les);
  });
  const rv = {
    id: `1.${W.w}.${W.ls.length + 1}`,
    lv: 1,
    w: W.w,
    i: W.ls.length + 1,
    t: `Ôn tập và kiểm tra cuối tuần ${W.w}`,
    type: 'review',
    wk: [W.w, W.w],
  };
  LESSONS.push(rv);
  wk.lessons.push(rv);
  WEEKS.push(wk);
});
[
  [9, 'Tổng hợp từ vựng, ngữ pháp, luyện hội thoại', HSK1_W9],
  [10, 'Ôn tập toàn bộ và kiểm tra cuối cấp', HSK1_W10],
].forEach(([w, t, arr]) => {
  const wk = { w, t, lessons: [] };
  arr.forEach((L, i) => {
    const les = { ...L, id: `1.${w}.${i + 1}`, lv: 1, w, i: i + 1 };
    LESSONS.push(les);
    wk.lessons.push(les);
  });
  WEEKS.push(wk);
});
LESSONS.forEach((l, k) => {
  l.idx = k;
  LESSON_BY[l.id] = l;
});
const HSK1_WORDS = Object.values(WORDS); // chụp lại trước khi thêm từ giao tiếp
const GR_LES = {};
LESSONS.forEach((l) => {
  if (l.type === 'learn' && !GR_LES[l.g]) GR_LES[l.g] = l;
});
const learnIn = (a, b) =>
  LESSONS.filter((l) => l.type === 'learn' && l.w >= a && l.w <= b);

const COMM_DATA = COMM.map((c, i) => {
  const dlg = parseDlg(c.d);
  const words = c.w.split(';').map((x) => {
    const [h, py, vi] = x.split('|');
    if (!WORDS[h]) {
      // câu ví dụ lấy từ hội thoại của tình huống
      const l = dlg.find((d) => zh(d.s).includes(h)) || {};
      WORDS[h] = {
        id: h,
        h,
        py,
        vi,
        pos: '',
        ex: l.s || '',
        exPy: l.py || '',
        exVi: l.vi || '',
        em: '',
        lv: 0,
        src: 'comm',
        ci: i,
        topic: c.t,
      };
    }
    return h;
  });
  return { ...c, i, dlg, words };
});
const WORD_LIST = Object.values(WORDS);
const TOPICS = uniq(WORD_LIST.map((w) => w.topic));
const READ_DATA = READ.map((r, i) => ({
  ...r,
  i,
  lines: r.s.map((x) => {
    const [s, py, vi] = x.split('|');
    return { s, py, vi };
  }),
}));

/* ---------- 7. Bài học: ngưỡng đạt, mở khóa, nội dung ---------- */
const PASS = { learn: 80, synth: 80, review: 75, final: 80 }; // ngưỡng NỘI BỘ của website, không phải điểm đỗ HSK
const DUR_LIST = [15, 30, 45, 60];
const DUR_N = { 15: [6, 10], 30: [10, 12], 45: [14, 15], 60: [18, 20] }; // [câu luyện tập, câu kiểm tra cuối bài]
const WEEK_N = { 15: 20, 30: 25, 45: 30, 60: 40 }; // số câu kiểm tra cuối tuần
const TYPE_LABEL = {
  learn: 'Bài học',
  review: 'Ôn tập & kiểm tra tuần',
  synth: 'Tổng hợp',
  final: 'Kiểm tra cuối cấp',
};
const isUnlocked = (st, l) =>
  l.idx === 0 || !!st.lessons[LESSONS[l.idx - 1].id]?.passed;
const canOpen = (st, l) => !!st.settings.flex || isUnlocked(st, l);
function lessonStatus(st, l) {
  const r = st.lessons[l.id];
  if (r?.passed) return 'passed';
  if (r?.att) return 'failed';
  if (isUnlocked(st, l)) return 'open';
  return st.settings.flex ? 'flex' : 'locked';
}
const currentLesson = (st) =>
  LESSONS.find((l) => !st.lessons[l.id]?.passed) || LESSONS[LESSONS.length - 1];
const lessonWords = (l) =>
  l.type === 'learn'
    ? l.words
    : uniq(learnIn(l.wk[0], l.wk[1]).flatMap((x) => x.words));
const lessonGrams = (l) =>
  l.type === 'learn' ? [l.g] : uniq(learnIn(l.wk[0], l.wk[1]).map((x) => x.g));
const lessonDlgs = (l) =>
  l.type === 'learn'
    ? [{ t: l.t, lines: l.dlg }]
    : learnIn(l.wk[0], l.wk[1]).map((x) => ({ t: x.t, lines: x.dlg }));
function lessonGoals(l) {
  if (l.type === 'learn') {
    const g = GR[l.g];
    return [
      `Đọc đúng, hiểu nghĩa và dùng được ${
        l.fresh.length
      } từ mới: ${l.fresh.join('、')}`,
      `Nắm cấu trúc “${g.t}”: ${g.f}`,
      `Nghe hiểu và nói được hội thoại “${l.t}”`,
      `Đạt từ ${PASS.learn}% bài kiểm tra cuối bài`,
    ];
  }
  if (l.type === 'review')
    return [
      `Ôn toàn bộ từ vựng, ngữ pháp và hội thoại tuần ${l.w}`,
      'Ôn lại các từ đến hạn của những tuần trước',
      `Đạt từ ${PASS.review}% bài kiểm tra cuối tuần (20–40 câu)`,
    ];
  if (l.type === 'final')
    return [
      'Đánh giá tổng hợp HSK 1: nghe, đọc, từ vựng, ngữ pháp (40 câu, 40 phút)',
      `Đạt từ ${PASS.final}% và không kỹ năng nào dưới 60%`,
      'Ngưỡng nội bộ của website — không phải điểm đỗ HSK chính thức',
    ];
  return [
    `${l.t} (phạm vi tuần ${l.wk[0]}–${l.wk[1]})`,
    'Củng cố kiến thức đã học bằng nhiều dạng bài tập',
    `Đạt từ ${PASS.synth}% bài kiểm tra`,
  ];
}

/* ---------- 8. Kho nội dung để sinh câu hỏi — chỉ dùng kiến thức đã học ---------- */
function makePool(ids, all = false) {
  const set = new Set(ids),
    ls = LESSONS.filter((l) => l.type === 'learn' && set.has(l.id));
  const words = uniq(ls.flatMap((l) => l.words))
    .map((h) => WORDS[h])
    .filter(Boolean);
  const gram = uniq(ls.map((l) => l.g)).filter((g) => GR[g]);
  const dlgs = ls
    .filter((l) => l.dlg.length)
    .map((l) => ({ t: l.t, lines: l.dlg, les: l.id }));
  const sents = [];
  words.forEach(
    (w) => w.ex && sents.push({ s: w.ex, py: w.exPy, vi: w.exVi, ref: w.id })
  );
  dlgs.forEach((d) =>
    d.lines.forEach((x) =>
      sents.push({ s: x.s, py: x.py, vi: x.vi, ref: d.les })
    )
  );
  gram.forEach((g) =>
    GR[g].x.forEach((x) => {
      const [s, py, vi] = x.split('|');
      sents.push({ s, py, vi, ref: 'g:' + g });
    })
  );
  return {
    words,
    gram,
    dlgs,
    sents: pickDistinct(sents, 1e4, (x) => zh(x.s)),
    all,
  };
}
let POOL_ALL = null;
const poolAll = () =>
  POOL_ALL ||
  (POOL_ALL = makePool(
    learnIn(1, 99).map((l) => l.id),
    true
  ));
const lessonPool = (l) =>
  l.type === 'learn'
    ? makePool([l.id])
    : makePool(
        learnIn(l.wk[0], l.wk[1]).map((x) => x.id),
        l.wk[0] === 1 && l.wk[1] >= 8
      );
function learnedIds(st) {
  // bài đã làm hoặc đã xem hết từ mới; mặc định 2 bài đầu
  const ids = LESSONS.filter(
    (l) =>
      l.type === 'learn' &&
      (st.lessons[l.id] || (l.fresh.length && l.fresh.every((h) => st.srs[h])))
  ).map((l) => l.id);
  return ids.length
    ? ids
    : learnIn(1, 1)
        .slice(0, 2)
        .map((l) => l.id);
}
const poolLearned = (st) => makePool(learnedIds(st));
function poolComm(i) {
  const c = COMM_DATA[i];
  return {
    words: c.words.map((h) => WORDS[h]).filter(Boolean),
    gram: [],
    dlgs: [{ t: c.t, lines: c.dlg, les: 'c:' + i }],
    sents: c.dlg.map((l) => ({ s: l.s, py: l.py, vi: l.vi, ref: 'c:' + i })),
    all: false,
  };
}
function coverage(r, P) {
  // tỉ lệ từ của bài đọc nằm trong phạm vi đã học
  const set = new Set(P.words.map((w) => w.h)),
    t = r.lines.flatMap((l) => toks(l.s));
  return t.filter((x) => set.has(x)).length / Math.max(1, t.length);
}
const speakList = (P) =>
  P.sents.filter((x) => toks(x.s).length >= 1 && toks(x.s).length <= 10);

/* ========================= HẾT PHẦN 2b ========================= */
/* ===== PHẦN 2c/6 — dán ngay sau Phần 2b ===== */

/* Cấu trúc câu hỏi dùng chung:
   kind: "mc" | "order" | "type" | "match" | "combo" · tp: mã dạng bài · sk: kỹ năng · title: yêu cầu đề
   prompt · vi (prompt là tiếng Việt) · py (Pinyin, ẩn/hiện theo cài đặt) · pyForce (luôn hiện) · sub (gợi ý)
   audio (câu cần phát) · dialog [{sp,s,py,vi}] · emoji · passage (chỉ số bài đọc) · bad (câu sai cần sửa) · big / bigOpts
   mc: opts [{t, py?, ok, emo?}], ans · order: tokens, target, extra, big, full · type: input ("py"|"any"), accept, acceptPy
   match: pairs [[trái, phải]], emoLeft · combo: inis, fins, ans · exp: giải thích · key: khóa ổn định · ref/refs: từ liên quan */

/* ---------- 9. Hàm dựng câu hỏi ---------- */
function mc(o) {
  const opts = o.opts.map((x, i) =>
    typeof x === 'string'
      ? { t: x, ok: i === 0 }
      : { ...x, ok: x.ok === undefined ? i === 0 : !!x.ok }
  );
  const arr = o.keep ? opts : shuffle(opts);
  return {
    ...o,
    id: uid(),
    kind: 'mc',
    opts: arr,
    ans: arr.findIndex((x) => x.ok),
  };
}
function distractors(P, w, n, key, ok = () => true) {
  // ưu tiên từ trong phạm vi đã học
  const a = shuffle(P.words.filter((x) => x.id !== w.id && ok(x)));
  const b =
    a.length >= n + 2
      ? []
      : shuffle(HSK1_WORDS.filter((x) => x.id !== w.id && ok(x)));
  return pickDistinct([...a, ...b], n, key, [key(w)]);
}
const sameSound = (a, b) => pyKey(a.py) === pyKey(b.py);
const blank = (s, h) =>
  zh(
    s
      .split(' ')
      .map((t) => (t === h ? '＿＿' : t))
      .join(' ')
  );
const charPairs = (w) => {
  const c = hzChars(w.h),
    s = sylls(w.py);
  return c.length === s.length ? c.map((x, i) => [x, s[i]]) : [];
};
const SAFE = (c) => !POLY.has(c) && !'不一'.includes(c);
const SYN_OF = {};
SYN.split(' ').forEach((p) => {
  const [a, b] = p.split('-');
  SYN_OF[a] = b;
  SYN_OF[b] = a;
});
const ANT_PAIRS = [
  ...ANT.split(' ').map((p) => [...p.split('-'), 'ant']),
  ...SYN.split(' ').map((p) => [...p.split('-'), 'syn']),
];
const okSent = (x, min = 3, max = 8) => {
  const t = toks(x.s);
  return t.length >= min && t.length <= max && !/[，、：；]/.test(x.s);
};
const qaPairs = (P) => {
  const out = [];
  P.dlgs.forEach((d) =>
    d.lines.forEach((l, i) => {
      const n = d.lines[i + 1];
      if (n && /？$/.test(zh(l.s)) && n.sp !== l.sp) out.push([l, n]);
    })
  );
  return out;
};
const reorder = (t) => {
  let s = shuffle(t);
  for (let g = 0; g < 9 && s.join('|') === t.join('|'); g++) s = shuffle(t);
  return s;
};
function gramQ(g, i, tp = 'gq') {
  const f = GR[g].q[i].split('|'),
    exp = f[f.length - 1],
    [p, ...opts] = f.slice(0, -1);
  return mc({
    tp,
    sk: 'grammar',
    title: p.includes('___')
      ? 'Chọn từ đúng điền vào chỗ trống'
      : `Ngữ pháp · ${GR[g].t}`,
    prompt: p.replace(/___/g, '＿＿'),
    vi: !hasHz(p),
    opts,
    exp,
    key: `g:${g}:${i}`,
    ref: 'g:' + g,
  });
}

/* ---------- 10. Bộ sinh câu hỏi theo từng dạng bài ---------- */
const GEN = {
  vm(P) {
    // xem chữ Hán → chọn nghĩa
    const w = pick(P.words);
    if (!w) return null;
    const ds = distractors(P, w, 3, (x) => x.vi);
    if (ds.length < 2) return null;
    return mc({
      tp: 'vm',
      sk: 'vocab',
      title: 'Chọn nghĩa đúng của từ',
      prompt: w.h,
      py: w.py,
      audio: w.h,
      big: true,
      opts: [w.vi, ...ds.map((x) => x.vi)],
      exp: `${w.h} (${w.py}) · ${POS[w.pos] || 'từ'}: ${w.vi}`,
      key: `vm:${w.id}`,
      ref: w.id,
    });
  },
  mv(P) {
    // xem nghĩa → chọn chữ Hán
    const w = pick(P.words);
    if (!w) return null;
    const ds = distractors(
      P,
      w,
      3,
      (x) => x.h,
      (x) => x.vi !== w.vi
    );
    if (ds.length < 2) return null;
    return mc({
      tp: 'mv',
      sk: 'vocab',
      title: 'Chọn chữ Hán đúng với nghĩa',
      prompt: `“${w.vi}”`,
      vi: true,
      bigOpts: true,
      opts: [
        { t: w.h, py: w.py, ok: true },
        ...ds.map((x) => ({ t: x.h, py: x.py })),
      ],
      exp: `${w.h} (${w.py}): ${w.vi}`,
      key: `mv:${w.id}`,
      ref: w.id,
    });
  },
  lm(P) {
    // nghe → chọn nghĩa (loại từ đồng âm như 他/她)
    const w = pick(P.words);
    if (!w) return null;
    const ds = distractors(
      P,
      w,
      3,
      (x) => x.vi,
      (x) => !sameSound(x, w)
    );
    if (ds.length < 2) return null;
    return mc({
      tp: 'lm',
      sk: 'listen',
      title: 'Nghe và chọn nghĩa đúng',
      audio: w.h,
      opts: [w.vi, ...ds.map((x) => x.vi)],
      exp: `${w.h} (${w.py}): ${w.vi}`,
      key: `lm:${w.id}`,
      ref: w.id,
    });
  },
  hz(P) {
    // A4: nghe → chọn chữ Hán
    const w = pick(P.words);
    if (!w) return null;
    const ds = distractors(
      P,
      w,
      3,
      (x) => x.h,
      (x) => !sameSound(x, w)
    );
    if (ds.length < 2) return null;
    return mc({
      tp: 'hz',
      sk: 'listen',
      title: 'Nghe và chọn chữ Hán đúng',
      audio: w.h,
      bigOpts: true,
      opts: [w.h, ...ds.map((x) => x.h)],
      exp: `${w.h} (${w.py}): ${w.vi}`,
      key: `hz:${w.id}`,
      ref: w.id,
    });
  },
  tone(P) {
    // A1: nghe một chữ → chọn thanh điệu (bỏ chữ đa âm, 不, 一)
    const c = P.words.flatMap((w) =>
      charPairs(w)
        .filter(([ch, s]) => SAFE(ch) && toneOf(s) < 5)
        .map(([ch, s]) => [ch, s, w])
    );
    if (!c.length) return null;
    const [ch, s, w] = pick(c),
      t = toneOf(s),
      base = plainPy(s).toLowerCase();
    return mc({
      tp: 'tone',
      sk: 'pron',
      title: 'Nghe và chọn thanh điệu đúng',
      audio: ch,
      keep: true,
      opts: [1, 2, 3, 4].map((k) => ({
        t: `Thanh ${k} · ${markSyl(base, k)}`,
        ok: k === t,
      })),
      exp: `${ch} đọc là ${s.toLowerCase()} — thanh ${t} (${
        PY_TONES[t - 1][3]
      }). ${PY_TONES[t - 1][4]}`,
      key: `tone:${ch}`,
      ref: w.id,
    });
  },
  py(P) {
    // A2: nghe → chọn Pinyin; phương án nhiễu khác thanh nhưng không trùng cách đọc thực tế (biến điệu 3+3)
    const ws = P.words.filter((w) => sylls(w.py).length && !/[不一]/.test(w.h));
    if (!ws.length) return null;
    const w = pick(ws),
      sy = sylls(w.py),
      seen = new Set([pyKey(sandhiPy(w.py))]),
      opts = [{ t: w.py, ok: true }];
    for (let g = 0; g < 40 && opts.length < 4; g++) {
      const i = rnd(sy.length),
        t0 = toneOf(sy[i]);
      if (t0 === 5) continue;
      const nt = pick([1, 2, 3, 4].filter((k) => k !== t0)),
        v = mapSylls(w.py, (s, k) => (k === i ? setTone(s, nt) : s)),
        k = pyKey(sandhiPy(v));
      if (!seen.has(k)) {
        seen.add(k);
        opts.push({ t: v });
      }
    }
    distractors(P, w, 6, (x) => x.py).forEach((x) => {
      const k = pyKey(sandhiPy(x.py));
      if (opts.length < 4 && !seen.has(k)) {
        seen.add(k);
        opts.push({ t: x.py });
      }
    });
    if (opts.length < 3) return null;
    const sp = sandhiPy(w.py);
    return mc({
      tp: 'py',
      sk: 'pron',
      title: 'Nghe và chọn Pinyin đúng',
      audio: w.h,
      opts,
      exp: `${w.h} = ${w.py} (${w.vi})${
        sp !== w.py ? ` — khi nói đọc thành ${sp} do biến điệu 3 + 3` : ''
      }`,
      key: `py:${w.id}`,
      ref: w.id,
    });
  },
  combo(P) {
    // A3: nghe → ghép thanh mẫu + vận mẫu
    const c = P.words.flatMap((w) =>
      charPairs(w).filter(([ch, s]) => SAFE(ch) && toneOf(s) < 5 && splitIF(s))
    );
    if (!c.length) return null;
    const [ch, s] = pick(c),
      [ini, fin] = splitIF(s),
      near = uniq(CONF.filter((g) => g.includes(ini)).flat());
    const core = (f) => f.replace(/n?g?$/, ''),
      nf = FINS.filter(
        (f) => f !== fin && (f[0] === fin[0] || core(f) === core(fin))
      );
    return {
      id: uid(),
      kind: 'combo',
      tp: 'combo',
      sk: 'pron',
      title: 'Nghe rồi ghép thanh mẫu với vận mẫu',
      audio: ch,
      inis: shuffle([
        ini,
        ...pickDistinct([...shuffle(near), ...shuffle(INITS)], 3, (x) => x, [
          ini,
        ]),
      ]),
      fins: shuffle([
        fin,
        ...pickDistinct([...shuffle(nf), ...shuffle(FINS)], 3, (x) => x, [fin]),
      ]),
      ans: [ini, fin],
      exp: `${ch} = ${s.toLowerCase()}: thanh mẫu “${ini}” + vận mẫu “${fin}”, thanh ${toneOf(
        s
      )}.`,
      key: `combo:${ch}`,
    };
  },
  fillpy(P) {
    // A5: nghe → điền âm tiết Pinyin còn thiếu (chấp nhận cả dạng biến điệu khi nói)
    const ws = P.words.filter((w) => sylls(w.py).length);
    if (!ws.length) return null;
    const w = pick(ws),
      sy = sylls(w.py),
      i = rnd(sy.length),
      sp = spokenTones(sy)[i];
    const acc = uniq([sy[i], setTone(sy[i], sp)].map((x) => x.toLowerCase()));
    return {
      id: uid(),
      kind: 'type',
      tp: 'fillpy',
      sk: 'pron',
      title: 'Nghe và điền âm tiết Pinyin còn thiếu',
      prompt: w.h,
      big: true,
      pyForce: mapSylls(w.py, (s, k) => (k === i ? '＿＿' : s)),
      audio: w.h,
      input: 'py',
      accept: acc,
      exp: `${w.h} = ${w.py} (${w.vi}). Âm tiết cần điền: ${sy[
        i
      ].toLowerCase()}${
        acc.length > 1 ? ` (khi nói đọc thành ${acc[1]})` : ''
      }. Có thể gõ số thanh, ví dụ hao3.`,
      key: `fillpy:${w.id}:${i}`,
      ref: w.id,
    };
  },
  matchm(P) {
    // B9: ghép từ với nghĩa
    const ws = pickDistinct(shuffle(P.words), 5, (x) => x.vi);
    if (ws.length < 3) return null;
    return {
      id: uid(),
      kind: 'match',
      tp: 'matchm',
      sk: 'vocab',
      title: 'Ghép từ với nghĩa tương ứng',
      pairs: ws.map((w) => [w.h, w.vi]),
      exp: ws.map((w) => `${w.h} (${w.py}) – ${w.vi}`).join(' · '),
      key: `matchm:${ws
        .map((w) => w.id)
        .sort()
        .join('')}`,
      refs: ws.map((w) => w.id),
    };
  },
  matchi(P) {
    // B10: ghép hình (emoji) với từ
    const ws = pickDistinct(
      shuffle(P.words.filter((w) => w.em)),
      5,
      (x) => x.em
    );
    if (ws.length < 3) return null;
    return {
      id: uid(),
      kind: 'match',
      tp: 'matchi',
      sk: 'vocab',
      title: 'Ghép hình với từ',
      emoLeft: true,
      pairs: ws.map((w) => [w.em, w.h]),
      exp: ws.map((w) => `${w.em} ${w.h} (${w.py}) – ${w.vi}`).join(' · '),
      key: `matchi:${ws
        .map((w) => w.id)
        .sort()
        .join('')}`,
      refs: ws.map((w) => w.id),
    };
  },
  ant(P) {
    // B11: trái nghĩa / gần nghĩa (chỉ khi cả hai từ đã học)
    const ids = new Set(P.words.map((w) => w.id)),
      prs = ANT_PAIRS.filter(([a, b]) => ids.has(a) && ids.has(b));
    if (!prs.length) return null;
    let [a, b, k] = pick(prs);
    if (rnd(2)) [a, b] = [b, a];
    const wa = WORDS[a],
      wb = WORDS[b],
      bad = new Set(
        ANT_PAIRS.filter((p) => p.includes(a)).flatMap((p) => p.slice(0, 2))
      );
    const ds = distractors(
      P,
      wb,
      3,
      (x) => x.h,
      (x) => !bad.has(x.id)
    );
    if (ds.length < 2) return null;
    return mc({
      tp: 'ant',
      sk: 'vocab',
      title: k === 'ant' ? 'Chọn từ TRÁI NGHĨA' : 'Chọn từ GẦN NGHĨA',
      prompt: wa.h,
      py: wa.py,
      sub: wa.vi,
      big: true,
      opts: [
        { t: wb.h, py: wb.py, ok: true },
        ...ds.map((x) => ({ t: x.h, py: x.py })),
      ],
      exp: `${wa.h} (${wa.vi}) ${k === 'ant' ? '↔' : '≈'} ${wb.h} (${wb.vi})`,
      key: `ant:${a}`,
      ref: a,
    });
  },
  fillw(P) {
    // B12: điền từ vào câu (có bản dịch để đáp án là duy nhất)
    const ws = P.words.filter((w) => w.ex && toks(w.ex).includes(w.h));
    if (!ws.length) return null;
    const w = pick(ws),
      inS = new Set(toks(w.ex));
    let ds = distractors(
      P,
      w,
      3,
      (x) => x.h,
      (x) => x.pos === w.pos && !inS.has(x.h) && SYN_OF[w.h] !== x.h
    );
    if (ds.length < 3)
      ds = distractors(
        P,
        w,
        3,
        (x) => x.h,
        (x) => !inS.has(x.h) && SYN_OF[w.h] !== x.h
      );
    if (ds.length < 2) return null;
    return mc({
      tp: 'fillw',
      sk: 'vocab',
      title: 'Điền từ thích hợp vào chỗ trống',
      prompt: blank(w.ex, w.h),
      sub: w.exVi,
      opts: [
        { t: w.h, py: w.py, ok: true },
        ...ds.map((x) => ({ t: x.h, py: x.py })),
      ],
      exp: `${zh(w.ex)} — ${w.exPy} (${w.exVi})`,
      key: `fillw:${w.id}`,
      ref: w.id,
    });
  },
  lfill(P) {
    // D24: nghe câu → chọn từ còn thiếu (không hiện Pinyin phương án)
    const ws = P.words.filter((w) => w.ex && toks(w.ex).includes(w.h));
    if (!ws.length) return null;
    const w = pick(ws),
      inS = new Set(toks(w.ex));
    const ds = distractors(
      P,
      w,
      3,
      (x) => x.h,
      (x) => !inS.has(x.h) && !sameSound(x, w)
    );
    if (ds.length < 2) return null;
    return mc({
      tp: 'lfill',
      sk: 'listen',
      title: 'Nghe câu và chọn từ còn thiếu',
      prompt: blank(w.ex, w.h),
      audio: w.ex,
      bigOpts: true,
      opts: [w.h, ...ds.map((x) => x.h)],
      exp: `${zh(w.ex)} — ${w.exPy} (${w.exVi})`,
      key: `lfill:${w.id}`,
      ref: w.id,
    });
  },
  order(P) {
    // C15: sắp xếp từ thành câu
    const cs = P.sents.filter(
      (x) => okSent(x) && new Set(toks(x.s)).size === toks(x.s).length
    );
    if (!cs.length) return null;
    const x = pick(cs),
      t = toks(x.s);
    return {
      id: uid(),
      kind: 'order',
      tp: 'order',
      sk: 'grammar',
      title: 'Sắp xếp các từ thành câu đúng',
      sub: x.vi,
      tokens: reorder(t),
      target: t,
      full: x,
      exp: `${zh(x.s)} — ${x.py}`,
      key: `order:${zh(x.s)}`,
      ref: x.ref,
    };
  },
  tr(P) {
    // C21: dịch Việt → Trung bằng thẻ từ (có 2 từ thừa)
    const cs = P.sents.filter((x) => okSent(x));
    if (!cs.length) return null;
    const x = pick(cs),
      t = toks(x.s);
    const ex = pickDistinct(shuffle(P.words.map((w) => w.h)), 2, (h) => h, [
      ...t,
      ...t.map((y) => SYN_OF[y]).filter(Boolean),
    ]);
    return {
      id: uid(),
      kind: 'order',
      tp: 'tr',
      sk: 'write',
      title: 'Dịch sang tiếng Trung: chọn và sắp xếp từ (có từ thừa)',
      prompt: x.vi,
      vi: true,
      tokens: shuffle([...t, ...ex]),
      target: t,
      extra: ex.length,
      full: x,
      exp: `${zh(x.s)} — ${x.py}`,
      key: `tr:${zh(x.s)}`,
      ref: x.ref,
    };
  },
  part(P) {
    // C16: điền trợ từ / lượng từ
    const items = [];
    P.gram
      .filter((g) => GR[g].pt)
      .forEach((g) =>
        GR[g].q.forEach((q, i) => {
          if (q.split('|')[0].includes('___'))
            items.push(() => gramQ(g, i, 'part'));
        })
      );
    P.words
      .filter(
        (w) =>
          (w.pos === 'u' || w.pos === 'q') && w.ex && toks(w.ex).includes(w.h)
      )
      .forEach((w) =>
        items.push(() => {
          const ds = distractors(
            P,
            w,
            3,
            (x) => x.h,
            (x) => x.pos === w.pos && !toks(w.ex).includes(x.h)
          );
          if (ds.length < 2) return null;
          return mc({
            tp: 'part',
            sk: 'grammar',
            title:
              w.pos === 'u'
                ? 'Điền trợ từ thích hợp'
                : 'Điền lượng từ thích hợp',
            prompt: blank(w.ex, w.h),
            sub: w.exVi,
            opts: [
              { t: w.h, py: w.py, ok: true },
              ...ds.map((x) => ({ t: x.h, py: x.py })),
            ],
            exp: `${zh(w.ex)} — ${w.exPy}. ${w.h}: ${w.vi}`,
            key: `part:${w.id}`,
            ref: w.id,
          });
        })
      );
    return items.length ? pick(items)() : null;
  },
  gq(P) {
    // C20: chọn cấu trúc ngữ pháp đúng
    const it = P.gram.flatMap((g) => GR[g].q.map((_, i) => [g, i]));
    if (!it.length) return null;
    const [g, i] = pick(it);
    return gramQ(g, i, 'gq');
  },
  err(P) {
    // C17: tìm câu sai
    const gs = P.gram.filter((g) => GR[g].m);
    if (!gs.length) return null;
    const g = pick(gs),
      [wr, rt, note] = GR[g].m.split('|');
    const ds = pickDistinct(
      shuffle(P.sents.filter((x) => okSent(x, 3, 9))),
      3,
      (x) => zh(x.s),
      [zh(rt), zh(wr)]
    );
    if (ds.length < 3) return null;
    return mc({
      tp: 'err',
      sk: 'grammar',
      title: 'Câu nào SAI ngữ pháp?',
      bigOpts: true,
      opts: [{ t: zh(wr), ok: true }, ...ds.map((x) => ({ t: zh(x.s) }))],
      exp: `Câu sai: ${zh(wr)} → Câu đúng: ${zh(rt)}. ${note}`,
      key: `err:${g}`,
      ref: 'g:' + g,
    });
  },
  fix(P) {
    // C18: sửa câu sai — chọn đúng thẻ từ (bỏ từ thừa) và sắp xếp lại
    const gs = P.gram.filter((g) => GR[g].m);
    if (!gs.length) return null;
    const g = pick(gs),
      [wr, rt, note] = GR[g].m.split('|'),
      t = toks(rt),
      cnt = {};
    t.forEach((x) => {
      cnt[x] = (cnt[x] || 0) + 1;
    });
    const extra = toks(wr).filter((x) => (cnt[x] ? (cnt[x]--, false) : true));
    return {
      id: uid(),
      kind: 'order',
      tp: 'fix',
      sk: 'grammar',
      title: 'Sửa câu sai: chọn và sắp xếp lại các từ (có thể bỏ bớt từ)',
      prompt: zh(wr),
      bad: true,
      tokens: reorder([...t, ...extra]),
      target: t,
      extra: extra.length,
      full: { s: rt },
      exp: `Câu đúng: ${zh(rt)}. ${note}`,
      key: `fix:${g}`,
      ref: 'g:' + g,
    };
  },
  qa(P) {
    // C19: nối câu hỏi với câu trả lời
    const ps = pickDistinct(
      pickDistinct(shuffle(qaPairs(P)), 99, (p) => zh(p[0].s)),
      4,
      (p) => zh(p[1].s)
    );
    if (ps.length < 3) return null;
    return {
      id: uid(),
      kind: 'match',
      tp: 'qa',
      sk: 'read',
      title: 'Nối câu hỏi với câu trả lời phù hợp',
      pairs: ps.map(([a, b]) => [zh(a.s), zh(b.s)]),
      exp: ps.map(([a, b]) => `${zh(a.s)} → ${zh(b.s)}`).join(' · '),
      key: `qa:${ps
        .map(([a]) => zh(a.s))
        .sort()
        .join('')
        .slice(0, 40)}`,
    };
  },
  dlg(P) {
    // D22: nghe hội thoại → chọn nghĩa câu cuối
    const ds = P.dlgs.filter((d) => d.lines.length >= 2);
    if (!ds.length) return null;
    const d = pick(ds),
      last = d.lines[d.lines.length - 1];
    const others = pickDistinct(
      shuffle([
        ...P.dlgs.filter((x) => x !== d).flatMap((x) => x.lines),
        ...P.sents,
      ]),
      3,
      (x) => x.vi,
      [last.vi]
    );
    if (others.length < 2) return null;
    return mc({
      tp: 'dlg',
      sk: 'listen',
      title: 'Nghe hội thoại: câu cuối cùng có nghĩa là gì?',
      dialog: d.lines,
      opts: [last.vi, ...others.map((x) => x.vi)],
      exp: d.lines.map((l) => `${l.sp}: ${zh(l.s)} (${l.vi})`).join(' / '),
      key: `dlg:${zh(last.s)}`,
      ref: d.les,
    });
  },
  dict(P) {
    // D23: nghe chép chính tả (chữ Hán hoặc Pinyin có thanh)
    const it = [
      ...P.words.map((w) => ({ s: w.h, py: w.py, vi: w.vi, ref: w.id })),
      ...P.sents.filter((x) => okSent(x, 2, 5)),
    ];
    if (!it.length) return null;
    const x = pick(it);
    return {
      id: uid(),
      kind: 'type',
      tp: 'dict',
      sk: 'listen',
      title: 'Nghe và chép chính tả (gõ chữ Hán, hoặc Pinyin có thanh điệu)',
      audio: x.s,
      input: 'any',
      accept: [zh(x.s)],
      acceptPy: [x.py],
      exp: `${zh(x.s)} — ${x.py} (${x.vi})`,
      key: `dict:${zh(x.s)}`,
      ref: x.ref,
    };
  },
  read(P) {
    // D25: đọc đoạn văn (chỉ chọn bài có ≥ 60% từ đã học)
    const ps = READ_DATA.filter((r) => P.all || coverage(r, P) >= 0.6);
    if (!ps.length) return null;
    const r = pick(ps),
      qi = rnd(r.q.length),
      [q, a, d1, d2, exp] = r.q[qi].split('|');
    return mc({
      tp: 'read',
      sk: 'read',
      title: 'Đọc đoạn văn và trả lời câu hỏi',
      passage: r.i,
      prompt: q,
      vi: true,
      opts: [a, d1, d2],
      exp,
      key: `read:${r.i}:${qi}`,
    });
  },
  tf(P) {
    // D26: Đúng / Sai (hình – từ, hoặc câu – nghĩa)
    const em = P.words.filter((w) => w.em);
    if (em.length >= 3 && rnd(2)) {
      const w = pick(em),
        same = rnd(2) === 0,
        o = same ? w : pick(em.filter((x) => x.em !== w.em && x.id !== w.id));
      if (o)
        return mc({
          tp: 'tf',
          sk: 'read',
          title: 'Hình và từ có khớp nhau không?',
          emoji: w.em,
          prompt: o.h,
          py: o.py,
          big: true,
          keep: true,
          opts: [
            { t: 'Đúng', ok: same },
            { t: 'Sai', ok: !same },
          ],
          exp: `${w.em} = ${w.h} (${w.py}): ${w.vi}${
            same ? '' : ` · ${o.h} = ${o.vi}`
          }`,
          key: `tf:${w.id}:${o.id}`,
          ref: w.id,
        });
    }
    const cs = P.sents.filter((x) => toks(x.s).length >= 3);
    if (cs.length < 3) return null;
    const x = pick(cs),
      same = rnd(2) === 0,
      y = same ? x : pick(cs.filter((z) => z.vi !== x.vi));
    return mc({
      tp: 'tf',
      sk: 'read',
      title: 'Câu tiếng Trung có đúng nghĩa với câu tiếng Việt không?',
      prompt: zh(x.s),
      py: x.py,
      sub: `“${y.vi}”`,
      keep: true,
      opts: [
        { t: 'Đúng', ok: same },
        { t: 'Sai', ok: !same },
      ],
      exp: `${zh(x.s)} = ${x.vi}`,
      key: `tf:${zh(x.s)}:${same}`,
      ref: x.ref,
    });
  },
  para(P) {
    // D27: sắp xếp câu thành đoạn hội thoại
    const ds = P.dlgs.filter((d) => d.lines.length >= 3 && d.lines.length <= 5);
    if (!ds.length) return null;
    const d = pick(ds),
      t = d.lines.map((l) => `${l.sp}: ${zh(l.s)}`);
    if (new Set(t).size !== t.length) return null;
    return {
      id: uid(),
      kind: 'order',
      tp: 'para',
      sk: 'read',
      title: 'Sắp xếp các câu thành đoạn hội thoại hợp lý',
      tokens: reorder(t),
      target: t,
      big: true,
      exp: d.lines.map((l) => `${l.sp}: ${zh(l.s)} — ${l.vi}`).join(' / '),
      key: `para:${t[0]}`,
    };
  },
  pair() {
    // phân biệt cặp âm dễ nhầm
    const p = pick(PY_PAIRS),
      it = [];
    for (let i = 1; i < p.length; i += 2) it.push({ c: p[i], py: p[i + 1] });
    const x = pick(it);
    return mc({
      tp: 'pair',
      sk: 'pron',
      title: `Phân biệt ${p[0]}: nghe và chọn âm đúng`,
      audio: x.c,
      opts: [x.py, ...it.filter((y) => y !== x).map((y) => y.py)],
      exp: `${x.c} đọc là ${x.py}. ${it
        .map((y) => `${y.c} = ${y.py}`)
        .join(' · ')}`,
      key: `pair:${x.c}`,
    });
  },
  sit(P) {
    // bài tập tình huống giao tiếp
    const ls = P.dlgs.flatMap((d) => d.lines);
    if (ls.length < 2) return null;
    const x = pick(ls),
      ds = pickDistinct(
        shuffle(
          [...ls, ...COMM_DATA.flatMap((c) => c.dlg)].filter(
            (y) => y.vi !== x.vi
          )
        ),
        3,
        (y) => zh(y.s),
        [zh(x.s)]
      );
    if (ds.length < 2) return null;
    return mc({
      tp: 'sit',
      sk: 'read',
      title: 'Tình huống: bạn muốn diễn đạt ý sau, chọn câu tiếng Trung đúng',
      prompt: `“${x.vi}”`,
      vi: true,
      opts: [
        { t: zh(x.s), py: x.py, ok: true },
        ...ds.map((y) => ({ t: zh(y.s), py: y.py })),
      ],
      exp: `${zh(x.s)} — ${x.py}`,
      key: `sit:${zh(x.s)}`,
    });
  },
};

/* ---------- 11. Ghép bộ câu hỏi: trộn, tránh lặp, tăng dần độ khó ---------- */
const DIFF = {
  tone: 1,
  py: 1,
  hz: 1,
  lm: 1,
  vm: 1,
  mv: 1,
  matchm: 1,
  matchi: 1,
  tf: 1,
  pair: 1,
  combo: 2,
  fillw: 2,
  part: 2,
  gq: 2,
  lfill: 2,
  ant: 2,
  qa: 2,
  dlg: 2,
  read: 2,
  sit: 2,
  order: 3,
  err: 3,
  fillpy: 3,
  dict: 3,
  fix: 3,
  tr: 3,
  para: 3,
};
const sortDiff = (qs) =>
  qs
    .map((q) => [q, Math.random()])
    .sort((a, b) => (DIFF[a[0].tp] || 2) - (DIFF[b[0].tp] || 2) || a[1] - b[1])
    .map((x) => x[0]);
function genSet(codes, P, n, recent = []) {
  const out = [],
    used = new Set(),
    rec = new Set(recent || []),
    order = shuffle(codes);
  for (let k = 0, tries = 0; out.length < n && tries < n * 15; tries++, k++) {
    const g = GEN[order[k % order.length]];
    if (!g) continue;
    let q = null;
    try {
      q = g(P);
    } catch (e) {
      q = null;
    }
    if (!q || used.has(q.key) || (rec.has(q.key) && tries < n * 8)) continue; // tránh câu vừa làm gần đây
    used.add(q.key);
    out.push(q);
  }
  return out;
}
const SKILL_GENS = {
  pron: ['tone', 'py', 'combo', 'fillpy', 'pair'],
  listen: ['hz', 'lm', 'dlg', 'dict', 'lfill'],
  read: ['read', 'tf', 'qa', 'para'],
  vocab: ['vm', 'mv', 'matchm', 'matchi', 'ant', 'fillw'],
  grammar: ['gq', 'order', 'part', 'err', 'fix'],
  write: ['tr', 'fix', 'order'],
};
const MIXED_CODES = uniq(Object.values(SKILL_GENS).flat());
const FOCUS = {
  vocab: ['vm', 'mv', 'matchm', 'matchi', 'fillw', 'ant', 'hz', 'lm'],
  grammar: ['gq', 'order', 'part', 'err', 'fix', 'tr'],
  dialog: ['dlg', 'qa', 'para', 'order', 'tf'],
  pron: ['tone', 'py', 'combo', 'fillpy', 'hz', 'pair'],
  read: ['read', 'tf', 'qa', 'gq', 'order'],
  listen: ['dlg', 'lm', 'hz', 'dict', 'lfill'],
};

function buildPractice(st, l, dur) {
  const n = (DUR_N[dur] || DUR_N[30])[0],
    P = lessonPool(l);
  let c = FOCUS[l.f] || [
    'vm',
    'mv',
    'gq',
    'order',
    'dlg',
    'tf',
    'matchm',
    'lfill',
    'qa',
    'read',
  ];
  if (l.type === 'learn') {
    const g = GR[l.g] || {};
    c = [
      'lm',
      'py',
      'matchm',
      'fillw',
      'order',
      'gq',
      'tr',
      'dlg',
      'tf',
      'lfill',
    ];
    if (g.pt) c.push('part');
    if (g.m) c.push('err', 'fix');
    if (l.w === 1) c.push('tone', 'combo', 'fillpy');
    if (P.words.filter((w) => w.em).length >= 3) c.push('matchi');
  }
  return sortDiff(genSet(c, P, n, st.recent));
}
function buildLessonQuiz(st, l, dur) {
  if (l.type === 'final') return buildFinal();
  const P = lessonPool(l);
  if (l.type === 'learn') {
    const g = GR[l.g] || {},
      c = [
        'vm',
        'mv',
        'lm',
        'hz',
        'fillw',
        'gq',
        'order',
        'tr',
        'dlg',
        'lfill',
        'tf',
        'matchm',
      ];
    if (g.pt) c.push('part');
    if (g.m) c.push('err');
    if (l.w === 1) c.push('tone', 'py');
    return sortDiff(genSet(c, P, (DUR_N[dur] || DUR_N[30])[1], st.recent));
  }
  if (l.type === 'review') {
    // ~80% nội dung tuần + ~20% từ đến hạn của các tuần trước
    const n = WEEK_N[dur] || 25,
      prev = learnIn(1, l.wk[0] - 1),
      now = Date.now();
    let old = [];
    if (prev.length) {
      const P0 = makePool(prev.map((x) => x.id)),
        due = P0.words.filter((w) => st.srs[w.id] && st.srs[w.id].due <= now);
      old = genSet(
        ['vm', 'mv', 'lm'],
        { ...P0, words: due.length >= 4 ? due : P0.words },
        Math.round(n * 0.2),
        st.recent
      );
    }
    const main = genSet(
      [
        'vm',
        'mv',
        'lm',
        'hz',
        'fillw',
        'gq',
        'order',
        'tr',
        'dlg',
        'lfill',
        'tf',
        'part',
        'err',
        'fix',
        'qa',
        'matchm',
      ],
      P,
      n - old.length,
      st.recent
    );
    return sortDiff([...main, ...old]);
  }
  return sortDiff(
    genSet(
      FOCUS[l.f] || FOCUS.vocab,
      P,
      (DUR_N[dur] || DUR_N[30])[1],
      st.recent
    )
  );
}
function buildFinal() {
  // 40 câu: nghe · đọc · từ vựng · ngữ pháp (mỗi phần 10)
  const P = poolAll();
  return [
    ['hz', 'lm', 'dlg', 'lfill'],
    ['read', 'tf', 'qa'],
    ['vm', 'mv', 'fillw', 'ant'],
    ['gq', 'order', 'err', 'part', 'tr'],
  ].flatMap((c) => sortDiff(genSet(c, P, 10)));
}

/* ---------- 12. Thi thử HSK 1: 40 câu (nghe 4 phần × 5, đọc 4 phần × 5) — câu hỏi do website biên soạn ---------- */
const EMO = () => HSK1_WORDS.filter((w) => w.em);
function emoOpts(w, n = 3, avoid = []) {
  const ds = pickDistinct(
    shuffle(EMO().filter((x) => x.id !== w.id && !avoid.includes(x.h))),
    n - 1,
    (x) => x.em,
    [w.em]
  );
  return [
    { t: w.em, ok: true, emo: true },
    ...ds.map((x) => ({ t: x.em, emo: true })),
  ];
}
function tplDialog() {
  const [q, a, list] = pick(MOCK_TPL),
    ws = list
      .split(' ')
      .map((h) => WORDS[h])
      .filter(Boolean),
    w = pick(ws);
  const [qs, qp] = q.split('|'),
    [as, ap] = a.split('|');
  return {
    w,
    ws,
    lines: [
      { sp: 'A', s: qs, py: qp, vi: '' },
      {
        sp: 'B',
        s: as.replace('{h}', w.h),
        py: ap.replace('{p}', w.py),
        vi: '',
      },
    ],
  };
}
function qaQ(P, listen) {
  const prs = qaPairs(P);
  if (prs.length < 3) return null;
  const [a, b] = pick(prs),
    ds = pickDistinct(
      shuffle(prs.filter((p) => p[0] !== a).map((p) => p[1])),
      2,
      (x) => zh(x.s),
      [zh(b.s)]
    );
  return mc({
    tp: listen ? 'm-l2' : 'm-r3',
    title: listen
      ? 'Nghe câu hỏi, chọn câu trả lời phù hợp'
      : 'Đọc câu hỏi, chọn câu trả lời phù hợp',
    audio: listen ? a.s : null,
    prompt: listen ? null : zh(a.s),
    py: listen ? null : a.py,
    opts: [
      { t: zh(b.s), py: b.py, ok: true },
      ...ds.map((x) => ({ t: zh(x.s), py: x.py })),
    ],
    exp: `${zh(a.s)} → ${zh(b.s)} (${b.vi})`,
    key: `${listen ? 'ml2' : 'mr3'}:${zh(a.s)}`,
  });
}
const trim3 = (q) => {
  if (!q) return null;
  const o = shuffle([
    q.opts[q.ans],
    ...shuffle(q.opts.filter((_, i) => i !== q.ans)).slice(0, 2),
  ]);
  return { ...q, opts: o, ans: o.findIndex((x) => x.ok) };
};
const MOCK_PARTS = [
  [
    'Nghe · Phần 1: Nghe và chọn hình đúng',
    () => {
      const w = pick(EMO());
      return mc({
        tp: 'm-l1',
        title: 'Nghe và chọn hình đúng',
        audio: w.h,
        opts: emoOpts(w),
        exp: `${w.em} ${w.h} (${w.py}): ${w.vi}`,
        key: `ml1:${w.id}`,
        ref: w.id,
      });
    },
  ],
  ['Nghe · Phần 2: Nghe câu hỏi, chọn câu trả lời', (P) => qaQ(P, true)],
  [
    'Nghe · Phần 3: Nghe hội thoại, chọn hình',
    () => {
      const d = tplDialog(),
        ds = pickDistinct(
          shuffle(d.ws.filter((x) => x.id !== d.w.id && x.em)),
          2,
          (x) => x.em,
          [d.w.em]
        );
      return mc({
        tp: 'm-l3',
        title: 'Nghe hội thoại, chọn hình phù hợp',
        dialog: d.lines,
        opts: [
          { t: d.w.em, ok: true, emo: true },
          ...ds.map((x) => ({ t: x.em, emo: true })),
        ],
        exp: d.lines.map((l) => zh(l.s)).join(' / '),
        key: `ml3:${zh(d.lines[1].s)}`,
        ref: d.w.id,
      });
    },
  ],
  [
    'Nghe · Phần 4: Nghe hội thoại, trả lời câu hỏi',
    (P) => {
      if (rnd(2)) {
        const q = trim3(GEN.dlg(P));
        if (q) return { ...q, tp: 'm-l4' };
      }
      const d = tplDialog(),
        ds = pickDistinct(
          shuffle(d.ws.filter((x) => x.id !== d.w.id)),
          2,
          (x) => x.h
        );
      return mc({
        tp: 'm-l4',
        title: 'Nghe hội thoại và trả lời câu hỏi',
        dialog: d.lines,
        prompt: zh(d.lines[0].s).replace('你', 'B '),
        opts: [
          { t: d.w.h, py: d.w.py, ok: true },
          ...ds.map((x) => ({ t: x.h, py: x.py })),
        ],
        exp: d.lines.map((l) => zh(l.s)).join(' / '),
        key: `ml4:${zh(d.lines[1].s)}`,
      });
    },
  ],
  [
    'Đọc · Phần 1: Đọc câu, chọn nghĩa đúng',
    (P) => {
      const cs = P.sents.filter((x) => toks(x.s).length >= 3),
        x = pick(cs),
        ds = pickDistinct(shuffle(cs), 2, (y) => y.vi, [x.vi]);
      return mc({
        tp: 'm-r1',
        title: 'Đọc câu và chọn nghĩa đúng',
        prompt: zh(x.s),
        py: x.py,
        opts: [x.vi, ...ds.map((y) => y.vi)],
        exp: `${zh(x.s)} — ${x.py}`,
        key: `mr1:${zh(x.s)}`,
      });
    },
  ],
  [
    'Đọc · Phần 2: Đọc câu, chọn hình phù hợp',
    () => {
      const w = pick(EMO().filter((x) => x.ex && toks(x.ex).includes(x.h)));
      return mc({
        tp: 'm-r2',
        title: 'Đọc câu, chọn hình phù hợp',
        prompt: zh(w.ex),
        py: w.exPy,
        opts: emoOpts(w, 3, toks(w.ex)),
        exp: `${zh(w.ex)} — ${w.exVi}`,
        key: `mr2:${w.id}`,
        ref: w.id,
      });
    },
  ],
  ['Đọc · Phần 3: Chọn câu trả lời phù hợp', (P) => qaQ(P, false)],
  [
    'Đọc · Phần 4: Chọn từ điền vào chỗ trống',
    (P) => {
      const q = trim3(GEN.fillw(P));
      return q && { ...q, tp: 'm-r4' };
    },
  ],
];
function buildMock() {
  const P = poolAll(),
    out = [];
  MOCK_PARTS.forEach(([title, fn], pi) => {
    const used = new Set();
    for (let g = 0; g < 80 && used.size < 5; g++) {
      let q = null;
      try {
        q = fn(P);
      } catch (e) {
        q = null;
      }
      if (q && !used.has(q.key)) {
        used.add(q.key);
        out.push({
          ...q,
          part: pi,
          partT: title,
          sk: pi < 4 ? 'listen' : 'read',
        });
      }
    }
  });
  return out;
}
const mockScore = (res) => {
  const L = res.filter((r) => r.q.part < 4 && r.ok).length * 5,
    R = res.filter((r) => r.q.part >= 4 && r.ok).length * 5;
  return { L, R, total: L + R };
};

/* ---------- 13. Kiểm tra đầu vào (ước lượng, không phải chứng nhận) ---------- */
function buildPlacement() {
  return PLACE.map((ln, i) => {
    const [lv, sk, p, au, a, d1, d2, d3] = ln.split('|');
    return {
      ...mc({
        tp: 'place',
        sk,
        title: au ? p : 'Chọn đáp án đúng',
        prompt: au ? null : p,
        vi: !!p && !hasHz(p.slice(0, 2)),
        audio: au || null,
        opts: [a, d1, d2, d3],
        exp: `Đáp án đúng: ${a}`,
        key: `place:${i}`,
      }),
      lv: +lv,
    };
  });
}
function placementResult(res) {
  const by = {};
  res.forEach(({ q, ok }) => {
    const b = (by[q.lv] = by[q.lv] || [0, 0]);
    b[0] += ok ? 1 : 0;
    b[1]++;
  });
  let lv = 0;
  for (let L = 1; L <= 4; L++) {
    const [a, n] = by[L] || [0, 0];
    if (n && a / n >= 0.75) lv = L;
    else break;
  }
  return { lv, by };
}

/* ---------- 14. Bộ bài nhanh: thanh điệu hằng ngày, làm lại câu sai ---------- */
const buildToneDrill = (st) =>
  genSet(
    ['tone', 'tone', 'py', 'pair'],
    makePool(uniq(['1.1.1', '1.1.2', ...learnedIds(st)])),
    5,
    st.recent
  );
function reshuffle(q) {
  const c = JSON.parse(JSON.stringify(q));
  c.id = uid();
  if (c.kind === 'mc' && !c.keep) {
    c.opts = shuffle(c.opts);
    c.ans = c.opts.findIndex((o) => o.ok);
  }
  if (c.kind === 'order') c.tokens = shuffle(c.tokens);
  if (c.kind === 'combo') {
    c.inis = shuffle(c.inis);
    c.fins = shuffle(c.fins);
  }
  return c;
}
const buildRedo = (st, n = 12) =>
  Object.values(st.mist)
    .filter((m) => m.q)
    .sort((a, b) => b.n - a.n || b.last - a.last)
    .slice(0, n)
    .map((m) => reshuffle(m.q));

/* ---------- 15. Chấm điểm ---------- */
function orderOk(u, t) {
  // chấp nhận đổi chỗ từ chỉ thời gian với chủ ngữ: 我明天去 = 明天我去
  if (!u || u.length !== t.length) return false;
  if (u.join('|') === t.join('|')) return true;
  return (
    u.length >= 3 &&
    u[0] === t[1] &&
    u[1] === t[0] &&
    (TIME_W.has(t[0]) || TIME_W.has(t[1])) &&
    u.slice(2).join('|') === t.slice(2).join('|')
  );
}
function checkType(q, v) {
  const s = (v || '').trim();
  if (!s) return { ok: false, note: 'Bạn chưa nhập câu trả lời.' };
  if (hasHz(s)) {
    const ok = (q.accept || []).some((a) => hzNorm(a) === hzNorm(s));
    return { ok, note: ok ? '' : 'Chữ Hán chưa đúng.' };
  }
  const accs = [
    ...(q.input === 'py' ? q.accept || [] : []),
    ...(q.acceptPy || []),
  ].flatMap((p) => [p, sandhiPy(p)]);
  if (accs.some((p) => pyKey(p) === pyKey(s))) return { ok: true };
  if (accs.some((p) => noTone(p) === noTone(s)))
    return {
      ok: false,
      note: 'Đúng âm nhưng sai hoặc thiếu thanh điệu (có thể gõ số: ni3 hao3).',
    };
  return { ok: false };
}
function judge(q, a) {
  if (q.kind === 'mc') return { ok: a === q.ans };
  if (q.kind === 'combo')
    return { ok: !!a && a[0] === q.ans[0] && a[1] === q.ans[1] };
  if (q.kind === 'order') return { ok: orderOk(a, q.target) };
  if (q.kind === 'type') return checkType(q, a);
  if (q.kind === 'match') return { ok: a === 0 }; // a = số lần ghép sai
  return { ok: false };
}

/* ---------- 16. Ghi nhận kết quả: kỹ năng, câu sai, từ cần ôn, lịch sử ---------- */
function applyResults(st, res, meta = {}) {
  const now = Date.now(),
    d = dkey(),
    s = {
      ...st,
      skills: { ...st.skills },
      mist: { ...st.mist },
      srs: { ...st.srs },
      days: { ...st.days },
    };
  const sk = {};
  let ok = 0;
  res.forEach(({ q, ok: good }) => {
    if (good) ok++;
    const k = q.sk || 'vocab',
      c = s.skills[k] || { ok: 0, n: 0 };
    s.skills[k] = { ok: c.ok + (good ? 1 : 0), n: c.n + 1 };
    const b = (sk[k] = sk[k] || [0, 0]);
    b[0] += good ? 1 : 0;
    b[1]++;
    if (q.key) {
      const m = s.mist[q.key];
      if (!good) {
        const rest = { ...q };
        delete rest.id;
        s.mist[q.key] = { n: (m?.n || 0) + 1, ok: 0, last: now, q: rest };
      } else if (m) {
        if ((m.ok || 0) + 1 >= 2) delete s.mist[q.key];
        else s.mist[q.key] = { ...m, ok: (m.ok || 0) + 1 };
      } // đúng 2 lần → gỡ khỏi danh sách sai
    }
    (q.refs || (q.ref && WORDS[q.ref] ? [q.ref] : [])).forEach((wid) => {
      // từ trả lời sai → đưa vào danh sách ôn ngay
      const r = s.srs[wid];
      if (!r) {
        if (!good) s.srs[wid] = { ...srsNew(now), xbad: 1 };
        return;
      }
      s.srs[wid] = good
        ? { ...r, xok: (r.xok || 0) + 1 }
        : { ...r, xbad: (r.xbad || 0) + 1, due: Math.min(r.due, now) };
    });
  });
  const keys = Object.keys(s.mist);
  if (keys.length > 150)
    keys
      .sort((a, b) => s.mist[a].last - s.mist[b].last)
      .slice(0, keys.length - 150)
      .forEach((k) => delete s.mist[k]);
  const day = s.days[d] || {};
  s.days[d] = { ...day, q: (day.q || 0) + res.length, ok: (day.ok || 0) + ok };
  s.recent = uniq([
    ...res.map((r) => r.q.key).filter(Boolean),
    ...(st.recent || []),
  ]).slice(0, 150);
  if (meta.kind)
    s.hist = [
      {
        t: now,
        k: meta.kind,
        ref: meta.ref || '',
        title: meta.title || '',
        sc: ok,
        n: res.length,
        sk,
        pass: meta.pass,
      },
      ...(st.hist || []),
    ].slice(0, 400);
  return s;
}
function finishLesson(st, l, res) {
  // đạt khi ≥ ngưỡng và không kỹ năng nào (≥ 3 câu) dưới 60%
  const ok = res.filter((r) => r.ok).length,
    p = pct(ok, res.length),
    sk = {};
  res.forEach(({ q, ok: g }) => {
    const b = (sk[q.sk] = sk[q.sk] || [0, 0]);
    b[0] += g ? 1 : 0;
    b[1]++;
  });
  const weak = Object.entries(sk)
    .filter(([, [a, n]]) => n >= 3 && pct(a, n) < 60)
    .map(([k]) => k);
  const pass = p >= (PASS[l.type] || 80) && !weak.length;
  let s = applyResults(st, res, {
    kind: 'lesson',
    ref: l.id,
    title: l.t,
    pass,
  });
  const pr = s.lessons[l.id] || {},
    d = dkey(),
    day = s.days[d] || {};
  s = {
    ...s,
    lessons: {
      ...s.lessons,
      [l.id]: {
        best: Math.max(pr.best || 0, p),
        last: p,
        att: (pr.att || 0) + 1,
        passed: !!(pr.passed || pass),
        at: Date.now(),
      },
    },
    days: { ...s.days, [d]: { ...day, l: (day.l || 0) + (pass ? 1 : 0) } },
  };
  if (l.type === 'final' || l.type === 'review')
    s.exams = [
      { t: Date.now(), kind: l.type, title: l.t, p, sk, pass },
      ...s.exams,
    ].slice(0, 60);
  return { s, p, pass, sk, weak, ok };
}
const touchDay = (st, f) => {
  const d = dkey(),
    day = st.days[d] || {};
  return { ...st, days: { ...st.days, [d]: f(day) } };
};
const addMinute = (st) => touchDay(st, (x) => ({ ...x, m: (x.m || 0) + 1 }));
const markDone = (st, k) =>
  touchDay(st, (x) => ({ ...x, done: { ...(x.done || {}), [k]: true } }));
const gradeWord = (st, id, g) =>
  touchDay(
    { ...st, srs: { ...st.srs, [id]: srsGrade(st.srs[id], g) } },
    (x) => ({ ...x, r: (x.r || 0) + 1 })
  );
function introWords(st, ids) {
  // đánh dấu từ mới đã được giới thiệu → vào lịch ôn
  const now = Date.now(),
    add = ids.filter((id) => WORDS[id] && !st.srs[id]);
  if (!add.length) return st;
  const srs = { ...st.srs };
  add.forEach((id) => {
    srs[id] = srsNew(now);
  });
  return { ...st, srs };
}

/* ---------- 17. Thống kê, kế hoạch hôm nay, bộ thẻ ôn tập ---------- */
const activeDay = (x) =>
  !!x && ((x.m || 0) >= 1 || (x.q || 0) >= 1 || (x.r || 0) >= 1);
function streakOf(st) {
  const d = new Date();
  let n = 0;
  if (!activeDay(st.days[dkey(d)])) d.setDate(d.getDate() - 1);
  while (activeDay(st.days[dkey(d)])) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function wordStats(st, now = Date.now()) {
  let learned = 0,
    known = 0,
    due = 0,
    hard = 0;
  Object.entries(st.srs).forEach(([id, r]) => {
    if (!WORDS[id]) return;
    learned++;
    if (r.iv >= MASTER_IV) known++;
    if (r.due <= now) due++;
    if (badOf(r) >= 2) hard++;
  });
  return { learned, known, due, hard };
}
const skillAcc = (st) =>
  Object.keys(SKILLS).map((k) => {
    const s = st.skills[k] || { ok: 0, n: 0 };
    return { k, name: SKILLS[k], v: pct(s.ok, s.n), n: s.n };
  });
const weakSkill = (st) =>
  skillAcc(st)
    .filter((x) => x.n >= 5 && x.v < 75)
    .sort((a, b) => a.v - b.v)[0] || null;
const hskProgress = (st) => {
  const done = LESSONS.filter((l) => st.lessons[l.id]?.passed).length;
  return { done, total: LESSONS.length, p: pct(done, LESSONS.length) };
};
const recentAcc = (st) => {
  const h = st.hist.slice(0, 10),
    n = h.reduce((a, x) => a + x.n, 0);
  return n >= 10
    ? pct(
        h.reduce((a, x) => a + x.sc, 0),
        n
      )
    : null;
};
function newQuota(st) {
  // tự điều chỉnh khối lượng từ mới mỗi ngày
  const t0 = new Date();
  t0.setHours(0, 0, 0, 0);
  const intro = Object.values(st.srs).filter((r) => r.seen >= +t0).length;
  let q = NEW_PER_DAY[st.profile.minutes] || 10;
  if (wordStats(st).due > 30) q = Math.floor(q / 2); // tồn nhiều từ cần ôn → giảm từ mới
  const acc = recentAcc(st);
  if (acc !== null && acc < 60) q = Math.floor(q / 2); // đang sai nhiều → giảm từ mới
  return Math.max(0, q - intro);
}
function buildDeck(st, f = {}) {
  // mode: smart | hard | learning | known | random | all
  const now = Date.now(),
    cur = currentLesson(st).idx,
    src = f.src || 'hsk1',
    R = (w) => st.srs[w.id];
  const ws = WORD_LIST.filter(
    (w) => (src === 'all' || w.src === src) && (!f.topic || w.topic === f.topic)
  );
  const reached = (w) => w.src !== 'hsk1' || LESSON_BY[w.les].idx <= cur;
  switch (f.mode) {
    case 'hard':
      return ws
        .filter((w) => badOf(R(w)) >= 2)
        .sort((a, b) => badOf(R(b)) - badOf(R(a)));
    case 'learning':
      return ws.filter((w) => R(w) && R(w).iv < MASTER_IV);
    case 'known':
      return ws.filter((w) => R(w) && R(w).iv >= MASTER_IV);
    case 'random':
      return shuffle(ws.filter((w) => R(w) || reached(w))).slice(0, 30);
    case 'all':
      return ws;
    default: {
      // ưu tiên từ đến hạn ôn, sau đó mới thêm từ mới theo hạn mức
      const due = ws
        .filter((w) => R(w) && R(w).due <= now)
        .sort((a, b) => R(a).due - R(b).due);
      const fresh = ws
        .filter((w) => !R(w) && reached(w))
        .slice(0, newQuota(st));
      return [...due, ...fresh];
    }
  }
}
function projectDate(st) {
  // ngày hoàn thành HSK 1 dự kiến theo tốc độ thực tế 14 ngày gần nhất
  const { done, total } = hskProgress(st),
    left = total - done;
  if (!left) return null;
  const recent = st.hist.filter(
    (h) => h.k === 'lesson' && h.pass && h.t >= Date.now() - 14 * DAY
  ).length;
  const perDay =
    recent >= 2 ? recent / 14 : ((st.profile.minutes || 30) / 30) * (5 / 7);
  return Date.now() + Math.ceil(left / Math.max(perDay, 0.1)) * DAY;
}
function lastDays(st, n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    const x = st.days[dkey(d)] || {};
    return {
      k: dkey(d),
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      m: x.m || 0,
      q: x.q || 0,
      ok: x.ok || 0,
      r: x.r || 0,
      l: x.l || 0,
    };
  });
}
function aggregate(st, by) {
  // thống kê theo tuần / tháng
  const out = {};
  Object.entries(st.days).forEach(([k, x]) => {
    const d = new Date(`${k}T00:00:00`);
    let g;
    if (by === 'month')
      g = `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    else {
      const m = new Date(d);
      m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
      g = `Tuần ${m.getDate()}/${m.getMonth() + 1}`;
    }
    const o = (out[g] = out[g] || { g, t: +d, m: 0, q: 0, ok: 0, l: 0 });
    o.t = Math.min(o.t, +d);
    o.m += x.m || 0;
    o.q += x.q || 0;
    o.ok += x.ok || 0;
    o.l += x.l || 0;
  });
  return Object.values(out)
    .sort((a, b) => a.t - b.t)
    .slice(-12);
}
function todayPlan(st) {
  // lịch học hôm nay theo thời lượng mục tiêu
  const m = st.profile.minutes || 30,
    ws = wordStats(st),
    cur = currentLesson(st),
    wk = weakSkill(st),
    plan = [];
  if (ws.due)
    plan.push({
      k: 'review',
      t: `Ôn ${ws.due} từ đến hạn bằng Flashcard`,
      min: Math.min(10, Math.max(3, Math.ceil(ws.due / 3))),
    });
  plan.push({
    k: 'tone',
    t: 'Luyện phát âm và phân biệt thanh điệu (5 câu)',
    min: 3,
  });
  plan.push({
    k: 'lesson',
    t: `Học bài: ${cur.t}`,
    les: cur.id,
    min: m >= 45 ? 30 : m >= 30 ? 20 : 10,
  });
  if (m >= 30 && Object.keys(st.mist).length)
    plan.push({ k: 'redo', t: 'Làm lại các câu thường sai', min: 5 });
  if (m >= 45)
    plan.push({
      k: 'weak',
      t: wk
        ? `Luyện kỹ năng yếu: ${wk.name} (${wk.v}%)`
        : 'Luyện tổng hợp các kỹ năng',
      sk: wk?.k,
      min: 10,
    });
  if (m >= 60)
    plan.push({
      k: 'speak',
      t: 'Luyện nói: nghe và nói nhại theo câu mẫu',
      min: 10,
    });
  return plan;
}

/* ---------- 18. AI: chỉ bật khi thật sự có kết nối — không giả lập ----------
   1) Trong Claude Artifacts có hỗ trợ: window.claude.complete(prompt)
   2) Bản triển khai riêng: URL máy chủ proxy HTTPS của bạn (giữ API key ở máy chủ), nhận {prompt} → trả {text} */
const hasClaude = () =>
  typeof window !== 'undefined' &&
  !!window.claude &&
  typeof window.claude.complete === 'function';
const aiReady = (st) =>
  hasClaude() || /^https:\/\//.test((st.settings.ai || '').trim());
async function askAI(st, prompt) {
  if (hasClaude()) return String(await window.claude.complete(prompt));
  const url = (st.settings.ai || '').trim();
  if (!/^https:\/\//.test(url)) throw new Error('Chưa cấu hình kết nối AI.');
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!r.ok) throw new Error(`Máy chủ AI báo lỗi ${r.status}`);
  const j = await r.json();
  return String(j.text || j.reply || j.content || '');
}

/* ========================= HẾT PHẦN 2 ========================= */
/* =====================================================================
   PHẦN 3/6: GIAO DIỆN NỀN TẢNG · THÀNH PHẦN DÙNG CHUNG · BỘ MÁY LÀM BÀI
   Dán ngay sau Phần 2c
   ===================================================================== */

/* ---------- 19. Bảng màu: xanh dương nhạt + trắng + điểm nhấn đỏ Trung Hoa; chế độ sáng/tối ---------- */
const APP_CSS = `
.hz{--bg:#eef5fc;--card:#fff;--tx:#0f1b2d;--mu:#5f6f86;--bd:#d9e6f3;--pri:#2b7fd9;--pri2:#e4effb;--red:#d62828;--red2:#fdeaea;
--ok:#15803d;--ok2:#e2f5e8;--warn:#b45309;--warn2:#fff2da;background:var(--bg);color:var(--tx);min-height:100vh;
font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif}
.hz.dk{--bg:#0b1322;--card:#121d31;--tx:#e6eef9;--mu:#9aabc3;--bd:#22324c;--pri:#5aa6f0;--pri2:#16283f;--red:#f05252;--red2:#3b1719;
--ok:#34d399;--ok2:#0e2e23;--warn:#fbbf24;--warn2:#36290b}
.hz *{box-sizing:border-box}.hz button{font-family:inherit}
.card{background:var(--card);border:1px solid var(--bd);border-radius:16px}
.accent{border-top:4px solid var(--red)}.mu{color:var(--mu)}.pri{color:var(--pri)}.red{color:var(--red)}.okc{color:var(--ok)}
.han{font-family:"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Source Han Sans SC",sans-serif}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;border-radius:12px;padding:.55rem .95rem;font-weight:600;
font-size:.92rem;border:1px solid transparent;cursor:pointer;transition:transform .08s,filter .15s,background .15s;line-height:1.2}
.btn:active{transform:scale(.97)}.btn:disabled{opacity:.45;cursor:not-allowed}
.btn-p{background:var(--pri);color:#fff}.btn-p:hover{filter:brightness(1.07)}.btn-r{background:var(--red);color:#fff}
.btn-g{background:var(--pri2);color:var(--pri)}.btn-o{background:transparent;border-color:var(--bd);color:var(--tx)}.btn-o:hover{background:var(--pri2)}
.btn-sm{padding:.35rem .6rem;font-size:.8rem;border-radius:10px}
.chip{display:inline-flex;align-items:center;gap:.25rem;padding:.15rem .55rem;border-radius:999px;font-size:.75rem;font-weight:600;background:var(--pri2);color:var(--pri)}
.chip-r{background:var(--red2);color:var(--red)}.chip-ok{background:var(--ok2);color:var(--ok)}.chip-w{background:var(--warn2);color:var(--warn)}
.chip-mu{background:transparent;border:1px solid var(--bd);color:var(--mu)}
.box{display:block;border-radius:12px;padding:.75rem;font-size:.85rem;background:var(--pri2);color:var(--tx)}.box-w{background:var(--warn2)}.box-r{background:var(--red2)}
.hl{background:var(--pri2)}
.opt{width:100%;text-align:left;border:2px solid var(--bd);background:var(--card);border-radius:14px;padding:.7rem 1rem;cursor:pointer;color:var(--tx);transition:border-color .15s,background .15s}
.opt:hover{border-color:var(--pri)}.opt.sel{border-color:var(--pri);background:var(--pri2)}.opt.good{border-color:var(--ok);background:var(--ok2)}.opt.wrong{border-color:var(--red);background:var(--red2)}
.tok{border:1.5px solid var(--bd);background:var(--card);border-radius:10px;padding:.4rem .75rem;cursor:pointer;color:var(--tx)}.tok:hover{border-color:var(--pri)}
.track{background:var(--pri2);border-radius:999px;overflow:hidden}.fill{background:var(--pri);height:100%;border-radius:999px;transition:width .4s}
.inp{width:100%;border:1.5px solid var(--bd);background:var(--card);color:var(--tx);border-radius:12px;padding:.6rem .8rem;font-size:1rem;outline:none}.inp:focus{border-color:var(--pri)}
.fb-ok{background:var(--ok2);border:1px solid var(--ok);border-radius:14px}.fb-bad{background:var(--red2);border:1px solid var(--red);border-radius:14px}
.nav-a{display:flex;align-items:center;gap:.6rem;padding:.5rem .7rem;border-radius:10px;color:var(--tx);cursor:pointer;font-size:.9rem;width:100%;text-align:left;background:transparent;border:0}
.nav-a:hover{background:var(--pri2)}.nav-a.on{background:var(--pri);color:#fff}
.pop{animation:pop .35s ease}@keyframes pop{0%{transform:scale(.94)}60%{transform:scale(1.03)}100%{transform:scale(1)}}
.shake{animation:shake .35s}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.fade{animation:fade .3s ease}@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.conf{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:80}
.conf i{position:absolute;top:-14px;width:9px;height:14px;border-radius:2px;animation:fall 1.7s ease-in forwards}
@keyframes fall{to{transform:translateY(105vh) rotate(560deg);opacity:.15}}
.flip{perspective:1200px}.flip-in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}.flip-in.on{transform:rotateY(180deg)}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem}
.face.back{transform:rotateY(180deg)}
`;

/* ---------- 20. Ngữ cảnh dùng chung ----------
   App (Phần 6) cung cấp: st (trạng thái) · upd(fn) cập nhật & lưu · setSettings(patch) · go(trang, tham số) · celebrate() · toast(chuỗi) */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);
const fmtTime = (s) => {
  const x = Math.max(0, s | 0);
  return `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(
    x % 60
  ).padStart(2, '0')}`;
};
function ansText(q) {
  if (q.kind === 'mc') {
    const o = q.opts[q.ans];
    return o ? o.t + (o.py ? ` (${o.py})` : '') : '';
  }
  if (q.kind === 'order')
    return q.big ? q.target.join(' / ') : q.target.join('');
  if (q.kind === 'type')
    return q.input === 'py'
      ? q.accept[0]
      : `${q.accept[0]}${q.acceptPy ? ` — ${q.acceptPy[0]}` : ''}`;
  if (q.kind === 'combo') return `${q.ans[0]} + ${q.ans[1]}`;
  return '';
}

/* ---------- 21. Thành phần giao diện nhỏ ---------- */
const Bar = ({ v, h = 8, color }) => (
  <div className="track" style={{ height: h }}>
    <div
      className="fill"
      style={{
        width: `${Math.max(0, Math.min(100, v || 0))}%`,
        background: color,
      }}
    />
  </div>
);
function Ring({ v, size = 64, stroke = 7, color = 'var(--pri)', children }) {
  const r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--pri2)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, v || 0)) / 100)}
          style={{ transition: 'stroke-dashoffset .5s' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="font-bold text-sm"
      >
        {children}
      </div>
    </div>
  );
}
const STAT_BLOOM = {
  red: ['rose', 'pink'],
  ok: ['ranunculus', 'cream'],
  w: ['tulip', 'butter'],
  base: ['ranunculus', 'peach'],
};
const Stat = ({ icon: I, label, value, sub, tone }) => {
  const t = STAT_BLOOM[tone] ? tone : 'base',
    [kind, pal] = STAT_BLOOM[t];
  return (
    <div className={`card mb-stat mb-stat-${t} p-4`}>
      <MiniBloom
        kind={kind}
        palette={pal}
        size={30}
        className="mb-stat-bloom"
      />
      <div className="mb-stat-ic">
        <I size={18} />
      </div>
      <div className="min-w-0">
        <div className="text-xs mu truncate">{label}</div>
        <div className="mb-stat-val">{value}</div>
        {sub && <div className="text-xs mu truncate">{sub}</div>}
      </div>
    </div>
  );
};
const Title = ({ icon: I, children, sub, right }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
    <div>
      <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
        {I && <I size={22} className="red" />}
        {children}
      </h1>
      {sub && <p className="mu text-sm mt-1">{sub}</p>}
    </div>
    {right}
  </div>
);
const Tabs = ({ tabs, v, on }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tabs.map(([k, label]) => (
      <button
        key={k}
        className={`btn btn-sm ${v === k ? 'btn-p' : 'btn-o'}`}
        onClick={() => on(k)}
      >
        {label}
      </button>
    ))}
  </div>
);
const Note = ({ children, tone }) => (
  <div
    className={`box ${tone === 'w' ? 'box-w' : tone === 'r' ? 'box-r' : ''}`}
  >
    <Info size={14} className="inline mr-1" style={{ verticalAlign: '-2px' }} />
    {children}
  </div>
);
const Empty = ({ children }) => (
  <div className="card p-6 text-center mu text-sm">{children}</div>
);
const Sel = ({ v, on, opts, className = '' }) => (
  <select
    className={`inp ${className}`}
    style={{ width: 'auto', padding: '.4rem .6rem', fontSize: '.85rem' }}
    value={v}
    onChange={(e) => on(e.target.value)}
  >
    {opts.map(([k, l]) => (
      <option key={k} value={k}>
        {l}
      </option>
    ))}
  </select>
);
function SpeakBtn({ text, label, rate }) {
  const ok = ttsOK();
  return (
    <button
      type="button"
      className="btn btn-g btn-sm"
      disabled={!ok}
      title={
        ok ? 'Nghe phát âm' : 'Trình duyệt chưa hỗ trợ phát âm (Web Speech API)'
      }
      onClick={(e) => {
        e.stopPropagation();
        speak(text, rate ? { rate } : {});
      }}
    >
      <Volume2 size={15} />
      {label}
    </button>
  );
}
function ViewToggles({ compact }) {
  const { st, setSettings } = useApp(),
    s = st.settings;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className={`btn btn-sm ${s.py ? 'btn-g' : 'btn-o'}`}
        onClick={() => setSettings({ py: !s.py })}
      >
        {s.py ? <Eye size={14} /> : <EyeOff size={14} />} Pinyin
      </button>
      <button
        className={`btn btn-sm ${s.vi ? 'btn-g' : 'btn-o'}`}
        onClick={() => setSettings({ vi: !s.vi })}
      >
        {s.vi ? <Eye size={14} /> : <EyeOff size={14} />} Nghĩa
      </button>
      {!compact && <span className="mu text-xs ml-1">Tốc độ đọc</span>}
      {[0.75, 1, 1.25].map((r) => (
        <button
          key={r}
          className={`btn btn-sm ${s.rate === r ? 'btn-p' : 'btn-o'}`}
          onClick={() => {
            setSettings({ rate: r });
            SPEECH.rate = r;
          }}
        >
          {String(r).replace('.', ',')}x
        </button>
      ))}
    </div>
  );
}
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        l: Math.random() * 100,
        d: Math.random() * 0.6,
        r: Math.random() * 360,
        c: ['#d62828', '#2b7fd9', '#e9a400', '#16a34a', '#f472b6'][i % 5],
      })),
    []
  );
  return (
    <div className="conf">
      {pieces.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.l}%`,
            background: p.c,
            animationDelay: `${p.d}s`,
            transform: `rotate(${p.r}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- 22. Hội thoại (nghe từng câu / cả bài, chế độ đóng vai), bài đọc, thẻ từ ---------- */
function DialogView({ lines, title, roleplay = true }) {
  const [cur, setCur] = useState(-1),
    [hide, setHide] = useState('');
  const stopRef = useRef(null);
  useEffect(
    () => () => {
      if (stopRef.current) stopRef.current();
    },
    []
  );
  const speakers = uniq(lines.map((l) => l.sp));
  const playAll = () => {
    if (stopRef.current) stopRef.current();
    stopRef.current = speakSeq(lines, setCur);
  };
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="font-semibold">{title || 'Hội thoại'}</div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn btn-sm btn-p"
            onClick={playAll}
            disabled={!ttsOK()}
          >
            <Play size={14} /> Nghe cả bài
          </button>
          {cur >= 0 && (
            <button
              className="btn btn-sm btn-o"
              onClick={() => stopRef.current && stopRef.current()}
            >
              <Square size={14} /> Dừng
            </button>
          )}
          {roleplay &&
            speakers.length > 1 &&
            speakers.map((sp) => (
              <button
                key={sp}
                className={`btn btn-sm ${hide === sp ? 'btn-r' : 'btn-o'}`}
                onClick={() => setHide(hide === sp ? '' : sp)}
              >
                Tôi đóng vai {sp}
              </button>
            ))}
        </div>
      </div>
      {hide && (
        <div className="text-xs mu mb-2">
          Đang đóng vai {hide}: lời của vai này được ẩn. Hãy tự nói, rồi bấm vào
          dòng để xem câu mẫu.
        </div>
      )}
      <div className="space-y-1">
        {lines.map((l, i) => (
          <DLine key={i} l={l} on={cur === i} hidden={hide === l.sp} />
        ))}
      </div>
    </div>
  );
}
function DLine({ l, on, hidden }) {
  const { st } = useApp(),
    [show, setShow] = useState(false);
  useEffect(() => setShow(false), [hidden]);
  const hid = hidden && !show;
  return (
    <div className={`flex gap-3 items-start p-2 rounded-xl ${on ? 'hl' : ''}`}>
      <span
        className={`chip ${l.sp === 'A' ? '' : 'chip-r'}`}
        style={{ minWidth: 26, justifyContent: 'center' }}
      >
        {l.sp}
      </span>
      <div className="flex-1 min-w-0" onClick={() => hidden && setShow(true)}>
        {hid ? (
          <div className="mu italic text-sm cursor-pointer">
            (Đến lượt bạn nói — bấm để xem câu mẫu)
          </div>
        ) : (
          <>
            <div className="han text-lg">{zh(l.s)}</div>
            {st.settings.py && l.py && <div className="mu text-sm">{l.py}</div>}
            {st.settings.vi && l.vi && <div className="text-sm">{l.vi}</div>}
          </>
        )}
      </div>
      <SpeakBtn text={l.s} />
    </div>
  );
}
function Passage({ r, noVi }) {
  const { st } = useApp();
  return (
    <div className="card p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold han">{r.t}</div>
        <button
          className="btn btn-sm btn-g"
          disabled={!ttsOK()}
          onClick={() => speakSeq(r.lines.map((l) => ({ s: l.s })))}
        >
          <Play size={14} /> Nghe
        </button>
      </div>
      {r.lines.map((l, i) => (
        <div key={i}>
          <span className="han text-lg">{zh(l.s)}</span>
          {st.settings.py && <div className="mu text-sm">{l.py}</div>}
          {st.settings.vi && !noVi && <div className="text-sm">{l.vi}</div>}
        </div>
      ))}
    </div>
  );
}
function WordCard({ w }) {
  const { st, upd } = useApp(),
    s = st.settings,
    r = st.srs[w.id],
    status = srsStatus(r);
  const related = HSK1_WORDS.filter(
    (x) =>
      x.id !== w.id && x.h.length > 1 && w.h.length === 1 && x.h.includes(w.h)
  ).slice(0, 4);
  const tone = {
    known: 'chip-ok',
    due: 'chip-r',
    learning: 'chip-w',
    new: 'chip-mu',
  }[status];
  return (
    <div className="card mb-word p-4">
      <MiniBloom
        kind="ranunculus"
        palette="peach"
        size={26}
        className="mb-word-bloom"
      />
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="han text-3xl font-bold">{w.h}</span>
            {w.em && <span className="text-2xl">{w.em}</span>}
            <SpeakBtn text={w.h} />
          </div>
          {s.py && <div className="pri font-medium">{w.py}</div>}
          {s.vi && (
            <div>
              {w.vi}
              {w.pos && <span className="chip chip-mu ml-2">{POS[w.pos]}</span>}
            </div>
          )}
        </div>
        <span className={`chip ${tone}`}>{SRS_LABEL[status]}</span>
      </div>
      {w.ex && (
        <div
          className="mt-3 pt-3"
          style={{ borderTop: '1px dashed var(--bd)' }}
        >
          <div className="flex items-center gap-2">
            <span className="han text-lg">{zh(w.ex)}</span>
            <SpeakBtn text={w.ex} />
          </div>
          {s.py && <div className="mu text-sm">{w.exPy}</div>}
          {s.vi && <div className="text-sm">{w.exVi}</div>}
        </div>
      )}
      {related.length > 0 && (
        <div className="mt-2 text-xs mu">
          Từ liên quan:{' '}
          {related.map((x) => (
            <span key={x.id} className="han mr-2">
              {x.h} ({x.vi})
            </span>
          ))}
        </div>
      )}
      {!r && (
        <button
          className="btn btn-sm btn-g mt-3"
          onClick={() => upd((x) => introWords(x, [w.id]))}
        >
          <Layers size={14} /> Thêm vào ôn tập
        </button>
      )}
    </div>
  );
}

/* ---------- 23. Bộ máy làm bài ---------- */
function QMatch({ q, locked, onComplete }) {
  const [right] = useState(() =>
    shuffle(q.pairs.map((p, i) => ({ t: p[1], i })))
  );
  const [sel, setSel] = useState(null),
    [done, setDone] = useState([]),
    [err, setErr] = useState(0),
    [bad, setBad] = useState(null);
  const tap = (r) => {
    if (locked || sel === null || done.includes(r.i)) return;
    if (r.i === sel) {
      const nd = [...done, r.i];
      setDone(nd);
      setSel(null);
      if (nd.length === q.pairs.length) onComplete(err);
    } else {
      setErr(err + 1);
      setBad(r.i);
      setSel(null);
      setTimeout(() => setBad(null), 450);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div className="space-y-2">
        {q.pairs.map((p, i) => (
          <button
            key={i}
            className={`opt ${
              done.includes(i) ? 'good' : sel === i ? 'sel' : ''
            }`}
            disabled={locked || done.includes(i)}
            onClick={() => setSel(i)}
          >
            <span className={q.emoLeft ? 'text-3xl' : 'han text-lg'}>
              {p[0]}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {right.map((r) => (
          <button
            key={r.i}
            className={`opt ${
              done.includes(r.i) ? 'good' : bad === r.i ? 'wrong shake' : ''
            }`}
            disabled={locked || done.includes(r.i)}
            onClick={() => tap(r)}
          >
            <span className={hasHz(r.t) ? 'han text-lg' : 'text-sm'}>
              {r.t}
            </span>
          </button>
        ))}
      </div>
      <div className="col-span-2 text-xs mu">
        Chọn một mục bên trái rồi chọn mục tương ứng bên phải. Số lần ghép sai:{' '}
        {err}
      </div>
    </div>
  );
}

function QItem({ q, mode, idx, total, onDone }) {
  const { st } = useApp(),
    s = st.settings;
  const [a, setA] = useState(
    q.kind === 'order'
      ? []
      : q.kind === 'combo'
      ? [null, null]
      : q.kind === 'type'
      ? ''
      : null
  );
  const [fb, setFb] = useState(null);
  const stopRef = useRef(null);
  const listen = !!(q.audio || q.dialog);
  const play = (rate) => {
    if (q.dialog) {
      if (stopRef.current) stopRef.current();
      stopRef.current = speakSeq(q.dialog);
    } else if (q.audio) speak(q.audio, rate ? { rate } : {});
  };
  useEffect(() => {
    // tự phát âm khi mở câu nghe
    const t = listen ? setTimeout(() => play(), 400) : null;
    return () => {
      if (t) clearTimeout(t);
      if (stopRef.current) stopRef.current();
    };
  }, [q.id]);
  const ready =
    q.kind === 'mc'
      ? a !== null
      : q.kind === 'order'
      ? a.length > 0
      : q.kind === 'type'
      ? a.trim().length > 0
      : q.kind === 'combo'
      ? !!(a[0] && a[1])
      : false;
  const check = (val) => {
    const ans =
      q.kind === 'order'
        ? a.map((k) => q.tokens[k])
        : val !== undefined
        ? val
        : a;
    const r = judge(q, ans),
      out = { q, a: ans, ok: r.ok, note: r.note };
    if (mode === 'test') {
      onDone(out);
      return;
    } // chế độ kiểm tra: không báo đúng/sai từng câu
    setFb(out);
    if (q.kind === 'order' && q.full && q.full.s) speak(q.full.s);
  };
  useEffect(() => {
    // phím tắt: 1–9 chọn đáp án · Enter kiểm tra / tiếp tục
    const h = (e) => {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (
        q.kind === 'mc' &&
        !fb &&
        /^[1-9]$/.test(e.key) &&
        +e.key <= q.opts.length
      )
        setA(+e.key - 1);
      if (e.key === 'Enter') {
        e.preventDefault();
        if (fb) onDone(fb);
        else if (ready) check();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
  const optCls = (good, chosen) =>
    fb ? (good ? 'good' : chosen ? 'wrong' : '') : chosen ? 'sel' : '';
  const isEmo = q.kind === 'mc' && q.opts.some((o) => o.emo);
  return (
    <div className="fade">
      {q.partT && <div className="chip mb-3">{q.partT}</div>}
      <div className="text-sm font-semibold mu mb-3">{q.title}</div>
      {q.passage !== undefined && READ_DATA[q.passage] && (
        <div className="mb-3">
          <Passage r={READ_DATA[q.passage]} noVi />
        </div>
      )}
      {listen && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button
            className="btn btn-p"
            disabled={!ttsOK()}
            onClick={() => play()}
          >
            <Volume2 size={18} /> {q.dialog ? 'Nghe hội thoại' : 'Nghe'}
          </button>
          {!q.dialog && (
            <button
              className="btn btn-o btn-sm"
              disabled={!ttsOK()}
              onClick={() => play(0.7)}
            >
              Nghe chậm
            </button>
          )}
          {!ttsOK() && (
            <span className="text-xs red">
              Trình duyệt chưa hỗ trợ phát âm — hãy dùng Chrome, Edge hoặc
              Safari bản mới.
            </span>
          )}
        </div>
      )}
      {q.emoji && <div className="text-7xl text-center my-3">{q.emoji}</div>}
      {q.prompt && (
        <div
          className={
            q.vi
              ? 'text-lg font-semibold mb-2'
              : `han font-semibold mb-1 ${q.big ? 'text-4xl' : 'text-2xl'}`
          }
          style={
            q.bad ? { textDecoration: 'underline wavy var(--red)' } : undefined
          }
        >
          {q.prompt}
        </div>
      )}
      {q.pyForce && (
        <div className="text-xl pri font-medium mb-2">{q.pyForce}</div>
      )}
      {q.py && s.py && !q.pyForce && <div className="mu mb-2">{q.py}</div>}
      {q.sub && <div className="mb-3 text-sm italic">{q.sub}</div>}

      {q.kind === 'mc' && (
        <div
          className={`grid gap-2 mt-3 ${
            isEmo ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {q.opts.map((o, k) => (
            <button
              key={k}
              className={`opt ${optCls(o.ok, k === a)}`}
              disabled={!!fb}
              onClick={() => setA(k)}
            >
              <div
                className={`flex items-center gap-3 ${
                  isEmo ? 'justify-center' : ''
                }`}
              >
                {!isEmo && <span className="chip chip-mu">{k + 1}</span>}
                <div className="min-w-0">
                  <div
                    className={
                      o.emo
                        ? 'text-5xl'
                        : hasHz(o.t)
                        ? `han ${q.bigOpts ? 'text-2xl' : 'text-lg'}`
                        : ''
                    }
                  >
                    {o.t}
                  </div>
                  {o.py && s.py && <div className="mu text-xs">{o.py}</div>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {q.kind === 'order' && (
        <div className="mt-3">
          <div
            className={`card p-3 mb-3 flex gap-2 ${
              q.big ? 'flex-col' : 'flex-wrap'
            }`}
            style={{ minHeight: 56, borderStyle: 'dashed' }}
          >
            {a.length ? (
              a.map((k, j) => (
                <button
                  key={j}
                  className="tok han text-lg"
                  style={q.big ? { textAlign: 'left' } : undefined}
                  disabled={!!fb}
                  onClick={() => setA(a.filter((_, x) => x !== j))}
                >
                  {q.tokens[k]}
                </button>
              ))
            ) : (
              <span className="mu text-sm">
                Bấm vào các thẻ bên dưới để ghép; bấm lại thẻ đã chọn để bỏ ra.
              </span>
            )}
          </div>
          <div className={`flex gap-2 ${q.big ? 'flex-col' : 'flex-wrap'}`}>
            {q.tokens.map((t, k) =>
              a.includes(k) ? null : (
                <button
                  key={k}
                  className="tok han text-lg"
                  style={q.big ? { textAlign: 'left' } : undefined}
                  disabled={!!fb}
                  onClick={() => setA([...a, k])}
                >
                  {t}
                </button>
              )
            )}
          </div>
          {q.extra > 0 && (
            <div className="text-xs mu mt-2">
              Có {q.extra} thẻ thừa — không cần dùng hết.
            </div>
          )}
        </div>
      )}

      {q.kind === 'type' && (
        <div className="mt-3">
          <input
            className="inp han text-lg"
            value={a}
            disabled={!!fb}
            autoFocus
            placeholder={
              q.input === 'py'
                ? 'Gõ Pinyin: hǎo hoặc hao3'
                : 'Gõ chữ Hán, hoặc Pinyin có thanh: ni3 hao3'
            }
            onChange={(e) => setA(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (fb) onDone(fb);
                else if (a.trim()) check();
              }
            }}
          />
          {/\d/.test(a) && (
            <div className="text-sm mu mt-1">
              Hiển thị: <span className="pri">{numToMark(a)}</span>
            </div>
          )}
        </div>
      )}

      {q.kind === 'combo' && (
        <div className="mt-3 space-y-3">
          {[
            ['Thanh mẫu', q.inis, 0],
            ['Vận mẫu', q.fins, 1],
          ].map(([lb, list, p]) => (
            <div key={lb}>
              <div className="text-xs mu mb-1">{lb}</div>
              <div className="flex flex-wrap gap-2">
                {list.map((x) => (
                  <button
                    key={x}
                    className={`opt ${optCls(x === q.ans[p], a[p] === x)}`}
                    style={{ width: 'auto', minWidth: 64, textAlign: 'center' }}
                    disabled={!!fb}
                    onClick={() => setA(p ? [a[0], x] : [x, a[1]])}
                  >
                    <b>{x}</b>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {q.kind === 'match' && (
        <QMatch q={q} locked={!!fb} onComplete={(err) => check(err)} />
      )}

      {fb && (
        <div className={`mt-4 p-3 ${fb.ok ? 'fb-ok pop' : 'fb-bad shake'}`}>
          <div className="font-bold flex items-center gap-2">
            {fb.ok ? (
              <>
                <Check size={18} /> Chính xác!{' '}
                <MiniBloom
                  kind="tulip"
                  palette="pink"
                  size={22}
                  className="mb-bloom-pop"
                />
              </>
            ) : (
              <>
                <X size={18} /> Chưa đúng — xem giải thích bên dưới nhé
              </>
            )}
          </div>
          {fb.note && <div className="text-sm mt-1">{fb.note}</div>}
          {!fb.ok && ansText(q) && (
            <div className="text-sm mt-1">
              Đáp án đúng: <b className="han">{ansText(q)}</b>
            </div>
          )}
          {q.exp && <div className="text-sm mt-1">{q.exp}</div>}
          {q.dialog && (
            <div className="text-sm mt-2 han">
              {q.dialog.map((l, k) => (
                <div key={k}>
                  {l.sp}: {zh(l.s)}
                </div>
              ))}
            </div>
          )}
          {(q.full?.s || q.audio) && ttsOK() && (
            <button
              className="btn btn-sm btn-g mt-2"
              onClick={() => speak(q.full?.s || q.audio)}
            >
              <Volume2 size={14} /> Nghe lại
            </button>
          )}
        </div>
      )}
      <div className="flex items-center justify-between gap-2 mt-5">
        <span className="text-xs mu">
          Câu {idx + 1}/{total} · phím 1–4 để chọn, Enter để kiểm tra
        </span>
        {fb ? (
          <button className="btn btn-p" onClick={() => onDone(fb)}>
            Tiếp tục <ChevronRight size={16} />
          </button>
        ) : (
          q.kind !== 'match' && (
            <button
              className="btn btn-p"
              disabled={!ready}
              onClick={() => check()}
            >
              {mode === 'test' ? 'Trả lời' : 'Kiểm tra'}
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* Quiz: mode "practice" (báo đúng/sai ngay) | "test" (chấm cuối bài); timer = số giây (0 = không giới hạn)
   onFinish(res, {retry, timeUp}) — res = [{q, ok, a}] · resultExtra(res, isRetry) → nội dung thêm ở trang kết quả */
function Quiz({
  qs: initial,
  mode = 'practice',
  timer = 0,
  title,
  onFinish,
  resultExtra,
  onExit,
}) {
  const { celebrate } = useApp();
  const [run, setRun] = useState({ qs: initial, n: 0 });
  const [i, setI] = useState(0),
    [res, setRes] = useState([]),
    [phase, setPhase] = useState('q'),
    [left, setLeft] = useState(timer);
  useEffect(() => {
    setRun({ qs: initial, n: 0 });
    setI(0);
    setRes([]);
    setPhase('q');
    setLeft(timer);
  }, [initial]);
  const qs = run.qs,
    q = qs[i],
    timed = timer > 0 && run.n === 0;
  const finish = (nr, timeUp) => {
    const all = timeUp
      ? [
          ...nr,
          ...qs
            .slice(nr.length)
            .map((x) => ({ q: x, ok: false, a: null, skip: true })),
        ]
      : nr;
    setRes(all);
    setPhase('result');
    stopSpeak();
    if (onFinish) onFinish(all, { retry: run.n > 0, timeUp: !!timeUp });
    if (all.length && pct(all.filter((x) => x.ok).length, all.length) >= 80)
      celebrate();
  };
  useEffect(() => {
    if (!timed || phase !== 'q') return undefined;
    if (left <= 0) {
      finish(res, true);
      return undefined;
    }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [left, phase, timed]);

  if (!qs.length)
    return (
      <div className="max-w-xl mx-auto">
        <Empty>
          Chưa đủ nội dung đã học để tạo bộ câu hỏi này. Hãy học thêm bài, hoặc
          chọn phạm vi “Toàn bộ HSK 1”.
        </Empty>
        {onExit && (
          <div className="text-center mt-3">
            <button className="btn btn-o" onClick={onExit}>
              Quay lại
            </button>
          </div>
        )}
      </div>
    );
  if (phase === 'result')
    return (
      <QuizResult
        res={res}
        title={title}
        extra={resultExtra ? resultExtra(res, run.n > 0) : null}
        onExit={onExit}
        onRetry={() => {
          setRun({
            qs: res.filter((r) => !r.ok).map((r) => reshuffle(r.q)),
            n: run.n + 1,
          });
          setI(0);
          setRes([]);
          setPhase('q');
        }}
      />
    );
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-3">
        {onExit && (
          <button
            className="btn btn-o btn-sm"
            title="Thoát"
            onClick={() => {
              stopSpeak();
              onExit();
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
        <div className="flex-1">
          <Bar v={pct(i, qs.length)} />
        </div>
        <span className="text-sm mu">
          {i + 1}/{qs.length}
        </span>
        {timed && (
          <span className={`chip ${left < 60 ? 'chip-r' : ''}`}>
            <Clock size={12} /> {fmtTime(left)}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="text-sm font-semibold">
          {title}
          {run.n > 0 && (
            <span className="chip chip-w ml-2">Làm lại câu sai</span>
          )}
        </div>
        <ViewToggles compact />
      </div>
      <div className="card mb-qcard p-4 md:p-6">
        <div className="mb-q-sprig" aria-hidden="true">
          <Ranunculus palette="blush" size={44} />
        </div>
        <QItem
          key={q.id}
          q={q}
          mode={run.n ? 'practice' : mode}
          idx={i}
          total={qs.length}
          onDone={(r) => {
            const nr = [...res, r];
            setRes(nr);
            if (i + 1 >= qs.length) finish(nr);
            else setI(i + 1);
          }}
        />
      </div>
    </div>
  );
}

function QuizResult({ res, title, extra, onRetry, onExit }) {
  const ok = res.filter((r) => r.ok).length,
    p = pct(ok, res.length),
    wrong = res.filter((r) => !r.ok),
    sk = {};
  res.forEach(({ q, ok: g }) => {
    const b = (sk[q.sk] = sk[q.sk] || [0, 0]);
    b[0] += g ? 1 : 0;
    b[1]++;
  });
  const refsOf = (q) => q.refs || (q.ref && WORDS[q.ref] ? [q.ref] : []);
  const wrongW = new Set(wrong.flatMap((r) => refsOf(r.q)));
  const learned = uniq(
    res.filter((r) => r.ok).flatMap((r) => refsOf(r.q))
  ).filter((id) => !wrongW.has(id));
  return (
    <div className="max-w-2xl mx-auto space-y-4 fade">
      <div className="card accent mb-result p-6 text-center">
        <div className="mb-result-flowers" aria-hidden="true">
          {p >= 80 ? (
            <TulipBouquet height={150} />
          ) : p >= 60 ? (
            <RoseCluster size={150} palettes={['pink', 'cream']} />
          ) : (
            <RanunculusCluster
              size={140}
              palettes={['blush', 'cream', 'butter']}
            />
          )}
        </div>
        <div className="text-sm mu">{title || 'Kết quả'}</div>
        <div className="flex justify-center my-3">
          <Ring
            v={p}
            size={120}
            stroke={10}
            color={p >= 80 ? 'var(--pri-d)' : p >= 60 ? '#E3C27F' : '#E6A3B6'}
          >
            <span className="mb-result-score">{p}%</span>
          </Ring>
        </div>
        <div className="font-semibold">
          Đúng {ok}/{res.length} câu · Sai {res.length - ok} câu
        </div>
        <div className="mb-cheer mt-2">
          {p >= 90
            ? 'Tuyệt vời! Khu vườn kiến thức của bạn đang nở rộ.'
            : p >= 80
            ? 'Rất tốt! Bạn đã sẵn sàng cho chặng tiếp theo.'
            : p >= 60
            ? 'Khá lắm! Ôn lại vài chỗ sai là bạn sẽ vững hơn.'
            : 'Đừng nản nhé — mỗi lần ôn là thêm một bông hoa. Cùng làm lại câu sai nào!'}
        </div>
        {extra}
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Kết quả theo kỹ năng</div>
        <div className="space-y-2">
          {Object.entries(sk).map(([k, [a, n]]) => (
            <div key={k}>
              <div className="flex justify-between text-sm">
                <span>{SKILLS[k] || k}</span>
                <span className={pct(a, n) < 60 ? 'red font-semibold' : ''}>
                  {a}/{n} · {pct(a, n)}%
                </span>
              </div>
              <Bar
                v={pct(a, n)}
                h={6}
                color={pct(a, n) < 60 ? 'var(--red)' : undefined}
              />
            </div>
          ))}
        </div>
      </div>
      {learned.length > 0 && (
        <div className="card p-4">
          <div className="font-semibold mb-2">Từ đã trả lời đúng</div>
          <div className="flex flex-wrap gap-2">
            {learned.map((id) => (
              <span key={id} className="chip chip-ok han">
                {WORDS[id].h} · {WORDS[id].vi}
              </span>
            ))}
          </div>
        </div>
      )}
      {wrong.length > 0 && (
        <div className="card p-4">
          <div className="font-semibold mb-2">
            Nội dung cần ôn lại ({wrong.length})
          </div>
          <div className="space-y-3">
            {wrong.map((r, k) => (
              <div
                key={k}
                className="text-sm pb-2"
                style={{ borderBottom: '1px solid var(--bd)' }}
              >
                <div className="mu">{r.q.title}</div>
                {r.q.prompt && <div className="han">{r.q.prompt}</div>}
                {ansText(r.q) && (
                  <div>
                    Đáp án: <b className="han">{ansText(r.q)}</b>
                  </div>
                )}
                {r.q.exp && <div>{r.q.exp}</div>}
                {r.skip && (
                  <div className="red text-xs">Chưa trả lời (hết giờ)</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs mu mt-2">
            Các từ và cấu trúc trả lời sai đã tự động được đưa vào danh sách ôn
            tập.
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center">
        {wrong.length > 0 && onRetry && (
          <button className="btn btn-r" onClick={onRetry}>
            <RotateCcw size={16} /> Làm lại câu sai
          </button>
        )}
        {onExit && (
          <button className="btn btn-o" onClick={onExit}>
            Quay lại
          </button>
        )}
      </div>
    </div>
  );
}

/* ========================= HẾT PHẦN 3/6 ========================= */
/* =====================================================================
   PHẦN 4/6: TRANG CHỦ · LỘ TRÌNH · HÔM NAY · BÀI HỌC 8 BƯỚC · TỪ VỰNG · NGỮ PHÁP
   Dán ngay sau Phần 3. Mỗi trang nhận { params } do App (Phần 6) truyền vào.
   Lưu ý: Phần 1 phải import `Bar as RBar` từ "recharts".
   ===================================================================== */

const GOALS = [
  ['all', 'Học toàn diện'],
  ['daily', 'Giao tiếp hằng ngày'],
  ['hsk', 'Thi lấy chứng chỉ HSK'],
  ['work', 'Giao tiếp công việc'],
  ['biz', 'Giao tiếp thương mại'],
  ['travel', 'Du lịch'],
];
const GOAL_COMM = {
  all: [0, 1, 3, 4],
  daily: [0, 1, 2, 3, 4, 9],
  hsk: [0, 1, 3, 4],
  work: [10, 11, 8, 18],
  biz: [12, 13, 14, 15, 16, 17],
  travel: [5, 6, 7, 3],
};
const levelLabel = (lv) =>
  ({ 0: 'Mới bắt đầu', basic: 'Đã học cơ bản' }[lv] ||
  (lv ? `HSK ${lv}` : 'Chưa xác định'));
const STATUS_CHIP = {
  known: 'chip-ok',
  due: 'chip-r',
  learning: 'chip-w',
  new: 'chip-mu',
};
const viNorm = (s = '') =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
const matchWord = (w, q) => {
  const s = q.trim();
  if (!s) return true;
  if (hasHz(s)) return w.h.includes(s);
  const k = noTone(s);
  return (!!k && noTone(w.py).includes(k)) || viNorm(w.vi).includes(viNorm(s));
};
const chartColors = (dark) =>
  dark
    ? {
        pri: '#A9CA8D',
        red: '#F2A9BA',
        ok: '#BFD9A6',
        grid: '#3A4936',
        tx: '#B3C2A8',
        card: '#232D21',
      }
    : {
        pri: '#A9CA8D',
        red: '#E6A3B6',
        ok: '#8DAF70',
        grid: '#DBE9C9',
        tx: '#5F7356',
        card: '#FFFDF8',
      };

function StatusIcon({ s }) {
  if (s === 'passed')
    return (
      <span className="chip chip-ok">
        <Check size={12} /> Đạt
      </span>
    );
  if (s === 'failed')
    return (
      <span className="chip chip-r">
        <X size={12} /> Chưa đạt
      </span>
    );
  if (s === 'open')
    return (
      <span className="chip">
        <Play size={12} /> Đang mở
      </span>
    );
  if (s === 'flex')
    return (
      <span className="chip chip-w">
        <Lock size={12} /> Chưa đủ điều kiện
      </span>
    );
  return (
    <span className="chip chip-mu">
      <Lock size={12} /> Khóa
    </span>
  );
}

function MonthCal() {
  const { st } = useApp(),
    [off, setOff] = useState(0);
  const b = new Date();
  b.setDate(1);
  b.setMonth(b.getMonth() + off);
  const y = b.getFullYear(),
    m = b.getMonth(),
    first = (new Date(y, m, 1).getDay() + 6) % 7,
    n = new Date(y, m + 1, 0).getDate();
  const goal = st.profile.minutes || 30,
    today = dkey();
  const act = (d) =>
    d >= 1 && d <= n && activeDay(st.days[dkey(new Date(y, m, d))]);
  const cells = [
    ...Array(first).fill(null),
    ...Array.from({ length: n }, (_, i) => i + 1),
  ];
  const metN = Array.from({ length: n }, (_, i) => i + 1).filter(
    (d) => (st.days[dkey(new Date(y, m, d))]?.m || 0) >= goal
  ).length;
  const leaf = (s) => (
    <svg width={s} height={s} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 17C4 9 9 4 17 3C16 11 11 16 3 17Z" fill="#8DAF70" />
      <path
        d="M4.5 15.5C8 12 11 9 15 5"
        stroke="#fff"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
  return (
    <div className="card mb-planner p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          className="btn btn-o btn-sm"
          aria-label="Tháng trước"
          onClick={() => setOff(off - 1)}
        >
          <ChevronLeft size={14} />
        </button>
        <div className="text-center">
          <div className="mb-planner-title">
            Tháng {m + 1} · {y}
          </div>
          <div className="text-xs mu">
            {metN} ngày đạt mục tiêu {goal} phút
          </div>
        </div>
        <button
          className="btn btn-o btn-sm"
          aria-label="Tháng sau"
          disabled={off >= 0}
          onClick={() => setOff(off + 1)}
        >
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="mb-cal">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
          <div key={d} className="mb-cal-h">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const k = dkey(new Date(y, m, d)),
            x = st.days[k],
            met = (x?.m || 0) >= goal,
            a = act(d),
            col = i % 7;
          const rl = a && col > 0 && act(d - 1),
            rr = a && col < 6 && act(d + 1);
          return (
            <div
              key={i}
              title={
                x ? `${x.m || 0} phút · ${x.q || 0} câu · ${x.r || 0} thẻ` : ''
              }
              className={`mb-cal-c ${a ? 'on' : ''} ${rl ? 'rl' : ''} ${
                rr ? 'rr' : ''
              } ${k === today ? 'today' : ''}`}
            >
              <span className="mb-cal-n">{d}</span>
              {met ? (
                <span className="mb-cal-leaf">{leaf(12)}</span>
              ) : a ? (
                <span className="mb-cal-dot" />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 text-xs mu mt-3">
        <span className="inline-flex items-center gap-1">
          {leaf(12)} Đạt mục tiêu
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="mb-cal-dot" /> Có học
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="mb-cal-band" /> Chuỗi ngày liên tục
        </span>
      </div>
    </div>
  );
}

/* ---------- 24. Trang chủ / Dashboard ---------- */
function HomePage() {
  const { st, go } = useApp(),
    C = chartColors(st.settings.dark);
  const ws = wordStats(st),
    cur = currentLesson(st),
    prog = hskProgress(st),
    streak = streakOf(st);
  const day = st.days[dkey()] || {},
    goal = st.profile.minutes || 30;
  const last = st.hist.find((h) => h.k === 'lesson' || h.k === 'exam'),
    pd = projectDate(st),
    wk = weakSkill(st);
  const mist = Object.values(st.mist)
    .filter((m) => m.q)
    .sort((a, b) => b.n - a.n)
    .slice(0, 4);
  const radar = skillAcc(st).map((x) => ({ k: x.name, v: x.v })),
    week = lastDays(st, 7);
  return (
    <div className="space-y-4">
      <div className="card mb-banner p-5 md:p-6">
        <div className="mb-banner-body min-w-0">
          <div className="mu text-sm">
            {new Date().toLocaleDateString('vi-VN', {
              weekday: 'long',
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}
          </div>
          <h1 className="mb-title mt-1">
            {(() => {
              const h = new Date().getHours();
              return h < 11
                ? 'Chào buổi sáng'
                : h < 13
                ? 'Chào buổi trưa'
                : h < 18
                ? 'Chào buổi chiều'
                : 'Chào buổi tối';
            })()}
            {st.profile.name ? `, ${st.profile.name}` : ''}!{' '}
            <span className="han" style={{ color: 'var(--red)' }}>
              加油！
            </span>
          </h1>
          <div className="text-sm mt-1">
            Hôm nay mình cùng học tiếng Trung nhé! · Đang học <b>HSK 1</b> ·
            Tuần {cur.w}/10 ·{' '}
            {GOALS.find((g) => g[0] === st.profile.goal)?.[1] ||
              'Học toàn diện'}
          </div>
          <div className="mb-goal mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Mục tiêu hôm nay</span>
              <b>
                {day.m || 0}/{goal} phút
                {(day.m || 0) >= goal ? ' · Đã đạt' : ''}
              </b>
            </div>
            <Bar v={pct(day.m || 0, goal)} h={10} />
            <div className="text-xs mu mt-1">
              Từ cần ôn: {ws.due} · Câu đã làm hôm nay: {day.q || 0}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="btn btn-p"
              onClick={() => go('lesson', { id: cur.id })}
            >
              <Play size={16} /> Bắt đầu học: {cur.t}
            </button>
            <button className="btn btn-o" onClick={() => go('today')}>
              <CalendarCheck size={16} /> Kế hoạch hôm nay
            </button>
          </div>
        </div>
        <div className="mb-banner-flowers" aria-hidden="true">
          <TulipBouquet height={196} />
          <RoseCluster
            size={118}
            palettes={['blush', 'cream']}
            className="mb-banner-rose"
          />
        </div>
      </div>

      {ws.due > 0 && (
        <div
          className="card p-3 flex flex-wrap items-center gap-3"
          style={{ borderColor: 'var(--red)' }}
        >
          <Brain size={20} className="red" />
          <div className="flex-1 text-sm">
            Bạn có <b>{ws.due}</b> từ đến hạn ôn tập. Ôn từ cũ trước khi học từ
            mới giúp nhớ lâu hơn.
          </div>
          <button className="btn btn-r btn-sm" onClick={() => go('flash')}>
            Ôn ngay
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          icon={GraduationCap}
          label="Trình độ hiện tại"
          value={levelLabel(st.profile.level)}
          sub="Cấp đang học: HSK 1"
        />
        <Stat
          icon={Map}
          label="Tuần học hiện tại"
          value={`Tuần ${cur.w}/10`}
          sub={`Buổi ${cur.i}: ${cur.t}`}
        />
        <Stat
          icon={Award}
          label="Hoàn thành HSK 1"
          value={`${prog.p}%`}
          sub={`${prog.done}/${prog.total} buổi đạt`}
          tone="ok"
        />
        <Stat
          icon={Flame}
          label="Ngày học liên tục"
          value={`${streak} ngày`}
          tone="red"
        />
        <Stat
          icon={BookOpen}
          label="Từ đã học"
          value={ws.learned}
          sub={`Đã thuộc: ${ws.known}`}
        />
        <Stat
          icon={Layers}
          label="Từ cần ôn"
          value={ws.due}
          sub={`Thường sai: ${ws.hard}`}
          tone={ws.due ? 'red' : 'ok'}
        />
        <Stat
          icon={ClipboardList}
          label="Điểm kiểm tra gần nhất"
          value={last ? `${pct(last.sc, last.n)}%` : '—'}
          sub={last ? last.title : 'Chưa làm bài kiểm tra'}
          tone="w"
        />
        <Stat
          icon={Target}
          label="Dự kiến xong HSK 1"
          value={pd ? fmtDate(pd) : 'Đã hoàn thành'}
          sub="Theo tốc độ học thực tế"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">
            Thống kê kỹ năng (% trả lời đúng)
          </div>
          {Object.keys(st.skills).length ? (
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radar} outerRadius="72%">
                <PolarGrid stroke={C.grid} />
                <PolarAngleAxis
                  dataKey="k"
                  tick={{ fill: C.tx, fontSize: 11 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  dataKey="v"
                  stroke={C.red}
                  fill={C.red}
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <Empty>Làm bài tập để xem biểu đồ kỹ năng.</Empty>
          )}
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">
            Thời gian học 7 ngày qua (phút)
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={week}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: C.tx, fontSize: 11 }} />
              <YAxis
                tick={{ fill: C.tx, fontSize: 11 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: C.card,
                  border: `1px solid ${C.grid}`,
                  borderRadius: 10,
                }}
                formatter={(v) => [`${v} phút`, 'Thời gian học']}
              />
              <RBar dataKey="m" fill={C.pri} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <MonthCal />
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Gợi ý cá nhân hóa</div>
          {wk ? (
            <div className="box box-w">
              Kỹ năng yếu nhất: <b>{wk.name}</b> ({wk.v}%).{' '}
              <button
                className="btn btn-sm btn-o ml-1"
                onClick={() => go('today', { run: 'weak', sk: wk.k })}
              >
                Luyện ngay
              </button>
            </div>
          ) : (
            <div className="box">
              Chưa đủ dữ liệu để xác định kỹ năng yếu (cần ít nhất 5 câu cho mỗi
              kỹ năng).
            </div>
          )}
          {mist.length > 0 && (
            <div>
              <div className="text-sm font-semibold mb-1">
                Câu thường trả lời sai
              </div>
              {mist.map((m, i) => (
                <div
                  key={i}
                  className="text-sm flex justify-between gap-2 py-1"
                  style={{ borderBottom: '1px dashed var(--bd)' }}
                >
                  <span className="truncate">
                    {m.q.title}
                    {m.q.prompt ? `: ${m.q.prompt}` : ''}
                  </span>
                  <span className="chip chip-r">sai {m.n}×</span>
                </div>
              ))}
              <button
                className="btn btn-sm btn-r mt-2"
                onClick={() => go('today', { run: 'redo' })}
              >
                <RotateCcw size={14} /> Làm lại câu sai
              </button>
            </div>
          )}
          <div>
            <div className="text-sm font-semibold mb-1">
              Theo mục tiêu của bạn
            </div>
            <div className="flex flex-wrap gap-2">
              {(GOAL_COMM[st.profile.goal] || GOAL_COMM.all).map((i) => (
                <button
                  key={i}
                  className="btn btn-sm btn-g"
                  onClick={() => go('comm', { i })}
                >
                  {COMM[i].ic} {COMM[i].t}
                </button>
              ))}
              {st.profile.goal === 'hsk' && (
                <button className="btn btn-sm btn-r" onClick={() => go('exam')}>
                  Thi thử HSK 1
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ---------- Lộ trình dạng khu vườn: mỗi cấp HSK một màu pastel ---------- */
const LEVEL_THEME = [
  ['1', 'HSK 1', '#E4F0D1', '#A9CA8D', 'tulip', 'pink'],
  ['2', 'HSK 2', '#FBE9CD', '#E3C27F', 'ranunculus', 'butter'],
  ['3', 'HSK 3', '#F5DCE4', '#DFA2B6', 'rose', 'pink'],
  ['4', 'HSK 4', '#DDE8D3', '#9DB98A', 'ranunculus', 'cream'],
  ['5', 'HSK 5', '#FBE1D8', '#E8A994', 'tulip', 'peach'],
  ['6', 'HSK 6', '#ECE6F5', '#B3A3D2', 'peony', 'white'],
  ['7–9', 'HSK 7–9', '#F3EEE4', '#C2AD82', 'rose', 'cream'],
];
function GardenPath({ tab, setTab }) {
  const { st, go } = useApp(),
    prog = hskProgress(st),
    cur = currentLesson(st);
  return (
    <div className="mb-path">
      <div className="mb-path-row">
        {LEVEL_THEME.map(([lv, name, bg, ac, flower, pal], i) => {
          const O = OFFICIAL.rows.find((r) => r[0] === lv),
            R = ROAD.find((r) => r.lv === lv),
            h1 = lv === '1';
          return (
            <div key={lv} className={`mb-path-stop ${i % 2 ? 'alt' : ''}`}>
              <div
                className={`mb-zone ${tab === lv ? 'on' : ''}`}
                style={{ '--zbg': bg, '--zac': ac }}
                role="button"
                tabIndex={0}
                onClick={() => setTab(lv)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setTab(lv);
                }}
              >
                <MiniBloom
                  kind={flower}
                  palette={pal}
                  size={42}
                  className="mb-zone-bloom"
                />
                <div className="mb-zone-name">{name}</div>
                <div className="text-xs">
                  {O ? `${O[1].toLocaleString('vi-VN')} từ mục tiêu` : ''}
                </div>
                <div className="text-xs mu">
                  {h1
                    ? `${LESSONS.length} buổi học`
                    : R && R.wk
                    ? `${R.wk} tuần · dự kiến bổ sung`
                    : 'Dài hạn · dự kiến bổ sung'}
                </div>
                <div className="mt-2">
                  <Bar v={h1 ? prog.p : 0} h={6} color={ac} />
                </div>
                <div className="text-xs mt-1">
                  {h1 ? `Hoàn thành ${prog.p}%` : 'Chưa có bài học chi tiết'}
                </div>
                <button
                  className={`btn btn-sm mt-2 ${h1 ? 'btn-p' : 'btn-o'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (h1) go('lesson', { id: cur.id });
                    else setTab(lv);
                  }}
                >
                  {h1 ? 'Tiếp tục học' : 'Xem khung'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
/* ---------- 25. Lộ trình HSK 1–9 ---------- */
function RoadPage() {
  const { st, go, toast } = useApp(),
    [tab, setTab] = useState('1');
  const open = (l) =>
    canOpen(st, l)
      ? go('lesson', { id: l.id })
      : toast(
          'Hãy đạt bài trước để mở khóa, hoặc bật “Học linh hoạt” trong Cài đặt.'
        );
  const R = ROAD.find((r) => r.lv === tab),
    O = OFFICIAL.rows.find((r) => r[0] === tab);
  const fmt = (n) => n.toLocaleString('vi-VN');
  return (
    <div>
      <Title
        icon={Map}
        sub="Khung theo đề cương HSK 3.0 (2025). HSK 1 đã có nội dung học thực tế; HSK 2–9 hiện là khung chương trình, nội dung chi tiết dự kiến bổ sung."
      >
        <GardenPath tab={tab} setTab={setTab} />
        Lộ trình HSK 1–9
      </Title>
      <Tabs
        v={tab}
        on={setTab}
        tabs={[
          ['1', 'HSK 1'],
          ['2', 'HSK 2'],
          ['3', 'HSK 3'],
          ['4', 'HSK 4'],
          ['5', 'HSK 5'],
          ['6', 'HSK 6'],
          ['7–9', 'HSK 7–9'],
          ['doc', 'Đề cương & cấu trúc thi'],
        ]}
      />

      {tab === '1' && (
        <div className="space-y-3">
          <Note>
            HSK 1 — 10 tuần, 5 buổi/tuần. Mục tiêu đề cương:{' '}
            {fmt(OFFICIAL.rows[0][1])} từ, {OFFICIAL.rows[0][2]} chữ nhận biết.
            Dữ liệu hiện có: {HSK1_WORDS.length} từ do website biên soạn theo
            chủ đề — chưa phải danh sách chính thức.
          </Note>
          {WEEKS.map((W) => {
            const done = W.lessons.filter(
              (l) => st.lessons[l.id]?.passed
            ).length;
            return (
              <div key={W.w} className="card p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="font-semibold">
                    Tuần {W.w}: {W.t}
                  </div>
                  <span className="text-xs mu">
                    {done}/{W.lessons.length} buổi đạt
                  </span>
                </div>
                <Bar v={pct(done, W.lessons.length)} h={6} />
                <div className="mt-3 grid gap-2">
                  {W.lessons.map((l) => {
                    const r = st.lessons[l.id];
                    return (
                      <button
                        key={l.id}
                        className="opt flex flex-wrap items-center gap-3"
                        style={{ padding: '.55rem .8rem' }}
                        onClick={() => open(l)}
                      >
                        <span className="text-xs mu" style={{ minWidth: 48 }}>
                          Buổi {l.i}
                        </span>
                        <span className="flex-1 text-sm">
                          {l.t}{' '}
                          <span className="chip chip-mu ml-1">
                            {TYPE_LABEL[l.type]}
                          </span>
                        </span>
                        {r?.best !== undefined && (
                          <span className="text-xs mu">Cao nhất {r.best}%</span>
                        )}
                        <StatusIcon s={lessonStatus(st, l)} />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {R && (
        <div className="space-y-3">
          <div className="card accent p-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="chip chip-w">
                Khung chương trình — nội dung chi tiết dự kiến bổ sung
              </span>
              {R.wk > 0 && <span className="chip">{R.wk} tuần</span>}
              {O && (
                <span className="chip">
                  Tích lũy: {fmt(O[1])} từ · {fmt(O[2])} chữ nhận biết ·{' '}
                  {fmt(O[3])} chữ viết tay · {O[4]} điểm ngữ pháp
                </span>
              )}
            </div>
            <div className="font-semibold">Mục tiêu</div>
            <p className="text-sm">{R.goal}</p>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">
              {tab === '7–9'
                ? 'Chủ đề chuyên sâu'
                : 'Kế hoạch theo tuần / giai đoạn'}
            </div>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              {R.plan.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">Dạng bài tập tăng cường</div>
            <div className="flex flex-wrap gap-2">
              {R.ex.split(' · ').map((x) => (
                <span key={x} className="chip chip-mu">
                  {x}
                </span>
              ))}
            </div>
          </div>
          <Note tone="w">
            Cấp này chưa có bài học chi tiết trong phiên bản hiện tại. Dữ liệu
            được tổ chức theo mảng tuần → bài (giống HSK1_WEEKS) nên có thể bổ
            sung cùng định dạng mà không cần sửa giao diện. Trong lúc chờ, mục
            Giao tiếp thực tế có một số tình huống ở mức HSK 2–6.
          </Note>
        </div>
      )}

      {tab === 'doc' && (
        <div className="space-y-3">
          <div className="card p-4 overflow-x-auto">
            <div className="font-semibold mb-2">
              Số lượng theo đề cương HSK 3.0 (2025)
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {OFFICIAL.head.map((h) => (
                    <th key={h} className="text-left p-2 mu">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OFFICIAL.rows.map((r) => (
                  <tr key={r[0]} style={{ borderTop: '1px solid var(--bd)' }}>
                    {r.map((c, i) => (
                      <td key={i} className="p-2">
                        {i === 0 ? `HSK ${c}` : fmt(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-4 overflow-x-auto">
            <div className="font-semibold mb-2">Cấu trúc bài thi HSK 3.0</div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {OFFICIAL.examHead.map((h) => (
                    <th key={h} className="text-left p-2 mu">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OFFICIAL.exam.map((r) => (
                  <tr key={r[0]} style={{ borderTop: '1px solid var(--bd)' }}>
                    {r.map((c, i) => (
                      <td key={i} className="p-2">
                        {i === 0 ? `HSK ${c}` : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-4 space-y-2">
            {OFFICIAL.notes.map((n, i) => (
              <Note key={i}>{n}</Note>
            ))}
            <div className="text-xs mu">{OFFICIAL.src}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 26. Bài học hôm nay ---------- */
function TodayPage({ params = {} }) {
  const { st, upd, go } = useApp(),
    [run, setRun] = useState(null);
  const start = (k, sk) => {
    const t =
      {
        tone: 'Luyện thanh điệu hằng ngày',
        redo: 'Làm lại các câu thường sai',
        weak: sk ? `Luyện kỹ năng: ${SKILLS[sk]}` : 'Luyện tổng hợp',
      }[k] || 'Luyện tập';
    const qs =
      k === 'tone'
        ? buildToneDrill(st)
        : k === 'redo'
        ? buildRedo(st)
        : genSet(SKILL_GENS[sk] || MIXED_CODES, poolLearned(st), 10, st.recent);
    setRun({ k, qs, t });
  };
  useEffect(() => {
    if (params.run) start(params.run, params.sk);
  }, [params.run, params.sk]);
  if (run)
    return (
      <Quiz
        qs={run.qs}
        mode="practice"
        title={run.t}
        onExit={() => setRun(null)}
        onFinish={(res) =>
          upd((s) =>
            markDone(
              applyResults(s, res, { kind: 'practice', title: run.t }),
              run.k
            )
          )
        }
      />
    );
  const plan = todayPlan(st),
    day = st.days[dkey()] || {},
    done = day.done || {},
    goal = st.profile.minutes || 30;
  const act = (p) => {
    if (p.k === 'review') go('flash');
    else if (p.k === 'lesson') go('lesson', { id: p.les });
    else if (p.k === 'speak') go('speak');
    else start(p.k, p.sk);
  };
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Title
        icon={CalendarCheck}
        sub={`Lịch học tự động cho ${goal} phút/ngày — ưu tiên ôn từ cũ, câu hay sai và kỹ năng yếu.`}
      >
        Bài học hôm nay
      </Title>
      <div className="card p-4 flex items-center gap-4">
        <Ring
          v={pct(day.m || 0, goal)}
          size={84}
          stroke={8}
          color={(day.m || 0) >= goal ? 'var(--ok)' : 'var(--pri)'}
        >
          {day.m || 0}′
        </Ring>
        <div className="text-sm">
          Đã học{' '}
          <b>
            {day.m || 0}/{goal} phút
          </b>{' '}
          · {day.q || 0} câu ({pct(day.ok || 0, day.q || 0)}% đúng) ·{' '}
          {day.r || 0} lượt ôn thẻ
          <div className="mt-1">
            {(day.m || 0) >= goal
              ? 'Đã đạt mục tiêu hôm nay. Tuyệt vời!'
              : `Còn ${goal - (day.m || 0)} phút để đạt mục tiêu.`}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {plan.map((p, i) => (
          <div key={i} className="card p-3 flex items-center gap-3">
            <span
              className={`chip ${done[p.k] ? 'chip-ok' : 'chip-mu'}`}
              style={{
                width: 28,
                height: 28,
                justifyContent: 'center',
                padding: 0,
              }}
            >
              {done[p.k] ? <Check size={14} /> : i + 1}
            </span>
            <div className="flex-1">
              <div className="font-medium text-sm">{p.t}</div>
              <div className="text-xs mu">khoảng {p.min} phút</div>
            </div>
            <button
              className={`btn btn-sm ${done[p.k] ? 'btn-o' : 'btn-p'}`}
              onClick={() => act(p)}
            >
              {done[p.k] ? 'Làm lại' : 'Bắt đầu'}
            </button>
          </div>
        ))}
      </div>
      <Note>
        Thời gian học được tính tự động khi bạn thao tác trên website và tạm
        dừng nếu không hoạt động quá 2 phút.
      </Note>
    </div>
  );
}

/* ---------- 27. Ngữ pháp: trình bày + luyện ngay ---------- */
const grammarDrill = (g) =>
  [
    ...GR[g].q.map((_, i) => gramQ(g, i)),
    ...(GR[g].m
      ? [GEN.fix({ gram: [g], words: [], sents: [], dlgs: [] })]
      : []),
  ].filter(Boolean);
function GrammarView({ g, drill = true }) {
  const { st, upd } = useApp(),
    G = GR[g],
    s = st.settings;
  const [qs, setQs] = useState(() => grammarDrill(g));
  const mm = G.m ? G.m.split('|') : null;
  return (
    <div className="space-y-3">
      <div className="card accent p-4">
        <div className="mb-gram-title">{G.t}</div>
        <FloralCorner
          kind="ranunculus"
          pos="tr"
          size={46}
          palette="cream"
          style={{ top: -14, right: -6 }}
        />
        <div className="box mt-2 han font-semibold">{G.f}</div>
        <p className="mt-3 text-sm leading-relaxed">{G.e}</p>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-1">Ví dụ</div>
        {G.x.map((x, i) => {
          const [ss, py, vi] = x.split('|');
          return (
            <div
              key={i}
              className="py-2 flex gap-2 items-start"
              style={{ borderBottom: '1px dashed var(--bd)' }}
            >
              <div className="flex-1">
                <div className="han text-lg">{zh(ss)}</div>
                {s.py && <div className="mu text-sm">{py}</div>}
                {s.vi && <div className="text-sm">{vi}</div>}
              </div>
              <SpeakBtn text={ss} />
            </div>
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="card p-4">
          <div className="font-semibold mb-1">Trường hợp sử dụng</div>
          <p className="text-sm">{G.u}</p>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-1 red">
            Lỗi người Việt thường mắc
          </div>
          <p className="text-sm">{G.mt}</p>
          {mm && (
            <div className="text-sm mt-2">
              <div className="red han">✗ {zh(mm[0])}</div>
              <div className="okc han">✓ {zh(mm[1])}</div>
              <div className="mu">{mm[2]}</div>
            </div>
          )}
        </div>
      </div>
      {drill && (
        <div>
          <div className="font-semibold mb-2">Luyện ngay ({qs.length} câu)</div>
          <Quiz
            qs={qs}
            mode="practice"
            title={`Luyện: ${G.t}`}
            onExit={() => setQs(grammarDrill(g))}
            onFinish={(res) =>
              upd((x) =>
                applyResults(x, res, {
                  kind: 'practice',
                  ref: 'g:' + g,
                  title: `Ngữ pháp: ${G.t}`,
                })
              )
            }
          />
        </div>
      )}
    </div>
  );
}

/* ---------- 28. Phát âm trong bài học ---------- */
function tipsFor(ws) {
  const sy = ws.flatMap((w) =>
      sylls(w.py).map((x) => plainPy(x).toLowerCase())
    ),
    tn = ws.flatMap((w) => sylls(w.py).map(toneOf)),
    t = [];
  if (tn.includes(3)) t.push(PY_TIPS[0]);
  if (tn.includes(4)) t.push(PY_TIPS[1]);
  if (tn.includes(1)) t.push(PY_TIPS[2]);
  if (sy.some((x) => /^(zh|ch|sh|r|z|c|s|j|q|x)/.test(x))) t.push(PY_TIPS[3]);
  if (sy.some((x) => /^(p|t|k|q|c)/.test(x))) t.push(PY_TIPS[4]);
  if (sy.some((x) => x.includes('ü') || /^[jqxy]u/.test(x))) t.push(PY_TIPS[5]);
  if (sy.some((x) => /^[^aeiou]*e$/.test(x))) t.push(PY_TIPS[6]);
  if (sy.some((x) => /ng?$/.test(x))) t.push(PY_TIPS[7]);
  if (ws.some((w) => sandhiPy(w.py) !== w.py || /[不一]/.test(w.h)))
    t.push(
      'Chú ý biến điệu: 3 + 3 → 2 + 3; 不 trước thanh 4 đọc bú; 一 trước thanh 4 đọc yí, trước thanh 1/2/3 đọc yì.'
    );
  return t.length ? t : PY_TIPS.slice(0, 3);
}
function PronStep({ l }) {
  const { upd } = useApp();
  const ws = lessonWords(l)
    .map((id) => WORDS[id])
    .filter(Boolean)
    .slice(0, 14);
  const [cur, setCur] = useState(ws[0]?.id),
    w = WORDS[cur];
  const mk = () => genSet(['tone', 'py', 'pair', 'combo'], lessonPool(l), 6);
  const [drill, setDrill] = useState(mk);
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="font-semibold mb-2">1. Nghe mẫu — chọn từ để luyện</div>
        <div className="flex flex-wrap gap-2">
          {ws.map((x) => (
            <button
              key={x.id}
              className={`btn btn-sm ${cur === x.id ? 'btn-p' : 'btn-o'}`}
              onClick={() => {
                setCur(x.id);
                speak(x.h);
              }}
            >
              <span className="han text-base">{x.h}</span>
            </button>
          ))}
        </div>
      </div>
      {w && (
        <div className="card p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="han text-4xl font-bold">{w.h}</span>
            <SpeakBtn text={w.h} />
            <SpeakBtn text={w.h} rate={0.6} label="Chậm" />
            <span className="mu">{w.vi}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sylls(w.py).map((x, i) => (
              <span key={i} className="chip">
                {x} · {toneOf(x) === 5 ? 'thanh nhẹ' : `thanh ${toneOf(x)}`}
              </span>
            ))}
          </div>
          {sandhiPy(w.py) !== w.py && (
            <div className="mt-2">
              <Note tone="w">
                Biến điệu khi nói: {w.py} → {sandhiPy(w.py)}
              </Note>
            </div>
          )}
          <div className="mt-3">
            <div className="font-semibold text-sm mb-1">
              2. Lặp lại, ghi âm và nghe lại để so sánh
            </div>
            <Recorder text={w.h} py={w.py} />
          </div>
        </div>
      )}
      <div className="card p-4">
        <div className="font-semibold mb-2">3. Hướng dẫn sửa lỗi phát âm</div>
        <ul className="text-sm space-y-1 list-disc pl-5">
          {tipsFor(ws).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">4. Phân biệt âm và thanh điệu</div>
        <Quiz
          qs={drill}
          mode="practice"
          title="Luyện phát âm của bài"
          onExit={() => setDrill(mk())}
          onFinish={(res) =>
            upd((s) =>
              applyResults(s, res, {
                kind: 'practice',
                ref: l.id,
                title: `Phát âm: ${l.t}`,
              })
            )
          }
        />
      </div>
    </div>
  );
}

/* ---------- 29. Trang bài học: 8 bước ---------- */
const STEP_NAMES = {
  goal: 'Mục tiêu',
  vocab: 'Từ vựng',
  grammar: 'Ngữ pháp',
  pron: 'Phát âm',
  dialog: 'Hội thoại',
  practice: 'Luyện tập',
  quiz: 'Kiểm tra',
  result: 'Kết quả',
};
const DUR_PLAN = {
  15: 'Từ vựng 4′ · Ngữ pháp 3′ · Luyện tập 4′ · Kiểm tra 4′',
  30: 'Từ vựng 7′ · Ngữ pháp 5′ · Phát âm 4′ · Hội thoại 4′ · Luyện tập 5′ · Kiểm tra 5′',
  45: 'Từ vựng 10′ · Ngữ pháp 7′ · Phát âm 6′ · Hội thoại 7′ · Luyện tập 8′ · Kiểm tra 7′',
  60: 'Từ vựng 12′ · Ngữ pháp 10′ · Phát âm 8′ · Hội thoại 10′ · Luyện tập 10′ · Kiểm tra 10′',
};
function WordRow({ w, open, onToggle }) {
  const { st } = useApp(),
    s = st.settings,
    status = srsStatus(st.srs[w.id]);
  return (
    <div className="card p-3">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onToggle}
      >
        <span className="han text-2xl font-bold" style={{ minWidth: 64 }}>
          {w.h}
        </span>
        <div className="flex-1 min-w-0">
          {s.py && <div className="pri text-sm">{w.py}</div>}
          {s.vi && <div className="text-sm truncate">{w.vi}</div>}
        </div>
        <span className={`chip ${STATUS_CHIP[status]}`}>
          {SRS_LABEL[status]}
        </span>
        <SpeakBtn text={w.h} />
      </div>
      {open && (
        <div className="mt-3">
          <WordCard w={w} />
        </div>
      )}
    </div>
  );
}
function LessonPage({ params = {} }) {
  const { st, upd, go, setSettings } = useApp();
  const l = LESSON_BY[params.id] || currentLesson(st);
  const steps =
    l.type === 'final'
      ? ['goal', 'quiz', 'result']
      : [
          'goal',
          'vocab',
          'grammar',
          'pron',
          'dialog',
          'practice',
          'quiz',
          'result',
        ];
  const [step, setStep] = useState(0),
    [pq, setPq] = useState(null),
    [tq, setTq] = useState(null),
    [out, setOut] = useState(null),
    [openW, setOpenW] = useState(null),
    [moreD, setMoreD] = useState(false);
  const dur = st.settings.dur || 30,
    key = steps[step] || 'goal';
  useEffect(() => {
    setStep(0);
    setPq(null);
    setTq(null);
    setOut(null);
    setMoreD(false);
  }, [l.id]);
  useEffect(() => {
    if (key === 'vocab') upd((s) => introWords(s, lessonWords(l))); // từ đã xem → vào lịch ôn tập
    if (key === 'practice' && !pq) setPq(buildPractice(st, l, dur));
    if (key === 'quiz' && !tq) setTq(buildLessonQuiz(st, l, dur));
  }, [key, l.id, dur, pq, tq]);
  const rec = st.lessons[l.id],
    next = LESSONS[l.idx + 1],
    unlocked = isUnlocked(st, l);
  const words = lessonWords(l)
    .map((id) => WORDS[id])
    .filter(Boolean);
  const setDur = (d) => {
    setSettings({ dur: d });
    setPq(null);
    setTq(null);
    setOut(null);
  };
  const onQuizFinish = (res, meta) => {
    if (meta.retry) {
      upd((s) =>
        applyResults(s, res, {
          kind: 'practice',
          ref: l.id,
          title: `Làm lại câu sai: ${l.t}`,
        })
      );
      return;
    }
    const r = finishLesson(st, l, res);
    setOut(r);
    upd((s) => {
      const x = finishLesson(s, l, res).s;
      return r.pass ? markDone(x, 'lesson') : x;
    });
  };
  const extra = (res, retry) => {
    if (retry || !out) return null;
    return (
      <div className="mt-3 space-y-2">
        <div className={`box ${out.pass ? '' : 'box-r'}`}>
          {out.pass
            ? `Đạt yêu cầu chuyển bài (≥ ${PASS[l.type]}%).`
            : `Chưa đạt: cần ≥ ${PASS[l.type]}% và không kỹ năng nào dưới 60%.`}
          {out.weak.length > 0 &&
            ` Kỹ năng dưới 60%: ${out.weak
              .map((k) => SKILLS[k] || k)
              .join(', ')}.`}
          <span className="mu">
            {' '}
            (Ngưỡng nội bộ của website, không phải điểm đỗ HSK.)
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {next && (
            <button
              className="btn btn-p"
              disabled={!out.pass && !st.settings.flex}
              onClick={() => go('lesson', { id: next.id })}
            >
              Học bài tiếp theo <ChevronRight size={16} />
            </button>
          )}
          <button
            className="btn btn-o"
            onClick={() => {
              setOut(null);
              setTq(buildLessonQuiz(st, l, dur));
            }}
          >
            <RotateCcw size={16} /> Làm đề kiểm tra mới
          </button>
          {l.type !== 'final' && (
            <button className="btn btn-o" onClick={() => setStep(1)}>
              Ôn lại bài
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-steps flex gap-1 overflow-x-auto pb-2 mb-4">
        <button className="btn btn-o btn-sm" onClick={() => go('road')}>
          <ChevronLeft size={14} /> Lộ trình
        </button>
        <span className="chip">
          HSK 1 · Tuần {l.w} · Buổi {l.i}
        </span>
        <span className="chip chip-mu">{TYPE_LABEL[l.type]}</span>
        <StatusIcon s={lessonStatus(st, l)} />
      </div>
      <div className="mb-lesson-head">
        <h1 className="mb-title">{l.t}</h1>
        <div className="mb-lesson-flowers" aria-hidden="true">
          <Peony palette="blush" size={56} leaves={false} />
          <Ranunculus palette="peach" size={44} leaves={false} />
        </div>
      </div>
      {!unlocked && (
        <div className="mb-3">
          <Note tone="w">
            Bạn đang mở bài này ở chế độ học linh hoạt — các bài trước chưa đạt
            yêu cầu.
          </Note>
        </div>
      )}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4">
        {steps.map((k, i) => (
          <button
            key={k}
            className={`btn btn-sm ${
              i === step ? 'btn-p' : i < step ? 'btn-g' : 'btn-o'
            }`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setStep(i)}
          >
            {i + 1}. {STEP_NAMES[k]}
          </button>
        ))}
      </div>

      {key === 'goal' && (
        <div className="space-y-3">
          <div className="card accent p-4">
            <FloralCorner kind="rose" pos="tr" size={52} palette="blush" />
            <div className="font-semibold mb-2" style={{ paddingRight: 48 }}>
              Sau buổi học này, bạn sẽ:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {lessonGoals(l).map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">Thời lượng buổi học</div>
            <div className="flex flex-wrap gap-2">
              {DUR_LIST.map((d) => (
                <button
                  key={d}
                  className={`btn btn-sm ${dur === d ? 'btn-p' : 'btn-o'}`}
                  onClick={() => setDur(d)}
                >
                  {d} phút
                </button>
              ))}
            </div>
            <div className="text-sm mu mt-2">
              {l.type === 'final'
                ? 'Bài kiểm tra cuối cấp: 40 câu trong 40 phút.'
                : DUR_PLAN[dur]}
            </div>
            <div className="text-sm mt-1">
              Số câu luyện tập: {(DUR_N[dur] || DUR_N[30])[0]} · Số câu kiểm
              tra:{' '}
              {l.type === 'review'
                ? WEEK_N[dur]
                : l.type === 'final'
                ? 40
                : (DUR_N[dur] || DUR_N[30])[1]}
            </div>
          </div>
          {rec && (
            <Note>
              Đã làm {rec.att} lần · Điểm cao nhất {rec.best}% · Lần gần nhất{' '}
              {rec.last}%
            </Note>
          )}
          <button className="btn btn-r" onClick={() => setStep(1)}>
            Bắt đầu <ChevronRight size={16} />
          </button>
        </div>
      )}

      {key === 'vocab' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm mu">
              {l.type === 'learn'
                ? `${l.fresh.length} từ mới${
                    words.length > l.fresh.length
                      ? ` · ${words.length - l.fresh.length} từ ôn lại`
                      : ''
                  }`
                : `Ôn ${words.length} từ của tuần ${l.wk[0]}${
                    l.wk[1] !== l.wk[0] ? `–${l.wk[1]}` : ''
                  }`}
            </div>
            <ViewToggles />
          </div>
          {l.type === 'learn' ? (
            <div className="grid md:grid-cols-2 gap-3">
              {words.map((w) => (
                <div key={w.id} style={{ position: 'relative' }}>
                  {!l.fresh.includes(w.id) && (
                    <span
                      className="chip chip-w"
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                      }}
                    >
                      Ôn lại
                    </span>
                  )}
                  <WordCard w={w} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-2">
              {words.map((w) => (
                <WordRow
                  key={w.id}
                  w={w}
                  open={openW === w.id}
                  onToggle={() => setOpenW(openW === w.id ? null : w.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {key === 'grammar' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <ViewToggles compact />
          </div>
          {lessonGrams(l).map((g) => (
            <GrammarView key={g} g={g} drill={l.type === 'learn'} />
          ))}
          {l.type !== 'learn' && (
            <Note>
              Bài luyện ngữ pháp tổng hợp nằm ở bước Luyện tập và Kiểm tra.
            </Note>
          )}
        </div>
      )}

      {key === 'pron' && <PronStep l={l} />}

      {key === 'dialog' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm mu">
              Nghe từng câu hoặc cả bài; bấm “Tôi đóng vai A/B” để luyện hội
              thoại theo vai.
            </div>
            <ViewToggles compact />
          </div>
          {lessonDlgs(l)
            .filter((d) => d.lines.length)
            .slice(0, moreD ? 99 : 6)
            .map((d, i) => (
              <DialogView key={i} lines={d.lines} title={d.t} />
            ))}
          {!moreD && lessonDlgs(l).length > 6 && (
            <button className="btn btn-o" onClick={() => setMoreD(true)}>
              Xem thêm hội thoại
            </button>
          )}
          <button className="btn btn-g" onClick={() => go('speak')}>
            <Mic size={16} /> Luyện nói có ghi âm
          </button>
        </div>
      )}

      {key === 'practice' &&
        (pq ? (
          <Quiz
            qs={pq}
            mode="practice"
            title={`Luyện tập tổng hợp (${pq.length} câu)`}
            onFinish={(res) =>
              upd((s) =>
                applyResults(s, res, {
                  kind: 'practice',
                  ref: l.id,
                  title: `Luyện tập: ${l.t}`,
                })
              )
            }
            resultExtra={() => (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <button
                  className="btn btn-p"
                  onClick={() => setStep(steps.indexOf('quiz'))}
                >
                  Làm bài kiểm tra <ChevronRight size={16} />
                </button>
                <button
                  className="btn btn-o"
                  onClick={() => setPq(buildPractice(st, l, dur))}
                >
                  <Shuffle size={16} /> Bộ luyện tập mới
                </button>
              </div>
            )}
          />
        ) : (
          <Empty>Đang tạo bài luyện tập…</Empty>
        ))}

      {key === 'quiz' &&
        (tq ? (
          <Quiz
            qs={tq}
            mode="test"
            timer={l.type === 'final' ? 2400 : 0}
            onFinish={onQuizFinish}
            resultExtra={extra}
            title={
              l.type === 'final'
                ? 'Kiểm tra cuối cấp HSK 1 (40 câu · 40 phút)'
                : l.type === 'review'
                ? `Kiểm tra cuối tuần (${tq.length} câu)`
                : `Kiểm tra cuối bài (${tq.length} câu)`
            }
          />
        ) : (
          <Empty>Đang tạo bài kiểm tra…</Empty>
        ))}

      {key === 'result' && (
        <div className="card p-5 space-y-3">
          {rec ? (
            <>
              <div className="flex items-center gap-4">
                <Ring
                  v={rec.best}
                  size={90}
                  stroke={9}
                  color={rec.passed ? 'var(--ok)' : 'var(--red)'}
                >
                  {rec.best}%
                </Ring>
                <div className="text-sm">
                  <div className="font-semibold text-base">
                    {rec.passed ? 'Đã đạt yêu cầu bài học' : 'Chưa đạt yêu cầu'}
                  </div>
                  <div>
                    Số lần làm: {rec.att} · Lần gần nhất: {rec.last}% · Ngưỡng:{' '}
                    {PASS[l.type]}%
                  </div>
                  <div className="mu">Cập nhật: {fmtDate(rec.at)}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {next && (
                  <button
                    className="btn btn-p"
                    disabled={!rec.passed && !st.settings.flex}
                    onClick={() => go('lesson', { id: next.id })}
                  >
                    Học bài tiếp theo <ChevronRight size={16} />
                  </button>
                )}
                <button
                  className="btn btn-o"
                  onClick={() => {
                    setOut(null);
                    setTq(buildLessonQuiz(st, l, dur));
                    setStep(steps.indexOf('quiz'));
                  }}
                >
                  <RotateCcw size={16} /> Làm lại kiểm tra
                </button>
                <button className="btn btn-g" onClick={() => go('flash')}>
                  <Layers size={16} /> Ôn Flashcard
                </button>
              </div>
              {!rec.passed && !st.settings.flex && (
                <Note tone="w">
                  Bài tiếp theo sẽ mở khi bạn đạt yêu cầu. Có thể bật “Học linh
                  hoạt” trong Cài đặt để học trước.
                </Note>
              )}
            </>
          ) : (
            <div className="text-sm">
              Bạn chưa làm bài kiểm tra của buổi này.{' '}
              <button
                className="btn btn-sm btn-p ml-2"
                onClick={() => setStep(steps.indexOf('quiz'))}
              >
                Làm bài kiểm tra
              </button>
            </div>
          )}
        </div>
      )}

      {!['practice', 'quiz'].includes(key) && (
        <div className="flex justify-between mt-5">
          <button
            className="btn btn-o"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft size={16} /> Bước trước
          </button>
          {step < steps.length - 1 && (
            <button className="btn btn-p" onClick={() => setStep(step + 1)}>
              Bước tiếp <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 30. Học từ vựng ---------- */
function VocabPage() {
  const { st, upd } = useApp();
  const [src, setSrc] = useState('hsk1'),
    [topic, setTopic] = useState(''),
    [stt, setStt] = useState('all'),
    [q, setQ] = useState(''),
    [open, setOpen] = useState(null),
    [lim, setLim] = useState(60);
  const now = Date.now();
  const list = WORD_LIST.filter(
    (w) =>
      (src === 'all' || w.src === src) &&
      (!topic || w.topic === topic) &&
      (stt === 'all' ||
        (stt === 'hard'
          ? badOf(st.srs[w.id]) >= 2
          : srsStatus(st.srs[w.id], now) === stt)) &&
      matchWord(w, q)
  );
  const topics = uniq(
    WORD_LIST.filter((w) => src === 'all' || w.src === src).map((w) => w.topic)
  );
  const fresh = list.filter((w) => !st.srs[w.id]);
  return (
    <div>
      <Title
        icon={BookOpen}
        right={<ViewToggles />}
        sub={`${
          HSK1_WORDS.length
        } từ HSK 1 (website biên soạn theo chủ đề, chưa phải danh sách chính thức) + ${
          WORD_LIST.length - HSK1_WORDS.length
        } từ giao tiếp. Bấm vào từ để xem ví dụ.`}
      >
        Học từ vựng
      </Title>
      <div className="card p-3 flex flex-wrap gap-2 items-center mb-3">
        <input
          className="inp"
          style={{ maxWidth: 260 }}
          placeholder="Tìm chữ Hán, Pinyin hoặc nghĩa…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLim(60);
          }}
        />
        <Sel
          v={src}
          on={(v) => {
            setSrc(v);
            setTopic('');
          }}
          opts={[
            ['hsk1', 'HSK 1'],
            ['comm', 'Giao tiếp'],
            ['all', 'Tất cả'],
          ]}
        />
        <Sel
          v={topic}
          on={setTopic}
          opts={[['', 'Mọi chủ đề'], ...topics.map((t) => [t, t])]}
        />
        <Sel
          v={stt}
          on={setStt}
          opts={[
            ['all', 'Mọi trạng thái'],
            ['new', 'Chưa học'],
            ['learning', 'Đang học'],
            ['known', 'Đã thuộc'],
            ['due', 'Cần ôn'],
            ['hard', 'Thường sai'],
          ]}
        />
        <span className="text-sm mu">{list.length} từ</span>
        {fresh.length > 0 && (
          <button
            className="btn btn-sm btn-g"
            onClick={() =>
              upd((s) =>
                introWords(
                  s,
                  fresh.map((w) => w.id)
                )
              )
            }
          >
            <Layers size={14} /> Thêm {fresh.length} từ vào ôn tập
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {list.slice(0, lim).map((w) => (
          <WordRow
            key={w.id}
            w={w}
            open={open === w.id}
            onToggle={() => setOpen(open === w.id ? null : w.id)}
          />
        ))}
      </div>
      {list.length > lim && (
        <div className="text-center mt-3">
          <button className="btn btn-o" onClick={() => setLim(lim + 60)}>
            Xem thêm
          </button>
        </div>
      )}
      {!list.length && <Empty>Không tìm thấy từ phù hợp.</Empty>}
    </div>
  );
}

/* ---------- 31. Học ngữ pháp ---------- */
function GrammarPage({ params = {} }) {
  const { st } = useApp(),
    [g, setG] = useState(params.g || null);
  useEffect(() => {
    if (params.g) setG(params.g);
  }, [params.g]);
  const list = Object.keys(GR)
    .filter((k) => GR_LES[k])
    .sort((a, b) => GR_LES[a].idx - GR_LES[b].idx);
  if (g && GR[g])
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <button className="btn btn-o btn-sm" onClick={() => setG(null)}>
            <ChevronLeft size={14} /> Danh sách ngữ pháp
          </button>
          <ViewToggles compact />
        </div>
        <div className="text-sm mu mb-2">
          HSK 1 · Tuần {GR_LES[g].w} · Bài “{GR_LES[g].t}”
        </div>
        <GrammarView key={g} g={g} />
      </div>
    );
  return (
    <div>
      <Title
        icon={Book}
        sub={`${list.length} điểm ngữ pháp và quy tắc phát âm của HSK 1 trong website. Đề cương HSK 3.0 cấp 1 có ${OFFICIAL.rows[0][4]} điểm ngữ pháp — phần còn lại dự kiến bổ sung.`}
      >
        Học ngữ pháp
      </Title>
      <div className="grid md:grid-cols-2 gap-2">
        {list.map((k) => {
          const les = GR_LES[k],
            learned = !!st.lessons[les.id];
          return (
            <button key={k} className="opt" onClick={() => setG(k)}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm">{GR[k].t}</span>
                {learned ? (
                  <span className="chip chip-ok">Đã học</span>
                ) : (
                  <span className="chip chip-mu">Tuần {les.w}</span>
                )}
              </div>
              <div className="han text-sm mu mt-1">{GR[k].f}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================= HẾT PHẦN 4/6 ========================= */
/* =====================================================================
   PHẦN 5/6: PHÁT ÂM · GHI ÂM · NGHE · ĐỌC · NÓI · VIẾT CHỮ HÁN · FLASHCARD · BÀI VIẾT MỞ
   Dán ngay sau Phần 4
   ===================================================================== */

/* ---------- 32. Ghi âm – nghe lại – so sánh (nhận dạng chỉ so khớp CHỮ, không chấm phát âm) ---------- */
function Recorder({ text, py }) {
  const { upd } = useApp();
  const [phase, setPhase] = useState('idle'),
    [url, setUrl] = useState(null),
    [err, setErr] = useState('');
  const [heard, setHeard] = useState(null),
    [listening, setListening] = useState(false),
    [rated, setRated] = useState(false);
  const mr = useRef(null),
    chunks = useRef([]),
    timer = useRef(null);
  useEffect(() => {
    setPhase('idle');
    setHeard(null);
    setErr('');
    setRated(false);
    setUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return null;
    });
  }, [text]);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      try {
        if (mr.current && mr.current.state === 'recording') mr.current.stop();
      } catch (e) {
        /* bỏ qua */
      }
    },
    []
  );
  const start = async () => {
    setErr('');
    if (!canRecord()) {
      setErr('Trình duyệt không hỗ trợ ghi âm (MediaRecorder).');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const m = new window.MediaRecorder(stream);
      chunks.current = [];
      m.ondataavailable = (e) => {
        if (e.data && e.data.size) chunks.current.push(e.data);
      };
      m.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const b = new Blob(chunks.current, {
          type: m.mimeType || 'audio/webm',
        });
        setUrl((u) => {
          if (u) URL.revokeObjectURL(u);
          return URL.createObjectURL(b);
        });
        setPhase('done');
        setRated(false);
      };
      m.start();
      mr.current = m;
      setPhase('rec');
      timer.current = setTimeout(() => {
        if (m.state === 'recording') m.stop();
      }, 10000);
    } catch (e) {
      setErr(
        'Không truy cập được micro (chưa cấp quyền hoặc môi trường chặn). Bạn vẫn có thể nghe mẫu và đọc to theo.'
      );
    }
  };
  const stop = () => {
    clearTimeout(timer.current);
    if (mr.current && mr.current.state === 'recording') mr.current.stop();
  };
  const recog = () => {
    const SR = getSR();
    if (!SR) return;
    setErr('');
    setHeard(null);
    try {
      const r = new SR();
      r.lang = 'zh-CN';
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.onresult = (e) => {
        const t = (e.results[0] && e.results[0][0].transcript) || '';
        setHeard({ t, ...lcsMask(text, t) });
      };
      r.onerror = (e) =>
        setErr(
          `Nhận dạng giọng nói báo lỗi: ${e.error}${
            e.error === 'not-allowed' ? ' (chưa cấp quyền micro)' : ''
          }`
        );
      r.onend = () => setListening(false);
      r.start();
      setListening(true);
    } catch (e) {
      setErr('Không khởi động được nhận dạng giọng nói.');
      setListening(false);
    }
  };
  const rate = (good) => {
    setRated(true);
    upd((s) =>
      markDone(
        applyResults(s, [
          {
            q: { sk: 'speak', title: 'Tự đánh giá phát âm', prompt: zh(text) },
            ok: good,
          },
        ]),
        'speak'
      )
    );
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          className="btn btn-g btn-sm"
          disabled={!ttsOK()}
          onClick={() => speak(text)}
        >
          <Volume2 size={14} /> Nghe mẫu
        </button>
        {phase !== 'rec' ? (
          <button className="btn btn-r btn-sm" onClick={start}>
            <Mic size={14} /> {phase === 'done' ? 'Ghi âm lại' : 'Ghi âm'}
          </button>
        ) : (
          <button className="btn btn-r btn-sm" onClick={stop}>
            <Square size={14} /> Dừng (tối đa 10 giây)
          </button>
        )}
        {getSR() && (
          <button
            className="btn btn-o btn-sm"
            disabled={listening}
            onClick={recog}
          >
            <Languages size={14} />{' '}
            {listening ? 'Đang nghe…' : 'Nói để nhận dạng chữ'}
          </button>
        )}
      </div>
      {phase === 'rec' && (
        <div className="text-sm red">
          ● Đang ghi âm — hãy đọc: <span className="han">{zh(text)}</span>
          {py ? ` (${py})` : ''}
        </div>
      )}
      {url && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs mu">Bản ghi của bạn:</span>
          <audio src={url} controls style={{ height: 34 }} />
          <button className="btn btn-g btn-sm" onClick={() => speak(text)}>
            Nghe lại mẫu để so sánh
          </button>
        </div>
      )}
      {heard && (
        <div className="box text-sm">
          <div>
            Máy nhận dạng được:{' '}
            <span className="han text-base">
              {heard.t || '(không nghe rõ)'}
            </span>
          </div>
          <div className="mt-1">
            So với câu mẫu:{' '}
            <span className="han text-lg">
              {heard.chars.map((c, i) => (
                <span
                  key={i}
                  style={{
                    color: heard.mask[i] ? 'var(--ok)' : 'var(--red)',
                    fontWeight: 700,
                  }}
                >
                  {c}
                </span>
              ))}
            </span>{' '}
            <span className="mu">({heard.score}% chữ khớp)</span>
          </div>
          <div className="text-xs mu mt-1">
            Chỉ so khớp chữ do trình duyệt nhận dạng — KHÔNG phải chấm điểm phát
            âm hay thanh điệu. Chữ đỏ là phần máy chưa nhận ra.
          </div>
        </div>
      )}
      {(url || heard) && !rated && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="mu">Tự đánh giá sau khi nghe lại:</span>
          <button className="btn btn-sm btn-g" onClick={() => rate(true)}>
            <Check size={14} /> Giống mẫu
          </button>
          <button className="btn btn-sm btn-o" onClick={() => rate(false)}>
            Cần luyện thêm
          </button>
        </div>
      )}
      {rated && <div className="text-xs okc">Đã lưu tự đánh giá.</div>}
      {err && <div className="text-xs red">{err}</div>}
      {!canRecord() && !getSR() && (
        <div className="text-xs mu">
          Trình duyệt này không hỗ trợ ghi âm/nhận dạng; hãy nghe mẫu và đọc to
          theo.
        </div>
      )}
    </div>
  );
}

/* ---------- 33. Trang Phát âm & Pinyin ---------- */
const TONE_COL = ['', '#2b7fd9', '#16a34a', '#e9a400', '#d62828'];
function ToneChart() {
  const pts = {
    1: [
      [0, 5],
      [1, 5],
    ],
    2: [
      [0, 3],
      [1, 5],
    ],
    3: [
      [0, 2],
      [0.45, 1],
      [1, 4],
    ],
    4: [
      [0, 5],
      [1, 1],
    ],
  };
  const X = (x) => 40 + x * 220,
    Y = (y) => 112 - (y - 1) * 25;
  return (
    <svg viewBox="0 0 280 130" style={{ width: '100%', maxWidth: 420 }}>
      {[1, 2, 3, 4, 5].map((y) => (
        <g key={y}>
          <line
            x1="36"
            x2="264"
            y1={Y(y)}
            y2={Y(y)}
            style={{ stroke: 'var(--bd)' }}
            strokeDasharray="4 4"
          />
          <text x="20" y={Y(y) + 4} fontSize="10" style={{ fill: 'var(--mu)' }}>
            {y}
          </text>
        </g>
      ))}
      {[1, 2, 3, 4].map((t) => (
        <polyline
          key={t}
          points={pts[t].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')}
          fill="none"
          stroke={TONE_COL[t]}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
const SANDHI_EX = [
  ['你好', 'nǐ hǎo → ní hǎo', '3 + 3 → 2 + 3'],
  ['很好', 'hěn hǎo → hén hǎo', '3 + 3 → 2 + 3'],
  ['不是', 'bù shì → bú shì', '不 + thanh 4 → bú'],
  ['不来', 'bù lái', '不 giữ thanh 4 trước thanh 1, 2, 3'],
  ['一个', 'yī gè → yí ge', '一 + thanh 4 → yí'],
  ['一天', 'yī tiān → yì tiān', '一 + thanh 1/2/3 → yì'],
  ['第一', 'dì yī', '一 đứng cuối hoặc chỉ thứ tự giữ yī'],
];
const NEUTRAL_EX = [
  ['妈妈', 'māma'],
  ['爸爸', 'bàba'],
  ['谢谢', 'xièxie'],
  ['我们', 'wǒmen'],
  ['什么', 'shénme'],
  ['朋友', 'péngyou'],
];
function PinyinPage() {
  const { st, upd } = useApp(),
    [tab, setTab] = useState('tone'),
    [qs, setQs] = useState(null);
  const mk = () =>
    genSet(
      ['tone', 'py', 'pair', 'combo', 'fillpy'],
      makePool(uniq(['1.1.1', '1.1.2', '1.1.3', '1.1.4', ...learnedIds(st)])),
      10,
      st.recent
    );
  const noVoice = ttsOK() && zhVoices().length === 0;
  const cell = (x) => (
    <button
      key={x.k}
      className="card p-3 text-center"
      style={{ cursor: 'pointer' }}
      onClick={() => speak(x.c)}
    >
      <div className="text-2xl font-bold red">{x.k}</div>
      <div className="han text-lg">{x.c}</div>
      <div className="text-xs mu">{x.p}</div>
    </button>
  );
  return (
    <div>
      <Title
        icon={Volume2}
        right={<ViewToggles />}
        sub="Giọng tiếng Trung phổ thông (zh-CN) của trình duyệt; chỉnh tốc độ 0,75x · 1x · 1,25x. Bấm vào ô để nghe."
      >
        Phát âm và Pinyin
      </Title>
      {!ttsOK() && (
        <div className="mb-3">
          <Note tone="r">
            Trình duyệt không hỗ trợ Web Speech API nên không phát âm được. Hãy
            dùng Chrome, Edge hoặc Safari bản mới.
          </Note>
        </div>
      )}
      {noVoice && (
        <div className="mb-3">
          <Note tone="w">
            Thiết bị chưa có giọng đọc tiếng Trung. Hãy cài giọng “Chinese
            (Mandarin)” trong cài đặt ngôn ngữ của hệ điều hành; nếu không,
            trình duyệt có thể đọc sai.
          </Note>
        </div>
      )}
      <Tabs
        v={tab}
        on={(t) => {
          setTab(t);
          if (t === 'quiz') setQs(mk());
        }}
        tabs={[
          ['tone', 'Thanh điệu'],
          ['init', 'Thanh mẫu'],
          ['fin', 'Vận mẫu'],
          ['rule', 'Thanh nhẹ & biến điệu'],
          ['pair', 'Cặp âm dễ nhầm'],
          ['quiz', 'Bài tập phân biệt'],
        ]}
      />
      {tab === 'tone' && (
        <div className="space-y-3">
          <div className="card p-4">
            <ToneChart />
            <div className="flex flex-wrap gap-3 text-xs mt-1">
              {[1, 2, 3, 4].map((t) => (
                <span key={t} style={{ color: TONE_COL[t], fontWeight: 600 }}>
                  ■ Thanh {t}
                </span>
              ))}
              <span className="mu">Thang độ cao 1–5 (5 là cao nhất)</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PY_TONES.map(([c, p, n, ct, d]) => (
              <div key={c} className="card p-4">
                <div className="flex items-center gap-3">
                  <span className="han text-4xl">{c}</span>
                  <div className="flex-1">
                    <div className="text-xl font-bold pri">{p}</div>
                    <div className="text-xs mu">
                      {n === 5 ? 'Thanh nhẹ' : `Thanh ${n} · độ cao ${ct}`}
                    </div>
                  </div>
                  <SpeakBtn text={c} />
                </div>
                <p className="text-sm mt-2">{d}</p>
              </div>
            ))}
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">
              Nghe so sánh: mā – má – mǎ – mà
            </div>
            <div className="flex flex-wrap gap-2">
              {PY_TONES.slice(0, 4).map(([c, p]) => (
                <button key={c} className="btn btn-o" onClick={() => speak(c)}>
                  <span className="han">{c}</span> {p}
                </button>
              ))}
              <button
                className="btn btn-p"
                disabled={!ttsOK()}
                onClick={() =>
                  speakSeq(PY_TONES.slice(0, 4).map(([c]) => ({ s: c })))
                }
              >
                <Play size={14} /> Nghe lần lượt
              </button>
            </div>
          </div>
        </div>
      )}
      {tab === 'init' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {PY_INIT_L.map(cell)}
          </div>
          <Note>
            Trình duyệt không đọc riêng phụ âm, nên mỗi thanh mẫu được nghe qua
            một âm tiết ví dụ. Nhóm: b p m f · d t n l · g k h · j q x · zh ch
            sh r · z c s.
          </Note>
        </div>
      )}
      {tab === 'fin' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {PY_FIN_L.map(cell)}
          </div>
          <Note>
            Vận mẫu đứng một mình được viết với y/w (i → yi, u → wu, ü → yu…);
            sau j, q, x thì ü viết thành u (qù, xué).
          </Note>
        </div>
      )}
      {tab === 'rule' && (
        <div className="grid md:grid-cols-2 gap-3">
          <div className="card p-4">
            <div className="font-semibold mb-2">Thanh nhẹ</div>
            <p className="text-sm mb-2">
              Âm tiết đọc ngắn, nhẹ, không đánh dấu; thường gặp ở từ láy và trợ
              từ (吗, 呢, 的, 了).
            </p>
            <div className="flex flex-wrap gap-2">
              {NEUTRAL_EX.map(([c, p]) => (
                <button
                  key={c}
                  className="btn btn-o btn-sm"
                  onClick={() => speak(c)}
                >
                  <span className="han">{c}</span> {p}
                </button>
              ))}
            </div>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">Biến điệu</div>
            {SANDHI_EX.map(([c, p, r]) => (
              <div
                key={c}
                className="flex items-center gap-2 py-1"
                style={{ borderBottom: '1px dashed var(--bd)' }}
              >
                <span className="han text-lg" style={{ minWidth: 48 }}>
                  {c}
                </span>
                <span className="pri text-sm flex-1">{p}</span>
                <span className="text-xs mu">{r}</span>
                <SpeakBtn text={c} />
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'pair' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PY_PAIRS.map((p) => {
            const it = [];
            for (let i = 1; i < p.length; i += 2) it.push([p[i], p[i + 1]]);
            return (
              <div key={p[0]} className="card p-4">
                <div className="font-semibold mb-2">{p[0]}</div>
                <div className="flex flex-wrap gap-2">
                  {it.map(([c, py]) => (
                    <button
                      key={c}
                      className="btn btn-o"
                      onClick={() => speak(c)}
                    >
                      <span className="han text-lg">{c}</span> {py}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="sm:col-span-2 lg:col-span-3">
            <Note>{PY_TIPS.join(' · ')}</Note>
          </div>
        </div>
      )}
      {tab === 'quiz' && qs && (
        <Quiz
          qs={qs}
          mode="practice"
          title="Phân biệt âm và thanh điệu"
          onExit={() => setQs(mk())}
          onFinish={(res) =>
            upd((s) =>
              markDone(
                applyResults(s, res, {
                  kind: 'practice',
                  title: 'Luyện phát âm & Pinyin',
                }),
                'tone'
              )
            )
          }
        />
      )}
    </div>
  );
}

/* ---------- 34. Luyện nghe ---------- */
function ListenRoom() {
  const opts = [
    ...learnIn(1, 8)
      .filter((l) => l.dlg.length)
      .map((l) => [`l:${l.id}`, `HSK 1 · T${l.w}B${l.i}: ${l.t}`]),
    ...COMM_DATA.map((c) => [`c:${c.i}`, `Giao tiếp: ${c.t}`]),
  ];
  const [v, setV] = useState(opts[0][0]),
    [hide, setHide] = useState(true);
  const lines = v.startsWith('l:')
    ? LESSON_BY[v.slice(2)].dlg
    : COMM_DATA[+v.slice(2)].dlg;
  return (
    <div className="space-y-3">
      <div className="card p-3 flex flex-wrap gap-2 items-center">
        <Sel v={v} on={setV} opts={opts} />
        <button
          className={`btn btn-sm ${hide ? 'btn-p' : 'btn-o'}`}
          onClick={() => setHide(!hide)}
        >
          {hide ? <EyeOff size={14} /> : <Eye size={14} />}{' '}
          {hide ? 'Đang ẩn lời thoại' : 'Đang hiện lời thoại'}
        </button>
      </div>
      {hide ? (
        <div className="card p-4">
          <div className="flex gap-2 mb-3">
            <button
              className="btn btn-p"
              disabled={!ttsOK()}
              onClick={() => speakSeq(lines)}
            >
              <Play size={14} /> Nghe cả bài
            </button>
            <button className="btn btn-o" onClick={stopSpeak}>
              <Square size={14} /> Dừng
            </button>
          </div>
          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="chip">{l.sp}</span>
                <span className="mu text-sm flex-1">Câu {i + 1}</span>
                <SpeakBtn text={l.s} />
              </div>
            ))}
          </div>
          <div className="text-xs mu mt-2">
            Nghe và tự ghi lại thông tin chính, sau đó bấm “Đang ẩn lời thoại”
            để kiểm tra.
          </div>
        </div>
      ) : (
        <DialogView lines={lines} title="Lời thoại" />
      )}
    </div>
  );
}
function ListenPage() {
  const { st, upd } = useApp(),
    [tab, setTab] = useState('ex'),
    [scope, setScope] = useState('learned'),
    [run, setRun] = useState(null);
  const types = [
    ['lm', 'Nghe và chọn nghĩa'],
    ['hz', 'Nghe và chọn chữ Hán'],
    ['dlg', 'Nghe hội thoại, chọn đáp án'],
    ['lfill', 'Nghe và điền vào chỗ trống'],
    ['dict', 'Nghe chép chính tả'],
    ['mix', 'Luyện nghe tổng hợp'],
  ];
  const start = (c, t) =>
    setRun({
      t,
      qs: genSet(
        c === 'mix' ? SKILL_GENS.listen : [c],
        scope === 'all' ? poolAll() : poolLearned(st),
        10,
        st.recent
      ),
    });
  if (run)
    return (
      <Quiz
        qs={run.qs}
        mode="practice"
        title={run.t}
        onExit={() => setRun(null)}
        onFinish={(res) =>
          upd((s) => applyResults(s, res, { kind: 'practice', title: run.t }))
        }
      />
    );
  return (
    <div>
      <Title
        icon={Headphones}
        right={<ViewToggles />}
        sub="Âm thanh tự phát khi mở câu hỏi; có nút nghe lại và nghe chậm."
      >
        Luyện nghe
      </Title>
      <Tabs
        v={tab}
        on={setTab}
        tabs={[
          ['ex', 'Bài nghe theo dạng'],
          ['room', 'Phòng nghe hội thoại'],
        ]}
      />
      {tab === 'ex' ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="mu">Phạm vi:</span>
            <Sel
              v={scope}
              on={setScope}
              opts={[
                ['learned', 'Các bài đã học'],
                ['all', 'Toàn bộ HSK 1'],
              ]}
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {types.map(([c, t]) => (
              <button key={c} className="opt" onClick={() => start(c, t)}>
                <div className="font-semibold text-sm flex items-center gap-2">
                  <Headphones size={16} className="red" />
                  {t}
                </div>
                <div className="text-xs mu mt-1">10 câu · có giải thích</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ListenRoom />
      )}
    </div>
  );
}

/* ---------- 35. Luyện đọc ---------- */
const passageQs = (r) =>
  r.q.map((x, qi) => {
    const [q, a, d1, d2, exp] = x.split('|');
    return mc({
      tp: 'read',
      sk: 'read',
      title: `Câu hỏi ${qi + 1}`,
      prompt: q,
      vi: true,
      opts: [a, d1, d2],
      exp,
      key: `read:${r.i}:${qi}`,
    });
  });
function ReadPage() {
  const { st, upd, go } = useApp(),
    [sel, setSel] = useState(null),
    [showVi, setShowVi] = useState(false),
    [qs, setQs] = useState(null),
    [run, setRun] = useState(null);
  const P = useMemo(() => poolLearned(st), [st.lessons]);
  if (run)
    return (
      <Quiz
        qs={run.qs}
        mode="practice"
        title={run.t}
        onExit={() => setRun(null)}
        onFinish={(res) =>
          upd((s) => applyResults(s, res, { kind: 'practice', title: run.t }))
        }
      />
    );
  if (sel !== null) {
    const r = READ_DATA[sel];
    return (
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <button
            className="btn btn-o btn-sm"
            onClick={() => {
              setSel(null);
              setQs(null);
            }}
          >
            <ChevronLeft size={14} /> Danh sách bài đọc
          </button>
          <div className="flex flex-wrap gap-2 items-center">
            <ViewToggles compact />
            <button
              className={`btn btn-sm ${showVi ? 'btn-g' : 'btn-o'}`}
              onClick={() => setShowVi(!showVi)}
            >
              {showVi ? 'Ẩn bản dịch' : 'Hiện bản dịch'}
            </button>
          </div>
        </div>
        <Passage r={r} noVi={!showVi} />
        {qs && (
          <Quiz
            qs={qs}
            mode="practice"
            title={`Đọc hiểu — ${r.t}`}
            onExit={() => setQs(passageQs(r))}
            onFinish={(res) =>
              upd((s) =>
                applyResults(s, res, {
                  kind: 'practice',
                  title: `Đọc hiểu: ${r.t}`,
                })
              )
            }
          />
        )}
        <div className="card p-3 text-sm flex flex-wrap items-center gap-2">
          <span className="mu">Luyện thêm:</span>
          <button
            className="btn btn-sm btn-g"
            onClick={() => go('bank', { code: 'w:sum' })}
          >
            Tóm tắt bài đọc
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Title
        icon={FileText}
        sub="Bài đọc HSK 1 do website biên soạn. Tỉ lệ % là phần từ ngữ trong bài bạn đã học (khuyên đọc bài ≥ 60%)."
      >
        Luyện đọc
      </Title>
      <div className="grid md:grid-cols-2 gap-3">
        {READ_DATA.map((r) => (
          <button
            key={r.i}
            className="opt"
            onClick={() => {
              setSel(r.i);
              setQs(passageQs(r));
              setShowVi(false);
            }}
          >
            <div className="han font-semibold text-lg">{r.t}</div>
            <div className="text-xs mu mt-1">
              {r.lines.length} câu · {r.q.length} câu hỏi · đã học{' '}
              {Math.round(coverage(r, P) * 100)}% từ
            </div>
          </button>
        ))}
      </div>
      <div className="card p-4 mt-4">
        <div className="font-semibold mb-2">
          Bài tập đọc khác (theo các bài đã học)
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ['tf', 'Đọc và chọn Đúng/Sai'],
            ['para', 'Sắp xếp câu thành hội thoại'],
            ['qa', 'Nối câu hỏi – câu trả lời'],
            ['read', 'Đọc hiểu ngẫu nhiên'],
          ].map(([c, t]) => (
            <button
              key={c}
              className="btn btn-o btn-sm"
              onClick={() =>
                setRun({
                  t,
                  qs: genSet([c], c === 'read' ? poolAll() : P, 8, st.recent),
                })
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 36. Luyện nói: nói nhại, đóng vai, hội thoại AI ---------- */
function ShadowPractice({ items: fixed, title }) {
  const { st } = useApp(),
    s = st.settings,
    [src, setSrc] = useState('learned'),
    [i, setI] = useState(0);
  const items = useMemo(
    () =>
      fixed ||
      (src === 'learned'
        ? speakList(poolLearned(st))
        : speakList(poolComm(+src.slice(2)))),
    [fixed, src]
  );
  useEffect(() => setI(0), [src]);
  const x = items[i];
  return (
    <div className="space-y-3">
      {!fixed && (
        <div className="card p-3 flex flex-wrap gap-2 items-center">
          <span className="text-sm mu">Nguồn câu:</span>
          <Sel
            v={src}
            on={setSrc}
            opts={[
              ['learned', 'Các bài HSK 1 đã học'],
              ...COMM_DATA.map((c) => [`c:${c.i}`, `Giao tiếp: ${c.t}`]),
            ]}
          />
          <span className="text-sm mu">{items.length} câu</span>
        </div>
      )}
      {x ? (
        <div className="card accent p-5">
          <div className="text-xs mu mb-1">
            {title || 'Nghe và nói nhại theo câu mẫu'} · Câu {i + 1}/
            {items.length}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="han text-3xl font-semibold">{zh(x.s)}</span>
            <SpeakBtn text={x.s} />
            <SpeakBtn text={x.s} rate={0.6} label="Chậm" />
          </div>
          {s.py && <div className="pri mt-1">{x.py}</div>}
          {s.vi && <div className="text-sm mt-1">{x.vi}</div>}
          <div className="mt-4">
            <Recorder text={x.s} py={x.py} />
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-o btn-sm"
              disabled={!i}
              onClick={() => setI(i - 1)}
            >
              <ChevronLeft size={14} /> Câu trước
            </button>
            <button
              className="btn btn-o btn-sm"
              onClick={() => setI(rnd(items.length))}
            >
              <Shuffle size={14} /> Ngẫu nhiên
            </button>
            <button
              className="btn btn-p btn-sm"
              disabled={i >= items.length - 1}
              onClick={() => setI(i + 1)}
            >
              Câu tiếp <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <Empty>Chưa có câu để luyện.</Empty>
      )}
    </div>
  );
}
function RolePlay({ lines, title }) {
  const { st } = useApp(),
    s = st.settings,
    roles = uniq(lines.map((l) => l.sp));
  const [me, setMe] = useState(null),
    [i, setI] = useState(0),
    [hint, setHint] = useState(false);
  useEffect(() => {
    if (me && i < lines.length && lines[i].sp !== me) {
      const t = setTimeout(() => speak(lines[i].s), 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [me, i]);
  if (!me)
    return (
      <div className="card p-4">
        <div className="font-semibold mb-2">
          {title || 'Đóng vai hội thoại'}
        </div>
        <div className="text-sm mu mb-3">
          Chọn vai của bạn. Máy đọc lời của vai còn lại; đến lượt bạn, hãy nói
          câu phù hợp (có thể ghi âm để nghe lại).
        </div>
        <div className="flex gap-2">
          {roles.map((r) => (
            <button
              key={r}
              className="btn btn-p"
              onClick={() => {
                setMe(r);
                setI(0);
              }}
            >
              Tôi đóng vai {r}
            </button>
          ))}
        </div>
      </div>
    );
  const l = lines[i],
    next = () => {
      setI(i + 1);
      setHint(false);
    };
  return (
    <div className="card p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Bạn đóng vai {me}</div>
        <button
          className="btn btn-o btn-sm"
          onClick={() => {
            setMe(null);
            setI(0);
          }}
        >
          Đổi vai
        </button>
      </div>
      <div className="space-y-2">
        {lines.slice(0, i).map((x, k) => (
          <div key={k} className={`flex ${x.sp === me ? 'justify-end' : ''}`}>
            <div
              className={`p-2 rounded-xl text-sm ${
                x.sp === me ? 'hl' : 'card'
              }`}
              style={{ maxWidth: '80%' }}
            >
              <span className="han">{zh(x.s)}</span>
              {s.py && <div className="mu text-xs">{x.py}</div>}
            </div>
          </div>
        ))}
      </div>
      {!l ? (
        <div className="box text-center">
          Hoàn thành hội thoại!{' '}
          <button className="btn btn-sm btn-p ml-2" onClick={() => setI(0)}>
            <RotateCcw size={14} /> Luyện lại
          </button>
        </div>
      ) : l.sp !== me ? (
        <div className="card p-3">
          <div className="text-xs mu">{l.sp} nói:</div>
          <div className="flex items-center gap-2">
            <span className="han text-xl">{zh(l.s)}</span>
            <SpeakBtn text={l.s} />
          </div>
          {s.py && <div className="mu text-sm">{l.py}</div>}
          {s.vi && <div className="text-sm">{l.vi}</div>}
          <button className="btn btn-p btn-sm mt-2" onClick={next}>
            Đến lượt tiếp <ChevronRight size={14} />
          </button>
        </div>
      ) : (
        <div className="card p-3" style={{ borderColor: 'var(--red)' }}>
          <div className="text-xs mu">
            Đến lượt bạn ({me}) — hãy nói ý sau bằng tiếng Trung:
          </div>
          <div className="font-semibold">{l.vi}</div>
          {hint ? (
            <div className="mt-1">
              <span className="han text-xl">{zh(l.s)}</span>
              <div className="mu text-sm">{l.py}</div>
            </div>
          ) : (
            <button
              className="btn btn-o btn-sm mt-1"
              onClick={() => setHint(true)}
            >
              <Eye size={14} /> Xem câu mẫu
            </button>
          )}
          <div className="mt-2">
            <Recorder text={l.s} py={l.py} />
          </div>
          <button className="btn btn-p btn-sm mt-2" onClick={next}>
            Tiếp tục <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
function RolePick() {
  const opts = [
    ...learnIn(1, 8)
      .filter((l) => l.dlg.length > 1)
      .map((l) => [`l:${l.id}`, `HSK 1 · ${l.t}`]),
    ...COMM_DATA.filter((c) => !c.mono).map((c) => [
      `c:${c.i}`,
      `Giao tiếp: ${c.t}`,
    ]),
  ];
  const [v, setV] = useState(opts[0][0]);
  const lines = v.startsWith('l:')
    ? LESSON_BY[v.slice(2)].dlg
    : COMM_DATA[+v.slice(2)].dlg;
  return (
    <div className="space-y-3">
      <div className="card p-3 flex flex-wrap gap-2 items-center">
        <span className="text-sm mu">Chọn hội thoại:</span>
        <Sel v={v} on={setV} opts={opts} />
      </div>
      <RolePlay key={v} lines={lines} />
    </div>
  );
}
const parseAIJson = (raw) => {
  try {
    const m = String(raw).match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : null;
  } catch (e) {
    return null;
  }
};
const chatPrompt = (
  st,
  c,
  hist
) => `Bạn là bạn luyện hội thoại tiếng Trung cho người Việt, trình độ ${levelLabel(
  st.profile.level
)} (đang học HSK 1). Tình huống: "${
  c.t
}". Bạn đóng vai người bản xứ trong tình huống này; người học đóng vai còn lại.
Hội thoại mẫu tham khảo: ${c.dlg.map((l) => zh(l.s)).join(' / ')}
Lịch sử:
${hist.map((m) => `${m.who === 'me' ? 'Người học' : 'Bạn'}: ${m.t}`).join('\n')}
Hãy trả lời người học. CHỈ trả về JSON hợp lệ, không thêm chữ nào khác:
{"reply":"1–2 câu tiếng Trung giản thể, từ ngữ đơn giản","pinyin":"pinyin có dấu của reply","vi":"bản dịch tiếng Việt của reply","feedback":"nhận xét ngắn bằng tiếng Việt về câu cuối của người học: lỗi và câu sửa; nếu đúng thì khen ngắn"}`;
function AIChat() {
  const { st, go } = useApp(),
    ready = aiReady(st),
    s = st.settings;
  const [topic, setTopic] = useState('0'),
    [msgs, setMsgs] = useState([]),
    [inp, setInp] = useState(''),
    [busy, setBusy] = useState(false),
    [err, setErr] = useState('');
  if (!ready)
    return (
      <div className="card p-4 space-y-2">
        <div className="font-semibold flex items-center gap-2">
          <Bot size={18} /> Hội thoại với AI chưa được kết nối
        </div>
        <p className="text-sm">
          Website không giả lập AI. Tính năng này chỉ hoạt động khi:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>
            Chạy trong Claude Artifacts có hỗ trợ gọi Claude
            (window.claude.complete), hoặc
          </li>
          <li>
            Bạn triển khai máy chủ trung gian (proxy) HTTPS giữ API key ở phía
            máy chủ, rồi nhập địa chỉ trong Cài đặt.
          </li>
        </ul>
        <p className="text-sm mu">
          Trong lúc chờ, hãy dùng “Đóng vai hội thoại” theo kịch bản.
        </p>
        <button className="btn btn-o btn-sm" onClick={() => go('settings')}>
          <Settings size={14} /> Mở Cài đặt
        </button>
      </div>
    );
  const c = COMM_DATA[+topic];
  const send = async () => {
    const m = inp.trim();
    if (!m || busy) return;
    setInp('');
    setErr('');
    const hist = [...msgs, { who: 'me', t: m }];
    setMsgs(hist);
    setBusy(true);
    try {
      const raw = await askAI(st, chatPrompt(st, c, hist)),
        j = parseAIJson(raw);
      setMsgs([
        ...hist,
        j
          ? {
              who: 'ai',
              t: j.reply || '',
              py: j.pinyin || '',
              vi: j.vi || '',
              fb: j.feedback || '',
            }
          : { who: 'ai', t: String(raw) },
      ]);
      if (j && j.reply) speak(j.reply);
    } catch (e) {
      setErr(`Không gọi được AI: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };
  const dictate = () => {
    const SR = getSR();
    if (!SR) return;
    try {
      const r = new SR();
      r.lang = 'zh-CN';
      r.onresult = (e) =>
        setInp((x) => x + ((e.results[0] && e.results[0][0].transcript) || ''));
      r.onerror = (e) => setErr(`Nhận dạng lỗi: ${e.error}`);
      r.start();
    } catch (e) {
      setErr('Không khởi động được nhận dạng giọng nói.');
    }
  };
  return (
    <div className="card p-4 space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm mu">Tình huống:</span>
        <Sel
          v={topic}
          on={(v) => {
            setTopic(v);
            setMsgs([]);
          }}
          opts={COMM_DATA.map((x) => [String(x.i), `${x.ic} ${x.t}`])}
        />
        <span className="chip chip-w">
          Phản hồi do AI tạo — chỉ để tham khảo
        </span>
      </div>
      <div className="space-y-2" style={{ maxHeight: 380, overflowY: 'auto' }}>
        {!msgs.length && (
          <div className="text-sm mu">
            Hãy mở đầu bằng tiếng Trung, ví dụ:{' '}
            <span className="han">{zh(c.dlg[0].s)}</span>
          </div>
        )}
        {msgs.map((m, k) => (
          <div
            key={k}
            className={`flex ${m.who === 'me' ? 'justify-end' : ''}`}
          >
            <div
              className={`p-3 rounded-xl text-sm ${
                m.who === 'me' ? 'hl' : 'card'
              }`}
              style={{ maxWidth: '85%' }}
            >
              <div className="flex items-center gap-2">
                <span className="han text-base">{m.t}</span>
                {m.who === 'ai' && <SpeakBtn text={m.t} />}
              </div>
              {m.py && s.py && <div className="mu text-xs">{m.py}</div>}
              {m.vi && s.vi && <div className="text-xs">{m.vi}</div>}
              {m.fb && <div className="text-xs mt-1 red">Góp ý: {m.fb}</div>}
            </div>
          </div>
        ))}
        {busy && <div className="text-sm mu">AI đang trả lời…</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="inp han"
          value={inp}
          placeholder="Nhập câu tiếng Trung…"
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
        />
        {getSR() && (
          <button className="btn btn-o" title="Nói để nhập" onClick={dictate}>
            <Mic size={16} />
          </button>
        )}
        <button
          className="btn btn-p"
          disabled={busy || !inp.trim()}
          onClick={send}
        >
          <Send size={16} />
        </button>
      </div>
      {err && <div className="text-xs red">{err}</div>}
    </div>
  );
}
function SpeakPage() {
  const [tab, setTab] = useState('shadow');
  return (
    <div>
      <Title
        icon={Mic}
        right={<ViewToggles />}
        sub="Nghe mẫu → ghi âm → nghe lại → so sánh. Nhận dạng giọng nói (nếu trình duyệt hỗ trợ) chỉ so khớp chữ, không chấm phát âm."
      >
        Luyện nói và hội thoại
      </Title>
      <Tabs
        v={tab}
        on={setTab}
        tabs={[
          ['shadow', 'Nói nhại theo câu mẫu'],
          ['role', 'Đóng vai hội thoại'],
          ['ai', 'Hội thoại với AI'],
        ]}
      />
      {tab === 'shadow' && <ShadowPractice />}
      {tab === 'role' && <RolePick />}
      {tab === 'ai' && <AIChat />}
    </div>
  );
}

/* ---------- 37. Luyện viết chữ Hán: Hanzi Writer (tải từ CDN) + ô vẽ dự phòng ---------- */
let HW_PROMISE = null;
function loadHanziWriter() {
  if (typeof window !== 'undefined' && window.HanziWriter)
    return Promise.resolve(window.HanziWriter);
  if (!HW_PROMISE) {
    HW_PROMISE = new Promise((res, rej) => {
      const sc = document.createElement('script');
      sc.src =
        'https://cdn.jsdelivr.net/npm/hanzi-writer@3/dist/hanzi-writer.min.js';
      sc.async = true;
      sc.onload = () =>
        window.HanziWriter
          ? res(window.HanziWriter)
          : rej(new Error('missing'));
      sc.onerror = () => rej(new Error('load'));
      document.head.appendChild(sc);
      setTimeout(() => rej(new Error('timeout')), 12000);
    }).catch((e) => {
      HW_PROMISE = null;
      throw e;
    });
  }
  return HW_PROMISE;
}
let CHAR_INFO = null;
const charInfo = () => {
  if (CHAR_INFO) return CHAR_INFO;
  CHAR_INFO = {};
  HSK1_WORDS.forEach((w) =>
    charPairs(w).forEach(([c, sy]) => {
      if (!CHAR_INFO[c]) CHAR_INFO[c] = { c, py: sy.toLowerCase(), w };
    })
  );
  return CHAR_INFO;
};
const GRID_BG = {
  backgroundImage:
    'linear-gradient(var(--bd), var(--bd)), linear-gradient(var(--bd), var(--bd))',
  backgroundSize: '100% 1px, 1px 100%',
  backgroundPosition: 'center, center',
  backgroundRepeat: 'no-repeat',
};
function FreeCanvas({ ch }) {
  const cv = useRef(null),
    strokes = useRef([]),
    cur = useRef(null);
  const [ghost, setGhost] = useState(true),
    [ans, setAns] = useState(false),
    [, setTick] = useState(0);
  const draw = () => {
    const c = cv.current;
    if (!c) return;
    const g = c.getContext('2d'),
      W = c.width;
    g.clearRect(0, 0, W, W);
    g.strokeStyle = '#c9d6e6';
    g.lineWidth = 1;
    g.setLineDash([6, 6]);
    [
      [0, W / 2, W, W / 2],
      [W / 2, 0, W / 2, W],
      [0, 0, W, W],
      [W, 0, 0, W],
    ].forEach(([a, b, x, y]) => {
      g.beginPath();
      g.moveTo(a, b);
      g.lineTo(x, y);
      g.stroke();
    });
    g.setLineDash([]);
    if (ghost || ans) {
      g.fillStyle = ans ? 'rgba(214,40,40,.85)' : 'rgba(43,127,217,.16)';
      g.font = `${Math.round(
        W * 0.8
      )}px "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(ch, W / 2, W / 2 + W * 0.03);
    }
    g.strokeStyle = '#1d4ed8';
    g.lineWidth = W / 24;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    strokes.current.forEach((sk) => {
      g.beginPath();
      sk.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
      if (sk.length === 1) g.lineTo(sk[0][0] + 0.1, sk[0][1]);
      g.stroke();
    });
  };
  useEffect(() => {
    strokes.current = [];
    setAns(false);
    setTick((t) => t + 1);
  }, [ch]);
  useEffect(draw);
  const pt = (e) => {
    const c = cv.current,
      r = c.getBoundingClientRect();
    return [
      ((e.clientX - r.left) * c.width) / r.width,
      ((e.clientY - r.top) * c.height) / r.height,
    ];
  };
  return (
    <div>
      <Note tone="w">
        Không tải được Hanzi Writer (môi trường chặn thư viện ngoài hoặc mất
        mạng). Đang dùng ô luyện viết tự do — chưa có hoạt ảnh và kiểm tra thứ
        tự nét.
      </Note>
      <div className="flex justify-center mt-2">
        <canvas
          ref={cv}
          width={300}
          height={300}
          className="card"
          style={{
            width: 260,
            height: 260,
            touchAction: 'none',
            cursor: 'crosshair',
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            cur.current = [pt(e)];
            strokes.current.push(cur.current);
            draw();
          }}
          onPointerMove={(e) => {
            if (!cur.current) return;
            cur.current.push(pt(e));
            draw();
          }}
          onPointerUp={() => {
            cur.current = null;
            setTick((t) => t + 1);
          }}
          onPointerCancel={() => {
            cur.current = null;
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        <button
          className="btn btn-o btn-sm"
          onClick={() => {
            strokes.current.pop();
            setTick((t) => t + 1);
          }}
        >
          Hoàn tác nét
        </button>
        <button
          className="btn btn-o btn-sm"
          onClick={() => {
            strokes.current = [];
            setAns(false);
            setTick((t) => t + 1);
          }}
        >
          <Trash2 size={14} /> Xóa / Viết lại
        </button>
        <button
          className={`btn btn-sm ${ghost ? 'btn-g' : 'btn-o'}`}
          onClick={() => setGhost(!ghost)}
        >
          {ghost ? <EyeOff size={14} /> : <Eye size={14} />}{' '}
          {ghost ? 'Ẩn chữ mẫu' : 'Hiện chữ mẫu'}
        </button>
        <button className="btn btn-sm btn-r" onClick={() => setAns(!ans)}>
          {ans ? 'Ẩn đáp án' : 'Xem đáp án'}
        </button>
      </div>
    </div>
  );
}
function HanziBox({ ch }) {
  const { upd } = useApp(),
    box = useRef(null),
    wr = useRef(null);
  const [status, setStatus] = useState('loading'),
    [n, setN] = useState(0),
    [k, setK] = useState(0),
    [msg, setMsg] = useState(''),
    [mode, setMode] = useState('watch');
  useEffect(() => {
    let dead = false;
    setStatus('loading');
    setMsg('');
    setK(0);
    loadHanziWriter()
      .then((HW) => {
        if (dead || !box.current) return;
        box.current.innerHTML = '';
        wr.current = HW.create(box.current, ch, {
          width: 260,
          height: 260,
          padding: 14,
          showOutline: true,
          showCharacter: true,
          strokeColor: '#d62828',
          radicalColor: '#2b7fd9',
          outlineColor: '#c9d6e6',
          drawingColor: '#1d4ed8',
          drawingWidth: 20,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 300,
          onLoadCharDataSuccess: (d) => {
            if (!dead) {
              setN(d.strokes.length);
              setStatus('ok');
            }
          },
          onLoadCharDataError: () => {
            if (!dead) setStatus('fail');
          },
        });
      })
      .catch(() => {
        if (!dead) setStatus('fail');
      });
    return () => {
      dead = true;
    };
  }, [ch]);
  const safe = (f) => {
    const w = wr.current;
    if (!w) return;
    try {
      w.cancelQuiz();
    } catch (e) {
      /* chưa ở chế độ viết */
    }
    try {
      f(w);
    } catch (e) {
      setMsg('Thao tác chưa thực hiện được, hãy thử lại.');
    }
  };
  const quiz = (blind) =>
    safe((w) => {
      setMode(blind ? 'blind' : 'quiz');
      setMsg(
        blind
          ? 'Viết theo trí nhớ — không có gợi ý.'
          : 'Viết đè lên chữ mờ; sai 2 lần sẽ có gợi ý.'
      );
      w.hideCharacter();
      if (blind) w.hideOutline();
      else w.showOutline();
      w.quiz({
        showHintAfterMisses: blind ? false : 2,
        highlightOnComplete: true,
        onComplete: ({ totalMistakes }) => {
          setMsg(`Hoàn thành! Số lần viết sai nét: ${totalMistakes}.`);
          upd((s) =>
            applyResults(s, [
              {
                q: { sk: 'write', title: 'Viết chữ Hán', prompt: ch },
                ok: totalMistakes <= 1,
              },
            ])
          );
        },
      });
    });
  if (status === 'fail') return <FreeCanvas ch={ch} />;
  return (
    <div>
      <div className="flex justify-center">
        <div
          ref={box}
          className="card"
          style={{ width: 262, height: 262, ...GRID_BG }}
        />
      </div>
      {status === 'loading' && (
        <div className="text-xs mu text-center mt-1">
          Đang tải Hanzi Writer và dữ liệu nét chữ…
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        <button
          className="btn btn-p btn-sm"
          disabled={status !== 'ok'}
          onClick={() =>
            safe((w) => {
              setMode('watch');
              setMsg('');
              w.showOutline();
              w.showCharacter();
              w.animateCharacter();
            })
          }
        >
          <Play size={14} /> Xem thứ tự nét
        </button>
        <button
          className="btn btn-o btn-sm"
          disabled={status !== 'ok' || !n}
          onClick={() =>
            safe((w) => {
              setMode('watch');
              w.hideCharacter();
              w.showOutline();
              w.animateStroke(k);
              setMsg(`Nét ${k + 1}/${n}`);
              setK((k + 1) % n);
            })
          }
        >
          Nét tiếp theo
        </button>
        <button
          className="btn btn-g btn-sm"
          disabled={status !== 'ok'}
          onClick={() => quiz(false)}
        >
          <PenTool size={14} /> Luyện viết có gợi ý
        </button>
        <button
          className="btn btn-o btn-sm"
          disabled={status !== 'ok'}
          onClick={() => quiz(true)}
        >
          <EyeOff size={14} /> Không gợi ý
        </button>
        <button
          className="btn btn-o btn-sm"
          disabled={status !== 'ok'}
          onClick={() =>
            safe((w) => {
              w.showOutline();
              w.showCharacter();
              setMsg('Đáp án: chữ mẫu đã hiện.');
            })
          }
        >
          <Eye size={14} /> Xem đáp án
        </button>
        <button
          className="btn btn-r btn-sm"
          disabled={status !== 'ok'}
          onClick={() => quiz(mode === 'blind')}
        >
          <RotateCcw size={14} /> Xóa & viết lại
        </button>
      </div>
      {msg && <div className="text-sm text-center mt-2 okc">{msg}</div>}
    </div>
  );
}
function WritePage() {
  const { st } = useApp(),
    [scope, setScope] = useState('learned'),
    [ch, setCh] = useState(null);
  const chars = useMemo(() => {
    const info = charInfo(),
      ws = scope === 'all' ? HSK1_WORDS : poolLearned(st).words;
    return uniq(ws.flatMap((w) => hzChars(w.h))).filter((c) => info[c]);
  }, [scope, st.lessons]);
  const cur = ch && chars.includes(ch) ? ch : chars[0],
    info = cur ? charInfo()[cur] : null;
  return (
    <div>
      <Title
        icon={PenTool}
        sub="Hanzi Writer: xem thứ tự nét, luyện viết có / không gợi ý bằng chuột hoặc ngón tay. Theo đề cương HSK 3.0, yêu cầu viết tay bắt đầu từ HSK 2 (100 chữ)."
      >
        Luyện viết chữ Hán
      </Title>
      <div className="card p-3 mb-3">
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <Sel
            v={scope}
            on={setScope}
            opts={[
              ['learned', 'Chữ trong các bài đã học'],
              ['all', 'Toàn bộ chữ HSK 1 của website'],
            ]}
          />
          <span className="text-sm mu">{chars.length} chữ</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {chars.map((c) => (
            <button
              key={c}
              className={`btn btn-sm han ${c === cur ? 'btn-p' : 'btn-o'}`}
              style={{ fontSize: '1.1rem' }}
              onClick={() => setCh(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {cur && info && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="han text-5xl font-bold">{cur}</span>
              <div className="flex-1">
                <div className="pri text-xl font-semibold">{info.py}</div>
                <div className="text-sm">
                  Trong từ: <span className="han">{info.w.h}</span> ({info.w.py}
                  ) — {info.w.vi}
                </div>
              </div>
              <SpeakBtn text={cur} />
            </div>
            <HanziBox key={cur} ch={cur} />
          </div>
          <div className="card p-4 text-sm space-y-2">
            <div className="font-semibold">Hướng dẫn</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>“Xem thứ tự nét”: hoạt ảnh viết toàn bộ chữ.</li>
              <li>“Nét tiếp theo”: xem lần lượt từng nét.</li>
              <li>
                “Luyện viết có gợi ý”: viết đè lên chữ mờ; sai 2 lần sẽ được chỉ
                nét đúng.
              </li>
              <li>“Không gợi ý”: ẩn chữ mẫu, viết theo trí nhớ.</li>
              <li>
                “Xem đáp án” để hiện chữ mẫu; “Xóa & viết lại” để làm lại.
              </li>
            </ul>
            <Note>
              Quy tắc chung: ngang trước sổ sau · phẩy trước mác sau · trên
              trước dưới sau · trái trước phải sau · ngoài trước trong sau · vào
              nhà rồi đóng cửa · giữa trước hai bên sau.
            </Note>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 38. Flashcard + ôn tập ngắt quãng, trò chơi lật thẻ ---------- */
function FlashPage({ params = {} }) {
  const { st, upd, celebrate } = useApp();
  const [tab, setTab] = useState('cards'),
    [f, setF] = useState({
      src: 'hsk1',
      topic: '',
      mode: 'smart',
      dir: params.dir || 'zv',
    });
  const [q, setQ] = useState(null),
    [i, setI] = useState(0),
    [flip, setFlip] = useState(false),
    [tally, setTally] = useState([0, 0, 0]),
    [again, setAgain] = useState({});
  useEffect(() => {
    if (params.dir) setF((x) => ({ ...x, dir: params.dir }));
  }, [params.dir]);
  const id = q && q[i],
    w = id ? WORDS[id] : null,
    dir = f.dir === 'mix' ? (i % 2 ? 'vz' : 'zv') : f.dir,
    s = st.settings;
  useEffect(() => {
    if (flip && w) speak(w.h);
  }, [flip, id]);
  const grade = (g) => {
    if (!w) return;
    upd((x) => gradeWord(x, w.id, g));
    const nt = [...tally];
    nt[g]++;
    setTally(nt);
    let nq = q;
    if (g === 0 && (again[w.id] || 0) < 2) {
      nq = [...q, w.id];
      setQ(nq);
      setAgain({ ...again, [w.id]: (again[w.id] || 0) + 1 });
    }
    setFlip(false);
    setI(i + 1);
    if (i + 1 >= nq.length) {
      upd((x) => markDone(x, 'review'));
      if (nt[2] >= nt[0] && nt[2] > 0) celebrate();
    }
  };
  useEffect(() => {
    const h = (e) => {
      if (!w || (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)))
        return;
      if (e.key === ' ') {
        e.preventDefault();
        setFlip((x) => !x);
      } else if (flip && ['1', '2', '3'].includes(e.key)) grade(+e.key - 1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
  const ws = wordStats(st),
    preview = q ? [] : buildDeck(st, f);
  const topics = uniq(
    WORD_LIST.filter((x) => f.src === 'all' || x.src === f.src).map(
      (x) => x.topic
    )
  );

  if (tab === 'game')
    return (
      <div>
        <Title icon={Layers}>Flashcard và ôn tập</Title>
        <Tabs
          v={tab}
          on={setTab}
          tabs={[
            ['cards', 'Thẻ ôn tập'],
            ['game', 'Trò chơi lật thẻ'],
          ]}
        />
        <MemoryGame />
      </div>
    );
  return (
    <div>
      <Title
        icon={Layers}
        right={<ViewToggles compact />}
        sub="Ôn tập ngắt quãng: từ đến hạn được ưu tiên trước, từ mới chỉ thêm theo hạn mức mỗi ngày (tự giảm khi tồn đọng nhiều hoặc đang sai nhiều)."
      >
        Flashcard và ôn tập
      </Title>
      <Tabs
        v={tab}
        on={setTab}
        tabs={[
          ['cards', 'Thẻ ôn tập'],
          ['game', 'Trò chơi lật thẻ'],
        ]}
      />
      {!q && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat
              icon={Brain}
              label="Đến hạn ôn"
              value={ws.due}
              tone={ws.due ? 'red' : 'ok'}
            />
            <Stat
              icon={Sparkles}
              label="Từ mới còn lại hôm nay"
              value={newQuota(st)}
            />
            <Stat icon={Award} label="Đã thuộc" value={ws.known} tone="ok" />
            <Stat icon={X} label="Thường sai" value={ws.hard} tone="w" />
          </div>
          <div className="card p-4 flex flex-wrap gap-2 items-center">
            <Sel
              v={f.mode}
              on={(v) => setF({ ...f, mode: v })}
              opts={[
                ['smart', 'Ôn thông minh (đến hạn + từ mới)'],
                ['hard', 'Từ thường sai'],
                ['learning', 'Từ đang học'],
                ['known', 'Từ đã thuộc'],
                ['random', 'Học ngẫu nhiên (30 thẻ)'],
                ['all', 'Tất cả'],
              ]}
            />
            <Sel
              v={f.src}
              on={(v) => setF({ ...f, src: v, topic: '' })}
              opts={[
                ['hsk1', 'HSK 1'],
                ['comm', 'Giao tiếp'],
                ['all', 'Tất cả nguồn'],
              ]}
            />
            <Sel
              v={f.topic}
              on={(v) => setF({ ...f, topic: v })}
              opts={[['', 'Mọi chủ đề'], ...topics.map((t) => [t, t])]}
            />
            <Sel
              v={f.dir}
              on={(v) => setF({ ...f, dir: v })}
              opts={[
                ['zv', 'Hán → Việt'],
                ['vz', 'Việt → Hán'],
                ['mix', 'Đảo chiều xen kẽ'],
              ]}
            />
            <button
              className="btn btn-r"
              disabled={!preview.length}
              onClick={() => {
                setQ(preview.map((x) => x.id));
                setI(0);
                setFlip(false);
                setTally([0, 0, 0]);
                setAgain({});
              }}
            >
              <Play size={16} /> Bắt đầu ({preview.length} thẻ)
            </button>
          </div>
          {!preview.length && (
            <Empty>
              Không có thẻ phù hợp bộ lọc. Hôm nay bạn đã ôn hết từ đến hạn hoặc
              đã dùng hết hạn mức từ mới — hãy chọn “Học ngẫu nhiên” hoặc học
              bài mới.
            </Empty>
          )}
        </div>
      )}
      {q && w && (
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button className="btn btn-o btn-sm" onClick={() => setQ(null)}>
              <ChevronLeft size={14} />
            </button>
            <div className="flex-1">
              <Bar v={pct(i, q.length)} />
            </div>
            <span className="text-sm mu">
              {i + 1}/{q.length}
            </span>
          </div>
          <div
            className="flip"
            style={{ height: 320, cursor: 'pointer' }}
            onClick={() => setFlip(!flip)}
          >
            <div className={`flip-in ${flip ? 'on' : ''}`}>
              <div className="face card accent">
                {dir === 'zv' ? (
                  <>
                    <div className="han text-6xl font-bold">{w.h}</div>
                    <div className="mt-3">
                      <SpeakBtn text={w.h} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-semibold text-center">
                      {w.vi}
                    </div>
                    <div className="mu text-sm mt-2">Chữ Hán là gì?</div>
                  </>
                )}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className="btn btn-g btn-sm">
                    <RotateCcw size={14} /> Lật thẻ
                  </span>
                  <span className="mu text-xs">hoặc nhấn phím Space</span>
                </div>
              </div>
              <div className="face card back mb-fc-back">
                <div className="mb-fc-rose" aria-hidden="true">
                  <GardenRose palette="blush" size={60} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="han text-5xl font-bold">{w.h}</span>
                  {w.em && <span className="text-3xl">{w.em}</span>}
                </div>
                <div className="pri text-lg mt-1">{w.py}</div>
                <div className="font-semibold text-center">
                  {w.vi}
                  {w.pos && (
                    <span className="chip chip-mu ml-2">{POS[w.pos]}</span>
                  )}
                </div>
                {w.ex && (
                  <div className="text-center mt-3 text-sm">
                    <div className="han text-base">{zh(w.ex)}</div>
                    {s.py && <div className="mu">{w.exPy}</div>}
                    {s.vi && <div>{w.exVi}</div>}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <SpeakBtn text={w.h} />
                  {w.ex && <SpeakBtn text={w.ex} label="Câu ví dụ" />}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              className="btn btn-r"
              disabled={!flip}
              onClick={() => grade(0)}
            >
              1 · Chưa thuộc
            </button>
            <button
              className="btn btn-y"
              disabled={!flip}
              onClick={() => grade(1)}
            >
              2 · Cần ôn tập
            </button>
            <button
              className="btn btn-y"
              disabled={!flip}
              onClick={() => grade(2)}
            >
              3 · Đã thuộc
            </button>
          </div>
          <div className="text-xs mu text-center mt-2">
            “Chưa thuộc” sẽ gặp lại cuối phiên và sau 10 phút; “Đã thuộc” giãn
            lịch ôn dần (1 → 3 → 8… ngày).
          </div>
        </div>
      )}
      {q && !w && (
        <div className="card accent p-6 max-w-xl mx-auto text-center space-y-3">
          <div className="flex justify-center" aria-hidden="true">
            <TulipBouquet height={120} />
          </div>
          <div className="text-lg font-bold">Hoàn thành phiên ôn tập!</div>
          <div className="flex justify-center gap-2">
            <span className="chip chip-r">Chưa thuộc: {tally[0]}</span>
            <span className="chip chip-w">Cần ôn: {tally[1]}</span>
            <span className="chip chip-ok">Đã thuộc: {tally[2]}</span>
          </div>
          <div className="text-sm mu">
            Kết quả đã được lưu và lịch ôn được cập nhật tự động.
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="btn btn-p" onClick={() => setQ(null)}>
              Phiên mới
            </button>
            <button
              className="btn btn-y"
              onClick={() => {
                setQ(null);
                setTab('game');
              }}
            >
              Trò chơi lật thẻ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function MemoryGame({ words: given, onExit }) {
  const { st, celebrate } = useApp();
  const mk = () => {
    const ws =
      given || pickDistinct(shuffle(poolLearned(st).words), 6, (x) => x.vi);
    return shuffle(
      ws.flatMap((w) => [
        { id: w.id, t: w.h, hz: true },
        { id: w.id, t: w.vi },
      ])
    ).map((c, k) => ({ ...c, k }));
  };
  const [cards, setCards] = useState(mk),
    [open, setOpen] = useState([]),
    [done, setDone] = useState([]),
    [moves, setMoves] = useState(0),
    [t0, setT0] = useState(Date.now());
  const tap = (c) => {
    if (open.length === 2 || open.includes(c.k) || done.includes(c.id)) return;
    const o = [...open, c.k];
    setOpen(o);
    if (c.hz) speak(c.t);
    if (o.length === 2) {
      setMoves(moves + 1);
      const [a, b] = o.map((k) => cards.find((x) => x.k === k));
      if (a.id === b.id) {
        const nd = [...done, a.id];
        setTimeout(() => {
          setDone(nd);
          setOpen([]);
          if (nd.length * 2 === cards.length) celebrate();
        }, 350);
      } else setTimeout(() => setOpen([]), 900);
    }
  };
  if (cards.length < 4)
    return (
      <Empty>Cần học ít nhất 2 từ để chơi. Hãy học bài đầu tiên trước.</Empty>
    );
  const fin = done.length * 2 === cards.length;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold">Ghép chữ Hán với nghĩa</div>
        <div className="text-sm mu">
          Lượt: {moves} · Cặp: {done.length}/{cards.length / 2}
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {cards.map((c) => {
          const show = open.includes(c.k) || done.includes(c.id);
          return (
            <button
              key={c.k}
              className={`opt ${
                done.includes(c.id) ? 'good' : show ? 'sel' : ''
              }`}
              style={{ height: 86, textAlign: 'center' }}
              onClick={() => tap(c)}
            >
              {show ? (
                <span className={c.hz ? 'han text-2xl font-bold' : 'text-sm'}>
                  {c.t}
                </span>
              ) : (
                <span className="text-2xl red">?</span>
              )}
            </button>
          );
        })}
      </div>
      {fin && (
        <div className="card p-4 mt-3 text-center pop font-semibold">
          Hoàn thành sau {moves} lượt · {Math.round((Date.now() - t0) / 1000)}{' '}
          giây
        </div>
      )}
      <div className="flex gap-2 justify-center mt-3">
        <button
          className="btn btn-p"
          onClick={() => {
            setCards(mk());
            setOpen([]);
            setDone([]);
            setMoves(0);
            setT0(Date.now());
          }}
        >
          <Shuffle size={16} /> Ván mới
        </button>
        {onExit && (
          <button className="btn btn-o" onClick={onExit}>
            Quay lại
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- 39. Bài viết / trình bày mở: tiêu chí + bài mẫu (+ AI khi có kết nối thật) ---------- */
const WK_LABEL = {
  pic: 'Miêu tả tranh',
  para: 'Viết đoạn văn',
  sum: 'Tóm tắt',
  msg: 'Tin nhắn / email',
  op: 'Trình bày ý kiến',
};
const writePrompt = (
  st,
  t,
  text
) => `Bạn là giáo viên tiếng Trung, chấm bài viết của người Việt đang học HSK 1. Đề: "${t.t}" — ${t.p}. Từ gợi ý: ${t.w}.
Bài làm: """${text}"""
Nhận xét bằng tiếng Việt, ngắn gọn, đúng sự thật (không bịa lỗi nếu câu đúng), theo 4 mục:
1) Mức độ hoàn thành yêu cầu đề.
2) Lỗi ngữ pháp / từ vựng / chữ Hán: trích câu sai → câu sửa.
3) Gợi ý diễn đạt tự nhiên hơn ở trình độ HSK 1–2.
4) Điểm ước lượng trên thang 10 và lý do.`;
function WriteTask({ task, onExit }) {
  const { st, upd } = useApp(),
    prev = st.wr[task.i];
  const [text, setText] = useState(prev?.text || ''),
    [sub, setSub] = useState(false),
    [rb, setRb] = useState(RUBRIC.map(() => false));
  const [ai, setAi] = useState(''),
    [busy, setBusy] = useState(false),
    [err, setErr] = useState(''),
    [saved, setSaved] = useState(false);
  const req = task.w.split(' '),
    used = req.filter((x) => text.includes(x)),
    nHz = hzChars(text).length,
    [ss, spy, svi] = task.s.split('|');
  const submit = () => {
    setSub(true);
    setSaved(false);
    upd((s) => ({
      ...s,
      wr: {
        ...s.wr,
        [task.i]: { text, at: Date.now(), used: used.length, n: nHz },
      },
    }));
  };
  const saveSelf = () => {
    const score = rb.filter(Boolean).length;
    setSaved(true);
    upd((s) =>
      applyResults(
        s,
        [
          {
            q: { sk: 'write', title: `Viết: ${task.t}`, prompt: task.t },
            ok: score >= 2,
          },
        ],
        {
          kind: 'write',
          title: `Viết: ${task.t} (tự đánh giá ${score}/${RUBRIC.length})`,
        }
      )
    );
  };
  const askFb = async () => {
    setBusy(true);
    setErr('');
    try {
      setAi(await askAI(st, writePrompt(st, task, text)));
    } catch (e) {
      setErr(`Không gọi được AI: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <div className="flex justify-between items-center gap-2">
        {onExit && (
          <button className="btn btn-o btn-sm" onClick={onExit}>
            <ChevronLeft size={14} /> Quay lại
          </button>
        )}
        <span className="chip">{WK_LABEL[task.k]}</span>
      </div>
      <div className="card accent p-4">
        <div className="font-bold text-lg">{task.t}</div>
        <p className="text-sm mt-1">{task.p}</p>
        {task.sc && <div className="text-5xl text-center my-3">{task.sc}</div>}
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          <span className="text-xs mu">Từ gợi ý:</span>
          {req.map((x) => (
            <span
              key={x}
              className={`chip han ${text.includes(x) ? 'chip-ok' : 'chip-mu'}`}
            >
              {x}
            </span>
          ))}
        </div>
      </div>
      {task.k === 'sum' && READ_DATA[task.read] && (
        <Passage r={READ_DATA[task.read]} noVi />
      )}
      <textarea
        className="inp han"
        rows={6}
        value={text}
        placeholder="Viết bằng chữ Hán (có thể dùng bộ gõ Pinyin của máy)…"
        onChange={(e) => {
          setText(e.target.value);
          setSub(false);
        }}
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span>
          Số chữ Hán: <b className={nHz >= task.min ? 'okc' : 'red'}>{nHz}</b>/
          {task.min} tối thiểu
        </span>
        <span>
          Từ gợi ý đã dùng:{' '}
          <b>
            {used.length}/{req.length}
          </b>
        </span>
        <button
          className="btn btn-p btn-sm"
          disabled={!text.trim()}
          onClick={submit}
        >
          <Check size={14} /> Nộp bài
        </button>
        {prev && (
          <span className="text-xs mu">
            Đã lưu lần trước: {fmtDate(prev.at)}
          </span>
        )}
      </div>
      {sub && (
        <div className="space-y-3 fade">
          <div className="card p-4">
            <div className="font-semibold mb-2">
              Kiểm tra tự động (khách quan)
            </div>
            <div className="text-sm">
              {nHz >= task.min ? '✓' : '✗'} Độ dài: {nHz} chữ Hán (yêu cầu ≥{' '}
              {task.min})
            </div>
            <div className="text-sm">
              {used.length === req.length ? '✓' : '•'} Đã dùng {used.length}/
              {req.length} từ gợi ý
              {used.length < req.length
                ? ` — còn thiếu: ${req
                    .filter((x) => !used.includes(x))
                    .join('、')}`
                : ''}
            </div>
            <div className="text-xs mu mt-1">
              Máy chỉ kiểm tra độ dài và từ gợi ý, không chấm ngữ pháp.
            </div>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2">
              Tự đánh giá theo tiêu chí (so với bài mẫu)
            </div>
            {RUBRIC.map((r, k) => (
              <label key={k} className="flex items-center gap-2 text-sm py-1">
                <input
                  type="checkbox"
                  checked={rb[k]}
                  onChange={() => setRb(rb.map((x, j) => (j === k ? !x : x)))}
                />{' '}
                {r}
              </label>
            ))}
            <button
              className="btn btn-g btn-sm mt-2"
              disabled={saved}
              onClick={saveSelf}
            >
              {saved ? 'Đã lưu' : 'Lưu tự đánh giá'}
            </button>
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2 flex items-center gap-2">
              Bài mẫu tham khảo <SpeakBtn text={ss} />
            </div>
            <div className="han text-lg">{zh(ss)}</div>
            {st.settings.py && <div className="mu text-sm mt-1">{spy}</div>}
            {st.settings.vi && <div className="text-sm mt-1">{svi}</div>}
          </div>
          <div className="card p-4">
            <div className="font-semibold mb-2 flex items-center gap-2">
              <Bot size={16} /> Nhận xét của AI
            </div>
            {aiReady(st) ? (
              <>
                <button
                  className="btn btn-p btn-sm"
                  disabled={busy}
                  onClick={askFb}
                >
                  {busy ? 'Đang chấm…' : 'Nhờ AI nhận xét'}
                </button>
                {ai && (
                  <div className="box mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                    {ai}
                    <div className="text-xs mu mt-2">
                      Nhận xét do AI tạo — chỉ để tham khảo.
                    </div>
                  </div>
                )}
                {err && <div className="text-xs red mt-1">{err}</div>}
              </>
            ) : (
              <div className="text-sm mu">
                Chưa có kết nối AI thật nên không có chấm điểm tự động. Có thể
                kết nối trong Cài đặt (máy chủ proxy) hoặc chạy trong Claude
                Artifacts có hỗ trợ AI.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function OpenWriting({ kind, onExit }) {
  const list = WRITE.map((t, i) => ({ ...t, i })).filter(
    (t) => !kind || t.k === kind
  );
  const [sel, setSel] = useState(null);
  if (sel !== null)
    return (
      <WriteTask task={{ ...WRITE[sel], i: sel }} onExit={() => setSel(null)} />
    );
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold">
          {kind ? WK_LABEL[kind] : 'Viết và trình bày'}
        </div>
        {onExit && (
          <button className="btn btn-o btn-sm" onClick={onExit}>
            <ChevronLeft size={14} /> Quay lại
          </button>
        )}
      </div>
      <div className="grid gap-2">
        {list.map((t) => (
          <button key={t.i} className="opt" onClick={() => setSel(t.i)}>
            <div className="flex justify-between gap-2">
              <span className="font-semibold text-sm">{t.t}</span>
              <span className="chip chip-mu">{WK_LABEL[t.k]}</span>
            </div>
            <div className="text-sm mu mt-1">{t.p}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ========================= HẾT PHẦN 5/6 ========================= */
/* =====================================================================
   PHẦN 6/6: NGÂN HÀNG BÀI TẬP · THI THỬ · GIAO TIẾP · THỐNG KÊ · CÀI ĐẶT · KHỞI ĐẦU · ỨNG DỤNG
   Dán ngay sau Phần 5 — phần cuối, chứa `export default`.
   ===================================================================== */

/* ---------- 40. Ngân hàng 35 dạng bài tập ---------- */
const SK_TABS = [
  ['all', 'Tất cả'],
  ['pron', 'Phát âm'],
  ['listen', 'Nghe'],
  ['speak', 'Nói'],
  ['read', 'Đọc'],
  ['write', 'Viết'],
  ['vocab', 'Từ vựng'],
  ['grammar', 'Ngữ pháp'],
];
function BankPage({ params = {} }) {
  const { st, upd, go } = useApp();
  const [scope, setScope] = useState('learned'),
    [sk, setSk] = useState('all'),
    [run, setRun] = useState(null);
  const pool = () => (scope === 'all' ? poolAll() : poolLearned(st));
  const quiz = (name, ref, qs) => setRun({ view: 'quiz', name, ref, qs });
  const open = (t) => {
    const [, n, name, code] = t;
    if (code.startsWith('@flash'))
      return go('flash', { dir: code.split(':')[1] });
    if (code === '@write') return go('write');
    if (code === '@exam') return go('exam');
    if (code === '@memory') return setRun({ view: 'memory' });
    if (code.startsWith('w:'))
      return setRun({ view: 'write', kind: code.slice(2) });
    if (code === 'rec' || code === 'shadow')
      return setRun({ view: 'shadow', name });
    if (code === 'role') return setRun({ view: 'role' });
    return quiz(
      `${n}. ${name}`,
      `type:${code}`,
      genSet([code], pool(), 10, st.recent)
    );
  };
  useEffect(() => {
    if (params.code) {
      const t = TYPES.find((x) => x[3] === params.code);
      if (t) open(t);
    }
  }, [params.code]);
  if (run) {
    const back = () => setRun(null);
    const bar = (
      <button className="btn btn-o btn-sm mb-3" onClick={back}>
        <ChevronLeft size={14} /> Ngân hàng bài tập
      </button>
    );
    if (run.view === 'quiz')
      return (
        <Quiz
          qs={run.qs}
          mode="practice"
          title={run.name}
          onExit={back}
          onFinish={(res) =>
            upd((s) =>
              applyResults(s, res, {
                kind: 'practice',
                ref: run.ref,
                title: run.name,
              })
            )
          }
        />
      );
    if (run.view === 'memory')
      return (
        <div>
          {bar}
          <MemoryGame onExit={back} />
        </div>
      );
    if (run.view === 'write')
      return <OpenWriting kind={run.kind} onExit={back} />;
    if (run.view === 'shadow')
      return (
        <div className="max-w-3xl mx-auto">
          {bar}
          <ShadowPractice title={run.name} />
        </div>
      );
    if (run.view === 'role')
      return (
        <div className="max-w-3xl mx-auto">
          {bar}
          <RolePick />
        </div>
      );
  }
  const nMist = Object.values(st.mist).filter((m) => m.q).length,
    list = TYPES.filter((t) => sk === 'all' || t[4] === sk);
  return (
    <div>
      <Title
        icon={ListChecks}
        sub="35 dạng bài tương tác. Câu hỏi sinh tự động từ nội dung đã học, tự trộn câu và đáp án, tránh lặp các câu vừa làm, sắp xếp từ dễ đến khó."
      >
        Ngân hàng bài tập
      </Title>
      <div className="card p-3 flex flex-wrap gap-2 items-center mb-3">
        <span className="text-sm mu">Phạm vi:</span>
        <Sel
          v={scope}
          on={setScope}
          opts={[
            ['learned', 'Các bài đã học'],
            ['all', 'Toàn bộ HSK 1'],
          ]}
        />
        <button
          className="btn btn-r btn-sm"
          onClick={() =>
            quiz(
              'Luyện tập tổng hợp',
              'type:mix',
              genSet(MIXED_CODES, pool(), 15, st.recent)
            )
          }
        >
          <Shuffle size={14} /> Luyện tổng hợp (15 câu)
        </button>
        {SKILL_GENS[sk] && (
          <button
            className="btn btn-p btn-sm"
            onClick={() =>
              quiz(
                `Luyện kỹ năng: ${SKILLS[sk]}`,
                `skill:${sk}`,
                genSet(SKILL_GENS[sk], pool(), 10, st.recent)
              )
            }
          >
            Luyện riêng kỹ năng {SKILLS[sk]}
          </button>
        )}
        <button
          className="btn btn-o btn-sm"
          disabled={!nMist}
          onClick={() => quiz('Làm lại câu sai', 'redo', buildRedo(st))}
        >
          <RotateCcw size={14} /> Làm lại câu sai ({nMist})
        </button>
      </div>
      <Tabs v={sk} on={setSk} tabs={SK_TABS} />
      {Object.entries(TYPE_GROUPS).map(([g, gname]) => {
        const items = list.filter((t) => t[0] === g);
        if (!items.length) return null;
        return (
          <div key={g} className="mb-4">
            <div className="font-semibold mb-2">
              Nhóm {g} — {gname}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((t) => {
                const h = st.hist.find((x) => x.ref === `type:${t[3]}`);
                return (
                  <button key={t[1]} className="opt" onClick={() => open(t)}>
                    <div className="flex items-start gap-2">
                      <span className="chip chip-r">{t[1]}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{t[2]}</div>
                        <div className="text-xs mu mt-1">
                          {SKILLS[t[4]]}
                          {h ? ` · lần gần nhất ${pct(h.sc, h.n)}%` : ''}
                          {t[3].startsWith('@')
                            ? ' · mở công cụ riêng'
                            : t[3].startsWith('w:')
                            ? ' · bài viết mở'
                            : ''}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 41. Thi thử HSK & kiểm tra đầu vào ---------- */
const PLACE_ADVICE = [
  'Bắt đầu HSK 1 từ Tuần 1 (Pinyin và thanh điệu).',
  'Đã có nền tảng HSK 1: bật “Học linh hoạt” để ôn nhanh và làm kiểm tra cuối các tuần; khung HSK 2 có trong Lộ trình (nội dung chi tiết dự kiến bổ sung).',
  'Ước lượng khoảng HSK 2: ôn nhanh HSK 1 ở chế độ học linh hoạt, luyện thêm các tình huống giao tiếp HSK 2–3.',
  'Ước lượng khoảng HSK 3: nội dung HSK 3 chi tiết chưa có — dùng mục Giao tiếp thực tế và theo dõi khung chương trình.',
  'Ước lượng HSK 4 trở lên: nội dung chi tiết chưa có — dùng các tình huống chuyên đề (thương mại, đàm phán, sở hữu trí tuệ).',
];
function ExamPage({ params = {} }) {
  const { st, upd, toast } = useApp(),
    C = chartColors(st.settings.dark);
  const [tab, setTab] = useState(params.kind === 'place' ? 'place' : 'mock'),
    [run, setRun] = useState(null),
    [out, setOut] = useState(null);
  const finish = (res, meta) => {
    if (meta.retry) {
      upd((s) =>
        applyResults(s, res, {
          kind: 'practice',
          title: 'Làm lại câu sai sau bài thi',
        })
      );
      return;
    }
    const p = pct(res.filter((y) => y.ok).length, res.length);
    if (run.kind === 'place') {
      const r = placementResult(res);
      setOut({ kind: 'place', ...r });
      upd((s) => {
        const x = applyResults(s, res, {
          kind: 'exam',
          ref: 'place',
          title: 'Kiểm tra đầu vào',
        });
        return {
          ...x,
          exams: [
            {
              t: Date.now(),
              kind: 'place',
              title: 'Kiểm tra đầu vào',
              p,
              lv: r.lv,
            },
            ...x.exams,
          ].slice(0, 60),
        };
      });
    } else {
      const sc = mockScore(res),
        parts = MOCK_PARTS.map(([t], pi) => {
          const r = res.filter((y) => y.q.part === pi);
          return [t, r.filter((y) => y.ok).length, r.length];
        });
      setOut({ kind: 'mock', ...sc, parts });
      upd((s) => {
        const x = applyResults(s, res, {
          kind: 'exam',
          ref: 'mock',
          title: 'Thi thử HSK 1',
        });
        return {
          ...x,
          exams: [
            {
              t: Date.now(),
              kind: 'mock',
              title: 'Thi thử HSK 1',
              p,
              total: sc.total,
              L: sc.L,
              R: sc.R,
            },
            ...x.exams,
          ].slice(0, 60),
        };
      });
    }
  };
  const extra = (res, retry) => {
    if (retry || !out) return null;
    if (out.kind === 'place')
      return (
        <div className="mt-3 text-left space-y-2">
          <div className="box">
            Trình độ ước lượng:{' '}
            <b>{out.lv ? `khoảng HSK ${out.lv}` : 'mới bắt đầu'}</b>.{' '}
            {PLACE_ADVICE[Math.min(out.lv, 4)]}
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((L) => {
              const [a, n] = out.by[L] || [0, 0];
              return (
                <span key={L} className="chip chip-mu">
                  Mức HSK {L}: {a}/{n}
                </span>
              );
            })}
          </div>
          <div className="text-xs mu">
            Bài 16 câu chỉ để ước lượng — không phải chứng nhận HSK.
          </div>
          <button
            className="btn btn-p btn-sm"
            onClick={() => {
              upd((s) => ({
                ...s,
                profile: { ...s.profile, level: out.lv ? String(out.lv) : '0' },
                settings: {
                  ...s.settings,
                  flex: out.lv > 0 ? true : s.settings.flex,
                },
              }));
              toast('Đã cập nhật trình độ vào hồ sơ.');
            }}
          >
            Áp dụng vào hồ sơ
          </button>
        </div>
      );
    return (
      <div className="mt-3 text-left space-y-2">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="box">
            <div className="text-xs mu">Nghe</div>
            <div className="text-xl font-bold">{out.L}/100</div>
          </div>
          <div className="box">
            <div className="text-xs mu">Đọc</div>
            <div className="text-xl font-bold">{out.R}/100</div>
          </div>
          <div className="box">
            <div className="text-xs mu">Tổng</div>
            <div className="text-xl font-bold">{out.total}/200</div>
          </div>
        </div>
        {out.parts.map(([t, a, n]) => (
          <div key={t} className="text-sm">
            <div className="flex justify-between">
              <span>{t}</span>
              <span>
                {a}/{n}
              </span>
            </div>
            <Bar
              v={pct(a, n)}
              h={5}
              color={pct(a, n) < 60 ? 'var(--red)' : undefined}
            />
          </div>
        ))}
        <div className="text-xs mu">
          Quy đổi 5 điểm/câu theo thang 200. Tham khảo: ngưỡng đạt HSK 1 bản 2.0
          là 120/200; ngưỡng của bản 3.0 chưa được xác minh. Câu hỏi do website
          biên soạn, không phải đề chính thức.
        </div>
      </div>
    );
  };
  if (run)
    return (
      <Quiz
        qs={run.qs}
        mode="test"
        timer={run.kind === 'mock' ? 2400 : 0}
        onFinish={finish}
        resultExtra={extra}
        onExit={() => setRun(null)}
        title={
          run.kind === 'mock'
            ? 'Thi thử HSK 1 — 40 câu · 40 phút'
            : 'Kiểm tra đầu vào — 16 câu'
        }
      />
    );
  const mocks = st.exams
    .filter((e) => e.kind === 'mock')
    .slice()
    .reverse()
    .map((e) => ({ n: fmtDate(e.t), v: e.total }));
  const KIND = {
    mock: 'Thi thử HSK 1',
    place: 'Kiểm tra đầu vào',
    review: 'Kiểm tra cuối tuần',
    final: 'Kiểm tra cuối cấp',
  };
  return (
    <div>
      <Title
        icon={ClipboardList}
        sub="Mô phỏng theo cấu trúc công bố của HSK 3.0 cấp 1; câu hỏi do website biên soạn từ dữ liệu đã có."
        right={<Peony palette="white" size={66} />}
      >
        Thi thử HSK
      </Title>
      <Tabs
        v={tab}
        on={setTab}
        tabs={[
          ['mock', 'Thi thử HSK 1'],
          ['place', 'Kiểm tra đầu vào'],
          ['hist', 'Lịch sử thi'],
        ]}
      />
      {tab === 'mock' && (
        <div className="space-y-3">
          <div className="card accent p-4">
            <div className="font-semibold mb-1">Cấu trúc bài thi thử</div>
            <div className="text-sm mb-2">
              Theo các nguồn tổng hợp: HSK 1 (3.0) gồm {OFFICIAL.exam[0][1]},
              khoảng {OFFICIAL.exam[0][2].replace('~', '')}, không có phần nói.
            </div>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              {MOCK_PARTS.map(([t]) => (
                <li key={t}>{t} — 5 câu</li>
              ))}
            </ol>
            <div className="text-xs mu mt-2">
              Có đếm giờ 40 phút; hết giờ, các câu chưa làm tính là sai. Kết quả
              phân tích theo từng phần.
            </div>
            <button
              className="btn btn-r mt-3"
              onClick={() => {
                setOut(null);
                setRun({ kind: 'mock', qs: buildMock() });
              }}
            >
              <Play size={16} /> Bắt đầu thi thử
            </button>
          </div>
          <Note tone="w">
            Đây không phải đề thi chính thức và không có giá trị chứng nhận. Hãy
            kiểm tra phiên bản đề (HSK 2.0 hay 3.0) khi đăng ký thi thật.
          </Note>
        </div>
      )}
      {tab === 'place' && (
        <div className="card p-4 space-y-2">
          <div className="font-semibold">Kiểm tra đầu vào (16 câu)</div>
          <p className="text-sm">
            Gồm từ vựng, ngữ pháp, đọc hiểu và nghe hiểu ở 4 mức tham chiếu HSK
            1–4. Kết quả dùng để đề xuất điểm bắt đầu.
          </p>
          <Note>
            Bài kiểm tra chỉ ước lượng trình độ, không phải chứng nhận HSK chính
            thức.
          </Note>
          <button
            className="btn btn-r"
            onClick={() => {
              setOut(null);
              setRun({ kind: 'place', qs: buildPlacement() });
            }}
          >
            <Play size={16} /> Làm bài kiểm tra
          </button>
        </div>
      )}
      {tab === 'hist' && (
        <div className="space-y-3">
          {mocks.length > 1 && (
            <div className="card p-4">
              <div className="font-semibold mb-2">
                Điểm thi thử theo thời gian (/200)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={mocks}>
                  <CartesianGrid stroke={C.grid} />
                  <XAxis dataKey="n" tick={{ fill: C.tx, fontSize: 11 }} />
                  <YAxis
                    domain={[0, 200]}
                    tick={{ fill: C.tx, fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: C.card,
                      border: `1px solid ${C.grid}`,
                      borderRadius: 10,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={C.red}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {st.exams.length ? (
            <div className="card p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="mu text-left">
                    <th className="p-2">Ngày</th>
                    <th className="p-2">Bài</th>
                    <th className="p-2">Kết quả</th>
                    <th className="p-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {st.exams.map((e, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--bd)' }}>
                      <td className="p-2">{fmtDate(e.t)}</td>
                      <td className="p-2">{KIND[e.kind] || e.title}</td>
                      <td className="p-2">
                        {e.kind === 'mock'
                          ? `${e.total}/200 (Nghe ${e.L} · Đọc ${e.R})`
                          : `${e.p}%`}
                        {e.kind === 'place'
                          ? ` · ${e.lv ? `~HSK ${e.lv}` : 'mới bắt đầu'}`
                          : ''}
                      </td>
                      <td className="p-2">
                        {e.pass === undefined ? (
                          '—'
                        ) : e.pass ? (
                          <span className="chip chip-ok">Đạt</span>
                        ) : (
                          <span className="chip chip-r">Chưa đạt</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty>Chưa có bài thi nào.</Empty>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 42. Tiếng Trung giao tiếp thực tế ---------- */
function CommPage({ params = {} }) {
  const { st, upd } = useApp();
  const [sel, setSel] = useState(params.i !== undefined ? +params.i : null),
    [tab, setTab] = useState('learn'),
    [qs, setQs] = useState(null);
  useEffect(() => {
    if (params.i !== undefined) setSel(+params.i);
  }, [params.i]);
  if (sel !== null && COMM_DATA[sel]) {
    const c = COMM_DATA[sel],
      P = poolComm(sel);
    const mkq = (t) =>
      t === 'listen'
        ? genSet(['lm', 'dlg', 'hz'], P, 6)
        : genSet(['sit', 'lm', 'order', 'tr'], P, 8);
    const setT = (t) => {
      setTab(t);
      setQs(t === 'listen' || t === 'ex' ? mkq(t) : null);
    };
    const rec = (res) =>
      upd((s) =>
        applyResults(s, res, {
          kind: 'practice',
          ref: `comm:${sel}`,
          title: `Giao tiếp: ${c.t}`,
        })
      );
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <button
            className="btn btn-o btn-sm"
            onClick={() => {
              setSel(null);
              setTab('learn');
              setQs(null);
            }}
          >
            <ChevronLeft size={14} /> Các tình huống
          </button>
          <ViewToggles compact />
        </div>
        <h1 className="text-2xl font-bold mb-1">
          {c.ic} {c.t}
        </h1>
        <div className="text-sm mu mb-3">
          Trình độ gợi ý: {c.lv} (ước lượng của website)
        </div>
        <Tabs
          v={tab}
          on={setT}
          tabs={[
            ['learn', 'Từ vựng & mẫu câu'],
            ['dialog', 'Hội thoại mẫu'],
            ['listen', 'Luyện nghe'],
            ['speak', 'Luyện nói'],
            ['ex', 'Bài tập tình huống'],
          ]}
        />
        {tab === 'learn' && (
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              {c.words.map(
                (h) => WORDS[h] && <WordCard key={h} w={WORDS[h]} />
              )}
            </div>
            <div className="card p-4">
              <div className="font-semibold mb-2">Mẫu câu cần nhớ</div>
              {c.dlg.map((l, i) => (
                <div
                  key={i}
                  className="py-2 flex items-start gap-2"
                  style={{ borderBottom: '1px dashed var(--bd)' }}
                >
                  <div className="flex-1">
                    <div className="han text-lg">{zh(l.s)}</div>
                    {st.settings.py && <div className="mu text-sm">{l.py}</div>}
                    {st.settings.vi && <div className="text-sm">{l.vi}</div>}
                  </div>
                  <SpeakBtn text={l.s} />
                </div>
              ))}
            </div>
            {c.mono && (
              <Note>
                Muốn tự viết email? Vào Ngân hàng bài tập → dạng 33 “Viết tin
                nhắn / email”.
              </Note>
            )}
          </div>
        )}
        {tab === 'dialog' && (
          <DialogView lines={c.dlg} title="Hội thoại mẫu" roleplay={!c.mono} />
        )}
        {tab === 'listen' && qs && (
          <Quiz
            qs={qs}
            mode="practice"
            title={`Luyện nghe: ${c.t}`}
            onExit={() => setQs(mkq('listen'))}
            onFinish={rec}
          />
        )}
        {tab === 'speak' && (
          <div className="space-y-4">
            <ShadowPractice
              key={sel}
              items={speakList(P)}
              title={`Nói nhại: ${c.t}`}
            />
            {!c.mono && (
              <RolePlay
                key={`r${sel}`}
                lines={c.dlg}
                title={`Đóng vai: ${c.t}`}
              />
            )}
            {aiReady(st) && (
              <Note>
                Muốn hội thoại tự do với AI theo tình huống này? Vào Luyện nói →
                Hội thoại với AI.
              </Note>
            )}
          </div>
        )}
        {tab === 'ex' && qs && (
          <Quiz
            qs={qs}
            mode="practice"
            title={`Bài tập tình huống: ${c.t}`}
            onExit={() => setQs(mkq('ex'))}
            onFinish={rec}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <Title
        icon={MessageCircle}
        sub="20 tình huống từ đời sống đến công việc, thương mại và sở hữu trí tuệ. Trình độ ghi trên thẻ là gợi ý của website, không phải phân loại chính thức."
      >
        Tiếng Trung giao tiếp thực tế
      </Title>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMM_DATA.map((c) => (
          <button
            key={c.i}
            className="opt"
            onClick={() => {
              setSel(c.i);
              setTab('learn');
              setQs(null);
            }}
          >
            <div className="text-3xl">{c.ic}</div>
            <div className="font-semibold mt-1">
              {c.i + 1}. {c.t}
            </div>
            <div className="text-xs mu mt-1">
              {c.lv} · {c.words.length} từ · {c.dlg.length} câu
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- 43. Thống kê và đánh giá tiến độ ---------- */
function StatsPage() {
  const { st } = useApp(),
    C = chartColors(st.settings.dark),
    [per, setPer] = useState('day');
  const ws = wordStats(st),
    prog = hskProgress(st),
    days = Object.values(st.days);
  const totM = days.reduce((a, x) => a + (x.m || 0), 0),
    totQ = days.reduce((a, x) => a + (x.q || 0), 0),
    totOk = days.reduce((a, x) => a + (x.ok || 0), 0);
  const series = (
    per === 'day'
      ? lastDays(st, 30).map((x) => ({ g: x.label, m: x.m, q: x.q, ok: x.ok }))
      : aggregate(st, per)
  ).map((x) => ({ g: x.g, m: x.m, acc: x.q ? pct(x.ok, x.q) : null }));
  const R = (w) => st.srs[w.id];
  const pie = [
    { n: 'Chưa học', v: HSK1_WORDS.filter((w) => !R(w)).length, c: C.grid },
    {
      n: 'Đang học',
      v: HSK1_WORDS.filter((w) => R(w) && R(w).iv < MASTER_IV).length,
      c: '#F1D497',
    },
    {
      n: 'Đã thuộc',
      v: HSK1_WORDS.filter((w) => R(w) && R(w).iv >= MASTER_IV).length,
      c: C.ok,
    },
  ];
  const scores = st.hist
    .filter((h) => h.k === 'lesson')
    .slice(0, 20)
    .reverse()
    .map((h, i) => ({ i: i + 1, v: pct(h.sc, h.n) }));
  const mist = Object.values(st.mist)
    .filter((m) => m.q)
    .sort((a, b) => b.n - a.n)
    .slice(0, 8);
  const KL = {
    lesson: 'Kiểm tra bài',
    practice: 'Luyện tập',
    exam: 'Thi',
    write: 'Viết',
  };
  const tip = {
    contentStyle: {
      background: C.card,
      border: `1px solid ${C.grid}`,
      borderRadius: 10,
    },
  };
  return (
    <div className="space-y-4">
      <Title
        icon={BarChart2}
        sub="Số liệu được tính từ lịch sử học lưu trên thiết bị này."
        right={
          <RoseCluster
            size={128}
            palettes={['pink', 'cream']}
            className="mb-title-flowers"
          />
        }
      >
        Thống kê và đánh giá tiến độ
      </Title>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          icon={Clock}
          label="Tổng thời gian học"
          value={`${Math.floor(totM / 60)} giờ ${totM % 60} phút`}
        />
        <Stat
          icon={Check}
          label="Câu đã làm"
          value={totQ}
          sub={`Đúng ${pct(totOk, totQ)}%`}
          tone="ok"
        />
        <Stat
          icon={Award}
          label="Buổi học đã đạt"
          value={`${prog.done}/${prog.total}`}
          sub={`HSK 1: ${prog.p}%`}
        />
        <Stat
          icon={Flame}
          label="Chuỗi ngày học"
          value={`${streakOf(st)} ngày`}
          tone="red"
        />
      </div>
      <Tabs
        v={per}
        on={setPer}
        tabs={[
          ['day', '30 ngày'],
          ['week', 'Theo tuần'],
          ['month', 'Theo tháng'],
        ]}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Thời gian học (phút)</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={series}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="g" tick={{ fill: C.tx, fontSize: 10 }} />
              <YAxis
                tick={{ fill: C.tx, fontSize: 11 }}
                allowDecimals={false}
              />
              <Tooltip {...tip} formatter={(v) => [`${v} phút`, 'Thời gian']} />
              <RBar dataKey="m" fill={C.pri} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Tỷ lệ trả lời đúng (%)</div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={series}>
              <CartesianGrid stroke={C.grid} />
              <XAxis dataKey="g" tick={{ fill: C.tx, fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: C.tx, fontSize: 11 }} />
              <Tooltip {...tip} formatter={(v) => [`${v}%`, 'Đúng']} />
              <Line
                type="monotone"
                dataKey="acc"
                stroke={C.ok}
                strokeWidth={2.5}
                connectNulls
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">
            Từ vựng HSK 1 ({HSK1_WORDS.length} từ trong website)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pie}
                dataKey="v"
                nameKey="n"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {pie.map((p) => (
                  <Cell key={p.n} fill={p.c} />
                ))}
              </Pie>
              <Tooltip {...tip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {pie.map((p) => (
              <span key={p.n}>
                <span
                  className="inline-block w-3 h-3 rounded mr-1"
                  style={{ background: p.c, verticalAlign: '-2px' }}
                />
                {p.n}: {p.v}
              </span>
            ))}
          </div>
          <div className="text-xs mu text-center mt-1">
            Đến hạn ôn: {ws.due} · Thường sai: {ws.hard}
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Kỹ năng</div>
          <div className="space-y-2">
            {skillAcc(st).map((x) => (
              <div key={x.k}>
                <div className="flex justify-between text-sm">
                  <span>{x.name}</span>
                  <span
                    className={x.n && x.v < 60 ? 'red font-semibold' : 'mu'}
                  >
                    {x.n ? `${x.v}% · ${x.n} câu` : 'chưa có dữ liệu'}
                  </span>
                </div>
                <Bar
                  v={x.v}
                  h={6}
                  color={x.n && x.v < 60 ? 'var(--red)' : undefined}
                />
              </div>
            ))}
          </div>
          <div className="text-xs mu mt-2">
            Kỹ năng Nói dựa trên tự đánh giá sau khi ghi âm (website không chấm
            phát âm tự động).
          </div>
        </div>
      </div>
      {scores.length > 1 && (
        <div className="card p-4">
          <div className="font-semibold mb-2">
            Điểm các bài kiểm tra gần đây (%)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={scores}>
              <CartesianGrid stroke={C.grid} />
              <XAxis dataKey="i" tick={{ fill: C.tx, fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: C.tx, fontSize: 11 }} />
              <Tooltip {...tip} />
              <Line
                type="monotone"
                dataKey="v"
                stroke={C.red}
                strokeWidth={2.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Câu thường trả lời sai</div>
          {mist.length ? (
            mist.map((m, i) => (
              <div
                key={i}
                className="text-sm flex justify-between gap-2 py-1"
                style={{ borderBottom: '1px dashed var(--bd)' }}
              >
                <span className="truncate">
                  {m.q.title}
                  {m.q.prompt ? `: ${m.q.prompt}` : ''}
                </span>
                <span className="chip chip-r">{m.n}×</span>
              </div>
            ))
          ) : (
            <div className="text-sm mu">Chưa có.</div>
          )}
        </div>
        <div className="card p-4 overflow-x-auto">
          <div className="font-semibold mb-2">Lịch sử làm bài gần đây</div>
          {st.hist.length ? (
            <table className="w-full text-xs">
              <tbody>
                {st.hist.slice(0, 20).map((h, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--bd)' }}>
                    <td className="p-1 mu">
                      {new Date(h.t).toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      })}
                    </td>
                    <td className="p-1">{KL[h.k] || h.k}</td>
                    <td className="p-1">{h.title}</td>
                    <td className="p-1 font-semibold">
                      {h.n ? `${h.sc}/${h.n}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-sm mu">Chưa có.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 44. Cài đặt ---------- */
function SettingsPage() {
  const { st, upd, setSettings, toast, go } = useApp(),
    s = st.settings,
    p = st.profile;
  const [exp, setExp] = useState(''),
    [imp, setImp] = useState(''),
    [confirm, setConfirm] = useState(false),
    [voices, setVoices] = useState(() => zhVoices());
  useEffect(() => {
    const t = setTimeout(() => setVoices(zhVoices()), 700);
    return () => clearTimeout(t);
  }, []);
  const setP = (x) => upd((y) => ({ ...y, profile: { ...y.profile, ...x } }));
  const doExport = () => {
    const txt = exportState(st);
    setExp(txt);
    toast(
      downloadText(`hsk-viet-sao-luu-${dkey()}.json`, txt)
        ? 'Đã tạo tệp sao lưu. Nếu trình duyệt chặn tải xuống, hãy sao chép nội dung bên dưới.'
        : 'Không tải được tệp — hãy sao chép nội dung bên dưới.'
    );
  };
  const copy = () => {
    try {
      navigator.clipboard.writeText(exp).then(
        () => toast('Đã sao chép.'),
        () => toast('Không sao chép được — hãy chọn và sao chép thủ công.')
      );
    } catch (e) {
      toast('Không sao chép được — hãy chọn và sao chép thủ công.');
    }
  };
  const doImport = (text) => {
    try {
      const ns = importState(text);
      upd(() => ns);
      setImp('');
      toast('Đã nhập dữ liệu học tập.');
    } catch (e) {
      toast(
        e instanceof SyntaxError
          ? 'Không nhập được: nội dung không phải JSON hợp lệ.'
          : `Không nhập được: ${e.message}`
      );
    }
  };
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => doImport(String(r.result));
    r.readAsText(f);
    e.target.value = '';
  };
  const sw = (on, f, label) => (
    <button className={`btn btn-sm ${on ? 'btn-p' : 'btn-o'}`} onClick={f}>
      {on ? <Check size={14} /> : <X size={14} />} {label}
    </button>
  );
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Title icon={Settings}>Cài đặt mục tiêu và thời gian học</Title>
      <div className="card p-4 space-y-3">
        <div className="font-semibold">Hồ sơ học tập</div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <label>
            Tên hiển thị
            <input
              className="inp mt-1"
              value={p.name || ''}
              onChange={(e) => setP({ name: e.target.value })}
            />
          </label>
          <label>
            Trình độ
            <div className="mt-1">
              <Sel
                v={p.level}
                on={(v) => setP({ level: v })}
                opts={[
                  ['0', 'Mới bắt đầu'],
                  ['basic', 'Đã học cơ bản'],
                  ['1', 'HSK 1'],
                  ['2', 'HSK 2'],
                  ['3', 'HSK 3'],
                  ['4', 'HSK 4'],
                  ['5', 'HSK 5'],
                  ['6', 'HSK 6'],
                  ['7–9', 'HSK 7–9'],
                ]}
              />
            </div>
          </label>
          <label>
            Mục tiêu
            <div className="mt-1">
              <Sel v={p.goal} on={(v) => setP({ goal: v })} opts={GOALS} />
            </div>
          </label>
          <div>
            Thời gian học mỗi ngày
            <div className="flex gap-2 mt-1">
              {DUR_LIST.map((d) => (
                <button
                  key={d}
                  className={`btn btn-sm ${
                    p.minutes === d ? 'btn-p' : 'btn-o'
                  }`}
                  onClick={() => {
                    setP({ minutes: d });
                    setSettings({ dur: d });
                  }}
                >
                  {d} phút
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs mu">
          Lịch học hôm nay, hạn mức từ mới ({NEW_PER_DAY[p.minutes] || 10}{' '}
          từ/ngày) và ngày hoàn thành dự kiến tự điều chỉnh theo thời gian học.
        </div>
      </div>
      <div className="card p-4 space-y-2">
        <div className="font-semibold">Học tập và hiển thị</div>
        <div className="flex flex-wrap gap-2">
          {sw(
            !!s.flex,
            () => setSettings({ flex: !s.flex }),
            'Học linh hoạt (mở mọi bài, vẫn hiện trạng thái chưa đạt)'
          )}
          {sw(!!s.dark, () => setSettings({ dark: !s.dark }), 'Chế độ tối')}
          {sw(!!s.py, () => setSettings({ py: !s.py }), 'Hiện Pinyin')}
          {sw(
            !!s.vi,
            () => setSettings({ vi: !s.vi }),
            'Hiện nghĩa tiếng Việt'
          )}
        </div>
        <button
          className="btn btn-o btn-sm"
          onClick={() => {
            setP({ onboarded: false });
            go('home');
          }}
        >
          Chạy lại màn hình chọn trình độ – mục tiêu
        </button>
      </div>
      <div className="card p-4 space-y-2">
        <div className="font-semibold">Phát âm</div>
        <ViewToggles />
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span>Giọng đọc:</span>
          <Sel
            v={s.voice || ''}
            on={(v) => {
              setSettings({ voice: v });
              SPEECH.voice = v;
            }}
            opts={[
              ['', 'Tự chọn giọng tiếng Trung phổ thông'],
              ...voices.map((v) => [v.voiceURI, `${v.name} (${v.lang})`]),
            ]}
          />
          <button
            className="btn btn-g btn-sm"
            disabled={!ttsOK()}
            onClick={() => speak('你好，我叫安娜。')}
          >
            <Volume2 size={14} /> Nghe thử
          </button>
        </div>
        {!ttsOK() ? (
          <Note tone="r">Trình duyệt không hỗ trợ Web Speech API.</Note>
        ) : (
          !voices.length && (
            <Note tone="w">
              Chưa tìm thấy giọng tiếng Trung trên thiết bị — hãy cài giọng
              “Chinese (Mandarin)” trong hệ điều hành.
            </Note>
          )
        )}
        <div className="text-xs mu">
          Ghi âm: {canRecord() ? 'được hỗ trợ' : 'không hỗ trợ'} · Nhận dạng
          giọng nói:{' '}
          {getSR() ? 'được hỗ trợ (chỉ so khớp chữ)' : 'không hỗ trợ'}
        </div>
      </div>
      <div className="card p-4 space-y-2">
        <div className="font-semibold flex items-center gap-2">
          <Bot size={16} /> Kết nối AI (tùy chọn)
        </div>
        <div className="text-sm">
          {hasClaude()
            ? '✓ Đang chạy trong môi trường có window.claude.complete — tính năng AI đã sẵn sàng.'
            : 'Môi trường hiện tại không có sẵn AI.'}
        </div>
        <label className="text-sm block">
          Địa chỉ máy chủ proxy HTTPS của bạn:
          <input
            className="inp mt-1"
            placeholder="https://ten-mien-cua-ban/api/hsk-ai"
            value={s.ai || ''}
            onChange={(e) => setSettings({ ai: e.target.value.trim() })}
          />
        </label>
        <div className="text-xs mu">
          Máy chủ nhận POST JSON có trường “prompt” và trả JSON có trường
          “text”. API key phải nằm ở máy chủ — không dán API key vào website.
          Trạng thái: <b>{aiReady(st) ? 'đã sẵn sàng' : 'chưa kết nối'}</b>.
        </div>
      </div>
      <div className="card p-4 space-y-2">
        <div className="font-semibold">Sao lưu dữ liệu học tập</div>
        <div className="text-sm">
          {storageOK()
            ? '✓ Tiến độ được lưu tự động trong trình duyệt (localStorage) trên thiết bị này.'
            : '⚠ Môi trường không cho lưu localStorage — tiến độ chỉ giữ trong phiên này. Hãy xuất dữ liệu thường xuyên.'}{' '}
          Không có đồng bộ đám mây.
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-p btn-sm" onClick={doExport}>
            <Download size={14} /> Xuất dữ liệu (JSON)
          </button>
          <label className="btn btn-o btn-sm" style={{ cursor: 'pointer' }}>
            <Upload size={14} /> Nhập từ tệp
            <input
              type="file"
              accept=".json,application/json"
              onChange={onFile}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {exp && (
          <div>
            <textarea
              className="inp text-xs"
              rows={4}
              readOnly
              value={exp}
              onFocus={(e) => e.target.select()}
            />
            <button className="btn btn-g btn-sm mt-1" onClick={copy}>
              <Copy size={14} /> Sao chép
            </button>
          </div>
        )}
        <textarea
          className="inp text-xs"
          rows={3}
          placeholder="Hoặc dán nội dung JSON sao lưu vào đây…"
          value={imp}
          onChange={(e) => setImp(e.target.value)}
        />
        <button
          className="btn btn-o btn-sm"
          disabled={!imp.trim()}
          onClick={() => doImport(imp)}
        >
          <Upload size={14} /> Nhập nội dung đã dán
        </button>
      </div>
      <div className="card p-4 space-y-2" style={{ borderColor: 'var(--red)' }}>
        <div className="font-semibold red">Xóa toàn bộ tiến độ</div>
        <div className="text-sm">
          Không thể hoàn tác — hãy xuất dữ liệu trước.
        </div>
        <button
          className="btn btn-r btn-sm"
          onClick={() => {
            if (!confirm) {
              setConfirm(true);
              return;
            }
            upd(() => DEF_STATE());
            setConfirm(false);
            toast('Đã xóa toàn bộ tiến độ.');
          }}
        >
          <Trash2 size={14} />{' '}
          {confirm ? 'Bấm lần nữa để xác nhận xóa' : 'Xóa tiến độ'}
        </button>
      </div>
    </div>
  );
}

/* ---------- 45. Màn hình khởi đầu: trình độ · mục tiêu · thời gian ---------- */
function Onboarding() {
  const { upd, go } = useApp();
  const [step, setStep] = useState(0),
    [choice, setChoice] = useState('0'),
    [lv, setLv] = useState('1'),
    [goal, setGoal] = useState('all'),
    [min, setMin] = useState(30),
    [name, setName] = useState('');
  const LV = [
    ['0', 'Chưa biết tiếng Trung', 'Bắt đầu từ Pinyin và thanh điệu'],
    ['basic', 'Đã học cơ bản', 'Bật học linh hoạt để ôn nhanh'],
    ['lv', 'Chọn cấp HSK cụ thể', 'Tự chọn cấp đang học'],
    ['test', 'Làm bài kiểm tra đầu vào', '16 câu để ước lượng trình độ'],
  ];
  const perDay = (min / 30) * (5 / 7),
    weeks = Math.ceil(LESSONS.length / perDay / 7);
  const finish = () => {
    const level = choice === 'lv' ? lv : choice === 'test' ? '0' : choice;
    upd((s) => ({
      ...s,
      profile: {
        ...s.profile,
        onboarded: true,
        level,
        goal,
        minutes: min,
        name: name.trim(),
        start: Date.now(),
      },
      settings: { ...s.settings, dur: min, flex: level !== '0' },
    }));
    if (choice === 'test') go('exam', { kind: 'place' });
    else go('home');
  };
  return (
    <div className="mb-welcome max-w-2xl mx-auto p-4 md:p-8">
      <WelcomeGarden />
      <div className="text-center mb-6">
        <div className="flex items-end justify-center gap-3">
          <Tulip
            palette="pink"
            height={78}
            style={{
              transform: 'rotate(-12deg)',
              transformOrigin: 'bottom center',
            }}
          />
          <div className="mb-logo">汉</div>
          <Ranunculus palette="peach" size={60} leaves={false} />
        </div>
        <h1 className="mb-title mt-4">Chào mừng Nguyệt Hà</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--mu)' }}>
          Học tiếng Trung giữa khu vườn mùa xuân · Lộ trình HSK 3.0 · Giải thích
          bằng tiếng Việt
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className={`mb-dot ${k <= step ? 'on' : ''}`} />
          ))}
        </div>
      </div>
      <div className="card p-5 fade" key={step}>
        {step === 0 && (
          <div className="space-y-2">
            <div className="font-semibold mb-1">
              1. Trình độ hiện tại của bạn
            </div>
            {LV.map(([k, t, d]) => {
              const I = {
                0: Sparkles,
                basic: BookOpen,
                lv: Map,
                test: ClipboardList,
              }[k];
              return (
                <button
                  key={k}
                  className={`opt mb-choice ${choice === k ? 'sel' : ''}`}
                  onClick={() => setChoice(k)}
                >
                  <span className="mb-choice-ic">
                    <I size={18} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-sm">{t}</span>
                    <span className="block text-xs mu">{d}</span>
                  </span>
                  {choice === k && <Check size={18} className="okc" />}
                </button>
              );
            })}
            {choice === 'lv' && (
              <div className="flex items-center gap-2 text-sm">
                <span>Cấp:</span>
                <Sel
                  v={lv}
                  on={setLv}
                  opts={[
                    ['1', 'HSK 1'],
                    ['2', 'HSK 2'],
                    ['3', 'HSK 3'],
                    ['4', 'HSK 4'],
                    ['5', 'HSK 5'],
                    ['6', 'HSK 6'],
                    ['7–9', 'HSK 7–9'],
                  ]}
                />
                {lv !== '1' && (
                  <span className="text-xs mu">
                    Hiện chỉ HSK 1 có nội dung chi tiết; bạn sẽ ở chế độ học
                    linh hoạt và xem được khung HSK 2–9.
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-2">
            <div className="font-semibold mb-1">2. Mục tiêu học</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {GOALS.map(([k, t]) => (
                <button
                  key={k}
                  className={`opt ${goal === k ? 'sel' : ''}`}
                  onClick={() => setGoal(k)}
                >
                  <span className="text-sm font-semibold">{t}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <div className="font-semibold">3. Thời gian học mỗi ngày</div>
            <div className="grid grid-cols-4 gap-2">
              {DUR_LIST.map((d) => (
                <button
                  key={d}
                  className={`opt ${min === d ? 'sel' : ''}`}
                  style={{ textAlign: 'center' }}
                  onClick={() => setMin(d)}
                >
                  <div className="text-xl font-bold">{d}</div>
                  <div className="text-xs mu">phút/ngày</div>
                </button>
              ))}
            </div>
            <label className="text-sm block">
              Tên của bạn (không bắt buộc)
              <input
                className="inp mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-base">Lịch học đề xuất</div>
            <div>
              • Trình độ:{' '}
              <b>
                {choice === 'lv'
                  ? `HSK ${lv}`
                  : LV.find((x) => x[0] === choice)[1]}
              </b>{' '}
              · Mục tiêu: <b>{GOALS.find((g) => g[0] === goal)[1]}</b>
            </div>
            <div>
              • Mỗi ngày {min} phút: {DUR_PLAN[min]}
            </div>
            <div>
              • Từ mới tối đa {NEW_PER_DAY[min]} từ/ngày; luôn ôn từ đến hạn
              trước khi học từ mới.
            </div>
            <div>
              • Dự kiến hoàn thành HSK 1 ({LESSONS.length} buổi) sau khoảng{' '}
              <b>{weeks} tuần</b> — sẽ tự cập nhật theo tốc độ học thực tế.
            </div>
            <Note>
              Ngưỡng chuyển bài là tiêu chuẩn nội bộ: ≥ 80% bài kiểm tra cuối
              bài, ≥ 75% cuối tuần, ≥ 80% cuối cấp và không kỹ năng nào dưới 60%
              — không phải điểm đỗ HSK chính thức.
            </Note>
          </div>
        )}
        <div className="flex justify-between mt-5">
          <button
            className="btn btn-o"
            disabled={!step}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft size={16} /> Quay lại
          </button>
          {step < 3 ? (
            <button className="btn btn-p" onClick={() => setStep(step + 1)}>
              Tiếp <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn btn-r" onClick={finish}>
              {choice === 'test' ? 'Làm bài kiểm tra đầu vào' : 'Bắt đầu học'}{' '}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 46. Khung ứng dụng ---------- */
const NAV = [
  ['home', 'Trang chủ', Home],
  ['road', 'Lộ trình HSK 1–9', Map],
  ['today', 'Bài học hôm nay', CalendarCheck],
  ['vocab', 'Học từ vựng', BookOpen],
  ['grammar', 'Học ngữ pháp', Book],
  ['pinyin', 'Phát âm & Pinyin', Volume2],
  ['listen', 'Luyện nghe', Headphones],
  ['speak', 'Luyện nói & hội thoại', Mic],
  ['read', 'Luyện đọc', FileText],
  ['write', 'Luyện viết chữ Hán', PenTool],
  ['flash', 'Flashcard & ôn tập', Layers],
  ['bank', 'Ngân hàng bài tập', ListChecks],
  ['exam', 'Thi thử HSK', ClipboardList],
  ['comm', 'Giao tiếp thực tế', MessageCircle],
  ['stats', 'Thống kê tiến độ', BarChart2],
  ['settings', 'Cài đặt', Settings],
];
const PAGES = {
  home: HomePage,
  road: RoadPage,
  today: TodayPage,
  lesson: LessonPage,
  vocab: VocabPage,
  grammar: GrammarPage,
  pinyin: PinyinPage,
  listen: ListenPage,
  speak: SpeakPage,
  read: ReadPage,
  write: WritePage,
  flash: FlashPage,
  bank: BankPage,
  exam: ExamPage,
  comm: CommPage,
  stats: StatsPage,
  settings: SettingsPage,
};

export default function App() {
  const [st, setSt] = useState(loadState);
  const [route, setRoute] = useState(null),
    [menu, setMenu] = useState(false),
    [party, setParty] = useState(0),
    [msg, setMsg] = useState(''),
    [canStore] = useState(storageOK);
  const stRef = useRef(st),
    tRef = useRef(null),
    lastAct = useRef(Date.now());
  stRef.current = st;
  SPEECH.rate = st.settings.rate || 1;
  SPEECH.voice = st.settings.voice || '';
  const upd = useCallback((fn) => setSt((s) => fn(s)), []);
  const setSettings = useCallback(
    (p) => setSt((s) => ({ ...s, settings: { ...s.settings, ...p } })),
    []
  );
  const toast = useCallback((m) => {
    setMsg(m);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setMsg(''), 4000);
  }, []);
  const celebrate = useCallback(() => setParty((x) => x + 1), []);
  const go = useCallback((page, params = {}) => {
    stopSpeak();
    setMenu(false);
    setRoute({ page, params });
    setSt((s) => ({
      ...s,
      settings: {
        ...s.settings,
        lastPage: page,
        lastParams: page === 'lesson' ? { id: params.id } : {},
      },
    }));
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      /* bỏ qua */
    }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveState(st), 300);
    return () => clearTimeout(t);
  }, [st]); // tự lưu
  useEffect(() => {
    const save = () => saveState(stRef.current),
      mark = () => {
        lastAct.current = Date.now();
      };
    const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel'],
      vis = () => {
        if (document.visibilityState === 'hidden') save();
      };
    evs.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', vis);
    const iv = setInterval(() => {
      // đếm phút học: chỉ khi trang đang hiển thị và có thao tác trong 2 phút gần nhất
      if (
        document.visibilityState === 'visible' &&
        Date.now() - lastAct.current < 120000 &&
        stRef.current.profile.onboarded
      )
        setSt((s) => addMinute(s));
    }, 60000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, mark));
      window.removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', vis);
      clearInterval(iv);
    };
  }, []);
  useEffect(() => {
    if (!party) return undefined;
    const t = setTimeout(() => setParty(0), 2000);
    return () => clearTimeout(t);
  }, [party]);
  useEffect(() => {
    if (st.profile.onboarded) {
      const d = wordStats(st).due;
      if (d) toast(`Nhắc ôn: bạn có ${d} từ đến hạn ôn tập hôm nay.`);
    }
  }, []); // nhắc ôn khi mở ứng dụng
  const ctx = useMemo(
    () => ({ st, upd, setSettings, go, celebrate, toast }),
    [st, upd, setSettings, go, celebrate, toast]
  );
  const r = route || {
    page: PAGES[st.settings.lastPage] ? st.settings.lastPage : 'home',
    params: st.settings.lastParams || {},
  };
  const Page = PAGES[r.page] || HomePage,
    day = st.days[dkey()] || {},
    active = r.page === 'lesson' ? 'road' : r.page,
    dark = !!st.settings.dark;
  return (
    <AppCtx.Provider value={ctx}>
      <div className={`hz ${dark ? 'dk' : ''}`}>
        <style>{APP_CSS}</style>
        {st.profile.onboarded && <GardenBackdrop />}
        {!st.profile.onboarded ? (
          <Onboarding />
        ) : (
          <>
            <header
              className="md:hidden flex items-center justify-between p-3 card"
              style={{
                borderRadius: 0,
                position: 'sticky',
                top: 0,
                zIndex: 40,
              }}
            >
              <button
                className="btn btn-o btn-sm"
                onClick={() => setMenu(!menu)}
                aria-label="Menu"
              >
                <Menu size={18} />
              </button>
              <div className="font-bold flex items-center gap-2">
                <span className="han red text-xl">汉</span> HSK Việt
              </div>
              <button
                className="btn btn-o btn-sm"
                onClick={() => setSettings({ dark: !dark })}
                aria-label="Sáng/tối"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </header>
            {menu && (
              <div
                className="md:hidden fixed inset-0"
                style={{ background: 'rgba(0,0,0,.35)', zIndex: 45 }}
                onClick={() => setMenu(false)}
              />
            )}
            <aside
              className={`${
                menu ? 'flex' : 'hidden'
              } md:flex flex-col card fixed top-0 bottom-0 left-0 w-64 p-3 overflow-y-auto`}
              style={{ borderRadius: 0, zIndex: 50 }}
            >
              <div className="flex items-center gap-2 px-2 py-2 mb-2">
                <div className="mb-logo mb-logo-sm">汉</div>
                <div>
                  <div className="font-bold leading-tight">HSK Việt</div>
                  <div className="text-xs mu">Tự học tiếng Trung HSK 1–9</div>
                </div>
              </div>
              <nav className="space-y-1 flex-1">
                {NAV.map(([k, label, I]) => (
                  <button
                    key={k}
                    className={`nav-a ${active === k ? 'on' : ''}`}
                    onClick={() => go(k)}
                  >
                    <I size={17} /> {label}
                  </button>
                ))}
              </nav>
              <div className="card p-3 mt-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="mu">Hôm nay</span>
                  <b>
                    {day.m || 0}/{st.profile.minutes} phút
                  </b>
                </div>
                <Bar v={pct(day.m || 0, st.profile.minutes)} h={5} />
                <div className="flex justify-between">
                  <span className="mu">Chuỗi ngày học</span>
                  <b className="red">{streakOf(st)} ngày</b>
                </div>
              </div>
              <button
                className="btn btn-o btn-sm mt-2"
                onClick={() => setSettings({ dark: !dark })}
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}{' '}
                {dark ? 'Chế độ sáng' : 'Chế độ tối'}
              </button>
              <div className="mb-side-flowers" aria-hidden="true">
                <Tulip palette="pink" height={68} />
                <Ranunculus palette="cream" size={46} leaves={false} />
                <Tulip palette="peach" height={56} />
              </div>
              {!canStore && (
                <div className="text-xs red mt-2">
                  Môi trường không cho lưu localStorage — hãy sao lưu ở Cài đặt
                  → Xuất dữ liệu.
                </div>
              )}
            </aside>
            <main className="md:pl-64">
              <div className="max-w-6xl mx-auto p-4 md:p-6">
                <Page
                  key={`${r.page}:${JSON.stringify(r.params || {})}`}
                  params={r.params || {}}
                />
              </div>
            </main>
          </>
        )}
        {msg && (
          <div
            className="fixed card mb-toast p-3 text-sm"
            style={{
              left: '50%',
              bottom: 16,
              transform: 'translateX(-50%)',
              zIndex: 90,
              maxWidth: '92vw',
            }}
          >
            <MiniBloom kind="tulip" palette="pink" size={20} />
            {msg}
          </div>
        )}
        {party > 0 && <PetalFall key={party} />}
      </div>
    </AppCtx.Provider>
  );
}

/* ========================= HẾT FILE ========================= */
