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

function Application() {
	const [resume, setResume] = createStore(fixture as Resume);

	createEffect(() => {
		document.title = `${resume.profile.firstName} ${resume.profile.lastName.charAt(0)}.`;
	})

	return (
		<ResumeContext.Provider value={{ resume, setResume }}>
			<main>
				<Router>
					<Route path="/" component={PreviewPage} />
					<Route path="/edit" component={EditPage} />
				</Router>
			</main>
		</ResumeContext.Provider>
	)
}

const root = document.getElementById('root');
render(() => <Application />, root!);

