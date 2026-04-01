import { Show } from 'solid-js'
import type { Contact } from '../data/Resume'

import './ContactItem.css';
import Icon from './Icon';

type ContactItemProps = Contact;

function ContactItem(props: ContactItemProps) {
	return (
	<span class="contact">
		<span class="icon"><Icon name={props.type}/></span>
		<Show when={props.href} fallback={<span>{props.value}</span>}>
			<span class="screen-only"><a href={props.href}>{props.value}</a></span>
			<span class="print-only">{props.href}</span>
		</Show>
	</span>
	)
}

export default ContactItem
