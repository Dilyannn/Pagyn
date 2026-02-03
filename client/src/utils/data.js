import { Lightbulb, BookOpen, Download, Library } from "lucide-react";

export const FEATURES = [
	{
		title: "AI Story Assistance",
		description:
			"Overcome writer's block with intelligent plot suggestions, character development ideas, and smart content generation.",
		icon: Lightbulb,
		gradient: "from-amber-500 via-orange-500 to-yellow-500",
	},
	{
		title: "Distraction-Free Writing",
		description:
			"Focus on your story with our clean, minimalist editor designed to keep you in the flow state.",
		icon: BookOpen,
		gradient: "from-blue-500 via-cyan-500 to-teal-500",
	},
	{
		title: "Organize Your Work",
		description:
			"Keep all your chapters, drafts, and notes perfectly organized in one intuitive dashboard.",
		icon: Library,
		gradient: "from-emerald-500 via-green-500 to-lime-500",
	},
	{
		title: "Publish Anywhere",
		description:
			"Export your masterpiece in multiple formats including PDF and EPUB, ready for publishing.",
		icon: Download,
		gradient: "from-purple-500 via-pink-500 to-rose-500",
	},
];

export const TESTIMONIALS = [
	{
		quote:
			"Pagyn has completely transformed my writing process. The AI suggestions are so accurate and help me overcome my block instantly.",
		author: "Sarah J. Mitchell",
		title: "Fantasy Author",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		rating: 5,
	},
	{
		quote:
			"The distraction-free interface is exactly what I needed. I've finished more chapters in the last month than I did in the entire previous year.",
		author: "David Chen",
		title: "Freelance Writer",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		rating: 5,
	},
	{
		quote:
			"Finally, a writing tool that doesn't feel cluttered. Organizing my complex plot threads has never been easier. Highly recommended!",
		author: "Emily Rodriguez",
		title: "Screenwriter",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
		rating: 5,
	},
];