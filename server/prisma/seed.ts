import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

const seed = async () => {
	const password = await hash("123");
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
	try {
		const users = await prisma.user.findMany();
		await prisma.$transaction(async(tx) => {
			for (let i = 0; i < 300; i++) {
				const userId = users[Math.floor(Math.random() * users.length)].id
				const post = await tx.post.create({
					data: {
						body: faker.lorem.sentences({ min: 1, max: 10 }),
						authorId: userId,
					},
				});
				const saveImages = async () => {
					const totalImage = Math.ceil(Math.random() * 4);
					const urls: string[] = [];
					for (let i = 0; i < totalImage; i++) {
						const url = faker.image.urlLoremFlickr();
						urls.push(url);
					}
					await tx.file.createMany({
						data: urls.map((url) => ({ postId: post.id, url, userId })),
					});
				};
				const flipCoin = Math.ceil(Math.random() * 10);
				if (flipCoin % 2 === 0) {
					await saveImages();
				}
				await tx.tweet.create({
					data: {
						isRetweet: false,
						userId,
						postId: post.id,
					},
				});
			}
		})
	} catch (error) {
		throw error
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
