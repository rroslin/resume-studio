import { useResumeContext } from "~/contexts/ResumeContext";

import "./EditPage.css";
import EditAwardSection from "./EditAwardSection";
import EditContactSection from "./EditContactSection";
import EditEducationSection from "./EditEducationSection";
import EditExperienceSection from "./EditExperienceSection";
import EditProfileSection from "./EditProfileSection";
import EditSectionPanel from "./EditSectionPanel";
import EditSkillSection from "./EditSkillSection";

const sections = [
	"Profile",
	"Contacts",
	"Experience",
	"Education",
	"Awards"
] as const

function EditPage() {
	const { resume } = useResumeContext();

	return (
		<div class="edit-shell">
			<aside class="edit-sidebar">
				<div class="edit-sidebar-card">
					<p class="edit-sidebar-kicker">Resume Studio</p>
					<nav class="edit-nav" aria-label="Edit sections">
						{sections.map((section) => (
							<a href={`#${section.toLowerCase()}`} class="edit-nav-link">
								<span>{section}</span>
							</a>
						))}
					</nav>
				</div>
			</aside>

			<form class="edit-page" aria-label="Edit resume form">
				<div class="edit-page-hero">
					<div class="edit-page-stats" aria-label="Resume section counts">
						<p><strong>{resume.experiences.length}</strong> experiences</p>
						<p><strong>{resume.skills.length}</strong> skills</p>
						<p><strong>{resume.profile.contacts.length}</strong> contacts</p>
					</div>
				</div>

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
					description="Capture the roles, timelines, and bullets that prove your strongest work."
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
					description="Add the academic details that matter for the roles you are targeting."
				>
					<EditEducationSection educations={resume.educations} />
				</EditSectionPanel>

				<EditSectionPanel
					title="Awards"
					description="Highlight recognition that reinforces your craft and credibility."
				>
					<EditAwardSection awards={resume.awards} />
				</EditSectionPanel>
			</form>
		</div>
	);
}

export default EditPage;
