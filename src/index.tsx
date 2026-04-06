import type { Resume } from './data/Resume';
import { createStore } from 'solid-js/store';
import { render } from 'solid-js/web'
import { createEffect } from 'solid-js'
import { Route, Router } from '@solidjs/router';
import { ResumeContext } from './contexts/ResumeContext';

import './index.css'
import fixture from './fixtures/raymark_roslin.json'
import PreviewPage from './pages/preview/PreviewPage';
import EditPage from '~/pages/edit/EditPage'

const RESUME_STORAGE_KEY = 'resume-generator.resume';

function loadInitialResume(): Resume {
	if (typeof window === 'undefined') {
		return fixture as Resume;
	}

	const storedResume = window.localStorage.getItem(RESUME_STORAGE_KEY);

	if (!storedResume) {
		return fixture as Resume;
	}

	try {
		return JSON.parse(storedResume) as Resume;
	} catch (error) {
		console.error('Failed to parse saved resume from localStorage.', error);
		window.localStorage.removeItem(RESUME_STORAGE_KEY);
		return fixture as Resume;
	}
}

function Application() {
	const [resume, setResume] = createStore(loadInitialResume());

	createEffect(() => {
		document.title = `${resume.profile.firstName} ${resume.profile.lastName.charAt(0)}.`;
	})

	createEffect(() => {
		window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resume));
	});

	return (
		<ResumeContext.Provider value={{ resume, setResume }}>
			<main>
				<Router>
					<Route path="/preview" component={PreviewPage} />
					<Route path="/edit" component={EditPage} />
				</Router>
			</main>
		</ResumeContext.Provider>
	)
}

const root = document.getElementById('root');
render(() => <Application />, root!);
