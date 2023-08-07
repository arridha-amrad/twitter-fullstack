import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function ModalTitle({ children }: Props) {
	return (
		<div className="h-[53px] aspect-square flex items-center justify-center">
			{children}
		</div>
	);
}
