const { getTomorrowPuzzle } = require('./algorithm');

// Get tomorrow's puzzle
const puzzle = getTomorrowPuzzle();

console.log('\n=== MEDICAL CONNECTIONS PUZZLE ===\n');
  
// Display the items
console.log('ITEMS:');
const items = puzzle.items;
for (let i = 0; i < items.length; i += 4) {
  const row = items.slice(i, i + 4);
  console.log(row.join('\t'));
}

console.log('\n=== SOLUTION ===\n');

// Display each group
puzzle.solution.forEach(group => {
  let difficultyDesc = '';
  switch (group.difficulty) {
    case 1: difficultyDesc = 'Easiest'; break;
    case 2: difficultyDesc = 'Medium'; break;
    case 3: difficultyDesc = 'Harder'; break;
    case 4: difficultyDesc = 'Hardest'; break;
  }
  
  console.log(`${group.color.toUpperCase()} GROUP (${difficultyDesc}): ${group.theme}`);
  console.log(`Items: ${group.items.join(', ')}`);
  console.log();
});

// Display ambiguity stats
console.log('=== AMBIGUITY STATISTICS ===\n');
console.log(`Ambiguous items: ${puzzle.ambiguityStats.ambiguousCount} (Target: 4-6)`);
console.log(`Connection type diversity: ${puzzle.ambiguityStats.connectionTypeDiversity}`);

console.log('\nAmbiguous items and their possible themes:');
puzzle.ambiguityStats.ambiguousItems.forEach(item => {
  console.log(`- ${item.item}: ${item.possibleThemes.join(', ')} (${item.connectionType})`);
}); 