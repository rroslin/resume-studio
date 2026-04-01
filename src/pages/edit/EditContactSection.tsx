import { For, Show } from "solid-js";
import { createStore, produce, type SetStoreFunction } from "solid-js/store";
import type { Contact, Resume } from "~/data/Resume";

import Icon from "~/components/Icon";

function ContactCard(props: { index: number, contacts: Contact[], setContacts: SetStoreFunction<Contact[]> }) {
	const [contact, setContact] = createStore(props.contacts[props.index]);
	const removeContact = () => props.setContacts(produce(contacts => contacts.splice(props.index, 1)));
	return (
		<div class="edit-card">
			<button class="remove-button" type="button" onClick={removeContact} aria-label="Remove contact">
				<Icon name="close"/>
			</button>
			<div class="container">
				<label class="field">
					<span>Type</span>
					<select
						value={contact.type}
						onInput={(event) => setContact(produce(contact => contact.type = event.currentTarget.value as Contact["type"]))}
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
						value={contact.value}
						onInput={(event) => setContact(produce(contact => contact.value = event.currentTarget.value))}
					/>
				</label>
			</div>
			<Show when={contact.type === "github"}>
				<div class="container">
					<label class="field --full">
						<span>Link (optional)</span>
						<input
							type="url"
							value={contact.href || ""}
							onInput={(event) => setContact(produce(contact => contact.href = event.currentTarget.value))}
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
				{(_, index) => <ContactCard index={index()} contacts={contacts} setContacts={setContacts} />}
			</For>
			<button class="add-button" type="button" onClick={addContact}><Icon name="add"/></button>
		</>
	)
}

export default EditContactSection
