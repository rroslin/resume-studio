import { createStore, produce } from "solid-js/store";
import type { Profile } from "~/data/Resume";

function EditProfileSection(props: { profile: Profile }) {
	const [profile, setProfile] = createStore(props.profile);

	return (
		<>
			<div class="container">
				<label class="field --full">
					<span>First Name</span>
					<input
						type="text"
						value={profile.firstName}
						placeholder="Raymark"
						onInput={(event) => setProfile(produce((draft) => {
							draft.firstName = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field --full">
					<span>Middle Name</span>
					<input
						type="text"
						value={profile.middleName || ""}
						placeholder="Optional"
						onInput={(event) => setProfile(produce((draft) => {
							draft.middleName = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field --full">
					<span>Last Name</span>
					<input
						type="text"
						value={profile.lastName}
						placeholder="Roslin"
						onInput={(event) => setProfile(produce((draft) => {
							draft.lastName = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>

			<div class="container --col">
				<label class="field">
					<span>Title</span>
					<input
						type="text"
						value={profile.title}
						placeholder="Senior Frontend Engineer"
						onInput={(event) => setProfile(produce((draft) => {
							draft.title = event.currentTarget.value;
						}))}
					/>
				</label>
				<label class="field">
					<span>Summary</span>
					<small class="field-hint">Aim for two to four lines that frame your strengths, focus, and momentum.</small>
					<textarea
						value={profile.summary}
						rows="5"
						placeholder="Product-minded engineer with a strong eye for UI craft, accessibility, and systems that scale."
						onInput={(event) => setProfile(produce((draft) => {
							draft.summary = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
		</>
	);
}

export default EditProfileSection;
