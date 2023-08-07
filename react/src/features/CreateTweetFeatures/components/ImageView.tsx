import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { AnimatePresence, motion } from "framer-motion";
import ButtonIcon from "../../../components/ButtonIcon";

const ImageView = ({
	urls,
	remove,
}: {
	urls: string[];
	remove: (url: string) => void;
}) => {
	if (urls.length === 0) return null;
	const sum: number = urls.length;
	let classNames: string[] = [];
	const pickClass = () => {
		switch (sum) {
			case 4:
				classNames = [
					"w-full h-full",
					"w-full h-full",
					"w-full h-full",
					"w-full h-full",
				];
				break;
			case 3:
				classNames = ["row-span-2", "w-full h-full", "w-full h-full"];
				break;
			case 2:
				classNames = ["row-span-2", "row-span-2"];
				break;
			case 1:
				classNames = ["row-span-2 col-span-2"];
		}
	};
	pickClass();
	return (
		<div className="grid w-full h-[300px] grid-cols-2 grid-rows-2 gap-2 rounded-xl overflow-clip">
			{urls.map((val, i) => (
				<div
					key={i}
					className={`overflow-clip rounded-xl relative ${classNames[i]} `}
				>
					<div className="absolute top-2 left-2 bg-black/70 aspect-square rounded-full w-8">
						<ButtonIcon
							className=""
							icon={<XMarkIcon className="w-5" />}
							tooltip="Remove"
							onClick={() => remove(val)}
						/>
					</div>

					<img className="w-full h-full object-cover" alt="profile" src={val} />
				</div>
			))}
		</div>
	);
};

const Divider = ({ text }: { text: string }) => {
	return (
		<AnimatePresence>
			{!!text.length && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 1 } }}
					className="w-fit h-full flex items-center justify-center"
				>
					<div className="w-0.5 h-5 mx-2 bg-gray-500" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ImageView;
