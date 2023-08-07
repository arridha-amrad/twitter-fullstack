import { ChangeEvent, useRef, useState } from "react";
import useForm from "./useForm";

type Props<T> = {
	initialData: T;
	submitFn: () => Promise<void>;
};

const useFormData = <T>(args: Props<T>) => {
	const { state, onChange, onSubmit, setState } = useForm(
		args.initialData,
		args.submitFn
	);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [filesToPreview, setFilesToPreview] = useState<string[]>([]);
	const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
	const formData = new FormData();
	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			setFilesToUpload(Array.from(files));
			const urls: string[] = [];
			for (let i = 0; i < files?.length; i++) {
				const url = URL.createObjectURL(files[i]);
				urls.splice(i, 0, url);
			}
			setFilesToPreview(urls);
		}
	};

	const removeFiles = (url: string) => {
		if (!filesToUpload) return;
		const idx = filesToPreview.indexOf(url);
		setFilesToUpload((val) => val.filter((_, i) => i !== idx));
		setFilesToPreview((val) => val.filter((name) => name !== url));
	};

	const resetForm = () => {
		setState(args.initialData);
		setFilesToPreview([]);
		setFilesToUpload([]);
	};

	return {
		state,
		onChange,
		onSubmit,
		fileInputRef,
		filesToPreview,
		onFileChange,
		filesToUpload,
		formData,
		resetForm,
		removeFiles,
	};
};

export default useFormData;
