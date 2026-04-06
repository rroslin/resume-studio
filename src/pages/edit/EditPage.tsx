
import { useResumeContext } from "~/contexts/ResumeContext";
import { createStore, produce } from "solid-js/store";

import "./EditPage.css"
import EditContactSection from "./EditContactSection";
import EditExperienceSection from "./EditExperienceSection";
import EditSkillSection from "./EditSkillSection";
import EditProfileSection from "./EditProfileSection";

function EditPage() {
	const { resume } = useResumeContext();
	return (
		<form class="edit-page" aria-label="Edit resume form">
			<EditProfileSection resume={resume}/>
			<EditContactSection resume={resume}/>
			<EditExperienceSection resume={resume}/>
			<EditSkillSection resume={resume}/>


			<h2>Awards</h2>


		</form>
	);
}

export default EditPage;
