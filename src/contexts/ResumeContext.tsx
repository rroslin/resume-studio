import type { SetStoreFunction } from "solid-js/store";
import type { Resume } from "../data/Resume";
import { createContext, useContext } from "solid-js";

type ResumeContextValues = {
	resume: Resume
	setResume: SetStoreFunction<Resume>
}

export const ResumeContext = createContext<ResumeContextValues>();

export function useResumeContext() {
	const context = useContext(ResumeContext);
	if (!context) {
		throw new Error("Can't find ResumeContext");
	}
	return context;
}