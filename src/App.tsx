import { useState } from 'react'
import { 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  BookOpen, 
  Leaf, 
  Sparkles, 
  Volume2, 
  AlertCircle,
  Lightbulb,
  Compass,
  ArrowRightCircle,
  Mail
} from 'lucide-react'

// ==========================================
// 1. 데이터 정의 (동물 캐릭터 & 질문)
// ==========================================

interface AnimalProfile {
  id: string
  name: string
  title: string
  tags: string[]
  description: string
  prescription: string
  mission: string
  svgColor: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

const ANIMAL_PROFILES: Record<string, AnimalProfile> = {
  A: {
    id: 'A',
    name: '나무늘보 나른이',
    title: '그래도 오늘은 이 나무가 제일 편해...',
    tags: ['익숙한게최고', '관성의법칙', '내일부터진짜', '오토파일럿인생'],
    description: '당신이 행동하지 않는 건 게으른 게 아니에요. 수만 년간 인간의 뇌는 "에너지를 아껴라"라는 명령에 따르도록 진화했거든요. 익숙한 루틴을 바꾸는 것 자체가 뇌에게 경보음을 울리는 일이에요. 당신의 뇌는 지금 아주 정상적으로 작동하고 있는 거예요.',
    prescription: '변화를 "포기"나 "강요"가 아닌 "소프트웨어 업데이트"로 생각해 보세요. 스마트폰도 정기적으로 업데이트해야 더 잘 작동하듯이, 당신의 생활 습관도 더 나은 최신 버전으로 가볍게 업그레이드하는 과정일 뿐이랍니다.',
    mission: '오늘 하루 중 딱 "한 번"만, 늘 자동으로 하던 일상적인 선택을 멈추고 1초만 생각해 보세요. (예: 배달 앱을 열기 전에 "냉장고에 뭐가 남았더라?", 엘리베이터 버튼 누르기 전에 "계단으로 가볼까?") 자동 조종을 잠깐 끄는 것만으로도 뇌의 변화는 시작됩니다.',
    svgColor: {
      primary: '#8B5A2B', // Brown
      secondary: '#CD853F',
      accent: '#4CAF50',
      bg: '#F5F2EB'
    }
  },
  B: {
    id: 'B',
    name: '다람쥐 바삐',
    title: '도토리 다 모으고 나서 생각할게요...',
    tags: ['나중에할게', '지금은좀바빠', '현실이최우선', '할일목록만개'],
    description: '당장 현실의 문제(학업, 가계, 주거 등)가 걱정되는데 미래의 기후위기를 고민할 여유가 없는 것은 지극히 당연합니다. 우리 뇌는 먼 미래의 거대하고 모호한 위험보다 지금 눈앞에 닥친 작은 불안에 월등히 민감하게 세팅되어 있거든요.',
    prescription: '기후 행동을 "지구를 위해 나를 희생하는 불편한 일"로 생각하지 말아보세요. 대신 "나의 건강을 챙기고, 생활비를 아끼는 기회"로 해석하는 순간 행동의 문턱이 훨씬 낮아질 수 있습니다.',
    mission: '이번 달 전기나 가스 요금 고지서를 열어서 작년 동월 사용량과 꼼꼼히 비교해 보세요. 불필요한 대기 전력을 차단하거나 냉난방 온도를 1도만 조절하는 등, "지구를 살리는 노력이 어떻게 내 소중한 지갑까지 살려주는지" 확인하는 것이 첫걸음입니다.',
    svgColor: {
      primary: '#D2691E', // Orange-brown
      secondary: '#F4A460',
      accent: '#FFD700',
      bg: '#FAF4EF'
    }
  },
  C: {
    id: 'C',
    name: '여우 나르샤',
    title: '나 분리수거 엄청 잘하거든요? 칭찬해 주세요 🦊',
    tags: ['나름잘하고있잖아', '이정도면충분하지', '도덕점수만점', '칭찬받고싶어'],
    description: '분리배출을 철저히 하거나 텀블러를 들고 다니며 이미 훌륭하게 실천하고 계시군요! 심리학에서는 도덕적으로 좋은 일을 한 번 하고 나면 스스로에게 일종의 면죄부를 주는 심리를 "도덕적 면허"라고 부릅니다. 지금 잘하는 것에 안주하여 다음 단계를 외면하고 있을 수도 있어요.',
    prescription: '압박감을 느낄 필요는 전혀 없습니다. "내가 하는 게 너무 부족하다"라고 다그치기보다는, "내가 이미 구축해 놓은 멋진 친환경 습관 위에 가볍게 하나만 더 올려놓자"는 편안한 마음으로 접근해 보세요.',
    mission: '오늘 실천한 작은 친환경 행동(예: 텀블러 사용, 분리배출 등)을 나의 SNS나 친구들에게 가벼운 마음으로 자랑해 보세요. 칭찬을 받는 기쁨도 누리고, 주변 사람들에게 "이것이 요즘의 라이프스타일"이라는 새로운 표준을 널리 보여주는 긍정적인 전파 효과가 있습니다.',
    svgColor: {
      primary: '#E65100', // Deep Orange
      secondary: '#FFB74D',
      accent: '#00E676',
      bg: '#FFF8F2'
    }
  },
  D: {
    id: 'D',
    name: '부엉이 차피',
    title: '...어차피 다 늦었잖아요 (심오한 눈빛)',
    tags: ['어차피소용없어', '현실직시', '이미늦었다고', '철학적무력감'],
    description: '기후 문제를 아예 몰라서가 아니라, 오히려 심각성을 누구보다도 깊이 알기 때문에 느껴지는 무기력입니다. 기후위기라는 거대하고 통제 불가능한 이슈를 접할 때 뇌가 받는 과부하를 막기 위해 스스로 내면의 방어막(체념)을 가동한 상태예요.',
    prescription: '세상을 단숨에 구해야 한다는 거창한 부담감을 잠시 내려놓으세요. 우리의 목표는 완벽한 해결이 아니라, 나와 가까운 주변 사람들과 연대하고 작지만 확실한 변화를 만들어가는 "작은 승리"의 기쁨을 회복하는 데 있습니다.',
    mission: '환경이나 미래에 대해 나와 비슷한 고민을 가진 친구나 지인에게 가볍게 먼저 연락해 보세요. "너도 요즘 날씨 이상하다고 느껴?" 같은 공감대 섞인 대화 한마디만으로도, 혼자가 아니라는 든든한 연결감이 무력감을 해소하는 가장 든든한 열쇠가 됩니다.',
    svgColor: {
      primary: '#311B92', // Dark Indigo
      secondary: '#7986CB',
      accent: '#FF4081',
      bg: '#F3F4FB'
    }
  },
  E: {
    id: 'E',
    name: '미어캣 눈치',
    title: '다들 하면 나도 할게요~ 다들 안 하면... 저도요 😅',
    tags: ['눈치100단', '대세따라가기', '남들보고결정', '유난떨기싫어'],
    description: '주변 분위기와 남들의 시선을 많이 살피는 성향입니다. 공동체 속에서 눈치를 보는 것은 원시 시대부터 무리 속에서 생존하기 위한 뇌의 필수적인 생존 본능이었습니다. 환경을 유독 과격하게 주장하는 사람들에 대한 거부감이 이슈 자체의 반감으로 이어진 상태일 수도 있어요.',
    prescription: '"나만 유난을 떤다"는 부담 대신, "내가 하는 조용한 행동이 다른 눈치들을 안심시키고 동참하게 만드는 숨은 신호가 된다"고 발상을 전환해 보세요. 대세를 따르는 성향은 흐름이 바뀌면 누구보다 빠르게 변화합니다.',
    mission: '오늘 이 심리테스트 링크를 가장 친한 친구 한 명에게 가볍게 공유하며 "너는 무슨 동물 나왔어?"라고 물어보세요. 이 짧은 공유가 주변 사람들과 자연스럽게 환경이나 심리에 대해 이야기 나누는 소통의 다리가 되어줄 것입니다.',
    svgColor: {
      primary: '#E0A96D', // Sandy Gold
      secondary: '#8FBC8F',
      accent: '#008080',
      bg: '#FDFBF7'
    }
  }
}

interface Question {
  id: number
  type: string
  scene: string
  optionA: string
  optionB: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'A',
    scene: '배고픈 저녁 시간, 배달을 시킬까 고민하는 중...',
    optionA: '편하게 배달 앱을 열고 바로 시킨다. "오늘 하루는 귀찮으니까!"',
    optionB: '냉장고 문을 일단 열어본다. 남은 재료로 대충 해결해 볼까?'
  },
  {
    id: 2,
    type: 'B',
    scene: '유튜브 피드에 기후위기 경고 다큐가 올라왔다.',
    optionA: '안 그래도 신경 쓸 일 많은데 굳이? 스크롤을 내려 재밌는 예능을 본다.',
    optionB: '궁금해서 클릭해 본다. "요즘 지구에 무슨 일이 일어나고 있지?"'
  },
  {
    id: 3,
    type: 'C',
    scene: '텀블러를 잘 챙겨 다니고 분리수거도 열심히 하는 나의 솔직한 자평은?',
    optionA: '이 정도면 환경 보호 기여도 A등급이지! 나름 모범적이라고 생각한다.',
    optionB: '꾸준히 하고 있긴 한데... 솔직히 이게 진짜 충분한 건지는 잘 모르겠다.'
  },
  {
    id: 4,
    type: 'C',
    scene: '기업들의 과도한 포장과 환경 파괴 뉴스를 접했을 때 드는 생각은?',
    optionA: '역시 대기업 책임이 제일 커. 개인이 아등바등 해봐야 소용없는 거 아냐?',
    optionB: '기업 문제가 더 크긴 한데... 내가 사는 것들도 어느 정도 영향은 있겠지.'
  },
  {
    id: 5,
    type: 'D',
    scene: '고래와 펭귄이 떼죽음 당하는 참담한 다큐멘터리 영상을 보고 난 내 느낌은?',
    optionA: '너무 큰 문제라 암담하다. 개인이 뭘 해도 세상을 바꿀 수 없다는 무력감이 든다.',
    optionB: '가슴이 아프긴 한데... 내가 할 수 있는 게 뭔가는 있지 않을까 하는 생각이 든다.'
  },
  {
    id: 6,
    type: 'E',
    scene: '마트 장보기를 하는데 친환경 마크가 붙은 제품이 500원 더 비싸다.',
    optionA: '굳이 남들도 잘 안 사는 거 같은데 비싼 돈을 더 낼 필요는 없다며 저렴한 것을 고른다.',
    optionB: '이왕이면 의미 있는 소비를 하자며 친환경 마크 제품을 장바구니에 담는다.'
  },
  {
    id: 7,
    type: 'E',
    scene: '탄소를 빨아들이는 첨단 기계나 친환경 신기술 뉴스를 접했을 때 드는 생각은?',
    optionA: '천재 과학자들이 결국 다 해결해 줄 거야! 난 내 방식대로 편하게 살면 된다.',
    optionB: '기술은 기대되지만, 그 전까지 공백이 꽤 길 텐데... 그 사이가 걱정되긴 한다.'
  },
  {
    id: 8,
    type: 'D',
    scene: '지구 온도가 돌이킬 수 없는 한계점(티핑포인트)을 넘었다는 설을 읽었다.',
    optionA: '결국 멸망의 길인가... 어차피 포기할 시점이면 남은 시간이라도 편하게 살련다.',
    optionB: '"이미 늦었다"는 말이 맞을 수도 있지만... 그래도 아무것도 안 하는 건 찜찜하다.'
  },
  {
    id: 9,
    type: 'B',
    scene: 'SNS에서 아주 간단한 탄소중립 챌린지 캠페인 참여 요청을 받았다.',
    optionA: '관심은 가지만 시험/일/해야 할 일로 바쁘니 나중에 한가할 때나 동참하자고 미뤄둔다.',
    optionB: '바쁘지만 서명이나 공유 등 1분이면 끝나는 간단한 일이라 그 자리에서 바로 동참한다.'
  },
  {
    id: 10,
    type: 'C',
    scene: '정부나 대기업이 주축이 되어 법안을 강화해야 한다는 대화를 나눌 때의 입장은?',
    optionA: '국가적인 강제 규제가 우선이야. 개인의 양심에 호소하는 환경 실천은 한계가 분명해.',
    optionB: '국가 규제가 제일 세긴 한데... 소비자 압력이나 투표 같은 것도 아예 무의미하진 않겠지.'
  },
  {
    id: 11,
    type: 'A',
    scene: '회사나 동호회 회식 장소로 무조건 고깃집을 가자고 의견이 모이는 상황이다.',
    optionA: '튀는 사람으로 보이기 싫고 어색해서 그냥 흐름에 따라 고기를 마음껏 즐긴다.',
    optionB: '사실 뭔가 과하게 먹는 게 찜찜해서 나 조용히 고기 좀 덜 집어다 먹는 편이다.'
  },
  {
    id: 12,
    type: 'E',
    scene: '도로를 가로막고 통행을 방해하는 기후 활동가의 과격한 시위 소식을 보았다.',
    optionA: '저런 방식으로 주장하니까 환경 운동 전체에 거부감과 묘한 거부감이 생겨서 싫다.',
    optionB: '과격한 수단은 아쉽지만 얼마나 절박하고 문제가 심각하면 저럴지 이슈 본질에 집중한다.'
  },
  {
    id: 13,
    type: 'A',
    scene: '친구가 출퇴근이나 근거리 이동 시 자전거/대중교통을 타자고 제안했다.',
    optionA: '매번 그렇게 하는 건 체력적으로 너무 지쳐서 귀찮다. 그냥 내 타던 수단이 최고야.',
    optionB: '귀찮기는 한데... 어차피 운동도 해야 하는데 겸사겸사 해볼 수도 있을 것 같기도 하고.'
  },
  {
    id: 14,
    type: 'B',
    scene: '내 집 마련, 대출이자 납입 등 당장의 자산 형성 고민이 쏟아지는 요즘의 나.',
    optionA: '환경 걱정은 여유 있는 부자들의 사치지. 당장 눈앞의 밥벌이가 생존이자 급선무다.',
    optionB: '미래를 위해 돈 모으는 게 최우선이지만, 일상의 낭비를 줄이는 것도 의미가 있다고 믿는다.'
  },
  {
    id: 15,
    type: 'D',
    scene: '오늘도 사상 유례없는 폭염과 가뭄 재해 소식을 전하는 날씨 뉴스를 볼 때.',
    optionA: '이제 개인이 바꿀 수 없는 파국 같아 솔직히 슬프고 허탈해서 뉴스를 꺼버린다.',
    optionB: '마음이 찝찝하고 무겁지만, 그렇기 때문에 일상에서 덜 소비하고 조절하려고 힘쓴다.'
  }
]

// ==========================================
// 2. 동물 SVG 일러스트레이션 컴포넌트
// ==========================================

const SlothSVG = ({ colors }: { colors: AnimalProfile['svgColor'] }) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-md">
    <circle cx="100" cy="100" r="80" fill={colors.bg} />
    {/* 나뭇가지 */}
    <path d="M40 70 Q100 80 160 70" stroke="#5C4033" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M140 70 Q150 50 145 45" stroke="#5C4033" strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* 잎새 */}
    <path d="M145 45 C155 35 160 50 145 45 Z" fill={colors.accent} />
    {/* 나무늘보 몸통 */}
    <rect x="65" y="75" width="70" height="50" rx="25" fill={colors.primary} />
    {/* 얼굴 */}
    <ellipse cx="100" cy="95" rx="28" ry="22" fill="#E8D8C8" />
    {/* 눈가 무늬 */}
    <ellipse cx="88" cy="95" rx="10" ry="7" fill={colors.secondary} transform="rotate(-15 88 95)" />
    <ellipse cx="112" cy="95" rx="10" ry="7" fill={colors.secondary} transform="rotate(15 112 95)" />
    {/* 눈 */}
    <circle cx="88" cy="95" r="3" fill="#3E2723" />
    <circle cx="112" cy="95" r="3" fill="#3E2723" />
    {/* 입 */}
    <path d="M96 103 Q100 106 104 103" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* 팔 (나무에 걸친 형태) */}
    <path d="M75 80 Q70 65 65 72" stroke={colors.primary} strokeWidth="12" strokeLinecap="round" fill="none" />
    <path d="M125 80 Q130 65 135 72" stroke={colors.primary} strokeWidth="12" strokeLinecap="round" fill="none" />
    {/* 다리 */}
    <rect x="75" y="115" width="10" height="15" rx="4" fill={colors.secondary} />
    <rect x="115" y="115" width="10" height="15" rx="4" fill={colors.secondary} />
  </svg>
)

const SquirrelSVG = ({ colors }: { colors: AnimalProfile['svgColor'] }) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-md">
    <circle cx="100" cy="100" r="80" fill={colors.bg} />
    {/* 풍성한 꼬리 */}
    <path d="M120 140 Q160 130 155 90 Q150 50 120 60 Q105 65 115 85 Q125 105 120 140" fill={colors.primary} />
    {/* 몸통 */}
    <ellipse cx="90" cy="125" rx="30" ry="40" fill={colors.secondary} />
    <ellipse cx="90" cy="125" rx="18" ry="25" fill="#FFF8F0" />
    {/* 머리 */}
    <circle cx="85" cy="75" r="28" fill={colors.primary} />
    {/* 귀 */}
    <path d="M68 55 Q72 32 80 48" fill={colors.primary} stroke={colors.primary} strokeWidth="2" />
    <path d="M92 52 Q100 30 102 46" fill={colors.primary} stroke={colors.primary} strokeWidth="2" />
    {/* 얼굴 영역 */}
    <ellipse cx="80" cy="82" rx="20" ry="15" fill="#FFF8F0" />
    <ellipse cx="92" cy="82" rx="15" ry="12" fill="#FFF8F0" />
    {/* 눈 */}
    <circle cx="75" cy="72" r="3.5" fill="#2E1C0C" />
    <circle cx="95" cy="72" r="3.5" fill="#2E1C0C" />
    <circle cx="76.5" cy="70.5" r="1" fill="#FFFFFF" />
    <circle cx="96.5" cy="70.5" r="1" fill="#FFFFFF" />
    {/* 코 */}
    <polygon points="83,78 87,78 85,81" fill="#D84315" />
    {/* 다람쥐 앞발 (도토리 쥐고 있음) */}
    <path d="M72 110 Q85 115 95 110" stroke={colors.primary} strokeWidth="7" strokeLinecap="round" fill="none" />
    {/* 도토리 */}
    <ellipse cx="98" cy="115" rx="12" ry="10" fill={colors.accent} />
    <path d="M98 103 C108 103 112 111 98 111 Z" fill="#5C4033" />
    <line x1="98" y1="103" x2="98" y2="99" stroke="#5C4033" strokeWidth="2" />
    {/* 다리 */}
    <ellipse cx="70" cy="158" rx="12" ry="6" fill={colors.primary} />
    <ellipse cx="110" cy="158" rx="12" ry="6" fill={colors.primary} />
  </svg>
)

const FoxSVG = ({ colors }: { colors: AnimalProfile['svgColor'] }) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-md">
    <circle cx="100" cy="100" r="80" fill={colors.bg} />
    {/* 몸통 */}
    <path d="M70 160 Q100 110 130 160 Z" fill={colors.primary} />
    <path d="M85 160 Q100 130 115 160 Z" fill="#FFF" />
    {/* 귀 */}
    <polygon points="60,90 50,50 85,75" fill={colors.primary} />
    <polygon points="63,85 57,58 80,75" fill="#FFCC80" />
    <polygon points="140,90 150,50 115,75" fill={colors.primary} />
    <polygon points="137,85 143,58 120,75" fill="#FFCC80" />
    {/* 머리 */}
    <path d="M60 90 Q100 125 140 90 Q100 60 60 90" fill={colors.primary} />
    {/* 볼 흰 털 */}
    <path d="M60 90 Q75 105 85 95 Q70 85 60 90" fill="#FFF" />
    <path d="M140 90 Q125 105 115 95 Q130 85 140 90" fill="#FFF" />
    {/* 코 & 주둥이 */}
    <circle cx="100" cy="108" r="5" fill="#263238" />
    {/* 도도한 눈 */}
    <path d="M70 82 Q80 77 84 85" stroke="#263238" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M130 82 Q120 77 116 85" stroke="#263238" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* 손거울 */}
    <circle cx="120" cy="130" r="14" fill="#CFD8DC" stroke="#78909C" strokeWidth="3" />
    <line x1="120" y1="144" x2="120" y2="162" stroke="#78909C" strokeWidth="4" />
    <path d="M110 120 Q120 118 124 128" stroke="#FFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    {/* 반짝이 효과 */}
    <path d="M45 40 L48 45 L53 48 L48 51 L45 56 L42 51 L37 48 L42 45 Z" fill={colors.accent} />
  </svg>
)

const OwlSVG = ({ colors }: { colors: AnimalProfile['svgColor'] }) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-md">
    <circle cx="100" cy="100" r="80" fill={colors.bg} />
    {/* 밤하늘의 초승달 */}
    <path d="M140 40 A12 12 0 1 0 155 55 A15 15 0 1 1 140 40" fill={colors.accent} />
    {/* 귀 깃털 */}
    <polygon points="65,65 50,45 80,60" fill={colors.primary} />
    <polygon points="135,65 150,45 120,60" fill={colors.primary} />
    {/* 몸통 */}
    <rect x="60" y="65" width="80" height="95" rx="35" fill={colors.primary} />
    {/* 배 영역 */}
    <rect x="72" y="105" width="56" height="45" rx="20" fill="#FFF" opacity="0.9" />
    {/* 배 깃털 무늬 */}
    <path d="M85 118 Q90 122 95 118 M105 118 Q110 122 115 118 M95 130 Q100 134 105 130" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* 눈 테두리 */}
    <circle cx="82" cy="85" r="16" fill="#FFF" />
    <circle cx="118" cy="85" r="16" fill="#FFF" />
    {/* 아련한/우수에 찬 눈 */}
    <circle cx="82" cy="85" r="9" fill={colors.secondary} />
    <circle cx="118" cy="85" r="9" fill={colors.secondary} />
    {/* 하이라이트 */}
    <circle cx="80" cy="83" r="2.5" fill="#FFF" />
    <circle cx="116" cy="83" r="2.5" fill="#FFF" />
    {/* 부리 */}
    <polygon points="100,92 96,102 104,102" fill="#FFB300" />
    {/* 날개 */}
    <path d="M55 85 Q45 110 58 135" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M145 85 Q155 110 142 135" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" fill="none" />
    {/* 발 */}
    <circle cx="85" cy="160" r="4.5" fill="#FFB300" />
    <circle cx="91" cy="160" r="4.5" fill="#FFB300" />
    <circle cx="109" cy="160" r="4.5" fill="#FFB300" />
    <circle cx="115" cy="160" r="4.5" fill="#FFB300" />
  </svg>
)

const MeerkatSVG = ({ colors }: { colors: AnimalProfile['svgColor'] }) => (
  <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-md">
    <circle cx="100" cy="100" r="80" fill={colors.bg} />
    {/* 몸통 (길쭉한 형태) */}
    <rect x="80" y="90" width="40" height="75" rx="20" fill={colors.primary} />
    {/* 배 부분 */}
    <rect x="88" y="105" width="24" height="48" rx="12" fill="#FFE5A3" />
    {/* 목 */}
    <rect x="86" y="70" width="28" height="28" rx="8" fill={colors.primary} />
    {/* 머리 */}
    <ellipse cx="100" cy="62" rx="22" ry="18" fill={colors.primary} />
    {/* 귀 */}
    <circle cx="77" cy="60" r="6" fill="#4E342E" />
    <circle cx="123" cy="60" r="6" fill="#4E342E" />
    {/* 주둥이 */}
    <ellipse cx="100" cy="68" rx="10" ry="8" fill="#FFE5A3" />
    <circle cx="100" cy="64" r="2.5" fill="#2E1C0C" />
    {/* 눈가 검은 반점 (눈치 보는 미어캣 눈빛 표현) */}
    <ellipse cx="91" cy="58" rx="5.5" ry="4" fill="#4E342E" transform="rotate(-10 91 58)" />
    <ellipse cx="109" cy="58" rx="5.5" ry="4" fill="#4E342E" transform="rotate(10 109 58)" />
    {/* 눈 */}
    <circle cx="92" cy="58" r="2" fill="#FFF" />
    <circle cx="108" cy="58" r="2" fill="#FFF" />
    {/* 손 (눈치 보며 모은 팔) */}
    <path d="M84 108 Q100 112 104 104" stroke="#4E342E" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M116 108 Q100 112 96 104" stroke="#4E342E" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* 꼬리 */}
    <path d="M115 158 Q140 162 135 130" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
)

const AnimalIllustration = ({ type, colors }: { type: string; colors: AnimalProfile['svgColor'] }) => {
  switch (type) {
    case 'A': return <SlothSVG colors={colors} />
    case 'B': return <SquirrelSVG colors={colors} />
    case 'C': return <FoxSVG colors={colors} />
    case 'D': return <OwlSVG colors={colors} />
    case 'E': return <MeerkatSVG colors={colors} />
    default: return null
  }
}

// ==========================================
// 3. 메인 앱 컴포넌트
// ==========================================

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({ A: 0, B: 0, C: 0, D: 0, E: 0 })
  const [primaryResult, setPrimaryResult] = useState<AnimalProfile | null>(null)
  const [secondaryTypes, setSecondaryTypes] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // 테스트 시작
  const startQuiz = () => {
    setScores({ A: 0, B: 0, C: 0, D: 0, E: 0 })
    setCurrentIdx(0)
    setIsSubscribed(false)
    setGameState('quiz')
  }

  // 응답 선택 처리
  const handleAnswer = (optionKey: 'A' | 'B') => {
    const currentQuestion = QUESTIONS[currentIdx]
    const nextScores = { ...scores }

    if (optionKey === 'A') {
      // Option A인 경우 해당 질문의 매칭 유형 점수 +1
      nextScores[currentQuestion.type] = (nextScores[currentQuestion.type] || 0) + 1
    }
    
    setScores(nextScores)

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1)
    } else {
      // 마지막 문항 완료 시 로딩 단계로 진입
      setGameState('loading')
      
      // 기분 좋은 로딩 연출 (2초 후 결과 계산 완료)
      setTimeout(() => {
        calculateResult(nextScores)
        setGameState('result')
      }, 2200)
    }
  }

  // 결과 산출
  const calculateResult = (finalScores: Record<string, number>) => {
    // 가장 높은 점수 찾기
    let maxScore = -1
    let winners: string[] = []

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score
        winners = [type]
      } else if (score === maxScore) {
        winners.push(type)
      }
    })

    // 주 유형 매칭 (동점일 경우 첫 번째 알파벳 우선)
    const primaryType = winners[0]
    setPrimaryResult(ANIMAL_PROFILES[primaryType])

    // 동점 혹은 2위 성향(공동 1위 포함)을 서브 성향으로 도출
    const subTypes = Object.keys(finalScores).filter(
      (type) => type !== primaryType && finalScores[type] >= 2
    ).map(type => ANIMAL_PROFILES[type].name.split(' ')[1] || ANIMAL_PROFILES[type].name)
    
    setSecondaryTypes(subTypes)
  }

  // 결과 복사 (공유)
  const copyShareLink = () => {
    const dummyUrl = window.location.href
    navigator.clipboard.writeText(`🌲 [기후 심리테스트 결과] 나의 숲속 동물 성향은 [${primaryResult?.name}]입니다! \n나의 내면 장벽을 진단해보세요: ${dummyUrl}`)
      .then(() => {
        showToast('결과가 클립보드에 복사되었습니다. 공유해 보세요! 🌲')
      })
      .catch(() => {
        showToast('클립보드 복사에 실패했습니다. 주소창의 링크를 공유해 주세요!')
      })
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // 전체 진행률 계산 (15개 문항 기반)
  const progressPercent = Math.round(((currentIdx) / QUESTIONS.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF3F0] via-[#E4EDE7] to-[#D5E4D9] text-stone-800 font-sans flex items-center justify-center p-4 selection:bg-emerald-200">
      <div className="w-full max-w-md bg-white/95 md:bg-white/90 md:backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/40 overflow-hidden relative">
        
        {/* 장식용 잎새 배경 */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* ==========================================
            INTRO STATE (시작 화면)
           ========================================== */}
        {gameState === 'intro' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl mb-6 shadow-inner animate-bounce">
              <Leaf size={32} className="fill-emerald-600/20" />
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-emerald-950 mb-2 font-display">
              내 마음속의 숲
            </h1>
            <p className="text-emerald-800 font-medium text-sm mb-6 tracking-wide uppercase px-2 py-0.5 bg-emerald-100/50 rounded-full">
              기후 심리 성향 테스트
            </p>

            <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-5 mb-8 text-left max-w-sm">
              <p className="text-stone-600 text-[14px] leading-relaxed mb-3">
                🌱 <span className="font-semibold text-emerald-900">"지구를 구하자"</span>는 거창한 외침 앞에서 나도 모르게 행동을 내일로 미룬 적이 있으신가요?
              </p>
              <p className="text-stone-600 text-[14px] leading-relaxed">
                나를 붙잡고 있는 내면의 심리 장벽을 귀여운 <span className="font-semibold text-emerald-900">숲속 동물 캐릭터</span>로 만나보고, 지치지 않고 앞으로 나아갈 마음 처방전을 받아보세요.
              </p>
            </div>

            <button
              onClick={startQuiz}
              className="w-full py-4 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2 group cursor-pointer hover:shadow-emerald-900/10"
            >
              내 마음 진단하러 가기
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            
            <div className="mt-8 text-xs text-stone-400">
              * 본 테스트는 도서 &lt;착한 사람들은 왜 행동을 미루는가?&gt;의 데이터를 기초로 구성되었습니다.
            </div>
          </div>
        )}

        {/* ==========================================
            QUIZ STATE (질문 화면)
           ========================================== */}
        {gameState === 'quiz' && (
          <div className="p-6 min-h-[500px] flex flex-col justify-between">
            {/* 상단 프로그레스 영역 */}
            <div>
              <div className="flex justify-between items-center text-xs text-stone-500 mb-3 font-semibold">
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  질문 {currentIdx + 1} / {QUESTIONS.length}
                </span>
                <span className="text-emerald-700 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden mb-6">
                <div 
                  className="bg-emerald-700 h-full rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* 상황 배경 연출 */}
              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <Compass className="text-emerald-700 shrink-0 mt-0.5" size={18} />
                <p className="text-emerald-950 font-medium text-[15px] leading-relaxed">
                  {QUESTIONS[currentIdx].scene}
                </p>
              </div>
            </div>

            {/* 선택지 영역 */}
            <div className="space-y-4 my-auto">
              <button
                onClick={() => handleAnswer('A')}
                className="w-full text-left p-5 bg-stone-50 hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-300 rounded-2xl transition-all duration-300 transform active:scale-99 cursor-pointer group flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  A
                </span>
                <span className="text-[14px] text-stone-700 group-hover:text-emerald-950 font-medium leading-relaxed">
                  {QUESTIONS[currentIdx].optionA}
                </span>
              </button>

              <button
                onClick={() => handleAnswer('B')}
                className="w-full text-left p-5 bg-stone-50 hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-300 rounded-2xl transition-all duration-300 transform active:scale-99 cursor-pointer group flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  B
                </span>
                <span className="text-[14px] text-stone-700 group-hover:text-emerald-950 font-medium leading-relaxed">
                  {QUESTIONS[currentIdx].optionB}
                </span>
              </button>
            </div>

            {/* 하단 심플 푸터 */}
            <div className="mt-6 text-center text-xs text-stone-400">
              선택지에는 정답이 없습니다. 내 마음에 더 끌리는 것을 골라보세요.
            </div>
          </div>
        )}

        {/* ==========================================
            LOADING STATE (분석 화면)
           ========================================== */}
        {gameState === 'loading' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative mb-6">
              {/* 스피너 애니메이션 */}
              <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin" />
              <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-800" size={20} />
            </div>
            
            <h3 className="text-xl font-bold text-emerald-950 mb-2">
              숲속 안내원에게 자문을 구하는 중
            </h3>
            <p className="text-stone-500 text-sm animate-pulse">
              내 마음의 심리 장벽을 해킹하는 중...
            </p>
          </div>
        )}

        {/* ==========================================
            RESULT STATE (결과 화면)
           ========================================== */}
        {gameState === 'result' && primaryResult && (
          <div className="overflow-y-auto max-h-[85vh] md:max-h-none">
            {/* 상단 장식 헤더 */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-6 text-center">
              <span className="text-xs font-semibold tracking-widest bg-white/10 px-3 py-1 rounded-full uppercase">
                나의 숲속 성향 진단서
              </span>
              <h2 className="text-2xl font-black mt-3">{primaryResult.name}</h2>
              <p className="text-emerald-100 text-xs mt-1 italic opacity-90">
                "{primaryResult.title}"
              </p>
            </div>

            {/* 일러스트레이션 카드 */}
            <div className="p-6 text-center border-b border-stone-100 bg-stone-50/50">
              <AnimalIllustration type={primaryResult.id} colors={primaryResult.svgColor} />
              
              {/* 태그 리스트 */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {primaryResult.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] font-bold text-stone-600 bg-stone-200/60 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 본문 콘텐츠 */}
            <div className="p-6 space-y-6">
              
              {/* 이해와 위로 섹션 */}
              <div className="space-y-2.5">
                <h4 className="text-[15px] font-bold text-emerald-950 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-700 fill-emerald-600/10" />
                  당신의 마음 들여다보기
                </h4>
                <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-4 text-[13.5px] leading-relaxed text-stone-600">
                  {primaryResult.description}
                </div>
              </div>

              {/* 처방 및 팁 섹션 */}
              <div className="space-y-2.5">
                <h4 className="text-[15px] font-bold text-emerald-950 flex items-center gap-2">
                  <Lightbulb size={16} className="text-emerald-700 fill-emerald-600/10" />
                  동물 안내원이 주는 마음 처방전
                </h4>
                <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-4 text-[13.5px] leading-relaxed text-stone-600">
                  <span className="font-semibold text-emerald-900 block mb-1">💡 처방 키워드: {primaryResult.prescription.split(' ')[0]}...</span>
                  {primaryResult.prescription}
                </div>
              </div>

              {/* 오늘의 미션 섹션 */}
              <div className="space-y-2.5">
                <h4 className="text-[15px] font-bold text-emerald-950 flex items-center gap-2">
                  <Volume2 size={16} className="text-emerald-700 fill-emerald-600/10" />
                  부담 없는 오늘의 한 걸음
                </h4>
                <div className="bg-amber-50/50 border border-amber-200/40 rounded-2xl p-4 text-[13.5px] leading-relaxed text-stone-700">
                  <span className="font-bold text-amber-800 block mb-1">🌱 작은 실천 미션</span>
                  {primaryResult.mission}
                </div>
              </div>

              {/* 복합 성향 보너스 표기 */}
              {secondaryTypes.length > 0 && (
                <div className="text-xs text-center text-stone-500 bg-stone-100/60 py-2 rounded-xl">
                  🔍 맑은 날 숲속 산책로에서 <span className="font-semibold text-stone-700">[{secondaryTypes.join(', ')}]</span> 성향도 함께 발견되곤 해요!
                </div>
              )}

              {/* 이메일 수집 (리드 마그넷) 영역 */}
              <div className="bg-emerald-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                {/* 배경 장식 */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <h4 className="font-bold text-[15px] mb-2 flex items-center gap-2 relative z-10">
                  <Mail size={16} />
                  내 성향 심층 분석 리포트 무료 받기
                </h4>
                <p className="text-emerald-100 text-[12.5px] leading-relaxed mb-4 relative z-10">
                  테스트 결과만으로는 아쉬우신가요? 이메일을 남겨주시면 <strong>{primaryResult.name}</strong>의 숨겨진 심리 장벽과 맞춤형 행동 플랜이 담긴 상세 리포트를 보내드립니다.
                </p>
                
                {!isSubscribed ? (
                  <form 
                    className="flex flex-col gap-2 relative z-10"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // 실제로는 여기에 Formspree, ConvertKit 등의 API 연동 코드가 들어갑니다.
                      setIsSubscribed(true);
                      showToast('신청이 완료되었습니다! 리포트를 곧 보내드릴게요 💌');
                    }}
                  >
                    <input 
                      type="email" 
                      placeholder="이메일 주소를 입력해주세요" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-emerald-600/50 text-white placeholder-emerald-200/60 focus:outline-none focus:border-white focus:bg-white/20 transition-colors text-sm"
                    />
                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-white text-emerald-900 font-bold rounded-xl text-sm hover:bg-emerald-50 transition-colors active:scale-[0.98] cursor-pointer"
                    >
                      무료 리포트 신청하기
                    </button>
                    <p className="text-[10px] text-emerald-300 text-center mt-1">
                      스팸은 보내지 않습니다. 언제든 구독을 취소할 수 있습니다.
                    </p>
                  </form>
                ) : (
                  <div className="bg-white/10 border border-emerald-400/30 rounded-xl p-4 text-center relative z-10">
                    <p className="font-bold text-sm text-emerald-50">🎉 신청 완료!</p>
                    <p className="text-[11px] text-emerald-200 mt-1">입력하신 이메일로 리포트를 곧 발송해 드릴게요.</p>
                  </div>
                )}
              </div>

              {/* 크레킷 전자책 부드러운 유도 배너 (광고스럽지 않고 가독성 높은 가이드 형식) */}
              <div className="bg-gradient-to-br from-emerald-50/80 to-stone-50 border border-emerald-200/50 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-[14px]">
                  <BookOpen size={18} className="text-emerald-800" />
                  <span>더 나은 나를 위한 마음의 가이드북</span>
                </div>
                
                <p className="text-[12.5px] text-stone-600 leading-relaxed">
                  인간의 뇌 메커니즘을 알면 무력함과 실천을 미루는 버릇을 다룰 수 있게 됩니다. 도서 <b>『착한 사람들은 왜 행동을 미루는가』</b>에는 5가지 심리 장벽을 돌파하는 심도 깊은 처방전과, 타인을 상처주지 않고 동참시키는 설득의 원리 등 기후행동을 돕는 내용들이 수록되어 있습니다.
                </p>

                <a
                  href="https://creket.com/" // 크레킷 판매 페이지 주소
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 group transition-colors cursor-pointer text-center"
                >
                  📖 도서 원고 및 마음 처방전 자세히 읽어보기
                  <ArrowRightCircle size={14} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* 하단 공유 & 재시작 버튼 */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={copyShareLink}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-300 transition-colors cursor-pointer"
                >
                  <Share2 size={14} />
                  결과 공유하기
                </button>
                <button
                  onClick={startQuiz}
                  className="py-3 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  테스트 다시하기
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 토스트 알림창 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300">
          <AlertCircle size={14} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}
    </div>
  )
}
