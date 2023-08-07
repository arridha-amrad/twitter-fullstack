import { ButtonHTMLAttributes, FC, ReactNode, forwardRef } from "react";

type Props = {
	children: ReactNode;
	tooltip?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, Props>(
	({ children, tooltip, ...props }, ref) => {
		return (
			<button
				ref={ref}
				{...props}
				className={`rounded-full relative group ${props.className}`}
			>
				{children}
				<div className="absolute top-auto opacity-0 transition-opacity duration-100 ease-linear group-hover:opacity-100 left-1/2 -translate-x-1/2">
					{tooltip && (
						<div className="flex items-center max-w-xs rounded bg-slate-800">
							<span className="text-slate-200 font-base text-xs px-1 py-0.5 ">
								{tooltip}
							</span>
						</div>
					)}
				</div>
			</button>
		);
	}
);

export default IconButton;
