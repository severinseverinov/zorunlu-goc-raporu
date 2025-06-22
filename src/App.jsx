import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Tailwind CSS'in projenize dahil edildiğini varsayıyoruz.
// Genellikle src/index.css dosyasına import edilir.

// Veri merkezi: Tüm metinler ve konfigürasyonlar burada saklanır.
const contentData = {
  migrationProcess: {
    "pre-migration":
      "Savaş, zulüm, şiddet gibi travmatik olaylara maruz kalma. Evini, sevdiklerini ve alıştığı hayatı geride bırakma kararı.",
    "during-migration":
      "Hayati tehlikelerle dolu belirsiz bir yolculuk. Fiziksel ve duygusal zorlanmalar, yolda yaşanan kayıplar.",
    "post-migration":
      "Kültürel şok, dil engeli, ayrımcılık, yoksulluk ve geleceğe dair sürekli kaygı. Yeni topluma adapte olma güçlükleri.",
  },
  psychologicalEffects: [
    {
      title: "Travma Sonrası Stres (TSSB)",
      content:
        "Yaşanan dehşet verici olayların zihinde sürekli yeniden canlanması (flashback), aşırı tetikte olma hali ve travmayı hatırlatan durumlardan kaçınma.",
      icon: "⚡️",
    },
    {
      title: "Kaygı ve Depresyon",
      content:
        "Geleceğe ve sevdiklerinin güvenliğine dair yoğun endişe. Kaybedilen hayat, statü ve sosyal çevre için duyulan derin üzüntü ve umutsuzluk.",
      icon: "☁️",
    },
    {
      title: "Kimlik Krizi",
      content:
        '"Ben artık kimim?" sorusunun getirdiği boşluk hissi. Geçmişteki mesleki ve sosyal rollerin kaybedilmesiyle ortaya çıkar.',
      icon: "🧩",
    },
    {
      title: "Hayatta Kalanın Suçluluğu",
      content:
        'Geride bırakılan aile üyeleri veya arkadaşlar için duyulan suçluluk ve sorumluluk hissi. "Neden ben kurtuldum?" sorusu zihni meşgul eder.',
      icon: "👤",
    },
    {
      title: "Derin Güvensizlik",
      content:
        "Yaşanan ihanetler ve tehlikeler nedeniyle insanlara, kurumlara ve geleceğe karşı geliştirilen, ilişkiler kurmayı zorlaştıran güvensizlik.",
      icon: "🛡️",
    },
    {
      title: "Özel Durum: Uygurlar",
      content:
        "Genel göç travmasına ek olarak, anavatandaki aileleriyle iletişim kuramama, onların akıbetini bilememe ve bir halk olarak kolektif travma yaşama gibi özel zorluklarla yüzleşirler.",
      icon: "🔗",
    },
  ],
  securityAreas: {
    labels: [
      "Psikolojik Güvenlik",
      "Sosyal Güvenlik",
      "Hukuki Güvenlik",
      "Ekonomik Güvenlik",
    ],
    data: [25, 25, 25, 25],
    descriptions: [
      "Geleceğin bir nebze de olsa öngörülebilir olduğuna inanmak. Duygusal olarak kendini güvende hissetmek ve içsel istikrarı sağlamak.",
      "Bir gruba ait hissetmek, toplum tarafından kabul görmek ve ihtiyaç anında başvurulabilecek sosyal destek ağlarına sahip olmak.",
      "Net bir yasal statüye sahip olmak ve temel insan haklarının korunduğunu bilmek. Keyfi uygulamalara karşı güvencede olmak.",
      "Barınma, beslenme gibi temel ihtiyaçları karşılayabilmek ve kendi hayatını idame ettirecek kaynaklara sahip olmak.",
    ],
  },
  copingWays: {
    helpful: [
      "Profesyonel destek almak (Terapi)",
      "Duyguları ifade etmek (Konuşmak, yazmak)",
      "Sosyal bağlar kurmak",
      "Anlamlı rutinler oluşturmak",
      "Manevi ve kültürel bağları korumak",
    ],
    harmful: [
      "Sosyal izolasyon (İçe kapanma)",
      "Duyguları bastırmak (İnkar etme)",
      "Madde kullanımı",
      "Aşırı şüphecilik",
      "Geçmişe saplanıp kalmak",
    ],
  },
  societalSupport: [
    {
      title: "Empati ve Anlayış",
      text: "Yargılamadan önce dinlemek ve anlamaya çalışmak.",
      icon: "💬",
    },
    {
      title: "Ayrımcılıkla Mücadele",
      text: "Yabancı düşmanı söylem ve davranışlara aktif olarak karşı durmak.",
      icon: "🛡️",
    },
    {
      title: "Sosyal Dahil Etme",
      text: "Göçmenleri toplumsal hayata (iş, okul, komşuluk) katmak için fırsatlar yaratmak.",
      icon: "👥",
    },
    {
      title: "Erişilebilir Destek",
      text: "Dil ve kültür bariyerlerini aşan ruh sağlığı ve sosyal hizmetler sunmak.",
      icon: "🛟",
    },
  ],
};

// Bileşen: Gezinme Çubuğu (Navbar)
const Navbar = ({ activeSection }) => {
  const navItems = [
    { id: "goc-travmasi", title: "Göç Travması" },
    { id: "psikolojik-etkiler", title: "Psikolojik Etkiler" },
    { id: "guvenlik", title: "Güvenliği İnşa Etmek" },
    { id: "bas-etme", title: "Baş Etme Yolları" },
    { id: "toplumsal-sorumluluk", title: "Toplumsal Sorumluluk" },
  ];

  const handleMobileNavChange = e => {
    const targetId = e.target.value;
    document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a
          href="#hero"
          className="flex items-center gap-2"
          aria-label="Ana Sayfa"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-3xl text-blue-500 transform -rotate-12 font-sans">
              ∿
            </span>
          </div>
          <span className="text-xl font-bold text-gray-800">Zorunlu Göç</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link text-gray-600 font-medium transition-all duration-300 border-b-2 ${
                activeSection === item.id
                  ? "active text-blue-500 border-blue-500"
                  : "border-transparent"
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <select
            id="mobile-nav"
            onChange={handleMobileNavChange}
            value={`#${activeSection}`}
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {navItems.map(item => (
              <option key={item.id} value={`#${item.id}`}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
};

// Bileşen: Arka plan resimli genel bölüm sarmalayıcısı
const SectionWrapper = ({ id, bgImageUrl, children, className = "" }) => {
  const style = {
    backgroundImage: `linear-gradient(rgba(248, 247, 244, 0.95), rgba(248, 247, 244, 0.95)), url('${bgImageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      id={id}
      style={style}
      className={`py-16 scroll-mt-20 ${className}`}
    >
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
};

// Bileşen: Göç Travması Bölümü
const MigrationTrauma = () => {
  const [activeTab, setActiveTab] = useState(null);
  const tabs = [
    { id: "pre-migration", title: "Göç Öncesi", icon: "🏠" },
    { id: "during-migration", title: "Göç Sırası", icon: "〰️" },
    { id: "post-migration", title: "Göç Sonrası", icon: "❓" },
  ];

  return (
    <SectionWrapper
      id="goc-travmasi"
      bgImageUrl="https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-800">
          Göç Travması Nedir?
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Göç travması, bireyin anavatanını terk etme, tehlikeli bir yolculuk ve
          yeni bir topluma uyum sağlama süreçlerinde yaşadığı çok katmanlı
          psikolojik zorlanmalardır. Bu, tek bir olay değil, derin izler bırakan
          bir süreçtir.
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 -translate-y-1/2 z-0"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="tab-item text-center cursor-pointer p-4"
              >
                <div
                  className={`flex justify-center items-center mx-auto mb-4 w-16 h-16 rounded-full bg-white shadow-lg border-2 text-blue-500 text-3xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <span>{tab.icon}</span>
                </div>
                <h4 className="font-bold text-lg text-gray-800">{tab.title}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md min-h-[120px] flex items-center justify-center">
          <p className="text-gray-600 text-center">
            {activeTab
              ? contentData.migrationProcess[activeTab]
              : "Sürecin aşamaları hakkında bilgi almak için yukarıdaki adımlardan birine tıklayın."}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

// Bileşen: Psikolojik Etkiler Kartı
const EffectCard = ({ effect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="section-card rounded-lg p-6 cursor-pointer bg-white/70 backdrop-blur-sm"
    >
      <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3">
        <span className="text-2xl">{effect.icon}</span>
        <span>{effect.title}</span>
      </h4>
      <div
        style={{ height: isExpanded ? "auto" : "0" }}
        className="overflow-hidden transition-all duration-500"
      >
        <p className="text-gray-600 mt-2">{effect.content}</p>
      </div>
    </div>
  );
};

// Bileşen: Psikolojik Etkiler Bölümü
const PsychologicalEffects = () => (
  <SectionWrapper
    id="psikolojik-etkiler"
    bgImageUrl="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    className="my-0 md:my-16 md:rounded-2xl"
  >
    <div className="text-center mb-12 px-4">
      <h3 className="text-3xl font-bold text-gray-800">
        Yaygın Psikolojik Tepkiler
      </h3>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
        Zorunlu göç, bireyin kimlik, aidiyet ve güven duygularını temelden
        sarsar. Aşağıdaki kartlara tıklayarak en sık görülen psikolojik etkiler
        hakkında daha fazla bilgi edinebilirsiniz.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {contentData.psychologicalEffects.map(effect => (
        <EffectCard key={effect.title} effect={effect} />
      ))}
    </div>
  </SectionWrapper>
);

// Bileşen: Güvenlik İnşası Bölümü
const RebuildingSecurity = () => {
  const chartRef = useRef(null);
  const [info, setInfo] = useState({
    title: "Güvenlik Alanları",
    text: "Grafiğin bir bölümünün üzerine gelerek açıklamasını burada görebilirsiniz.",
  });

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: contentData.securityAreas.labels,
          datasets: [
            {
              data: contentData.securityAreas.data,
              backgroundColor: ["#3B82F6", "#10B981", "#F97316", "#8B5CF6"],
              borderColor: "transparent",
              borderWidth: 4,
              hoverBorderColor: "#fff",
              hoverBorderWidth: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          onHover: (event, chartElement) => {
            if (chartElement.length) {
              const index = chartElement[0].index;
              setInfo({
                title: contentData.securityAreas.labels[index],
                text: contentData.securityAreas.descriptions[index],
              });
            } else {
              setInfo({
                title: "Güvenlik Alanları",
                text: "Grafiğin bir bölümünün üzerine gelerek açıklamasını burada görebilirsiniz.",
              });
            }
          },
        },
      });
      return () => chartInstance.destroy(); // Cleanup
    }
  }, []);

  return (
    <SectionWrapper
      id="guvenlik"
      bgImageUrl="https://images.pexels.com/photos/3239649/pexels-photo-3239649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-800">
          Sürgünde Güvenliği Yeniden İnşa Etmek
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Güvenlik sadece fiziksel tehlikenin olmaması değildir. Bireyin yeniden
          kök salabilmesi için dört temel alanda güvenliğin sağlanması gerekir.
          Grafik üzerinde gezinerek bu alanların ne anlama geldiğini keşfedin.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md min-h-[250px] flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-center text-blue-500">
              {info.title}
            </h4>
            <p className="mt-4 text-gray-600 text-center">{info.text}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

// ... Diğer bileşenler ve App bileşeni aşağıda devam ediyor.

// Bileşen: Baş etme Yolları Bölümü
const CopingStrategies = () => (
  <SectionWrapper
    id="bas-etme"
    bgImageUrl="https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    className="my-0 md:my-16 md:rounded-2xl"
  >
    <div className="text-center mb-12 px-4">
      <h3 className="text-3xl font-bold text-gray-800">
        Faydalı ve Zararlı Baş Etme Yolları
      </h3>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
        Travma ile başa çıkma sürecinde seçilen yollar, iyileşmeyi
        hızlandırabilir veya engelleyebilir.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 rounded-lg bg-green-50/80 backdrop-blur-sm border-l-4 border-green-500">
        <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
          <span className="text-3xl mr-3">👍</span> Faydalı Yollar
        </h4>
        <ul>
          {contentData.copingWays.helpful.map(item => (
            <li
              key={item}
              className="text-green-800 mb-2 pl-4 relative font-medium"
            >
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 rounded-lg bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500">
        <h4 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
          <span className="text-3xl mr-3">👎</span> Zararlı Yollar
        </h4>
        <ul>
          {contentData.copingWays.harmful.map(item => (
            <li
              key={item}
              className="text-red-800 mb-2 pl-4 relative font-medium"
            >
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

// Bileşen: Toplumsal Sorumluluk Bölümü
const SocietalResponsibility = () => (
  <SectionWrapper
    id="toplumsal-sorumluluk"
    bgImageUrl="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  >
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold text-gray-800">
        Toplumsal Sorumluluk ve Destek
      </h3>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
        Ev sahibi toplum olarak bize de önemli görevler düşüyor. Empati, anlayış
        ve kapsayıcılık, iyileşme sürecinde hayati bir rol oynar.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {contentData.societalSupport.map(item => (
        <div
          key={item.title}
          className="section-card bg-white/70 rounded-lg p-6 text-center flex flex-col items-center"
        >
          <div className="text-4xl text-blue-500 mb-4">{item.icon}</div>
          <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
          <p className="text-gray-600 mt-2 flex-grow">{item.text}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

// Ana Uygulama Bileşeni
export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("id"));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 antialiased">
      <Navbar activeSection={activeSection} />
      <main>
        <section
          id="hero"
          style={{
            backgroundImage: `linear-gradient(rgba(248, 247, 244, 0.92), rgba(248, 247, 244, 0.92)), url('https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
          className="text-center py-24 bg-cover bg-center"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Zorunlu Göçün Psikolojik Etkileri
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Yeni bir yerde güvenlik duygusunu yeniden kurmanın zorlu
              yolculuğunu anlamak için bu interaktif raporu keşfedin.
            </p>
          </div>
        </section>
        <MigrationTrauma />
        <PsychologicalEffects />
        <RebuildingSecurity />
        <CopingStrategies />
        <SocietalResponsibility />
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="font-bold text-lg">Dayanıklılık ve Umut</p>
          <p className="mt-2 max-w-2xl mx-auto text-gray-400">
            Doğru bireysel çabalar ve toplumsal destekle, bireylerin yeniden kök
            salması, iyileşmesi ve yeni hayatlarında anlam bulması mümkündür.
          </p>
        </div>
      </footer>
    </div>
  );
}
