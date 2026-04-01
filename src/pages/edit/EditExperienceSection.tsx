import { For, type Accessor } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Experience, Resume } from "~/data/Resume";

import AddIcon from "~/components/icons/Add";
import DeleteIcon from "~/components/icons/Delete";


function EditExperienceCard(props: { experience: Experience, removeExperience: () => void }) {
    const [experience, setExperience] = createStore(props.experience);
    return (
        <div class="edit-card">
            <button class="remove-button" type="button" onClick={props.removeExperience} aria-label="Remove contact">
                <DeleteIcon />
            </button>
            <div class="container">
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
        </div>
    )

}

function EditExperienceSection(props: { resume: Resume }) {
    const [experiences, setExperiences] = createStore(props.resume.experiences);
    const addExp = () => setExperiences(experiences.length, { company: "", role: "", start: "", end: "", highlights: [] });
    const createRemoveFn = (index: Accessor<number>) => () => setExperiences(produce(experiences => experiences.splice(Number(index), 1)));
    return (
        <>
            <h2>Experience</h2>
            <For each={experiences}>
                {(experience, i) =>
                    <EditExperienceCard experience={experience} removeExperience={createRemoveFn(i)} />
                }
            </For>
            <button class="add-button" type="button" onClick={addExp}><AddIcon /></button>
        </>
    )
}

export default EditExperienceSection