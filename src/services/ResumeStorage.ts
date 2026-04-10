import type { Resume } from '~/data/Resume';
import { createEffect } from 'solid-js';
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
	createRecord: (seed?: Resume) => void;
	updateRecord: (id: ResumeId, updater: (resume: Resume) => Resume) => void;
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

	function createRecord(seed?: Resume): void {
		const resume = structuredClone(seed ?? createEmptyResume());
		const timestamp = new Date().toISOString();

		const record: ResumeRecord = {
			id: crypto.randomUUID(),
			createdAt: timestamp,
			updatedAt: timestamp,
			resume
		};

		setRecords(produce(records => records.push(record)));
	}

	function updateRecord(id: ResumeId, updater: (resume: Resume) => Resume) {
		const record = records.find(record => record.id === id);
		if (!record) {
			return;
		}

		setRecords(produce(records => {
			const target = records.find(record => record.id === id);
			if (!target) {
				return;
			}

			target.resume = structuredClone(updater(structuredClone(target.resume)));
			target.updatedAt = new Date().toISOString();
		}));
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
		updateRecord,
		removeRecord,
	}
}

export default createResumeStorage;
