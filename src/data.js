export const portfolioData = {
  about: {
    text: "I am a self taught developer currently learning and researching on CPU based LLMs. Dropped out of college (nothing fancy) to support family. Currently contributing to Project Mesa for GSoC'26. ",
  },
  timeline: [
    {
      year: "2026",
      title: "GSoC contributor (Project Mesa)",
      description: "",
      current: true,
    },
    {
      year: "2022",
      title: "Dropped out of college (AVCOE)",
      description: "",
    },
  ],
  projects: [
    {
      title: "Hypergraph Based Meta-Agents for Mesa (GSoC'26)",
      description:
        "A canonical meta-agent architecture for Mesa to better support multi-level modeling. It introduces a unified backend for handling overlapping, typed group memberships (such as households, workplaces, and teams), along with a clean API for managing groups, memberships, and lifecycle operations. The system also enables group-level state aggregation, backed by tests and documentation, providing a solid foundation for more advanced group-based simulations in Mesa. ",
      link: "https://summerofcode.withgoogle.com/programs/2026/projects/8Rhd5XVJ",
      tag: "Open-Source",
    },
    {
      title: "Axon",
      description:
        "A Rust-based TUI for a coding agent featuring dynamic task routing, automatic task decomposition, and specialized agents (Planner, Coder, Reviewer, Tester, Explorer) with session persistence and real-time streaming responses.",
      link: "https://github.com/falloficaruss/axon.git",
      tag: "TUI",
    },
    {
      title: "MythosCore",
      description:
        "An open research implementation of a recurrent-depth transformer architecture that replaces parameter scaling with iterative internal reasoning, featuring dual semantic/reasoning state streams, adaptive computation halting, optional sparse MoE layers, and RoPE-based grouped-query attention.",
      link: "https://github.com/falloficaruss/MythosCore.git",
      tag: "LLM",
    },
    {
      title: "hyper-croissant",
      description:
        "A Tauri-based chess GUI with a Rust backend, featuring UCI engine integration, FEN parsing, legal move generation, and real-time position analysis via the shakmaty library.",
      link: "https://github.com/falloficaruss/hyper-croissant.git",
      tag: "Chess GUI",
    },
  ],
  blogs: [
    {
      title: "Understanding CSS Animations",
      description: "A deep dive into creating performant micro-animations.",
      link: "#",
      category: "technical",
    },
    {
      title: "My Journey into Web Dev",
      description: "Reflections and lessons learned over the years.",
      link: "#",
      category: "guide",
    },
    {
      title: "10 Tips for Better Code",
      description: "Simple practices that will make your codebase more maintainable.",
      link: "#",
      category: "technical"
    }
  ]
};
