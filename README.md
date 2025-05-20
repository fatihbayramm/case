# User Management React App

Bu proje, kullanıcı yönetimi için geliştirilmiş modern bir React uygulamasıdır. Kullanıcılar listelenebilir, eklenebilir, düzenlenebilir ve silinebilir. Uygulama, hem sahte bir API (dummyjson.com) hem de localStorage ile çalışır.

## Kullanılan Teknolojiler

- **React** (Vite ile hızlı geliştirme)
- **React Router** (Sayfa yönlendirme)
- **Reactstrap & Bootstrap** (Modern ve responsive arayüz)
- **Axios** (API istekleri için)
- **LocalStorage** (Yeni eklenen kullanıcıların kalıcı olarak saklanması)
- **react-icons** (İkonlar için)

## Temel Özellikler

- Kullanıcıları listeleme (API ve localStorage birleştirilmiş şekilde)
- Kullanıcı ekleme (form ile, localStorage'a kaydedilir)
- Kullanıcı düzenleme (API'deki veya localStorage'daki kullanıcılar)
- Kullanıcı silme (API ve localStorage'dan silme desteği)
- Detay sayfası (tab yapısı ile kişisel, iletişim, şirket ve banka bilgileri)
- Responsive ve sabit header
- Sayfalama (pagination)

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Uygulamayı tarayıcıda açın: [http://localhost:5173](http://localhost:5173)

## Notlar

- Yeni eklenen kullanıcılar sadece localStorage'da saklanır, API'ye yazılmaz.
- Detay sayfası, önce localStorage'da kullanıcıyı arar, bulamazsa API'den çeker.
- Silme ve güncelleme işlemleri hem API hem localStorage üzerinde çalışır.

---

Kısa, modern ve teknik olarak güncel bir kullanıcı yönetim paneli örneğidir.
