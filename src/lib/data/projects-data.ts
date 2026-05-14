// Re-export from the canonical source so we keep a single source of truth
// for portfolio projects and metrics. The admin profile actions and the
// public site both consume these.
export {
    projectsData,
    metricsData,
    type Project as ProjectData,
    type Metric as MetricData,
} from "@/lib/projects-and-testimonials";
