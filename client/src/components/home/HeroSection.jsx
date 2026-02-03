import { ArrowRight, Sparkles, BookOpen, Zap, CheckCircle2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 mb-8 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 mr-2 fill-violet-600/20" />
              <span className="text-sm font-semibold tracking-wide uppercase">AI-Powered Writing Assistant</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6 font-display">
              Transform Ideas into <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">Captivating</span> Stories
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
              Unleash the power of AI to craft compelling book outlines, chapters, and characters. Write faster, better, and with more creativity than ever before.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/login"} 
                className="inline-flex items-center justify-center px-8 py-4 text-white bg-violet-600 hover:bg-violet-700 rounded-2xl font-bold text-lg shadow-xl shadow-violet-500/30 hover:shadow-violet-600/40 transform hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-violet-500"
              >  
                <span>Start Creating Free</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <a 
                href="#demo" 
                className="inline-flex items-center justify-center px-8 py-4 text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl font-bold text-lg transition-all duration-300 shadow-sm"
              >
                <span>See How It Works</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 py-8 border-t border-gray-100">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm font-medium text-gray-500 mt-1">Books Generated</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm font-medium text-gray-500 mt-1">User Rating</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm font-medium text-gray-500 mt-1">Active Users</div>
              </div>
            </div>  
          </div>  

          {/* Right Visual */}
          <div className="mt-16 lg:mt-0 relative perspective-1000">
            {/* Decorative Blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl mix-blend-multiply"></div>

            {/* Floating Semi-Transparent Corner Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100/60 rounded-2xl border border-purple-200/50 backdrop-blur-sm shadow-sm animate-bounce-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-violet-100/60 rounded-full border border-violet-200/50 backdrop-blur-sm shadow-sm animate-bounce-slow animation-delay-2000"></div>
            <div className="relative z-10 rounded-3xl bg-gray-50/50 border border-gray-200 p-2 lg:p-4 backdrop-blur-xl transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out shadow-2xl shadow-gray-200/50">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200/50 bg-white relative">
                  
                  {/* Mock Browser Header */}
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="ml-4 px-3 py-1 bg-white rounded-md border border-gray-200 text-[10px] text-gray-400 flex-1 text-center font-medium font-mono">pagyn.ai/editor</div>
                  </div>
                  
                  {/* Internal Mock UI */}
                  <div className="p-6 lg:p-8 min-h-100 flex gap-6">
                     {/* Sidebar Mock */}
                    <div className="hidden sm:block w-16 md:w-48 bg-gray-50 rounded-xl border border-gray-100 p-3 space-y-3">
                        <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                        <div className="h-8 bg-white border border-gray-200 rounded-lg shadow-xs"></div>
                        <div className="h-8 bg-transparent rounded-lg"></div>
                        <div className="h-8 bg-transparent rounded-lg"></div>
                    </div>

                     {/* Main Content Mock */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-8 bg-gray-100 w-1/3 rounded-lg"></div>
                            <div className="h-8 bg-violet-100 w-24 rounded-lg"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-3 bg-gray-100 w-full rounded-full"></div>
                          <div className="h-3 bg-gray-100 w-full rounded-full"></div>
                          <div className="h-3 bg-gray-100 w-5/6 rounded-full"></div>
                          <div className="h-3 bg-gray-100 w-11/12 rounded-full"></div>
                          <div className="h-3 bg-gray-100 w-full rounded-full"></div>
                        </div>
                    </div>
                  </div>

                  {/* Floating Notification Card - Processing */}
                  <div className="absolute top-24 right-8 bg-white/90 backdrop-blur-md p-3 pr-5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce-slow z-10">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                      <Zap className="w-4 h-4 fill-amber-500/20" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Processing</div>
                      <div className="text-xs font-bold text-gray-900">Generating Chapter...</div>
                    </div>
                  </div>

                  {/* Floating Notification Card - Complete */}
                  <div className="absolute bottom-12 -left-4 bg-white/90 backdrop-blur-md p-3 pr-5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow animation-delay-2000 z-10">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Success</div>
                      <div className="text-xs font-bold text-gray-900">Export Completed</div>
                    </div>
                  </div>

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection