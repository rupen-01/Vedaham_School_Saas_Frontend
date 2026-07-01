import { useEffect, useState } from 'react';
import { 
  Loader2, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  BookOpen, 
  GraduationCap,
  Shield,
  Database,
  Zap
} from 'lucide-react';

const Loading = () => {
  const [loadingText, setLoadingText] = useState("Initializing system...");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { text: "Initializing system...", icon: Shield },
    { text: "Loading modules...", icon: Database },
    { text: "Preparing dashboard...", icon: BarChart3 },
    { text: "Configuring settings...", icon: Settings },
    { text: "System ready", icon: Zap }
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[next].text);
        return next;
      });
    }, 2500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(textTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Shield;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-slate-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-slate-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-slate-300 rounded-full"></div>
      </div>

      {/* Main Loading Container */}
      <div className="flex flex-col items-center space-y-8 animate-fadeIn relative z-10 max-w-md mx-auto px-6">
        
        {/* Professional Logo/Icon */}
        <div className="relative">
          {/* Main Spinning Circle */}
          <div className="relative w-20 h-20 border-3 border-slate-300 border-t-blue-600 rounded-full animate-spin">
            {/* Inner Circle */}
            <div className="absolute inset-2 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CurrentIcon className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <p className="text-lg font-medium text-slate-700 transition-all duration-500">
            {loadingText}
          </p>
          
          {/* Subtle Loading Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500 font-medium">Loading</span>
            <span className="text-xs text-slate-500 font-medium">{progress}%</span>
          </div>
        </div>

        {/* System Name */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold text-slate-800">
            School ERP System
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Professional Education Management Platform
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <div className="text-center group">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-slate-600 font-medium">Institutions</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-indigo-100 transition-colors">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-600 font-medium">Users</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-100 transition-colors">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-slate-600 font-medium">Academics</p>
          </div>
          <div className="text-center group">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-100 transition-colors">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-600 font-medium">Analytics</p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center">
          <p className="text-xs text-slate-400 font-medium">
            Version 2.1.0 • Enterprise Edition
          </p>
        </div>
      </div>

      {/* Subtle Corner Elements */}
      <div className="absolute top-8 right-8 text-slate-300">
        <GraduationCap className="w-6 h-6 animate-pulse" />
      </div>
      <div className="absolute bottom-8 left-8 text-slate-300">
        <Database className="w-6 h-6 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default Loading;
