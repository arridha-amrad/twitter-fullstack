import { FC, useEffect, useRef, useState } from "react";
import IconButton from "../IconButton";
import MenuIcon from "@heroicons/react/24/solid/EllipsisHorizontalIcon";
import DeleteTweetFeature from "../../features/DeleteTweetFeature";
import { AnimatePresence, motion } from "framer-motion";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";

const TweetCardOptions: FC<{ tweet: Tweet }> = ({ tweet }) => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [isOpenDd, setIsOpenDd] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		const tcSection = document.querySelectorAll("#card-section");
		if (!tcSection) return;
		if (isOpenDd) {
			tcSection.forEach((tc) => tc.classList.add("relative", "-z-10"));
		} else {
			tcSection.forEach((tc) => tc.classList.remove("relative", "-z-10"));
		}
	}, [isOpenDd]);

	const [referenceElement, setReferenceElement] =
		useState<HTMLButtonElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
		null
	);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		strategy: "fixed",
		modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
		placement: "left-start",
	});

	const refPopper = useRef<HTMLDivElement | null>(null);

	const click = (e: MouseEvent) => {
		if (!refPopper?.current?.contains(e.target as Node)) {
			setIsOpenDd(false);
		}
	};

	useEffect(() => {
		const root = document.getElementById("root")!;
		if (!root) return;
		if (isOpenDd) {
			root.classList.add("relative", "-z-10");
		} else {
			root.classList.remove("relative", "-z-10");
		}
		document.addEventListener("mousedown", click);
		return () => document.removeEventListener("mousedown", click);
	}, [isOpenDd]);

	return (
		<div ref={menuRef} className="absolute top-3 right-2">
			<IconButton
				ref={setReferenceElement}
				onClick={() => {
					setIsOpenDd((val) => !val);
				}}
				className="p-1 hover:dark:bg-slate-800 group"
			>
				<MenuIcon className="w-5 h-5 group-hover:text-blue-500 fill-slate-500" />
			</IconButton>
			{createPortal(
				<AnimatePresence initial={false}>
					{isOpenDd && (
						<motion.div
							ref={setPopperElement}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0.5, height: 0 }}
							className="absolute right-10 w-max top-2 z-[9999]
          dark:bg-black bg-gray-100 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-lg"
							{...attributes.popper}
							style={{ ...styles.popper }}
						>
							<div ref={refPopper}>
								<Options
									label="Delete this tweet"
									onClick={() => {
										setIsOpenModal(true);
										setIsOpenDd(false);
									}}
								/>
								<Options
									label="Update this tweet"
									onClick={() => console.log("update this tweet")}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
			<DeleteTweetFeature
				tweet={tweet}
				isOpen={isOpenModal}
				setIsOpenModal={setIsOpenModal}
			/>
		</div>
	);
};

export default TweetCardOptions;

const Options = (data: { label: string; onClick: VoidFunction }) => {
	return (
		<li className="p-2 hover:dark:bg-blue-600 hover:bg-blue-100">
			<button
				className="text-sm font-semibold"
				onClick={(e) => {
					e.stopPropagation();
					data.onClick();
				}}
			>
				{data.label}
			</button>
		</li>
	);
};
