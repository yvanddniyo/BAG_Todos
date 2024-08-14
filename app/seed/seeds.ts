import { db } from '../../lib/db/drizzle';
import { todos } from '@/lib/db/schema';

const seedTodo = async () => {
  try {
    await db.insert(todos).values({
     id: 1,
     title: "cooking",
     description: "cooking",
     done: false,
     createdAt: '2024-08-12 16:13:46'

    });
    console.log('Seed complete!');
  } catch (err) {
    console.error('Something went wrong...');
    console.error(err);
  }
};

const main = async () => {
  console.log('Started seeding the database...');
  await seedTodo();
  console.log('Done seeding the database successfully...');
};

main();