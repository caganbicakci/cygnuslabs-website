# 404 Hatası Kontrol Listesi (GitHub Pages)

Site 404 veriyorsa aşağıdakileri sırayla kontrol et.

---

## 1. Hangi adresi açıyorsun?

- **Özel domain:** https://cygnuslabs.ai  
- **GitHub adresi:** https://caganbicakci.github.io/cygnuslabs-website  

Repo adı `cygnuslabs-website` ise GitHub’daki adres mutlaka **/cygnuslabs-website** ile biter.  
Sadece `https://caganbicakci.github.io` yazarsan 404 normal (ana site değil, proje sitesi).

---

## 2. GitHub Pages açık mı?

1. Repo’da **Settings** → **Pages**
2. **Source:** “Deploy from a branch” seçili olsun
3. **Branch:** `main` (veya kullandığın branch), **Folder:** `/ (root)`
4. **Save**

Birkaç dakika bekle; üstte yeşil kutuyla “Your site is live at ...” yazacak.

---

## 3. Repo herkese açık mı?

Ücretsiz hesaplarda GitHub Pages sadece **public** repo’larda çalışır.  
Repo **Private** ise: ya **Public** yap ya da GitHub Pro ile private repo desteğini kullan.

---

## 4. Özel domain (cygnuslabs.ai) kullanıyorsan – DNS

CNAME dosyası `cygnuslabs.ai` içeriyor; domain’in DNS’i GitHub’a yönelmeli.

**Domain sağlayıcında (Cloudflare, Namecheap, vs.):**

| Tip  | Name / Host | Value / Target        |
|------|-------------|------------------------|
| A    | @           | 185.199.108.153        |
| A    | @           | 185.199.109.153        |
| A    | @           | 185.199.110.153        |
| A    | @           | 185.199.111.153        |
| CNAME| www         | caganbicakci.github.io |

(GitHub’ın güncel IP’leri için: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

**GitHub’da:** Settings → Pages → **Custom domain** kısmına `cygnuslabs.ai` yazıp **Save**.  
DNS yayılması 5 dakika – 48 saat sürebilir.

---

## 5. Son push’tan sonra süre

Push’tan sonra 1–2 dakika bekleyip tekrar dene. Bazen deploy gecikmesi 404 gibi görünür.

---

## 6. Hâlâ 404 ise

- **GitHub adresi** çalışıyorsa (caganbicakci.github.io/cygnuslabs-website) sorun büyük ihtimalle **domain / DNS** veya **Custom domain** ayarındadır.
- **GitHub adresi de 404** ise sorun **Pages ayarı** veya **repo adı/branch** ile ilgilidir; yukarıdaki 2 ve 3’ü tekrar kontrol et.
