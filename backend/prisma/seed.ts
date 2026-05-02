import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const animals = [
  { name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: 24, gender: 'Female', color: 'Golden', weight: 25.4, status: 'Available', description: 'Friendly, playful, and loves children. Bella enjoys long walks and cuddle time.', imageUrl: 'https://placedog.net/600/420?id=11', healthNotes: 'Vaccinated, dewormed, microchipped' },
  { name: 'Max', species: 'Dog', breed: 'Labrador Mix', age: 36, gender: 'Male', color: 'Black', weight: 29.1, status: 'Pending', description: 'Calm and gentle dog that is great with families and other pets.', imageUrl: 'https://placedog.net/600/420?id=12', healthNotes: 'Vaccinated, neutered' },
  { name: 'Luna', species: 'Cat', breed: 'Domestic Shorthair', age: 14, gender: 'Female', color: 'Gray', weight: 4.2, status: 'Available', description: 'Sweet and curious cat who enjoys sunny windows and soft blankets.', imageUrl: 'https://placekitten.com/600/421', healthNotes: 'Vaccinated, litter trained' },
  { name: 'Charlie', species: 'Dog', breed: 'Beagle', age: 20, gender: 'Male', color: 'Tri-color', weight: 13.5, status: 'Adopted', description: 'Cheerful beagle with lots of energy and a big heart.', imageUrl: 'https://placedog.net/600/420?id=13', healthNotes: 'Vaccinated, healthy' },
  { name: 'Milo', species: 'Cat', breed: 'Tabby', age: 10, gender: 'Male', color: 'Orange', weight: 3.8, status: 'Available', description: 'Milo is playful and affectionate, always ready to chase toys.', imageUrl: 'https://placekitten.com/600/422', healthNotes: 'Vaccinated, flea treated' },
  { name: 'Daisy', species: 'Rabbit', breed: 'Holland Lop', age: 8, gender: 'Female', color: 'White', weight: 1.9, status: 'Available', description: 'Gentle rabbit who loves fresh greens and quiet spaces.', imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80', healthNotes: 'Healthy, regular checkups' },
  { name: 'Rocky', species: 'Dog', breed: 'German Shepherd', age: 30, gender: 'Male', color: 'Brown/Black', weight: 32.7, status: 'Pending', description: 'Smart and loyal companion with basic obedience training.', imageUrl: 'https://placedog.net/600/420?id=14', healthNotes: 'Vaccinated, microchipped' },
  { name: 'Coco', species: 'Bird', breed: 'Cockatiel', age: 18, gender: 'Female', color: 'Yellow/Gray', weight: 0.09, status: 'Available', description: 'Coco chirps happily and enjoys human interaction.', imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80', healthNotes: 'Wing checked, healthy diet' },
  { name: 'Oliver', species: 'Cat', breed: 'Siamese Mix', age: 16, gender: 'Male', color: 'Cream/Brown', weight: 4.5, status: 'Available', description: 'Oliver is affectionate and enjoys gentle play and naps.', imageUrl: 'https://placekitten.com/600/423', healthNotes: 'Vaccinated, neutered' },
  { name: 'Nala', species: 'Dog', breed: 'Corgi', age: 26, gender: 'Female', color: 'Tan/White', weight: 11.2, status: 'Adopted', description: 'Happy little dog with a big personality and friendly attitude.', imageUrl: 'https://placedog.net/600/420?id=15', healthNotes: 'Vaccinated, healthy joints' },
  { name: 'Simba', species: 'Cat', breed: 'Maine Coon Mix', age: 22, gender: 'Male', color: 'Brown', weight: 5.6, status: 'Pending', description: 'Confident, social cat who likes company and climbing trees.', imageUrl: 'https://placekitten.com/600/424', healthNotes: 'Vaccinated, dewormed' },
  { name: 'Poppy', species: 'Rabbit', breed: 'Mini Rex', age: 12, gender: 'Female', color: 'Chocolate', weight: 2.3, status: 'Available', description: 'Calm and cuddly rabbit who bonds quickly with patient owners.', imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80', healthNotes: 'Healthy teeth and coat' },
];

async function main() {
  const passwordHash = await bcrypt.hash('Admin@12345', 10);

  await prisma.admin.upsert({
    where: { email: 'admin@fluffycare.com' },
    create: { email: 'admin@fluffycare.com', name: 'FluffyCare Admin', passwordHash },
    update: { name: 'FluffyCare Admin', passwordHash },
  });

  await prisma.animal.deleteMany();
  await prisma.animal.createMany({ data: animals });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
