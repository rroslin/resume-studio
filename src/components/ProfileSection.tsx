import { For, Show } from 'solid-js'
import type { Profile } from '../data/Resume'
import ContactItem from './ContactItem'

import './ProfileSection.css'

type ProfileSectionProps = {
	profile: Profile
}

function ProfileSection(props: ProfileSectionProps) {
	return (
	<section class="section">
		<div class="heading__cont">
			<Show when={props.profile.photoUrl}>
			{(photoUrl) => (
				<img
				class="heading__img heading__img--rounded"
				src={photoUrl()}
				alt={props.profile.fullName ?? `${props.profile.firstName} ${props.profile.lastName}`}
				/>
			)}
			</Show>
			<div class="heading__info">
			<div>
				<h1 class="header">
				<span>{props.profile.firstName}</span>{' '}
				<span>{props.profile.lastName}</span>
				</h1>
				<div class="position">
				<span>{props.profile.title}</span>
				</div>
			</div>
			<div class="contact">
				<For each={props.profile.contacts}>
				{(contact) => <ContactItem contact={contact} />}
				</For>
			</div>
			</div>
		</div>
	</section>
	)
}

export default ProfileSection
