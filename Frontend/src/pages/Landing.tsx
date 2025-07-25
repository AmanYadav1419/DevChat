import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap, Github, Terminal, Code2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.dev-purple/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.dev-green/0.1),transparent_50%)]"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">DevChat</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Link to="/login">
            <Button variant="outline" className="hover:bg-primary/10">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-primary hover:opacity-90">
              Sign Up
            </Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6">
              Where Devs
              <br />
              <span className="bg-gradient-to-r from-dev-purple to-dev-purple-dark bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            The ultimate chat platform designed by developers, for developers. 
            Connect, collaborate, and build amazing things together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 animate-pulse-glow">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-primary/10">
                Join Your Team
              </Button>
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Real-time messaging with zero lag. Built for speed."
            />
            <FeatureCard
              icon={<Code2 className="h-8 w-8" />}
              title="Developer First"
              description="Syntax highlighting, code sharing, and dev-focused features."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team Focused"
              description="Organize your dev teams and projects seamlessly."
            />
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-16 h-16 bg-dev-purple/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-10 w-20 h-20 bg-dev-green/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-dev-orange/20 rounded-full blur-xl"
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300"
  >
    <div className="text-primary mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default Landing;