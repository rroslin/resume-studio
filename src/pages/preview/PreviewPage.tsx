import { For } from 'solid-js/web'
import { useNavigate } from '@solidjs/router'
import { useResumeContext } from '../../contexts/ResumeContext'

import ProfileArticle from './ProfileArticle'
import ExperienceArticle from './ExperienceArticle'
import EducationItem from './EducationItem'
import AwardItem from './AwardItem'

import "./PreviewPage.css";
import Icon from '~/components/Icon'

function PreviewPage() {
	const { resume } = useResumeContext();
	const navigate = useNavigate();
	return (
		<div class="preview-view">
			<div class="preview-toolbar">
				<button class="toolbar-button" type="button" onClick={() => navigate('/edit')}>
					<Icon name="pencil" />
				</button>
				<button class="toolbar-button" type="button" onClick={() => window.print()}>
					<Icon name="printer" />
				</button>
			</div>
			<div class="preview-page">
				<section>
					<ProfileArticle {...resume.profile} />
				</section>
				<section class='--allow-break'>
					<h2>Experience</h2>
					<For each={[...resume.experiences].reverse()}>
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
					<For each={[...resume.educations].reverse()}>
						{(education) => <EducationItem {...education} />}
					</For>
				</section>
				<section>
					<h2>Awards</h2>
					<For each={[...resume.awards].reverse()}>
						{(award) => <AwardItem {...award} />}
					</For>
				</section>
			</div>
		</div>
	)
}

export default PreviewPage;
