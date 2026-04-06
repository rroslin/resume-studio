import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Award } from "~/data/Resume";

import Icon from "~/components/Icon";

function EditAwardCard(props: { award: Award; index: number; removeAward: () => void }) {
	const [award, setAward] = createStore(props.award);

	return (
		<div class="edit-card">
			<div class="edit-card-header">
				<div>
					<p class="edit-card-kicker">Award {props.index + 1}</p>
					<h3>{award.name || "Untitled award"}</h3>
				</div>
				<button class="remove-button" type="button" onClick={props.removeAward} aria-label="Remove award">
					<Icon name="close" />
					<span>Remove</span>
				</button>
			</div>
			<div class="container --col">
				<label class="field">
					<span>Name</span>
					<input
						type="text"
						value={award.name}
						placeholder="Innovation Award"
						onInput={(event) => setAward(produce((draft) => {
							draft.name = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
			<div class="container">
				<label class="field">
					<span>Company</span>
					<input
						type="text"
						value={award.company}
						placeholder="Acme Corp"
						onInput={(event) => setAward(produce((draft) => {
							draft.company = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field">
					<span>Project</span>
					<input
						type="text"
						value={award.project || ""}
						placeholder="Payments platform redesign"
						onInput={(event) => setAward(produce((draft) => {
							draft.project = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field --full">
					<span>Date</span>
					<input
						type="text"
						value={award.date}
						placeholder="10/2019"
						onInput={(event) => setAward(produce((draft) => {
							draft.date = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
		</div>
	);
}

function EditAwardSection(props: { awards: Award[] }) {
	const [awards, setAwards] = createStore(props.awards);

	return (
		<>
			<For each={awards}>
				{(award, i) => (
					<EditAwardCard
						award={award}
						index={i()}
						removeAward={() => setAwards(produce((draft) => draft.splice(i(), 1)))}
					/>
				)}
			</For>
			<button
				class="add-button"
				type="button"
				aria-label="Add award"
				onClick={() => setAwards(awards.length, { name: "", date: "", company: "", project: "" })}
			>
				<Icon name="add" />
				<span>Add award</span>
			</button>
		</>
	);
}

export default EditAwardSection;
