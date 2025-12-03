import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter2() {
  console.log('🧬 Seeding Biology Class 11 Chapter 2: Biological Classification...');

  const chapter = {
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 2,
    chapterTitle: 'Biological Classification',
    introduction: `Biological classification is the scientific process of organizing the vast diversity of life into hierarchical groups based on shared characteristics. This chapter explores the evolution of classification systems from two kingdoms to the modern five-kingdom system proposed by R.H. Whittaker. We'll study the unique features of each kingdom - Monera, Protista, Fungi, Plantae, and Animalia - understanding how organisms are grouped based on cell structure, mode of nutrition, body organization, and reproduction. This systematic arrangement not only helps us study organisms efficiently but also reveals evolutionary relationships among different life forms.`,

    detailedNotes: `## History of Classification Systems

### Early Classification Systems

**1. Aristotle's Classification (Ancient Greek)**
- Divided organisms into:
  - **Plants:** Herbs, Shrubs, Trees
  - **Animals:** With red blood (vertebrates), Without red blood (invertebrates)

**2. Two-Kingdom Classification (Linnaeus, 1758)**
- **Kingdom Plantae:** All plants
- **Kingdom Animalia:** All animals

**Limitations:**
- Didn't distinguish prokaryotes and eukaryotes
- Unicellular and multicellular grouped together
- Autotrophs and heterotrophs not separated
- Fungi placed with plants (incorrect)

### Five-Kingdom Classification (R.H. Whittaker, 1969)

**Most widely accepted system**

**Criteria for Classification:**
1. **Cell structure:** Prokaryotic vs. Eukaryotic
2. **Body organization:** Unicellular vs. Multicellular
3. **Mode of nutrition:** Autotrophic vs. Heterotrophic
4. **Reproduction:** Sexual vs. Asexual
5. **Phylogenetic relationships:** Evolutionary connections

**The Five Kingdoms:**
1. **Monera** - Prokaryotic, unicellular
2. **Protista** - Eukaryotic, mostly unicellular
3. **Fungi** - Eukaryotic, heterotrophic, decomposers
4. **Plantae** - Eukaryotic, multicellular, autotrophic
5. **Animalia** - Eukaryotic, multicellular, heterotrophic

## Kingdom Monera

**Characteristics:**
- **Cell type:** Prokaryotic (no membrane-bound nucleus)
- **Cell wall:** Present (peptidoglycan in bacteria)
- **Nutrition:** Autotrophic (chemosynthetic, photosynthetic) or Heterotrophic
- **Body organization:** Unicellular, but may form colonies
- **Size:** 0.1-5 μm (smallest cells)
- **Reproduction:** Asexual (binary fission), sexual (DNA transfer)

**Members:** Bacteria and Cyanobacteria (Blue-green algae)

### Bacteria

**Shape-based Classification:**

**1. Cocci (Spherical)**
- Single: Monococcus
- Pairs: Diplococcus
- Chains: Streptococcus
- Clusters: Staphylococcus
- Four cells: Tetrad
- Eight cells: Sarcina

**2. Bacilli (Rod-shaped)**
- Single: Bacillus
- Pairs: Diplobacilli
- Chains: Streptobacilli

**3. Vibrio (Comma-shaped)**
- Example: *Vibrio cholerae* (cholera)

**4. Spirilla (Spiral)**
- Example: *Spirillum*

**5. Spirochaetes (Tightly coiled)**
- Example: *Treponema pallidum* (syphilis)

**Nutrition in Bacteria:**

**1. Autotrophic:**
- **Photosynthetic:** Use light energy
  - Purple sulfur bacteria, Green sulfur bacteria
  - Don't produce oxygen (use H₂S instead of H₂O)
- **Chemosynthetic:** Use chemical energy
  - Nitrifying bacteria: *Nitrosomonas*, *Nitrobacter*
  - Sulfur bacteria: *Thiobacillus*

**2. Heterotrophic:**
- Decomposers (saprophytes): Most bacteria
- Parasites: Disease-causing bacteria
- Symbiotic: *Rhizobium* (nitrogen fixation in legumes)

**Reproduction:**
- Mainly **asexual** by binary fission
- **Sexual reproduction** by:
  - Transformation (DNA uptake)
  - Transduction (viral DNA transfer)
  - Conjugation (DNA transfer through pilus)

**Economic Importance:**

**Beneficial:**
- Nitrogen fixation (*Rhizobium*)
- Curd formation (*Lactobacillus*)
- Antibiotic production (*Streptomyces*)
- Sewage treatment
- Biogas production
- Genetic engineering

**Harmful:**
- Diseases: Cholera, typhoid, tuberculosis, tetanus
- Food spoilage

### Cyanobacteria (Blue-green Algae)

**Characteristics:**
- Prokaryotic, but photosynthetic
- Contain chlorophyll a (like plants)
- Phycocyanin (blue) and Phycoerythrin (red) pigments
- No flagella
- Cell wall with peptidoglycan
- Store food as glycogen

**Forms:**
- Unicellular: *Chroococcus*
- Colonial: *Microcystis*, *Nostoc*
- Filamentous: *Oscillatoria*, *Anabaena*, *Spirulina*

**Special Features:**

**Heterocysts:**
- Specialized cells for nitrogen fixation
- Thick-walled, lack photosynthesis
- Found in *Nostoc*, *Anabaena*

**Reproduction:**
- Asexual: Binary fission, fragmentation
- Spores: Akinetes (thick-walled resting spores)

**Importance:**
- Nitrogen fixation (increase soil fertility)
- Food: *Spirulina* (protein-rich)
- Pollution indicators
- Symbiosis with fungi (lichens)

### Mycoplasma

**Unique Features:**
- Smallest living cells (0.1-0.3 μm)
- No cell wall
- Pleomorphic (variable shape)
- Resistant to penicillin (lacks cell wall)
- Parasites in animals and plants

**Examples:**
- *Mycoplasma pneumoniae* (pneumonia)
- *Mycoplasma gallisepticum* (poultry disease)

## Kingdom Protista

**Characteristics:**
- **Cell type:** Eukaryotic
- **Organization:** Mostly unicellular, some multicellular
- **Cell wall:** Present in some (cellulose), absent in others
- **Nutrition:** Autotrophic or Heterotrophic
- **Locomotion:** Flagella, cilia, pseudopodia
- **Reproduction:** Asexual and sexual

**Members:** Protozoans, unicellular algae, slime molds

**"Link" organisms:** Show characteristics of both plants and animals

### Protozoans

**Four Groups (based on locomotion):**

**1. Flagellated Protozoans (Mastigophora)**
- **Locomotion:** Flagella
- **Examples:**
  - *Euglena* (has chloroplast, mixotrophic)
  - *Trypanosoma* (sleeping sickness)
  - *Giardia* (diarrhea)
  - *Trichomonas* (sexually transmitted disease)

**2. Amoeboid Protozoans (Sarcodina)**
- **Locomotion:** Pseudopodia (false feet)
- **Examples:**
  - *Amoeba proteus* (freshwater)
  - *Entamoeba histolytica* (amoebic dysentery)

**3. Ciliated Protozoans (Ciliophora)**
- **Locomotion:** Cilia
- **Examples:**
  - *Paramecium* (slipper-shaped, two nuclei)
  - *Vorticella* (bell-shaped)

**4. Sporozoans (Sporozoa)**
- **No locomotion** in adults
- All are **parasites**
- Form spores
- **Example:** *Plasmodium* (malaria)
  - Vector: Female *Anopheles* mosquito
  - Species: *P. vivax*, *P. falciparum*, *P. malariae*, *P. ovale*

### Chrysophytes (Golden Algae)

**Diatoms:**
- Unicellular, photosynthetic
- **Cell wall:** Silica (glass-like), two overlapping halves (like soap box)
- **Pigments:** Chlorophyll a, c, fucoxanthin (golden-brown)
- **Food storage:** Oil droplets
- Found in freshwater and marine
- **Chief producers** in oceans

**Diatomaceous earth (Diatomite):**
- Formed by silica shells of dead diatoms
- Uses: Filtration, polishing, insulation

**Desmids:**
- Green algae found in freshwater

### Dinoflagellates

**Characteristics:**
- Mostly marine, photosynthetic
- **Cell wall:** Cellulose plates
- **Flagella:** Two (one longitudinal, one transverse)
- **Pigments:** Chlorophyll a, c, xanthophylls
- **Bioluminescent** (glow in dark)

**Examples:**
- *Gonyaulax* (red tide)
- *Noctiluca* (sea sparkle)

**Red Tides:**
- Rapid multiplication of red dinoflagellates
- Produce toxins → fish mortality
- Water appears red

### Euglenoids

**Characteristics:**
- Freshwater organisms
- **No cell wall** (protein-rich pellicle)
- **Flagella:** Two (one short, one long)
- **Nutrition:** Mixotrophic (photosynthetic + heterotrophic)
- **Pigments:** Chlorophyll a, b
- **Food storage:** Paramylon (carbohydrate)
- **Eyespot:** Photoreceptor

**Example:** *Euglena viridis*

### Slime Molds

**Characteristics:**
- Saprophytic protists
- Feed on decaying organic matter
- Form plasmodium (multinucleate mass)
- Produce spores in adverse conditions

**Types:**
- **Plasmodial slime molds:** *Physarum*
- **Cellular slime molds:** *Dictyostelium*

**Life cycle:** Vegetative phase (feeding) → Reproductive phase (spore formation)

## Kingdom Fungi

**Characteristics:**
- **Cell type:** Eukaryotic
- **Organization:** Mostly multicellular (except yeast)
- **Cell wall:** Chitin (unlike plants with cellulose)
- **Nutrition:** Heterotrophic (absorptive)
  - Saprophytic (decomposers) - most
  - Parasitic (disease-causing)
  - Symbiotic (lichens, mycorrhizae)
- **Body structure:** Mycelium (mass of hyphae)
- **Reproduction:** Spores (asexual and sexual)

**Hyphae:**
- Thread-like filaments
- **Coenocytic:** Multinucleate, no septa (e.g., *Mucor*)
- **Septate:** With cross-walls (e.g., *Penicillium*)

### Classification of Fungi

**1. Phycomycetes (Lower Fungi)**
- **Habitat:** Aquatic or moist terrestrial
- **Mycelium:** Coenocytic (aseptate)
- **Reproduction:**
  - Asexual: Zoospores (motile) or Aplanospores (non-motile)
  - Sexual: Oospores
- **Examples:**
  - *Mucor* (bread mold)
  - *Rhizopus* (black bread mold)
  - *Albugo* (white rust on mustard)

**2. Ascomycetes (Sac Fungi)**
- **Mycelium:** Branched, septate
- **Asexual spores:** Conidia
- **Sexual spores:** Ascospores (in sac-like ascus)
- **Ascocarp:** Fruiting body containing asci
- **Examples:**
  - *Aspergillus* (food spoilage, aflatoxin)
  - *Penicillium* (antibiotic production, cheese ripening)
  - *Claviceps* (ergot - causes disease in rye)
  - *Neurospora* (used in genetics - one gene-one enzyme)
  - Yeasts: *Saccharomyces* (baking, brewing)
  - Morels, truffles (edible)

**3. Basidiomycetes (Club Fungi)**
- **Mycelium:** Branched, septate
- **Asexual spores:** Generally absent
- **Sexual spores:** Basidiospores (on club-shaped basidium)
- **Basidiocarp:** Fruiting body (mushroom)
- **Examples:**
  - *Agaricus* (mushroom - edible)
  - *Ustilago* (smut on corn)
  - *Puccinia* (rust on wheat)
  - Puffballs, bracket fungi

**4. Deuteromycetes (Imperfect Fungi)**
- **Sexual reproduction:** Not observed
- Only asexual reproduction known
- **Examples:**
  - *Alternaria* (leaf spot)
  - *Colletotrichum* (anthracnose)
  - *Trichoderma* (biocontrol agent)

**Note:** When sexual stage is discovered, moved to appropriate class

### Reproduction in Fungi

**1. Vegetative:**
- Fragmentation
- Fission (yeast)
- Budding (yeast)

**2. Asexual:**
- Spores: Zoospores, conidia, sporangiospores

**3. Sexual:**
- Plasmogamy (fusion of protoplasm)
- Karyogamy (fusion of nuclei)
- Meiosis → Spore formation
- Spores: Oospores, ascospores, basidiospores

### Economic Importance of Fungi

**Beneficial:**
- Food: Mushrooms, morels, truffles
- Cheese ripening: *Penicillium roqueforti*
- Baking and brewing: Yeast (*Saccharomyces*)
- Antibiotics: Penicillin (*Penicillium*)
- Enzymes: Amylases, proteases
- Organic acids: Citric acid, gluconic acid
- Biocontrol: *Trichoderma*
- Research: *Neurospora* (genetics)

**Harmful:**
- Plant diseases: Rusts, smuts, mildews
- Food spoilage: *Aspergillus*, *Mucor*
- Mycotoxins: Aflatoxin (carcinogenic)
- Human diseases: Ringworm, athlete's foot

### Symbiotic Associations

**1. Lichens**
- Symbiotic association between **fungus** (mycobiont) and **algae/cyanobacteria** (phycobiont)
- Fungus provides: Shelter, water, minerals
- Algae provides: Food (photosynthesis)
- **Pollution indicators** (sensitive to SO₂)
- **Pioneer species** (colonize bare rocks)

**Types (based on morphology):**
- Crustose: Crust-like (*Graphis*)
- Foliose: Leaf-like (*Parmelia*)
- Fruticose: Branched (*Usnea*, *Cladonia*)

**2. Mycorrhizae**
- Symbiotic association between fungi and plant roots
- Fungus provides: Water, minerals (especially phosphorus)
- Plant provides: Carbohydrates
- **Types:**
  - Ectomycorrhizae: Fungus outside root cells
  - Endomycorrhizae: Fungus inside root cells

**Importance:**
- Increase plant growth
- Improve nutrient uptake
- Protect against pathogens
- Essential for forest ecosystems

## Viruses, Viroids, Prions, and Lichens

### Viruses

**Characteristics:**
- **Not included in any kingdom** (neither living nor non-living)
- Crystallizable (like chemicals)
- Show characteristics of living only inside host
- **Size:** 20-300 nm (smaller than bacteria)
- **Structure:** Protein coat (capsid) + Genetic material (DNA or RNA, never both)
- **Obligate parasites:** Cannot reproduce outside host

**Discovery:**
- **D.J. Ivanowsky** (1892): Tobacco mosaic virus (TMV)
- **M.W. Beijerinck** (1898): Coined term "virus"
- **W.M. Stanley** (1935): Crystallized TMV

**Classification:**

**1. Based on genetic material:**
- DNA viruses: Bacteriophages, pox virus, adenovirus
- RNA viruses: TMV, influenza, polio, HIV

**2. Based on host:**
- Plant viruses: TMV, potato virus
- Animal viruses: Influenza, HIV, polio
- Bacterial viruses: Bacteriophages

**Diseases caused:**
- Plants: Mosaic diseases, leaf curl
- Animals: Flu, AIDS, polio, measles, chickenpox, rabies, COVID-19

**Bacteriophages:**
- Viruses that infect bacteria
- T2, T4 phages
- Used in molecular biology research

### Viroids

- **Discovered:** T.O. Diener (1971)
- Even smaller than viruses
- **Only RNA** (no protein coat)
- Cause plant diseases
- Example: Potato spindle tuber disease

### Prions

- **Discovered:** Stanley Prusiner (1982, Nobel Prize 1997)
- **Infectious proteins** (no nucleic acid)
- Cause brain diseases
- Examples: Mad cow disease, Creutzfeldt-Jakob disease in humans

## Importance of Classification

1. Systematic study of organisms
2. Identification of organisms
3. Evolution and phylogeny
4. Conservation strategies
5. Understanding ecological relationships
6. Economic importance determination`,

    keyConcepts: [
      'Five-kingdom classification: Monera, Protista, Fungi, Plantae, Animalia (R.H. Whittaker, 1969)',
      'Monera: prokaryotic, unicellular (bacteria, cyanobacteria)',
      'Protista: eukaryotic, mostly unicellular (protozoans, algae)',
      'Fungi: eukaryotic, chitin cell wall, heterotrophic decomposers',
      'Bacteria shapes: cocci, bacilli, vibrio, spirilla, spirochaetes',
      'Protozoans: flagellated, amoeboid, ciliated, sporozoans (Plasmodium)',
      'Fungi groups: Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes',
      'Lichens: symbiosis between fungus and algae/cyanobacteria',
      'Mycorrhizae: fungus-root symbiosis for nutrient exchange',
      'Viruses: non-cellular, protein coat + nucleic acid, obligate parasites',
      'Cyanobacteria: prokaryotic photosynthetic organisms with heterocysts'
    ],

    formulas: [
      'Five Kingdoms: Monera → Protista → Fungi → Plantae → Animalia',
      'Virus structure: Protein coat (capsid) + Nucleic acid (DNA or RNA)',
      'Lichen: Fungus (mycobiont) + Algae/Cyanobacteria (phycobiont)',
      'Mycorrhizae: Fungus + Plant root symbiosis'
    ],

    learningObjectives: [
      'Describe the evolution of classification systems',
      'Explain R.H. Whittaker\'s five-kingdom classification',
      'Identify characteristics of Kingdom Monera and its members',
      'Differentiate between bacteria and cyanobacteria',
      'Classify protozoans based on locomotion',
      'Understand the unique features of Kingdom Fungi',
      'Describe classification and reproduction in fungi',
      'Explain symbiotic associations: lichens and mycorrhizae',
      'Understand the structure and characteristics of viruses',
      'Compare viruses, viroids, and prions'
    ],

    prerequisites: [
      'Basic cell structure (Chapter 1)',
      'Understanding of prokaryotic vs eukaryotic cells',
      'Knowledge of autotrophic and heterotrophic nutrition',
      'Familiarity with basic biological processes'
    ],

    importantTopics: [
      'Five-kingdom classification by R.H. Whittaker (1969)',
      'Kingdom Monera: bacteria (cocci, bacilli, vibrio, spirilla) and cyanobacteria',
      'Bacteria nutrition: autotrophic (photosynthetic, chemosynthetic) vs heterotrophic',
      'Cyanobacteria: heterocysts for nitrogen fixation',
      'Kingdom Protista: protozoans (flagellated, amoeboid, ciliated, sporozoans)',
      'Plasmodium: malaria parasite, vector is female Anopheles mosquito',
      'Kingdom Fungi: chitin cell wall, heterotrophic, saprophytic/parasitic',
      'Fungi classification: Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes',
      'Lichens: fungus + algae symbiosis, pollution indicators',
      'Mycorrhizae: fungus + root association for nutrient exchange',
      'Viruses: non-cellular, capsid + nucleic acid, obligate parasites',
      'Viroids (RNA only) and Prions (infectious proteins)'
    ],

    ncertChapterRef: 'Chapter 2, Pages 13-34',

    difficultyLevel: 3,
    estimatedStudyMinutes: 240,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Five-Kingdom Classification',
        description: 'Interactive diagram showing characteristics of Monera, Protista, Fungi, Plantae, and Animalia'
      },
      {
        type: 'concept',
        title: 'Bacteria Shapes',
        description: '3D models of cocci, bacilli, vibrio, spirilla, and spirochaetes with examples'
      },
      {
        type: 'concept',
        title: 'Virus Structure',
        description: 'Detailed view of viral capsid and nucleic acid core with bacteriophage example'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Biology Chapter 2: Biological Classification seeded successfully');
}

seedBiologyChapter2()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
