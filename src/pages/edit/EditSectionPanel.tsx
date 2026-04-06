import type { JSX } from "solid-js";

function EditSectionPanel(props: {
	title: string;
	description: string;
	children: JSX.Element;
}) {
	return (
		<section class="edit-panel" id={props.title.toLowerCase()} aria-labelledby={`${props.title.toLowerCase()}-title`}>
			<div class="edit-panel-header">
				<div>
					<h2 id={`${props.title.toLowerCase()}-title`}>{props.title}</h2>
					<p class="edit-panel-description">{props.description}</p>
				</div>
			</div>
			<div class="edit-panel-body">{props.children}</div>
		</section>
	);
}

export default EditSectionPanel;
