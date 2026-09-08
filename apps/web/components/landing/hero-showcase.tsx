"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Circle, LayoutGrid, MousePointer2, Pause, Play, Plus, X } from "lucide-react";
import styles from "./hero-showcase.module.css";

export function HeroShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setRunning(inView && !query.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      update();
    });
    if (root.current) observer.observe(root.current);
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={root} className={styles.showcase} data-running={running && !paused}>
      <div className={styles.scene} role="img" aria-label="An interface taking shape: an Add button appears in a project, its menu opens, and a drawer reveals a new task form.">
        <div className={styles.window} aria-hidden="true">
          <div className={styles.toolbar}>
            <span className={styles.appMark}><LayoutGrid size={14} /></span>
            <span>Workspace</span><span className={styles.slash}>/</span><span>Website refresh</span>
            <span className={styles.avatar}>A</span>
          </div>
          <div className={styles.content}>
            <div className={styles.headingRow}>
              <div><span className={styles.eyebrow}>PROJECT</span><h2>Website refresh</h2></div>
              <div className={styles.add}><Plus size={14} /> Add <ChevronDown size={12} /></div>
            </div>
            <div className={styles.projectMeta}><span>In progress</span><span>3 tasks</span></div>
            <div className={styles.tasks}>
              <div><Check size={14} /><span className={styles.completed}>Define the direction</span><span className={styles.initial}>A</span></div>
              <div><Circle size={14} /><span>Build the homepage</span><span className={styles.initial}>J</span></div>
              <div><Circle size={14} /><span>Review the interactions</span><span className={styles.initial}>A</span></div>
            </div>
            <div className={styles.projectFooter}><span>Updated just now</span><ArrowUpRight size={13} /></div>
          </div>
          <div className={styles.menu}>
            <div className={styles.menuSelected}><Plus size={14} /><span>New task</span><span className={styles.shortcut}>N</span></div>
            <div><LayoutGrid size={14} /><span>New section</span></div>
          </div>
          <div className={styles.scrim} />
          <div className={styles.drawer}>
            <div className={styles.drawerTop}><span>New task</span><X size={15} /></div>
            <div className={styles.drawerBody}>
              <span className={styles.fieldLabel}>Task name</span>
              <div className={styles.input}>Polish the final details<span className={styles.caret} /></div>
              <span className={styles.fieldLabel}>Description</span>
              <div className={styles.textarea}>Check spacing, focus states, and motion.</div>
              <span className={styles.fieldLabel}>Assignee</span>
              <div className={styles.assignee}><span className={styles.initial}>A</span>Alex<ChevronDown size={12} /></div>
            </div>
            <div className={styles.drawerBottom}><span>Create task <ArrowUpRight size={13} /></span></div>
          </div>
          <MousePointer2 className={styles.cursor} size={22} fill="currentColor" />
        </div>
      </div>
      <div className={styles.caption}>
        <span>From component to interface.</span>
        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play interface demo" : "Pause interface demo"} aria-pressed={paused}>
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
    </div>
  );
}
