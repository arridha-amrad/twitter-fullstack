import { useEffect, useRef } from "react";

const useOnClickOutside = (callback: VoidFunction) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const closeClickOutside = (e: MouseEvent) => {
		if (!ref.current?.contains(e.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", closeClickOutside);
		return () => {
			document.removeEventListener("click", closeClickOutside);
		};
	}, []);

	return ref;
};

export default useOnClickOutside;
