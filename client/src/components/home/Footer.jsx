import { BookOpen, Github, Twitter, Linkedin, Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-violet-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Pagyn</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Create, design, and publish stunning ebooks with the power of AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-violet-600 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-violet-600 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/Dilyannn" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-violet-600 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

           {/* Links Sections */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Features</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Testimonials</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Contact</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#privacy" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Privacy</a></li>
                <li><a href="#terms" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Pagyn. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span>for creators</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer