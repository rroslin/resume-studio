import { createMemo } from "solid-js";
import type { Education } from "../../data/Resume"

type EducationItemProps = Education;

function EducationItem(props: EducationItemProps) {
	const description = createMemo(() =>`${props.institution} - [${props.start} - ${props.end}]`);
	return (
	<div class="education">
		<div class="description">{description()}</div>
		<span class="degree">{props.degree}</span>
	</div>
	)
}

export default EducationItem