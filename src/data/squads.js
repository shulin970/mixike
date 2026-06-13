// ============================================================================
// 详细大名单 — 每队 5-6 名关键球员 + 位置 + 中文译名。
// 位置代码：GK 门将 / CB 中卫 / FB 边后卫 / DM 后腰 / CM 中场 / AM 前腰 / WG 边锋 / ST 中锋
// ============================================================================

export const SQUADS = {
  ESP: [
    { n: 'Unai Simón', zh: '乌奈·西蒙', p: 'GK' }, { n: 'Aymeric Laporte', zh: '拉波尔特', p: 'CB' },
    { n: 'Rodri', zh: '罗德里', p: 'DM' }, { n: 'Pedri', zh: '佩德里', p: 'CM' },
    { n: 'Nico Williams', zh: '尼科·威廉斯', p: 'WG' }, { n: 'Lamine Yamal', zh: '亚马尔', p: 'WG' },
  ],
  ARG: [
    { n: 'Emiliano Martínez', zh: '马丁内斯', p: 'GK' }, { n: 'Cristian Romero', zh: '罗梅罗', p: 'CB' },
    { n: 'Enzo Fernández', zh: '恩佐·费尔南德斯', p: 'CM' }, { n: 'Lionel Messi', zh: '梅西', p: 'AM' },
    { n: 'Lautaro Martínez', zh: '劳塔罗', p: 'ST' }, { n: 'Julián Álvarez', zh: '阿尔瓦雷斯', p: 'ST' },
  ],
  FRA: [
    { n: 'Mike Maignan', zh: '迈尼昂', p: 'GK' }, { n: 'William Saliba', zh: '萨利巴', p: 'CB' },
    { n: 'Aurélien Tchouaméni', zh: '琼阿梅尼', p: 'DM' }, { n: 'Antoine Griezmann', zh: '格列兹曼', p: 'AM' },
    { n: 'Ousmane Dembélé', zh: '登贝莱', p: 'WG' }, { n: 'Kylian Mbappé', zh: '姆巴佩', p: 'ST' },
  ],
  ENG: [
    { n: 'Jordan Pickford', zh: '皮克福德', p: 'GK' }, { n: 'John Stones', zh: '斯通斯', p: 'CB' },
    { n: 'Declan Rice', zh: '赖斯', p: 'DM' }, { n: 'Jude Bellingham', zh: '贝林厄姆', p: 'AM' },
    { n: 'Bukayo Saka', zh: '萨卡', p: 'WG' }, { n: 'Harry Kane', zh: '凯恩', p: 'ST' },
  ],
  BRA: [
    { n: 'Alisson', zh: '阿利松', p: 'GK' }, { n: 'Marquinhos', zh: '马基尼奥斯', p: 'CB' },
    { n: 'Bruno Guimarães', zh: '布鲁诺·吉马良斯', p: 'CM' }, { n: 'Rodrygo', zh: '罗德里戈', p: 'WG' },
    { n: 'Raphinha', zh: '拉菲尼亚', p: 'WG' }, { n: 'Vinícius Júnior', zh: '维尼修斯', p: 'WG' },
  ],
  POR: [
    { n: 'Diogo Costa', zh: '迪奥戈·科斯塔', p: 'GK' }, { n: 'Rúben Dias', zh: '鲁本·迪亚斯', p: 'CB' },
    { n: 'Bruno Fernandes', zh: '布鲁诺·费尔南德斯', p: 'AM' }, { n: 'Bernardo Silva', zh: '贝尔纳多·席尔瓦', p: 'AM' },
    { n: 'Rafael Leão', zh: '拉斐尔·莱昂', p: 'WG' }, { n: 'Gonçalo Ramos', zh: '贡萨洛·拉莫斯', p: 'ST' },
  ],
  COL: [
    { n: 'Camilo Vargas', zh: '卡米洛·巴尔加斯', p: 'GK' }, { n: 'Dávinson Sánchez', zh: '达温森·桑切斯', p: 'CB' },
    { n: 'James Rodríguez', zh: 'J罗', p: 'AM' }, { n: 'Richard Ríos', zh: '里查德·里奥斯', p: 'CM' },
    { n: 'Luis Díaz', zh: '路易斯·迪亚斯', p: 'WG' }, { n: 'Jhon Durán', zh: '约翰·杜兰', p: 'ST' },
  ],
  NED: [
    { n: 'Bart Verbruggen', zh: '弗尔布鲁根', p: 'GK' }, { n: 'Virgil van Dijk', zh: '范迪克', p: 'CB' },
    { n: 'Frenkie de Jong', zh: '弗伦基·德容', p: 'CM' }, { n: 'Xavi Simons', zh: '哈维·西蒙斯', p: 'AM' },
    { n: 'Memphis Depay', zh: '德佩', p: 'ST' }, { n: 'Cody Gakpo', zh: '加克波', p: 'WG' },
  ],
  GER: [
    { n: 'Marc-André ter Stegen', zh: '特尔施特根', p: 'GK' }, { n: 'Antonio Rüdiger', zh: '吕迪格', p: 'CB' },
    { n: 'Joshua Kimmich', zh: '基米希', p: 'FB' }, { n: 'Florian Wirtz', zh: '维尔茨', p: 'AM' },
    { n: 'Jamal Musiala', zh: '穆西亚拉', p: 'AM' }, { n: 'Kai Havertz', zh: '哈弗茨', p: 'ST' },
  ],
  BEL: [
    { n: 'Koen Casteels', zh: '卡斯泰尔斯', p: 'GK' }, { n: 'Wout Faes', zh: '费斯', p: 'CB' },
    { n: 'Kevin De Bruyne', zh: '德布劳内', p: 'AM' }, { n: 'Jérémy Doku', zh: '多库', p: 'WG' },
    { n: 'Leandro Trossard', zh: '特罗萨德', p: 'WG' }, { n: 'Romelu Lukaku', zh: '卢卡库', p: 'ST' },
  ],
  MEX: [
    { n: 'Guillermo Ochoa', zh: '奥乔亚', p: 'GK' }, { n: 'César Montes', zh: '塞萨尔·蒙特斯', p: 'CB' },
    { n: 'Edson Álvarez', zh: '埃德松·阿尔瓦雷斯', p: 'DM' }, { n: 'Hirving Lozano', zh: '洛萨诺', p: 'WG' },
    { n: 'Julián Quiñones', zh: '基尼奥内斯', p: 'WG' }, { n: 'Santiago Giménez', zh: '圣地亚哥·希门尼斯', p: 'ST' },
  ],
  CAN: [
    { n: 'Maxime Crépeau', zh: '克雷波', p: 'GK' }, { n: 'Alphonso Davies', zh: '阿方索·戴维斯', p: 'FB' },
    { n: 'Stephen Eustáquio', zh: '尤斯塔基奥', p: 'CM' }, { n: 'Jonathan David', zh: '乔纳森·戴维', p: 'ST' },
    { n: 'Cyle Larin', zh: '拉林', p: 'ST' }, { n: 'Tajon Buchanan', zh: '布坎南', p: 'WG' },
  ],
  USA: [
    { n: 'Matt Turner', zh: '特纳', p: 'GK' }, { n: 'Chris Richards', zh: '克里斯·理查兹', p: 'CB' },
    { n: 'Tyler Adams', zh: '泰勒·亚当斯', p: 'DM' }, { n: 'Gio Reyna', zh: '雷纳', p: 'AM' },
    { n: 'Timothy Weah', zh: '维阿', p: 'WG' }, { n: 'Christian Pulisic', zh: '普利西奇', p: 'WG' },
  ],
  CRO: [
    { n: 'Dominik Livaković', zh: '利瓦科维奇', p: 'GK' }, { n: 'Joško Gvardiol', zh: '格瓦迪奥尔', p: 'CB' },
    { n: 'Luka Modrić', zh: '莫德里奇', p: 'CM' }, { n: 'Mateo Kovačić', zh: '科瓦契奇', p: 'CM' },
    { n: 'Ivan Perišić', zh: '佩里西奇', p: 'WG' }, { n: 'Andrej Kramarić', zh: '克拉马里奇', p: 'ST' },
  ],
  MAR: [
    { n: 'Yassine Bounou', zh: '布努', p: 'GK' }, { n: 'Nayef Aguerd', zh: '阿格尔德', p: 'CB' },
    { n: 'Azzedine Ounahi', zh: '乌纳希', p: 'CM' }, { n: 'Hakim Ziyech', zh: '齐耶赫', p: 'WG' },
    { n: 'Achraf Hakimi', zh: '阿什拉夫', p: 'FB' }, { n: 'Youssef En-Nesyri', zh: '恩内斯里', p: 'ST' },
  ],
  URU: [
    { n: 'Sergio Rochet', zh: '罗切特', p: 'GK' }, { n: 'José María Giménez', zh: '希门尼斯', p: 'CB' },
    { n: 'Federico Valverde', zh: '巴尔韦德', p: 'CM' }, { n: 'Nicolás de la Cruz', zh: '德拉科鲁斯', p: 'AM' },
    { n: 'Facundo Pellistri', zh: '佩利斯特里', p: 'WG' }, { n: 'Darwin Núñez', zh: '努涅斯', p: 'ST' },
  ],
  SUI: [
    { n: 'Yann Sommer', zh: '索默', p: 'GK' }, { n: 'Manuel Akanji', zh: '阿坎吉', p: 'CB' },
    { n: 'Granit Xhaka', zh: '扎卡', p: 'DM' }, { n: 'Xherdan Shaqiri', zh: '沙奇里', p: 'AM' },
    { n: 'Ruben Vargas', zh: '鲁本·巴尔加斯', p: 'WG' }, { n: 'Breel Embolo', zh: '恩博洛', p: 'ST' },
  ],
  JPN: [
    { n: 'Zion Suzuki', zh: '铃木彩艳', p: 'GK' }, { n: 'Ko Itakura', zh: '板仓滉', p: 'CB' },
    { n: 'Wataru Endō', zh: '远藤航', p: 'DM' }, { n: 'Takefusa Kubo', zh: '久保建英', p: 'WG' },
    { n: 'Kaoru Mitoma', zh: '三笘薰', p: 'WG' }, { n: 'Ayase Ueda', zh: '上田绮世', p: 'ST' },
  ],
  SEN: [
    { n: 'Édouard Mendy', zh: '门迪', p: 'GK' }, { n: 'Kalidou Koulibaly', zh: '库利巴利', p: 'CB' },
    { n: 'Idrissa Gueye', zh: '盖耶', p: 'DM' }, { n: 'Pape Sarr', zh: '帕普·萨尔', p: 'CM' },
    { n: 'Sadio Mané', zh: '马内', p: 'WG' }, { n: 'Nicolas Jackson', zh: '尼古拉斯·杰克逊', p: 'ST' },
  ],
  IRN: [
    { n: 'Alireza Beiranvand', zh: '贝兰万德', p: 'GK' }, { n: 'Sadegh Moharrami', zh: '穆哈拉米', p: 'FB' },
    { n: 'Saeid Ezatolahi', zh: '埃扎托拉希', p: 'DM' }, { n: 'Alireza Jahanbakhsh', zh: '贾汉巴赫什', p: 'WG' },
    { n: 'Mehdi Taremi', zh: '塔雷米', p: 'ST' }, { n: 'Sardar Azmoun', zh: '阿兹蒙', p: 'ST' },
  ],
  KOR: [
    { n: 'Kim Seung-gyu', zh: '金承奎', p: 'GK' }, { n: 'Kim Min-jae', zh: '金玟哉', p: 'CB' },
    { n: 'Hwang In-beom', zh: '黄仁范', p: 'CM' }, { n: 'Lee Kang-in', zh: '李刚仁', p: 'AM' },
    { n: 'Hwang Hee-chan', zh: '黄喜灿', p: 'WG' }, { n: 'Son Heung-min', zh: '孙兴慜', p: 'ST' },
  ],
  ECU: [
    { n: 'Hernán Galíndez', zh: '加林德斯', p: 'GK' }, { n: 'Piero Hincapié', zh: '因卡皮耶', p: 'CB' },
    { n: 'Moisés Caicedo', zh: '凯塞多', p: 'DM' }, { n: 'Kendry Páez', zh: '派斯', p: 'AM' },
    { n: 'Gonzalo Plata', zh: '普拉塔', p: 'WG' }, { n: 'Enner Valencia', zh: '恩纳·瓦伦西亚', p: 'ST' },
  ],
  AUT: [
    { n: 'Patrick Pentz', zh: '彭茨', p: 'GK' }, { n: 'Maximilian Wöber', zh: '韦贝尔', p: 'CB' },
    { n: 'Marcel Sabitzer', zh: '萨比策', p: 'AM' }, { n: 'Christoph Baumgartner', zh: '鲍姆加特纳', p: 'AM' },
    { n: 'Konrad Laimer', zh: '莱默尔', p: 'CM' }, { n: 'Marko Arnautović', zh: '阿瑙托维奇', p: 'ST' },
  ],
  AUS: [
    { n: 'Mathew Ryan', zh: '马修·瑞安', p: 'GK' }, { n: 'Harry Souttar', zh: '苏塔', p: 'CB' },
    { n: 'Alessandro Cirò', zh: '西罗', p: 'CM' }, { n: 'Riley McGree', zh: '麦格里', p: 'WG' },
    { n: 'Mathew Leckie', zh: '莱基', p: 'WG' }, { n: 'Mitchell Duke', zh: '杜克', p: 'ST' },
  ],
  NOR: [
    { n: 'Ørjan Nyland', zh: '尼兰', p: 'GK' }, { n: 'Leo Østigård', zh: '厄斯蒂高', p: 'CB' },
    { n: 'Sander Berge', zh: '桑德·贝格', p: 'DM' }, { n: 'Martin Ødegaard', zh: '厄德高', p: 'AM' },
    { n: 'Alexander Sørloth', zh: '索尔洛特', p: 'ST' }, { n: 'Erling Haaland', zh: '哈兰德', p: 'ST' },
  ],
  PAN: [
    { n: 'Orlando Mosquera', zh: '莫斯克拉', p: 'GK' }, { n: 'Andrés Andrade', zh: '安德拉德', p: 'CB' },
    { n: 'Aníbal Godoy', zh: '戈多伊', p: 'DM' }, { n: 'José Fajardo', zh: '法哈多', p: 'WG' },
    { n: 'Ismael Díaz', zh: '伊斯梅尔·迪亚斯', p: 'ST' }, { n: 'Eric Davis', zh: '戴维斯', p: 'FB' },
  ],
  EGY: [
    { n: 'Mohamed El Shenawy', zh: '埃尔谢纳维', p: 'GK' }, { n: 'Ahmed Hegazi', zh: '赫加齐', p: 'CB' },
    { n: 'Mohamed Elneny', zh: '埃尔内尼', p: 'DM' }, { n: 'Omar Marmoush', zh: '马尔穆什', p: 'WG' },
    { n: 'Trezeguet', zh: '特雷泽盖', p: 'WG' }, { n: 'Mohamed Salah', zh: '萨拉赫', p: 'ST' },
  ],
  ALG: [
    { n: 'Anthony Mandrea', zh: '曼德拉', p: 'GK' }, { n: 'Aïssa Mandi', zh: '曼迪', p: 'CB' },
    { n: 'Nabil Bentaleb', zh: '本塔莱布', p: 'CM' }, { n: 'Riyad Mahrez', zh: '马赫雷斯', p: 'WG' },
    { n: 'Mohamed Amoura', zh: '阿穆拉', p: 'WG' }, { n: 'Baghdad Bounedjah', zh: '布内贾', p: 'ST' },
  ],
  SCO: [
    { n: 'Angus Gunn', zh: '冈恩', p: 'GK' }, { n: 'Grant Hanley', zh: '汉利', p: 'CB' },
    { n: 'Scott McTominay', zh: '麦克托米奈', p: 'CM' }, { n: 'John McGinn', zh: '麦金', p: 'AM' },
    { n: 'Billy Gilmour', zh: '吉尔莫', p: 'CM' }, { n: 'Che Adams', zh: '切·亚当斯', p: 'ST' },
  ],
  PAR: [
    { n: 'Carlos Coronel', zh: '科罗内尔', p: 'GK' }, { n: 'Gustavo Gómez', zh: '古斯塔沃·戈麦斯', p: 'CB' },
    { n: 'Mathías Villasanti', zh: '比利亚桑蒂', p: 'DM' }, { n: 'Miguel Almirón', zh: '阿尔米隆', p: 'WG' },
    { n: 'Diego Gómez', zh: '迭戈·戈麦斯', p: 'AM' }, { n: 'Antonio Sanabria', zh: '萨纳布里亚', p: 'ST' },
  ],
  TUN: [
    { n: 'Aymen Dahmen', zh: '达赫门', p: 'GK' }, { n: 'Montassar Talbi', zh: '塔尔比', p: 'CB' },
    { n: 'Ellyes Skhiri', zh: '斯希里', p: 'DM' }, { n: 'Hannibal Mejbri', zh: '梅布里', p: 'AM' },
    { n: 'Wahbi Khazri', zh: '哈兹里', p: 'WG' }, { n: 'Youssef Msakni', zh: '姆萨克尼', p: 'WG' },
  ],
  CIV: [
    { n: 'Yahia Fofana', zh: '福法纳', p: 'GK' }, { n: 'Willy Boly', zh: '博利', p: 'CB' },
    { n: 'Ibrahim Sangaré', zh: '桑加雷', p: 'DM' }, { n: 'Nicolas Pépé', zh: '佩佩', p: 'WG' },
    { n: 'Simon Adingra', zh: '阿丁格拉', p: 'WG' }, { n: 'Sébastien Haller', zh: '阿莱', p: 'ST' },
  ],
  UZB: [
    { n: 'Utkir Yusupov', zh: '尤苏波夫', p: 'GK' }, { n: 'Rustamjon Ashurmatov', zh: '阿舒尔马托夫', p: 'CB' },
    { n: 'Otabek Shukurov', zh: '舒库罗夫', p: 'DM' }, { n: 'Jaloliddin Masharipov', zh: '马沙里波夫', p: 'WG' },
    { n: 'Oston Urunov', zh: '乌伦诺夫', p: 'AM' }, { n: 'Eldor Shomurodov', zh: '舒穆罗多夫', p: 'ST' },
  ],
  QAT: [
    { n: 'Meshaal Barsham', zh: '巴尔沙姆', p: 'GK' }, { n: 'Boualem Khoukhi', zh: '胡赫伊', p: 'CB' },
    { n: 'Karim Boudiaf', zh: '布迪亚夫', p: 'DM' }, { n: 'Akram Afif', zh: '阿克拉姆·阿菲夫', p: 'WG' },
    { n: 'Hassan Al-Haydos', zh: '海多斯', p: 'AM' }, { n: 'Almoez Ali', zh: '阿尔莫埃斯·阿里', p: 'ST' },
  ],
  KSA: [
    { n: 'Mohammed Al-Owais', zh: '奥韦斯', p: 'GK' }, { n: 'Ali Al-Bulaihi', zh: '布莱希', p: 'CB' },
    { n: 'Salem Al-Dawsari', zh: '达瓦萨里', p: 'WG' }, { n: 'Mohamed Kanno', zh: '坎诺', p: 'CM' },
    { n: 'Firas Al-Buraikan', zh: '布赖坎', p: 'ST' }, { n: 'Saud Abdulhamid', zh: '阿卜杜勒哈米德', p: 'FB' },
  ],
  RSA: [
    { n: 'Ronwen Williams', zh: '罗恩·威廉斯', p: 'GK' }, { n: 'Siyanda Xulu', zh: '祖鲁', p: 'CB' },
    { n: 'Teboho Mokoena', zh: '莫科埃纳', p: 'CM' }, { n: 'Percy Tau', zh: '珀西·陶', p: 'AM' },
    { n: 'Themba Zwane', zh: '兹瓦内', p: 'AM' }, { n: 'Lyle Foster', zh: '福斯特', p: 'ST' },
  ],
  JOR: [
    { n: 'Yazan Abu Arab', zh: '阿布·阿拉布', p: 'GK' }, { n: 'Salem Al-Ajalin', zh: '阿杰林', p: 'CB' },
    { n: 'Noor Al-Rawabdeh', zh: '拉瓦布德', p: 'CM' }, { n: 'Musa Al-Taamari', zh: '塔马里', p: 'WG' },
    { n: 'Yazan Al-Naimat', zh: '阿尔奈马特', p: 'ST' }, { n: 'Nizar Al-Rashdan', zh: '拉什丹', p: 'AM' },
  ],
  CPV: [
    { n: 'Vozinha', zh: '沃济尼亚', p: 'GK' }, { n: 'Roberto Lopes', zh: '罗伯托·洛佩斯', p: 'CB' },
    { n: 'Jamiro Monteiro', zh: '蒙特罗', p: 'CM' }, { n: 'Garry Rodrigues', zh: '加里·罗德里格斯', p: 'WG' },
    { n: 'Ryan Mendes', zh: '瑞安·门德斯', p: 'WG' }, { n: 'Bebé', zh: '贝贝', p: 'WG' },
  ],
  GHA: [
    { n: 'Lawrence Ati-Zigi', zh: '阿蒂-齐吉', p: 'GK' }, { n: 'Alexander Djiku', zh: '杰库', p: 'CB' },
    { n: 'Thomas Partey', zh: '托马斯·帕蒂', p: 'DM' }, { n: 'Mohammed Kudus', zh: '库杜斯', p: 'AM' },
    { n: 'Inaki Williams', zh: '伊纳基·威廉姆斯', p: 'ST' }, { n: 'Antoine Semenyo', zh: '塞梅尼奥', p: 'WG' },
  ],
  CUW: [
    { n: 'Eloy Room', zh: '隆姆', p: 'GK' }, { n: 'Cuco Martina', zh: '库科·马丁纳', p: 'FB' },
    { n: 'Leandro Bacuna', zh: '莱安德罗·巴库纳', p: 'CM' }, { n: 'Juninho Bacuna', zh: '朱尼尼奥·巴库纳', p: 'AM' },
    { n: 'Gervane Kastaneer', zh: '卡斯塔内尔', p: 'ST' }, { n: 'Tyrone Conraads', zh: '康拉兹', p: 'ST' },
  ],
  HAI: [
    { n: 'Johny Placide', zh: '普拉西德', p: 'GK' }, { n: 'Ricardo Adé', zh: '里卡多·阿德', p: 'CB' },
    { n: 'Derrick Etienne', zh: '埃蒂安', p: 'WG' }, { n: 'Danley Jean Jacques', zh: '让-雅克', p: 'CM' },
    { n: 'Frantzdy Pierrot', zh: '皮埃尔', p: 'ST' }, { n: 'Duckens Nazon', zh: '纳宗', p: 'ST' },
  ],
  NZL: [
    { n: 'Oliver Sail', zh: '赛尔', p: 'GK' }, { n: 'Tommy Smith', zh: '汤米·史密斯', p: 'CB' },
    { n: 'Joe Bell', zh: '乔·贝尔', p: 'CM' }, { n: 'Marko Stamenić', zh: '斯塔梅尼奇', p: 'CM' },
    { n: 'Ben Old', zh: '本·奥尔', p: 'WG' }, { n: 'Chris Wood', zh: '克里斯·伍德', p: 'ST' },
  ],
  CZE: [
    { n: 'Jindřich Staněk', zh: '斯塔内克', p: 'GK' }, { n: 'Tomáš Holeš', zh: '霍莱什', p: 'FB' },
    { n: 'Tomáš Souček', zh: '绍切克', p: 'CM' }, { n: 'Antonín Barák', zh: '巴拉克', p: 'AM' },
    { n: 'Pavel Šulc', zh: '舒尔茨', p: 'WG' }, { n: 'Patrik Schick', zh: '希克', p: 'ST' },
  ],
  BIH: [
    { n: 'Nikola Vasilj', zh: '瓦西利', p: 'GK' }, { n: 'Sead Kolašinac', zh: '科拉希纳茨', p: 'CB' },
    { n: 'Miralem Pjanić', zh: '皮亚尼奇', p: 'DM' }, { n: 'Edin Višća', zh: '维什察', p: 'WG' },
    { n: 'Said Hamulić', zh: '哈穆利奇', p: 'ST' }, { n: 'Edin Džeko', zh: '哲科', p: 'ST' },
  ],
  TUR: [
    { n: 'Uğurcan Çakır', zh: '恰克尔', p: 'GK' }, { n: 'Merih Demiral', zh: '德米拉尔', p: 'CB' },
    { n: 'İsmail Yüksek', zh: '于克塞克', p: 'DM' }, { n: 'Hakan Çalhanoğlu', zh: '恰尔汗奥卢', p: 'AM' },
    { n: 'Arda Güler', zh: '阿尔达·居莱尔', p: 'AM' }, { n: 'Kenan Yıldız', zh: '凯南·伊尔迪兹', p: 'WG' },
  ],
  SWE: [
    { n: 'Robin Olsen', zh: '奥尔森', p: 'GK' }, { n: 'Victor Lindelöf', zh: '林德勒夫', p: 'CB' },
    { n: 'Albin Ekdal', zh: '埃克达尔', p: 'CM' }, { n: 'Emil Forsberg', zh: '福斯贝里', p: 'AM' },
    { n: 'Dejan Kulusevski', zh: '库卢塞夫斯基', p: 'WG' }, { n: 'Alexander Isak', zh: '伊萨克', p: 'ST' },
  ],
  IRQ: [
    { n: 'Jalal Hassan', zh: '哈桑', p: 'GK' }, { n: 'Rebin Sulaka', zh: '苏拉卡', p: 'CB' },
    { n: 'Amir Al-Ammari', zh: '阿米里', p: 'CM' }, { n: 'Ali Jasim', zh: '贾西姆', p: 'WG' },
    { n: 'Aymen Hussein', zh: '艾曼·侯赛因', p: 'ST' }, { n: 'Mohannad Ali', zh: '莫汉纳德·阿里', p: 'ST' },
  ],
  COD: [
    { n: 'Lionel Mpasi', zh: '姆帕西', p: 'GK' }, { n: 'Chancel Mbemba', zh: '姆本巴', p: 'CB' },
    { n: 'Charles Pickel', zh: '皮克尔', p: 'DM' }, { n: 'Yoane Wissa', zh: '维萨', p: 'WG' },
    { n: 'Cédric Bakambu', zh: '巴坎布', p: 'ST' }, { n: 'Silas Katompa', zh: '西拉斯', p: 'WG' },
  ],
}

export const POS_ZH = {
  GK: '门将', CB: '中卫', FB: '边后卫', DM: '后腰', CM: '中场', AM: '前腰', WG: '边锋', ST: '中锋',
}
export const POS_COLOR = {
  GK: '#ffd34e', CB: '#4f8cff', FB: '#3b7dd8', DM: '#2ee6d6',
  CM: '#43e08a', AM: '#a78bfa', WG: '#ff8a5c', ST: '#ff6b6b',
}
