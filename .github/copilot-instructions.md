# Guacchain.com

Guacchain.com is a Next.js 14.2.31 React web application with TypeScript that displays a simple homepage with logo and title. It uses Tailwind CSS for styling and ESLint for code quality.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, build, and test the repository:
- **PREREQUISITE**: Node.js v20.19.4+ and npm 10.8.2+ required (versions validated to work)
- `npm install` -- takes 55 seconds. NEVER CANCEL. Set timeout to 90+ seconds.
- **CRITICAL ISSUE**: Google Fonts are blocked by network restrictions. Build WILL FAIL with original layout.tsx.
  - If build fails with "Failed to fetch `Inter` from Google Fonts", comment out the Google Fonts import in `src/app/layout.tsx`
  - Replace `import { Inter } from "next/font/google";` with comment
  - Replace `const inter = Inter({ subsets: ["latin"] });` with comment  
  - Replace `className={inter.className}` with `className="font-sans"`
- `npm run build` -- takes 15-17 seconds after resolving Google Fonts issue. NEVER CANCEL. Set timeout to 60+ seconds.
- `npm run lint` -- takes 2 seconds. Automatically configures ESLint on first run (select "Strict" option).
  - **IMPORTANT**: After initial setup, edit `.eslintrc.json` to remove `"next/typescript"` from extends array
  - Final config should be: `{"extends": "next/core-web-vitals"}`
  - Produces TypeScript version warning (safe to ignore)
- `npm audit fix` -- takes 10 seconds. Resolves most vulnerabilities automatically.
- `npm audit fix --force` -- takes 8 seconds. Resolves critical Next.js vulnerabilities (required).
- `npx update-browserslist-db@latest` -- resolves browserslist warnings during build

### Run the application:
- **Development server**: `npm run dev` -- starts in 1.7 seconds at http://localhost:3000
- **Production server**: `npm run build && npm run start` -- production starts in 274ms at http://localhost:3000
- **CRITICAL**: Only ONE server can run at a time on port 3000. Stop dev server before starting production.

## Validation

### Manual Testing Requirements:
- ALWAYS manually validate any changes by running the development server and accessing http://localhost:3000
- The homepage should display:
  - Heading "Guacchain.com" 
  - Guacchain logo image (512x512px)
  - Clean Tailwind CSS styling with sans-serif font
- Take screenshots of any UI changes for verification
- ALWAYS test complete user scenarios after making changes, not just server startup

### Pre-commit Validation:
- Always run `npm run lint` before committing (takes 2 seconds)
- Always run `npm run build` to ensure production build succeeds (takes 15-17 seconds)
- The build process includes automatic type checking and linting validation

## Common Tasks

### Dependencies and Security:
- Initial `npm install` downloads 359 packages in 55 seconds
- Run `npm audit` to check for vulnerabilities (7 vulnerabilities found in fresh install)
- Run `npm audit fix` to resolve most issues automatically (10 seconds)
- Run `npm audit fix --force` to resolve critical Next.js vulnerabilities (8 seconds)
- All security fixes are required for production deployment

### Build and Deployment:
- Development: `npm run dev` (instant hot reload)
- Production build: `npm run build` (optimized static generation)
- Production server: `npm run start` (requires successful build first)
- Build output: Static pages with ~92KB first load JS
- Build generates optimized pages in `.next/` directory

## Project Structure

### Key Directories:
- `src/app/` - Next.js App Router pages and layouts
- `public/` - Static assets (images, icons)
- `.next/` - Build output (auto-generated)
- `node_modules/` - Dependencies (auto-generated)

### Important Files:
- `src/app/page.tsx` - Homepage component
- `src/app/layout.tsx` - Root layout with metadata (CONTAINS GOOGLE FONTS ISSUE)
- `src/app/globals.css` - Global Tailwind CSS styles
- `package.json` - Dependencies and scripts
- `next.config.mjs` - Next.js configuration (currently empty)
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration (auto-generated on first lint)

### Configuration Files Output:
```json
// package.json scripts section
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Dependencies:
- **Framework**: Next.js 14.2.31, React 18
- **Styling**: Tailwind CSS 3.4.1, PostCSS
- **Development**: TypeScript 5, ESLint with Next.js config
- **Total packages**: 359 (including transitive dependencies)

## Known Issues and Workarounds

### Google Fonts Network Restriction:
- **Problem**: `next/font/google` imports fail with "ENOTFOUND fonts.googleapis.com"
- **Solution**: Comment out Google Fonts imports and use Tailwind's `font-sans` class
- **Impact**: Build fails without this workaround in sandboxed environments

### Security Vulnerabilities:
- Fresh install has 7 vulnerabilities (1 critical in Next.js)
- **Required**: Run `npm audit fix && npm audit fix --force` after installation
- Updates Next.js from 14.2.3 to 14.2.31 to resolve critical security issues

### ESLint Configuration:
- First `npm run lint` triggers interactive setup
- **Required choice**: Select "Strict (recommended)" configuration
- **CRITICAL**: Generated config includes invalid `"next/typescript"` - must be removed
- **Fix**: Edit `.eslintrc.json` to only include `"extends": "next/core-web-vitals"`
- Produces TypeScript 5.9.2 version warning (officially supports <5.5.0) - safe to ignore

## Timing Reference (All Validated):
- `npm install`: 55-94 seconds depending on cache (120+ second timeout recommended)
- `npm run build`: 15-17 seconds (60+ second timeout recommended) 
- `npm run dev`: 1.7 seconds startup
- `npm run start`: 274ms startup (requires build first)
- `npm run lint`: 2 seconds
- `npm audit fix`: 10 seconds
- `npm audit fix --force`: 8 seconds

**NEVER CANCEL any of these commands** - they complete within the stated timeframes when given appropriate timeouts.