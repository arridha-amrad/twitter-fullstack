type User = {
	id: string;
	username: string;
	email: string;
	imageURL: string;
	fullname: string;
	createdAt: Date;
	updatedAt: Date;
};

type RegisterDTO = {
	firstName: string;
	lastName?: string;
	username: string;
	password: string;
	email: string;
};

type LoginDTO = {
	identity: string;
	password: string;
};

type LoginResponse = {
	token: string;
	user: User;
};
