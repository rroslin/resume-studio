import { For } from "solid-js"
import type { Experience } from "../data/Resume"

import './ExperienceArticle.css'

type ExperienceArticleProps = {
	experience: Experience
}

function ExperienceArticle(props: ExperienceArticleProps) {
	const { company, role, start, end, highlights } = props.experience;
	
	return (
	<article class="exp">
		<h3 class="exp__description">
			{`${company} - ${role} [${start} - ${end}]`}
		</h3>
		<ul class="exp__milestone-list">
			<For each={highlights}>
			{(highlight) => <li class="exp__milestone-item">{highlight}</li>}
			</For>
		</ul>
	</article>
	)
}

export default ExperienceArticle