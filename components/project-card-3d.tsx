"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

/* ── Color accents per project ──────────────────────────── */
const accentMap: Record<string, { 
  gradient: string; 
  glow: string; 
  border: string;
  tag: string;
  tagBg: string;
}> = {
  purple:  { gradient: "from-violet-500 to-violet-700", glow: "shadow-violet-500/30", border: "border-violet-500/30", tag: "text-violet-300", tagBg: "bg-violet-500/10" },
  emerald: { gradient: "from-emerald-500 to-emerald-700", glow: "shadow-emerald-500/30", border: "border-emerald-500/30", tag: "text-emerald-300", tagBg: "bg-emerald-500/10" },
  blue:    { gradient: "from-blue-500 to-blue-700", glow: "shadow-blue-500/30", border: "border-blue-500/30", tag: "text-blue-300", tagBg: "bg-blue-500/10" },
  orange:  { gradient: "from-orange-500 to-orange-700", glow: "shadow-orange-500/30", border: "border-orange-500/30", tag: "text-orange-300", tagBg: "bg-orange-500/10" },
  cyan:    { gradient: "from-cyan-500 to-cyan-700", glow: "shadow-cyan-500/30", border: "border-cyan-500/30", tag: "text-cyan-300", tagBg: "bg-cyan-500/10" },
  pink:    { gradient: "from-pink-500 to-pink-700", glow: "shadow-pink-500/30", border: "border-pink-500/30", tag: "text-pink-300", tagBg: "bg-pink-500/10" },
  indigo:  { gradient: "from-indigo-500 to-indigo-700", glow: "shadow-indigo-500/30", border: "border-indigo-500/30", tag: "text-indigo-300", tagBg: "bg-indigo-500/10" },
  amber:   { gradient: "from-amber-500 to-amber-700", glow: "shadow-amber-500/30", border: "border-amber-500/30", tag: "text-amber-300", tagBg: "bg-amber-500/10" },
};

interface Project {
  id: number;
  title: string;
  image: string;
  urlGithub: string;
  urlDemo: string;
  description?: string;
  tags?: string[];
  color?: string;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

const ProjectCard3D = ({ project, index }: ProjectCard3DProps) => {
  const { title, image, urlGithub, urlDemo, description, tags, color = "purple" } = project;
  const accent = accentMap[color] || accentMap.purple;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${accent.gradient} rounded-2xl opacity-0 blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      {/* Card */}
      <div className={`relative overflow-hidden rounded-2xl bg-[#0c0e17]/90 backdrop-blur-xl 
        border border-white/5 transition-all duration-500
        ${isHovered ? `${accent.border} shadow-2xl ${accent.glow}` : ""}`}
      >
        {/* Image container with 3D effect */}
        <div className="relative overflow-hidden">
          <motion.div
            style={{ z: isHovered ? 20 : 0 }}
            className="relative"
          >
            <Image
              src={image}
              alt={title}
              width={600}
              height={340}
              className="w-full h-[200px] object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-[#0c0e17]/50 to-transparent
              transition-opacity duration-500 ${isHovered ? "opacity-60" : "opacity-80"}`} 
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                scale: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : -10
              }}
              transition={{ duration: 0.3 }}
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${accent.gradient}
                text-white text-xs font-medium shadow-lg`}
              style={{ transformStyle: "preserve-3d", z: 30 }}
            >
              Ver proyecto
            </motion.div>
          </motion.div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <motion.div 
          className="p-5 space-y-3"
          style={{ z: 10 }}
        >
          {/* Title */}
          <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-white/40 line-clamp-2 group-hover:text-white/60 transition-colors duration-300">
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-medium ${accent.tagBg} ${accent.tag}
                    border border-white/5`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            {urlGithub && urlGithub !== "#!" && (
              <Link
                href={urlGithub}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 
                  text-white/50 text-xs font-medium hover:bg-white/10 hover:text-white 
                  transition-all duration-300"
              >
                <Github size={14} />
                Código
              </Link>
            )}
            {urlDemo && urlDemo !== "#!" && (
              <Link
                href={urlDemo}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${accent.gradient}
                  text-white text-xs font-medium hover:shadow-lg ${accent.glow}
                  transition-all duration-300 group/btn`}
              >
                <ExternalLink size={14} />
                Demo
                <ArrowUpRight size={12} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Corner accent */}
        <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${accent.gradient} opacity-10
          -translate-x-10 -translate-y-10 rounded-full blur-2xl transition-opacity duration-500
          ${isHovered ? "opacity-30" : "opacity-10"}`} 
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard3D;
