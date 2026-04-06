import type { Education, Resume } from "~/data/Resume";
import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";

import Icon from "~/components/Icon";

function EditEducationCard(props: { education: Education; removeEducation: () => void }) {
	const [education, setEducation] = createStore(props.education);
	return (
		<div class="edit-card">
			<button class="remove-button" type="button" onClick={props.removeEducation} aria-label="Remove education">
				<Icon name="close" />
			</button>
			<div class="container --col">
				<label class="field">
					<span>Institution</span>
					<input
						type="text"
						value={education.institution}
						onInput={(event) => setEducation(produce(education => education.institution = event.currentTarget.value))}
					/>
				</label>
				<label class="field">
					<span>Degree</span>
					<input
						type="text"
						value={education.degree}
						onInput={(event) => setEducation(produce(education => education.degree = event.currentTarget.value))}
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
						onInput={(event) => setEducation(produce(education => education.start = event.currentTarget.value))}
					/>
				</label>
				<label class="field --full">
					<span>End</span>
					<input
						type="text"
						value={education.end}
						placeholder="2018"
						onInput={(event) => setEducation(produce(education => education.end = event.currentTarget.value))}
					/>
				</label>
			</div>
		</div>
	);
}

function EditEducationSection(props: { resume: Resume }) {
	const [educations, setEducations] = createStore(props.resume.educations);
	return (
		<>
			<h2>Education</h2>
			<For each={educations}>
				{(education, i) => (
					<EditEducationCard
						education={education}
						removeEducation={() => setEducations(produce((educations) => educations.splice(i(), 1)))}
					/>
				)}
			</For>
			<button 
				class="add-button" type="button" aria-label="Add education"
				onClick={() => setEducations(educations.length, { institution: "", degree: "", start: "", end: "" })}>
				<Icon name="add" />
			</button>
		</>
	);
}

export default EditEducationSection;
