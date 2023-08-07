import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

const seed = async () => {
	const password = await hash("Powerranger77$");
	const data = [...Array(100).keys()].map(() => ({
		id: faker.string.nanoid(),
		email: faker.internet.email(),
		username: faker.internet.userName().replace(".", "_").toLowerCase(),
		password,
		fullname: faker.person.fullName(),
		imageURL: faker.internet.avatar(),
	}));
	await prisma.user.createMany({ data });
};

const seedTweets = async () => {
	const users = await prisma.user.findMany();
	for (let i = 0; i < 50; i++) {
		for (const user of users) {
			const post = await prisma.post.create({
				data: {
					body: faker.lorem.sentences({ min: 1, max: 10 }),
					authorId: user.id,
				},
			});
			const saveImages = async () => {
				const totalImage = Math.ceil(Math.random() * 4);
				const urls: string[] = [];
				for (let i = 0; i < totalImage; i++) {
					const url = faker.image.urlLoremFlickr();
					urls.push(url);
				}
				await prisma.file.createMany({
					data: urls.map((url) => ({ postId: post.id, url, userId: user.id })),
				});
			};
			const flipCoin = Math.ceil(Math.random() * 10);
			if (flipCoin % 2 === 0) {
				await saveImages();
			}
			await prisma.tweet.create({
				data: {
					isRetweet: false,
					userId: user.id,
					postId: post.id,
				},
			});
		}
	}
};

seed()
	.then(() => {
		console.log("seeded");
		seedTweets().then(() => console.log("seed tweets"));
	})
	.catch(async (err) => {
		console.log(err);
		await prisma.$disconnect();
		process.exit(1);
	});
