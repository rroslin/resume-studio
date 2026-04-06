import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Education } from "~/data/Resume";

import Icon from "~/components/Icon";

function EditEducationCard(props: { education: Education; index: number; removeEducation: () => void }) {
	const [education, setEducation] = createStore(props.education);

	return (
		<div class="edit-card">
			<div class="edit-card-header">
				<div>
					<p class="edit-card-kicker">Education {props.index + 1}</p>
					<h3>{education.institution || "Untitled school"}</h3>
				</div>
				<button class="remove-button" type="button" onClick={props.removeEducation} aria-label="Remove education">
					<Icon name="close" />
					<span>Remove</span>
				</button>
			</div>
			<div class="container --col">
				<label class="field">
					<span>Institution</span>
					<input
						type="text"
						value={education.institution}
						placeholder="University of the Philippines"
						onInput={(event) => setEducation(produce((draft) => {
							draft.institution = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field">
					<span>Degree</span>
					<input
						type="text"
						value={education.degree}
						placeholder="BS Computer Science"
						onInput={(event) => setEducation(produce((draft) => {
							draft.degree = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
			<div class="container">
				<label class="field --full">
					<span>Start</span>
					<input
						type="text"
						value={education.start}
						placeholder="2014"
						onInput={(event) => setEducation(produce((draft) => {
							draft.start = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field --full">
					<span>End</span>
					<input
						type="text"
						value={education.end}
						placeholder="2018"
						onInput={(event) => setEducation(produce((draft) => {
							draft.end = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
		</div>
	);
}

function EditEducationSection(props: { educations: Education[] }) {
	const [educations, setEducations] = createStore(props.educations);

	return (
		<>
			<For each={educations}>
				{(education, i) => (
					<EditEducationCard
						education={education}
						index={i()}
						removeEducation={() => setEducations(produce((draft) => draft.splice(i(), 1)))}
					/>
				)}
			</For>
			<button
				class="add-button"
				type="button"
				aria-label="Add education"
				onClick={() => setEducations(educations.length, { institution: "", degree: "", start: "", end: "" })}
			>
				<Icon name="add" />
				<span>Add education</span>
			</button>
		</>
	);
}

export default EditEducationSection;
