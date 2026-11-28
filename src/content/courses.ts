// Claude 101 course content for /courses.
//
// To publish a video:
//   1. Prepare it for fast loading (moves the index to the front, lighter audio,
//      keeps the picture untouched) and add a cover image:
//        ffmpeg -i in.mp4 -c:v copy -c:a aac -b:a 96k -movflags +faststart public/course-videos/claude-101-mX-vY.mp4
//        ffmpeg -ss 20 -i public/course-videos/claude-101-mX-vY.mp4 -frames:v 1 -vf scale=1280:-1 -q:v 3 public/course-videos/claude-101-mX-vY-poster.jpg
//   2. Set `status: "live"`, `videoUrl`, `poster` and `duration` on that video.
//   Each live video gets its own page at /courses/<slug>. The slug is made from
//   the title. Once a video's link has been shared, set `slug` by hand before
//   changing its title, so the old link keeps working.
//   Files in /course-videos are cached for a year, so a changed video needs a new file name.
// Videos marked "coming-soon" (and modules with no live video) show blurred and locked.

export type LessonStatus = "live" | "coming-soon";

export interface CourseLesson {
  id: string;
  /** Web address of the video page: /courses/<slug> */
  slug: string;
  number: number;
  title: string;
  topics: string[];
  status: LessonStatus;
  duration?: string;
  /** Path in /public, e.g. /course-videos/claude-101-m1-v1.mp4 */
  videoUrl?: string;
  /** Cover image shown before the video plays. */
  poster?: string;
  /** One line shown under the title. */
  summary?: string;
  /** "Task & resources" panel. The button shows only when task or readMore is set. */
  task?: string;
  /** Small muted tip shown under the task. */
  taskTip?: string;
  /** Rows of the sample table; the first row is the header. Copied as "a, b, c" per line. */
  sampleData?: string[][];
  /** Shown next to the "Sample data" heading, e.g. "USD thousands". */
  sampleDataNote?: string;
  /** File name in /public/course-files, offered as "Download Excel". */
  sampleFile?: string;
  readMore?: { title: string; url: string }[];
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  lessons: CourseLesson[];
}

export const courseName = "Claude 101";

type LessonInput = Omit<CourseLesson, "id" | "number" | "status" | "slug"> &
  Partial<Pick<CourseLesson, "status" | "slug">>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildModule(number: number, title: string, lessons: LessonInput[]): CourseModule {
  return {
    id: `module-${number}`,
    number,
    title,
    lessons: lessons.map((l, i) => ({
      status: "coming-soon",
      ...l,
      slug: l.slug ?? slugify(l.title),
      id: `m${number}-v${i + 1}`,
      number: i + 1,
    })),
  };
}

export const courseModules: CourseModule[] = [
  buildModule(1, "The basics", [
    {
      title: "Meet Claude, your new analyst",
      status: "live",
      duration: "4:30",
      videoUrl: "/course-videos/claude-101-m1-v1.mp4",
      poster: "/course-videos/claude-101-m1-v1-poster.jpg",
      topics: [
        "What Claude is and who makes it",
        "The one rule: Claude drafts, you decide",
        "Which plan to start on, and the rule on company data",
        "First task: summarise a public annual report and check two numbers",
      ],
    },
    {
      title: "Your first conversation",
      summary: "Same data, same Claude, two very different answers. The difference is the brief.",
      task: "Open Claude and attach the annual report you used in Lesson 1. Write a brief that says who it is for, what data Claude has, what to do, and what to send back. Send it. Then reply twice: once to fix something, and once to change the format.",
      readMore: [
        {
          title: "Change the model, effort and thinking settings",
          url: "https://support.claude.com/en/articles/8664678-change-the-model-effort-and-extended-thinking-settings",
        },
        { title: "Upload files to Claude", url: "https://support.claude.com/en/articles/8241126-upload-files-to-claude" },
      ],
      status: "live",
      duration: "4:31",
      videoUrl: "/course-videos/claude-101-m1-v2.mp4",
      poster: "/course-videos/claude-101-m1-v2-poster.jpg",
      topics: [
        "A tour of the chat screen",
        "What a good brief contains",
        "Choosing a model and effort level",
        "Replying to improve an answer instead of starting over",
      ],
    },
    {
      title: "Claude makes things",
      summary: "Most finance work ends in a file. In this lesson, you ask Claude for the file itself.",
      task: "Copy the sample table below into Claude, or attach the Excel file. Ask for an Excel tracker with a growth formula for each region and a total row. Open the file and click two growth cells to see the formulas. Then ask for one change: add a column for each region's share of total sales. Check that the shares add up to 100%.",
      taskTip: "If Claude replies in text instead of sending a file, go to Settings, then Capabilities, and turn on Code execution and file creation.",
      sampleData: [
        ["Region", "Q2", "Q3"],
        ["North", "410", "490"],
        ["South", "380", "320"],
        ["West", "220", "260"],
        ["East", "500", "570"],
      ],
      sampleDataNote: "USD thousands",
      sampleFile: "claude101-sample-sales.xlsx",
      readMore: [
        {
          title: "Create and edit files with Claude",
          url: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        },
        {
          title: "What are artifacts and how do I use them?",
          url: "https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them",
        },
        { title: "Use Research on Claude", url: "https://support.claude.com/en/articles/11088861-use-research-on-claude" },
      ],
      status: "live",
      duration: "4:23",
      videoUrl: "/course-videos/claude-101-m1-v3.mp4",
      poster: "/course-videos/claude-101-m1-v3-poster.jpg",
      topics: [
        "Real files: Excel, Word and slides",
        "Artifacts: pages and small tools Claude builds in the chat",
        "When to use web search and when to use Research",
        "Asking for changes to a file Claude made",
      ],
    },
    {
      title: "Projects, memory and privacy",
      topics: [
        "One project for each piece of work",
        "Adding files and house rules once",
        "How memory works, and where its settings are",
        "Who can see your data",
      ],
    },
    {
      title: "Skills and plugins",
      topics: [
        "What a skill is",
        "Turning a monthly task into a skill",
        "Finance plugins",
        "Testing a skill on last month's work",
      ],
    },
    {
      title: "Connectors and Claude in your tools",
      topics: [
        "What a connector is and what it can reach",
        "Claude inside Excel",
        "Connecting only what you need",
        "A first-week plan: one small task a day",
      ],
    },
  ]),
  buildModule(2, "Prompting for finance", [
    {
      title: "Why your prompts disappoint",
      topics: [
        "Why answers come back weak",
        "Where AI helps in finance, and where it does not",
        "The new-hire test for any prompt",
      ],
    },
    {
      title: "PTCF: the four-part brief",
      topics: ["Persona, Task, Context, Format", "Building a real prompt live", "Spotting the missing part"],
    },
    {
      title: "Before and after: variance commentary",
      topics: [
        "One common prompt and the five decisions it hides",
        "Rebuilding it for a board pack",
        "Basis, period, currency and threshold",
      ],
    },
    {
      title: "Prompt clinic: three near-misses",
      topics: [
        "A cash forecast prompt",
        "An overhead review prompt",
        "An accounting question prompt",
        "The one fault all three share",
      ],
    },
    {
      title: "The five-step prompting loop",
      topics: [
        "Define, Supply, Constrain, Audit, Iterate",
        "Why you should not start over",
        "Asking for the rows behind each figure",
      ],
    },
  ]),
  buildModule(3, "Real work, end to end", [
    {
      title: "Case study: the pack and the brief",
      topics: [
        "The raw workbook, untouched",
        "The prompt, mapped to the four-part brief",
        "Claude checking the data first",
      ],
    },
    {
      title: "Case study: the output, checked",
      topics: [
        "What Claude caught",
        "What stays with you",
        "A ratio that changed between two runs",
        "Tracing figures back to their cells",
      ],
    },
    {
      title: "Prompt library: analysis and forecasting",
      topics: [
        "Ready prompts for analysis and forecasting",
        "The inputs each prompt needs",
        "Swapping in your own figures",
      ],
    },
    {
      title: "Prompt library: strategy and the thought partner",
      topics: ["Board and deal work", "Covenants and policy", "Claude as your critic before you send a paper"],
    },
    {
      title: "Your role, your first task",
      topics: [
        "Three tests for a good AI task",
        "Task ideas by role",
        "Three tracks to choose from",
        "Running your first task end to end",
      ],
    },
  ]),
  buildModule(4, "Context, trust and guardrails", [
    {
      title: "What Claude actually sees",
      topics: [
        "What context means: files, figures and earlier turns",
        "Why long threads change answers",
        "Asking Claude what it is using",
      ],
    },
    {
      title: "When context goes wrong",
      topics: [
        "Four failures: poisoning, drift, distraction, clash",
        "The clue for each one",
        "Checking numbers against the source",
      ],
    },
    {
      title: "Six habits for clean context",
      topics: ["Six habits, and the words to use", "One thread for each deliverable", "When to start fresh"],
    },
    {
      title: "Trust the numbers",
      topics: [
        "Why typed numbers can wander",
        "Calculate, do not generate",
        "Recalculating figures before you use them",
      ],
    },
    {
      title: "Guardrails and the confident wrong answer",
      topics: [
        "What never goes into Claude",
        "How to catch an answer that sounds right and is wrong",
        "One monthly task, with a saved brief and an owner",
      ],
    },
  ]),
];

export function isModuleLive(mod: CourseModule): boolean {
  return mod.lessons.some((l) => l.status === "live");
}

export interface LessonRef {
  lesson: CourseLesson;
  mod: CourseModule;
}

/** Every video in course order, with its module. */
export function getAllLessons(): LessonRef[] {
  return courseModules.flatMap((mod) => mod.lessons.map((lesson) => ({ lesson, mod })));
}

export function getLiveLessons(): LessonRef[] {
  return getAllLessons().filter((x) => x.lesson.status === "live");
}

/** Only live videos have a page; locked ones return undefined. */
export function getLiveLessonBySlug(slug: string): LessonRef | undefined {
  return getLiveLessons().find((x) => x.lesson.slug === slug);
}

export function getNextLesson(id: string): LessonRef | undefined {
  const all = getAllLessons();
  const i = all.findIndex((x) => x.lesson.id === id);
  return i >= 0 ? all[i + 1] : undefined;
}

export function getPreviousLiveLesson(id: string): LessonRef | undefined {
  const all = getAllLessons();
  const i = all.findIndex((x) => x.lesson.id === id);
  for (let j = i - 1; j >= 0; j--) if (all[j].lesson.status === "live") return all[j];
  return undefined;
}

export function lessonHref(lesson: CourseLesson): string {
  return `/courses/${lesson.slug}`;
}

export { SITE_URL } from "@/lib/site";
export const INTRO_VIDEO = "/course-videos/cfo-ai-hub-intro.mp4";
