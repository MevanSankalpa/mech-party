# Zynentia - 20th Batch Mechanical Engineering Graduation Party 🎉⚙️

The official website for the graduation party of the 20th batch of the Department of Mechanical Engineering, University of Moratuwa.

## Event Details

- **Event**: Zynentia
- **Date**: 14th March 2026
- **Venue**: Water's Edge Hotel
- **Department**: Mechanical Engineering, University of Moratuwa

## Features

- 🎨 Modern, dark-themed design with smooth animations
- ⚙️ Animated gear loader (representing mechanical engineering)
- 📱 Fully responsive (mobile and desktop)
- 🎫 Interactive ticket recommendation chatbot
- 💾 Local Storage integration for user preferences
- 🎭 Multiple event showcases
- 🍽️ Benefits and ticket pricing display
- 📝 Google Form integration for ticket purchases
- ⚡ Fast performance with Vite
- 🎬 Smooth animations with Framer Motion

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **Routing**: React Router DOM 7
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MevanSankalpa/mech-party.git
cd mech-party
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── Loader.jsx
│   │   ├── Hero.jsx
│   │   ├── HotelShowcase.jsx
│   │   ├── Events.jsx
│   │   ├── Benefits.jsx
│   │   ├── Tickets.jsx
│   │   └── TicketRecommendation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── PurchaseForm.jsx
│   ├── utils/
│   │   └── ticketLogic.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/  # GitHub Actions
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Ticket Types

1. **Normal Single Person** - Rs 11,000 (Early Bird: Rs 9,900)
2. **Normal Single Person with Liquor** - Rs 12,500 (Early Bird: Rs 11,500)
3. **Couple** - Rs 20,000 (Early Bird: Rs 19,000)
4. **Couple with Liquor** - Rs 22,000 (Early Bird: Rs 21,000)

## Events & Activities

- 360 photo and videography 📸
- Live photo booth 📷
- Live acoustic band experience 🎸
- Costume Competition 👔
- Raffle draw 🎁
- Fun activities 🎉

## Benefits Included

- Welcome drink and premium dinner buffet 🍽️
- Unlimited liquor 🍹
- Unlimited bites 🍕

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To manually deploy:
```bash
npm run deploy
```

The site will be available at: `https://MevanSankalpa.github.io/mech-party/`

## Customization

### Updating Images

Replace placeholder images in the components:
- `HotelShowcase.jsx` - Update the `images` array with actual venue photos
- Add custom images to the `public` folder

### Updating Google Form

In `PurchaseForm.jsx`, replace the placeholder with your actual Google Form embed code:
1. Create your Google Form
2. Click "Send" → "Embed HTML"
3. Copy the iframe code
4. Replace the placeholder div with the iframe

### Updating Event Details

Modify content in the respective component files:
- `Hero.jsx` - Event name, date, venue
- `Events.jsx` - Event activities
- `Benefits.jsx` - What attendees get
- `Tickets.jsx` - Ticket types and pricing

## Local Storage

The app stores ticket recommendations in browser Local Storage with the following schema:

```javascript
{
  "ticketRecommendation": {
    "drinks": boolean,
    "hasPartner": boolean,
    "drinksWithPartner": boolean | null,
    "recommendedTicket": string,
    "timestamp": number
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private event website for the 20th batch of Mechanical Engineering, University of Moratuwa.

## License

All rights reserved © 2026 Department of Mechanical Engineering, University of Moratuwa

---

Made with ❤️ for the 20th batch by the organizing committee 🎓⚙️

