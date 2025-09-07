# Drawesh Kumar Yadav - Portfolio

A modern, responsive 3D portfolio website built with React, TypeScript, and Framer Motion featuring smooth animations, dark/light mode toggle, and Supabase backend integration.

## 🚀 Features

- **Modern 3D Animations**: Powered by Framer Motion with smooth transitions and interactive elements
- **Responsive Design**: Optimized for all device sizes from mobile to desktop  
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Backend Integration**: Supabase for contact forms, analytics, and admin dashboard
- **Performance Optimized**: Fast loading with optimized animations and assets
- **Accessibility**: WCAG compliant with proper focus management and screen reader support
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom CSS animations
- **Animations**: Framer Motion (Motion)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives with custom Shadcn/ui components
- **Backend**: Supabase (Database, Auth, Storage, Edge Functions)
- **Build Tool**: Vite with HMR and optimized bundling
- **Deployment**: Vercel (recommended) or Netlify

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/drawesh/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for backend features)
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser** → `http://localhost:3000`

## 🚀 Deployment

### Quick Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/drawesh/portfolio)

### Manual Deployment
```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

See [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) for detailed deployment guide.

## 📱 Portfolio Sections

1. **🎯 Hero Section** - Animated introduction with 3D name effects and blur-to-clear animation
2. **👨‍💻 About Section** - Personal background, education, and statistics with interactive elements
3. **⚡ Skills Section** - Technical skills with animated progress bars and hover effects
4. **🏆 Certifications** - Professional certifications and achievements with verification links
5. **💼 Projects** - Personal project showcase with GitHub integration and live demos
6. **🏢 Business Projects** - Professional work experience and enterprise solutions
7. **📞 Contact** - Interactive contact form with Supabase backend integration and analytics

## 🎨 Key Features

### ✨ Enhanced Animations
- Blur-to-clear name reveal animation
- 3D hover effects on cards and buttons
- Particle systems and floating geometric shapes
- Smooth scroll progress indicator
- Interactive cursor followers (desktop)

### 🎯 Modern UI/UX
- Glass morphism effects
- Gradient borders and backgrounds
- Responsive grid layouts
- Touch-friendly mobile interface
- Accessibility-first design

### 📊 Analytics & Monitoring
- Visitor tracking and statistics
- Contact form submission analytics
- Performance monitoring
- Backend status indicators

## 🛠️ Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - TypeScript type checking

## 🎨 Customization

### Personal Information
Update these components with your details:
- `components/HeroSection.tsx` - Name, title, and introduction
- `components/AboutSection.tsx` - Background and personal stats  
- `components/ProjectsSection.tsx` - Portfolio projects
- `components/ContactSection.tsx` - Contact information

### Styling  
- `styles/globals.css` - Global styles and CSS variables
- Tailwind utility classes throughout components
- Custom animations and effects

### Content
- Replace with your actual projects and achievements
- Update social media links and contact information
- Customize color schemes and branding

## 📄 Project Structure

```
portfolio/
├── components/           # React components
│   ├── ui/              # Reusable UI components (Shadcn)
│   ├── HeroSection.tsx  # Landing page hero
│   ├── AboutSection.tsx # About me section
│   └── ...              # Other sections
├── styles/              # Global CSS and Tailwind config
├── supabase/            # Backend functions and database
├── utils/               # Utility functions and helpers
├── public/              # Static assets
└── ...                  # Config files
```

## 🚦 Performance

This portfolio is optimized for:
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Excellent LCP, FID, and CLS
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Sub-second initial page load

## 🤝 Contributing

Feel free to fork this project for your own portfolio! If you find bugs or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Email**: drawesh2001@gmail.com
- **GitHub**: [github.com/drawesh](https://github.com/drawesh)  
- **LinkedIn**: [linkedin.com/in/drawesh-kumar-yadav](https://www.linkedin.com/in/drawesh-kumar-yadav/)
- **Portfolio**: [your-portfolio-url.vercel.app](https://your-portfolio-url.vercel.app)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Drawesh Kumar Yadav**

*A modern portfolio showcasing the intersection of design and development*