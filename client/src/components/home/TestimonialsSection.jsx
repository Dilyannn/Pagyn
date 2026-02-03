import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../utils/data'

function TestimonialsSection() {
  return (
    <div id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-violet-600 mr-2"></span>
              <span className="text-sm font-semibold tracking-wide uppercase">Testimonials</span>
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Loved by Writers<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600"> Everywhere</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Join thousands of authors who have transformed their writing workflow with Pagyn.
          </p>  
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-violet-100 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-violet-600 fill-current" />
              </div>
              <div className="relative z-10">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-violet-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-100"
                  />
                  <div className="ml-4">
                    <h4 className="text-base font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection