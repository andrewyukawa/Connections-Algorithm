# Medical Connections Puzzle Generator

A specialized algorithm that creates engaging medical-themed word puzzles similar to the popular Connections game format.

## What is a Connections Puzzle?

A Connections puzzle presents players with 16 words or terms that must be sorted into 4 distinct groups of 4 items each. Each group is linked by a common theme or relationship. The challenge comes from figuring out what the themes are and which terms belong together.

## How Our Medical Connections Algorithm Works

Our algorithm creates medically-themed puzzles specifically designed for healthcare professionals and students. Each puzzle contains carefully balanced difficulty levels and strategic ambiguity to create an engaging experience.

### Key Features

1. **Color-Coded Difficulty Levels**
   - **Yellow**: Easiest connections (literal relationships, anatomical structures)
   - **Green**: Moderately easy (clear categories, conventional groupings)
   - **Blue**: Moderately difficult (functional relationships, specialized knowledge)
   - **Purple**: Most difficult (abstract concepts, lateral thinking, wordplay)

2. **Controlled Ambiguity**
   - Every puzzle has 4-6 terms that could plausibly fit in multiple groups
   - This creates an engaging "aha moment" when players discover the correct groupings
   - Despite ambiguity, each puzzle has exactly one correct solution

3. **Connection Type Diversity**
   - Each difficulty level uses different types of connections:
     - Literal connections (anatomical structures, physical components)
     - Categorical connections (classifications, groupings)
     - Functional connections (diagnostic methods, treatment approaches)
     - Conceptual connections (abstract medical principles, wordplay)

4. **Balanced Cross-Group Relationships**
   - The algorithm ensures optimal linking between difficulty levels
   - Yellow groups link more with Green, Blue with Purple
   - Strategic overlaps create a logical progression of difficulty

## How the Algorithm Works (Technical Aspects)

The algorithm employs several sophisticated techniques to generate high-quality puzzles:

1. **Tag-Based Term Selection**
   - Every medical term has a set of tags (e.g., "Cardiology", "Anatomy", "Diagnostic") 
   - Terms are carefully selected to balance uniqueness with ambiguity

2. **Specificity Analysis**
   - Terms are analyzed for their specificity within the medical domain
   - This ensures appropriate difficulty placement

3. **Ambiguity Scoring**
   - Each potential puzzle configuration is scored based on:
     - Number of ambiguous terms (target: 4-6)
     - Diversity of connection types
     - Distribution of ambiguity across difficulty levels
     - Balance of cross-group connections

4. **Validation Framework**
   - Ensures puzzles have a unique solution
   - Checks that no unintended groupings are possible
   - Falls back to manually designed puzzles if generation fails

## Example Puzzle

Here's an example of a generated puzzle:

```
MRI brain           Cerebrum            Diuretics           EEG
EMG                 Arrhythmia          Hippocampus         Myocardial infarction
Cerebellum          Beta-blockers       Hypertension        Heart failure
Bronchodilators     Lumbar puncture     ACE inhibitors      Brainstem
```

The solution groups are:

- **Yellow (Easy)**: Brain parts - Cerebellum, Brainstem, Hippocampus, Cerebrum
- **Green (Medium)**: Pharmacology - Beta-blockers, ACE inhibitors, Diuretics, Bronchodilators  
- **Blue (Hard)**: Neurology - MRI brain, Lumbar puncture, EMG, EEG
- **Purple (Hardest)**: Heart conditions - Myocardial infarction, Arrhythmia, Heart failure, Hypertension

This puzzle has strategic ambiguity: the brain parts could also fit in the Neurology category, creating an engaging challenge.

## Using the Generator

Run the generator with Node.js:

```bash
npm start           # Generate a random puzzle
node index.js example   # Generate an example puzzle
node index.js cardiology # Generate a cardiology-themed puzzle
```

## Recent Updates and Enhancements (April 2025)

We've recently made significant improvements to the algorithm and data library to create more challenging and engaging puzzles:

### 1. Algorithm Improvements

- **Increased Proximity Threshold**: Changed from 0.35 to 0.4 in the `analyzeAmbiguity` function, increasing the number of items considered ambiguous (making puzzles more challenging)

- **Enhanced Semantic Proximity Scoring**: 
  - Reworked the `calculateSemanticProximity` function to weight shared tags by specificity
  - Added bonuses for functional relationships (e.g., medications treating conditions)
  - Modified proximity weighting to favor connections that bridge difficulty levels

- **Shared Tag Enhancement**: 
  - Added substantial bonuses for items that share tags across different difficulty levels
  - Modified balance scoring to prioritize cross-difficulty connections

- **Multi-Theme Items Prioritization**:
  - Increased the weight of multi-theme items from 2.5 to 3.5
  - Modified item selection to include at least 2 multi-theme items per group (up from 1)
  - Added a specific multi-theme item score to the puzzle quality evaluation

- **Thematic Bridges**: 
  - Increased bonus for thematic bridges (items that connect across non-adjacent difficulty levels)
  - Adjusted scoring to prioritize these types of connections

### 2. Data Library Expansion

We've significantly expanded the medical terms database from 214 to 342 terms through:

- **Categorical Expansion**: Added 64 new terms across four medical specialties:
  - Dermatology (16 terms)
  - Ophthalmology (16 terms)
  - Orthopedics (16 terms)
  - Urology (16 terms)

- **Layered Difficulty Expansion**: Added 64 additional terms for existing specialties:
  - Cardiovascular (16 additional terms)
  - Respiratory (16 additional terms)
  - Neurological (16 additional terms)
  - Gastrointestinal (16 additional terms)

### 3. Implementation Status

- **Already Implemented**: 
  - Algorithm improvements (in algorithm.js)
  - Categorical expansion with 64 new terms (in data.js)
  - Proximity threshold increase

- **Pending Implementation**: 
  - Layered difficulty expansion with 64 additional terms
  - These terms are available in additional_terms.js and need to be integrated into data.js

## For the Technical Team: Next Steps

1. **Complete the Data Integration**: 
   - Open data.js
   - Locate the end of the medicalTerms array (just before the closing bracket)
   - Add a comma after the last term
   - Copy all terms from additional_terms.js and paste them at this location
   - Note: The additional_terms.js file has linter errors because it's not a complete JS file - it only contains object literals meant to be inserted into an array

2. **Testing Considerations**:
   - Run multiple iterations of puzzle generation to ensure quality
   - Test with `node index.js example` to check if the new terms are being incorporated
   - Verify that cross-specialty connections are appearing in generated puzzles

3. **Potential Future Improvements**:
   - API Integration with medical terminology databases (UMLS, SNOMED CT)
   - Creating a web interface for the puzzle generator
   - Adding specialized filters for educational contexts
   - Expanding to new medical specialties (psychiatry, obstetrics/gynecology, pediatrics)

4. **File Structure Overview**:
   - `algorithm.js`: Core puzzle generation logic and selection algorithms
   - `data.js`: Medical terms database with tags, difficulty levels, and metadata
   - `index.js`: Main entry point and CLI interface
   - `additional_terms.js`: Additional terms pending integration
   - `EXPANSION_SUMMARY.md`: Detailed explanation of the database expansion

## Customizing the Generator

You can further extend the database in `data.js` by adding:
- New medical terms with appropriate tags
- Additional connection types
- Modified difficulty scoring parameters

## Technical Requirements

- Node.js (v12 or higher)

## License

This project is licensed under the MIT License. 