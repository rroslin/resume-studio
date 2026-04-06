
import { useResumeContext } from "~/contexts/ResumeContext";

import "./EditPage.css"
import EditAwardSection from "./EditAwardSection";
import EditContactSection from "./EditContactSection";
import EditEducationSection from "./EditEducationSection";
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
			<EditEducationSection resume={resume}/>
			<EditAwardSection resume={resume}/>
		</form>
	);
}

export default EditPage;
