export type CalloutSide = "left" | "right" | "top" | "bottom";

export type Callout = {
  id: string;
  title: string;
  description: string;
  localAnchor: [number, number, number];
  preferredSide: CalloutSide;
  screenOffset: [number, number];
  screenPosition: [number, number];
};

export const callouts: Callout[] = [
  {
    id: "about",
    title: "Hakkımızda",
    description:
      "Kagu Ltd., 2022 yılında Yasin Höke ve Ahmet Can Gültekin ortaklığında kurulmuş; KKTC genelinde iklimlendirme, ısıtma, havalandırma ve mekanik taahhüt alanlarında hizmet veren dinamik bir teknik çözüm firmasıdır. Kendi bünyesindeki çevik ekibi, yüksek saha refleksi ve işi sonuçlandırma disipliniyle, sektörde fark yaratan, geleceğe dönük ve güvenilir çözümler üretmeyi hedefler.",
    localAnchor: [0.35, -0.44, 2.44],
    preferredSide: "left",
    screenOffset: [-411, 260],
    screenPosition: [156, 790],
  },
  {
    id: "air-conditioning",
    title: "Klima Sistemleri",
    description:
      "Kagu Ltd., merkezi klima sistemlerinden split, multi ve VRF çözümlerine kadar farklı ölçeklerdeki projeler için doğru mühendislik, kaliteli ürün seçimi ve uzman uygulama desteği sunar. Projenin ihtiyacına göre kapasite analizi, cihaz seçimi, montaj planlaması ve devreye alma süreçlerini titizlikle yönetir; güçlü marka seçenekleri ve esnek ticari yapısıyla yatırımınızı güvenli, verimli ve sürdürülebilir bir çözüme dönüştürür.",
    localAnchor: [0.35, 0.08, 2.72],
    preferredSide: "left",
    screenOffset: [-336, -4],
    screenPosition: [203, 309],
  },
  {
    id: "heating",
    title: "Dekoratif Radyatör, Petek & Yerden Isıtma Sistemleri",
    description:
      "Evinizin ısıtma sistemini yalnızca teknik bir ihtiyaç değil, yaşam konforunun önemli bir parçası olarak ele alıyoruz. Standart panel radyatörlerden dekoratif alüminyum petek çözümlerine, modern yerden ısıtma sistemlerinden mekâna özel mühendislik uygulamalarına kadar, yaşam alanınız için en doğru ve verimli ısıtma altyapısını tasarlıyoruz. Doğru ürün seçimi, hassas uygulama ve özenli montajla; en soğuk kış günlerinde sıcak, estetik ve dengeli bir konfor deneyimi sunuyoruz.",
    localAnchor: [0.35, 0.52, 0.96],
    preferredSide: "top",
    screenOffset: [-528, -226],
    screenPosition: [520, 150],
  },
  {
    id: "heat-pump",
    title: "Isı Pompası & Kullanım Sıcak Suyu",
    description:
      "Isı pompası sistemleri, modern yapıların enerji verimliliği ve konfor beklentilerine cevap veren en güçlü teknolojilerden biridir. Kagu Ltd.; mekanik oda tasarımından boyler ve buffer tank entegrasyonuna, ekipman seçiminden devreye alma sürecine kadar tüm sistemi mühendislik bakışıyla ele alır. Güçlü deneyimimiz ve çözüm odaklı yaklaşımımızla, projelerinize uzun ömürlü, verimli ve güvenilir sıcak su ve iklimlendirme altyapısı kazandırıyoruz.",
    localAnchor: [0.35, 0.58, -0.16],
    preferredSide: "top",
    screenOffset: [0, -226],
    screenPosition: [960, 145],
  },
  {
    id: "solar",
    title: "Solar Enerji Sistemleri",
    description:
      "KKTC’nin yüksek güneş enerjisi potansiyelini, doğru mühendislik ve kaliteli uygulama anlayışıyla sürdürülebilir enerji çözümlerine dönüştürüyoruz. Kagu Ltd.; solar enerji sistemlerinde keşif, sistem tasarımı, ürün seçimi, montaj, devreye alma ve evrak takip süreçlerini bütüncül şekilde yönetir. Yenilenebilir enerjinin gücünü, çözüm odaklı yaklaşım ve uygulama kalitesiyle birleştirerek, ev ve işletmeler için verimli, güvenilir ve uzun ömürlü enerji altyapıları sunuyoruz.",
    localAnchor: [0.35, 0.52, -1.34],
    preferredSide: "top",
    screenOffset: [47, -48],
    screenPosition: [1400, 156],
  },
  {
    id: "ventilation",
    title: "Havalandırma Sistemleri",
    description:
      "Klima santralleri, ısı geri kazanım cihazları, havuz nem alma santralleri ve taze hava sistemlerinde projeye özel havalandırma çözümleri sunuyoruz. Doğru mühendislik, güçlü çözüm partnerleri, kaliteli üreticiler ve özenli uygulama anlayışıyla sağlıklı, verimli ve güvenilir hava konforu sağlıyoruz.",
    localAnchor: [0.35, 0.04, -2.55],
    preferredSide: "right",
    screenOffset: [285, 94],
    screenPosition: [1702, 275],
  },
  {
    id: "water-systems",
    title: "Arıtma, Havuz & Pompa Sistemleri",
    description:
      "Su arıtma, havuz mekaniği, hidrofor ve pompa sistemlerinde; ev tipi ve endüstriyel ihtiyaçlara uygun, güvenilir ve uzun ömürlü çözümler sunuyoruz. Kaliteli ürün seçimi, doğru mühendislik ve özenli uygulama ile suyun verimli, güvenli ve kesintisiz yönetilmesini sağlıyoruz.",
    localAnchor: [0.35, -0.36, -2.5],
    preferredSide: "right",
    screenOffset: [167, 265],
    screenPosition: [1714, 756],
  },
];
