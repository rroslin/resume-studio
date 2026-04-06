import { createStore, produce } from "solid-js/store";
import type { Resume } from "~/data/Resume";

function EditProfileSection(props: { resume: Resume }) {
	const [profile, setProfile] = createStore(props.resume.profile);

	return (
		<>
			<h2>Profile</h2>
			<div class="container">
				<label class="field --full">
					<span>First Name</span>
					<input
						type="text"
						value={profile.firstName}
						onInput={(event) => setProfile(produce(profile => profile.firstName = event.currentTarget.value))}
					/>
				</label>
				<label class="field --full">
					<span>Middle Name</span>
					<input
						type="text"
						value={profile.middleName || ""}
						onInput={(event) => setProfile(produce(profile => profile.middleName = event.currentTarget.value))}
					/>
				</label>
				<label class="field --full">
					<span>Last Name</span>
					<input
						type="text"
						value={profile.lastName}
						onInput={(event) => setProfile(produce(profile => profile.lastName = event.currentTarget.value))}
					/>
				</label>
			</div>
			<div class="container --col">
				<label class="field">
					<span>Title</span>
					<input
						type="text"
						value={profile.title}
						onInput={(event) => setProfile(produce(profile => profile.title = event.currentTarget.value))}
					/>
				</label>
				<label class="field">
					<span>Summary</span>
					<textarea
						value={profile.summary}
						onInput={(event) => setProfile(produce(profile => profile.summary = event.currentTarget.value))}
					/>
				</label>
			</div></>
	)
}

export default EditProfileSection;