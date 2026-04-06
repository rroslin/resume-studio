import { For, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Resume } from "~/data/Resume";

import Icon from "~/components/Icon";

function EditSkillSection(props: {resume: Resume}) {
	const [skillInput, setSkillInput] = createSignal("");
	const [skills, setSkills] = createStore(props.resume.skills);

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
			<h2>Skills</h2>
			<label class="field">
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
								onClick={() => setSkills(produce(skills => skills.splice(Number(i), 1)))}
							>
								<Icon name="close" />
							</button>
						</div>
					)}
				</For>
			</div>
		</>
	);
}

export default EditSkillSection;
