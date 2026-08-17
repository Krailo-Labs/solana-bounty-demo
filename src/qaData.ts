export interface QAPreset {
  id: string;
  category: 'speed' | 'security' | 'fees' | 'governance' | 'compare' | 'starter';
  categoryLabel: { ua: string; en: string };
  question: { ua: string; en: string };
  shortAnswer: { ua: string; en: string };
  fullAnswer: {
    ua: {
      summary: string;
      analogy: string;
      keyPoints: string[];
      takeaway: string;
    };
    en: {
      summary: string;
      analogy: string;
      keyPoints: string[];
      takeaway: string;
    };
  };
  icon: string;
}

export const QA_PRESETS: QAPreset[] = [
  {
    id: 'speed',
    category: 'speed',
    categoryLabel: { ua: 'Швидкість', en: 'Speed' },
    icon: 'Zap',
    question: {
      ua: 'Чому перекази в Solana відбуваються за 400 мілісекунд (майже миттєво)?',
      en: 'Why are Solana transfers so fast (around 400 milliseconds)?'
    },
    shortAnswer: {
      ua: 'Завдяки синхронному внутрішньому годиннику (Proof of History) комп\'ютерам не потрібно витрачати час на переговори про черговість дій.',
      en: 'Thanks to synchronized internal cryptographic clocks (Proof of History), computers don\'t waste time negotiating order.'
    },
    fullAnswer: {
      ua: {
        summary: 'У звичайних блокчейнах комп\'ютери повинні довго домовлятися: "хто відправив транзакцію першим?". Solana винайшла вбудований криптографічний годинник — Proof of History (PoH).',
        analogy: '💡 Уявіть конвеєр на заводі, де кожна деталь уже має вибитий штамп точного часу, тому роботам не потрібно зупинятися і радитися.',
        keyPoints: [
          'Час створення блоку — всього ~400 мілісекунд.',
          'Транзакції обробляються паралельно на багатьох ядрах процесора (Sealevel).',
          'Немає черг очікування підтвердження, як у старих мережах.'
        ],
        takeaway: 'Переказ зараховується так само швидко, як повідомлення в Telegram.'
      },
      en: {
        summary: 'In older blockchains, computers spend seconds or minutes debating transaction order. Solana introduced an internal cryptographic timestamp mechanism called Proof of History.',
        analogy: '💡 Imagine a high-speed conveyor belt where every parcel has a pre-printed exact millisecond stamp, so workers never stop to compare clocks.',
        keyPoints: [
          'Block generation time is only ~400 milliseconds.',
          'Transactions process in parallel across hardware CPU/GPU cores (Sealevel).',
          'Zero bottleneck queues compared to traditional systems.'
        ],
        takeaway: 'Funds arrive as fast as a chat message in instant messengers.'
      }
    }
  },
  {
    id: 'security',
    category: 'security',
    categoryLabel: { ua: 'Безпека', en: 'Security' },
    icon: 'ShieldCheck',
    question: {
      ua: 'Чи безпечна Solana порівняно зі звичайним банком?',
      en: 'Is Solana secure compared to traditional banking?'
    },
    shortAnswer: {
      ua: 'У банку ваші гроші контролює один директор або сервер. У Solana — тисячі незалежних комп\'ютерів по всьому світу.',
      en: 'In a bank, one central institution holds control. In Solana, thousands of independent computers worldwide secure the network.'
    },
    fullAnswer: {
      ua: {
        summary: 'Безпека Solana тримається на глобальній математиці та консенсусі. Жодна окрема людина, компанія чи банк не може заблокувати або списати ваші кошти без вашого закритого ключа (паролю).',
        analogy: '💡 У банку ключ від сейфу в охоронця банку. У Solana ключ від цифрового сейфу знаходиться ТІЛЬКИ у вас.',
        keyPoints: [
          '2,000+ незалежних валідаторів у десятках країн цілодобово звіряють стан мережі.',
          'Неможливо підробити транзакцію: якщо хтось спробує збрехати, мережа автоматично відхилить запис.',
          'Криптографічний захист приватних ключів.'
        ],
        takeaway: 'Повний контроль над своїми коштами без ризику банкрутства банку.'
      },
      en: {
        summary: 'Solana security is guaranteed by global mathematical consensus. No central authority, corporation, or bank can freeze or seize funds without your private key.',
        analogy: '💡 In a bank, the manager holds the vault key. In Solana, ONLY you hold your mathematical private keys.',
        keyPoints: [
          'Over 2,000+ independent nodes across dozens of countries verify records 24/7.',
          'Fraudulent attempts are mathematically rejected in fractions of a second.',
          'Zero single-point-of-failure risk.'
        ],
        takeaway: 'Uncensorable financial sovereignty with cryptographic guarantees.'
      }
    }
  },
  {
    id: 'fees',
    category: 'fees',
    categoryLabel: { ua: 'Комісії & SOL', en: 'Fees & SOL' },
    icon: 'Percent',
    question: {
      ua: 'Чому комісія складає лише частку цента ($0.00025) і що таке токен SOL?',
      en: 'Why is the fee only a fraction of a cent ($0.00025) and what is SOL?'
    },
    shortAnswer: {
      ua: 'SOL — це паливо мережі. Завдяки високій пропускній здатності витрати на одну операцію мізерні.',
      en: 'SOL is the network fuel. High throughput divides infrastructure costs into minuscule fractions per transaction.'
    },
    fullAnswer: {
      ua: {
        summary: 'У банках комісії сягають $20–$50 за міжнародний переказ через численних посередників. У Solana тисячі транзакцій обробляються щосекунди, тому вартість кожної операції для користувача становить менше 1 копійки.',
        analogy: '💡 Замість найму брокерів і банківських клерків ви платите мізерну частку за кілька ват електрики обчислювального процесора.',
        keyPoints: [
          'Середня комісія: ~$0.00025 (менше 0.01 грн).',
          'Токен SOL використовується для оплати цих мікрокомісій та захисту мережі (стейкінг).',
          'Однакова мінімальна комісія як для $1, так і для $1,000,000.'
        ],
        takeaway: 'Переказ $1,000,000 коштує стільки ж, скільки переказ $1 — мікроценти.'
      },
      en: {
        summary: 'Traditional wire transfers cost $20-$50 because dozens of intermediaries take cuts. In Solana, thousands of transactions process every second, splitting server costs to fractions of a cent.',
        analogy: '💡 Instead of paying branch rent and banker salaries, you pay only the minuscule electrical cost of nanosecond compute power.',
        keyPoints: [
          'Average fee is roughly ~$0.00025.',
          'SOL token pays for computational operations and staking security.',
          'Sending $1,000,000 costs the exact same micro-fee as sending $1.'
        ],
        takeaway: 'Frictionless micro-transactions enabling seamless global commerce.'
      }
    }
  },
  {
    id: 'governance',
    category: 'governance',
    categoryLabel: { ua: 'Контроль', en: 'Governance' },
    icon: 'Layers',
    question: {
      ua: 'Хто контролює Solana, якщо немає генерального директора чи головного офісу?',
      en: 'Who runs Solana if there is no CEO or headquarters?'
    },
    shortAnswer: {
      ua: 'Мережа належить усім учасникам одночасно. Правила задані відкритим програмним кодом.',
      en: 'The network belongs to all participants simultaneously. Rules are enforced by open-source code.'
    },
    fullAnswer: {
      ua: {
        summary: 'Solana — це децентралізована екосистема з відкритим кодом. Розробники по всьому світу покращують код, а валідатори (власники серверів) голосують за оновлення своїми серверами.',
        analogy: '💡 Як і протокол Інтернету (HTTP/IP), мережа не має одного власника — вона працює за погодженими відкритими стандартами.',
        keyPoints: [
          'Код повністю відкритий на GitHub — кожен може його перевірити.',
          'Будь-яка людина у світі може запустити свій вузол або валідатор.',
          'Рішення приймаються відкритим консенсусом спільноти.'
        ],
        takeaway: 'Справжня цифрова демократія без корпоративного диктату.'
      },
      en: {
        summary: 'Solana is an open-source decentralized protocol. Independent developers submit improvements, and thousands of global validators vote on upgrades.',
        analogy: '💡 Just like the Internet protocol (HTTP/IP), no single person owns it; it runs on universal agreed open standards.',
        keyPoints: [
          'Fully open-source code on GitHub accessible for public audit.',
          'Anyone worldwide can run a validator or deploy smart contracts.',
          'Upgrades are ratified by decentralized validator voting.'
        ],
        takeaway: 'True digital democracy governed by transparent mathematics.'
      }
    }
  },
  {
    id: 'compare',
    category: 'compare',
    categoryLabel: { ua: 'Порівняння', en: 'Comparison' },
    icon: 'Cpu',
    question: {
      ua: 'Чим Solana відрізняється від Bitcoin та Ethereum?',
      en: 'How does Solana compare to Bitcoin and Ethereum?'
    },
    shortAnswer: {
      ua: 'Bitcoin — це "цифрове золото" (повільне, але надійне збереження). Ethereum — перший смарт-контрактний комп\'ютер. Solana — швидкісний суперкомп\'ютер для мільйонів людей.',
      en: 'Bitcoin is digital gold (slow store of value). Ethereum is the pioneer smart platform. Solana is a hyper-speed global supercomputer for mass adoption.'
    },
    fullAnswer: {
      ua: {
        summary: 'Bitcoin обробляє лише ~7 транзакцій за секунду, Ethereum — ~15-30 із високими комісіями ($2-$20). Solana створена обробляти десятки тисяч операцій за секунду з фіналізацією за мить.',
        analogy: '💡 Bitcoin — це надійний важкий потяг. Ethereum — міський автобус. Solana — надшвидкісний маглев-експрес.',
        keyPoints: [
          'Solana здатна обробляти 50,000+ транзакцій/сек (TPS).',
          'Комісії в Solana у тисячі разів нижчі, ніж у мережі Ethereum.',
          'Екологічно чиста (Proof of Stake) — споживає менше енергії, ніж кілька пошуків у Google.'
        ],
        takeaway: 'Solana спроектована для щоденного використання у світовій фінансовій системі.'
      },
      en: {
        summary: 'Bitcoin processes ~7 transactions/sec, and Ethereum ~15-30 TPS with noticeable gas fees ($2-$20). Solana was built from the ground up to handle tens of thousands of transactions instantly.',
        analogy: '💡 Bitcoin is a heavy cargo train. Ethereum is a busy city bus. Solana is a futuristic hyper-speed maglev train.',
        keyPoints: [
          'High throughput architecture capable of 50,000+ theoretical TPS.',
          'Sub-penny fees make everyday micro-payments economically viable.',
          'Eco-friendly Proof of Stake: a Solana transaction uses less energy than a couple of Google searches.'
        ],
        takeaway: 'Built for mass adoption and real-time global financial applications.'
      }
    }
  },
  {
    id: 'starter',
    category: 'starter',
    categoryLabel: { ua: 'Старт', en: 'Getting Started' },
    icon: 'Coins',
    question: {
      ua: 'Як зробити перші кроки у світі Solana початківцю?',
      en: 'How does a beginner get started with Solana?'
    },
    shortAnswer: {
      ua: 'Встановіть некастодіальний гаманець (наприклад, Phantom або Solflare) та надійно збережіть 12 слів секретної фрази.',
      en: 'Install a non-custodial wallet (such as Phantom or Solflare) and write down your 12-word seed phrase safely.'
    },
    fullAnswer: {
      ua: {
        summary: 'Вам не потрібні паспорти, довідки чи візити до відділень. Створення гаманця займає 30 секунд. Головне правило: нікому і ніколи не показуйте свої 12 секретних слів (Seed phrase)!',
        analogy: '💡 Секретна фраза — це як універсальний майстер-ключ від вашого особистого сейфу у всесвіті.',
        keyPoints: [
          'Завантажте офіційний додаток Phantom або Solflare.',
          'Запишіть 12 слів на папері (не зберігайте скріншотом у хмарі).',
          'Отримайте свій публічний адрес і спробуйте надіслати перші тестові кошти.'
        ],
        takeaway: 'Ви стаєте єдиним господарем своїх фінансів за лічені секунди.'
      },
      en: {
        summary: 'No paperwork, no passport checks, and no branch appointments required. Creating a self-custody wallet takes under 30 seconds. Golden rule: NEVER share your 12-word recovery seed phrase with anyone!',
        analogy: '💡 Your recovery phrase is the physical master key to your digital universe vault.',
        keyPoints: [
          'Download verified apps like Phantom or Solflare from official sources.',
          'Write the 12 words on offline paper (avoid cloud screenshots).',
          'Copy your public address and experiment with instant transfers.'
        ],
        takeaway: 'You become the sovereign custodian of your money in seconds.'
      }
    }
  }
];

export const SMART_AI_KNOWLEDGE_BASE = [
  {
    keywords: ['швидк', 'speed', 'fast', 'час', 'tps', 'мс', 'ms', 'секунд', '400'],
    response: {
      ua: '⚡ **Швидкість Solana**: Мережа створює нові блоки кожні ~400 мілісекунд завдяки алгоритму **Proof of History (PoH)**. Це дозволяє здійснювати транзакції практично в реальному часі без затримок і черг!',
      en: '⚡ **Solana Speed**: The network produces blocks every ~400 milliseconds using **Proof of History (PoH)**, enabling near-instant global transactions with zero waiting queues!'
    }
  },
  {
    keywords: ['комісі', 'fee', 'ціна', 'cost', 'sol', 'гроші', 'долар', 'цент', '0.00025'],
    response: {
      ua: '💸 **Комісії в Solana**: Середня комісія за переказ або смарт-контракт становить близько **$0.00025** (менше чверті цента). На відміну від банківських комісій у $20-$50, тут сума переказу не впливає на вартість операції.',
      en: '💸 **Solana Fees**: The average fee per transaction is roughly **$0.00025** (a fraction of a cent). Unlike bank wire fees of $20-$50, transfer size has no impact on transaction cost.'
    }
  },
  {
    keywords: ['безпек', 'secure', 'security', 'злам', 'hack', 'крадіжк', 'надійн', 'safe'],
    response: {
      ua: '🛡️ **Безпека**: Мережу Solana цілодобово захищають понад 2,000 незалежних комп\'ютерів (валідаторів) за допомогою криптографічного консенсусу. Ніхто не може заморозити або вкрасти ваші активи без доступу до вашого приватного ключа.',
      en: '🛡️ **Security**: Over 2,000 independent validator computers secure the network 24/7 with cryptographic consensus. No single party can freeze or confiscate assets without your private keys.'
    }
  },
  {
    keywords: ['банк', 'bank', 'порівнян', 'краще', 'різниц', 'diff'],
    response: {
      ua: '🏦 **Solana vs Банки**:\n1. **Швидкість**: 0.4 сек проти 1-3 робочих днів.\n2. **Комісія**: $0.00025 проти $20-$50.\n3. **Доступність**: 24/7/365 без свят і вихідних.\n4. **Контроль**: Ваші кошти належать тільки вам, а не банку.',
      en: '🏦 **Solana vs Traditional Banks**:\n1. **Speed**: 0.4 seconds vs 1-3 business days.\n2. **Fees**: $0.00025 vs $20-$50 wire fees.\n3. **Availability**: 24/7/365 without bank holidays.\n4. **Ownership**: You truly own your funds via private keys.'
    }
  },
  {
    keywords: ['гаманець', 'wallet', 'phantom', 'solflare', 'створит', 'почат', 'start', 'seed'],
    response: {
      ua: '🔑 **Як почати**:\n1. Завантажте **Phantom** або **Solflare**.\n2. Створіть гаманець і запишіть **12 слів секретної фрази** на папері.\n3. Ніколи й нікому не передавайте ці 12 слів!\n4. Отримайте SOL і користуйтеся додатками Web3.',
      en: '🔑 **Getting Started**:\n1. Install a wallet like **Phantom** or **Solflare**.\n2. Create a wallet and write down your **12-word recovery phrase** on paper.\n3. Never share your seed phrase with anyone!\n4. Fund with SOL to interact with the decentralized ecosystem.'
    }
  },
  {
    keywords: ['смарт', 'smart', 'контракт', 'contract', 'код', 'програм', 'defi', 'nft'],
    response: {
      ua: '⚙️ **Смарт-контракти та DeFi**: Це автономні комп\'ютерні програми в мережі Solana, які виконують умови без участі людей і посередників (наприклад, автоматичний обмін валют або видача кредитів під заставу).',
      en: '⚙️ **Smart Contracts & DeFi**: Self-executing decentralized programs that enforce agreements without human intermediaries (e.g., instant token swaps, lending protocols, digital ownership).'
    }
  },
  {
    keywords: ['cf', 'cloudflare', 'worker', 'аі', 'ai', 'інтеграц', 'api', 'підключит'],
    response: {
      ua: '🤖 **Інтеграція з Cloudflare AI Worker**: Цей інтерфейс готовий до підключення вашого Cloudflare Worker AI (наприклад, моделі Llama 3, DeepSeek, Mistral через CF Workers AI)! Ви можете налаштувати власний URL у панелі налаштувань API.',
      en: '🤖 **Cloudflare AI Worker Integration**: This interface is ready for direct connection to your Cloudflare Worker AI endpoint (e.g., Llama 3, DeepSeek, Mistral via CF Workers AI)! You can configure your custom endpoint in settings.'
    }
  }
];
