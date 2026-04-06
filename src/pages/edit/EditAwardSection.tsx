import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Award, Resume } from "~/data/Resume";

import Icon from "~/components/Icon";

function EditAwardCard(props: { award: Award, removeAward: () => void }) {
	const [award, setAward] = createStore(props.award);
	return (
		<div class="edit-card">
			<button class="remove-button" type="button" onClick={props.removeAward} aria-label="Remove award">
				<Icon name="close" />
			</button>


			<div class="container --col">
				<label class="field">
					<span>Name</span>
					<input
						type="text"
						value={award.name}
						onInput={(event) => setAward(produce(award => award.name = event.currentTarget.value))}
					/>
				</label>
			</div>
			<div class="container">
				<label class="field">
					<span>Company</span>
					<input
						type="text"
						value={award.company}
						onInput={(event) => setAward(produce(award => award.company = event.currentTarget.value))}
					/>
				</label>
				<label class="field">
					<span>Project</span>
					<input
						type="text"
						value={award.project || ""}
						onInput={(event) => setAward(produce(award => award.project = event.currentTarget.value))}
					/>
				</label>
				<label class="field --full">
					<span>Date</span>
					<input
						type="text"
						value={award.date}
						placeholder="10/2019"
						onInput={(event) => setAward(produce(award => award.date = event.currentTarget.value))}
					/>
				</label>
			</div>
		</div>
	)
}

function EditAwardSection(props: { resume: Resume }) {
	const [awards, setAwards] = createStore(props.resume.awards);

	return (
		<>
			<h2>Awards</h2>
			<For each={awards}>
				{(award, i) =>
					<EditAwardCard
						award={award}
						removeAward={() => setAwards(produce(awards => awards.splice(i(), 1)))}
					/>
				}
			</For>
			<button
				class="add-button" type="button" aria-label="Add award"
				onClick={() => setAwards(awards.length, { name: "", date: "", company: "", project: "" })}>
				<Icon name="add" />
			</button>
		</>
	)
}

export default EditAwardSection;
