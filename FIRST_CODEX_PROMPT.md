# FIRST CODEX PROMPT - Use this first

Bu repo için önceki landing page yaklaşımını unut. Bu proje scroll edilen klasik bir web sitesi değil.

PROJECT_BRIEF.md, AGENTS.md, KAGU_CONTENT.md ve CODEX_TASKS.md dosyalarını oku.

İstenen ürün:
Kagu Ltd. için tek ekran, sabit viewport, premium/futuristik bir 3D klima arayüzü.

Kesin kurallar:
1. Sayfa scroll etmeyecek.
2. html, body, #root overflow hidden olacak.
3. App 100vw x 100dvh olacak.
4. Footer, services section, process section, uzun landing page blokları olmayacak.
5. Ortada büyük ve düzgün merkezlenmiş 3D split klima iç ünitesi olacak.
6. Klima sadece sınırlı dönebilecek:
   - yukarı/aşağı: maksimum 10 derece
   - sağ/sol: maksimum 20 derece
   - 360 derece dönüş olmayacak.
7. Klimanın noktalarından çıkan oklar HTML bilgi kutularına bağlanacak.
8. Bilgi kutuları Canvas içi text değil, gerçek 2D HTML overlay olacak.
9. Bilgi kutuları 3D model dönerken modeldeki anchor noktalarını takip edecek.
10. Kutulara tıklanınca ilgili kutu öne gelecek, sabitlenecek ve okunabilir hale gelecek.
11. Kutuların metinleri şimdilik placeholder olacak:
    - Başlık
    - Açıklama metni sonradan girilecek.
12. Görsel dil sade, lüks, premium, futuristik ve Kagu renk paletine uygun olacak.

İlk görev:
Sadece fixed viewport proje iskeletini kur.

Yapılacaklar:
- React + Vite + TypeScript kurulumu
- Tailwind kurulumu
- three, @react-three/fiber, @react-three/drei, framer-motion, lucide-react bağımlılıkları
- html/body/#root overflow hidden
- tek ekran App shell
- koyu premium arka plan
- küçük Kagu Ltd. marka alanı
- 3D sahne için merkezde placeholder alan
- scroll yaratacak hiçbir bölüm yok
- npm run build çalıştır ve hataları düzelt

Henüz tüm callout/projection sistemini yapma. Önce doğru sabit ekran temelini kur.
