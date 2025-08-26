import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FileText, FolderOpen, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    loading: true
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const projectsResult = await supabase.from('projects').select('id', { count: 'exact' });

      setStats({
        projects: projectsResult.count || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'from-green-500 to-emerald-400',
      bgColor: 'from-green-500/10 to-emerald-400/10'
    },
    {
      title: 'Active Users',
      value: 1,
      icon: Users,
      color: 'from-purple-500 to-pink-400',
      bgColor: 'from-purple-500/10 to-pink-400/10'
    },
    {
      title: 'Website Status',
      value: 'Live',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-400',
      bgColor: 'from-orange-500/10 to-red-400/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to the Lights Production admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/projects"
            className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 group"
          >
            <FolderOpen className="w-8 h-8 text-green-400 group-hover:text-green-300" />
            <div>
              <h3 className="text-white font-semibold">Manage Projects</h3>
              <p className="text-gray-400 text-sm">Add, edit, or delete projects</p>
            </div>
          </a>
          
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 group"
          >
            <TrendingUp className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
            <div>
              <h3 className="text-white font-semibold">View Website</h3>
              <p className="text-gray-400 text-sm">See your live website</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">System Information</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
            <span className="text-gray-400">Database Status</span>
            <span className="text-green-400 font-semibold">Connected</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
            <span className="text-gray-400">Authentication</span>
            <span className="text-green-400 font-semibold">Active</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-gray-300">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}