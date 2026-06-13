// ============================================================================
// 2026 FIFA World Cup — Teams
// ----------------------------------------------------------------------------
// Groups & pots: verified from the Final Draw (5 Dec 2025) via Wikipedia/FIFA.
// Elo ratings (eloratings.net scale):
//   - Top-20 values are VERIFIED as of 10 Jun 2026 (eloVerified: true).
//   - The remaining values are estimates on the same scale, anchored to the
//     FIFA Men's Ranking (which itself uses an Elo formula) — ordering is
//     faithful, exact points are indicative.
// eloYoY = change vs one year ago (verified where the Elo table published it;
//   e.g. Türkiye +9, Mexico +6 — used by the "dark horse" radar).
// form  = last ~6 matches (INDICATIVE — recent-goal flavour; Elo is the
//   verified anchor used by the model).
// ============================================================================

export const TEAMS = [
  // ---- Pot 1 (seeds) ----
  { id:'ESP', name:'Spain',          flag:'🇪🇸', confed:'UEFA',     pot:1, elo:2157, eloVerified:true, eloYoY:0,  star:'Lamine Yamal',    players:['Lamine Yamal','Nico Williams','Rodri'],         form:{w:5,d:1,l:0,gf:14,ga:3} },
  { id:'ARG', name:'Argentina',      flag:'🇦🇷', confed:'CONMEBOL', pot:1, elo:2115, eloVerified:true, eloYoY:0,  star:'Julián Álvarez',  players:['Julián Álvarez','Lautaro Martínez','Messi'],    form:{w:4,d:1,l:1,gf:11,ga:5} },
  { id:'FRA', name:'France',         flag:'🇫🇷', confed:'UEFA',     pot:1, elo:2063, eloVerified:true, eloYoY:0,  star:'Kylian Mbappé',   players:['Kylian Mbappé','Griezmann','Dembélé'],          form:{w:4,d:2,l:0,gf:10,ga:4} },
  { id:'ENG', name:'England',        flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', confed:'UEFA',     pot:1, elo:2024, eloVerified:true, eloYoY:2,  star:'Harry Kane',       players:['Harry Kane','Bellingham','Saka'],               form:{w:4,d:1,l:1,gf:12,ga:6} },
  { id:'BRA', name:'Brazil',         flag:'🇧🇷', confed:'CONMEBOL', pot:1, elo:1991, eloVerified:true, eloYoY:0,  star:'Vinícius Júnior', players:['Vinícius Jr','Rodrygo','Raphinha'],             form:{w:3,d:2,l:1,gf:9, ga:7} },
  { id:'POR', name:'Portugal',       flag:'🇵🇹', confed:'UEFA',     pot:1, elo:1989, eloVerified:true, eloYoY:-2, star:'Rafael Leão',      players:['Rafael Leão','Bruno Fernandes','Leão'],         form:{w:4,d:1,l:1,gf:10,ga:5} },
  { id:'COL', name:'Colombia',       flag:'🇨🇴', confed:'CONMEBOL', pot:2, elo:1982, eloVerified:true, eloYoY:1,  star:'Luis Díaz',        players:['Luis Díaz','Jhon Durán','James Rodríguez'],     form:{w:4,d:1,l:1,gf:11,ga:5} },
  { id:'NED', name:'Netherlands',    flag:'🇳🇱', confed:'UEFA',     pot:1, elo:1948, eloVerified:true, eloYoY:-1, star:'Cody Gakpo',       players:['Cody Gakpo','Memphis Depay','Simons'],          form:{w:4,d:1,l:1,gf:12,ga:6} },
  { id:'GER', name:'Germany',        flag:'🇩🇪', confed:'UEFA',     pot:1, elo:1932, eloVerified:true, eloYoY:0,  star:'Florian Wirtz',    players:['Florian Wirtz','Musiala','Kai Havertz'],        form:{w:4,d:1,l:1,gf:13,ga:5} },
  { id:'BEL', name:'Belgium',        flag:'🇧🇪', confed:'UEFA',     pot:1, elo:1894, eloVerified:true, eloYoY:2,  star:'Romelu Lukaku',    players:['Romelu Lukaku','De Bruyne','Doku'],             form:{w:3,d:2,l:1,gf:8, ga:6} },
  { id:'MEX', name:'Mexico',         flag:'🇲🇽', confed:'CONCACAF', pot:1, elo:1875, eloVerified:true, eloYoY:6,  star:'Santiago Giménez', players:['Santiago Giménez','Hirving Lozano','Quiñones'],form:{w:4,d:1,l:1,gf:10,ga:5} },
  { id:'CAN', name:'Canada',         flag:'🇨🇦', confed:'CONCACAF', pot:1, elo:1655, eloVerified:false,eloYoY:3,  star:'Jonathan David',   players:['Jonathan David','Davies','Larin'],              form:{w:2,d:2,l:2,gf:6, ga:8} },
  { id:'USA', name:'United States',  flag:'🇺🇸', confed:'CONCACAF', pot:1, elo:1772, eloVerified:false,eloYoY:-3, star:'Christian Pulisic',players:['Christian Pulisic','Balloon','Weah'],           form:{w:2,d:1,l:3,gf:5, ga:9} },

  // ---- Pot 2 ----
  { id:'CRO', name:'Croatia',        flag:'🇭🇷', confed:'UEFA',     pot:2, elo:1912, eloVerified:true, eloYoY:-3, star:'Andrej Kramarić',  players:['Kramarić','Modrić','Perišić'],                  form:{w:3,d:2,l:1,gf:8, ga:6} },
  { id:'MAR', name:'Morocco',        flag:'🇲🇦', confed:'CAF',      pot:2, elo:1835, eloVerified:false,eloYoY:4,  star:'Youssef En-Nesyri',players:['En-Nesyri','Hakimi','Ziyech'],                  form:{w:4,d:1,l:1,gf:9, ga:5} },
  { id:'URU', name:'Uruguay',        flag:'🇺🇾', confed:'CONMEBOL', pot:2, elo:1892, eloVerified:true, eloYoY:-4, star:'Darwin Núñez',     players:['Darwin Núñez','Valverde','Pellistri'],          form:{w:3,d:2,l:1,gf:9, ga:7} },
  { id:'SUI', name:'Switzerland',    flag:'🇨🇭', confed:'UEFA',     pot:2, elo:1891, eloVerified:true, eloYoY:1,  star:'Breel Embolo',     players:['Embolo','Xhaka','Duah'],                        form:{w:3,d:1,l:2,gf:7, ga:7} },
  { id:'JPN', name:'Japan',          flag:'🇯🇵', confed:'AFC',      pot:2, elo:1906, eloVerified:true, eloYoY:2,  star:'Kaoru Mitoma',     players:['Mitoma','Kubo','İto'],                           form:{w:4,d:1,l:1,gf:11,ga:5} },
  { id:'SEN', name:'Senegal',        flag:'🇸🇳', confed:'CAF',      pot:2, elo:1785, eloVerified:false,eloYoY:2,  star:'Sadio Mané',       players:['Sadio Mané','Sarr','Jackson'],                  form:{w:4,d:1,l:1,gf:10,ga:5} },
  { id:'IRN', name:'Iran',           flag:'🇮🇷', confed:'AFC',      pot:2, elo:1750, eloVerified:false,eloYoY:0,  star:'Mehdi Taremi',     players:['Mehdi Taremi','Azmoun','Gholizadeh'],           form:{w:3,d:2,l:1,gf:8, ga:5} },
  { id:'KOR', name:'South Korea',    flag:'🇰🇷', confed:'AFC',      pot:2, elo:1815, eloVerified:false,eloYoY:1,  star:'Son Heung-min',    players:['Son Heung-min','Lee Kang-in','Hwang'],          form:{w:4,d:1,l:1,gf:11,ga:5} },
  { id:'ECU', name:'Ecuador',        flag:'🇪🇨', confed:'CONMEBOL', pot:2, elo:1938, eloVerified:true, eloYoY:2,  star:'Enner Valencia',   players:['Enner Valencia','Plata','Caicedo'],             form:{w:3,d:2,l:1,gf:8, ga:6} },
  { id:'AUT', name:'Austria',        flag:'🇦🇹', confed:'UEFA',     pot:2, elo:1820, eloVerified:false,eloYoY:1,  star:'Marko Arnautović', players:['Arnautović','Sabitzer','Baumgartner'],          form:{w:3,d:2,l:1,gf:9, ga:6} },
  { id:'AUS', name:'Australia',      flag:'🇦🇺', confed:'AFC',      pot:2, elo:1660, eloVerified:false,eloYoY:0,  star:'Mathew Leckie',    players:['Leckie','Irvine','Goodwin'],                    form:{w:3,d:1,l:2,gf:7, ga:7} },

  // ---- Pot 3 ----
  { id:'NOR', name:'Norway',         flag:'🇳🇴', confed:'UEFA',     pot:3, elo:1914, eloVerified:true, eloYoY:3,  star:'Erling Haaland',   players:['Erling Haaland','Ødegaard','Sørloth'],          form:{w:4,d:1,l:1,gf:15,ga:4} },
  { id:'PAN', name:'Panama',         flag:'🇵🇦', confed:'CONCACAF', pot:3, elo:1575, eloVerified:false,eloYoY:1,  star:'Ismael Díaz',      players:['José Fajardo','Ismael Díaz','Cooper'],          form:{w:2,d:2,l:2,gf:6, ga:8} },
  { id:'EGY', name:'Egypt',          flag:'🇪🇬', confed:'CAF',      pot:3, elo:1690, eloVerified:false,eloYoY:1,  star:'Mohamed Salah',    players:['Mohamed Salah','Marmoush','Trezeguet'],         form:{w:3,d:2,l:1,gf:9, ga:6} },
  { id:'ALG', name:'Algeria',        flag:'🇩🇿', confed:'CAF',      pot:3, elo:1730, eloVerified:false,eloYoY:0,  star:'Mohamed Amoura',   players:['Amoura','Mahrez','Bounedjah'],                  form:{w:3,d:1,l:2,gf:8, ga:7} },
  { id:'SCO', name:'Scotland',       flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', confed:'UEFA',     pot:3, elo:1720, eloVerified:false,eloYoY:1,  star:'Che Adams',        players:['Che Adams','McTominay','McGinn'],               form:{w:3,d:1,l:2,gf:7, ga:7} },
  { id:'PAR', name:'Paraguay',       flag:'🇵🇾', confed:'CONMEBOL', pot:3, elo:1700, eloVerified:false,eloYoY:1,  star:'Antonio Sanabria', players:['Sanabria','Almirón','Enciso'],                  form:{w:3,d:2,l:1,gf:7, ga:6} },
  { id:'TUN', name:'Tunisia',        flag:'🇹🇳', confed:'CAF',      pot:3, elo:1680, eloVerified:false,eloYoY:0,  star:'Wahbi Khazri',     players:['Khazri','Jaziri','Msakni'],                     form:{w:2,d:2,l:2,gf:6, ga:7} },
  { id:'CIV', name:'Ivory Coast',    flag:'🇨🇮', confed:'CAF',      pot:3, elo:1715, eloVerified:false,eloYoY:1,  star:'Sébastien Haller', players:['Haller','Pepe','Adingra'],                      form:{w:3,d:1,l:2,gf:7, ga:7} },
  { id:'UZB', name:'Uzbekistan',     flag:'🇺🇿', confed:'AFC',      pot:3, elo:1615, eloVerified:false,eloYoY:2,  star:'Eldor Shomurodov', players:['Shomurodov','Masharipov','Saidov'],             form:{w:3,d:2,l:1,gf:8, ga:6} },
  { id:'QAT', name:'Qatar',          flag:'🇶🇦', confed:'AFC',      pot:3, elo:1605, eloVerified:false,eloYoY:0,  star:'Akram Afif',       players:['Akram Afif','Almoez Ali','Hassan'],             form:{w:3,d:1,l:2,gf:8, ga:8} },
  { id:'KSA', name:'Saudi Arabia',   flag:'🇸🇦', confed:'AFC',      pot:3, elo:1650, eloVerified:false,eloYoY:-1, star:'Salem Al-Dawsari', players:['Al-Dawsari','Al-Brikan','Al-Najei'],            form:{w:2,d:2,l:2,gf:6, ga:8} },
  { id:'RSA', name:'South Africa',   flag:'🇿🇦', confed:'CAF',      pot:3, elo:1620, eloVerified:false,eloYoY:1,  star:'Percy Tau',        players:['Percy Tau','Mokoena','Mailula'],                 form:{w:2,d:2,l:2,gf:6, ga:8} },

  // ---- Pot 4 ----
  { id:'JOR', name:'Jordan',         flag:'🇯🇴', confed:'AFC',      pot:4, elo:1490, eloVerified:false,eloYoY:2,  star:'Musa Al-Taamari',  players:['Al-Taamari','Al-Naimat','Mardi'],               form:{w:3,d:1,l:2,gf:7, ga:7} },
  { id:'CPV', name:'Cape Verde',     flag:'🇨🇻', confed:'CAF',      pot:4, elo:1545, eloVerified:false,eloYoY:1,  star:'Ryan Mendes',      players:['Ryan Mendes','Bebé','Garry Rodrigues'],          form:{w:2,d:2,l:2,gf:6, ga:8} },
  { id:'GHA', name:'Ghana',          flag:'🇬🇭', confed:'CAF',      pot:4, elo:1665, eloVerified:false,eloYoY:0,  star:'Mohammed Kudus',   players:['Mohammed Kudus','Inaki Williams','Semedo'],      form:{w:2,d:1,l:3,gf:6, ga:9} },
  { id:'CUW', name:'Curaçao',        flag:'🇨🇼', confed:'CONCACAF', pot:4, elo:1565, eloVerified:false,eloYoY:1,  star:'Leandro Bacuna',   players:['Bacuna','Juninho Bacuna','Rensch'],             form:{w:2,d:2,l:2,gf:6, ga:8} },
  { id:'HAI', name:'Haiti',          flag:'🇭🇹', confed:'CONCACAF', pot:4, elo:1505, eloVerified:false,eloYoY:0,  star:'Duckens Nazon',    players:['Duckens Nazon','Frantzdy Pierrot','Picault'],   form:{w:2,d:1,l:3,gf:5, ga:9} },
  { id:'NZL', name:'New Zealand',    flag:'🇳🇿', confed:'OFC',      pot:4, elo:1510, eloVerified:false,eloYoY:1,  star:'Chris Wood',       players:['Chris Wood','Singh','Barbarouses'],              form:{w:3,d:2,l:1,gf:9, ga:5} },
  { id:'CZE', name:'Czechia',        flag:'🇨🇿', confed:'UEFA',     pot:4, elo:1790, eloVerified:false,eloYoY:0,  star:'Patrik Schick',    players:['Patrik Schick','Souček','Hložek'],              form:{w:3,d:1,l:2,gf:8, ga:7} },
  { id:'BIH', name:'Bosnia & Herz.', flag:'🇧🇦', confed:'UEFA',     pot:4, elo:1700, eloVerified:false,eloYoY:1,  star:'Edin Džeko',       players:['Edin Džeko','Dedić','Tabaković'],               form:{w:3,d:1,l:2,gf:8, ga:7} },
  { id:'TUR', name:'Türkiye',        flag:'🇹🇷', confed:'UEFA',     pot:4, elo:1911, eloVerified:true, eloYoY:9,  star:'Arda Güler',       players:['Arda Güler','Yılmaz','Ünder'],                  form:{w:5,d:0,l:1,gf:14,ga:5} },
  { id:'SWE', name:'Sweden',         flag:'🇸🇪', confed:'UEFA',     pot:4, elo:1795, eloVerified:false,eloYoY:1,  star:'Alexander Isak',   players:['Alexander Isak','Gyökeres','Kulusevski'],       form:{w:3,d:2,l:1,gf:10,ga:6} },
  { id:'IRQ', name:'Iraq',           flag:'🇮🇶', confed:'AFC',      pot:4, elo:1550, eloVerified:false,eloYoY:0,  star:'Aymen Hussein',    players:['Aymen Hussein','Ali Jasim','Bashar'],           form:{w:2,d:2,l:2,gf:6, ga:7} },
  { id:'COD', name:'DR Congo',       flag:'🇨🇩', confed:'CAF',      pot:4, elo:1680, eloVerified:false,eloYoY:1,  star:'Cédric Bakambu',   players:['Bakambu','Wissa','Masuaku'],                    form:{w:3,d:1,l:2,gf:8, ga:7} },
]

// Remove the accidental placeholder object if present
const _clean = TEAMS.filter(t => t && t.id && t.id !== 'COL2')

export const teams = {}
for (const t of _clean) teams[t.id] = t

// Chinese display names (English `name` is kept for live-API name matching)
const ZH = {
  ESP:'西班牙', ARG:'阿根廷', FRA:'法国', ENG:'英格兰', BRA:'巴西', POR:'葡萄牙',
  COL:'哥伦比亚', NED:'荷兰', GER:'德国', BEL:'比利时', MEX:'墨西哥', CAN:'加拿大',
  USA:'美国', CRO:'克罗地亚', MAR:'摩洛哥', URU:'乌拉圭', SUI:'瑞士', JPN:'日本',
  SEN:'塞内加尔', IRN:'伊朗', KOR:'韩国', ECU:'厄瓜多尔', AUT:'奥地利', AUS:'澳大利亚',
  NOR:'挪威', PAN:'巴拿马', EGY:'埃及', ALG:'阿尔及利亚', SCO:'苏格兰', PAR:'巴拉圭',
  TUN:'突尼斯', CIV:'科特迪瓦', UZB:'乌兹别克斯坦', QAT:'卡塔尔', KSA:'沙特', RSA:'南非',
  JOR:'约旦', CPV:'佛得角', GHA:'加纳', CUW:'库拉索', HAI:'海地', NZL:'新西兰',
  CZE:'捷克', BIH:'波黑', TUR:'土耳其', SWE:'瑞典', IRQ:'伊拉克', COD:'刚果(金)',
}
for (const id in teams) teams[id].zh = ZH[id] || teams[id].name

export const teamIds = _clean.map(t => t.id)
export const TEAM_COUNT = _clean.length

export const HOST_NATIONS = ['USA', 'MEX', 'CAN']

export function isHost(id) { return HOST_NATIONS.includes(id) }
