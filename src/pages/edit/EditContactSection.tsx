import { For, Show } from "solid-js";
import { createStore, produce, type SetStoreFunction } from "solid-js/store";
import type { Contact, Resume } from "~/data/Resume";
import AddIcon from "./AddIcon";

function ContactCard(props: { index: number, contact: Contact, setContacts: SetStoreFunction<Contact[]> }) {
	const setType = (type: string) => props.setContacts(props.index, produce(contact => contact.type = type as Contact["type"]));
	const setValue = (value: string) => props.setContacts(props.index, produce(contact => contact.value = value));
	const setHref = (href: string) => props.setContacts(props.index, produce(contact => contact.href = href));
	return (
		<div class="edit-card">
			<div class="container">
				<label class="field">
					<span>Type</span>
					<select
						value={props.contact.type}
						onInput={(event) => setType(event.currentTarget.value)}
					>
						<option value="phone">Phone</option>
						<option value="email">Email</option>
						<option value="github">Github</option>
						<option value="custom">Custom</option>
					</select>
				</label>
				<label class="field --full">
					<span>Value</span>
					<input
						type="text"
						value={props.contact.value}
						onInput={(event) => setValue(event.currentTarget.value)}
					/>
				</label>
			</div>
			<Show when={props.contact.type === "github"}>
				<div class="container">
					<label class="field --full">
						<span>Link (optional)</span>
						<input
							type="url"
							value={props.contact.href || ""}
							onInput={(event) => setHref(event.currentTarget.value)}
						/>
					</label>
				</div>
			</Show>
		</div>
	)
}

function EditContactSection(props: { resume: Resume }) {
	const [contacts, setContacts] = createStore(props.resume.profile.contacts);
	const addContact = () => setContacts(contacts.length, { type: "phone", value: "", href: "" });
	return (
		<>
			<h2>Contacts</h2>
			<For each={contacts}>
				{(contact, index) => <ContactCard index={index()} contact={contact} setContacts={setContacts} />}
			</For>
			<button class="add-button" type="button" onClick={addContact}><AddIcon /></button>
		</>
	)
}

export default EditContactSection