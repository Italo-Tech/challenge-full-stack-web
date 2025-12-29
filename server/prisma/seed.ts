import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Lista de nomes e sobrenomes brasileiros
const firstNames = [
  'João', 'Maria', 'José', 'Ana', 'Pedro', 'Mariana', 'Lucas', 'Juliana',
  'Gabriel', 'Fernanda', 'Rafael', 'Camila', 'Felipe', 'Beatriz', 'Bruno',
  'Larissa', 'Gustavo', 'Letícia', 'Mateus', 'Carolina', 'Thiago', 'Isabela',
  'Rodrigo', 'Amanda', 'Diego', 'Gabriela', 'Vinícius', 'Bruna', 'Leonardo',
  'Aline', 'Eduardo', 'Bianca', 'Fernando', 'Natália', 'Marcelo', 'Jéssica',
  'Ricardo', 'Vanessa', 'André', 'Patrícia', 'Paulo', 'Débora', 'Carlos',
  'Renata', 'Daniel', 'Priscila', 'Alexandre', 'Tatiana', 'Fábio', 'Adriana',
];

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
  'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
  'Rocha', 'Almeida', 'Nascimento', 'Araújo', 'Melo', 'Barbosa', 'Cardoso',
  'Correia', 'Dias', 'Fernandes', 'Freitas', 'Gonçalves', 'Lopes', 'Machado',
  'Marques', 'Miranda', 'Monteiro', 'Moreira', 'Nunes', 'Pinto', 'Ramos',
  'Reis', 'Rezende', 'Santana', 'Soares', 'Teixeira', 'Vieira', 'Castro',
];

// Função para gerar CPF válido
function generateCPF(): string {
  const randomDigits = () => Math.floor(Math.random() * 10);
  const cpf = Array.from({ length: 9 }, randomDigits);

  const calculateDigit = (arr: number[]) => {
    const sum = arr.reduce((acc, val, idx) => acc + val * (arr.length + 1 - idx), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  cpf.push(calculateDigit(cpf));
  cpf.push(calculateDigit(cpf));

  return cpf.join('');
}

// Função para gerar RA único
function generateRA(index: number): string {
  const year = new Date().getFullYear();
  return `${year}${String(index).padStart(5, '0')}`;
}

// Função para gerar email baseado no nome
function generateEmail(firstName: string, lastName: string, index: number): string {
  const normalizedFirst = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const normalizedLast = lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return `${normalizedFirst}.${normalizedLast}${index}@estudante.com`;
}

// Função para escolher item aleatório de array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Iniciando seed do banco de dados...');

  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@edtech.com' },
    update: {},
    create: {
      email: 'admin@edtech.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Limpar estudantes existentes (opcional)
  await prisma.student.deleteMany({});
  console.log('🗑️  Estudantes anteriores removidos');

  // Criar 100 estudantes
  console.log('📝 Criando 100 estudantes...');
  
  const students = [];
  for (let i = 1; i <= 100; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const email = generateEmail(firstName, lastName, i);
    const cpf = generateCPF();
    const ra = generateRA(i);

    students.push({
      name: fullName,
      email,
      cpf,
      ra,
    });
  }

  // Inserir em lote para melhor performance
  await prisma.student.createMany({
    data: students,
    skipDuplicates: true,
  });

  console.log(`✅ ${students.length} estudantes criados com sucesso!`);
  console.log('📊 Exemplos:');
  console.log(`   - ${students[0].name} (${students[0].email})`);
  console.log(`   - ${students[1].name} (${students[1].email})`);
  console.log(`   - ${students[2].name} (${students[2].email})`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
