import { For, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

import Icon from "~/components/Icon";

function EditSkillSection(props: { skills: string[] }) {
	const [skillInput, setSkillInput] = createSignal("");
	const [skills, setSkills] = createStore(props.skills);

	const addSkill = () => {
		const nextSkill = skillInput().trim();

		if (!nextSkill || skills.some((skill) => skill.toLowerCase() === nextSkill.toLowerCase())) {
			setSkillInput("");
			return;
		}

		setSkills(skills.length, nextSkill);
		setSkillInput("");
	};

	return (
		<>
			<label class="field">
				<span>Add a skill</span>
				<small class="field-hint">Press Enter or comma to add an item. Keep the list targeted to the role.</small>
				<input
					type="text"
					value={skillInput()}
					placeholder="Type a skill and press Enter"
					onInput={(event) => setSkillInput(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.key === ",") {
							event.preventDefault();
							addSkill();
						}
					}}
				/>
			</label>
			<div class="skill-list" aria-label="Added skills">
				<For each={skills}>
					{(skill, i) => (
						<div class="skill-pill">
							<span>{skill}</span>
							<button
								class="skill-pill-remove"
								type="button"
								onClick={() => setSkills(produce((draft) => draft.splice(i(), 1)))}
								aria-label={`Remove ${skill}`}
							>
								<Icon name="close" />
							</button>
						</div>
					)}
				</For>
			</div>
			<button class="add-button" type="button" onClick={addSkill}>
				<Icon name="add" />
				<span>Add skill</span>
			</button>
		</>
	);
}

export default EditSkillSection;
