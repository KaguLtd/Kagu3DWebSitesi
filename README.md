# Kagu 3D Web Sitesi

Kagu Ltd. için React, Vite, TypeScript ve React Three Fiber ile hazırlanmış tek ekran, fixed viewport 3D arayüzdür. Uygulama landing page değildir; sahne `100vw` ve `100dvh` içinde kalır, scroll kullanılmaz.

## Kurulum

```bash
npm install
```

## Production Build

```bash
npm run build
```

Build çıktısı `dist/` klasörüne yazılır. Vite build, React, Three/R3F/Drei, Framer Motion ve ikon bağımlılıklarını ayrı production chunk'lara bölecek şekilde yapılandırılmıştır.

## Deployment

Sunucuda Nginx doğrudan `dist/` klasörünü servis eder. Bu projede production için `npm run start` kullanılmaz.

Sunucuda güncelleme akışı:

```bash
npm install
npm run build
sudo systemctl reload nginx
```

Nginx veya server config değişiklikleri bu repoda tutulmaz; frontend çıktısı build edildikten sonra `dist/` klasörü servis edilir.

## Geliştirme

```bash
npm run dev
```

Yerel geliştirme için Vite dev server kullanılır. Production doğrulaması için her değişiklikten sonra `npm run build` çalıştırılmalıdır.
