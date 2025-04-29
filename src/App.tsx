import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code } from "lucide-react";
import wtiImage from "./assets/wti.jpg";
import estimatesImage from "./assets/esti-mates.png";
import velellaImage from "./assets/velella.png";
import emailjs from "@emailjs/browser";

const RELEASING_SOON = "Releasing soon!";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [text, setText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey,
      )
      .then(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus(""), 5000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setFormStatus("error");
      });
  };

  useEffect(() => {
    const codeLines = [
      "> Hello World!",
      "> const developer = {",
      '>   name: "Reilynn Olsen",',
      '>   role: "Full Stack Developer",',
      '>   skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"],',
      '>   passions: ["Clean Code", "UI/UX", "Problem Solving"]',
      "> };",
      "> developer.createAmazingWebsites();",
    ];
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setText((prevText) => prevText + codeLines[currentLine] + "\n");
        setCurrentLine((prevLine) => prevLine + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  const projects = [
    {
      title: "Esti-Mate",
      description: "A fullstack quote generation tool",
      technologies: ["Next.JS", "Prisma", "PostgreSQL", "Tailwind"],
      github: "https://github.com/Reilynn-Olsen/EstiMate",
      demo: "https://esti-mate-iota.vercel.app/",
      image: estimatesImage,
    },
    {
      title: "Velella",
      description: "A music streaming client for Jellyfin",
      technologies: ["React", "Typescript", "Tailwind CSS"],
      github: "https://github.com/Reilynn-Olsen/Velella",
      image: velellaImage,
    },
    {
      title: "Words to Impress",
      description:
        "A vocabulary building app based on the book The Words You Should Know",
      technologies: ["React Native", "Javascript", "Expo"],
      image: wtiImage,
      demo: RELEASING_SOON,
    },
  ];

  const skills = [
    {
      name: "Frontend",
      items: ["React", "TypeScript", "React Native", "Tailwind CSS", "SCSS"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express", "Next.JS", "PostgreSQL", "Ruby"],
    },
    { name: "Tools", items: ["Git", "Github", "Jest", "Docker", "Linux"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-pink-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <nav className="backdrop-blur-lg bg-white/10 rounded-xl p-4 mb-12 sticky top-4 z-20 border border-white/20 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Reilynn Olsen</div>
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveSection("home")}
                className={`hover:text-purple-300 transition ${activeSection === "home" ? "text-purple-300" : ""}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveSection("skills")}
                className={`hover:text-purple-300 transition ${activeSection === "skills" ? "text-purple-300" : ""}`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`hover:text-purple-300 transition ${activeSection === "projects" ? "text-purple-300" : ""}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveSection("contact")}
                className={`hover:text-purple-300 transition ${activeSection === "contact" ? "text-purple-300" : ""}`}
              >
                Contact
              </button>
            </div>
          </div>
        </nav>

        <section
          id="home"
          className={`mb-20 ${activeSection !== "home" && "hidden"}`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Full Stack Developer
                </h1>
                <h2 className="text-2xl md:text-3xl text-purple-300 mb-6">
                  Building modern web experiences
                </h2>
                <p className="mb-6 text-lg">
                  I craft responsive websites and applications with clean code
                  and cutting-edge technologies. Let's build something amazing
                  together.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Reilynn-Olsen"
                    className="p-2 backdrop-blur-md bg-white/20 rounded-full hover:bg-white/30 transition"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/reilynn-olsen/"
                    className="p-2 backdrop-blur-md bg-white/20 rounded-full hover:bg-white/30 transition"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="mailto:ReilynnOlsen@gmail.com"
                    className="p-2 backdrop-blur-md bg-white/20 rounded-full hover:bg-white/30 transition"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="backdrop-blur-lg bg-black/40 rounded-2xl overflow-hidden border border-white/20 shadow-xl h-80">
                <div className="bg-gray-900 py-2 px-4 flex items-center space-x-2 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-sm opacity-70">
                    terminal@portfolio
                  </div>
                </div>
                <div className="p-4 font-mono text-green-400 overflow-hidden h-full">
                  <pre className="whitespace-pre-line">{text}</pre>
                  <span className="animate-pulse">▌</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className={`mb-20 ${activeSection !== "skills" && "hidden"}`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Code size={16} className="text-purple-300" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className={`mb-20 ${activeSection !== "projects" && "hidden"}`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4 text-gray-200">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs backdrop-blur-md bg-white/20 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-1 text-purple-300 hover:text-purple-100 transition"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo === RELEASING_SOON ? (
                      <p>{RELEASING_SOON}</p>
                    ) : (
                      project.demo && (
                        <a
                          href={project.demo}
                          className="flex items-center gap-1 text-purple-300 hover:text-purple-100 transition"
                        >
                          <ExternalLink size={16} />
                          <span>Demo</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`mb-20 ${activeSection !== "contact" && "hidden"}`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {formStatus === "sending" && (
                <div className="bg-blue-900/50 backdrop-blur-md p-4 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-300 mr-3"></div>
                  <p>Sending your message...</p>
                </div>
              )}

              {formStatus === "success" && (
                <div className="bg-green-900/50 backdrop-blur-md p-4 rounded-lg">
                  <p>Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="bg-red-900/50 backdrop-blur-md p-4 rounded-lg">
                  <p>
                    Something went wrong. Please try again or email me directly.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
                disabled={formStatus === "sending"}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <footer className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl text-center">
          <p>
            © {new Date().getFullYear()} Reilynn Olsen. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://github.com/Reilynn-Olsen"
              className="hover:text-purple-300 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/reilynn-olsen/"
              className="hover:text-purple-300 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ReilynnOlsen@gmail.com"
              className="hover:text-purple-300 transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
