const { generateOptimalPuzzle, createSamplePuzzle, getTomorrowPuzzle } = require('./algorithm');

/**
 * Display a generated puzzle
 * @param {Object} puzzle - Generated puzzle object
 */
function displayPuzzle(puzzle) {
  const { items, solution } = puzzle;
  
  console.log('=== MEDICAL CONNECTIONS PUZZLE ===');
  console.log('Find the connections between these medical terms:');
  console.log('');
  
  // Display items in a 4x4 grid
  for (let i = 0; i < items.length; i += 4) {
    const row = items.slice(i, i + 4);
    console.log(row.map(item => item.padEnd(20)).join(''));
  }
  
  console.log('\n');
  console.log('=== SOLUTION ===');
  
  const difficultyDescriptions = {
    1: 'Easiest',
    2: 'Medium',
    3: 'Harder',
    4: 'Hardest'
  };
  
  // Display solution groups
  solution.forEach(group => {
    console.log(`${group.color.toUpperCase()} GROUP (${difficultyDescriptions[group.difficulty]}): ${group.theme}`);
    console.log(`Connection type: ${group.connectionType}`);
    console.log('Items:', group.items.join(', '));
    console.log('');
  });
  
  // Display ambiguity statistics if available
  if (puzzle.ambiguityStats) {
    console.log('=== AMBIGUITY STATISTICS ===');
    console.log(`${puzzle.ambiguityStats.ambiguousCount} ambiguous items (target: ${puzzle.ambiguityStats.targetRange.min}-${puzzle.ambiguityStats.targetRange.max})`);
    console.log(`Connection type diversity: ${puzzle.ambiguityStats.connectionTypeDiversity}`);
    
    if (puzzle.ambiguityStats.ambiguousItems.length > 0) {
      console.log('\nAmbiguous items:');
      puzzle.ambiguityStats.ambiguousItems.forEach(item => {
        console.log(`- ${item.item}: Could fit in ${item.possibleThemes.join(', ')}`);
      });
    }
    
    // Display difficulty distribution if available
    if (puzzle.ambiguityStats.ambiguityByDifficulty) {
      console.log('\nAmbiguity by difficulty level:');
      Object.entries(puzzle.ambiguityStats.ambiguityByDifficulty).forEach(([difficulty, count]) => {
        console.log(`- Level ${difficulty}: ${count} ambiguous items`);
      });
    }
    
    // Display cross-group ambiguity if available
    if (puzzle.ambiguityStats.crossGroupAmbiguity) {
      console.log('\nCross-group ambiguity:');
      Object.entries(puzzle.ambiguityStats.crossGroupAmbiguity).forEach(([pair, count]) => {
        const [diff1, diff2] = pair.split('-');
        console.log(`- Between difficulty ${diff1} and ${diff2}: ${count} items`);
      });
    }
  }
}

/**
 * Main function to generate and display a puzzle
 */
async function main() {
  try {
    console.log('Generating puzzle...');
    
    // Get the first command line argument
    const arg = process.argv[2];
    
    let puzzle;
    if (arg === 'example') {
      // Generate an example puzzle
      puzzle = createSamplePuzzle();
    } else if (arg === 'tomorrow') {
      // Get tomorrow's puzzle
      puzzle = getTomorrowPuzzle();
    } else if (arg && arg !== 'generate') {
      // Generate a puzzle for a specific category
      puzzle = createSamplePuzzle(arg);
    } else {
      // Generate an optimal puzzle with good ambiguity
      puzzle = generateOptimalPuzzle();
    }
    
    // Display the puzzle
    displayPuzzle(puzzle);
    
  } catch (error) {
    console.error('Failed to generate puzzle:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 