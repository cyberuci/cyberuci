import { defineArrayMember, defineField, defineType } from 'sanity';
import { altTextField } from '../helpers';

const rackRole = defineArrayMember({
	name: 'rackRole',
	title: 'Role',
	type: 'object',
	fields: [
		defineField({
			name: 'tag',
			title: 'Tag',
			description: 'Short label, e.g. "Management"',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: { title: 'tag', subtitle: 'description' }
	}
});

const team = defineArrayMember({
	name: 'infraTeam',
	title: 'Team',
	type: 'object',
	fields: [
		defineField({
			name: 'tag',
			title: 'Tag',
			description: 'Short label, e.g. "Traditional"',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: { title: 'title', subtitle: 'tag' }
	}
});

const project = defineArrayMember({
	name: 'infraProject',
	title: 'Project',
	type: 'object',
	fields: [
		defineField({
			name: 'year',
			title: 'Year',
			description: 'Shown above the title, e.g. "[Dec 2026 - Present]"',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'image',
			title: 'Image',
			description:
				'Screenshot or animated GIF. GIFs are served as the original file so they stay animated.',
			type: 'image',
			options: {
				hotspot: true,
				accept: 'image/png,image/jpeg,image/webp,image/gif'
			},
			fields: [altTextField]
		})
	],
	preview: {
		select: { title: 'title', subtitle: 'year', media: 'image' }
	}
});

export default defineType({
	name: 'infrastructurePage',
	title: 'Infrastructure',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Page Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'Infrastructure'
		}),
		defineField({
			name: 'terminalLabel',
			title: 'Terminal Label',
			description: 'Shown above the 3D rack, e.g. "infrastructure@cyberuci"',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'infrastructure@cyberuci'
		}),
		defineField({
			name: 'splineUrl',
			title: 'Spline Scene URL',
			description: 'Published Spline scene used for the rack viewer',
			type: 'url',
			validation: (Rule) => Rule.required(),
			initialValue: 'https://prod.spline.design/gxk0gIYwe3OIqjNM/scene.splinecode'
		}),
		defineField({
			name: 'rackHeading',
			title: 'Rack Heading',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'THE RACK'
		}),
		defineField({
			name: 'rack',
			title: 'Rack Roles',
			type: 'array',
			of: [rackRole],
			validation: (Rule) => Rule.required().min(1),
			initialValue: [
				{
					_key: 'management',
					_type: 'rackRole',
					tag: 'Management',
					description:
						'Core services for the servers in the rack, including remote access used to troubleshoot and update them.'
				},
				{
					_key: 'virtualization',
					_type: 'rackRole',
					tag: 'Virtualization',
					description:
						'Practice environments for competition teams and hands-on demos during workshops.'
				},
				{
					_key: 'storage',
					_type: 'rackRole',
					tag: 'Storage',
					description: 'Shared storage for club services and virtual machines.'
				},
				{
					_key: 'firewall',
					_type: 'rackRole',
					tag: 'Firewall',
					description: 'The network edge that keeps lab traffic organized.'
				}
			]
		}),
		defineField({
			name: 'aboutHeading',
			title: 'About Heading',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'ABOUT US'
		}),
		defineField({
			name: 'aboutIntro',
			title: 'About Intro',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
			initialValue:
				'The Infrastructure Team is responsible for maintaining, troubleshooting, and improving our on-premise server rack in the Cyber@UCI lab space. Some responsibilities include:'
		}),
		defineField({
			name: 'responsibilities',
			title: 'Responsibilities',
			type: 'array',
			of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.required() })],
			validation: (Rule) => Rule.required().min(1),
			initialValue: [
				'Ensuring that our services are up-to-date',
				'Troubleshooting any issues that users are facing',
				'Supporting competition teams in creating mock environments',
				'Creating internal tools',
				'Improving the overall structure and user experience of our server rack'
			]
		}),
		defineField({
			name: 'teamsHeading',
			title: 'Teams Heading',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'TEAMS'
		}),
		defineField({
			name: 'teams',
			title: 'Teams',
			type: 'array',
			of: [team],
			validation: (Rule) => Rule.required().min(1),
			initialValue: [
				{
					_key: 'traditional',
					_type: 'infraTeam',
					tag: 'Traditional',
					title: 'Traditional Infra',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				},
				{
					_key: 'swe',
					_type: 'infraTeam',
					tag: 'SWE',
					title: 'SWE Infra',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				}
			]
		}),
		defineField({
			name: 'projectsHeading',
			title: 'Projects Heading',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'PROJECTS'
		}),
		defineField({
			name: 'projects',
			title: 'Projects',
			type: 'array',
			of: [project],
			validation: (Rule) => Rule.required().min(1),
			initialValue: [
				{
					_key: 'easy-vm',
					_type: 'infraProject',
					year: 'timespan',
					title: 'Easy VM',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				},
				{
					_key: 'placeholder-2',
					_type: 'infraProject',
					year: 'timespan',
					title: 'Place holder 2',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				},
				{
					_key: 'placeholder-3',
					_type: 'infraProject',
					year: 'timespan',
					title: 'Place holder 3',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				}
			]
		})
	],
	preview: {
		prepare() {
			return { title: 'Infrastructure Page' };
		}
	}
});
