import { For, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { Contact } from "~/data/Resume";

import Icon from "~/components/Icon";

function ContactCard(props: { contact: Contact; removeContact: () => void; index: number }) {
	const [contact, setContact] = createStore(props.contact);

	return (
		<div class="edit-card">
			<div class="edit-card-header">
				<div>
					<p class="edit-card-kicker">Contact {props.index + 1}</p>
					<h3>{contact.type[0].toUpperCase() + contact.type.slice(1)}</h3>
				</div>
				<button class="remove-button" type="button" onClick={props.removeContact} aria-label="Remove contact">
					<Icon name="close" />
					<span>Remove</span>
				</button>
			</div>
			<div class="container">
				<label class="field">
					<span>Type</span>
					<select
						value={contact.type}
						onInput={(event) => setContact(produce((draft) => {
							draft.type = event.currentTarget.value as Contact["type"];
						}))}
					>
						<option value="phone">Phone</option>
						<option value="email">Email</option>
						<option value="github">Github</option>
					</select>
				</label>
				<label class="field --full">
					<span>Value</span>
					<input
						type="text"
						value={contact.value}
						placeholder={contact.type === "email" ? "name@example.com" : contact.type === "github" ? "username" : "+63 912 345 6789"}
						onInput={(event) => setContact(produce((draft) => {
							draft.value = event.currentTarget.value;
						}))}
					/>
				</label>
			</div>
			<Show when={contact.type === "github"}>
				<div class="container">
					<label class="field --full">
						<span>Link</span>
						<input
							type="url"
							value={contact.href || ""}
							placeholder="https://github.com/username"
							onInput={(event) => setContact(produce((draft) => {
								draft.href = event.currentTarget.value;
							}))}
						/>
					</label>
				</div>
			</Show>
		</div>
	);
}

function EditContactSection(props: { contacts: Contact[] }) {
	const [contacts, setContacts] = createStore(props.contacts);

	return (
		<>
			<For each={contacts}>
				{(contact, i) => (
					<ContactCard
						contact={contact}
						index={i()}
						removeContact={() => setContacts(produce((draft) => draft.splice(i(), 1)))}
					/>
				)}
			</For>
			<button
				class="add-button"
				type="button"
				onClick={() => setContacts(contacts.length, { type: "phone", value: "", href: "" })}
			>
				<Icon name="add" />
				<span>Add contact method</span>
			</button>
		</>
	);
}

export default EditContactSection;
