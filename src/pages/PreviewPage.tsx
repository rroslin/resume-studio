import { For } from 'solid-js/web'
import { useResumeContext } from '../contexts/ResumeContext'

import ProfileArticle from '../components/ProfileArticle'
import ExperienceArticle from '../components/ExperienceArticle'
import EducationItem from '../components/EducationItem'
import AwardItem from '../components/AwardItem'

import "./PreviewPage.css";

function PreviewPage() {
	const { resume } = useResumeContext();

	return (
		<div class="preview-page">
			<section>
				<ProfileArticle {...resume.profile} />
			</section>
			<section>
				<h2>Experience</h2>
				<For each={resume.experiences}>
					{(experience) => <ExperienceArticle {...experience} />}
				</For>
			</section>
			<section>
				<h2>Skills</h2>
				<div class="skills">
					<For each={resume.skills}>
						{(skill) => <div class="badge">{skill}</div>}
					</For>
				</div>
			</section>
			<section>
				<h2>Education</h2>
				<For each={resume.educations}>
					{(education) => <EducationItem {...education} />}
				</For>
			</section>
			<section>
				<h2>Awards</h2>
				<For each={resume.awards}>
					{(award) => <AwardItem {...award} />}
				</For>
			</section>
		</div>
	)
}

export default PreviewPage;