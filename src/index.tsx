import type { Resume } from './data/Resume'
import { For, render } from 'solid-js/web'
import fixture from './fixtures/raymark_roslin.json'
import ProfileSection from './components/ProfileSection'
import ExperienceArticle from './components/ExperienceArticle'
import EducationItem from './components/EducationItem'
import AwardItem from './components/AwardItem'

import './index.css'

function Application() {
	const resume = fixture as Resume;
	document.title = `${resume.profile.firstName} ${resume.profile.lastName.charAt(0)}.`;

	return (
		<main>
			<article class="page">
				<ProfileSection profile={resume.profile} />
				<section class="page__section --avoid-break-inside">
					<span>{resume.summary}</span>
				</section>
				<section class="page__section --avoid-break-inside">
					<h2>Experience</h2>
					<For each={resume.experiences}>
						{(experience) => (
							<div class="page__block --avoid-break-inside">
								<ExperienceArticle experience={experience} />
							</div>
						)}
					</For>
				</section>
			</article>
			<article class="page">
				<section class="page__section --avoid-break-inside">
					<h2>Skills</h2>
					<div class="skills">
						<For each={resume.skills}>
							{(skill) => <div class="skills__badge">{skill}</div>}
						</For>
					</div>
				</section>
				<section class="page__section --avoid-break-inside">
					<h2>Education</h2>
					<For each={resume.educations}>
						{(education) => (
							<div class="page__block --avoid-break-inside">
								<EducationItem education={education} />
							</div>
						)}
					</For>
				</section>
				<section class="page__section --avoid-break-inside">
					<h2>Awards</h2>
					<For each={resume.awards}>
						{(award) => (
							<div class="page__block --avoid-break-inside">
								<AwardItem award={award} />
							</div>
						)}
					</For>
				</section>
			</article>
		</main>
	)
}

const root = document.getElementById('root')
render(() => <Application />, root!)
