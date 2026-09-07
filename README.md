# GetGo Taxi (getgotaxi.online)

> **Official Data Repository & Platform for `getgotaxi.online`**  
> Migrated and structured from legacy `www.micabsandtours.in` (MI Cabs and Tours).  
> Configured for GitHub hosting (GitHub Pages or Custom Static/React Hosting).

---

## 1. Quick Operations & Contacts
- **Brand Name:** GetGo Taxi
- **Target Domain:** [https://getgotaxi.online](https://getgotaxi.online)
- **Legacy Source:** `www.micabsandtours.in`
- **Operations Manager:** Prakash M
- **24/7 Hotline & WhatsApp:** +91 90801 51265
- **Email:** info@getgotaxi.online (legacy: info@micabsandtours.in)
- **Registered Address:** 3/139 Varakuttaipalayam, Ugayanur, Tiruppur, Tamil Nadu 641605, India
- **Coordinates:** 11.2919° N, 77.3522° E

---

## 2. Structured Data Architecture
All business data has been extracted, verified, and mapped into clean TypeScript interfaces and JSON files:

- **TypeScript Definitions:** `/src/types.ts`
- **Master Data Module:** `/src/data/getgoData.ts`
- **Direct Static JSON API:** `/public/getgotaxi_data.json` (accessible via `https://getgotaxi.online/getgotaxi_data.json`)

---

## 3. Pricing Maths & Tariff Models

### Local Hourly Rental Packages
| Vehicle Class | 4 Hrs (40 KM) | 8 Hrs (80 KM) | 10 Hrs (100 KM) | 12 Hrs (120 KM) | Extra KM Rate | Extra Time Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AC Sedan (Dzire/Etios)** | ₹1,128 | ₹2,128 | ₹2,628 | ₹3,128 | ₹14–17 / km | ₹2 / min (₹120/hr) |
| **Toyota Innova / SUV** | ₹2,000 | ₹3,600 | ₹4,200 | ₹4,800 | ₹15–17 / km | ₹250–300 / hr |
| **Tempo Traveller (12s)** | ₹2,400 | ₹4,500 | ₹5,250 | ₹6,000 | ₹22 / km | ₹650 / hr |
| **Mini Bus (25s)** | ₹3,500 | ₹6,500 | ₹7,800 | ₹8,800 | ₹25 / km | ₹800 / hr |

### Outstation Per-KM Pricing
- **Sedan:** ₹12 / KM (Min 250 km/day, Driver Bata ₹400/day, Night allowance ₹300)
- **Innova / SUV:** ₹16 / KM (Min 300 km/day, Driver Bata ₹500/day, Night allowance ₹350)
- **Tempo Traveller:** ₹22 / KM (Min 300 km/day, Driver Bata ₹700/day, Night allowance ₹400)
- **Mini Bus:** ₹25 / KM (Min 350 km/day, Driver Bata ₹800/day, Night allowance ₹500)

**Outstation Math Formula:**
$$\text{Total Fare} = \max(\text{Actual KM}, \text{Min KM/Day} \times \text{Days}) \times \text{Per KM Rate} + (\text{Driver Bata} \times \text{Days}) + (\text{Night Allowance} \times \text{Nights})$$

---

## 4. Tour Packages Catalog (11 Itineraries)
1. **Ooty & Coonoor (Queen of Nilgiris)** - 2 Days / 1 Night (180 km RT)
2. **Munnar (Tea Hills & Waterfalls)** - 3 Days / 2 Nights (340 km RT)
3. **Kodaikanal (Princess of Hill Stations)** - 3 Days / 2 Nights (360 km RT)
4. **Wayanad (Mist & Waterfalls)** - 3 Days / 2 Nights (440 km RT)
5. **Coorg & Abbey Falls** - 3 Days / 2 Nights (650 km RT)
6. **Mysore & Srirangapatna Heritage** - 2 Days / 1 Night (420 km RT)
7. **Tirupati Balaji Darshan** - 2 Days / 1 Night (980 km RT)
8. **Rameswaram & Dhanushkodi** - 2 Days / 1 Night (880 km RT)
9. **Madurai Temple Tour** - 1 Day / Same Day (450 km RT)
10. **Valparai & Sholayar Dam (40 Hairpins)** - 2 Days / 1 Night (240 km RT)
11. **Isha Yoga Center & 112ft Adiyogi** - Half Day / 1 Day (70 km RT)

---

## 5. Deploying to GitHub Pages with Custom Domain `getgotaxi.online`

1. **Initialize Git Repository:**
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: GetGo Taxi structured platform"
   git branch -M main
   git remote add origin https://github.com/<your-github-user>/<repo-name>.git
   git push -u origin main
   \`\`\`

2. **Custom Domain (CNAME):**
   Ensure `public/CNAME` contains:
   \`\`\`
   getgotaxi.online
   \`\`\`

3. **Configure DNS Records:**
   In your DNS provider (e.g. Cloudflare, GoDaddy, Namecheap):
   - **A Records** for `getgotaxi.online` pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record** for `www` pointing to `<your-github-user>.github.io`

4. **Activate GitHub Pages:**
   - Go to your GitHub repository **Settings** → **Pages**
   - Source: **GitHub Actions** or **Deploy from a branch** (`gh-pages` or `main/dist`)
   - Custom domain: `getgotaxi.online`
   - Check **Enforce HTTPS**
