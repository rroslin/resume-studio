import { For, Show } from 'solid-js'
import type { Profile } from '../../data/Resume'
import ContactItem from './ContactItem'

type ProfileArticleProps = Profile;

function ProfileArticle(props: ProfileArticleProps) {
	const fullName = () => `${props.firstName} ${props.lastName}`;
	return (
		<>
			<article>
				<div class="profile">
					<Show when={props.photoUrl}>
						<img class="image --rounded" src={props.photoUrl}
							alt={fullName()} />
					</Show>
					<div class="info">
						<div>
							<h1 class="name">{fullName()}</h1>
							<div class="position">{props.title}</div>
						</div>
						<div class="contact">
							<For each={props.contacts}>
								{(contact) => <ContactItem {...contact} />}
							</For>
						</div>
					</div>
				</div>
				<div class="summary">{props.summary}</div>
			</article>

		</>

	)
}

export default ProfileArticle
