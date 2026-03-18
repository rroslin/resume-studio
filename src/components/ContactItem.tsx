import { Show } from 'solid-js'
import type { Contact } from '../data/Resume'

import './ContactItem.css';

type ContactItemProps = {
  contact: Contact
}

function ContactItem(props: ContactItemProps) {
	const { type, value, href } = props.contact;
	
	return (
	<span class="contact">
		<span class="contact__icon">{`${type}: `}</span>
		<Show when={href} fallback={<span>{value}</span>}>
			<span class="non-print"><a href={href}>{value}</a></span>
			<span class="print-only">{href}</span>
		</Show>
	</span>
	)
}

export default ContactItem
