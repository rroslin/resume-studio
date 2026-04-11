import type { Resume } from '~/data/Resume';
import { createEffect, createSignal, on, type Accessor, type Setter } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

const STORE_KEY = 'resume-generator.store';

type ResumeId = `${string}-${string}-${string}-${string}-${string}`;

type ResumeRecord = {
	id: ResumeId;
	createdAt: string;
	updatedAt: string;
	resume: Resume;
};

type ResumeStorage = {
	records: ResumeRecord[];
	getResume: (id: ResumeId) => readonly [Accessor<Resume>, Setter<Resume>] | null;
	createRecord: (seed?: Resume) => void;
	removeRecord: (id: ResumeId) => void;
}

function createEmptyResume(): Resume {
	return {
		profile: {
			firstName: '',
			middleName: '',
			lastName: '',
			title: '',
			photoUrl: '',
			summary: '',
			contacts: [],
		},
		experiences: [],
		skills: [],
		educations: [],
		awards: [],
	};
}

function loadLocalStorage(): ResumeRecord[] {
	if (typeof window === 'undefined') {
		throw new Error('localStorage does not exist');
	}

	const raw = window.localStorage.getItem(STORE_KEY);
	if (raw) {
		try {
			return JSON.parse(raw) as ResumeRecord[];
		} catch (error) {
			console.error(`localStorage data corrupted, backing up and resetting ${STORE_KEY}`, error);
			const backupKey = `${STORE_KEY}_${new Date().toISOString()}`;
			window.localStorage.setItem(backupKey, raw);
			console.warn(`backup storage created ${backupKey}`, error);
			window.localStorage.setItem(STORE_KEY, JSON.stringify([]));
			return [];
		}
	} else {
		console.log('localStorage initialized');
		window.localStorage.setItem(STORE_KEY, JSON.stringify([]));
		return [];
	}
}

function createResumeStorage(): ResumeStorage {
	const [records, setRecords] = createStore<ResumeRecord[]>(loadLocalStorage());

	function getResume(id: ResumeId): readonly [Accessor<Resume>, Setter<Resume>] | null {
		const result = records.find(record => record.id === id);
		if (!result) {
			console.error(`record id:${id} not found`);
			return null;
		}

		const [resume, setResume] = createSignal(result.resume);

		createEffect(on(resume, () => {
			setRecords(
				record => record.id === id,
				produce(record => {
					record.resume = structuredClone(resume());
					record.updatedAt = new Date().toISOString();
				})
			);
		}, { defer: true }));

		return [resume, setResume] as const;
	}

	function createRecord(seed?: Resume): void {
		const resume = structuredClone(seed ?? createEmptyResume());
		const timestamp = new Date().toISOString();

		const record: ResumeRecord = {
			id: crypto.randomUUID(),
			createdAt: timestamp,
			updatedAt: timestamp,
			resume
		};

		setRecords(records.length, record);
	}

	function removeRecord(id: ResumeId): void {
		if (!records.some(record => record.id === id)) {
			return;
		}

		setRecords(records => records.filter(record => record.id !== id));
	}

	createEffect(() => {
		if (typeof window === 'undefined') {
			throw new Error('localStorage does not exist');
		}
		window.localStorage.setItem(STORE_KEY, JSON.stringify(records));
	});

	return {
		records,
		createRecord,
		getResume,
		removeRecord,
	}
}

export default createResumeStorage;
