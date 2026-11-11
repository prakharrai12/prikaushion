import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { skillGroups, constellationNodes } from '../config/skills';
import { gsap } from '../lib/gsap';

export const Toolkit: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<{ [id: string]: { x: number; y: number } }>({});

  // Animate skill bars on scroll enter
  useEffect(() => {
    if (!barsContainerRef.current) return;

    const bars = barsContainerRef.current.querySelectorAll<HTMLElement>('.skill-fill-bar');
    bars.forEach((bar, i) => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          delay: i * 0.04,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, []);

  // Constellation floating animation + cursor repel
  useEffect(() => {
    let animId: number;
    let t = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const svg = document.getElementById('constellation-svg');
      if (svg) {
        const rect = svg.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animateNodes = () => {
      t += 0.02;
      const newPos: { [id: string]: { x: number; y: number } } = {};

      constellationNodes.forEach((node, idx) => {
        // Perlin-style gentle drift (+-3%)
        const driftX = Math.sin(t + idx) * 2;
        const driftY = Math.cos(t * 0.8 + idx * 1.5) * 2;

        let curX = node.x + driftX;
        let curY = node.y + driftY;

        // Repel from cursor if within 18% radius
        const dx = curX - mouseX;
        const dy = curY - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 18 && dist > 0) {
          const repelForce = (1 - dist / 18) * 8;
          curX += (dx / dist) * repelForce;
          curY += (dy / dist) * repelForce;
        }

        newPos[node.id] = { x: curX, y: curY };
      });

      setNodePositions(newPos);
      animId = requestAnimationFrame(animateNodes);
    };

    animId = requestAnimationFrame(animateNodes);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="toolkit"
      ref={containerRef}
      data-bg="grad-void"
      data-accent-x="30%"
      data-accent-y="20%"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="Toolkit and Technical Skills"
    >
      <SectionHeader
        index="05"
        metaName="TOOLKIT"
        ghostWord="TOOLKIT"
        line1="The tools"
        line2="of the *trade*"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Column: Interactive Constellation Star-Map (Desktop >= 900px) */}
        <div className="hidden lg:flex lg:col-span-5 sticky top-[14vh] flex-col items-center justify-center p-6 border border-bone-faint rounded-lg bg-obsidian/60 shadow-2xl">
          <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-bone-dim mb-4">
            <span>SKILL CONSTELLATION</span>
            <span className="text-crimson">INTERACTIVE NODES</span>
          </div>

          <div className="relative w-full aspect-square max-w-[480px]">
            <svg
              id="constellation-svg"
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
            >
              {/* Edges connecting nodes */}
              {constellationNodes.map((node) => {
                const posA = nodePositions[node.id] || { x: node.x, y: node.y };

                return node.connections.map((targetId) => {
                  const targetNode = constellationNodes.find((n) => n.id === targetId);
                  if (!targetNode || targetNode.id < node.id) return null; // Avoid duplicate lines
                  const posB = nodePositions[targetId] || { x: targetNode.x, y: targetNode.y };

                  const isEdgeActive =
                    hoveredSkill &&
                    (node.name.toLowerCase().includes(hoveredSkill.toLowerCase()) ||
                      targetNode.name.toLowerCase().includes(hoveredSkill.toLowerCase()));

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={posA.x}
                      y1={posA.y}
                      x2={posB.x}
                      y2={posB.y}
                      stroke={isEdgeActive ? '#E01B24' : '#F4EFE4'}
                      strokeWidth={isEdgeActive ? '1' : '0.4'}
                      strokeOpacity={isEdgeActive ? 0.9 : 0.18}
                      className="transition-colors duration-200"
                    />
                  );
                });
              })}

              {/* Node Dots & Labels */}
              {constellationNodes.map((node) => {
                const pos = nodePositions[node.id] || { x: node.x, y: node.y };
                const isHovered =
                  hoveredSkill && node.name.toLowerCase().includes(hoveredSkill.toLowerCase());

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredSkill(node.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring on hover/core */}
                    {isHovered && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="4.5"
                        fill="none"
                        stroke="#E01B24"
                        strokeWidth="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHovered ? 3.2 : node.core ? 2.2 : 1.6}
                      fill={isHovered ? '#E01B24' : node.core ? '#E01B24' : '#F4EFE4'}
                      className="transition-all duration-300"
                    />

                    {/* Mono Label */}
                    <text
                      x={pos.x}
                      y={pos.y - 3.5}
                      textAnchor="middle"
                      className={`font-mono text-[4px] uppercase tracking-wider transition-opacity duration-200 ${
                        isHovered
                          ? 'fill-crimson opacity-100 font-semibold'
                          : 'fill-bone-dim opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-widest text-bone-dim mt-4">
            HOVER NODES TO HIGHLIGHT CONNECTED CAPABILITIES
          </span>
        </div>

        {/* Right Column: Grouped Lists with Hairlines & Skill Bars */}
        <div ref={barsContainerRef} className="lg:col-span-7 flex flex-col gap-10">
          {skillGroups.map((group) => (
            <div key={group.id} className="flex flex-col border-b border-bone-faint pb-8">
              {/* Group Header */}
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-6">
                <span className="text-crimson font-medium">({group.index})</span>
                <span className="text-bone font-semibold">{group.category}</span>
              </div>

              {/* Group Items */}
              <div className="flex flex-col gap-4">
                {group.items.map((item, iIdx) => {
                  const isHovered =
                    hoveredSkill &&
                    (hoveredSkill.toLowerCase().includes(item.name.toLowerCase()) ||
                      item.name.toLowerCase().includes(hoveredSkill.toLowerCase()));

                  return (
                    <div
                      key={iIdx}
                      onMouseEnter={() => setHoveredSkill(item.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setHoveredSkill(hoveredSkill === item.name ? null : item.name)}
                      className={`flex flex-col md:flex-row md:items-center justify-between gap-2 p-2 rounded transition-colors duration-200 cursor-pointer ${
                        isHovered ? 'bg-charcoal/60' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-sans font-medium text-base md:text-lg transition-colors ${
                            isHovered ? 'text-crimson font-semibold' : 'text-bone'
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.core && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-crimson px-2 py-0.5 border border-crimson/30 rounded-pill">
                            CORE
                          </span>
                        )}
                      </div>

                      {/* Animated Skill Bar (Frontend, Backend, AI only) */}
                      {item.level !== undefined && (
                        <div className="flex items-center gap-4 w-full md:w-56 shrink-0">
                          <div className="grow h-[2px] bg-bone-faint relative overflow-hidden rounded-full">
                            <div
                              data-level={item.level}
                              className="skill-fill-bar absolute inset-y-0 left-0 bg-crimson origin-left"
                              style={{ width: `${item.level}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-bone-dim tabular-nums w-8 text-right">
                            {item.level}%
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
