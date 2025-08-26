import React, { useEffect, useState } from 'react';
import { supabase, Project } from '../../lib/supabaseClient';
import { Plus, Edit3, Trash2, RefreshCw, Eye } from 'lucide-react';
import ProjectForm from './ProjectForm';

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const projectsData = data || [];
      
      // Fetch images for each project
      const projectsWithImages = await Promise.all(
        projectsData.map(async (project) => {
          const { data: images, error: imagesError } = await supabase
            .from('project_images')
            .select('*')
            .eq('project_id', project.id)
            .order('display_order');
          
          if (imagesError) {
            console.error('Error fetching images for project:', project.id, imagesError);
            return { ...project, images: [] };
          }
          
          return { ...project, images: images || [] };
        })
      );
      
      setProjects(projectsWithImages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowForm(false);
          setEditingProject(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Management</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.images && project.images.length > 0 ? project.images[0].image_url : project.image}
                alt={project.title_en}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image';
                }}
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                  {project.year}
                </span>
              </div>
              {project.images && project.images.length > 1 && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs rounded-full">
                    {project.images.length} images
                  </span>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                {project.title_en}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {project.category_en}
              </p>
              <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                {project.description_en}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded"
                  >
                    {service}
                  </span>
                ))}
                {project.services.length > 3 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded">
                    +{project.services.length - 3} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
                <a
                  href="/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-4">Start by adding your first project to showcase your work.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  );
}