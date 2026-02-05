import { Link } from 'react-router-dom'
import { FEATURES } from '../../utils/data'
import { useAuth } from "../../context/AuthContext.jsx";

function FeaturesSection() {
  const { isAuthenticated } = useAuth();

  return (
    <div id="features" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-violet-600 mr-2"></span>
              <span className="text-sm font-semibold tracking-wide uppercase">Features</span>
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Everything You Need to<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600"> Create Your Ebook</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our platform is packed with powerful features to help you write, design, and publish your ebook effortlessly.
          </p>  
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-violet-100 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div className="mb-6">
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br ${feature.gradient} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
              </div>
              <div className="">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors duration-300 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{feature.description}</p>
                <div className="flex items-center text-violet-600 font-semibold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="mr-1">Learn more</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-gray-700 mb-6">Ready to get started?</p>
          <Link 
            to={isAuthenticated ? "/dashboard" : "/login"} 
            className="inline-flex items-center px-8 py-4 text-white font-bold bg-violet-600 rounded-xl hover:bg-violet-700 shadow-xl shadow-violet-200 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Start Creating Today
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection