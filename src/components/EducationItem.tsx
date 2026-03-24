import { createMemo } from "solid-js";
import type { Education } from "../data/Resume"

import "./EducationItem.css"

type EducationItemProps = Education;

function EducationItem(props: EducationItemProps) {
	const description = createMemo(() =>`${props.institution} - [${props.start} - ${props.end}]`);
	return (
	<div class="educ">
		<div class="educ__desc">{description()}</div>
		<span class="educ__degree">{props.degree}</span>
	</div>
	)
}

export default EducationItem