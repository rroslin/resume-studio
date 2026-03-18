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
  const nameWithInitial =`${resume.profile.firstName} ${resume.profile.lastName.charAt(0)}.`;
  document.title = nameWithInitial;

  return (
    <main>
		<ProfileSection profile={resume.profile} />
		<section>
			<span>{resume.summary}</span>
		</section>
		<section>
			<h2>Experience</h2>
			<For each={resume.experiences}>
			{(experience) => <ExperienceArticle experience={experience} />}
			</For>
		</section>
		<section>
			<h2>Skills</h2>
			<div class="skills">
				<For each={resume.skills}>
				{(skill) => <div class="skills__badge">{skill}</div>}
				</For>
			</div>
		</section>
		<section>
			<h2>Education</h2>
			<For each={resume.educations}>
			{(education) => <EducationItem education={education}/>}
			</For>
		</section>
		<section>
			<h2>Awards</h2>
			<For each={resume.awards}>
			{(award) => <AwardItem award={award}/>}
			</For>
		</section>
    </main>
  )
}

const root = document.getElementById('root')
render(() => <Application />, root!)
