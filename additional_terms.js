// LAYERED DIFFICULTY EXPANSION - ADDITIONAL TERMS FOR EXISTING CATEGORIES
// To use: Copy and paste these terms into data.js just before the closing bracket of the medicalTerms array

// Additional Cardiovascular terms
{ term: "Papillary muscle", tags: ["Parts of the heart", "Cardiology", "Anatomy", "Valve function"], difficulty: 1, connectionType: "literal" },
{ term: "Purkinje fibers", tags: ["Parts of the heart", "Cardiology", "Anatomy", "Conduction system"], difficulty: 1, connectionType: "literal" },
{ term: "Endocardium", tags: ["Heart layers", "Cardiology", "Anatomy", "Inner lining"], difficulty: 1, connectionType: "literal" },
{ term: "Coronary sinus", tags: ["Blood vessels", "Cardiology", "Anatomy", "Venous drainage"], difficulty: 1, connectionType: "literal" },

{ term: "Calcium channel blockers", tags: ["Cardiovascular drugs", "Pharmacology", "Hypertension treatment", "Angina treatment"], difficulty: 2, connectionType: "categorical" },
{ term: "Antiarrhythmics", tags: ["Cardiovascular drugs", "Pharmacology", "Rhythm control", "Electrophysiology"], difficulty: 2, connectionType: "categorical" },
{ term: "Nitrates", tags: ["Cardiovascular drugs", "Pharmacology", "Angina treatment", "Vasodilation"], difficulty: 2, connectionType: "categorical" },
{ term: "Antiplatelet agents", tags: ["Cardiovascular drugs", "Pharmacology", "Stroke prevention", "Clot formation"], difficulty: 2, connectionType: "categorical" },

{ term: "Cardiac catheterization", tags: ["Diagnostic tests", "Cardiology", "Invasive procedure", "Coronary assessment"], difficulty: 3, connectionType: "functional" },
{ term: "Nuclear stress test", tags: ["Diagnostic tests", "Cardiology", "Perfusion imaging", "Ischemia detection"], difficulty: 3, connectionType: "functional" },
{ term: "Holter monitor", tags: ["Diagnostic tests", "Cardiology", "Rhythm monitoring", "Ambulatory ECG"], difficulty: 3, connectionType: "functional" },
{ term: "Tilt table test", tags: ["Diagnostic tests", "Cardiology", "Syncope evaluation", "Orthostatic assessment"], difficulty: 3, connectionType: "functional" },

{ term: "Cardiomyopathy", tags: ["Heart conditions", "Cardiology", "Muscle dysfunction", "Heart failure cause"], difficulty: 4, connectionType: "conceptual" },
{ term: "Endocarditis", tags: ["Heart conditions", "Cardiology", "Infection", "Valve damage"], difficulty: 4, connectionType: "conceptual" },
{ term: "Pericarditis", tags: ["Heart conditions", "Cardiology", "Inflammation", "Chest pain"], difficulty: 4, connectionType: "conceptual" },
{ term: "Cardiac tamponade", tags: ["Heart conditions", "Cardiology", "Emergency medicine", "Fluid compression"], difficulty: 4, connectionType: "conceptual" },

// Additional Respiratory terms
{ term: "Cilia", tags: ["Lung structures", "Respiratory", "Anatomy", "Mucociliary clearance"], difficulty: 1, connectionType: "literal" },
{ term: "Hilum", tags: ["Lung structures", "Respiratory", "Anatomy", "Vascular entry"], difficulty: 1, connectionType: "literal" },
{ term: "Trachea", tags: ["Airway structures", "Respiratory", "Anatomy", "Windpipe"], difficulty: 1, connectionType: "literal" },
{ term: "Surfactant", tags: ["Lung components", "Respiratory", "Anatomy", "Surface tension"], difficulty: 1, connectionType: "literal" },

{ term: "Leukotriene modifiers", tags: ["Respiratory medications", "Pharmacology", "Asthma treatment", "Anti-inflammatory"], difficulty: 2, connectionType: "categorical" },
{ term: "Xanthines", tags: ["Respiratory medications", "Pharmacology", "Bronchodilation", "COPD treatment"], difficulty: 2, connectionType: "categorical" },
{ term: "Oxygen therapy", tags: ["Respiratory treatments", "Pharmacology", "Hypoxemia", "Supportive care"], difficulty: 2, connectionType: "categorical" },
{ term: "Decongestants", tags: ["Respiratory medications", "Pharmacology", "Sinusitis treatment", "Nasal congestion"], difficulty: 2, connectionType: "categorical" },

{ term: "Polysomnography", tags: ["Pulmonary tests", "Respiratory", "Sleep studies", "Apnea diagnosis"], difficulty: 3, connectionType: "functional" },
{ term: "Thoracocentesis", tags: ["Pulmonary procedures", "Respiratory", "Fluid removal", "Pleural effusion"], difficulty: 3, connectionType: "functional" },
{ term: "Pulmonary function tests", tags: ["Pulmonary tests", "Respiratory", "Lung volumes", "Flow assessment"], difficulty: 3, connectionType: "functional" },
{ term: "Methacholine challenge", tags: ["Pulmonary tests", "Respiratory", "Bronchial hyperreactivity", "Asthma diagnosis"], difficulty: 3, connectionType: "functional" },

{ term: "Cystic fibrosis", tags: ["Respiratory conditions", "Pulmonology", "Genetic disease", "Mucus production"], difficulty: 4, connectionType: "conceptual" },
{ term: "Sarcoidosis", tags: ["Respiratory conditions", "Pulmonology", "Granulomatous disease", "Multi-system"], difficulty: 4, connectionType: "conceptual" },
{ term: "Interstitial lung disease", tags: ["Respiratory conditions", "Pulmonology", "Fibrosis", "Restrictive disease"], difficulty: 4, connectionType: "conceptual" },
{ term: "Obstructive sleep apnea", tags: ["Respiratory conditions", "Pulmonology", "Sleep medicine", "Airway obstruction"], difficulty: 4, connectionType: "conceptual" },

// Additional Neurological terms
{ term: "Thalamus", tags: ["Brain parts", "Neurology", "Anatomy", "Sensory relay"], difficulty: 1, connectionType: "literal" },
{ term: "Corpus callosum", tags: ["Brain parts", "Neurology", "Anatomy", "Hemisphere connection"], difficulty: 1, connectionType: "literal" },
{ term: "Substantia nigra", tags: ["Brain parts", "Neurology", "Anatomy", "Dopamine production"], difficulty: 1, connectionType: "literal" },
{ term: "Ventricles", tags: ["Brain parts", "Neurology", "Anatomy", "CSF circulation"], difficulty: 1, connectionType: "literal" },

{ term: "Antipsychotics", tags: ["Neurological drugs", "Pharmacology", "Schizophrenia treatment", "Dopamine blockade"], difficulty: 2, connectionType: "categorical" },
{ term: "Benzodiazepines", tags: ["Neurological drugs", "Pharmacology", "Anxiety treatment", "GABA enhancement"], difficulty: 2, connectionType: "categorical" },
{ term: "NMDA antagonists", tags: ["Neurological drugs", "Pharmacology", "Neuropathic pain", "Glutamate modulation"], difficulty: 2, connectionType: "categorical" },
{ term: "Dopamine agonists", tags: ["Neurological drugs", "Pharmacology", "Parkinson's treatment", "Movement disorders"], difficulty: 2, connectionType: "categorical" },

{ term: "Transcranial Doppler", tags: ["Neuro diagnostics", "Neurology", "Blood flow", "Stroke assessment"], difficulty: 3, connectionType: "functional" },
{ term: "SPECT scan", tags: ["Neuro diagnostics", "Neurology", "Perfusion imaging", "Dementia assessment"], difficulty: 3, connectionType: "functional" },
{ term: "Evoked potentials", tags: ["Neuro diagnostics", "Neurology", "Pathway assessment", "MS diagnosis"], difficulty: 3, connectionType: "functional" },
{ term: "Neuropsychological testing", tags: ["Neuro diagnostics", "Neurology", "Cognitive assessment", "Dementia evaluation"], difficulty: 3, connectionType: "functional" },

{ term: "Huntington's disease", tags: ["Neurological disorders", "Neurology", "Genetic", "Movement disorder"], difficulty: 4, connectionType: "conceptual" },
{ term: "Amyotrophic lateral sclerosis", tags: ["Neurological disorders", "Neurology", "Motor neurons", "Progressive weakness"], difficulty: 4, connectionType: "conceptual" },
{ term: "Guillain-Barré syndrome", tags: ["Neurological disorders", "Neurology", "Autoimmune", "Ascending paralysis"], difficulty: 4, connectionType: "conceptual" },
{ term: "Myasthenia gravis", tags: ["Neurological disorders", "Neurology", "Autoimmune", "Neuromuscular junction"], difficulty: 4, connectionType: "conceptual" },

// Additional Gastrointestinal terms
{ term: "Duodenum", tags: ["GI organs", "Gastroenterology", "Anatomy", "Small intestine"], difficulty: 1, connectionType: "literal" },
{ term: "Gallbladder", tags: ["GI organs", "Gastroenterology", "Anatomy", "Bile storage"], difficulty: 1, connectionType: "literal" },
{ term: "Appendix", tags: ["GI organs", "Gastroenterology", "Anatomy", "Lymphoid tissue"], difficulty: 1, connectionType: "literal" },
{ term: "Sphincter of Oddi", tags: ["GI organs", "Gastroenterology", "Anatomy", "Bile flow"], difficulty: 1, connectionType: "literal" },

{ term: "H2 blockers", tags: ["GI medications", "Pharmacology", "Acid reduction", "GERD treatment"], difficulty: 2, connectionType: "categorical" },
{ term: "Prokinetics", tags: ["GI medications", "Pharmacology", "Motility enhancement", "Gastroparesis"], difficulty: 2, connectionType: "categorical" },
{ term: "Bile acid sequestrants", tags: ["GI medications", "Pharmacology", "Diarrhea treatment", "Bile acid malabsorption"], difficulty: 2, connectionType: "categorical" },
{ term: "IBD biologics", tags: ["GI medications", "Pharmacology", "IBD treatment", "Immune modulation"], difficulty: 2, connectionType: "categorical" },

{ term: "Manometry", tags: ["GI procedures", "Gastroenterology", "Pressure measurement", "Motility disorders"], difficulty: 3, connectionType: "functional" },
{ term: "Capsule endoscopy", tags: ["GI procedures", "Gastroenterology", "Small bowel imaging", "Bleeding source"], difficulty: 3, connectionType: "functional" },
{ term: "Hydrogen breath test", tags: ["GI procedures", "Gastroenterology", "Malabsorption testing", "SIBO diagnosis"], difficulty: 3, connectionType: "functional" },
{ term: "FibroScan", tags: ["GI procedures", "Gastroenterology", "Liver stiffness", "Fibrosis assessment"], difficulty: 3, connectionType: "functional" },

{ term: "Ulcerative colitis", tags: ["GI conditions", "Gastroenterology", "Inflammatory bowel disease", "Bloody diarrhea"], difficulty: 4, connectionType: "conceptual" },
{ term: "Primary biliary cholangitis", tags: ["GI conditions", "Gastroenterology", "Autoimmune", "Bile duct damage"], difficulty: 4, connectionType: "conceptual" },
{ term: "Barrett's esophagus", tags: ["GI conditions", "Gastroenterology", "Metaplasia", "GERD complication"], difficulty: 4, connectionType: "conceptual" },
{ term: "Gastroparesis", tags: ["GI conditions", "Gastroenterology", "Motility disorder", "Delayed emptying"], difficulty: 4, connectionType: "conceptual" } 