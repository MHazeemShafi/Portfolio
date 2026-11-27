export const projects = [
  {
    number: "01",
    name: "AIRMESH",
    category: "Web Platform",
    featured: true,
    accent: "red",
    description:
      "An air pollution monitoring platform providing environmental air quality data alongside timely pollution alerts and notifications.",
    features: [
      "Interactive air quality & pollution mapping",
      "Real-time pollution information & charts",
      "Timely pollution alerts and notifications",
    ],
    technologies: ["React", "Vite", "Supabase", "Leaflet", "Recharts", "Groq SDK"],
    repository: "https://github.com/MHazeemShafi/air-mesh",
  },
  {
    number: "02",
    name: "PixelShrink",
    category: "Web Utility",
    featured: true,
    accent: "slate",
    description:
      "A browser-based image compression tool built for fast, client-side image optimisation without server uploads.",
    features: [
      "Client-side Canvas API compression",
      "Batch image processing",
      "ZIP archive export via JSZip",
    ],
    technologies: ["JavaScript", "CSS", "Vite", "Canvas API", "JSZip"],
    repository: "https://github.com/MHazeemShafi/PixelShrink",
    live: "https://mhazeemshafi.github.io/PixelShrink/",
  },
  {
    number: "03",
    name: "NexSight",
    category: "Computer Vision",
    featured: false,
    accent: "stone",
    description:
      "A Python desktop computer-vision application for real-time YOLO object detection and tracking across camera, image, and video inputs.",
    features: [
      "Real-time YOLO object detection & tracking",
      "Camera, image, and video file input",
      "Detection logs, snapshots, and CSV export",
      "Optional local face recognition",
    ],
    technologies: ["Python", "OpenCV", "Ultralytics YOLO", "PySide6", "NumPy"],
    repository: "https://github.com/MHazeemshafi/NexSight",
  },
];

