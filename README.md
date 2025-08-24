# 🌙 Lunar Tracker - Real-time Moon Phase Calendar

A beautiful, interactive web application that tracks real-time moon phases with stunning night sky animations including falling meteors and twinkling stars.

![Lunar Tracker](https://img.shields.io/badge/Moon%20Phase-Tracker-blue?style=for-the-badge&logo=moon)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?style=for-the-badge&logo=vite)

## ✨ Features

- **Real-time Moon Phase Tracking** - Accurate lunar calculations updated automatically
- **Beautiful Night Sky Theme** - Deep cosmic colors with cyan accents
- **Animated Meteor Showers** - Continuous falling meteors with realistic physics
- **Twinkling Star Field** - 150+ animated stars with varied colors and brightness
- **7-Day Forecast** - View upcoming moon phases for the next week
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Interactive UI** - Smooth animations and hover effects

## 🚀 Live Demo

**[View Live Application](https://amarnadhpb.github.io/moon-phase-tracker/)**

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amarnadhpb/moon-phase-tracker.git
   cd moon-phase-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🌟 Customization

### Meteor Speed Adjustment

To change meteor falling speed, edit `src/index.css`:

```css
.animate-meteor {
  animation: meteor 3s linear infinite; /* Change this value */
}

.animate-meteor-fast {
  animation: meteor 2s linear infinite; /* Change this value */
}

.animate-meteor-slow {
  animation: meteor 5s linear infinite; /* Change this value */
}
```

**Speed Options:**
- **Very Fast**: `1s` or `1.5s`
- **Fast**: `2s`
- **Medium**: `3s` (default)
- **Slow**: `5s`
- **Very Slow**: `7s` or `8s`

### Meteor Count

Adjust the number of meteors in `src/App.tsx`:

```tsx
<MeteorField number={40} /> // Change this number
```

### Star Count

Modify star count in `src/components/StarField.tsx`:

```typescript
const stars = Array.from({ length: 150 }, (_, i) => ({ // Change this number
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push your changes to GitHub**
   ```bash
   git add .
   git commit -m "Update moon phase tracker"
   git push origin main
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

The application will be available at: `https://amarnadhpb.github.io/moon-phase-tracker/`

## 📱 Features in Detail

### Moon Phase Display
- **Current Phase**: Shows today's moon phase with accurate age and illumination
- **Visual Representation**: Beautiful moon graphics that change based on lunar cycle
- **Progress Bar**: Visual indicator of moon phase progression

### Animated Backgrounds
- **Meteor Showers**: Realistic falling meteors with glowing trails
- **Star Field**: Twinkling stars with varied sizes and colors
- **Night Sky Theme**: Deep slate and blue gradients for cosmic atmosphere

### Interactive Elements
- **Expandable Forecast**: Click to view next 7 days of moon phases
- **Responsive Cards**: Moon phase cards that adapt to screen size
- **Smooth Animations**: CSS transitions and keyframe animations

## 🔧 Technical Details

- **Moon Calculations**: Accurate astronomical algorithms for lunar phases
- **Performance Optimized**: Efficient animations with CSS transforms
- **Mobile First**: Responsive design that works on all devices
- **TypeScript**: Full type safety and better development experience
- **Modern React**: Uses React 18 features and hooks

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with 🌙 by [Amarnadh](https://github.com/amarnadhpb)**

*Track the moon, explore the cosmos* ✨
