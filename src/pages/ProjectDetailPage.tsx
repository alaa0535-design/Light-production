import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Project } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { t, isRTL, language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const fetchProject = async (id: string) => {
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (projectError) {
        if (projectError.code === 'PGRST116') {
          setNotFound(true);
        } else {
          throw projectError;
        }
        return;
      }

      // Fetch images for the project
      const { data: images, error: imagesError } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', id)
        .order('display_order');

      if (imagesError) {
        console.error('Error fetching images:', imagesError);
      }

      setProject({
        ...projectData,
        images: images || []
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images!.length - 1 : prev - 1
      );
    }
  };

  const getCurrentImage = () => {
    if (project?.images && project.images.length > 0) {
      return project.images[currentImageIndex];
    }
    // Fallback to the old single image field if no images in gallery
    return { 
      image_url: project?.image || '', 
      alt_text: language === 'en' ? project?.title_en : project?.title_ar 
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
              <p className="text-white mt-4">Loading project...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
              <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
              <Link 
                to="/projects"
                className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Projects</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentImage = getCurrentImage();
  const hasMultipleImages = project.images && project.images.length > 1;

  return (
    <div className="min-h-screen bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="pt-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/projects"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('backToProjects') || 'Back to Projects'}</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
                {language === 'en' ? project.category_en : project.category_ar}
              </span>
              <span className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {language === 'en' ? project.title_en : project.title_ar}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? project.description_en : project.description_ar}
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-800">
              <img
                src={currentImage.image_url}
                alt={currentImage.alt_text || (language === 'en' ? project.title_en : project.title_ar)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x675?text=Image+Not+Found';
                }}
              />
              
              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {project.images!.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {hasMultipleImages && project.images!.length > 1 && (
              <div className="mt-6 flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2">
                {project.images!.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-blue-400 shadow-lg shadow-blue-400/25'
                        : 'border-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Error';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('projectDetails') || 'Project Details'}
                </h2>
                
                {/* Both Language Descriptions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-3">English Description</h3>
                    <p className="text-gray-300 leading-relaxed">{project.description_en}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-3">Arabic Description</h3>
                    <p className="text-gray-300 leading-relaxed" dir="rtl">{project.description_ar}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('projectInfo') || 'Project Information'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm">{t('year') || 'Year'}</p>
                      <p className="text-white font-semibold">{project.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Tag className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm">{t('category') || 'Category'}</p>
                      <p className="text-white font-semibold">
                        {language === 'en' ? project.category_en : project.category_ar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t('servicesProvided') || 'Services Provided'}
                </h3>
                
                <div className="space-y-2">
                  {project.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Info */}
              {project.images && project.images.length > 0 && (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('gallery') || 'Gallery'}
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-300 mb-1">
                      {project.images.length}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {project.images.length === 1 ? 'Image' : 'Images'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('interestedInSimilarProject') || 'Interested in a Similar Project?'}
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('contactUsForConsultation') || 'Contact us to discuss how we can bring your vision to life with our professional event production services.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25">
                {t('getFreeConsultation') || 'Get Free Consultation'}
              </button>
              <Link 
                to="/projects"
                className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 inline-flex items-center justify-center"
              >
                {t('viewMoreProjects') || 'View More Projects'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}