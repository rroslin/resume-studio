export type Resume = {
	profile: Profile
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
	summary: string
	contacts: Contact[]
}

export type Contact = {
	type: 'phone' | 'email' | 'github'
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