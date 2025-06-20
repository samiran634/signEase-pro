import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import HeroSection from "../hero";
import FirstFeature from "../featurs/feature1";
import SecondFeature from "../featurs/feature2";
import ThirdFeature from "../featurs/feature3";
import FeatureList from "../featurs/featureList";
import CtaSection from "../cta/ctaMarge";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleOnHover = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  tap: { scale: 0.95 }
};

const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  }
};

// Animated Section Wrapper Component
const AnimatedSection = ({ children, animation = fadeInUp, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...animation,
        visible: {
          ...animation.visible,
          transition: {
            ...animation.visible.transition,
            delay: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  const user = useUser().user;
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const footerRef = useRef(null);
  const aboutRef = useRef(null);
  const FirstFeatureRef = useRef(null);
  const SecondFeatureRef = useRef(null);
  const ThirdFeatureRef = useRef(null);
  const [featureDropdownOpen, setFeatureDropdownOpen] = useState(false);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [0, 10]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setFeatureDropdownOpen(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
const foterItems=   
    [
      {
        name:'Contact Us',
        link:"https://www.linkedin.com/in/samiran-chakraborty-6a7816203/"
      } , {
        name:'About Us'
      }, {
        name:'Support Center'
      },{
      name:'Blog Updates'
      } 
        
    ]

  return (
    <>
      {/* Animated Navigation */}
      <motion.nav 
        className="bg-zinc-100/90 backdrop-blur-md shadow-md px-4 py-2 sticky top-0 z-50"
        style={{ 
          opacity: navOpacity,
          backdropFilter: `blur(${navBlur}px)`
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Navigation Links */}
          <div className="md:flex space-x-6 text-sm text-gray-700">
            {/* Animated Logo */}
            <motion.img 
              className="text-sm size-8 text-gray-200"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            src="/images/signeaselogo.png" />
              
            

            <motion.div 
              className="hidden md:flex space-x-6 text-sm text-gray-700 mt-0.86"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.button 
                onClick={() => scrollToSection(heroRef)} 
                className="hover:text-amber-500 transition-colors duration-200"
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Home
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection(featuresRef)} 
                className="hover:text-amber-500 transition-colors duration-200"
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                About
              </motion.button>

              {/* Animated Features Dropdown */}
              <motion.div
                className="relative"
                variants={fadeInUp}
              >
                <motion.button 
                  className="hover:text-amber-500 mt-1 transition-colors duration-200"
                  onClick={() => setFeatureDropdownOpen(!featureDropdownOpen)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  Features ▾
                </motion.button>
                
                <AnimatePresence>
                  {featureDropdownOpen && (
                    <motion.div 
                      className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md text-black z-10 overflow-hidden"
                      variants={slideDown}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, index) => {
                        const refs = [FirstFeatureRef, SecondFeatureRef, ThirdFeatureRef];
                        return (
                          <motion.button
                            key={feature}
                            className="block w-full text-left px-4 py-2 hover:bg-amber-100 transition-colors duration-200"
                            onClick={() => scrollToSection(refs[index])}
                            whileHover={{ x: 5, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {feature}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated Auth Buttons */}
          <motion.div 
            className="flex space-x-4 text-sm"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate("/signup")}
              className="text-black px-3 py-1 rounded-2xl border-black border-s-2 hover:border-s-0 hover:bg-amber-600 transition-all duration-300"
              variants={scaleOnHover}
              whileHover="hover"
              whileTap="tap"
            >
              Sign Up
            </motion.button>
            
            <motion.button
              onClick={() => navigate("/login")}
              className="text-black px-3 py-1 rounded-2xl border-black border-s-2 hover:border-s-0 hover:bg-amber-600 transition-all duration-300"
              variants={scaleOnHover}
              whileHover="hover"
              whileTap="tap"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section with entrance animation */}
        <AnimatedSection animation={fadeInUp}>
          <section ref={heroRef}>
            <HeroSection ref={ctaRef} />
          </section>
        </AnimatedSection>

        {/* About Section with staggered feature animations */}
        <motion.section 
          ref={aboutRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatedSection animation={fadeInLeft} delay={0.2}>
            <section ref={FirstFeatureRef}>
              <FirstFeature />
            </section>
          </AnimatedSection>
          
          <AnimatedSection animation={fadeInRight} delay={0.4}>
            <section ref={SecondFeatureRef}>
              <SecondFeature />
            </section>
          </AnimatedSection>
          
          <AnimatedSection animation={fadeInLeft} delay={0.6}>
            <section ref={ThirdFeatureRef}>
              <ThirdFeature />
            </section>
          </AnimatedSection>
        </motion.section>

        {/* Features List with scale animation */}
        <AnimatedSection 
          animation={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
          <section ref={featuresRef}>
            <FeatureList />
          </section>
        </AnimatedSection>

        {/* CTA Section with bounce effect */}
        <AnimatedSection 
          animation={{
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }
            }
          }}
        >
          <section ref={ctaRef}>
            <CtaSection />
          </section>
        </AnimatedSection>
      </main>

      {/* Animated Footer */}
      <AnimatedSection animation={fadeInUp}>
        <footer ref={footerRef} className="bg-black text-white px-6 py-10 overflow-hidden">
          <motion.div 
            className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Animated Logo */}
            <motion.div 
              className="text-3xl font-cursive"
              variants={fadeInLeft}
              whileHover={{ 
                scale: 1.1,
                textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
              }}
            >
              Logo
            </motion.div>

            {/* Animated Navigation Links */}
            <motion.div 
              className="flex flex-wrap gap-6 text-sm justify-center"
              variants={staggerContainer}
            >
              {foterItems.map((items) => (
                <motion.a 
                  key={items.index}
                  href= {items.link}
                  variants={fadeInUp}
                  whileHover={{ y: -3, color: "#f59e0b" }}
                  className="transition-colors duration-200"
                >
                   {items.name}
                </motion.a>
              ))}
            </motion.div>

            {/* Animated Social Icons */}
            <motion.div 
              className="flex gap-4 text-lg"
              variants={staggerContainer}
            >
              {['fab fa-facebook-f', 'fab fa-instagram', 'fab fa-x-twitter', 'fab fa-linkedin-in', 'fab fa-youtube'].map((icon, index) => (
                <motion.a 
                  key={icon}
                  href="#"
                  variants={fadeInRight}
                  whileHover={{ 
                    scale: 1.3, 
                    y: -5,
                    color: "#f59e0b"
                  }}
                  className="transition-colors duration-200"
                >
                  <i className={icon} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Divider */}
          <motion.div 
            className="border-t border-gray-600 my-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {/* Animated Bottom Text */}
          <motion.div 
            className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-400 gap-4 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft}>
              © 2025 Signease. All rights reserved.
            </motion.div>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainer}
            >
              {['Privacy Policy', 'Terms of Service', 'Cookies Settings'].map((policy, index) => (
                <motion.a 
                  key={policy}
                  href="#"
                  variants={fadeInUp}
                  whileHover={{ color: "#f59e0b" }}
                  className="transition-colors duration-200"
                >
                  {policy}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </footer>
      </AnimatedSection>
    </>
  );
};

export default LandingPage;