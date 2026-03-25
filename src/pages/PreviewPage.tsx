import { For } from 'solid-js/web'
import { useResumeContext } from '../contexts/ResumeContext'

import ProfileSection from '../components/ProfileSection'
import ExperienceArticle from '../components/ExperienceArticle'
import EducationItem from '../components/EducationItem'
import AwardItem from '../components/AwardItem'

import "./PreviewPage.css";

function PreviewPage() {
	const { resume } = useResumeContext();

	return (
		<div class="page">
			<ProfileSection {...resume.profile} />
			<section class="page__section --avoid-break-inside">
				<span>{resume.summary}</span>
			</section>
			<section>
				<h2>Experience</h2>
				<For each={resume.experiences}>
					{(experience) => (
						<div class="page__block --avoid-break-inside">
							<ExperienceArticle {...experience} />
						</div>
					)}
				</For>
			</section>
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
							<EducationItem {...education} />
						</div>
					)}
				</For>
			</section>
			<section class="page__section --avoid-break-inside">
				<h2>Awards</h2>
				<For each={resume.awards}>
					{(award) => (
						<div class="page__block --avoid-break-inside">
							<AwardItem {...award} />
						</div>
					)}
				</For>
			</section>
		</div>
	)
}

export default PreviewPage;