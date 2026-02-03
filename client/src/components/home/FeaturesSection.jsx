import { FEATURES } from '../../utils/data'

function FeaturesSection() {
  return (
    <div id="features" className="">
      <div className="">
        <div className="">
          <div className="">
            <span className="text-base font-semibold text-violet-600"></span>
            <span className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Key Features</span>
          </div>
          <h2 className="mt-4 max-w-3xl text-lg text-gray-600">
            Everything You Need to
            <span className="font-semibold text-gray-900"> Create Amazing Books</span>
          </h2>
          <p className="mt-6 max-w-2xl text-gray-600">
            Our AI-powered writing assistant offers a suite of features designed to help you craft compelling stories with ease and creativity.
          </p>  
        </div>

        <div className="">
          {FEATURES.map((feature, index) => (
            <div key={index} className="">
              <div className="">
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br ${feature.gradient} text-white shadow-lg shadow-${feature.gradient.split(' ')[1]}-200/50`}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="">
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection