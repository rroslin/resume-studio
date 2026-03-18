import type { Award } from '../data/Resume'

import './AwardItem.css'

type AwardItemProps = {
	award: Award
}

function AwardItem(props: AwardItemProps) {
	const { name, date, company, project } = props.award;
	const provider = project ? `${company} - ${project}` : `${company}`;
	
	return (
	<div class="award__item">
		<div class="award__desc">{`${name} [${date}]`}</div>
		<span class="award__company">{provider}</span>
	</div>
	)
}

export default AwardItem