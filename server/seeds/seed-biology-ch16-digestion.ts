import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyChapter16() {
  console.log('Seeding Biology Class 11 Chapter 16: Digestion and Absorption...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 16,
    chapterTitle: 'Digestion and Absorption',
    introduction: `Nutrition is essential for all living organisms to obtain energy, build tissues, and regulate body functions. Humans are heterotrophic organisms requiring complex organic molecules that must be broken down into simpler, absorbable forms. The digestive system is a specialized organ system designed for ingestion, digestion, absorption, and egestion of food. This chapter explores the human digestive system's anatomy, the biochemical processes of digestion, enzymatic actions, absorption mechanisms, and disorders related to digestion. Understanding these processes is fundamental for medical sciences and maintaining optimal health.`,

    detailedNotes: `
# Digestion and Absorption

## Digestive System Overview

**Functions:**
1. **Ingestion**: Taking in food
2. **Digestion**: Breakdown of complex food into simpler molecules
3. **Absorption**: Transfer of digested products into blood/lymph
4. **Assimilation**: Utilization of absorbed nutrients
5. **Egestion**: Elimination of undigested material

**Types of Digestion:**
- **Mechanical Digestion**: Physical breakdown (chewing, churning)
- **Chemical Digestion**: Enzymatic breakdown of macromolecules

## Human Alimentary Canal

**Length**: Approximately 8-10 meters (30 feet)

**Parts (in sequence):**

### 1. Mouth (Buccal/Oral Cavity)

**Components:**
- Lips, cheeks, palate (hard and soft)
- Tongue (muscular, sensory, manipulative)
- Teeth (mechanical digestion)
- Salivary glands

**Teeth:**
- **Dental Formula (Adult)**: 2123/2123 = 32 teeth
  - 2 Incisors, 1 Canine, 2 Premolars, 3 Molars (per quadrant)
- **Types**: Incisors (cutting), Canines (tearing), Premolars & Molars (grinding)
- **Thecodont**: Embedded in jaw sockets
- **Diphyodont**: Two sets (milk teeth + permanent teeth)
- **Heterodont**: Different types of teeth

**Tongue:**
- Muscular organ attached to floor
- Papillae with taste buds
- Lingual lipase secreted (minor fat digestion)
- Helps in mastication, speech, swallowing

**Salivary Glands:**
Three pairs:
- **Parotid** (largest, near ear)
- **Submandibular** (below jaw)
- **Sublingual** (below tongue)

**Saliva:**
- pH: 6.5-6.8 (slightly acidic)
- **Composition**: Water (99.5%), mucus, enzymes, lysozyme, electrolytes
- **Enzyme**: Salivary amylase (ptyalin)
  - Starch → Maltose + Dextrins
  - Optimum pH: 6.8
- **Functions**: Moistens food, lubricates, antibacterial (lysozyme), starts carbohydrate digestion

### 2. Pharynx

- Common passage for food and air
- Connects mouth to esophagus
- Swallowing reflex initiated here

### 3. Esophagus (Food Pipe)

- Muscular tube (~25 cm)
- Connects pharynx to stomach
- **Peristalsis**: Wave-like muscular contractions propel food
- **Gastro-esophageal sphincter**: Prevents backflow from stomach
- No digestion occurs here

### 4. Stomach

**Structure:**
- J-shaped muscular bag
- Capacity: ~1.5-2 liters
- Three regions: Cardiac (near heart), Fundus (dome), Pyloric (near small intestine)
- **Cardiac sphincter**: Entry from esophagus
- **Pyloric sphincter**: Exit to duodenum

**Gastric Glands (in mucosa):**
- **Mucus neck cells**: Secrete mucus (protection)
- **Parietal/Oxyntic cells**: Secrete HCl and intrinsic factor
- **Chief/Peptic/Zymogenic cells**: Secrete pepsinogen and gastric lipase

**Gastric Juice:**
- pH: 1.5-2.5 (highly acidic)
- **Components**:
  - **HCl**: Kills bacteria, activates pepsinogen, provides acidic medium
  - **Pepsinogen**: Inactive enzyme (activated to pepsin by HCl)
  - **Pepsin**: Protein → Peptones + Proteoses
  - **Gastric lipase**: Minor fat digestion (mainly in infants)
  - **Rennin**: Milk protein coagulation (in infants)
  - **Mucus**: Protects stomach lining
  - **Intrinsic factor**: Vitamin B₁₂ absorption

**Functions:**
- Stores food temporarily (2-4 hours)
- Churning produces semi-liquid chyme
- HCl creates acidic environment
- Protein digestion begins

### 5. Small Intestine

**Longest part**: 6-7.5 meters

**Three regions:**

**A. Duodenum (25 cm, C-shaped)**
- Receives:
  - Bile from liver/gallbladder via bile duct
  - Pancreatic juice from pancreas via pancreatic duct
  - Both enter at hepatopancreatic ampulla (Ampulla of Vater)
  - Controlled by sphincter of Oddi

**B. Jejunum (2.4 m)**
- Primary site of nutrient absorption
- Highly vascularized

**C. Ileum (3.5 m)**
- Opens into large intestine at ileocecal valve
- Peyer's patches (lymphoid tissue) present

**Structural Modifications for Absorption:**
- **Villi**: Finger-like projections (increase surface area 10x)
  - Each villus has: Blood capillaries, Lacteal (lymph vessel), Epithelium
- **Microvilli**: Brush border on epithelial cells (increase surface area 20x)
- Total surface area: ~200-300 m² (size of tennis court!)

**Intestinal Juice (Succus Entericus):**
- pH: 7.8 (alkaline)
- **Enzymes**:
  - **Maltase**: Maltose → Glucose + Glucose
  - **Sucrase**: Sucrose → Glucose + Fructose
  - **Lactase**: Lactose → Glucose + Galactose
  - **Dipeptidases**: Dipeptides → Amino acids
  - **Lipase**: Completes fat digestion
  - **Nucleosidases & Nucleotidases**: Nucleic acid digestion

### 6. Large Intestine

**Length**: ~1.5 meters

**Parts:**
- **Cecum**: Pouch with vermiform appendix (vestigial in humans)
- **Colon**: Ascending, Transverse, Descending, Sigmoid
- **Rectum**: Stores feces
- **Anal canal**: Opens to exterior via anus

**Functions:**
- Water and electrolyte absorption (dries undigested food)
- Bacterial fermentation (symbiotic bacteria)
  - Synthesize Vitamin K, B₁₂
  - Ferment cellulose (limited)
- Formation and storage of feces
- **No digestive enzymes** secreted

## Associated Digestive Glands

### 1. Liver

**Largest gland**: 1.2-1.5 kg

**Structure:**
- Two main lobes (right, left)
- Hepatic cells arranged in lobules
- Central vein in each lobule

**Functions:**
- **Bile production**: 500-1000 ml/day
- Detoxification of harmful substances
- Glycogen storage (glycogenesis)
- Protein synthesis (plasma proteins)
- Heat production
- Vitamin storage (A, D, E, K, B₁₂)
- Erythrocyte breakdown (converts hemoglobin to bilirubin)

**Bile:**
- Stored and concentrated in **gallbladder**
- pH: 7.8-8.6 (alkaline)
- **Components**:
  - **Bile salts**: Sodium glycocholate, sodium taurocholate
  - **Bile pigments**: Bilirubin, biliverdin (from RBC breakdown)
  - Cholesterol, lecithin, water
- **No digestive enzymes**
- **Functions**:
  - Emulsification of fats (breaks large droplets into smaller)
  - Activates lipase
  - Neutralizes acidic chyme
  - Absorption of fat-soluble vitamins (A, D, E, K)
  - Excretion of waste (bilirubin, cholesterol)

### 2. Pancreas

**Mixed gland**: Endocrine + Exocrine

**Exocrine Function**: Digestive enzyme secretion

**Pancreatic Juice:**
- Volume: 1.2-1.5 L/day
- pH: 8.3 (alkaline, neutralizes acidic chyme)
- Secreted into duodenum

**Pancreatic Enzymes:**

**Protein Digestion:**
- **Trypsinogen** → Trypsin (activated by enterokinase)
  - Proteins → Peptides
- **Chymotrypsinogen** → Chymotrypsin (activated by trypsin)
  - Proteins → Peptides
- **Carboxypeptidases**: Peptides → Amino acids

**Carbohydrate Digestion:**
- **Pancreatic amylase**: Starch → Maltose

**Fat Digestion:**
- **Pancreatic lipase**: Fats → Fatty acids + Glycerol
  - Most powerful fat-digesting enzyme
  - Requires bile salts for activation

**Nucleic Acid Digestion:**
- **Ribonuclease (RNase)**: RNA → Ribonucleotides
- **Deoxyribonuclease (DNase)**: DNA → Deoxyribonucleotides

## Process of Digestion (Summary)

### Carbohydrate Digestion

**Mouth:**
- Salivary amylase: Starch → Maltose + Dextrins
- Optimum pH: 6.8
- Continues briefly in stomach until HCl inactivates

**Small Intestine:**
- Pancreatic amylase: Starch → Maltose
- Intestinal enzymes:
  - Maltase: Maltose → Glucose + Glucose
  - Sucrase: Sucrose → Glucose + Fructose
  - Lactase: Lactose → Glucose + Galactose

**End Products**: Glucose, Fructose, Galactose (monosaccharides)

### Protein Digestion

**Stomach:**
- Pepsin: Proteins → Peptones + Proteoses
- pH: 1.5-2.5

**Small Intestine:**
- Trypsin: Proteins → Peptides
- Chymotrypsin: Proteins → Peptides
- Carboxypeptidases: Peptides → Amino acids
- Dipeptidases: Dipeptides → Amino acids

**End Products**: Amino acids

### Fat Digestion

**Mouth:**
- Lingual lipase: Minor (mainly in infants)

**Stomach:**
- Gastric lipase: Minor (mainly in infants)

**Small Intestine:**
- **Bile salts**: Emulsification (physical breakdown)
- **Pancreatic lipase**: Triglycerides → Fatty acids + Glycerol + Monoglycerides
- Most important site

**End Products**: Fatty acids, Glycerol, Monoglycerides

### Nucleic Acid Digestion

**Small Intestine:**
- Pancreatic RNase & DNase: RNA/DNA → Nucleotides
- Nucleotidases: Nucleotides → Nucleosides + Phosphate
- Nucleosidases: Nucleosides → Sugars + Nitrogenous bases

**End Products**: Pentose sugars, Nitrogenous bases, Phosphates

## Absorption

**Definition**: Transfer of digested products from intestinal lumen to blood/lymph

**Primary Site**: Small intestine (jejunum and ileum)

**Mechanisms:**

### 1. Passive Transport
- Simple diffusion (along concentration gradient)
- No energy required
- Examples: Water, some minerals

### 2. Active Transport
- Against concentration gradient
- Energy (ATP) required
- Carrier proteins involved
- Examples: Glucose, amino acids, some minerals

### 3. Facilitated Diffusion
- Along concentration gradient
- Carrier proteins required
- No energy
- Example: Fructose

### Absorption of Specific Nutrients:

**Carbohydrates:**
- Absorbed as monosaccharides (glucose, fructose, galactose)
- **Glucose & Galactose**: Active transport (sodium co-transport)
- **Fructose**: Facilitated diffusion
- Enter blood capillaries → Hepatic portal vein → Liver

**Proteins:**
- Absorbed as amino acids
- **Mechanism**: Active transport (sodium co-transport)
- Some dipeptides/tripeptides can be absorbed
- Enter blood capillaries → Hepatic portal vein → Liver

**Fats:**
- **Process**:
  1. Fatty acids + Glycerol + Monoglycerides form **micelles** (with bile salts)
  2. Enter epithelial cells by diffusion
  3. Re-synthesized into triglycerides in ER
  4. Packaged with proteins into **chylomicrons** (lipoprotein particles)
  5. Released into **lacteals** (lymph vessels)
  6. Lymph → Thoracic duct → Blood circulation (bypasses liver initially)

**Water:**
- Maximum absorption in small intestine
- Also absorbed in large intestine
- Passive diffusion (osmosis)
- ~9-10 liters absorbed daily

**Electrolytes:**
- **Na⁺, Cl⁻**: Active transport in small intestine
- **K⁺**: Passive diffusion
- **Ca²⁺**: Active transport (requires Vitamin D)
- **Fe²⁺**: Active transport (regulated by body needs)

**Vitamins:**
- **Water-soluble** (B, C): Diffusion/active transport
- **Fat-soluble** (A, D, E, K): Absorbed with fats in micelles

## Egestion

**Definition**: Elimination of undigested food as feces

**Feces Composition:**
- Undigested cellulose, fiber
- Bacteria (30-50% of dry weight)
- Sloughed epithelial cells
- Bile pigments (bilirubin → stercobilin, gives brown color)
- Water (75%)

**Defecation:**
- Mass peristalsis in colon
- Feces enter rectum → stretch receptors → urge to defecate
- Internal anal sphincter (involuntary)
- External anal sphincter (voluntary)

## Regulation of Digestion

### Hormonal Regulation

**Gastrin:**
- Secreted by: Gastric mucosa (G cells)
- Stimulated by: Food in stomach, stomach distension
- Effect: Stimulates gastric juice secretion

**Secretin:**
- Secreted by: Duodenal mucosa (S cells)
- Stimulated by: Acidic chyme
- Effect: Stimulates pancreatic bicarbonate secretion (neutralizes acid)

**Cholecystokinin (CCK):**
- Secreted by: Duodenal mucosa (I cells)
- Stimulated by: Fats and proteins in duodenum
- Effects:
  - Stimulates pancreatic enzyme secretion
  - Stimulates gallbladder contraction (bile release)
  - Inhibits gastric emptying

**Gastric Inhibitory Peptide (GIP):**
- Secreted by: Duodenal mucosa (K cells)
- Stimulated by: Fats, carbohydrates in duodenum
- Effect: Inhibits gastric acid secretion, slows gastric emptying

### Neural Regulation

- **Enteric Nervous System**: Intrinsic control (myenteric & submucosal plexuses)
- **Autonomic Nervous System**:
  - **Parasympathetic** (vagus nerve): Stimulates digestion ("rest and digest")
  - **Sympathetic**: Inhibits digestion ("fight or flight")

## Common Digestive Disorders

**Jaundice:**
- Yellow discoloration of skin/eyes
- Cause: Excess bilirubin (liver dysfunction, bile duct blockage)

**Vomiting:**
- Forceful expulsion of stomach contents
- Controlled by vomiting center in medulla

**Diarrhea:**
- Frequent, watery stools
- Causes: Infection, food intolerance, inflammation
- Danger: Dehydration, electrolyte loss

**Constipation:**
- Difficulty in bowel movement
- Causes: Low fiber, inadequate water, irregular habits

**Indigestion:**
- Feeling of fullness, discomfort
- Causes: Overeating, spicy food, stress

**Peptic Ulcer:**
- Erosion of stomach/duodenal lining
- Causes: H. pylori infection, excess acid, NSAIDs

**GERD (Gastroesophageal Reflux Disease):**
- Acid reflux from stomach to esophagus
- Cause: Weak gastroesophageal sphincter

**Appendicitis:**
- Inflammation of appendix
- Requires surgical removal
`,

    keyConcepts: [
      'Alimentary canal: 8-10 meters long, mouth to anus',
      'Dental formula (adult): 2123/2123 = 32 teeth',
      'Teeth: Thecodont, Diphyodont, Heterodont',
      'Salivary amylase: Starch → Maltose (pH 6.8)',
      'Gastric juice: pH 1.5-2.5, contains HCl, pepsin, mucus',
      'Pepsinogen → Pepsin (by HCl), Proteins → Peptones',
      'Small intestine: 6-7.5 m, villi and microvilli increase surface area',
      'Pancreatic enzymes: Amylase, trypsin, lipase (pH 8.3)',
      'Bile: No enzymes, emulsifies fats, from liver stored in gallbladder',
      'Carbohydrate digestion: Amylase → Maltase/Sucrase/Lactase → Monosaccharides',
      'Protein digestion: Pepsin → Trypsin → Peptidases → Amino acids',
      'Fat digestion: Bile salts + Lipase → Fatty acids + Glycerol',
      'Glucose absorption: Active transport (Na⁺ co-transport)',
      'Fat absorption: Micelles → Chylomicrons → Lacteals → Lymph',
      'Gastrin: Stimulates gastric juice secretion',
      'Secretin: Stimulates pancreatic bicarbonate secretion',
      'CCK: Stimulates pancreatic enzymes and gallbladder contraction',
      'Large intestine: Water absorption, vitamin synthesis by bacteria'
    ],

    formulas: [
      'Dental formula (adult): 2123/2123 = 32 teeth',
      'Salivary amylase: Starch → Maltose + Dextrins',
      'Pepsin: Proteins → Peptones + Proteoses',
      'Pancreatic amylase: Starch → Maltose',
      'Trypsin: Proteins → Peptides',
      'Lipase: Triglycerides → Fatty acids + Glycerol + Monoglycerides',
      'Maltase: Maltose → Glucose + Glucose',
      'Sucrase: Sucrose → Glucose + Fructose',
      'Lactase: Lactose → Glucose + Galactose'
    ],

    learningObjectives: [
      'Describe the human alimentary canal and its parts',
      'Understand the structure and types of teeth',
      'Explain the role of salivary glands and saliva composition',
      'Describe gastric juice composition and functions',
      'Understand the structure of small intestine and adaptations for absorption',
      'Explain the role of liver, bile, and gallbladder',
      'Describe pancreatic juice and its enzymes',
      'Understand the process of carbohydrate, protein, and fat digestion',
      'Explain mechanisms of nutrient absorption',
      'Describe hormonal and neural regulation of digestion',
      'Identify common digestive disorders'
    ],

    prerequisites: [
      'Understanding of human anatomy',
      'Knowledge of enzymes and their functions',
      'Basic biochemistry (carbohydrates, proteins, fats)',
      'Concept of pH and its importance'
    ],

    importantTopics: [
      'Alimentary canal structure (mouth to anus)',
      'Dental formula: 2123/2123',
      'Salivary amylase action and pH',
      'Gastric juice: HCl, pepsin, mucus, intrinsic factor',
      'Small intestine: Villi and microvilli structure',
      'Liver functions and bile composition',
      'Pancreatic enzymes: Amylase, trypsin, lipase',
      'Carbohydrate digestion pathway',
      'Protein digestion pathway',
      'Fat digestion and emulsification',
      'Glucose active transport mechanism',
      'Fat absorption via micelles and chylomicrons',
      'Gastrin, Secretin, CCK functions',
      'Large intestine: Water absorption, bacterial synthesis',
      'Common disorders: Jaundice, diarrhea, peptic ulcer'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 16',
    estimatedStudyMinutes: 390,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Human Digestive System',
        description: 'Complete alimentary canal from mouth to anus with associated glands'
      },
      {
        type: 'diagram',
        title: 'Villus Structure',
        description: 'Cross-section showing blood capillaries, lacteal, and epithelial cells'
      },
      {
        type: 'flowchart',
        title: 'Carbohydrate Digestion',
        description: 'Starch → Maltose → Glucose pathway with enzymes'
      },
      {
        type: 'flowchart',
        title: 'Protein Digestion',
        description: 'Proteins → Peptones → Peptides → Amino acids pathway'
      },
      {
        type: 'diagram',
        title: 'Fat Absorption Mechanism',
        description: 'Micelle formation, chylomicron packaging, and lymphatic transport'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Digestion and Absorption',
      estimatedStudyMinutes: 390,
      difficultyLevel: 4,
      status: 'published',

      learningObjectives: sql`EXCLUDED.learning_objectives`,


      prerequisites: sql`EXCLUDED.prerequisites`,


      importantTopics: sql`EXCLUDED.important_topics`,


      visualizationsData: sql`EXCLUDED.visualizations_data`
    }
  });

  console.log('✅ Biology Chapter 16: Digestion and Absorption seeded successfully!');
}

seedBiologyChapter16()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
