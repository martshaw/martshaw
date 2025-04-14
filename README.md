# Martin Shaw Portfolio

A modern portfolio site built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- Responsive design
- Server-side rendering
- Markdown content
- Dark mode support
- Animated hero section
- Work showcase
- Experience timeline

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/martin-shaw-portfolio.git
cd martin-shaw-portfolio
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create the content directory:

\`\`\`bash
mkdir -p content
\`\`\`

4. Copy the markdown files to the content directory:

\`\`\`bash
# Example
cp path/to/your/markdown/files/* content/
\`\`\`

## Running the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

\`\`\`bash
npm run build
\`\`\`

## Starting the Production Server

\`\`\`bash
npm run start
\`\`\`

## Project Structure

- `app/`: Next.js App Router files
- `components/`: React components
- `content/`: Markdown content files
- `lib/`: Utility functions
- `public/`: Static assets

## Customization

### Content

Edit the markdown files in the `content` directory to update the site content:

- `profile.md`: Personal information
- `capabilities.md`: Core capabilities
- `experience.md`: Work experience
- `work.md`: Project showcase

### Styling

The site uses Tailwind CSS for styling. You can customize the design by editing:

- `tailwind.config.ts`: Tailwind configuration
- `app/globals.css`: Global styles

## License

MIT
\`\`\`

## 7. Let's create a .gitignore file:

```text file=".gitignore"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
