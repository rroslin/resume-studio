import { For, Show } from 'solid-js'
import type { Profile } from '../data/Resume'
import ContactItem from './ContactItem'

import './ProfileArticle.css'

type ProfileArticleProps = Profile;

function ProfileArticle(props: ProfileArticleProps) {
	const fullName = () => `${props.firstName} ${props.lastName}`;
	return (
		<>
			<article>
				<div class="profile">
					<Show when={props.photoUrl}>
						<img class="profile__img profile__img--rounded" src={props.photoUrl}
							alt={fullName()} />
					</Show>
					<div class="profile__info">
						<div>
							<h1 class="profile__name">{fullName()}</h1>
							<div class="profile__position">{props.title}</div>
						</div>
						<div class="profile__contact">
							<For each={props.contacts}>
								{(contact) => <ContactItem {...contact} />}
							</For>
						</div>
					</div>
				</div>
			</article>
			<div class="profile__summary">{props.summary}</div>
		</>

	)
}

export default ProfileArticle
