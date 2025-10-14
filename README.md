# Pak Wattan School & College of Sciences - Modern Frontend

A modern, responsive website built with Next.js 14, React 18, TypeScript, and Tailwind CSS for Pak Wattan School & College of Sciences.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, React 18, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built-in SEO with Next.js metadata API
- **Performance**: Optimized images, lazy loading, and modern web standards
- **Accessibility**: WCAG compliant components
- **Animations**: Smooth transitions and micro-interactions

## 📁 Project Structure

```
PakWattanModern/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Site footer
│   ├── home/             # Home page components
│   │   ├── HeroSection.tsx
│   │   ├── TopNews.tsx
│   │   ├── BreakingNews.tsx
│   │   ├── WelcomeMessage.tsx
│   │   ├── DiscoverWonders.tsx
│   │   ├── Achievements.tsx
│   │   ├── NewsAndEvents.tsx
│   │   └── ... (other components)
│   └── Analytics.tsx     # Google Analytics
├── public/               # Static assets
│   ├── images/          # Images and media
│   └── files/           # Other static files
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "E:\Cursor AI\PakWattanModern"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Secondary**: Gray tones (#f8fafc to #0f172a)
- **Accent**: Yellow/Gold tones (#fefce8 to #713f12)

### Typography
- **Headings**: Josefin Sans (600, 700)
- **Body**: Inter (300, 400, 500, 600, 700)

### Components
- **Buttons**: Primary, Secondary, Accent variants
- **Cards**: Hover effects and shadows
- **Animations**: Fade, slide, and scale transitions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color palette
- Custom fonts
- Animation keyframes
- Responsive utilities

### Next.js
Configuration in `next.config.js`:
- Image optimization
- API rewrites to backend
- Performance optimizations

## 📄 Pages Structure

### Home Page (`/`)
- Hero section with video background
- Breaking news ticker
- Quick access navigation
- Welcome message
- School wings overview
- Achievements counter
- News and events
- Footer CTA

### Planned Pages
- `/about` - About Us page
- `/admission` - Admission information
- `/scholarships` - Scholarship details
- `/facilities` - School facilities
- `/contact` - Contact information
- `/talent-hunt` - Talent Hunt program

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## 🔗 Backend Integration

The frontend is configured to work with your existing ASP.NET MVC backend:
- API calls will be proxied to `http://localhost:5000/api/`
- Images and static files from the original project
- Maintains existing functionality while providing modern UI

## 📞 Support

For questions or support, contact:
- **Email**: pakwattan2020@gmail.com
- **Phone**: 0318 0821377

## 📝 License

All rights reserved by Pak Wattan School & College of Sciences.