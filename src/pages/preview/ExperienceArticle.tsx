import { createMemo, For } from "solid-js"
import type { Experience } from "../../data/Resume"

type ExperienceArticleProps = Experience

function ExperienceArticle(props: ExperienceArticleProps) {
	const description = createMemo(() => `${props.company} - ${props.role} [${props.start} - ${props.end}]`);
	return (
	<article class="experience">
		<h3 class="description">
			{description()}
		</h3>
		<ul class="milestone-list">
			<For each={props.highlights}>
			{(highlight) => <li class="milestone-item">{highlight}</li>}
			</For>
		</ul>
	</article>
	)
}

export default ExperienceArticle