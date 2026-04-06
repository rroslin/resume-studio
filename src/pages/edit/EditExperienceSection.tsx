import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Experience, Resume } from "~/data/Resume";

import Icon from "~/components/Icon";


function EditExperienceCard(props: { experience: Experience, removeExperience: () => void }) {
	const [experience, setExperience] = createStore(props.experience);
	const highlightsValue = () => experience.highlights.map(highlight => `- ${highlight}`).join("\n");
	const updateHighlights = (value: string) =>
		setExperience("highlights", value.split("-").map(line => line.trim()).filter(Boolean));
	return (
		<div class="edit-card">
			<button class="remove-button" type="button" onClick={props.removeExperience} aria-label="Remove contact">
				<Icon name="close" />
			</button>
			<div class="container --col">
				<label class="field">
					<span>Company</span>
					<input
						type="text"
						value={experience.company}
						onInput={(event) => setExperience(produce(experience => experience.company = event.currentTarget.value))}
					/>
				</label>
				<label class="field">
					<span>Role</span>
					<input
						type="text"
						value={experience.role}
						onInput={(event) => setExperience(produce(experience => experience.role = event.currentTarget.value))}
					/>
				</label>
			</div>
			<div class="container">
				<label class="field --full">
					<span>Start</span>
					<input
						type="month"
						value={experience.start}
						onInput={(event) => setExperience(produce(experience => experience.start = event.currentTarget.value))}
					/>
				</label>
				<label class="field --full">
					<span>End</span>
					<input
						type="month"
						value={experience.end}
						onInput={(event) => setExperience(produce(experience => experience.end = event.currentTarget.value))}
					/>
				</label>
			</div>
			<div class="container --col">
				<label class="field --full">
					<span>Highlights</span>
					<textarea
						rows="6"
						value={highlightsValue()}
						onInput={(event) => updateHighlights(event.currentTarget.value)}
						placeholder={"- Built X feature - Improved Y metric - Led Z initiative"}
					/>
				</label>
			</div>
		</div>
	)

}

function EditExperienceSection(props: { resume: Resume }) {
	const [experiences, setExperiences] = createStore(props.resume.experiences);
	return (
		<>
			<h2>Experience</h2>
			<For each={experiences.slice().reverse()}>
				{(experience, i) =>
					<EditExperienceCard
						experience={experience}
						removeExperience={() => setExperiences(produce(experiences => experiences.splice(Number(i), 1)))} />
				}
			</For>
			<button
				class="add-button" type="button"
				onClick={() => setExperiences(experiences.length, { company: "", role: "", start: "", end: "", highlights: [] })}>
				<Icon name="add" />
			</button>
		</>
	)
}

export default EditExperienceSection
