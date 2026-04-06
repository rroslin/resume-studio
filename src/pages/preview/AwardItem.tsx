import { createMemo } from 'solid-js';
import type { Award } from '../../data/Resume'

type AwardItemProps = Award

function AwardItem(props: AwardItemProps) {
	const description = createMemo(() => `${props.name} [${props.date}]`);
	const provider = createMemo(() => props.project ? `${props.company} - ${props.project}` : `${props.company}`);
	return (
	<div class="award">
		<div class="description">{description()}</div>
		<span class="company">{provider()}</span>
	</div>
	)
}

export default AwardItem