import { For, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Experience } from "~/data/Resume";

import Icon from "~/components/Icon";

function EditExperienceCard(props: { experience: Experience; index: number; removeExperience: () => void }) {
	const [experience, setExperience] = createStore(props.experience);
	const formatHighlights = (highlights: string[]) => highlights.map((highlight) => `- ${highlight}`).join("\n");
	const [rawHighlights, setRawHighlights] = createSignal(formatHighlights(experience.highlights));
	const updateHighlights = (value: string) => {
		const nextHighlights = value
			.split("\n")
			.map((line) => line.replace(/^-+/, "").trim())
			.filter(Boolean);

		setExperience("highlights", nextHighlights);
		setRawHighlights(formatHighlights(nextHighlights));
	};

	return (
		<div class="edit-card">
			<div class="edit-card-header">
				<div>
					<p class="edit-card-kicker">Experience {props.index + 1}</p>
					<h3>{experience.role || "Untitled role"}</h3>
				</div>
				<button class="remove-button" type="button" onClick={props.removeExperience} aria-label="Remove experience">
					<Icon name="close" />
					<span>Remove</span>
				</button>
			</div>
			<div class="container --col">
				<label class="field">
					<span>Company</span>
					<input
						type="text"
						value={experience.company}
						placeholder="Acme Company"
						onInput={(event) => setExperience(produce((draft) => {
							draft.company = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field">
					<span>Role</span>
					<input
						type="text"
						value={experience.role}
						placeholder="Frontend Engineer"
						onInput={(event) => setExperience(produce((draft) => {
							draft.role = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
			<div class="container">
				<label class="field --full">
					<span>Start</span>
					<input
						type="month"
						value={experience.start}
						onInput={(event) => setExperience(produce((draft) => {
							draft.start = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field --full">
					<span>End</span>
					<input
						type="month"
						value={experience.end}
						onInput={(event) => setExperience(produce((draft) => {
							draft.end = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
			<div class="container --col">
				<label class="field --full">
					<span>Highlights</span>
					<small class="field-hint">Use one bullet per line. Keep each line concrete and outcome-focused.</small>
					<textarea
						rows="6"
						value={rawHighlights()}
						onInput={(event) => setRawHighlights(event.currentTarget.value)}
						onBlur={(event) => updateHighlights(event.currentTarget.value)}
						placeholder={"- Built a new onboarding flow that improved activation by 18%\n- Introduced shared UI patterns to speed up delivery\n- Led collaboration across design and engineering"}
					/>
				</label>
			</div>
		</div>
	);
}

function EditExperienceSection(props: { experiences: Experience[] }) {
	const [experiences, setExperiences] = createStore(props.experiences);

	return (
		<>
			<For each={experiences}>
				{(experience, i) => {
					const originalIndex = () => experiences.length - 1 - i();

					return (
						<EditExperienceCard
							index={i()}
							experience={experience}
							removeExperience={() => setExperiences(produce((draft) => draft.splice(originalIndex(), 1)))}
						/>
					);
				}}
			</For>
			<button
				class="add-button"
				type="button"
				onClick={() => setExperiences(experiences.length, { company: "", role: "", start: "", end: "", highlights: [] })}
			>
				<Icon name="add" />
				<span>Add experience</span>
			</button>
		</>
	);
}

export default EditExperienceSection;
