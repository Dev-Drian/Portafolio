"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

/* ── Color accents per project ──────────────────────────── */
const accentMap: Record<string, { line: string; glow: string; dot: string; tag: string; tagBg: string; hover: string; iconBg: string }> = {
  purple:  { line: "bg-violet-400",  glow: "shadow-violet-500/20", dot: "bg-violet-400",  tag: "text-violet-300/70",  tagBg: "bg-violet-500/[0.08]", hover: "hover:text-violet-300", iconBg: "bg-violet-500/[0.1] group-hover:bg-violet-500/[0.15]" },
  emerald: { line: "bg-emerald-400", glow: "shadow-emerald-500/20", dot: "bg-emerald-400", tag: "text-emerald-300/70", tagBg: "bg-emerald-500/[0.08]", hover: "hover:text-emerald-300", iconBg: "bg-emerald-500/[0.1] group-hover:bg-emerald-500/[0.15]" },
  blue:    { line: "bg-blue-400",    glow: "shadow-blue-500/20",    dot: "bg-blue-400",    tag: "text-blue-300/70",    tagBg: "bg-blue-500/[0.08]", hover: "hover:text-blue-300", iconBg: "bg-blue-500/[0.1] group-hover:bg-blue-500/[0.15]" },
  orange:  { line: "bg-amber-400",   glow: "shadow-amber-500/20",   dot: "bg-amber-400",   tag: "text-amber-300/70",   tagBg: "bg-amber-500/[0.08]", hover: "hover:text-amber-300", iconBg: "bg-amber-500/[0.1] group-hover:bg-amber-500/[0.15]" },
  cyan:    { line: "bg-cyan-400",    glow: "shadow-cyan-500/20",    dot: "bg-cyan-400",    tag: "text-cyan-300/70",    tagBg: "bg-cyan-500/[0.08]", hover: "hover:text-cyan-300", iconBg: "bg-cyan-500/[0.1] group-hover:bg-cyan-500/[0.15]" },
  pink:    { line: "bg-pink-400",    glow: "shadow-pink-500/20",    dot: "bg-pink-400",    tag: "text-pink-300/70",    tagBg: "bg-pink-500/[0.08]", hover: "hover:text-pink-300", iconBg: "bg-pink-500/[0.1] group-hover:bg-pink-500/[0.15]" },
  indigo:  { line: "bg-indigo-400",  glow: "shadow-indigo-500/20",  dot: "bg-indigo-400",  tag: "text-indigo-300/70",  tagBg: "bg-indigo-500/[0.08]", hover: "hover:text-indigo-300", iconBg: "bg-indigo-500/[0.1] group-hover:bg-indigo-500/[0.15]" },
  amber:   { line: "bg-amber-400",   glow: "shadow-amber-500/20",   dot: "bg-amber-400",   tag: "text-amber-300/70",   tagBg: "bg-amber-500/[0.08]", hover: "hover:text-amber-300", iconBg: "bg-amber-500/[0.1] group-hover:bg-amber-500/[0.15]" },
};

/* ── Component ──────────────────────────────────────────── */
interface PortafolioBoxProps {
  data: {
    id: number;
    title: string;
    image: string;
    urlGithub: string;
    urlDemo: string;
    description?: string;
    tags?: string[];
    color?: string;
  };
  index: number;
}

const PortafolioBox = ({ data, index }: PortafolioBoxProps) => {
  const { title, image, urlGithub, urlDemo, description, tags, color = "emerald" } = data;
  const accent = accentMap[color] || accentMap.emerald;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden bg-[#0c0e17]/80 backdrop-blur-sm
        border border-white/[0.06] hover:border-white/[0.12]
        transition-[border-color,box-shadow] duration-500
        hover:shadow-lg ${accent.glow}`}
    >
      {/* Top accent line — slides in from center */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className={`h-[2px] w-0 group-hover:w-full ${accent.line} opacity-0 group-hover:opacity-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} />
      </div>

      {/* Image container */}
      <div className="relative overflow-hidden">
        <div className="relative overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            width={600}
            height={340}
            className="w-full h-[190px] object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:scale-[1.05] group-hover:brightness-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-[#0c0e17]/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        </div>

        {/* Floating arrow icon — appears on hover */}
        <motion.div
          className={`absolute top-3 right-3 w-8 h-8 rounded-lg ${accent.iconBg}
            backdrop-blur-md flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0`}
        >
          <ArrowUpRight size={14} className="text-white/70" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-3 space-y-3">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-white/90 tracking-tight leading-snug group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[12.5px] leading-[1.6] text-white/35 line-clamp-2 group-hover:text-white/45 transition-colors duration-500">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-0.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-medium
                  ${accent.tagBg} ${accent.tag} transition-colors duration-300`}
              >
                <span className={`w-1 h-1 rounded-full ${accent.dot} opacity-50`} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="flex items-center gap-4 pt-3 border-t border-white/[0.05]">
          <Link
            href={urlGithub}
            target="_blank"
            className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/30
              ${accent.hover} transition-all duration-300 hover:gap-2`}
          >
            <Github size={13} strokeWidth={1.5} />
            Código
          </Link>
          <Link
            href={urlDemo}
            target="_blank"
            className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/30
              ${accent.hover} transition-all duration-300 hover:gap-2`}
          >
            <ExternalLink size={13} strokeWidth={1.5} />
            Demo
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortafolioBox;
