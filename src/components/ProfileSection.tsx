import { For, Show } from 'solid-js'
import type { Profile } from '../data/Resume'
import ContactItem from './ContactItem'

import './ProfileSection.css'

type ProfileSectionProps = {
	profile: Profile
}

function ProfileSection(props: ProfileSectionProps) {
	const { firstName, lastName, title, photoUrl, contacts } = props.profile;
	const fullName = `${firstName} ${lastName}`;

	return (
	<section class="section">
		<div class="profile">
			<Show when={photoUrl}>
				<img class="profile__img profile__img--rounded" src={photoUrl}
					alt={fullName}/>
			</Show>
			<div class="profile__info">
				<div>
					<h1 class="profile__name">{fullName}</h1>
					<div class="profile__position">{title}</div>
				</div>
				<div class="profile__contact">
					<For each={contacts}>
					{(contact) => <ContactItem contact={contact} />}
					</For>
				</div>
			</div>
		</div>
	</section>
	)
}

export default ProfileSection
