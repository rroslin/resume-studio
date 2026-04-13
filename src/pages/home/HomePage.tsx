import { A, useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";

import type { Resume } from "~/data/Resume";
import fixture from "~/fixtures/raymark_roslin.json";
import { useResumeStorageContext } from "~/contexts/ResumeStorageContext";

import "./HomePage.css";

function formatDate(value: string) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}

function getResumeLabel(resume: Resume) {
	const fullName = [resume.profile.firstName, resume.profile.lastName].filter(Boolean).join(" ").trim();
	return fullName || "Untitled resume";
}

function HomePage(props: { missingResumeId?: string }) {
	const storage = useResumeStorageContext();
	const navigate = useNavigate();

	const createResume = (seed?: Resume) => {
		const id = storage.createRecord(seed);
		navigate(`/edit/${id}`);
	};

	return (
		<section class="home-shell">
			<div class="home-hero">
				<p class="home-kicker">Resume Studio</p>
				<div class="home-actions">
					<button class="home-primary-action" type="button" onClick={() => createResume()}>
						Create blank resume
					</button>
					<button class="home-secondary-action" type="button" onClick={() => createResume(fixture as Resume)}>
						Create from sample
					</button>
				</div>
			</div>

			<Show when={props.missingResumeId}>
				<div class="home-alert" role="alert">
					Resume `{props.missingResumeId}` was not found. Pick an existing draft below or create a new one.
				</div>
			</Show>

			<div class="home-list-header">
				<div>
					<p class="home-section-kicker">Saved resumes</p>
					<h2>{storage.records.length} draft{storage.records.length === 1 ? "" : "s"}</h2>
				</div>
			</div>

			<Show
				when={storage.records.length > 0}
				fallback={
					<div class="home-empty-state">
						<h3>No resumes yet</h3>
						<p>Create your first draft to start editing and previewing by route id.</p>
					</div>
				}
			>
				<div class="home-grid">
					<For each={storage.records}>
						{(record) => (
							<article class="resume-card">
								<div class="resume-card-top">
									<div>
										<p class="resume-card-kicker">{record.resume.profile.title || "Resume draft"}</p>
										<h3>{getResumeLabel(record.resume)}</h3>
									</div>
									<button
										class="resume-delete-button"
										type="button"
										onClick={() => storage.removeRecord(record.id)}
										aria-label={`Delete ${getResumeLabel(record.resume)}`}
									>
										Delete
									</button>
								</div>
								<p class="resume-card-summary">
									{record.resume.profile.summary || "No summary yet. Open this draft to start shaping the story."}
								</p>
								<dl class="resume-card-meta">
									<div>
										<dt>Created</dt>
										<dd>{formatDate(record.createdAt)}</dd>
									</div>
									<div>
										<dt>Updated</dt>
										<dd>{formatDate(record.updatedAt)}</dd>
									</div>
								</dl>
								<div class="resume-card-actions">
									<A class="resume-card-link" href={`/edit/${record.id}`}>Edit</A>
									<A class="resume-card-link --ghost" href={`/preview/${record.id}`}>Preview</A>
								</div>
							</article>
						)}
					</For>
				</div>
			</Show>
		</section>
	);
}

export default HomePage;
