import { Heart, Star, MessageCircle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark dark:bg-black text-background mt-auto py-24 transition-colors relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          
          {/* Brand & Quote */}
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="p-3 bg-secondary/10 rounded-2xl group-hover:rotate-12 transition-all duration-500">
                <Globe className="text-secondary w-8 h-8" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">Travel With Us</span>
            </Link>
            <p className="text-accent italic text-3xl font-black tracking-widest uppercase opacity-80 leading-none">
              Not all those who <br /> wander are lost
            </p>
            <p className="text-gray-500 text-sm max-w-md mt-6 font-medium leading-relaxed">
              The ultimate mission control for global explorers. Precision planning, real-time intelligence, and curated masterpieces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/explore" className="text-white hover:text-secondary font-black uppercase tracking-widest text-xs transition-all">Explore</Link>
              </li>
              <li>
                <Link to="/planner" className="text-white hover:text-secondary font-black uppercase tracking-widest text-xs transition-all">Mission Planner</Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-white hover:text-secondary font-black uppercase tracking-widest text-xs transition-all">Command Center</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-secondary font-black uppercase tracking-widest text-xs transition-all">Intelligence</Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-secondary hover:text-white transition-all transform hover:scale-110 border border-white/5">
                <Heart className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-secondary hover:text-white transition-all transform hover:scale-110 border border-white/5">
                <Star className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-secondary hover:text-white transition-all transform hover:scale-110 border border-white/5">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
          
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-600">
          <p>&copy; {new Date().getFullYear()} TRAVEL WITH US. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
