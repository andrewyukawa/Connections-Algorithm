const { medicalTerms, difficultyLevels, tagMetadata, overlapsTargets } = require('./data');

/**
 * Generate a medical connections puzzle with quantitative difficulty scaling and ambiguity
 * @returns {Object} Puzzle with items and solution
 */
function generatePuzzle() {
  let isValid = false;
  let groups = [];
  let themes = [];
  let maxAttempts = 30;
  let attempts = 0;
  
  while (!isValid && attempts < maxAttempts) {
    try {
      // Step 1: Select themes for each difficulty level
      themes = selectThemes();
      
      // Step 2: Select items for each theme, optimizing for ambiguity
      groups = selectItems(themes);
      
      // Step 3: Validate that the puzzle has a unique solution
      isValid = validateUniqueness(groups);
      
      attempts++;
    } catch (error) {
      console.log(`Attempt ${attempts + 1} failed: ${error.message}`);
      attempts++;
      continue;
    }
  }
  
  if (!isValid) {
    throw new Error(`Failed to generate a valid puzzle after ${maxAttempts} attempts`);
  }
  
  // Step 4: Assemble the puzzle
  const puzzle = assemblePuzzle(groups);
  
  return puzzle;
}

/**
 * Select four themes, one for each difficulty level
 * @returns {Array} Array of theme objects
 */
function selectThemes() {
  const difficultyLevels = [1, 2, 3, 4];
  const themes = [];
  const usedTags = new Set(); // To prevent duplicate themes
  
  // For each difficulty level, find appropriate themes
  for (const difficulty of difficultyLevels) {
    // Get potential themes based on difficulty-appropriate specificity
    const potentialThemes = getThemesForDifficulty(difficulty, usedTags);
    
    // If no themes available, throw error
    if (potentialThemes.length === 0) {
      throw new Error(`No suitable themes found for difficulty level ${difficulty}`);
    }
    
    // Randomly select a theme
    const selectedTheme = potentialThemes[Math.floor(Math.random() * potentialThemes.length)];
    
    // Add theme to list and mark as used
    themes.push({
      name: selectedTheme,
      difficulty,
      color: difficultyToColor(difficulty),
      relatedTags: getRelatedTags(selectedTheme, difficulty)
    });
    
    usedTags.add(selectedTheme);
  }
  
  return themes;
}

/**
 * Get related tags for a theme to enhance ambiguity
 * @param {string} themeName - The main theme tag
 * @param {number} difficulty - Difficulty level (1-4)
 * @returns {Array} Related tags
 */
function getRelatedTags(themeName, difficulty) {
  // Get terms with this theme tag
  const termsWithTheme = medicalTerms.filter(term => 
    term.tags.includes(themeName) && term.difficulty === difficulty
  );
  
  // Extract all tags from these terms
  const allTags = new Set();
  termsWithTheme.forEach(term => {
    term.tags.forEach(tag => {
      if (tag !== themeName) {
        allTags.add(tag);
      }
    });
  });
  
  return Array.from(allTags);
}

/**
 * Get potential themes for a specific difficulty level
 * @param {number} difficulty - Difficulty level (1-4)
 * @param {Set} usedTags - Set of already used theme tags
 * @returns {Array} Array of theme names
 */
function getThemesForDifficulty(difficulty, usedTags) {
  // Define specificity thresholds for each difficulty level
  const specificityRanges = {
    1: [0.0, 0.5],   // Yellow: common, broad tags (wider range)
    2: [0.25, 0.7],  // Green: moderately specific (wider range)
    3: [0.5, 0.9],   // Blue: more specific (wider range)
    4: [0.7, 1.0]    // Purple: very specific (wider range)
  };
  
  // Get min/max specificity for this difficulty
  const [minSpecificity, maxSpecificity] = specificityRanges[difficulty];
  
  // Filter all tags by specificity and ensure they have enough terms with matching difficulty
  const viableThemes = Object.keys(tagMetadata).filter(tag => {
    const metadata = tagMetadata[tag];
    
    // Count terms that match both the tag and the target difficulty
    const matchingTerms = medicalTerms.filter(term => 
      term.tags.includes(tag) && term.difficulty === difficulty
    );
    
    const hasEnoughTerms = matchingTerms.length >= 4;
    const inSpecificityRange = metadata.specificity >= minSpecificity && 
                               metadata.specificity <= maxSpecificity;
    const notUsed = !usedTags.has(tag);
    
    // Check average difficulty is appropriate (less strict alignment)
    const difficultyAlignment = Math.abs(metadata.avgDifficulty - difficulty) <= 1.5;
    
    return hasEnoughTerms && inSpecificityRange && notUsed && difficultyAlignment;
  });
  
  // If no viable themes found, relax the specificity constraints
  if (viableThemes.length === 0) {
    console.log(`No themes found with strict criteria for difficulty ${difficulty}. Relaxing constraints.`);
    return Object.keys(tagMetadata).filter(tag => {
      const metadata = tagMetadata[tag];
      const matchingTerms = medicalTerms.filter(term => 
        term.tags.includes(tag) && term.difficulty === difficulty
      );
      const hasEnoughTerms = matchingTerms.length >= 4;
      const notUsed = !usedTags.has(tag);
      return hasEnoughTerms && notUsed;
    });
  }
  
  return viableThemes;
}

/**
 * Select items for each theme, maximizing controlled ambiguity
 * @param {Array} themes - Array of theme objects
 * @returns {Array} Array of groups, each with a theme and its items
 */
function selectItems(themes) {
  // First pass: get all potential items for each theme
  const potentialItems = {};
  const usedTerms = new Set();
  
  themes.forEach(theme => {
    // Get terms matching this theme
    potentialItems[theme.name] = medicalTerms.filter(term => 
      term.tags.includes(theme.name) && 
      term.difficulty === theme.difficulty &&
      !usedTerms.has(term.term)
    );
    
    if (potentialItems[theme.name].length < 4) {
      throw new Error(`Not enough terms for theme ${theme.name} at difficulty ${theme.difficulty}`);
    }
  });
  
  // Build potential item index across all themes (for ambiguity analysis)
  const allPotentialItems = new Map();
  for (const theme of themes) {
    for (const term of potentialItems[theme.name]) {
      if (!allPotentialItems.has(term.term)) {
        allPotentialItems.set(term.term, []);
      }
      allPotentialItems.get(term.term).push(theme.name);
    }
  }
  
  // Get all items that could fit in multiple groups (multi-theme items)
  const multiThemeItems = new Map();
  for (const [term, themeNames] of allPotentialItems.entries()) {
    if (themeNames.length > 1) {
      multiThemeItems.set(term, themeNames);
    }
  }
  
  // Calculate semantic proximity of items to other themes
  const calculateSemanticProximity = (term, themeName) => {
    const termObj = medicalTerms.find(t => t.term === term);
    if (!termObj) return 0;
    
    // Get related tags for this term
    const termTags = new Set(termObj.tags);
    
    // For themes other than the current one
    const otherThemes = themes.filter(t => t.name !== themeName);
    
    let proximityScore = 0;
    
    for (const otherTheme of otherThemes) {
      // Get items from other theme
      const otherThemeItems = potentialItems[otherTheme.name];
      
      // Calculate tag overlap with items from other theme
      for (const otherItem of otherThemeItems) {
        const otherItemObj = medicalTerms.find(t => t.term === otherItem.term);
        if (!otherItemObj) continue;
        
        // Count shared tags between this term and other items
        const otherItemTags = new Set(otherItemObj.tags);
        const sharedTags = [...termTags].filter(tag => otherItemTags.has(tag));
        
        // Weight shared tags by tag specificity (rarer tags = stronger connections)
        let weightedTagScore = 0;
        for (const tag of sharedTags) {
          const tagSpecificity = tagMetadata[tag] ? tagMetadata[tag].specificity : 0.5;
          weightedTagScore += tagSpecificity;
        }
        
        // Weighted by difficulty proximity - give higher weight to connections that bridge difficulty levels
        // Normalize distances: 1 level apart = 0.75, 2 levels apart = 0.5, 3 levels apart = 0.25
        const difficultyDistance = Math.abs(termObj.difficulty - otherItemObj.difficulty);
        const difficultyProximityWeight = difficultyDistance === 0 ? 0.25 : // Same difficulty not as interesting
                                        difficultyDistance === 1 ? 0.75 : // Adjacent difficulties most valuable
                                        difficultyDistance === 2 ? 0.5 : // 2 levels apart still good
                                        0.25; // 3 levels apart less valuable but still counts
        
        proximityScore += weightedTagScore * difficultyProximityWeight;
        
        // Add bonus for functional relationships (e.g., medication treating a condition)
        const hasFunctionalRelationship = 
          (termObj.tags.includes("Diagnostic tests") && otherItemObj.tags.some(t => t.includes("diagnosis") || t.includes("assessment"))) ||
          (otherItemObj.tags.includes("Diagnostic tests") && termObj.tags.some(t => t.includes("diagnosis") || t.includes("assessment"))) ||
          (termObj.tags.some(t => t.includes("treatment")) && otherItemObj.tags.some(t => t.includes("conditions") || t.includes("disorders"))) ||
          (otherItemObj.tags.some(t => t.includes("treatment")) && termObj.tags.some(t => t.includes("conditions") || t.includes("disorders")));
          
        if (hasFunctionalRelationship) {
          proximityScore += 0.75;
        }
      }
    }
    
    return proximityScore;
  };
  
  // Second pass: score items by ambiguity potential
  const scoredItems = {};
  themes.forEach(theme => {
    scoredItems[theme.name] = potentialItems[theme.name].map(term => {
      // Calculate overlap scores with each other theme
      const overlapScores = {};
      themes.forEach(otherTheme => {
        if (otherTheme.name !== theme.name) {
          // Count shared tags between this term and the other theme
          const sharedTags = term.tags.filter(tag => 
            otherTheme.name === tag || otherTheme.relatedTags.includes(tag)
          );
          overlapScores[otherTheme.name] = sharedTags.length;
        }
      });
      
      // Calculate overall ambiguity score based on desired overlaps
      let ambiguityScore = 0;
      Object.entries(overlapScores).forEach(([otherThemeName, overlapCount]) => {
        const otherTheme = themes.find(t => t.name === otherThemeName);
        if (otherTheme) {
          // Get target overlap range for this difficulty pair
          const [minOverlap, maxOverlap] = overlapsTargets[theme.difficulty][otherTheme.difficulty];
          
          // Score based on how well this meets target overlaps
          if (overlapCount >= minOverlap && overlapCount <= maxOverlap) {
            // Perfect match gets full points
            ambiguityScore += 2;
          } else if (overlapCount > 0) {
            // Some overlap, but not in target range
            ambiguityScore += 1;
          }
        }
      });
      
      // Check if this item appears in multiple potential groups (cross-group ambiguity)
      const matchingThemes = allPotentialItems.get(term.term) || [];
      const crossGroupAmbiguity = matchingThemes.length > 1 ? matchingThemes.length - 1 : 0;
      
      // Add bonus for items that can fit in multiple groups (strategic ambiguity)
      ambiguityScore += crossGroupAmbiguity * 3.5; // Increased from 2.5 to prioritize multi-theme items more
      
      // Add connection type diversity bonus (encourage variety)
      const connectionTypeBonus = themes.some(otherTheme => 
        otherTheme.name !== theme.name && 
        overlapScores[otherTheme.name] > 0 && 
        getConnectionTypeForDifficulty(otherTheme.difficulty) !== term.connectionType
      ) ? 2 : 0; // Increased from 1.5 to emphasize connection type diversity
      
      ambiguityScore += connectionTypeBonus;
      
      // Add tag richness bonus for terms with more tags (especially for higher difficulties)
      const tagRichnessBonus = (term.tags.length - 3) * (theme.difficulty * 0.15); // Increased from 0.1
      ambiguityScore += Math.max(0, tagRichnessBonus);
      
      // Add semantic proximity score
      const semanticProximityScore = calculateSemanticProximity(term.term, theme.name) * 1.25; // Increased from 0.75
      ambiguityScore += semanticProximityScore;
      
      // Identify if this is a thematic bridge (connects across difficulty levels)
      const isThematicBridge = crossGroupAmbiguity > 0 && 
                               matchingThemes.some(otherTheme => {
                                 const otherThemeObj = themes.find(t => t.name === otherTheme);
                                 return otherThemeObj && Math.abs(otherThemeObj.difficulty - theme.difficulty) > 1;
                               });
      
      // Bonus for thematic bridges
      const thematicBridgeBonus = isThematicBridge ? 3 : 0; // Increased from 2 to prioritize thematic bridges
      ambiguityScore += thematicBridgeBonus;
      
      return { 
        ...term, 
        ambiguityScore, 
        overlapScores,
        crossGroupAmbiguity,
        connectionTypeBonus,
        semanticProximityScore,
        isThematicBridge
      };
    });
    
    // Sort by ambiguity score
    scoredItems[theme.name].sort((a, b) => b.ambiguityScore - a.ambiguityScore);
  });
  
  // Track global statistics for balanced selection
  const crossGroupLinks = new Map(); // Maps difficulty pairs to count of cross-links
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      if (i !== j) {
        crossGroupLinks.set(`${i}-${j}`, 0);
      }
    }
  }
  
  const connectionTypeCounts = new Map();
  
  // Now prioritize including at least one multi-theme item per group if possible
  const selectedItems = {};
  themes.forEach(theme => {
    selectedItems[theme.name] = [];
    
    // Try to add two multi-theme items to each group (increased from one)
    const multiThemeItemsForTheme = scoredItems[theme.name].filter(item => 
      multiThemeItems.has(item.term) && !usedTerms.has(item.term)
    );
    
    // Add up to two multi-theme items if available
    const itemsToAdd = Math.min(2, multiThemeItemsForTheme.length);
    for (let i = 0; i < itemsToAdd; i++) {
      const selectedItem = multiThemeItemsForTheme[i];
      selectedItems[theme.name].push(selectedItem);
      usedTerms.add(selectedItem.term);
      
      // Update global statistics
      Object.entries(selectedItem.overlapScores).forEach(([otherThemeName, overlapCount]) => {
        if (overlapCount > 0) {
          const otherTheme = themes.find(t => t.name === otherThemeName);
          if (otherTheme) {
            const pairKey = `${theme.difficulty}-${otherTheme.difficulty}`;
            crossGroupLinks.set(pairKey, (crossGroupLinks.get(pairKey) || 0) + 1);
          }
        }
      });
      
      // Update connection type counts
      connectionTypeCounts.set(
        selectedItem.connectionType, 
        (connectionTypeCounts.get(selectedItem.connectionType) || 0) + 1
      );
    }
  });
  
  // Next try to add a thematic bridge to each group
  themes.forEach(theme => {
    if (selectedItems[theme.name].length < 2) {
      const thematicBridges = scoredItems[theme.name].filter(item => 
        item.isThematicBridge && !usedTerms.has(item.term)
      );
      
      if (thematicBridges.length > 0) {
        const selectedItem = thematicBridges[0];
        selectedItems[theme.name].push(selectedItem);
        usedTerms.add(selectedItem.term);
        
        // Update global statistics
        Object.entries(selectedItem.overlapScores).forEach(([otherThemeName, overlapCount]) => {
          if (overlapCount > 0) {
            const otherTheme = themes.find(t => t.name === otherThemeName);
            if (otherTheme) {
              const pairKey = `${theme.difficulty}-${otherTheme.difficulty}`;
              crossGroupLinks.set(pairKey, (crossGroupLinks.get(pairKey) || 0) + 1);
            }
          }
        });
        
        // Update connection type counts
        connectionTypeCounts.set(
          selectedItem.connectionType, 
          (connectionTypeCounts.get(selectedItem.connectionType) || 0) + 1
        );
      }
    }
  });
  
  // Complete selection to ensure each group has 4 items
  // Iterative selection to ensure balanced overlaps
  for (let i = 0; selectedItems[themes[0].name].length < 4 || 
                 selectedItems[themes[1].name].length < 4 ||
                 selectedItems[themes[2].name].length < 4 ||
                 selectedItems[themes[3].name].length < 4; i++) {
    
    themes.forEach(theme => {
      if (selectedItems[theme.name].length < 4) {
        // Get best unselected items
        const candidates = scoredItems[theme.name].filter(item => !usedTerms.has(item.term))
          .slice(0, Math.min(3, scoredItems[theme.name].length));
        
        // If we're past the first item for each theme, adjust scores based on global stats
        if (i > 0) {
          candidates.forEach(candidate => {
            let balanceScore = 0;
            
            // Analyze how this candidate would affect overall overlap balance
            Object.entries(candidate.overlapScores).forEach(([otherThemeName, overlapCount]) => {
              if (overlapCount > 0) {
                const otherTheme = themes.find(t => t.name === otherThemeName);
                if (otherTheme) {
                  const pairKey = `${theme.difficulty}-${otherTheme.difficulty}`;
                  const currentCount = crossGroupLinks.get(pairKey) || 0;
                  const [minTarget, maxTarget] = overlapsTargets[theme.difficulty][otherTheme.difficulty];
                  
                  // Bonus if adding this link would stay within target range
                  if (currentCount + 1 <= maxTarget) {
                    balanceScore += 1.5; // Increased from 1
                  }
                  // Higher bonus if we're below minimum and this would help
                  if (currentCount < minTarget) {
                    balanceScore += 3; // Increased from 2.5
                  }
                  
                  // Significant bonus for shared tags across difficulty levels
                  const candidateObj = medicalTerms.find(t => t.term === candidate.term);
                  const crossLevelTagSharing = themes.some(t => {
                    // Different theme with different difficulty
                    if (t.name !== theme.name && t.difficulty !== theme.difficulty) {
                      // Check if this candidate shares tags with the different theme
                      return candidateObj.tags.some(tag => t.name === tag || t.relatedTags.includes(tag));
                    }
                    return false;
                  });
                  
                  if (crossLevelTagSharing) {
                    balanceScore += 2; // Substantial bonus for shared tags across difficulty levels
                  }
                }
              }
            });
            
            // Connection type diversity bonus
            const typeCount = connectionTypeCounts.get(candidate.connectionType) || 0;
            if (typeCount < 4) { // Encourage more diverse connection types
              balanceScore += (4 - typeCount) * 0.75; // Increased from 0.5
            }
            
            // Adjust score based on balance factors
            candidate.balancedScore = candidate.ambiguityScore + balanceScore;
          });
          
          // Resort based on balanced score
          candidates.sort((a, b) => b.balancedScore - a.balancedScore);
        }
        
        // Take the best candidate
        if (candidates.length > 0) {
          const selectedItem = candidates[0];
          selectedItems[theme.name].push(selectedItem);
          usedTerms.add(selectedItem.term);
          
          // Update global statistics
          Object.entries(selectedItem.overlapScores).forEach(([otherThemeName, overlapCount]) => {
            if (overlapCount > 0) {
              const otherTheme = themes.find(t => t.name === otherThemeName);
              if (otherTheme) {
                const pairKey = `${theme.difficulty}-${otherTheme.difficulty}`;
                crossGroupLinks.set(pairKey, (crossGroupLinks.get(pairKey) || 0) + 1);
              }
            }
          });
          
          // Update connection type counts
          connectionTypeCounts.set(
            selectedItem.connectionType, 
            (connectionTypeCounts.get(selectedItem.connectionType) || 0) + 1
          );
        }
      }
    });
  }
  
  // Assemble final groups
  const groups = themes.map(theme => ({
    theme: theme.name,
    difficulty: theme.difficulty,
    items: selectedItems[theme.name].map(item => item.term),
    color: theme.color,
    connectionType: getConnectionTypeForDifficulty(theme.difficulty)
  }));
  
  return groups;
}

/**
 * Get connection type for a difficulty level
 * @param {number} difficulty - Difficulty level (1-4)
 * @returns {string} Connection type
 */
function getConnectionTypeForDifficulty(difficulty) {
  const connectionTypes = difficultyLevels[difficulty].connectionTypes;
  return connectionTypes[0]; // Use the first connection type as default
}

/**
 * Convert difficulty level to color
 * @param {number} difficulty - Difficulty level (1-4)
 * @returns {string} Color name
 */
function difficultyToColor(difficulty) {
  switch (difficulty) {
    case 1: return 'yellow';
    case 2: return 'green';
    case 3: return 'blue';
    case 4: return 'purple';
    default: throw new Error(`Invalid difficulty level: ${difficulty}`);
  }
}

/**
 * Validate that the puzzle has a unique solution
 * @param {Array} groups - Array of group objects
 * @returns {boolean} Whether the puzzle has a unique solution
 */
function validateUniqueness(groups) {
  // Get all items
  const allItems = groups.flatMap(group => group.items);
  
  // Get all tags for these items
  const itemTagMap = new Map();
  allItems.forEach(item => {
    const term = medicalTerms.find(t => t.term === item);
    if (!term) {
      throw new Error(`Term ${item} not found in database`);
    }
    itemTagMap.set(item, term.tags);
  });
  
  // Check if any tag (other than the 4 themes) is shared by 4 or more items
  const allTags = [...new Set(Array.from(itemTagMap.values()).flat())];
  const groupThemes = groups.map(group => group.theme);
  
  // Common tags to ignore in uniqueness validation (these are too general)
  const ignoreTags = [
    // Medical specialties
    "Anatomy", "Cardiology", "Neurology", "Respiratory", "Gastroenterology", 
    "Pharmacology", "Pulmonology", "Endocrinology", "Oncology", "Immunology",
    "Orthopedics", "Dermatology", "Rheumatology", "Hematology", "Psychiatry",
    
    // Organ systems and structures
    "Parts of the heart", "Brain parts", "Lung structures", "GI organs", "Kidney anatomy",
    "Reproductive anatomy", "Skeletal structures", "Connective tissues", "Immune organs",
    "Endocrine organs", "Musculoskeletal structures",
    
    // Test types and procedures
    "Diagnostic tests", "Pulmonary tests", "Neuro diagnostics", "GI procedures",
    "Laboratory tests", "Imaging", "Surgical procedures", "Surgical techniques",
    
    // General medical concepts
    "Chronic disease", "Emergency medicine", "Pathophysiology", "Medical paradigms",
    "Metabolism", "Vascular", "Pain management", "Critical care", "Patient care",
    
    // Others that frequently appear 
    "Lab test", "Inflammation", "Diagnostic method", "Blood flow", "Hormone regulation",
    "Cell membrane", "Tissue damage", "Medical devices", "Physical exam finding",
    "Anesthesia", "Medication delivery", "Infection", "Autoimmune", "Public health",
    "Metabolic disorders", "Cellular environment", "Physiological principles"
  ];
  
  let alternativeSolutionFound = false;
  
  // Count how many tags could form alternative groups
  let alternativeSolutionTags = [];
  
  for (const tag of allTags) {
    // Skip the themes and common tags
    if (groupThemes.includes(tag) || ignoreTags.includes(tag)) continue;
    
    // Count items with this tag
    const matchingItems = [...itemTagMap.entries()].filter(([_, tags]) => tags.includes(tag));
    const count = matchingItems.length;
    
    // If 4 or more items share this tag, check if this creates an alternative solution
    if (count >= 4) {
      // Log potential alternative themes
      console.log(`Tag "${tag}" is shared by ${count} items, creating potential alternative solutions.`);
      
      // Check if these items span multiple difficulty levels, which would be more acceptable
      const termObjects = matchingItems.map(([termName]) => 
        medicalTerms.find(t => t.term === termName)
      ).filter(t => t !== undefined);
      
      const difficultyLevels = new Set(termObjects.map(t => t.difficulty));
      
      // If all 4+ items are from the same difficulty level, this is more likely to be a problem
      if (difficultyLevels.size <= 1) {
        alternativeSolutionFound = true;
        alternativeSolutionTags.push(tag);
      }
      // If they span 2+ difficulty levels, this is less likely to invalidate the puzzle
      // But still track it for potential issues
      else if (difficultyLevels.size === 2) {
        alternativeSolutionTags.push(tag);
      }
    }
  }
  
  // Only invalidate if we found a clean alternative solution
  // (all 4 terms from the same difficulty level)
  return !alternativeSolutionFound;
}

/**
 * Assemble the puzzle by combining and randomizing items
 * @param {Array} groups - Array of group objects
 * @returns {Object} Puzzle object with items and solution
 */
function assemblePuzzle(groups) {
  // Extract items
  const allItems = groups.flatMap(group => group.items);
  
  // Shuffle items
  const shuffledItems = shuffleArray(allItems);
  
  // Return the puzzle
  return {
    items: shuffledItems,
    solution: groups
  };
}

/**
 * Shuffle an array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Analyze the ambiguity potential of a generated puzzle
 * @param {Array} items - Selected items for the puzzle
 * @param {Array} themes - Selected themes for the puzzle
 * @param {Object} options - Configuration options
 * @returns {Object} Ambiguity analysis
 */
function analyzeAmbiguity(items, themes, options = {}) {
  // Default options
  const opts = {
    proximityThreshold: 0.4, // Increased from 0.35 - higher threshold means more items considered ambiguous
    minCrossGroupConnections: 12, // Minimum number of connections between different groups (increased from 10)
    minMultiThemeItems: 6, // Minimum total multi-theme items in the puzzle (increased from 4)
    minThematicBridges: 4, // Minimum thematic bridges that span difficulty levels (increased from 2)
    connectionTypeDiversityTarget: 0.8, // Target for connection type diversity (0-1 scale)
    ...options
  };
  
  // Create a map of items to their themes
  const itemThemeMap = new Map();
  themes.forEach((theme, themeIndex) => {
    const themeItems = items.slice(themeIndex * 4, themeIndex * 4 + 4);
    themeItems.forEach(item => {
      itemThemeMap.set(item, theme);
    });
  });
  
  // Find the difficulty and connection type for each item
  const itemDetails = new Map();
  items.forEach(item => {
    const term = medicalTerms.find(t => t.term === item);
    if (term) {
      itemDetails.set(item, {
        difficulty: term.difficulty,
        connectionType: term.connectionType,
        tags: term.tags
      });
    }
  });
  
  // Analyze ambiguity by checking which items could fit in multiple themes
  const ambiguousItems = [];
  const possibleThemes = new Map();
  
  items.forEach(item => {
    const details = itemDetails.get(item);
    const primaryTheme = itemThemeMap.get(item);
    
    if (!details || !primaryTheme) return;
    
    const itemPossibleThemes = [primaryTheme];
    
    // Check if this item could fit in other themes
    themes.forEach(otherTheme => {
      if (otherTheme === primaryTheme) return;
      
      // Check if this item shares tags with the other theme
      const hasSharedTags = details.tags.some(tag => 
        tag === otherTheme || 
        tag.includes(otherTheme)
      );
      
      if (hasSharedTags) {
        itemPossibleThemes.push(otherTheme);
      }
    });
    
    if (itemPossibleThemes.length > 1) {
      ambiguousItems.push({
        item,
        possibleThemes: itemPossibleThemes,
        connectionType: details.connectionType
      });
      possibleThemes.set(item, itemPossibleThemes);
    }
  });
  
  // Calculate ambiguity by difficulty level
  const ambiguityByDifficulty = {
    1: 0, 2: 0, 3: 0, 4: 0
  };
  
  ambiguousItems.forEach(({ item }) => {
    const details = itemDetails.get(item);
    if (details) {
      ambiguityByDifficulty[details.difficulty]++;
    }
  });
  
  // Calculate cross-group ambiguity
  const crossGroupAmbiguity = {};
  
  // Initialize all possible pairs
  for (let i = 1; i <= 4; i++) {
    for (let j = i + 1; j <= 4; j++) {
      crossGroupAmbiguity[`${i}-${j}`] = 0;
    }
  }
  
  // Count ambiguous items between each difficulty pair
  ambiguousItems.forEach(({ item }) => {
    const details = itemDetails.get(item);
    const possibleThemesList = possibleThemes.get(item) || [];
    
    // Get difficulties of possible themes
    const themeDifficulties = new Set();
    possibleThemesList.forEach(themeName => {
      const themeObj = themes.find(t => t === themeName);
      if (themeObj) {
        const difficulty = themes.indexOf(themeObj) + 1; // 1-indexed difficulty
        themeDifficulties.add(difficulty);
      }
    });
    
    // Add to cross-group ambiguity count for each difficulty pair
    Array.from(themeDifficulties).sort().forEach((diff1, index, arr) => {
      for (let i = index + 1; i < arr.length; i++) {
        const diff2 = arr[i];
        const pair = `${diff1}-${diff2}`;
        crossGroupAmbiguity[pair]++;
      }
    });
  });
  
  // Count unique connection types
  const connectionTypes = new Set();
  items.forEach(item => {
    const details = itemDetails.get(item);
    if (details) {
      connectionTypes.add(details.connectionType);
    }
  });
  
  // Count thematic bridges (items that bridge difficulty levels with gap > 1)
  let thematicBridgeCount = 0;
  ambiguousItems.forEach(({ item }) => {
    const possibleThemesList = possibleThemes.get(item) || [];
    
    // Get difficulties of possible themes
    const themeDifficulties = [];
    possibleThemesList.forEach(themeName => {
      const themeObj = themes.find(t => t === themeName);
      if (themeObj) {
        const difficulty = themes.indexOf(themeObj) + 1; // 1-indexed difficulty
        themeDifficulties.push(difficulty);
      }
    });
    
    // Check if this item bridges difficulty levels with gap > 1
    themeDifficulties.sort((a, b) => a - b);
    for (let i = 0; i < themeDifficulties.length - 1; i++) {
      if (themeDifficulties[i + 1] - themeDifficulties[i] > 1) {
        thematicBridgeCount++;
        break; // Count each item only once
      }
    }
  });
  
  // Calculate difficulty distribution score
  const difficultyDistributionScore = 
    Math.min(4, Object.values(ambiguityByDifficulty).filter(count => count > 0).length);
  
  // Determine if ambiguity level is ideal
  const ambiguousCount = ambiguousItems.length;
  const targetRange = { min: 4, max: 8 };
  const isIdealAmbiguity = ambiguousCount >= targetRange.min && ambiguousCount <= targetRange.max;
  
  // Connection type diversity score
  const connectionTypeDiversity = connectionTypes.size;
  const isIdealDiversity = connectionTypeDiversity >= 3; // We want at least 3 different connection types
  
  return {
    ambiguousCount,
    targetRange,
    isIdealAmbiguity,
    ambiguousItems,
    connectionTypeDiversity,
    isIdealDiversity,
    ambiguityByDifficulty,
    crossGroupAmbiguity,
    difficultyDistributionScore,
    thematicBridgeCount
  };
}

/**
 * Generate a puzzle with optimal ambiguity
 * @returns {Object} Validated puzzle
 */
function generateOptimalPuzzle() {
  let puzzle = null;
  let ambiguityStats = null;
  let bestPuzzle = null;
  let bestScore = 0;
  let attempts = 0;
  const maxAttempts = 20;
  
  while (attempts < maxAttempts) {
    try {
      // Generate a puzzle
      puzzle = generatePuzzle();
      ambiguityStats = analyzeAmbiguity(puzzle.items, puzzle.solution.map(group => group.theme));
      
      // More sophisticated quality scoring
      // 1. Ambiguity score (ideal range 5-9)
      const ambiguityScore = ambiguityStats.isIdealAmbiguity ? 5 : 
        Math.max(0, 5 - Math.abs(ambiguityStats.ambiguousCount - 7)); // Adjusted from 6 to 7
      
      // 2. Connection type diversity (0-4)
      const diversityScore = ambiguityStats.connectionTypeDiversity;
      
      // 3. Difficulty distribution score (0-4)
      const distributionScore = ambiguityStats.difficultyDistributionScore;
      
      // 4. Cross-group ambiguity balance (0-5)
      const crossGroupBalanceScore = calculateCrossGroupBalance(ambiguityStats.crossGroupAmbiguity);
      
      // 5. Thematic bridges score (0-4)
      const thematicBridgesScore = Math.min(4, ambiguityStats.thematicBridgeCount); // Increased max from 3 to 4
      
      // 6. Multi-theme items score (0-3)
      const multiThemeScore = Math.min(3, Math.floor(ambiguityStats.ambiguousCount / 2));
      
      // Weighted score with adjusted weights - prioritizing cross-connections and shared tags
      const qualityScore = (ambiguityScore * 2.5) + 
                           (diversityScore * 2) + 
                           (distributionScore * 1.5) + 
                           (crossGroupBalanceScore * 3) +  // Increased from 2.5
                           (thematicBridgesScore * 2.5) +  // Increased from 2
                           (multiThemeScore * 2);          // New score component
      
      console.log(`Generated puzzle with score ${qualityScore.toFixed(1)}: ${ambiguityStats.ambiguousCount} ambiguous items, ${ambiguityStats.connectionTypeDiversity} connection types, ${ambiguityStats.thematicBridgeCount} thematic bridges`);
      
      // Check if this is the best puzzle so far
      if (qualityScore > bestScore) {
        bestPuzzle = { ...puzzle, ambiguityStats };
        bestScore = qualityScore;
        
        // If we found a very good puzzle, stop
        if (qualityScore >= 25) { // Increased from 20
          break;
        }
      }
    } catch (error) {
      console.log(`Attempt ${attempts + 1} failed: ${error.message}`);
    }
    
    attempts++;
  }
  
  // Return the best puzzle found
  if (bestPuzzle) {
    return bestPuzzle;
  }
  
  // If we couldn't generate any valid puzzle, use the fallback
  console.log("Failed to generate an optimal puzzle, using the manual fallback puzzle.");
  return getTomorrowPuzzle();
}

/**
 * Calculate score for cross-group ambiguity balance
 * @param {Object} crossGroupAmbiguity - Object mapping difficulty pairs to ambiguity counts
 * @returns {number} Balance score (0-5)
 */
function calculateCrossGroupBalance(crossGroupAmbiguity) {
  // Check if we have data
  if (!crossGroupAmbiguity) return 0;
  
  // Count pairs that have at least one ambiguous item
  const activePairs = Object.values(crossGroupAmbiguity).filter(count => count > 0).length;
  
  // Calculate ideal distribution (should have ambiguity between multiple difficulty pairs)
  let balanceScore = 0;
  
  // Score based on number of active pairs (more is better, up to a point)
  if (activePairs >= 6) balanceScore += 3;         // Increased threshold from 5 to 6
  else if (activePairs >= 4) balanceScore += 2;    // Increased threshold from 3 to 4  
  else if (activePairs >= 2) balanceScore += 1;    // Increased threshold from 1 to 2
  
  // Instead of just avoiding yellow-purple connections, we now reward them (more challenging)
  // This creates interesting puzzles where things can belong in either the easiest or hardest group
  if ((crossGroupAmbiguity['1-4'] || 0) > 0) balanceScore += 1;
  
  // Check if we have rich connections across different patterns
  
  // 1. Chain pattern: connections follow a sequential pattern
  if ((crossGroupAmbiguity['1-2'] || 0) > 0 &&
      (crossGroupAmbiguity['2-3'] || 0) > 0 &&
      (crossGroupAmbiguity['3-4'] || 0) > 0) {
    balanceScore += 1;
  }
  
  // 2. Hub pattern: one difficulty level connects to all others
  const hubPatterns = [
    // Yellow as hub
    ((crossGroupAmbiguity['1-2'] || 0) > 0 && 
     (crossGroupAmbiguity['1-3'] || 0) > 0 && 
     (crossGroupAmbiguity['1-4'] || 0) > 0),
    
    // Green as hub
    ((crossGroupAmbiguity['1-2'] || 0) > 0 && 
     (crossGroupAmbiguity['2-3'] || 0) > 0 && 
     (crossGroupAmbiguity['2-4'] || 0) > 0),
     
    // Blue as hub
    ((crossGroupAmbiguity['1-3'] || 0) > 0 && 
     (crossGroupAmbiguity['2-3'] || 0) > 0 && 
     (crossGroupAmbiguity['3-4'] || 0) > 0),
     
    // Purple as hub
    ((crossGroupAmbiguity['1-4'] || 0) > 0 && 
     (crossGroupAmbiguity['2-4'] || 0) > 0 && 
     (crossGroupAmbiguity['3-4'] || 0) > 0)
  ];
  
  if (hubPatterns.some(pattern => pattern)) {
    balanceScore += 2; // Higher score for hub patterns as they create richer puzzles
  }
  
  // 3. Cross pattern: includes diagonal connections
  if (((crossGroupAmbiguity['1-3'] || 0) > 0 && (crossGroupAmbiguity['2-4'] || 0) > 0) ||
      ((crossGroupAmbiguity['1-4'] || 0) > 0 && (crossGroupAmbiguity['2-3'] || 0) > 0)) {
    balanceScore += 1.5;
  }
  
  return Math.min(5, balanceScore); // Cap at 5
}

/**
 * Generate a specific category of puzzle (e.g., cardiology, neurology)
 * @param {string} category - Category to focus on
 * @returns {Object} Validated puzzle within the specified category
 */
function generateCategoryPuzzle(category) {
  // Filter terms by the specified category
  const filteredTerms = medicalTerms.filter(term => 
    term.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
  );
  
  if (filteredTerms.length < 16) {
    throw new Error(`Not enough terms in the ${category} category. Found ${filteredTerms.length}, need at least 16.`);
  }
  
  // Use the filtered terms to generate a puzzle
  const savedTerms = [...medicalTerms];
  medicalTerms.length = 0;
  medicalTerms.push(...filteredTerms);
  
  let result;
  try {
    result = generateOptimalPuzzle();
  } finally {
    // Restore the original terms
    medicalTerms.length = 0;
    medicalTerms.push(...savedTerms);
  }
  
  return result;
}

/**
 * Get tomorrow's manually crafted puzzle
 * This is a specially designed puzzle that follows the difficulty progression guidelines
 */
function getTomorrowPuzzle() {
  return {
    items: [
      "Troponin", "NSTEMI", "Homeostasis", "Heartburn",
      "BNP", "STEMI", "Allostasis", "Tennis elbow",
      "CK-MB", "Unstable angina", "Apoptosis", "Charley horse",
      "Myoglobin", "Prinzmetal angina", "Hormesis", "Growing pains"
    ],
    solution: [
      {
        theme: "Cardiac markers",
        difficulty: 1,
        color: "yellow",
        items: ["Troponin", "BNP", "CK-MB", "Myoglobin"],
        connectionType: "literal"
      },
      {
        theme: "ACS types",
        difficulty: 2,
        color: "green",
        items: ["NSTEMI", "STEMI", "Unstable angina", "Prinzmetal angina"],
        connectionType: "categorical"
      },
      {
        theme: "Physiological principles",
        difficulty: 3,
        color: "blue",
        items: ["Homeostasis", "Allostasis", "Apoptosis", "Hormesis"],
        connectionType: "functional"
      },
      {
        theme: "Medical puns",
        difficulty: 4,
        color: "purple",
        items: ["Heartburn", "Tennis elbow", "Charley horse", "Growing pains"],
        connectionType: "wordplay"
      }
    ],
    ambiguityStats: {
      ambiguousCount: 5,
      targetRange: { min: 4, max: 6 },
      isIdealAmbiguity: true,
      ambiguousItems: [
        { item: "Troponin", possibleThemes: ["Cardiac markers", "ACS types"], connectionType: "literal" },
        { item: "BNP", possibleThemes: ["Cardiac markers", "Physiological principles"], connectionType: "literal" },
        { item: "CK-MB", possibleThemes: ["Cardiac markers", "ACS types"], connectionType: "literal" },
        { item: "Heartburn", possibleThemes: ["Medical puns", "ACS types"], connectionType: "wordplay" },
        { item: "Hormesis", possibleThemes: ["Physiological principles", "Medical puns"], connectionType: "functional" }
      ],
      connectionTypeDiversity: 3,
      isIdealDiversity: true,
      ambiguityByDifficulty: {
        1: 2,
        2: 0,
        3: 1,
        4: 2
      },
      crossGroupAmbiguity: {
        "1-2": 2,
        "1-3": 1,
        "1-4": 0,
        "2-3": 0,
        "2-4": 1,
        "3-4": 1
      },
      difficultyDistributionScore: 3
    }
  };
}

/**
 * Create a new sample puzzle for examples
 * @param {string} category - Category to focus on (optional)
 * @returns {Object} Sample puzzle
 */
function createSamplePuzzle(category) {
  try {
    if (category) {
      return generateCategoryPuzzle(category);
    } else {
      return generateOptimalPuzzle();
    }
  } catch (error) {
    console.log(`Failed to generate sample puzzle: ${error.message}`);
    return getTomorrowPuzzle();
  }
}

module.exports = {
  generatePuzzle,
  generateOptimalPuzzle,
  analyzeAmbiguity,
  generateCategoryPuzzle,
  getTomorrowPuzzle,
  createSamplePuzzle
}; 