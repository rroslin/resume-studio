export type Resume = {
	profile: Profile
	summary: string
	experiences: Experience[]
	skills: string[]
	educations: Education[]
	awards: Award[]
}

export type Profile = {
	firstName: string
	middleName?: string
	lastName: string
	title: string
	photoUrl?: string
	contacts: Contact[]
}

export type Contact = {
	type: 'phone' | 'email' | 'github' | 'custom'
	value: string
	href?: string
}

export type Experience = {
	company: string
	role: string
	start: string
	end: string
	highlights: string[]
}

export type Education = {
	institution: string
	start: string
	end: string
	degree: string
}

export type Award = {
	name: string
	date: string
	company: string
	project?: string
}