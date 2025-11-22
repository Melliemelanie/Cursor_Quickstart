export type ProjectType = 'react' | 'node' | 'next' | 'custom';

export interface ProjectConfig {
  type: ProjectType;
  name: string;
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface GeneratorOptions {
  projectType: ProjectType;
  projectName: string;
}

