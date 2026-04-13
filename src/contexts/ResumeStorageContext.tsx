import { createContext, useContext } from "solid-js";

import type { ResumeStorage } from "~/services/ResumeStorage";

export const ResumeStorageContext = createContext<ResumeStorage>();

export function useResumeStorageContext() {
	const context = useContext(ResumeStorageContext);
	if (!context) {
		throw new Error("Can't find ResumeStorageContext");
	}
	return context;
}
