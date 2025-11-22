import { GeneratorOptions, ProjectType } from './types';

const generatePackageJson = (name: string, type: ProjectType) => {
  const base = {
    name: name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: type === 'node' ? 'nodemon src/index.ts' : type === 'next' ? 'next dev' : 'vite',
      build: type === 'node' ? 'tsc' : type === 'next' ? 'next build' : 'tsc && vite build',
      start: type === 'node' ? 'node dist/index.js' : type === 'next' ? 'next start' : 'vite preview',
      lint: 'eslint .',
    },
    dependencies: {},
    devDependencies: {},
  };

  if (type === 'react') {
    base.dependencies = {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.460.0"
    };
    base.devDependencies = {
      "@types/react": "^18.3.12",
      "@types/react-dom": "^18.3.1",
      "@vitejs/plugin-react": "^4.3.3",
      "typescript": "~5.6.2",
      "vite": "^5.4.11",
      "eslint": "^9.15.0",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.49",
      "tailwindcss": "^3.4.15"
    };
  } else if (type === 'node') {
    base.dependencies = {
      "express": "^4.21.1",
      "cors": "^2.8.5",
      "dotenv": "^16.4.5"
    };
    base.devDependencies = {
      "@types/express": "^5.0.0",
      "@types/node": "^22.9.0",
      "@types/cors": "^2.8.17",
      "typescript": "~5.6.2",
      "ts-node": "^10.9.2",
      "nodemon": "^3.1.7",
      "eslint": "^9.15.0"
    };
  } else if (type === 'next' || type === 'custom') {
    base.dependencies = {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "next": "15.0.3",
      "lucide-react": "^0.460.0"
    };
    base.devDependencies = {
      "@types/react": "^18.3.12",
      "@types/node": "^20.17.6",
      "@types/react-dom": "^18.3.1",
      "typescript": "^5.6.2",
      "eslint": "^8.57.0",
      "eslint-config-next": "15.0.3",
      "postcss": "^8.4.49",
      "tailwindcss": "^3.4.15"
    };

    if (type === 'custom') {
      Object.assign(base.dependencies, {
        "@supabase/supabase-js": "^2.46.1",
        "@clerk/nextjs": "^6.3.0",
        "@anthropic-ai/sdk": "^0.32.1"
      });
    }
  }

  return JSON.stringify(base, null, 2);
};

const getCommonFiles = () => {
  return {
    '.gitignore': `node_modules
dist
.env
.DS_Store
coverage
.next
build
`,
    '.cursorrules': `
# Cursor AI Rules

## Code Style
- Use TypeScript for all new files
- Prefer functional components for React
- Use Tailwind CSS for styling
- Use ES modules syntax

## Project Structure
- src/components: UI components
- src/lib: Utility functions
- src/hooks: Custom React hooks
- src/types: TypeScript definitions
`,
    '.vscode/settings.json': `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  }
}`,
    'README.md': `# Project Setup

This project was set up using the Cursor IDE Setup Tool.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
`
  };
};

export const generateBashScript = (options: GeneratorOptions): string => {
  const { projectType, projectName } = options;
  const pkgJson = generatePackageJson(projectName, projectType);
  const commonFiles = getCommonFiles();

  let script = `#!/bin/bash
set -e

# Navigate to Documents directory to keep things organized
cd ~/Documents || echo "Could not find Documents folder, staying in current directory."

echo "🚀 Setting up ${projectType} project: ${projectName}..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first: https://nodejs.org"
    exit 1
fi

# Create directory
mkdir -p "${projectName}"
cd "${projectName}"

echo "📦 Creating configuration files..."

# Create package.json
cat > package.json << 'EOF'
${pkgJson}
EOF

# Create common files
`;

  Object.entries(commonFiles).forEach(([filename, content]) => {
    if (filename.includes('/')) {
      const dir = filename.split('/')[0];
      script += `mkdir -p ${dir}\n`;
    }
    script += `cat > ${filename} << 'EOF'
${content}
EOF
`;
  });

  // Project specific files
  if (projectType === 'react') {
    script += `
mkdir -p src/components src/lib public

cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
EOF

cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

cat > src/App.tsx << 'EOF'
import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to your React App</h1>
        <p className="text-gray-600">Edit src/App.tsx to get started.</p>
      </div>
    </div>
  )
}

export default App
EOF

cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
`;
  } else if (projectType === 'node') {
    script += `
mkdir -p src

cat > src/index.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js Backend!' });
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});
EOF

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
EOF
`;
  }

  script += `
echo "📦 Installing dependencies..."
npm install

echo "✨ Opening project in Cursor..."
if command -v cursor &> /dev/null; then
    cursor .
elif command -v code &> /dev/null; then
    echo "ℹ️  Cursor CLI not found, trying VS Code..."
    code .
else
    echo "⚠️  Cursor CLI not found."
    echo "👉  Please manually open the folder: ~/Documents/${projectName}"
    echo "💡  Tip: Install the 'code' command in Cursor via Command Palette > 'Shell Command: Install 'cursor' command in PATH'"
fi
`;

  return script;
};

export const generatePowershellScript = (options: GeneratorOptions): string => {
  const { projectType, projectName } = options;
  const pkgJson = generatePackageJson(projectName, projectType);
  
  // Note: PowerShell escaping is complex. For this quickstart, we are simplifying.
  // In a robust app, we would use a separate file or safer string generation.
  
  return `# Windows PowerShell Script for ${projectName}
$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up ${projectType} project: ${projectName}..."

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Node.js is not installed. Please install Node.js first: https://nodejs.org"
    exit 1
}

# Navigate to Documents (standard location)
$docs = [Environment]::GetFolderPath("MyDocuments")
Set-Location $docs

# Create directory
New-Item -ItemType Directory -Force -Path "${projectName}" | Out-Null
Set-Location "${projectName}"

Write-Host "📦 Creating configuration files..."

# Create package.json
$pkgJson = @'
${pkgJson}
'@
$pkgJson | Out-File -Encoding UTF8 package.json

# Create minimal README
" # ${projectName}" | Out-File -Encoding UTF8 README.md

Write-Host "📦 Installing dependencies..."
npm install

Write-Host "✨ Opening project in Cursor..."
if (Get-Command cursor -ErrorAction SilentlyContinue) {
    cursor .
} elseif (Get-Command code -ErrorAction SilentlyContinue) {
    code .
} else {
    Write-Host "⚠️  Cursor CLI not found."
    Write-Host "👉  Please manually open the folder: $docs\\${projectName}"
}
`;
};
