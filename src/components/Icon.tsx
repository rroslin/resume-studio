import iconsHref from "~/assets/icons.svg?url";

const iconNames = [
	"add",
	"close",
	"email",
	"phone",
	"github"
] as const

function Icon(props: {name: typeof iconNames[number]}) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<use href={`${iconsHref}#${props.name}`} />
		</svg>
	)
}

export default Icon;
