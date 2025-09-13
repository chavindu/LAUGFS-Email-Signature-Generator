# LAUGFS Email Signature Generator

A professional email signature generator for LAUGFS Group companies, built with Next.js and modern web technologies. This application allows employees to create standardized, professional email signatures with company branding and contact information.

## 🚀 Features

- **Multi-Company Support**: Support for all LAUGFS Group companies with their respective logos and branding
- **Professional Templates**: Pre-configured signature templates with company-specific styling
- **Real-time Preview**: Live preview of your signature as you type
- **Rich Text Copy**: Copy signature as rich text for seamless Outlook integration
- **HTML Export**: Download signature as HTML file for backup or manual setup
- **Mobile-Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Privacy-Focused**: All data processing happens locally in your browser - no server storage
- **Custom Company Support**: Upload custom logos and configure custom company details
- **Auto-formatting**: Automatic phone number and extension formatting
- **Anniversary Logos**: Special 30-year anniversary branding for LAUGFS Holdings

## 🏢 Supported Companies

The application supports the following LAUGFS Group companies:

- **LAUGFS Holdings** (with 30-year anniversary logo)
- **LAUGFS Gas**
- **LAUGFS Petroleum**
- **LAUGFS Power**
- **LAUGFS Engineering**
- **LAUGFS Maritime**
- **LAUGFS Lubricants**
- **LAUGFS Property**
- **LAUGFS Leisure**
- **LAUGFS Restaurants**
- **LAUGFS Super**
- **LAUGFS Business Solutions**
- **LAUGFS International**
- **LAUGFS Eco Sri**
- **LAUGFS Salt and Chemicals**
- **LAUGFS Rubber**
- **LAUGFS Terminals**
- **LAUGFS USA LLC**
- **LAUGFS Europe BV**
- **LAUGFS Life Sciences**
- **Anantaya Resort and Spa** (Chilaw & Passikuda)
- **SLOGAL Energy DMCC**
- **Southern Petroleum**
- **Custom Company** (with logo upload)

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.0
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **TypeScript**: Full type safety
- **Build Tool**: Next.js with optimized production builds

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LAUGFS-Email-Signature-Generator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

### Static Export (Optional)

For static hosting platforms like GitHub Pages or Netlify:

```bash
pnpm build && pnpm export
```

## 📁 Project Structure

```
LAUGFS-Email-Signature-Generator/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── copy-success-toast.tsx   # Toast notifications
│   ├── image-upload.tsx         # Image upload component
│   ├── rich-text-copy.tsx       # Rich text copy functionality
│   ├── signature-preview.tsx    # Signature preview component
│   └── theme-provider.tsx       # Theme management
├── lib/                         # Utility libraries
│   ├── logo-config.ts          # Company logo configurations
│   └── utils.ts                # General utilities
├── public/                      # Static assets
│   ├── images/                 # Company logos and images
│   └── favicon.png             # App icon
├── hooks/                       # Custom React hooks
├── build/                       # Production build output
└── package.json                 # Dependencies and scripts
```

## 🎨 Customization

### Adding New Companies

1. **Add logo image** to `public/images/`
2. **Update logo configuration** in `lib/logo-config.ts`:
   ```typescript
   "new-company": { width: 180, height: "auto" }
   ```
3. **Add company domain** in `COMPANY_DOMAINS`:
   ```typescript
   "new-company": { 
     display: "www.newcompany.com", 
     url: "https://www.newcompany.com" 
   }
   ```
4. **Update company list** in `app/page.tsx`

### Styling Modifications

- **Colors**: Modify CSS variables in `app/globals.css`
- **Layout**: Update Tailwind classes in components
- **Logo dimensions**: Adjust in `lib/logo-config.ts`

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The application works entirely client-side.

### Build Configuration

The application is configured for:
- **ESLint**: Disabled during builds for flexibility
- **TypeScript**: Build errors ignored for rapid development
- **Images**: Unoptimized for static hosting compatibility

## 📱 Usage Guide

### For End Users

1. **Select Company**: Choose your LAUGFS Group company from the dropdown
2. **Enter Details**: Fill in your personal information (name, designation, etc.)
3. **Upload Logo** (Optional): For custom companies, upload your company logo
4. **Preview**: Review your signature in real-time
5. **Copy Signature**: Use "Copy Rich Text" for Outlook integration
6. **Setup in Outlook**: Follow the provided instructions for your Outlook version

### For Administrators

- **Logo Updates**: Replace logo files in `public/images/`
- **Company Additions**: Follow the customization guide above
- **Deployment**: Use standard Next.js deployment procedures

## 🔒 Privacy & Security

- **No Data Storage**: All user data is processed locally in the browser
- **No Server Communication**: Personal information never leaves the user's device
- **Secure**: No authentication or user accounts required
- **Compliant**: GDPR-friendly with no data collection

## 🐛 Troubleshooting

### Common Issues

1. **Signature not appearing in Outlook**
   - Ensure you're using "Copy Rich Text" button
   - Check Outlook version compatibility
   - Verify signature is set as default

2. **Logo not displaying**
   - Check logo file exists in `public/images/`
   - Verify logo configuration in `lib/logo-config.ts`
   - Clear browser cache

3. **Build errors**
   - Run `pnpm install` to ensure dependencies are installed
   - Check Node.js version compatibility
   - Clear `.next` folder and rebuild

### Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Test across different browsers
- Ensure accessibility compliance

## 📄 License

This project is proprietary software developed for LAUGFS Group. All rights reserved.

## 👥 Team

**Developed by**: ITSM Team  
**Maintained by**: LAUGFS Group IT Department

## 📞 Support

For technical support or feature requests, please contact the ITSM team or create an issue in the project repository.

---

**Version**: 0.1.0  
**Last Updated**: September 2025  
**Framework**: Next.js 15.5.0  
**Status**: Production Ready ✅