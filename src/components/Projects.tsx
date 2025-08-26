import React, { useState } from 'react';
import { Calendar, Tag, ExternalLink, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Project, ProjectImage } from '../lib/supabaseClient';

export default function Projects() {
  const { t, isRTL, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageGalleries, setImageGalleries] = useState<Record<string, number>>({});

  React.useEffect(() => {
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
      
      // Initialize gallery states
      const initialGalleries: Record<string, number> = {};
      projectsWithImages.forEach(project => {
        initialGalleries[project.id] = 0;
      });
      setImageGalleries(initialGalleries);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => 
    language === 'en' ? project.category_en : project.category_ar
  ))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => 
        (language === 'en' ? project.category_en : project.category_ar) === selectedCategory
      );

  const nextImage = (projectId: string, totalImages: number) => {
    setImageGalleries(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }));
  };

  const prevImage = (projectId: string, totalImages: number) => {
    setImageGalleries(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 0 ? totalImages - 1 : prev[projectId] - 1
    }));
  };

  const getCurrentImage = (project: Project) => {
    if (project.images && project.images.length > 0) {
      const currentIndex = imageGalleries[project.id] || 0;
      return project.images[currentIndex];
    }
    // Fallback to the old single image field if no images in gallery
    return { image_url: project.image, alt_text: language === 'en' ? project.title_en : project.title_ar };
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-white mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t('projectsTitle').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('projectsTitle').split(' ').slice(1).join(' ') || 'Portfolio'}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 touch-manipulation ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              {category === 'all' ? t('allProjects') : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const currentImage = getCurrentImage(project);
            const hasMultipleImages = project.images && project.images.length > 1;
            const currentImageIndex = imageGalleries[project.id] || 0;
            
            return (
            <div
              key={project.id}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 touch-manipulation"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video group">
                <img
                  src={currentImage.image_url}
                  alt={currentImage.alt_text || (language === 'en' ? project.title_en : project.title_ar)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Image Gallery Navigation */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(project.id, project.images!.length);
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(project.id, project.images!.length);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {currentImageIndex + 1} / {project.images!.length}
                    </div>
                    
                    {/* Image Dots Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.images!.slice(0, 5).map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageGalleries(prev => ({
                              ...prev,
                              [project.id]: dotIndex
                            }));
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            dotIndex === currentImageIndex
                              ? 'bg-white'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                      {project.images!.length > 5 && (
                        <span className="text-white/75 text-xs ml-1">+{project.images!.length - 5}</span>
                      )}
                    </div>
                  </>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/20">
                    {language === 'en' ? project.category_en : project.category_ar}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/20">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                  {language === 'en' ? project.title_en : project.title_ar}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {language === 'en' ? project.description_en : project.description_ar}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.services.slice(0, 3).map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-md border border-slate-600/50"
                    >
                      {service}
                    </span>
                  ))}
                  {project.services.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-md border border-slate-600/50">
                      +{project.services.length - 3} {t('more')}
                    </span>
                  )}
                </div>

                {/* Project Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Tag className="w-4 h-4" />
                      <span>{language === 'en' ? project.category_en : project.category_ar}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-1 rtl:space-x-reverse text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-xs sm:text-sm font-medium touch-manipulation">
                    <span>{t('viewProject')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-8 sm:mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 touch-manipulation">
              {t('loadMoreProjects')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}