import GlobeAmericasIcon from "@heroicons/react/24/solid/GlobeAsiaAustraliaIcon";

const ButtonRepliers = () => {
	return (
		<button className="text-sm justify-start flex items-center gap-2 text-blue-500 font-semibold">
			<GlobeAmericasIcon className="w-4 h-4" />
			<span>Everyone can reply</span>
		</button>
	);
};

export default ButtonRepliers;
