import { Route, Router } from '@solidjs/router';
import { createEffect, createMemo, Match, Switch, on, type JSX } from 'solid-js';
import { createStore, reconcile, unwrap } from 'solid-js/store';
import { render } from 'solid-js/web';

import { ResumeContext } from './contexts/ResumeContext';
import { ResumeStorageContext } from './contexts/ResumeStorageContext';
import type { Resume } from './data/Resume';
import fixture from './fixtures/raymark_roslin.json';
import HomePage from './pages/home/HomePage';
import EditPage from './pages/edit/EditPage';
import PreviewPage from './pages/preview/PreviewPage';
import createResumeStorage, { type ResumeId } from './services/ResumeStorage';

import './index.css';

function ResumeRoute(props: { id: string | undefined; children: JSX.Element }) {
	const storage = createMemo(() => props.id ? resumeStorage.getRecord(props.id as ResumeId) : null);
	const initialResume = () => {
		const record = storage();
		if (record) {
			return structuredClone(unwrap(record.resume));
		}

		return structuredClone(fixture as Resume);
	};
	const [resume, setResume] = createStore<Resume>(initialResume());

	createEffect(() => {
		const nextResume = storage()?.resume;
		if (!nextResume) {
			return;
		}

		setResume(reconcile(structuredClone(unwrap(nextResume))));
	});

	createEffect(on(
		() => JSON.stringify(resume),
		(serializedResume) => {
			const id = props.id;
			if (!id || !storage()) {
				return;
			}

			const nextResume = JSON.parse(serializedResume) as Resume;
			resumeStorage.updateRecord(id as ResumeId, nextResume);
			document.title = `${nextResume.profile.firstName || 'Untitled'} ${nextResume.profile.lastName?.charAt(0) ?? ''}.`.trim();
		}
	));

	return (
		<Switch>
			<Match when={storage()}>
				<ResumeContext.Provider value={{ resume, setResume, resumeId: props.id! }}>
					{props.children}
				</ResumeContext.Provider>
			</Match>
			<Match when={!storage()}>
				<HomePage missingResumeId={props.id} />
			</Match>
		</Switch>
	);
}

function HomeRoute() {
	return <HomePage />;
}

const resumeStorage = createResumeStorage();

function Application() {
	return (
		<ResumeStorageContext.Provider value={resumeStorage}>
			<main>
				<Router>
					<Route path="/" component={HomeRoute} />
					<Route path="/preview/:id" component={(routeProps) => (
						<ResumeRoute id={routeProps.params.id}>
							<PreviewPage />
						</ResumeRoute>
					)} />
					<Route path="/edit/:id" component={(routeProps) => (
						<ResumeRoute id={routeProps.params.id}>
							<EditPage />
						</ResumeRoute>
					)} />
				</Router>
			</main>
		</ResumeStorageContext.Provider>
	);
}

const root = document.getElementById('root');
render(() => <Application />, root!);
