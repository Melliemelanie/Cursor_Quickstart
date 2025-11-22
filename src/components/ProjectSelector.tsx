import React from 'react';
import { ProjectType, ProjectConfig } from '../lib/types';
import { Code, Server, Layers, Cpu } from 'lucide-react';

interface ProjectSelectorProps {
  selected: ProjectType | null;
  onSelect: (type: ProjectType) => void;
}

const projects: ProjectConfig[] = [
  {
    type: 'react',
    name: 'React App',
    id: 'react',
    label: 'React',
    description: 'Modern React application with Vite, TypeScript, and testing setup',
    icon: 'react'
  },
  {
    type: 'node',
    name: 'Node.js Backend',
    id: 'node',
    label: 'Node.js',
    description: 'Express backend with TypeScript, testing, and development tools',
    icon: 'node'
  },
  {
    type: 'next',
    name: 'Full-stack Next.js',
    id: 'next',
    label: 'Next.js',
    description: 'Next.js with TypeScript, Tailwind CSS, and modern tooling',
    icon: 'next'
  },
  {
    type: 'custom',
    name: 'Custom Preset',
    id: 'custom',
    label: 'Custom',
    description: 'Next.js + Supabase + Clerk + Claude AI integration',
    icon: 'custom'
  }
];

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ selected, onSelect }) => {
  const getIcon = (type: ProjectType) => {
    switch (type) {
      case 'react': return <Code className="w-8 h-8 text-blue-500" />;
      case 'node': return <Server className="w-8 h-8 text-green-500" />;
      case 'next': return <Layers className="w-8 h-8 text-black" />;
      case 'custom': return <Cpu className="w-8 h-8 text-purple-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Project Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-200 hover:border-blue-400 hover:shadow-md ${
              selected === project.type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
            onClick={() => onSelect(project.type)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getIcon(project.type)}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
               {/* Tags could go here */}
            </div>
            <div className="mt-4">
                <button className={`w-full py-2 rounded-lg text-center font-medium transition-colors ${
                    selected === project.type 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                    {selected === project.type ? 'Selected' : 'Select'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSelector;

