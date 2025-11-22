import { useState } from 'react';
import ProjectSelector from './components/ProjectSelector';
import ScriptDisplay from './components/ScriptDisplay';
import Troubleshooting from './components/Troubleshooting';
import { ProjectType, GeneratorOptions } from './lib/types';
import { Terminal, Sparkles } from 'lucide-react';

function App() {
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);
  const [projectName, setProjectName] = useState('my-project');
  const [showScript, setShowScript] = useState(false);

  const handleGenerate = () => {
    if (selectedType) {
      setShowScript(true);
      // Scroll to script
      setTimeout(() => {
        document.getElementById('script-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const generatorOptions: GeneratorOptions = {
    projectType: selectedType || 'react',
    projectName: projectName || 'my-project',
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Cursor Setup</span>
          </div>
          <a 
            href="https://cursor.sh" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            Get Cursor IDE
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Set Up Cursor IDE in <span className="text-blue-600">One Click</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Automated setup scripts for React, Node.js, Next.js, and custom presets. 
            Everything configured perfectly for beginners to start coding immediately.
          </p>
          <button 
            onClick={() => document.getElementById('project-selector')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Choose Your Project Type
            <ChevronDownIcon className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Project Selector */}
        <div id="project-selector" className="scroll-mt-24">
          <ProjectSelector 
            selected={selectedType} 
            onSelect={(type) => {
                setSelectedType(type);
                setShowScript(false);
            }} 
          />
        </div>

        {/* Project Details Input - Only show if selected */}
        {selectedType && (
            <div className="max-w-md mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                </label>
                <div className="flex gap-4">
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''));
                            setShowScript(false);
                        }}
                        className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-3 border"
                        placeholder="my-project"
                    />
                    <button
                        onClick={handleGenerate}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Generate
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    This will be your folder name
                </p>
            </div>
        )}

        {/* Generated Script Section */}
        {showScript && (
          <div id="script-section" className="scroll-mt-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mt-16 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Your Setup is Ready!</h2>
              <p className="text-gray-600 mt-2">
                Follow these steps to get started with your new project
              </p>
            </div>
            
            <ScriptDisplay options={generatorOptions} />
            
            {/* Steps */}
            <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Step-by-Step Instructions</h3>
                    <div className="space-y-6">
                        {[
                            { title: "Download the script", desc: "Click the download button to get your setup script" },
                            { title: "Open your terminal", desc: "Open Terminal (Mac/Linux) or PowerShell (Windows)" },
                            { title: "Run the script", desc: `Navigate to downloads and run: bash setup-${projectName}.sh` },
                            { title: "Open in Cursor", desc: "Open the generated folder in Cursor IDE and start coding!" }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                                    <p className="text-sm text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">What's Configured</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Folder Structure</h4>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    {['src/', 'src/components/', 'src/lib/', 'public/', 'tests/'].map(f => (
                                        <span key={f} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                         <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Dependencies</h4>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    {selectedType === 'react' && ['react', 'react-dom', 'vite', '@vitejs/plugin-react', 'typescript', '@types/react'].map(d => (
                                        <span key={d} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                                            {d}
                                        </span>
                                    ))}
                                     {selectedType === 'node' && ['express', 'typescript', 'ts-node', 'nodemon', 'cors', 'dotenv'].map(d => (
                                        <span key={d} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                                            {d}
                                        </span>
                                    ))}
                                     {(selectedType === 'next' || selectedType === 'custom') && ['next', 'react', 'react-dom', 'typescript', 'tailwindcss'].map(d => (
                                        <span key={d} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                                            {d}
                                        </span>
                                    ))}
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                                        +6 more
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Configuration Files</h4>
                                <ul className="mt-1 text-sm text-gray-600 grid grid-cols-1 gap-1 font-mono">
                                    {['package.json', 'tsconfig.json', '.eslintrc.json', '.prettierrc', '.gitignore', '.cursorrules', 'README.md'].map(f => (
                                        <li key={f} className="flex items-center gap-2">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        <Troubleshooting />
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Made with</span>
                <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>for coding beginners</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-blue-600">Cursor IDE Official Site</a>
                <a href="#" className="hover:text-blue-600">GitHub</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default App;

