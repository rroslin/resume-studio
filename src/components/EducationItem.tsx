import type { Education } from "../data/Resume"

import "./EducationItem.css"

type EducationItemProps = {
	education: Education
}

function EducationItem(props: EducationItemProps) {
	const { institution, start, end, degree } = props.education;
	
	return (
	<div class="educ">
		<div class="educ__desc">
			{`${institution} - [${start} - ${end}]`}
		</div>
		<span class="educ__degree">{degree}</span>
	</div>
	)
}

export default EducationItem