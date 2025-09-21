import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Razorpay Clone",
    description: "A beautiful clone of the Razorpay website built to demonstrate usage of TailwindCSS.",
    image: "/projects/project1.png",
    tags: ["HTML", "TailwindCSS"],
    demoUrl: "https://manyakalra05-razorpay.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/razorpay  ",
  },
  {
    id: 2,
    title: "My Portfolio",
    description:
      "A stellar personal portfolio demonstrating proficiency in ReactJS and TailwindCSS",
    image: "/projects/project2.png",
    tags: ["TailwindCSS", "React.js"],
    demoUrl: "#",
    githubUrl: "#",
  },

   {
    id: 3,
    title: "MovieLand",
    description: "A small website to search for your favourite movies! Bult using ReactJS and OMDB API",
    image: "/projects/project3.png",
    tags: ["HTML", "TailwindCSS", "OMDB API"],
    demoUrl: "https://manyakalra05-movieland.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/movieapp",
  },

   {
    id: 4,
    title: "Amazon Clone",
    description: "An clone of the Amazon.com website built to demonstrate efficent usage of JavaScript.",
    image: "/projects/project4.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-amazon.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/amazonproj",
  },
   {
    id: 5,
    title: "Rock Paper Scissors",
    description: "Play Rock-Paper-Scissors with a computer, using fun emoji's!",
    image: "/projects/project5.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-rockpaperscissors.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/rockpaperscissors",
  },

   {
    id: 6,
    title: "Flower.",
    description: "Browse through various beautiful flowers, and send one to a love one! Heavy Usage of Vanilla CSS",
    image: "/projects/project6.png",
    tags: ["CSS", "HTML"],
    demoUrl: "https://manyakalra05-flowershop.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/flowershop",
  },

   {
    id: 7,
    title: "Flappy JS",
    description: "Can you save the JS Bird from falling onto the poles? Press Spacebar to Play!",
    image: "/projects/project7.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-flappybird.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/flappybird",
  },
  {
    id: 8,
    title: "3D Portfolio",
    description: "Another portfolio I created that has a cool 3D animation!",
    image: "/projects/project8.png",
    tags: ["React","HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-3dportfolio.netlify.app",
    githubUrl: "https://github.com/manyakalra05/3Dportfolio",
  },
  {
    id: 9,
    title: "NASA's Picture of the Day",
    description: "see NASA's picture of the day, implemented through their official API",
    image: "/projects/project9.png",
    tags: ["React","HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-nasa-picoftheday.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/nasa-picoftheday",
  },
  {
    id: 10,
    title: "Pixel Pet Patadise",
    description: "Play with a cute pet of yours! All animations are made by me!",
    image: "/projects/project10.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-doggame.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/doggame",
  },
  {
    id: 11,
    title: "Expense Tracker",
    description: "Keep  track of your financials in an organised way! ",
    image: "/projects/project11.png",
    tags: ["MERN"],
    demoUrl: "https://manyakalra05-financial-tracking.onrender.com/#/dashboard",
    githubUrl: "https://github.com/manyakalra05/expense-tracking",
  },
  {
    id: 12,
    title: "Reflct",
    description: "A full stack Journaling Website where you can pen down your thoughts, track your mood and much more! ",
    image: "/projects/project12.png",
    tags: ["Neon DB", "Clerk", "Prisma", "ShadCN", "NextJS"],
    demoUrl: "https://reflct-yourthoughts.vercel.app/",
    githubUrl: "https://github.com/manyakalra05/reflct",
  },
  {
    id: 13,
    title: "Pixel Arcade",
    description: "Enter a virtual pixel arcade and explore some fan favourite games!",
    image: "/projects/project13.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://manyakalra05-arcade.netlify.app/",
    githubUrl: "https://github.com/manyakalra05/arcade",
  },
  {
    id: 14,
    title: "KeyRush",
    description: "Do you have what it takes to be a typing master? Find out!",
    image: "/projects/project14.png",
    tags: ["HTMl", "JavaScript", "CSS"],
    demoUrl: "https://typing-test-jet.vercel.app/",
    githubUrl: "https://github.com/manyakalra05/typing-test",
  },
    {
    id: 15,
    title: "Reflct",
    description: "Pen down your thoughts, track your mood, make collections and much more!",
    image: "/projects/project15.png",
    tags: ["RectJS", "NodeJS", "NextJS", "NeonDB", "Prisma", "Clerk"],
    demoUrl: "https://reflct-yourthoughts.vercel.app/",
    githubUrl: "https://github.com/manyakalra05/reflct",
  },
    {
    id: 16,
    title: "IGDTUW Civic Issue Reporter",
    description: "Make our campus better by putting your concerns on the front!",
    image: "/projects/project16.png",
    tags: ["ReactJS", "TypeScript", "SVG", "Supabase", "SQL"],
    demoUrl: "https://igdtuw-civic-issue-reporter.vercel.app/",
    githubUrl: "https://github.com/manyakalra05/igdtuw-civic-issue-reporter",
  },
    {
    id: 17,
    title: "Pixxel",
    description: "Show your creativity by making wonderful image edits with the help of AI!",
    image: "/projects/project17.png",
    tags: ["RectJS", "NodeJS", "NextJS", "Convex", "FabricJS", "Clerk", "ImageKit"],
    demoUrl: "https://pixxel-it.vercel.app/",
    githubUrl: "https://github.com/manyakalra05/pixxel",
  },
  


];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Feel free to explore!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/manyakalra05"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
