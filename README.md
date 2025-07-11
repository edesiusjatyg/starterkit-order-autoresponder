# Starter-Kit Web Order + Autoresponder (Next.js + n8n)

🚀 A ready-to-use starter kit for building a simple product/service order system with WhatsApp autoresponder – perfect for small businesses, freelancers, and digital sellers.

Built with:
- ⚡️ Next.js (frontend + API)
- 🧩 n8n (automation / WhatsApp autoresponder)
- 🗃 Google Sheets (order storage)

---

## ✨ Features

- Responsive, fast-loading landing page
- Product/service order form (Name, WhatsApp, Product, Notes)
- Integration with n8n webhook
- WhatsApp autoresponder via API
- Optional: Save to Google Sheets

---

## 📸 Demo

> Live demo & screenshots coming soon

---

## 📦 How to Use

### 1. Deploy Frontend (Next.js)

```bash
git clone https://github.com/yourusername/starter-kit-order-autoresponder.git
cd starter-kit-order-autoresponder
npm install
```
- Create `.env` if needed
- Deploy to [Vercel](https://vercel.com) (Free)

---

### 2. Setup n8n Automation

- Import provided workflow JSON:  
  `n8n/workflows/order-autoresponder.json`
- Connect your WhatsApp API
- Set Webhook URL in:  
  `pages/api/order.ts`

---

### 3. Google Sheets Integration (Optional)

- Connect Google Sheets via **n8n node**
- Add a new row on each order submission

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [n8n](https://n8n.io/)
- [Google Sheets](https://www.google.com/sheets/about/)

---

## 📄 License

**MIT** — feel free to use, customize, and build upon.

---

## 🙌 Support / Setup Help

Want this done-for-you or need help integrating with your product?

📩 DM me on Instagram: [@edsgiovanni](https://instagram.com/edsgiovanni)  
