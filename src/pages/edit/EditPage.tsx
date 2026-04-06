import { useResumeContext } from "~/contexts/ResumeContext";

import "./EditPage.css";
import EditAwardSection from "./EditAwardSection";
import EditContactSection from "./EditContactSection";
import EditEducationSection from "./EditEducationSection";
import EditExperienceSection from "./EditExperienceSection";
import EditProfileSection from "./EditProfileSection";
import EditSectionPanel from "./EditSectionPanel";
import EditSkillSection from "./EditSkillSection";

function EditPage() {
	const { resume } = useResumeContext();

	return (
		<div class="edit-shell">
			<aside class="edit-sidebar">
				<div class="edit-sidebar-card">
					<p class="edit-sidebar-kicker">Resume Studio</p>
					<nav class="edit-nav" aria-label="Edit sections">
						<a href="#profile" class="edit-nav-link">
							<span>Profile</span>
						</a>
						<a href="#contacts" class="edit-nav-link">
							<span>Contacts</span>
							<strong class="edit-nav-count">{resume.profile.contacts.length}</strong>
						</a>
						<a href="#experience" class="edit-nav-link">
							<span>Experience</span>
							<strong class="edit-nav-count">{resume.experiences.length}</strong>
						</a>
						<a href="#skills" class="edit-nav-link">
							<span>Skills</span>
							<strong class="edit-nav-count">{resume.skills.length}</strong>
						</a>
						<a href="#education" class="edit-nav-link">
							<span>Education</span>
							<strong class="edit-nav-count">{resume.educations.length}</strong>
						</a>
						<a href="#awards" class="edit-nav-link">
							<span>Awards</span>
							<strong class="edit-nav-count">{resume.awards.length}</strong>
						</a>
					</nav>
				</div>
			</aside>

			<form class="edit-page" aria-label="Edit resume form">
				<EditSectionPanel
					title="Profile"
					description="Set the headline details that anchor the rest of the resume."
				>
					<EditProfileSection profile={resume.profile} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Contacts"
					description="Keep your core contact methods tidy and easy to scan."
				>
					<EditContactSection contacts={resume.profile.contacts} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Experience"
					description="Ordered chronologically from earliest to latest"
				>
					<EditExperienceSection experiences={resume.experiences} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Skills"
					description="Build a focused set of skills that supports the story your experience tells."
				>
					<EditSkillSection skills={resume.skills} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Education"
					description="Ordered chronologically from earliest to latest"
				>
					<EditEducationSection educations={resume.educations} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Awards"
					description="Ordered chronologically from earliest to latest"
				>
					<EditAwardSection awards={resume.awards} />
				</EditSectionPanel>
			</form>
		</div>
	);
}

export default EditPage;
