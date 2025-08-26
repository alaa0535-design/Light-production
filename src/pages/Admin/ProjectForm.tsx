import React, { useState } from 'react';
import { supabase, Project } from '../../lib/supabaseClient';
import { Save, ArrowLeft, Plus, X, Upload, MoveUp, MoveDown } from 'lucide-react';

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title_en: project?.title_en || '',
    title_ar: project?.title_ar || '',
    description_en: project?.description_en || '',
    description_ar: project?.description_ar || '',
    category_en: project?.category_en || '',
    category_ar: project?.category_ar || '',
    services: project?.services || [],
    year: project?.year || new Date().getFullYear().toString()
  });
  
  const [projectImages, setProjectImages] = useState(
    project?.images?.sort((a, b) => a.display_order - b.display_order) || []
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [newService, setNewService] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let projectId = project?.id;
      
      // Get the first image URL for the main image field (required by database)
      const mainImageUrl = projectImages.length > 0 ? projectImages[0].image_url : (project?.image || '');
      
      if (project) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            ...formData,
            image: mainImageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', project.id);

        if (error) throw error;
        projectId = project.id;
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert([{
            ...formData,
            image: mainImageUrl
          }])
          .select()
          .single();

        if (error) throw error;
        projectId = data.id;
      }

      // Handle project images
      if (projectId) {
        // Delete existing images if updating
        if (project) {
          const { error: deleteError } = await supabase
            .from('project_images')
            .delete()
            .eq('project_id', projectId);
          
          if (deleteError) throw deleteError;
        }

        // Insert new images
        if (projectImages.length > 0) {
          const imagesToInsert = projectImages.map((img, index) => ({
            project_id: projectId,
            image_url: img.image_url,
            display_order: index,
            alt_text: img.alt_text || formData.title_en
          }));

          const { error: insertError } = await supabase
            .from('project_images')
            .insert(imagesToInsert);

          if (insertError) throw insertError;
        }
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage = {
        id: `temp-${Date.now()}`,
        project_id: project?.id || '',
        image_url: newImageUrl.trim(),
        display_order: projectImages.length,
        alt_text: newImageAlt.trim() || formData.title_en,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setProjectImages(prev => [...prev, newImage]);
      setNewImageUrl('');
      setNewImageAlt('');
    }
  };

  const removeImage = (index: number) => {
    setProjectImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...projectImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      setProjectImages(newImages);
    }
  };

  const addService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-gray-400">
            {project ? 'Update project details' : 'Create a new portfolio project'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Project Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter project title in English"
                required
              />
            </div>

            {/* Arabic Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title (Arabic) *
              </label>
              <input
                type="text"
                value={formData.title_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                placeholder="أدخل عنوان المشروع بالعربية"
                dir="rtl"
                required
              />
            </div>

            {/* English Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category (English) *
              </label>
              <input
                type="text"
                value={formData.category_en}
                onChange={(e) => setFormData(prev => ({ ...prev, category_en: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                placeholder="e.g., Corporate Events"
                required
              />
            </div>

            {/* Arabic Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category (Arabic) *
              </label>
              <input
                type="text"
                value={formData.category_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, category_ar: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                placeholder="مثال: فعاليات الشركات"
                dir="rtl"
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year *
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                placeholder="2024"
                required
              />
            </div>
          </div>

          {/* English Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (English) *
            </label>
            <textarea
              value={formData.description_en}
              onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 resize-none"
              rows={4}
              placeholder="Describe the project in English"
              required
            />
          </div>

          {/* Arabic Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (Arabic) *
            </label>
            <textarea
              value={formData.description_ar}
              onChange={(e) => setFormData(prev => ({ ...prev, description_ar: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 resize-none"
              rows={4}
              placeholder="وصف المشروع بالعربية"
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Project Images Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Project Images</h2>
          
          {/* Add New Image */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                  placeholder="https://example.com/image.jpg"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Alt Text (Optional)
                </label>
                <input
                  type="text"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                  placeholder="Image description"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addImage}
              disabled={!newImageUrl.trim()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <Upload className="w-4 h-4" />
              <span>Add Image</span>
            </button>
          </div>

          {/* Images List */}
          {projectImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Current Images ({projectImages.length})</h3>
              <div className="space-y-3">
                {projectImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex items-center space-x-4 bg-slate-700/30 rounded-lg p-4"
                  >
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      <img
                        src={image.image_url}
                        alt={image.alt_text}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Error';
                        }}
                      />
                    </div>
                    
                    {/* Image Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{image.image_url}</p>
                      {image.alt_text && (
                        <p className="text-xs text-gray-400 mt-1">{image.alt_text}</p>
                      )}
                    </div>
                    
                    {/* Order Controls */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === projectImages.length - 1}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Services</h2>
          
          {/* Add Service */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
              placeholder="Add a service (e.g., Audio Systems)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
            />
            <button
              type="button"
              onClick={addService}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Services List */}
          <div className="flex flex-wrap gap-2">
            {formData.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-slate-700/50 text-gray-300 px-3 py-1 rounded-lg"
              >
                <span className="text-sm">{service}</span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Preview */}
        {projectImages.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Gallery Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectImages.slice(0, 6).map((image, index) => (
                <div key={image.id} className="aspect-video overflow-hidden rounded-lg relative">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
            {projectImages.length > 6 && (
              <p className="text-gray-400 text-sm mt-4 text-center">
                +{projectImages.length - 6} more images
              </p>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}