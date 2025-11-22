import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, Terminal } from 'lucide-react';
import { GeneratorOptions } from '../lib/types';
import { generateBashScript, generatePowershellScript } from '../lib/generators';

interface ScriptDisplayProps {
  options: GeneratorOptions;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ options }) => {
  const [activeTab, setActiveTab] = useState<'mac' | 'windows'>('mac');
  const [copied, setCopied] = useState(false);
  const [script, setScript] = useState('');

  useEffect(() => {
    if (activeTab === 'mac') {
      setScript(generateBashScript(options));
    } else {
      setScript(generatePowershellScript(options));
    }
  }, [activeTab, options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `setup-${options.projectName}.${activeTab === 'mac' ? 'sh' : 'ps1'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-600" />
          Download Setup Script
        </h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('mac')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'mac' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            macOS / Linux
          </button>
          <button
            onClick={() => setActiveTab('windows')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'windows' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Windows
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono h-96">
            <code>{script}</code>
          </pre>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Instructions:</p>
            {activeTab === 'mac' ? (
              <ol className="list-decimal list-inside space-y-1">
                <li>Download the script</li>
                <li>Open Terminal</li>
                <li>Run <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">bash setup-{options.projectName}.sh</code></li>
              </ol>
            ) : (
              <ol className="list-decimal list-inside space-y-1">
                <li>Download the script</li>
                <li>Open PowerShell</li>
                <li>Run <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">.\setup-{options.projectName}.ps1</code></li>
              </ol>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Download className="w-5 h-5" />
            Download Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptDisplay;

