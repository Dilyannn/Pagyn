import Navbar from "./Navbar";

const DashboardMainLayout = ({ children, fullWidth = false }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-[10%] -right-[5%] w-100 h-100 bg-purple-200 rounded-full blur-[100px] opacity-25"></div>
        <div className="absolute bottom-[10%] -left-[5%] w-100 h-100 bg-indigo-100 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <Navbar showLinks={false} fullWidth={fullWidth} />

      <main className={`relative z-10 min-h-[calc(100vh-64px)] ${
        fullWidth ? "w-full p-0" : "max-w-7xl mx-auto p-6 lg:p-10"
      }`}>
        {children}
      </main>
    </div>
  )
}

export default DashboardMainLayout