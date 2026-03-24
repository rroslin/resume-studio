import type { Resume } from './data/Resume'
import { For, render } from 'solid-js/web'
import fixture from './fixtures/raymark_roslin.json'
import ProfileSection from './components/ProfileSection'
import ExperienceArticle from './components/ExperienceArticle'
import EducationItem from './components/EducationItem'
import AwardItem from './components/AwardItem'

import './index.css'
import { createStore, type SetStoreFunction } from 'solid-js/store'
import { createEffect } from 'solid-js'

declare global {
	var store: Resume
	var setStore: SetStoreFunction<Resume>;
}

function Application() {
	const resume = fixture as Resume;
	const [store, setStore] = createStore(resume);

	globalThis.store = store;
	globalThis.setStore = setStore;

	createEffect(() => {
		document.title = `${store.profile.firstName} ${store.profile.lastName.charAt(0)}.`;
	})

	return (
		<main>
			<article class="page">
				<ProfileSection {...store.profile} />
				<section class="page__section --avoid-break-inside">
					<span>{store.summary}</span>
				</section>
				<section>
					<h2>Experience</h2>
					<For each={store.experiences}>
						{(experience) => (
							<div class="page__block --avoid-break-inside">
								<ExperienceArticle {...experience} />
							</div>
						)}
					</For>
				</section>
			</article>
			<article class="page">
				<section class="page__section --avoid-break-inside">
					<h2>Skills</h2>
					<div class="skills">
						<For each={store.skills}>
							{(skill) => <div class="skills__badge">{skill}</div>}
						</For>
					</div>
				</section>
				<section class="page__section --avoid-break-inside">
					<h2>Education</h2>
					<For each={store.educations}>
						{(education) => (
							<div class="page__block --avoid-break-inside">
								<EducationItem {...education} />
							</div>
						)}
					</For>
				</section>
				<section class="page__section --avoid-break-inside">
					<h2>Awards</h2>
					<For each={store.awards}>
						{(award) => (
							<div class="page__block --avoid-break-inside">
								<AwardItem {...award} />
							</div>
						)}
					</For>
				</section>
			</article>
		</main>
	)
}

const root = document.getElementById('root')
render(() => <Application />, root!);



