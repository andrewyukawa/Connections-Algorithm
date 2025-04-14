const medicalTerms = [
  // Cardiovascular terms
  { term: "Atrium", tags: ["Parts of the heart", "Cardiology", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Ventricle", tags: ["Parts of the heart", "Cardiology", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Aorta", tags: ["Parts of the heart", "Cardiology", "Anatomy", "Blood vessels"], difficulty: 1, connectionType: "literal" },
  { term: "Valve", tags: ["Parts of the heart", "Cardiology", "Anatomy"], difficulty: 1, connectionType: "literal" },
  
  { term: "Beta-blockers", tags: ["Cardiovascular drugs", "Pharmacology", "Arrhythmia treatment", "Hypertension treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "ACE inhibitors", tags: ["Cardiovascular drugs", "Pharmacology", "Hypertension treatment", "Heart failure treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Statins", tags: ["Cardiovascular drugs", "Pharmacology", "Lipid disorders"], difficulty: 2, connectionType: "categorical" },
  { term: "Diuretics", tags: ["Cardiovascular drugs", "Pharmacology", "Heart failure treatment", "Hypertension treatment"], difficulty: 2, connectionType: "categorical" },
  
  { term: "ECG", tags: ["Diagnostic tests", "Cardiology", "Arrhythmia diagnosis", "MI diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "Echocardiogram", tags: ["Diagnostic tests", "Cardiology", "Heart failure diagnosis", "Valve assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Angiogram", tags: ["Diagnostic tests", "Cardiology", "Vascular imaging"], difficulty: 3, connectionType: "functional" },
  { term: "Stress test", tags: ["Diagnostic tests", "Cardiology", "Exercise physiology"], difficulty: 3, connectionType: "functional" },
  
  { term: "Myocardial infarction", tags: ["Heart conditions", "Cardiology", "Emergency medicine"], difficulty: 4, connectionType: "conceptual" },
  { term: "Arrhythmia", tags: ["Heart conditions", "Cardiology", "Electrophysiology"], difficulty: 4, connectionType: "conceptual" },
  { term: "Heart failure", tags: ["Heart conditions", "Cardiology", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Hypertension", tags: ["Heart conditions", "Cardiology", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  
  // Respiratory terms
  { term: "Alveoli", tags: ["Lung structures", "Respiratory", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Bronchi", tags: ["Lung structures", "Respiratory", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Pleura", tags: ["Lung structures", "Respiratory", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Diaphragm", tags: ["Lung structures", "Respiratory", "Anatomy", "Muscle"], difficulty: 1, connectionType: "literal" },
  
  { term: "Bronchodilators", tags: ["Respiratory medications", "Pharmacology", "Asthma treatment", "COPD treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Inhaled steroids", tags: ["Respiratory medications", "Pharmacology", "Asthma treatment", "Inflammation"], difficulty: 2, connectionType: "categorical" },
  { term: "Mucolytics", tags: ["Respiratory medications", "Pharmacology", "COPD treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Antihistamines", tags: ["Respiratory medications", "Pharmacology", "Allergy treatment"], difficulty: 2, connectionType: "categorical" },
  
  { term: "Spirometry", tags: ["Pulmonary tests", "Respiratory", "COPD diagnosis", "Asthma diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "Arterial blood gas", tags: ["Pulmonary tests", "Respiratory", "Critical care"], difficulty: 3, connectionType: "functional" },
  { term: "Bronchoscopy", tags: ["Pulmonary tests", "Respiratory", "Endoscopy"], difficulty: 3, connectionType: "functional" },
  { term: "Chest X-ray", tags: ["Pulmonary tests", "Respiratory", "Imaging", "Pneumonia diagnosis"], difficulty: 3, connectionType: "functional" },
  
  { term: "Asthma", tags: ["Respiratory conditions", "Pulmonology", "Chronic disease", "Inflammation"], difficulty: 4, connectionType: "conceptual" },
  { term: "COPD", tags: ["Respiratory conditions", "Pulmonology", "Chronic disease", "Smoking"], difficulty: 4, connectionType: "conceptual" },
  { term: "Pneumonia", tags: ["Respiratory conditions", "Pulmonology", "Infection", "Bacterial"], difficulty: 4, connectionType: "conceptual" },
  { term: "Pulmonary embolism", tags: ["Respiratory conditions", "Pulmonology", "Emergency medicine", "Coagulation"], difficulty: 4, connectionType: "conceptual" },
  
  // Neurological terms
  { term: "Cerebrum", tags: ["Brain parts", "Neurology", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Cerebellum", tags: ["Brain parts", "Neurology", "Anatomy", "Balance"], difficulty: 1, connectionType: "literal" },
  { term: "Brainstem", tags: ["Brain parts", "Neurology", "Anatomy", "Vital functions"], difficulty: 1, connectionType: "literal" },
  { term: "Hippocampus", tags: ["Brain parts", "Neurology", "Anatomy", "Memory"], difficulty: 1, connectionType: "literal" },
  
  { term: "Anticonvulsants", tags: ["Neurological drugs", "Pharmacology", "Epilepsy treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Triptans", tags: ["Neurological drugs", "Pharmacology", "Migraine treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Levodopa", tags: ["Neurological drugs", "Pharmacology", "Parkinson's treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Cholinesterase inhibitors", tags: ["Neurological drugs", "Pharmacology", "Alzheimer's treatment"], difficulty: 2, connectionType: "categorical" },
  
  { term: "EEG", tags: ["Neuro diagnostics", "Neurology", "Epilepsy diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "MRI brain", tags: ["Neuro diagnostics", "Neurology", "Imaging", "Stroke diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "Lumbar puncture", tags: ["Neuro diagnostics", "Neurology", "CSF analysis", "Meningitis diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "EMG", tags: ["Neuro diagnostics", "Neurology", "Nerve conduction", "Neuropathy diagnosis"], difficulty: 3, connectionType: "functional" },
  
  { term: "Stroke", tags: ["Neurological disorders", "Neurology", "Emergency medicine", "Vascular"], difficulty: 4, connectionType: "conceptual" },
  { term: "Epilepsy", tags: ["Neurological disorders", "Neurology", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Multiple sclerosis", tags: ["Neurological disorders", "Neurology", "Autoimmune", "Demyelination"], difficulty: 4, connectionType: "conceptual" },
  { term: "Parkinson's disease", tags: ["Neurological disorders", "Neurology", "Movement disorders", "Dopamine"], difficulty: 4, connectionType: "conceptual" },

  // Gastrointestinal terms
  { term: "Esophagus", tags: ["GI organs", "Gastroenterology", "Anatomy"], difficulty: 1, connectionType: "literal" },
  { term: "Stomach", tags: ["GI organs", "Gastroenterology", "Anatomy", "Digestion"], difficulty: 1, connectionType: "literal" },
  { term: "Liver", tags: ["GI organs", "Gastroenterology", "Anatomy", "Metabolism"], difficulty: 1, connectionType: "literal" },
  { term: "Pancreas", tags: ["GI organs", "Gastroenterology", "Anatomy", "Endocrine"], difficulty: 1, connectionType: "literal" },
  
  { term: "Proton pump inhibitors", tags: ["GI medications", "Pharmacology", "Ulcer treatment", "GERD treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Laxatives", tags: ["GI medications", "Pharmacology", "Constipation treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Antispasmodics", tags: ["GI medications", "Pharmacology", "IBS treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Antiemetics", tags: ["GI medications", "Pharmacology", "Nausea treatment"], difficulty: 2, connectionType: "categorical" },
  
  { term: "Endoscopy", tags: ["GI procedures", "Gastroenterology", "Ulcer diagnosis", "Cancer screening"], difficulty: 3, connectionType: "functional" },
  { term: "Colonoscopy", tags: ["GI procedures", "Gastroenterology", "Cancer screening", "IBD diagnosis"], difficulty: 3, connectionType: "functional" },
  { term: "ERCP", tags: ["GI procedures", "Gastroenterology", "Biliary imaging", "Pancreatic imaging"], difficulty: 3, connectionType: "functional" },
  { term: "Liver biopsy", tags: ["GI procedures", "Gastroenterology", "Cirrhosis diagnosis", "Hepatitis diagnosis"], difficulty: 3, connectionType: "functional" },
  
  { term: "Crohn's disease", tags: ["GI conditions", "Gastroenterology", "Autoimmune", "IBD"], difficulty: 4, connectionType: "conceptual" },
  { term: "Cirrhosis", tags: ["GI conditions", "Gastroenterology", "Liver disease", "Alcohol"], difficulty: 4, connectionType: "conceptual" },
  { term: "Peptic ulcer", tags: ["GI conditions", "Gastroenterology", "H. pylori", "NSAIDs"], difficulty: 4, connectionType: "conceptual" },
  { term: "Pancreatitis", tags: ["GI conditions", "Gastroenterology", "Inflammation", "Gallstones"], difficulty: 4, connectionType: "conceptual" },

  // More advanced/conceptual terms for purple groups
  { term: "Troponin", tags: ["Cardiac markers", "Cardiology", "Lab test", "Myocardial infarction"], difficulty: 4, connectionType: "conceptual" },
  { term: "BNP", tags: ["Cardiac markers", "Cardiology", "Lab test", "Heart failure"], difficulty: 4, connectionType: "conceptual" },
  { term: "CK-MB", tags: ["Cardiac markers", "Cardiology", "Lab test", "Muscle damage"], difficulty: 4, connectionType: "conceptual" },
  { term: "Myoglobin", tags: ["Cardiac markers", "Cardiology", "Lab test", "Muscle damage"], difficulty: 4, connectionType: "conceptual" },
  
  { term: "NSTEMI", tags: ["ACS types", "Cardiology", "Emergency medicine", "Thrombosis"], difficulty: 4, connectionType: "conceptual" },
  { term: "STEMI", tags: ["ACS types", "Cardiology", "Emergency medicine", "Occlusion"], difficulty: 4, connectionType: "conceptual" },
  { term: "Unstable angina", tags: ["ACS types", "Cardiology", "Emergency medicine", "Atherosclerosis"], difficulty: 4, connectionType: "conceptual" },
  { term: "Prinzmetal angina", tags: ["ACS types", "Cardiology", "Vasospasm", "Variant"], difficulty: 4, connectionType: "conceptual" },
  
  // Abstract medical concepts (level 4)
  { term: "Homeostasis", tags: ["Physiological principles", "Regulation", "Balance", "Feedback loops"], difficulty: 4, connectionType: "abstract" },
  { term: "Allostasis", tags: ["Physiological principles", "Stress adaptation", "Chronic response", "Dynamic equilibrium"], difficulty: 4, connectionType: "abstract" },
  { term: "Apoptosis", tags: ["Physiological principles", "Programmed cell death", "Development", "Cancer"], difficulty: 4, connectionType: "abstract" },
  { term: "Hormesis", tags: ["Physiological principles", "Beneficial stress", "Adaptive response", "Dose-response"], difficulty: 4, connectionType: "abstract" },
  
  // Medical wordplay/puns for highest difficulty (level 4)
  { term: "Heartburn", tags: ["Medical puns", "Digestive symptom", "Cardiac sound-alike", "GERD"], difficulty: 4, connectionType: "wordplay" },
  { term: "Tennis elbow", tags: ["Medical puns", "Sports injury", "Epicondylitis", "Joint condition"], difficulty: 4, connectionType: "wordplay" },
  { term: "Charley horse", tags: ["Medical puns", "Muscle cramp", "Colloquial term", "Pain"], difficulty: 4, connectionType: "wordplay" },
  { term: "Growing pains", tags: ["Medical puns", "Childhood condition", "Development", "Leg pain"], difficulty: 4, connectionType: "wordplay" },
  
  // EXPANDED MEDICAL TERMS BELOW
  
  // Cross-system anatomical structures
  { term: "Pituitary gland", tags: ["Endocrine organs", "Neurology", "Anatomy", "Hormone regulation"], difficulty: 1, connectionType: "literal" },
  { term: "Hypothalamus", tags: ["Brain parts", "Endocrine organs", "Neurology", "Temperature regulation"], difficulty: 1, connectionType: "literal" },
  { term: "Thymus", tags: ["Immune organs", "Anatomy", "T-cell development", "Chest"], difficulty: 1, connectionType: "literal" },
  { term: "Adrenal gland", tags: ["Endocrine organs", "Anatomy", "Stress response", "Kidney"], difficulty: 1, connectionType: "literal" },
  { term: "Spleen", tags: ["Immune organs", "Hematology", "Anatomy", "Blood filtration"], difficulty: 1, connectionType: "literal" },
  
  // Musculoskeletal terms (with cross-system connections)
  { term: "Synovial joint", tags: ["Joint types", "Orthopedics", "Anatomy", "Movement"], difficulty: 1, connectionType: "literal" },
  { term: "Bone marrow", tags: ["Skeletal structures", "Hematology", "Stem cells", "Immune system"], difficulty: 1, connectionType: "literal" },
  { term: "Tendon", tags: ["Musculoskeletal structures", "Orthopedics", "Anatomy", "Movement"], difficulty: 1, connectionType: "literal" },
  { term: "Fascia", tags: ["Connective tissues", "Anatomy", "Musculoskeletal", "Pain pathways"], difficulty: 1, connectionType: "literal" },
  
  // Medications with dual/multiple uses
  { term: "Corticosteroids", tags: ["Anti-inflammatory drugs", "Pharmacology", "Autoimmune treatment", "Respiratory medications", "Dermatology"], difficulty: 2, connectionType: "categorical" },
  { term: "Metformin", tags: ["Diabetes medications", "Pharmacology", "PCOS treatment", "Metabolic disease"], difficulty: 2, connectionType: "categorical" },
  { term: "Gabapentin", tags: ["Neurological drugs", "Pain management", "Epilepsy treatment", "Neuropathy treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Warfarin", tags: ["Anticoagulants", "Pharmacology", "DVT treatment", "AFib treatment", "Valve replacement"], difficulty: 2, connectionType: "categorical" },
  { term: "SSRIs", tags: ["Psychiatric medications", "Neurology", "Depression treatment", "Anxiety treatment", "Serotonin"], difficulty: 2, connectionType: "categorical" },
  
  // Cross-specialty drugs
  { term: "Aspirin", tags: ["Anti-inflammatory drugs", "Cardiovascular drugs", "Pain management", "Antiplatelet"], difficulty: 2, connectionType: "categorical" },
  { term: "Insulin", tags: ["Diabetes medications", "Endocrinology", "Metabolic regulation", "Hormone therapy"], difficulty: 2, connectionType: "categorical" },
  { term: "Amiodarone", tags: ["Antiarrhythmic", "Cardiovascular drugs", "Thyroid effects", "Pharmacology"], difficulty: 2, connectionType: "categorical" },
  { term: "Furosemide", tags: ["Diuretics", "Cardiovascular drugs", "Kidney disease", "Edema treatment"], difficulty: 2, connectionType: "categorical" },
  
  // Diagnostic procedures with cross-specialty applications
  { term: "PET scan", tags: ["Imaging", "Oncology", "Neurology", "Metabolic activity"], difficulty: 3, connectionType: "functional" },
  { term: "Genetic testing", tags: ["Laboratory tests", "Oncology", "Congenital disorders", "Family planning"], difficulty: 3, connectionType: "functional" },
  { term: "Ultrasound", tags: ["Imaging", "Obstetrics", "Cardiology", "Non-invasive", "Vascular"], difficulty: 3, connectionType: "functional" },
  { term: "Biopsy", tags: ["Tissue sampling", "Cancer diagnosis", "Pathology", "Inflammation assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Doppler", tags: ["Blood flow assessment", "Vascular studies", "Cardiology", "Obstetrics"], difficulty: 3, connectionType: "functional" },
  
  // Lab tests with multiple applications
  { term: "CBC", tags: ["Laboratory tests", "Hematology", "Infection markers", "Cancer screening"], difficulty: 3, connectionType: "functional" },
  { term: "Electrolytes", tags: ["Laboratory tests", "Kidney function", "Cardiac function", "Metabolic assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Liver enzymes", tags: ["Laboratory tests", "Hepatology", "Medication monitoring", "Liver damage"], difficulty: 3, connectionType: "functional" },
  { term: "CRP", tags: ["Laboratory tests", "Inflammation marker", "Cardiac risk", "Infection marker"], difficulty: 3, connectionType: "functional" },
  { term: "D-dimer", tags: ["Laboratory tests", "Coagulation studies", "Pulmonary embolism", "DVT diagnosis"], difficulty: 3, connectionType: "functional" },
  
  // Cross-system diseases and conditions
  { term: "Diabetes", tags: ["Endocrine disorders", "Vascular disease", "Metabolic disorders", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Lupus", tags: ["Autoimmune disorders", "Rheumatology", "Skin manifestations", "Kidney involvement"], difficulty: 4, connectionType: "conceptual" },
  { term: "Sarcoidosis", tags: ["Inflammatory disorders", "Pulmonology", "Dermatology", "Ophthalmology"], difficulty: 4, connectionType: "conceptual" },
  { term: "Amyloidosis", tags: ["Protein disorders", "Cardiac involvement", "Kidney disease", "Neurological symptoms"], difficulty: 4, connectionType: "conceptual" },
  { term: "Sepsis", tags: ["Infectious disease", "Critical care", "Systemic inflammation", "Organ failure"], difficulty: 4, connectionType: "conceptual" },
  
  // Integrative medical concepts
  { term: "Biopsychosocial model", tags: ["Medical paradigms", "Psychology", "Chronic disease", "Patient care"], difficulty: 4, connectionType: "abstract" },
  { term: "Neuroplasticity", tags: ["Brain function", "Rehabilitation", "Learning", "Recovery"], difficulty: 4, connectionType: "abstract" },
  { term: "Chronobiology", tags: ["Physiological principles", "Sleep medicine", "Hormone regulation", "Circadian rhythms"], difficulty: 4, connectionType: "abstract" },
  { term: "Mind-body connection", tags: ["Medical paradigms", "Stress response", "Pain perception", "Wellness"], difficulty: 4, connectionType: "abstract" },
  
  // Medical specialties and roles (thematic bridges)
  { term: "Hospitalist", tags: ["Medical specialties", "Inpatient care", "General medicine", "Care coordination"], difficulty: 3, connectionType: "functional" },
  { term: "Physiatrist", tags: ["Medical specialties", "Rehabilitation", "Pain management", "Physical therapy"], difficulty: 3, connectionType: "functional" },
  { term: "Intensivist", tags: ["Medical specialties", "Critical care", "Ventilator management", "Multi-organ support"], difficulty: 3, connectionType: "functional" },
  { term: "Infectious disease", tags: ["Medical specialties", "Microbiology", "Antibiotic stewardship", "Epidemiology"], difficulty: 3, connectionType: "functional" },
  
  // Procedural terms with cross-specialty relevance
  { term: "Intubation", tags: ["Airway management", "Emergency procedures", "Anesthesia", "Critical care"], difficulty: 3, connectionType: "functional" },
  { term: "Catheterization", tags: ["Invasive procedures", "Vascular access", "Urology", "Cardiology"], difficulty: 3, connectionType: "functional" },
  { term: "Dialysis", tags: ["Renal replacement", "Blood filtration", "Kidney failure", "Fluid management"], difficulty: 3, connectionType: "functional" },
  { term: "Thoracentesis", tags: ["Invasive procedures", "Pulmonology", "Fluid drainage", "Diagnostic sampling"], difficulty: 3, connectionType: "functional" },
  
  // Medical devices with multiple applications
  { term: "Stent", tags: ["Medical devices", "Vascular interventions", "GI procedures", "Urology"], difficulty: 2, connectionType: "categorical" },
  { term: "CPAP", tags: ["Medical devices", "Sleep apnea", "Respiratory support", "Pulmonology"], difficulty: 2, connectionType: "categorical" },
  { term: "Pacemaker", tags: ["Medical devices", "Cardiology", "Electrical stimulation", "Arrhythmia treatment"], difficulty: 2, connectionType: "categorical" },
  { term: "Infusion pump", tags: ["Medical devices", "Medication delivery", "Pain management", "Chemotherapy"], difficulty: 2, connectionType: "categorical" },
  
  // Symptoms with multiple causes (cross-system)
  { term: "Dyspnea", tags: ["Respiratory symptoms", "Cardiac symptoms", "Anxiety", "Exercise intolerance"], difficulty: 4, connectionType: "conceptual" },
  { term: "Fatigue", tags: ["General symptoms", "Anemia", "Depression", "Endocrine disorders"], difficulty: 4, connectionType: "conceptual" },
  { term: "Edema", tags: ["Physical findings", "Heart failure", "Kidney disease", "Venous insufficiency"], difficulty: 4, connectionType: "conceptual" },
  { term: "Syncope", tags: ["Neurological symptoms", "Cardiac symptoms", "Orthostatic hypotension", "Vasovagal"], difficulty: 4, connectionType: "conceptual" },
  
  // Mechanisms of disease (cross-cutting concepts)
  { term: "Inflammation", tags: ["Pathophysiology", "Immune response", "Tissue damage", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Fibrosis", tags: ["Pathophysiology", "Tissue repair", "Lung disease", "Liver disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Ischemia", tags: ["Pathophysiology", "Blood supply", "Tissue damage", "Vascular disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Metaplasia", tags: ["Pathophysiology", "Cell changes", "Pre-cancerous", "Tissue adaptation"], difficulty: 4, connectionType: "conceptual" },
  
  // Surgical specialties and procedures
  { term: "Laparoscopy", tags: ["Surgical techniques", "Minimally invasive", "Gynecology", "General surgery"], difficulty: 3, connectionType: "functional" },
  { term: "Anastomosis", tags: ["Surgical techniques", "GI surgery", "Vascular surgery", "Connection"], difficulty: 3, connectionType: "functional" },
  { term: "Transplantation", tags: ["Surgical procedures", "Immunology", "Organ failure", "Tissue typing"], difficulty: 4, connectionType: "conceptual" },
  { term: "Debridement", tags: ["Surgical procedures", "Wound care", "Infection control", "Tissue removal"], difficulty: 3, connectionType: "functional" },
  
  // More medical puns and wordplay
  { term: "Motion sickness", tags: ["Medical puns", "Travel-related", "Vestibular system", "Nausea"], difficulty: 4, connectionType: "wordplay" },
  { term: "Brain freeze", tags: ["Medical puns", "Cold stimulus", "Headache", "Trigeminal nerve"], difficulty: 4, connectionType: "wordplay" },
  { term: "Funny bone", tags: ["Medical puns", "Ulnar nerve", "Elbow", "Anatomical misnomer"], difficulty: 4, connectionType: "wordplay" },
  { term: "Blue bloods", tags: ["Medical puns", "Aristocracy", "Deoxygenated", "Hematology"], difficulty: 4, connectionType: "wordplay" },
  
  // Public health concepts
  { term: "Herd immunity", tags: ["Epidemiology", "Vaccination", "Infectious disease", "Population health"], difficulty: 4, connectionType: "conceptual" },
  { term: "Social determinants", tags: ["Public health", "Healthcare access", "Outcomes research", "Health equity"], difficulty: 4, connectionType: "abstract" },
  { term: "Vector control", tags: ["Public health", "Infectious disease", "Environmental health", "Prevention"], difficulty: 3, connectionType: "functional" },
  { term: "Screening program", tags: ["Public health", "Early detection", "Cancer prevention", "Cost-effectiveness"], difficulty: 3, connectionType: "functional" },
  
  // Emergency medicine concepts
  { term: "Triage", tags: ["Emergency medicine", "Resource allocation", "Priority setting", "Disaster response"], difficulty: 3, connectionType: "functional" },
  { term: "Code blue", tags: ["Emergency medicine", "Cardiopulmonary arrest", "Hospital protocols", "Resuscitation"], difficulty: 3, connectionType: "functional" },
  { term: "Golden hour", tags: ["Emergency medicine", "Trauma care", "Time-sensitive", "Outcomes"], difficulty: 4, connectionType: "conceptual" },
  { term: "Shock", tags: ["Emergency medicine", "Circulatory failure", "Multiple etiologies", "Tissue perfusion"], difficulty: 4, connectionType: "conceptual" },

  // Add these new terms to the medical terms array
  { term: "Thyroid", tags: ["Endocrine organs", "Anatomy", "Metabolism", "Hormone production", "Neck structures"], difficulty: 1, connectionType: "literal" },
  { term: "Medulla", tags: ["Brain parts", "Neurology", "Vital functions", "Adrenal gland", "Autonomic control"], difficulty: 1, connectionType: "literal" },
  { term: "Cortex", tags: ["Brain parts", "Adrenal gland", "Neurology", "Kidney anatomy", "Structural term"], difficulty: 1, connectionType: "literal" },
  { term: "Lymph node", tags: ["Immune organs", "Anatomy", "Infection response", "Cancer staging", "Drainage system"], difficulty: 1, connectionType: "literal" },
  
  // Medications that bridge multiple systems
  { term: "Methylprednisolone", tags: ["Corticosteroids", "Respiratory medications", "Autoimmune treatment", "Spinal cord injury", "Anti-inflammatory drugs"], difficulty: 2, connectionType: "categorical" },
  { term: "Propranolol", tags: ["Beta-blockers", "Cardiovascular drugs", "Migraine treatment", "Anxiety treatment", "Tremor management"], difficulty: 2, connectionType: "categorical" },
  { term: "Amitriptyline", tags: ["Antidepressants", "Pain management", "Migraine prevention", "Sleep disorders", "Neurological drugs"], difficulty: 2, connectionType: "categorical" },
  { term: "Metoprolol", tags: ["Beta-blockers", "Hypertension treatment", "Anxiety symptoms", "Heart failure treatment", "Post-MI care"], difficulty: 2, connectionType: "categorical" },
  
  // Diagnostic procedures that bridge systems
  { term: "Transthoracic echo", tags: ["Cardiac imaging", "Echocardiogram", "Lung assessment", "Diagnostic tests", "Non-invasive"], difficulty: 3, connectionType: "functional" },
  { term: "Contrast CT", tags: ["Imaging", "Oncology", "Vascular studies", "Trauma assessment", "Emergency medicine"], difficulty: 3, connectionType: "functional" },
  { term: "Flow cytometry", tags: ["Laboratory tests", "Hematology", "Cancer diagnosis", "Immune assessment", "Cell analysis"], difficulty: 3, connectionType: "functional" },
  { term: "Therapeutic drug monitoring", tags: ["Laboratory tests", "Pharmacology", "Medication management", "Toxicology", "Precision medicine"], difficulty: 3, connectionType: "functional" },
  
  // Complex multi-system conditions
  { term: "Cushing syndrome", tags: ["Endocrine disorders", "Adrenal disorders", "Iatrogenic", "Steroid effects", "Metabolic impact"], difficulty: 4, connectionType: "conceptual" },
  { term: "Vasculitis", tags: ["Autoimmune disorders", "Vascular disease", "Inflammatory disorders", "Multi-organ", "Rheumatology"], difficulty: 4, connectionType: "conceptual" },
  { term: "Paraneoplastic syndrome", tags: ["Oncology", "Neurology", "Autoimmune", "Remote effects", "Cancer manifestation"], difficulty: 4, connectionType: "conceptual" },
  { term: "Metabolic syndrome", tags: ["Endocrine disorders", "Cardiovascular risk", "Obesity", "Insulin resistance", "Chronic disease"], difficulty: 4, connectionType: "conceptual" },
  
  // Terms with linguistic/conceptual ambiguity
  { term: "Ablation", tags: ["Cardiology procedures", "Cancer treatment", "Tissue destruction", "Gynecology procedures", "Therapeutic technique"], difficulty: 3, connectionType: "functional" },
  { term: "Ischemia", tags: ["Pathophysiology", "Cardiology", "Neurology", "Vascular phenomenon", "Tissue injury"], difficulty: 4, connectionType: "conceptual" },
  { term: "Compliance", tags: ["Pulmonary function", "Medication adherence", "Vascular property", "Bladder function", "Medical ethics"], difficulty: 4, connectionType: "conceptual" },
  { term: "Circulation", tags: ["Cardiovascular system", "Journal publication", "Blood flow", "Public health communication", "Medical literature"], difficulty: 4, connectionType: "wordplay" },

  // Add more cross-group bridge terms
  { term: "Perfusion", tags: ["Cardiovascular physiology", "Respiratory function", "Tissue health", "Kidney function", "Brain metabolism"], difficulty: 3, connectionType: "functional" },
  { term: "Permeability", tags: ["Cell membrane", "Blood-brain barrier", "Vascular function", "Lung physiology", "Pathophysiology"], difficulty: 3, connectionType: "functional" },
  { term: "Diffusion", tags: ["Respiratory function", "Cell transport", "Renal physiology", "Drug delivery", "Imaging concept"], difficulty: 3, connectionType: "functional" },
  { term: "Osmosis", tags: ["Cell physiology", "Fluid balance", "Kidney function", "Laboratory technique", "Fundamental process"], difficulty: 3, connectionType: "functional" },
  
  // Symptom-focused terms that bridge groups
  { term: "Palpitations", tags: ["Cardiac symptoms", "Anxiety symptoms", "Thyroid disorders", "Caffeine effects", "Patient complaints"], difficulty: 4, connectionType: "conceptual" },
  { term: "Dizziness", tags: ["Neurological symptoms", "Cardiac symptoms", "Inner ear disorders", "Medication side effects", "Blood pressure"], difficulty: 4, connectionType: "conceptual" },
  { term: "Nausea", tags: ["GI symptoms", "Medication side effects", "Vestibular disorders", "Pregnancy symptom", "Migraine feature"], difficulty: 4, connectionType: "conceptual" },
  { term: "Confusion", tags: ["Neurological symptoms", "Geriatric syndrome", "Medication effect", "Metabolic disorders", "Infection sign"], difficulty: 4, connectionType: "conceptual" },
  
  // Medical terms with dual connections to anatomy and function
  { term: "Sphincter", tags: ["GI anatomy", "Muscle type", "Urological anatomy", "Functional structure", "Valvular concept"], difficulty: 1, connectionType: "literal" },
  { term: "Tubule", tags: ["Kidney anatomy", "Reproductive anatomy", "Structural unit", "Transport function", "Microscopic structure"], difficulty: 1, connectionType: "literal" },
  { term: "Receptor", tags: ["Cell membrane", "Neurology", "Pharmacology", "Hormone action", "Signal transduction"], difficulty: 2, connectionType: "categorical" },
  { term: "Enzyme", tags: ["Biochemistry", "Digestive function", "Liver function", "Drug metabolism", "Diagnostic marker"], difficulty: 2, connectionType: "categorical" },
  
  // Terms that bridge procedures, diagnosis and treatment
  { term: "Radiation", tags: ["Cancer treatment", "Imaging technique", "Environmental hazard", "Thyroid management", "Sterilization method"], difficulty: 3, connectionType: "functional" },
  { term: "Transplantation", tags: ["Surgical procedures", "Immunology", "Organ failure treatment", "Stem cell therapy", "Rejection management"], difficulty: 4, connectionType: "conceptual" },
  { term: "Screening", tags: ["Preventive medicine", "Cancer detection", "Public health", "Genetic counseling", "Risk assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Rehabilitation", tags: ["Physical therapy", "Addiction treatment", "Cardiac recovery", "Stroke management", "Functional restoration"], difficulty: 3, connectionType: "functional" },

  // Add wordplay terms and terms with double meanings
  { term: "Butterfly rash", tags: ["Lupus symptom", "Dermatology", "Anatomical shape", "Autoimmune marker", "Facial finding"], difficulty: 4, connectionType: "wordplay" },
  { term: "Baker's cyst", tags: ["Orthopedics", "Joint pathology", "Occupational reference", "Knee anatomy", "Fluid collection"], difficulty: 4, connectionType: "wordplay" },
  { term: "Port", tags: ["Vascular access", "Wine reference", "Medication administration", "Left side", "Oncology"], difficulty: 3, connectionType: "wordplay" },
  { term: "Clubbing", tags: ["Physical exam finding", "Respiratory disease", "Cardiac disease", "Nightlife reference", "Finger appearance"], difficulty: 3, connectionType: "wordplay" },
  
  // Medical terms with multiple distinct meanings
  { term: "Depression", tags: ["Psychiatric disorder", "Anatomical indentation", "Economic condition", "Meteorological pressure", "Cardiac function"], difficulty: 4, connectionType: "wordplay" },
  { term: "Culture", tags: ["Laboratory technique", "Microbiological growth", "Societal norms", "Cellular environment", "Diagnostic method"], difficulty: 3, connectionType: "wordplay" },
  { term: "Stress", tags: ["Psychological state", "Mechanical force", "Exercise testing", "Cellular response", "Physiological adaptation"], difficulty: 4, connectionType: "wordplay" },
  { term: "Block", tags: ["Nerve anesthesia", "Heart conduction", "Anatomical unit", "Surgical section", "Pathway obstruction"], difficulty: 3, connectionType: "wordplay" },
  
  // Terms that connect between types of medical practice
  { term: "Rounds", tags: ["Hospital practice", "Medical education", "Circular shapes", "Medication dosing", "Team activity"], difficulty: 3, connectionType: "wordplay" },
  { term: "Charts", tags: ["Medical records", "Visual data", "Patient documentation", "Growth tracking", "Visual aids"], difficulty: 2, connectionType: "wordplay" },
  { term: "Notes", tags: ["Medical documentation", "Musical reference", "Memory aids", "SOAP format", "Communication tool"], difficulty: 2, connectionType: "wordplay" },
  { term: "Orders", tags: ["Medical instructions", "Professional societies", "Taxonomic classifications", "Prescriptions", "Healthcare directives"], difficulty: 2, connectionType: "wordplay" },
  
  // Terms that bridge anatomical structures and medical procedures
  { term: "Bridge", tags: ["Dental prosthetic", "Anatomical connection", "Nasal structure", "Transition element", "Connective concept"], difficulty: 4, connectionType: "wordplay" },
  { term: "Canal", tags: ["Ear anatomy", "Birth passage", "Spinal structure", "Dental anatomy", "Fluid channel"], difficulty: 1, connectionType: "literal" },
  { term: "Vessel", tags: ["Blood container", "Surgical finding", "Laboratory equipment", "Transport structure", "Botanical structure"], difficulty: 2, connectionType: "wordplay" },
  { term: "Band", tags: ["Chromosomal marking", "Anatomical structure", "Surgical technique", "Gastric procedure", "Connective tissue"], difficulty: 3, connectionType: "wordplay" },

  // CATEGORICAL EXPANSION - NEW SPECIALTIES
  
  // Dermatology terms
  { term: "Epidermis", tags: ["Skin layers", "Dermatology", "Anatomy", "Barrier"], difficulty: 1, connectionType: "literal" },
  { term: "Dermis", tags: ["Skin layers", "Dermatology", "Anatomy", "Connective tissue"], difficulty: 1, connectionType: "literal" },
  { term: "Melanocyte", tags: ["Skin cells", "Dermatology", "Anatomy", "Pigmentation"], difficulty: 1, connectionType: "literal" },
  { term: "Keratinocyte", tags: ["Skin cells", "Dermatology", "Anatomy", "Epithelial"], difficulty: 1, connectionType: "literal" },
  
  { term: "Retinoids", tags: ["Dermatological drugs", "Pharmacology", "Acne treatment", "Anti-aging"], difficulty: 2, connectionType: "categorical" },
  { term: "Topical steroids", tags: ["Dermatological drugs", "Pharmacology", "Eczema treatment", "Anti-inflammatory"], difficulty: 2, connectionType: "categorical" },
  { term: "Antifungals", tags: ["Dermatological drugs", "Pharmacology", "Fungal infections", "Antimicrobial"], difficulty: 2, connectionType: "categorical" },
  { term: "Biologics", tags: ["Dermatological drugs", "Pharmacology", "Psoriasis treatment", "Immune modulation"], difficulty: 2, connectionType: "categorical" },
  
  { term: "Skin biopsy", tags: ["Dermatology procedures", "Diagnostic tests", "Cancer diagnosis", "Rash evaluation"], difficulty: 3, connectionType: "functional" },
  { term: "Patch testing", tags: ["Dermatology procedures", "Allergy testing", "Contact dermatitis", "Diagnostic tests"], difficulty: 3, connectionType: "functional" },
  { term: "Cryotherapy", tags: ["Dermatology procedures", "Wart treatment", "Lesion removal", "Cold application"], difficulty: 3, connectionType: "functional" },
  { term: "Wood's lamp", tags: ["Dermatology procedures", "Diagnostic tests", "Fungal detection", "UV light"], difficulty: 3, connectionType: "functional" },
  
  { term: "Psoriasis", tags: ["Skin conditions", "Dermatology", "Autoimmune", "Chronic inflammation"], difficulty: 4, connectionType: "conceptual" },
  { term: "Melanoma", tags: ["Skin conditions", "Dermatology", "Cancer", "Pigmented lesions"], difficulty: 4, connectionType: "conceptual" },
  { term: "Eczema", tags: ["Skin conditions", "Dermatology", "Atopic", "Pruritus"], difficulty: 4, connectionType: "conceptual" },
  { term: "Rosacea", tags: ["Skin conditions", "Dermatology", "Facial redness", "Chronic inflammation"], difficulty: 4, connectionType: "conceptual" },
  
  // Ophthalmology terms
  { term: "Cornea", tags: ["Eye structures", "Ophthalmology", "Anatomy", "Transparent"], difficulty: 1, connectionType: "literal" },
  { term: "Retina", tags: ["Eye structures", "Ophthalmology", "Anatomy", "Photoreceptors"], difficulty: 1, connectionType: "literal" },
  { term: "Lens", tags: ["Eye structures", "Ophthalmology", "Anatomy", "Accommodation"], difficulty: 1, connectionType: "literal" },
  { term: "Iris", tags: ["Eye structures", "Ophthalmology", "Anatomy", "Pupil regulation"], difficulty: 1, connectionType: "literal" },
  
  { term: "Beta blockers", tags: ["Ophthalmic medications", "Glaucoma treatment", "Pharmacology", "IOP reduction"], difficulty: 2, connectionType: "categorical" },
  { term: "Mydriatics", tags: ["Ophthalmic medications", "Pupil dilation", "Pharmacology", "Diagnostic aid"], difficulty: 2, connectionType: "categorical" },
  { term: "Artificial tears", tags: ["Ophthalmic medications", "Dry eye treatment", "Pharmacology", "Lubrication"], difficulty: 2, connectionType: "categorical" },
  { term: "Anti-VEGF", tags: ["Ophthalmic medications", "Macular degeneration", "Pharmacology", "Diabetic retinopathy"], difficulty: 2, connectionType: "categorical" },
  
  { term: "Tonometry", tags: ["Ophthalmology procedures", "Diagnostic tests", "Glaucoma screening", "Pressure measurement"], difficulty: 3, connectionType: "functional" },
  { term: "Fundoscopy", tags: ["Ophthalmology procedures", "Diagnostic tests", "Retinal examination", "Optic nerve assessment"], difficulty: 3, connectionType: "functional" },
  { term: "OCT", tags: ["Ophthalmology procedures", "Imaging", "Retinal layers", "Macular assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Visual field test", tags: ["Ophthalmology procedures", "Diagnostic tests", "Peripheral vision", "Glaucoma assessment"], difficulty: 3, connectionType: "functional" },
  
  { term: "Glaucoma", tags: ["Eye conditions", "Ophthalmology", "Optic nerve damage", "Increased pressure"], difficulty: 4, connectionType: "conceptual" },
  { term: "Macular degeneration", tags: ["Eye conditions", "Ophthalmology", "Age-related", "Central vision loss"], difficulty: 4, connectionType: "conceptual" },
  { term: "Diabetic retinopathy", tags: ["Eye conditions", "Ophthalmology", "Vascular complications", "Systemic disease"], difficulty: 4, connectionType: "conceptual" },
  { term: "Cataract", tags: ["Eye conditions", "Ophthalmology", "Lens opacity", "Vision impairment"], difficulty: 4, connectionType: "conceptual" },
  
  // Orthopedics terms
  { term: "Femur", tags: ["Bones", "Orthopedics", "Anatomy", "Lower limb"], difficulty: 1, connectionType: "literal" },
  { term: "Meniscus", tags: ["Joint structures", "Orthopedics", "Anatomy", "Knee"], difficulty: 1, connectionType: "literal" },
  { term: "Vertebra", tags: ["Bones", "Orthopedics", "Anatomy", "Spine"], difficulty: 1, connectionType: "literal" },
  { term: "Ligament", tags: ["Joint structures", "Orthopedics", "Anatomy", "Stabilization"], difficulty: 1, connectionType: "literal" },
  
  { term: "NSAIDs", tags: ["Orthopedic medications", "Pain management", "Pharmacology", "Anti-inflammatory"], difficulty: 2, connectionType: "categorical" },
  { term: "Bisphosphonates", tags: ["Orthopedic medications", "Osteoporosis treatment", "Pharmacology", "Bone density"], difficulty: 2, connectionType: "categorical" },
  { term: "Muscle relaxants", tags: ["Orthopedic medications", "Spasm treatment", "Pharmacology", "Back pain"], difficulty: 2, connectionType: "categorical" },
  { term: "Hyaluronic acid", tags: ["Orthopedic medications", "Joint injections", "Pharmacology", "Osteoarthritis"], difficulty: 2, connectionType: "categorical" },
  
  { term: "X-ray", tags: ["Orthopedic procedures", "Diagnostic imaging", "Fracture detection", "Joint assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Arthroplasty", tags: ["Orthopedic procedures", "Joint replacement", "Surgical techniques", "Mobility restoration"], difficulty: 3, connectionType: "functional" },
  { term: "Arthroscopy", tags: ["Orthopedic procedures", "Minimally invasive", "Joint visualization", "Surgical techniques"], difficulty: 3, connectionType: "functional" },
  { term: "Bone scan", tags: ["Orthopedic procedures", "Nuclear medicine", "Diagnostic imaging", "Metastasis detection"], difficulty: 3, connectionType: "functional" },
  
  { term: "Osteoarthritis", tags: ["Musculoskeletal conditions", "Orthopedics", "Joint degeneration", "Chronic pain"], difficulty: 4, connectionType: "conceptual" },
  { term: "Rheumatoid arthritis", tags: ["Musculoskeletal conditions", "Orthopedics", "Autoimmune", "Joint inflammation"], difficulty: 4, connectionType: "conceptual" },
  { term: "Osteoporosis", tags: ["Musculoskeletal conditions", "Orthopedics", "Bone density", "Fracture risk"], difficulty: 4, connectionType: "conceptual" },
  { term: "Scoliosis", tags: ["Musculoskeletal conditions", "Orthopedics", "Spinal curvature", "Postural deformity"], difficulty: 4, connectionType: "conceptual" },

  // Urology terms
  { term: "Kidney", tags: ["Urinary organs", "Urology", "Anatomy", "Filtration"], difficulty: 1, connectionType: "literal" },
  { term: "Bladder", tags: ["Urinary organs", "Urology", "Anatomy", "Storage"], difficulty: 1, connectionType: "literal" },
  { term: "Urethra", tags: ["Urinary organs", "Urology", "Anatomy", "Excretion"], difficulty: 1, connectionType: "literal" },
  { term: "Prostate", tags: ["Reproductive organs", "Urology", "Anatomy", "Male"], difficulty: 1, connectionType: "literal" },
  
  { term: "Alpha blockers", tags: ["Urological medications", "BPH treatment", "Pharmacology", "Smooth muscle"], difficulty: 2, connectionType: "categorical" },
  { term: "5-alpha reductase inhibitors", tags: ["Urological medications", "BPH treatment", "Pharmacology", "Prostate shrinkage"], difficulty: 2, connectionType: "categorical" },
  { term: "Anticholinergics", tags: ["Urological medications", "Overactive bladder", "Pharmacology", "Urge incontinence"], difficulty: 2, connectionType: "categorical" },
  { term: "Phosphodiesterase inhibitors", tags: ["Urological medications", "Erectile dysfunction", "Pharmacology", "Vasodilation"], difficulty: 2, connectionType: "categorical" },
  
  { term: "Cystoscopy", tags: ["Urological procedures", "Diagnostic tests", "Bladder visualization", "Cancer detection"], difficulty: 3, connectionType: "functional" },
  { term: "Urodynamics", tags: ["Urological procedures", "Diagnostic tests", "Bladder function", "Incontinence assessment"], difficulty: 3, connectionType: "functional" },
  { term: "Lithotripsy", tags: ["Urological procedures", "Stone treatment", "Shockwave therapy", "Minimally invasive"], difficulty: 3, connectionType: "functional" },
  { term: "Prostate biopsy", tags: ["Urological procedures", "Cancer diagnosis", "Tissue sampling", "Prostate assessment"], difficulty: 3, connectionType: "functional" },
  
  { term: "Kidney stones", tags: ["Urological conditions", "Urology", "Mineral deposits", "Renal colic"], difficulty: 4, connectionType: "conceptual" },
  { term: "Prostate cancer", tags: ["Urological conditions", "Urology", "Malignancy", "PSA elevation"], difficulty: 4, connectionType: "conceptual" },
  { term: "Interstitial cystitis", tags: ["Urological conditions", "Urology", "Chronic pain", "Bladder inflammation"], difficulty: 4, connectionType: "conceptual" },
  { term: "Urinary incontinence", tags: ["Urological conditions", "Urology", "Pelvic floor", "Quality of life"], difficulty: 4, connectionType: "conceptual" },
  
  // LAYERED DIFFICULTY EXPANSION - ADDITIONAL TERMS FOR EXISTING CATEGORIES
  
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
  { term: "Obstructive sleep apnea", tags: ["Respiratory conditions", "Pulmonology", "Sleep medicine", "Airway obstruction"], difficulty: 4, connectionType: "conceptual" }
];

// Mapping of difficulty levels to connection types and characteristics
const difficultyLevels = {
  1: {
    name: "Yellow",
    description: "Features the most obvious connections",
    connectionTypes: ["literal"],
    characteristics: "Literal, anatomical, or basic categorization"
  },
  2: {
    name: "Green",
    description: "Features clearer thematic groupings",
    connectionTypes: ["categorical"],
    characteristics: "Clear categories, conventional grouping, requires some knowledge"
  },
  3: {
    name: "Blue",
    description: "Features moderately abstract connections",
    connectionTypes: ["functional"],
    characteristics: "Functional relationships, specialized knowledge, not immediately apparent"
  },
  4: {
    name: "Purple",
    description: "Features indirect or non-obvious relationships",
    connectionTypes: ["conceptual", "abstract", "wordplay"],
    characteristics: "Abstract concepts, lateral thinking, specialized knowledge, wordplay"
  }
};

// Calculate tag metadata automatically
function generateTagMetadata() {
  const allTags = new Set();
  
  // Collect all unique tags
  medicalTerms.forEach(term => {
    term.tags.forEach(tag => allTags.add(tag));
  });
  
  // Calculate frequency and specificity for each tag
  const tagMetadata = {};
  allTags.forEach(tag => {
    // Count terms with this tag
    const taggedTerms = medicalTerms.filter(term => term.tags.includes(tag));
    const frequency = taggedTerms.length / medicalTerms.length;
    
    // Calculate specificity (inverse of frequency)
    const specificity = 1 - frequency;
    
    // Calculate average tag count for terms with this tag (tag richness)
    const avgTagCount = taggedTerms.reduce((sum, term) => sum + term.tags.length, 0) / taggedTerms.length;
    
    // Calculate average difficulty level for terms with this tag
    const avgDifficulty = taggedTerms.reduce((sum, term) => sum + term.difficulty, 0) / taggedTerms.length;
    
    // Store metadata
    tagMetadata[tag] = {
      frequency,
      specificity,
      termCount: taggedTerms.length,
      avgTagCount,
      avgDifficulty,
      // Map frequency to difficulty ranges
      difficultyRange: frequency > 0.2 ? 1 : frequency > 0.1 ? 2 : frequency > 0.05 ? 3 : 4
    };
  });
  
  return tagMetadata;
}

// Generate tag metadata
const tagMetadata = generateTagMetadata();

// Overlap targets for each difficulty level (min and max number of overlaps with each other group)
const overlapsTargets = {
  1: { // Yellow (easiest) overlaps with other groups
    1: [0, 0], // with Yellow (itself)
    2: [2, 4], // more overlaps with Green
    3: [1, 3], // more overlaps with Blue
    4: [0, 2]  // allow direct Yellow-Purple connections
  },
  2: { // Green overlaps with other groups
    1: [2, 4], // more overlaps with Yellow
    2: [0, 0], // with Green (itself)
    3: [2, 4], // more overlaps with Blue
    4: [1, 3]  // more overlaps with Purple
  },
  3: { // Blue overlaps with other groups
    1: [1, 3], // more overlaps with Yellow
    2: [2, 4], // more overlaps with Green
    3: [0, 0], // with Blue (itself)
    4: [2, 4]  // more overlaps with Purple
  },
  4: { // Purple (hardest) overlaps with other groups
    1: [0, 2], // allow direct Purple-Yellow connections
    2: [1, 3], // more overlaps with Green
    3: [2, 4], // more overlaps with Blue
    4: [0, 0]  // with Purple (itself)
  }
};

module.exports = { 
  medicalTerms, 
  difficultyLevels, 
  tagMetadata, 
  overlapsTargets 
}; 