const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .option('-i, --input <path>', 'шлях до файлу для читання (обовʼязково)')
  .option('-o, --output <path>', 'шлях до файлу для запису (необовʼязково)')
  .option('-d, --display', 'вивести результат у консоль (необовʼязково)');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));

  const maxRate = Math.max(...data.map(item => item.rate));
  const result = `Максимальний курс: ${maxRate}`;

  if (options.output) {
    fs.writeFileSync(options.output, result, 'utf-8');
  }

  if (options.display) {
    console.log(result);
  }
} catch (error) {
  console.error("Error processing file:", error.message);
  process.exit(1);
}
