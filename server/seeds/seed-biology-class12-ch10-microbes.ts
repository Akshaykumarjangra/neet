import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter10() {
  console.log('Seeding Biology Class 12 Chapter 10: Microbes in Human Welfare...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 10,
    chapterTitle: 'Microbes in Human Welfare',
    introduction: `Microorganisms, despite their microscopic size, play enormous beneficial roles in human life - from food production to medicine, agriculture to environmental cleanup. This chapter explores how bacteria, fungi, and other microbes are harnessed for industrial fermentation, antibiotic production, sewage treatment, biogas generation, and biological pest control. Understanding microbial applications is crucial for NEET as it connects microbiology with biotechnology, medicine, and environmental science.`,

    detailedNotes: `
# Microbes in Human Welfare

## Introduction

**Microbes**: Microscopic organisms including bacteria, fungi, protozoans, viruses, algae

**Benefits**:
- Food and beverage production
- Antibiotic and medicine production
- Nutrient recycling in ecosystems
- Sewage treatment
- Biogas and biofuel production
- Biofertilizers and biopesticides

## Microbes in Household Products

### 1. Dairy Products

**A. Curd (Yogurt)**
- Microbe: **Lactobacillus** (Lactic Acid Bacteria - LAB)
- Process: Converts lactose (milk sugar) → lactic acid
- Lactic acid coagulates milk proteins → curd formation
- Benefits: Improves nutritional quality, vitamin B12

**B. Cheese**
- Microbe: Specific bacteria and fungi
- **Roquefort cheese**: Blue-green color from *Penicillium roqueforti* (fungus)
- **Swiss cheese**: Holes from *Propionibacterium shermanii* (produces CO₂)
- **Cheddar**: *Lactococcus lactis*
- Process: Fermentation of milk, aging develops flavor

**C. Buttermilk**
- LAB fermentation of milk

### 2. Bread

- Microbe: **Saccharomyces cerevisiae** (Baker's yeast)
- Process: Yeast ferments sugars → CO₂ + Ethanol
- CO₂ makes dough rise (puffed texture)
- Ethanol evaporates during baking

### 3. Alcoholic Beverages

**Fermentation**: Conversion of sugars to ethanol and CO₂ by yeast (anaerobic respiration)

**A. Beer**
- Microbe: *Saccharomyces cerevisiae*
- Raw material: Barley (malted)
- Process: 
  1. Malting (germination of barley)
  2. Mashing (starch → sugars)
  3. Fermentation by yeast
  4. Aging and filtering

**B. Wine**
- Microbe: *Saccharomyces cerevisiae*
- Raw material: Grapes
- Process: Grape juice fermented by natural yeast on grape skin
- Types: Red (with skin), White (without skin)

**C. Whisky, Rum, Brandy**
- Distilled alcoholic beverages
- Higher alcohol content (40-50%) than wine (10-15%) or beer (3-6%)
- **Rum**: From molasses (sugarcane)
- **Whisky**: From grains (barley, wheat)
- **Brandy**: From fruits (grapes)

### 4. Organic Acids, Enzymes

**Citric Acid**
- Microbe: *Aspergillus niger* (fungus)
- Uses: Food preservative, flavoring, soft drinks

**Acetic Acid (Vinegar)**
- Microbe: *Acetobacter aceti* (bacterium)
- Process: Oxidation of ethanol → acetic acid
- Uses: Food preservation, pickling

**Enzymes**
- **Lipases**: Fat digestion (detergents, cheese making)
- **Pectinases**: Fruit juice clarification
- **Streptokinase**: Produced by *Streptococcus*, dissolves blood clots

## Microbes in Industrial Products

### Antibiotics

**Definition**: Chemical substances produced by microorganisms that kill or inhibit growth of other microorganisms

**Penicillin** (First antibiotic, 1928)
- Discovered by: **Alexander Fleming**
- Microbe: *Penicillium notatum* (fungus)
- Mechanism: Inhibits bacterial cell wall synthesis
- Uses: Treats bacterial infections (pneumonia, strep throat)
- Production: Large-scale fermentation

**Other Important Antibiotics**:

| Antibiotic | Microbe | Type |
|------------|---------|------|
| **Streptomycin** | *Streptomyces griseus* | Bacterium (Actinomycete) |
| **Tetracycline** | *Streptomyces aureofaciens* | Bacterium |
| **Chloramphenicol** | *Streptomyces venezuelae* | Bacterium |
| **Erythromycin** | *Streptomyces erythreus* | Bacterium |
| **Neomycin** | *Streptomyces fradiae* | Bacterium |

**Note**: Many antibiotics produced by **Streptomyces** (soil bacteria)

### Chemicals and Bioactive Molecules

**1. Cyclosporin A**
- Microbe: *Trichoderma polysporum* (fungus)
- Use: **Immunosuppressant** (prevents organ transplant rejection)
- Mechanism: Suppresses T-cell immune response

**2. Statins**
- Example: **Lovastatin**
- Microbe: *Monascus purpureus* (yeast)
- Use: **Lowers blood cholesterol** (inhibits cholesterol synthesis)
- Reduces risk of heart disease

**3. Ethanol (Industrial)**
- Microbe: *Saccharomyces cerevisiae*
- Uses: Fuel (biofuel), solvent, antiseptic
- **Gasohol**: Mixture of gasoline and ethanol (10-20% ethanol)

## Microbes in Sewage Treatment

**Sewage**: Wastewater from homes, industries (contains organic matter, pathogens, pollutants)

**Goal**: Remove pollutants, make water safe for release into environment

### Primary Treatment (Physical)

**Steps**:
1. **Screening**: Remove large debris (plastics, sticks)
2. **Grit removal**: Settle sand, gravel
3. **Sedimentation**: Settle suspended solids
   - Settles as **primary sludge**
   - Supernatant → Secondary treatment

### Secondary Treatment (Biological)

**Uses aerobic microbes to decompose organic matter**

**Steps**:
1. **Aeration tank**: 
   - Sewage mixed with air and aerobic bacteria
   - **Flocs** form: Bacterial masses with fungal filaments
   - Bacteria oxidize organic matter
   - BOD (Biological Oxygen Demand) decreases

2. **Sedimentation tank**:
   - Flocs settle as **activated sludge**
   - Part of activated sludge recycled to aeration tank (seed for next batch)
   - Supernatant (effluent) released or used for irrigation

### Anaerobic Sludge Digestion

- Primary + excess activated sludge → **Anaerobic sludge digester**
- **Anaerobic bacteria** decompose organic matter
- Produces: 
  - **Biogas** (methane, CO₂, H₂S)
  - **Digested sludge** (used as manure)

**Biogas production**:
- CH₄ (50-70%), CO₂ (30-40%), traces of H₂, H₂S
- Used as fuel

### BOD (Biological Oxygen Demand)

**Definition**: Amount of oxygen required by microorganisms to decompose organic matter in water

- **High BOD** = Highly polluted water (more organic waste)
- **Low BOD** = Clean water
- Sewage treatment reduces BOD

## Biogas

**Definition**: Mixture of gases (mainly methane) produced by anaerobic decomposition of organic waste

**Composition**: CH₄ (50-70%), CO₂ (30-40%), traces of H₂S, H₂

**Biogas Plant (Gobar Gas Plant)**

**Components**:
1. **Mixing tank**: Mix cow dung with water
2. **Digester**: Anaerobic decomposition by methanogenic bacteria
3. **Gas holder**: Collects biogas
4. **Outlet**: Spent slurry (used as manure)

**Microbes**:
- **Methanobacterium** (methanogenic bacteria)
- Anaerobic bacteria produce organic acids → methanogens convert to CH₄

**Advantages**:
- Clean, renewable fuel (cooking, lighting)
- Reduces dependency on fossil fuels
- Provides organic manure (nitrogen-rich)
- Reduces environmental pollution
- Waste management (animal dung, agricultural waste)

**Disadvantages**:
- Initial setup cost
- Requires regular feeding
- Less efficient in cold climates

## Microbes as Biocontrol Agents

**Biocontrol**: Use of biological methods (microbes, predators) to control pests instead of chemical pesticides

**Advantages over chemical pesticides**:
- Environment-friendly
- No chemical residues
- Specific to target pest (doesn't harm beneficial organisms)
- No resistance development

### Examples

**1. Bacillus thuringiensis (Bt)**
- Bacterium used to control insect pests
- Produces **Bt toxin** (protein crystals)
- Mechanism:
  - Inactive toxin in bacterial spore
  - In alkaline gut of insect larvae → toxin activated
  - Toxin creates pores in gut epithelium
  - Larvae die
- **Bt crops**: Genes for Bt toxin inserted into crops (cotton, corn, tomato)
  - **Bt cotton**: Resistant to bollworms
- Does NOT harm humans, animals, beneficial insects

**2. Trichoderma**
- Fungus living in plant roots (symbiotic)
- Controls several plant pathogens
- Improves plant growth, nutrient uptake

**3. Baculoviruses**
- Viruses that infect insects and arthropods
- Species-specific (narrow spectrum)
- **Nucleopolyhedrovirus (NPV)**:
  - Controls insects like caterpillars
  - Example: *Helicoverpa* NPV (controls Helicoverpa caterpillar on cotton)

**4. Ladybird beetles**
- Biological control of aphids (not microbes, but biological control example)

## Microbes as Biofertilizers

**Biofertilizers**: Living microorganisms that enrich soil nutrients

**Advantages**:
- Eco-friendly, sustainable
- Improve soil fertility
- Reduce chemical fertilizer use
- Cost-effective

### Types

**1. Nitrogen-Fixing Bacteria**

**A. Rhizobium**
- Symbiotic relationship with **legume roots** (pea, bean, gram, soybean)
- Forms **root nodules**
- Fixes atmospheric nitrogen → ammonia (usable by plants)
- **Nitrogenase enzyme** converts N₂ → NH₃
- Plants provide carbohydrates; bacteria provide nitrogen

**B. Azotobacter, Azospirillum**
- **Free-living** nitrogen-fixing bacteria in soil
- Don't form nodules
- Benefit non-legume crops

**C. Anabaena (Cyanobacteria)**
- Lives in **Azolla** (aquatic fern)
- Symbiotic nitrogen fixation
- Used in rice fields (Azolla-Anabaena association)

**2. Phosphorus-Solubilizing Bacteria**
- Convert insoluble phosphorus → soluble form
- Example: *Bacillus*, *Pseudomonas*

**3. Mycorrhiza**
- **Symbiotic association** between fungus and plant roots
- Fungal hyphae increase surface area for nutrient absorption
- Absorbs phosphorus, minerals, water
- Example: *Glomus*
- Benefits: Improved plant growth, drought resistance

**4. Cyanobacteria (Blue-Green Algae)**
- **Nostoc**, **Anabaena**, **Oscillatoria**
- Fix atmospheric nitrogen
- Add organic matter to soil
- Used as biofertilizers in rice fields

## Microbes in Biogas Production

**Cattle Dung (Gobar)**:
- Contains cellulose, organic matter
- Rich source for biogas production
- Microbes: Methanogenic bacteria

**Process**: (Already described in Biogas section above)

## Summary Points

1. LAB bacteria produce curd from milk; yeast produces bread, beer, and wine through fermentation
2. Antibiotics like penicillin (from *Penicillium*) and streptomycin (from *Streptomyces*) treat bacterial infections
3. Sewage treatment uses aerobic microbes in secondary treatment to reduce BOD
4. Biogas (methane) is produced by anaerobic bacteria from organic waste in biogas plants
5. Biocontrol agents like *Bt* bacteria and baculoviruses control insect pests without chemicals
6. Biofertilizers like *Rhizobium* (nitrogen fixation) and mycorrhiza (phosphorus absorption) enrich soil
7. Cyclosporin A (immunosuppressant) and statins (cholesterol-lowering) are produced by microbes
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Fermentation Setup',
        description: 'Microbe, substrate, and product flow.'
      },
      {
        type: 'flowchart',
        title: 'Biogas Production',
        description: 'Organic waste -> anaerobic digestion -> methane.'
      },
      {
        type: 'table',
        title: 'Microbes and Products',
        description: 'Bacteria, fungi, and their uses.'
      },
      {
        type: 'comparison',
        title: 'Antibiotics vs Enzymes',
        description: 'Use cases and production.'
      },
      {
        type: 'graph',
        title: 'Microbial Growth Curve',
        description: 'Lag, log, stationary, decline phases.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Microbes in Human Welfare',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Fermentation Setup',
          description: 'Microbe, substrate, and product flow.'
        },
        {
          type: 'flowchart',
          title: 'Biogas Production',
          description: 'Organic waste -> anaerobic digestion -> methane.'
        },
        {
          type: 'table',
          title: 'Microbes and Products',
          description: 'Bacteria, fungi, and their uses.'
        },
        {
          type: 'comparison',
          title: 'Antibiotics vs Enzymes',
          description: 'Use cases and production.'
        },
        {
          type: 'graph',
          title: 'Microbial Growth Curve',
          description: 'Lag, log, stationary, decline phases.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 10: Microbes in Human Welfare');
}

seedBiologyClass12Chapter10().catch(console.error);
