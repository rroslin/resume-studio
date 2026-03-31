
import { useResumeContext } from "~/contexts/ResumeContext";
import { createStore, produce } from "solid-js/store";

import "./EditPage.css"
import EditContactSection from "./EditContactSection";

function EditPage() {
	const { resume } = useResumeContext();
	const [profile, setProfile] = createStore(resume.profile);

	return (
		<form class="edit-page" aria-label="Edit resume form">
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
				<label class="field">
					<span>Photo URL</span>
					<input
						type="url"
						value={resume.profile.photoUrl || ""}
						onInput={(event) => setProfile(produce(profile => profile.photoUrl = event.currentTarget.value))}
					/>
				</label>
			</div>
			<EditContactSection resume={resume}/>

			<h2>Experience</h2>

			<h2>Skills</h2>

			<h2>Education</h2>

			<h2>Awards</h2>


		</form>
	);
}

export default EditPage;