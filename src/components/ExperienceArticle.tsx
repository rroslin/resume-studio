import { createMemo, For } from "solid-js"
import type { Experience } from "../data/Resume"

import './ExperienceArticle.css'

type ExperienceArticleProps = Experience

function ExperienceArticle(props: ExperienceArticleProps) {
	const description = createMemo(() => `${props.company} - ${props.role} [${props.start} - ${props.end}]`);
	return (
	<article class="exp">
		<h3 class="exp__description">
			{description()}
		</h3>
		<ul class="exp__milestone-list">
			<For each={props.highlights}>
			{(highlight) => <li class="exp__milestone-item">{highlight}</li>}
			</For>
		</ul>
	</article>
	)
}

export default ExperienceArticle