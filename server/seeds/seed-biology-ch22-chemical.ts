import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter22() {
  console.log('Seeding Biology Class 11 Chapter 22: Chemical Coordination and Integration...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 22,
    chapterTitle: 'Chemical Coordination and Integration',
    introduction: `The endocrine system provides chemical coordination through hormones - chemical messengers secreted directly into the bloodstream. Unlike the nervous system's rapid electrical signals, hormonal control is slower but longer-lasting, regulating growth, metabolism, reproduction, and homeostasis. The intricate interplay between various endocrine glands maintains the body's internal equilibrium. Understanding endocrine function is crucial for medicine, as hormonal imbalances cause numerous disorders from diabetes to thyroid diseases. This chapter explores endocrine glands, major hormones, their mechanisms of action, regulation through feedback loops, and common endocrine disorders.`,

    detailedNotes: `
# Chemical Coordination and Integration

## Endocrine System Overview

**Chemical Coordination**: Regulation by hormones

**Comparison: Nervous vs Endocrine Control**

| Feature | Nervous System | Endocrine System |
|---------|----------------|------------------|
| **Signal type** | Electrical (nerve impulses) | Chemical (hormones) |
| **Speed** | Very fast (ms) | Slower (seconds to hours) |
| **Duration** | Brief | Long-lasting |
| **Target** | Specific (neurons, muscles) | Widespread (via blood) |
| **Examples** | Reflex, muscle contraction | Growth, metabolism, reproduction |

## Hormones

**Definition**: Chemical messengers secreted by endocrine glands into bloodstream

**Characteristics:**
- Secreted in small amounts
- Transported by blood
- Act on distant target organs/cells
- Specific receptors on target cells
- Regulate physiological processes

**Chemical Nature:**

**1. Peptide/Protein Hormones** (water-soluble)
- Chains of amino acids
- Cannot cross cell membrane
- Bind to surface receptors → Second messenger system
- Examples: Insulin, growth hormone, ADH, oxytocin

**2. Steroid Hormones** (lipid-soluble)
- Derived from cholesterol
- Cross cell membrane easily
- Bind to intracellular receptors → Gene transcription
- Examples: Cortisol, testosterone, estrogen, progesterone

**3. Amino Acid Derivatives**
- Examples: Thyroxine (from tyrosine), Epinephrine (from tyrosine)

### Mechanism of Hormone Action

**Peptide Hormones (Second Messenger Model):**
1. Hormone binds to receptor on cell surface
2. Activates G-protein or enzyme
3. Generates second messenger (cAMP, IP₃, Ca²⁺)
4. Second messenger activates protein kinases
5. Cellular response (enzyme activation, gene expression)

**Steroid Hormones:**
1. Hormone diffuses through cell membrane
2. Binds to intracellular receptor (cytoplasm or nucleus)
3. Hormone-receptor complex binds to DNA
4. Alters gene transcription
5. New protein synthesis → Cellular response

## Endocrine Glands

**Endocrine glands**: Ductless, secrete directly into blood

**Exocrine glands**: Have ducts (e.g., salivary, sweat glands)

**Mixed glands**: Both endocrine and exocrine (e.g., pancreas, gonads)

## 1. Hypothalamus

**Location**: Base of brain (diencephalon)

**Nature**: Neural + endocrine (neuroendocrine)

**Functions:**
- Links nervous and endocrine systems
- Controls pituitary gland
- Regulates homeostasis

**Hormones Secreted:**

**A. Releasing Hormones** (stimulate anterior pituitary):
- **GnRH** (Gonadotropin-releasing hormone): Stimulates FSH, LH release
- **TRH** (Thyrotropin-releasing hormone): Stimulates TSH release
- **CRH** (Corticotropin-releasing hormone): Stimulates ACTH release
- **GHRH** (Growth hormone-releasing hormone): Stimulates GH release

**B. Inhibiting Hormones** (inhibit anterior pituitary):
- **Somatostatin** (GHIH): Inhibits GH release
- **Dopamine** (PIH - Prolactin-inhibiting hormone): Inhibits prolactin release

**C. Hormones Stored in Posterior Pituitary:**
- Oxytocin
- ADH (Vasopressin)

## 2. Pituitary Gland (Hypophysis)

**Location**: Sella turcica (bony cavity in sphenoid bone), base of brain

**Size**: Pea-sized

**Connection**: Attached to hypothalamus by pituitary stalk (infundibulum)

**Nickname**: "Master gland" (controls other endocrine glands)

**Two Parts:**

### A. Anterior Pituitary (Adenohypophysis)

**Hormones:**

**1. Growth Hormone (GH / Somatotropin)**
- **Target**: All cells (especially bones, muscles)
- **Functions**:
  - Promotes growth (bones, muscles)
  - Protein synthesis
  - Fat mobilization
  - Glucose sparing (anti-insulin effect)
- **Hyposecretion (children)**: **Dwarfism** (proportionate short stature)
- **Hypersecretion**:
  - Children: **Gigantism** (excessive growth)
  - Adults: **Acromegaly** (enlarged hands, feet, jaw)

**2. Thyroid-Stimulating Hormone (TSH / Thyrotropin)**
- **Target**: Thyroid gland
- **Function**: Stimulates T₃ and T₄ secretion
- Regulated by TRH (hypothalamus) and negative feedback from T₃/T₄

**3. Adrenocorticotropic Hormone (ACTH / Corticotropin)**
- **Target**: Adrenal cortex
- **Function**: Stimulates cortisol secretion
- Regulated by CRH (hypothalamus) and negative feedback from cortisol

**4. Follicle-Stimulating Hormone (FSH)**
- **Target**: Gonads (testes, ovaries)
- **Functions**:
  - **Females**: Stimulates ovarian follicle growth, estrogen secretion
  - **Males**: Stimulates spermatogenesis in testes
- Gonadotropin (acts on gonads)

**5. Luteinizing Hormone (LH)**
- **Target**: Gonads
- **Functions**:
  - **Females**: Triggers ovulation, stimulates corpus luteum formation, progesterone secretion
  - **Males**: Stimulates testosterone secretion (also called ICSH - Interstitial Cell-Stimulating Hormone)
- Gonadotropin

**6. Prolactin (PRL)**
- **Target**: Mammary glands
- **Function**: Stimulates milk production (lactation) after childbirth
- High during pregnancy and nursing
- Inhibited by dopamine (PIH)

### B. Posterior Pituitary (Neurohypophysis)

**Nature**: Stores and releases hormones made by hypothalamus

**Hormones:**

**1. Oxytocin**
- **Targets**: Uterus, mammary glands
- **Functions**:
  - **Uterus**: Stimulates contractions during childbirth (parturition)
  - **Mammary glands**: Milk ejection (let-down reflex) during nursing
- Released in response to suckling, cervical stretch
- **"Love hormone"** - released during bonding, social interactions

**2. Antidiuretic Hormone (ADH / Vasopressin)**
- **Target**: Kidney (collecting ducts)
- **Functions**:
  - **Increases water reabsorption** → Concentrated urine, reduced urine volume
  - Vasoconstriction (high doses) → Increased blood pressure
- **Stimulus**: High blood osmolarity (dehydration), low blood volume
- **Hyposecretion**: **Diabetes insipidus** (excessive dilute urine, extreme thirst)

## 3. Pineal Gland

**Location**: Roof of third ventricle (epithalamus)

**Hormone**: **Melatonin**

**Functions:**
- Regulates **sleep-wake cycle** (circadian rhythm)
- **Seasonal reproduction** in some animals
- Inhibits sexual development (children)
- Antioxidant properties

**Secretion**: Increased by darkness (night), decreased by light (day)

**Regulation**: Light detected by retina → Signal to pineal

## 4. Thyroid Gland

**Location**: Neck, below larynx, wraps around trachea

**Structure**: Two lateral lobes connected by isthmus

**Follicles**: Filled with colloid (contains thyroglobulin)

**Hormones:**

### A. Thyroxine (T₄) and Triiodothyronine (T₃)

**Synthesis**: Requires **iodine** (from diet)

**Functions:**
- **Basal Metabolic Rate (BMR)**: Increases O₂ consumption, heat production
- **Growth and development**: Essential for normal physical and mental development
- **Protein synthesis**: Promotes anabolic processes
- **CNS development**: Critical for brain development (especially fetal and childhood)

**Regulation**: **Negative feedback loop**
- Low T₃/T₄ → Hypothalamus releases TRH → Pituitary releases TSH → Thyroid releases T₃/T₄
- High T₃/T₄ → Inhibits TRH and TSH release

**Disorders:**

**Hypothyroidism (Low T₃/T₄):**
- **Cretinism** (children):
  - Mental retardation
  - Stunted growth
  - Delayed sexual development
- **Myxedema** (adults):
  - Puffy face, hands
  - Low BMR (weight gain, fatigue, cold intolerance)
  - Sluggishness, depression

**Hyperthyroidism (High T₃/T₄):**
- **Graves' disease**:
  - High BMR (weight loss, heat intolerance, sweating)
  - **Exophthalmos** (protruding eyes)
  - **Goiter** (enlarged thyroid)
  - Nervousness, irritability, rapid heart rate

**Goiter**: Enlarged thyroid
- **Simple (Endemic) goiter**: Iodine deficiency → TSH remains high → Thyroid enlarges
- **Exophthalmic goiter**: Hyperthyroidism (Graves' disease)

### B. Calcitonin (Thyrocalcitonin)

**Secreted by**: Parafollicular cells (C cells) of thyroid

**Target**: Bone, kidneys

**Function**: **Lowers blood Ca²⁺** levels
- Inhibits osteoclast activity (reduces bone resorption)
- Increases Ca²⁺ excretion by kidneys

**Regulation**: High blood Ca²⁺ → Calcitonin release

**Antagonist**: Parathyroid hormone (PTH)

## 5. Parathyroid Glands

**Number**: 4 small glands

**Location**: Posterior surface of thyroid gland

**Hormone**: **Parathyroid Hormone (PTH / Parathormone)**

**Function**: **Increases blood Ca²⁺** levels (opposite of calcitonin)

**Mechanisms:**
1. **Bones**: Stimulates osteoclasts → Bone resorption → Ca²⁺ release
2. **Kidneys**: Increases Ca²⁺ reabsorption, decreases phosphate reabsorption
3. **Intestine**: Indirectly increases Ca²⁺ absorption (via Vitamin D activation)

**Regulation**: Low blood Ca²⁺ → PTH release

**Disorders:**
- **Hypoparathyroidism**: Low Ca²⁺ → **Tetany** (muscle spasms, convulsions)
- **Hyperparathyroidism**: High Ca²⁺ → Weak bones, kidney stones

## 6. Thymus

**Location**: Behind sternum, above heart

**Size**: Large in children, shrinks after puberty (atrophies)

**Hormone**: **Thymosin**

**Function**: 
- **Maturation of T lymphocytes** (T cells)
- Immune system development
- Important in childhood

## 7. Adrenal Glands (Suprarenal Glands)

**Location**: On top of each kidney (suprarenal)

**Structure**: Two parts

### A. Adrenal Cortex (Outer region)

**Three Zones** (outer to inner):

**1. Zona Glomerulosa** → **Mineralocorticoids**

**Aldosterone:**
- **Target**: Kidney (DCT, collecting duct)
- **Function**: **Increases Na⁺ reabsorption**, K⁺ excretion
  - Water follows Na⁺ → Increases blood volume and pressure
- **Regulation**: RAAS (Renin-Angiotensin-Aldosterone System)
- **Hyposecretion**: **Addison's disease** (low Na⁺, low BP, dehydration, hyperpigmentation)

**2. Zona Fasciculata** → **Glucocorticoids**

**Cortisol:**
- **Functions**:
  - **Gluconeogenesis**: Increases blood glucose (from proteins, fats)
  - **Anti-inflammatory**: Suppresses immune response
  - **Stress response**: Released during stress
  - **Protein catabolism**, fat mobilization
- **Regulation**: ACTH (from pituitary)
- **Hypersecretion**: **Cushing's syndrome** (moon face, buffalo hump, hyperglycemia, obesity)

**3. Zona Reticularis** → **Androgens** (Sex hormones)

**Dehydroepiandrosterone (DHEA):**
- Weak male sex hormones
- Converted to testosterone/estrogen in peripheral tissues
- Role in puberty, secondary sexual characteristics

### B. Adrenal Medulla (Inner region)

**Nature**: Neural tissue, modified sympathetic ganglia

**Hormones**: **Catecholamines**

**1. Epinephrine (Adrenaline) (~80%)**
**2. Norepinephrine (Noradrenaline) (~20%)**

**Functions**: **"Fight or Flight" response** (emergency hormones)
- **Cardiovascular**: Increases heart rate, cardiac output, blood pressure
- **Respiratory**: Dilates bronchioles
- **Metabolic**: Increases blood glucose (glycogenolysis, gluconeogenesis)
- **Pupils**: Dilates (mydriasis)
- **Digestion**: Decreases (blood diverted to muscles, brain, heart)
- **Alertness**: Increases

**Stimulus**: Stress, danger, exercise, hypoglycemia

**Regulation**: Sympathetic nervous system (acetylcholine from preganglionic fibers)

## 8. Pancreas (Mixed Gland)

**Location**: Behind stomach

**Endocrine portion**: **Islets of Langerhans** (~1-2% of pancreas)

**Cell Types:**

**α cells (~20%)** → Glucagon
**β cells (~70%)** → Insulin
**δ cells** → Somatostatin
**PP cells** → Pancreatic polypeptide

### A. Insulin

**Target**: All cells (especially liver, muscle, adipose)

**Functions**: **Lowers blood glucose** (hypoglycemic)
- **Glucose uptake**: Increases cellular glucose uptake (GLUT4 transporters)
- **Glycogenesis**: Glucose → Glycogen (storage in liver, muscle)
- **Lipogenesis**: Glucose → Fats (storage)
- **Protein synthesis**: Promotes anabolism
- **Inhibits**: Gluconeogenesis, glycogenolysis, lipolysis

**Regulation**: High blood glucose → Insulin release

**Hyposecretion**: **Diabetes Mellitus**

**Types:**
- **Type 1** (IDDM - Insulin-Dependent):
  - Autoimmune destruction of β cells
  - Absolute insulin deficiency
  - Early onset (childhood/adolescence)
  - Requires insulin injections

- **Type 2** (NIDDM - Non-Insulin-Dependent):
  - Insulin resistance (cells don't respond)
  - Relative insulin deficiency
  - Later onset (adulthood)
  - Associated with obesity, lifestyle
  - Managed by diet, exercise, oral drugs

**Symptoms:**
- **Hyperglycemia**: High blood glucose (>126 mg/dL fasting)
- **Glycosuria**: Glucose in urine
- **Polyuria**: Excessive urination (glucose osmotic diuresis)
- **Polydipsia**: Excessive thirst
- **Polyphagia**: Excessive hunger (despite eating)
- Weight loss, fatigue

**Complications**: Cardiovascular disease, kidney damage, neuropathy, retinopathy

### B. Glucagon

**Target**: Liver (mainly)

**Functions**: **Increases blood glucose** (hyperglycemic)
- **Glycogenolysis**: Glycogen → Glucose
- **Gluconeogenesis**: Amino acids, glycerol → Glucose
- **Lipolysis**: Fats → Fatty acids + Glycerol

**Regulation**: Low blood glucose → Glucagon release

**Antagonist to insulin**: Maintains blood glucose homeostasis

## 9. Gonads (Mixed Glands)

### A. Testes (Males)

**Location**: Scrotum

**Endocrine cells**: **Leydig cells** (Interstitial cells)

**Hormone**: **Testosterone** (Androgen)

**Functions:**
- **Spermatogenesis**: Sperm production (with FSH)
- **Secondary sexual characteristics**:
  - Deepening of voice
  - Facial, body hair growth
  - Muscle development
  - Male pattern fat distribution
  - Bone growth
- **Libido**: Sex drive
- **Aggression**, dominance behaviors

**Regulation**: LH (from pituitary) stimulates testosterone secretion

**Negative feedback**: High testosterone → Inhibits GnRH, LH

### B. Ovaries (Females)

**Location**: Pelvic cavity

**Endocrine structures**: Follicles, Corpus luteum

**Hormones:**

**1. Estrogen (Estradiol)**
- **Secreted by**: Ovarian follicles (Graafian follicle)
- **Functions**:
  - **Secondary sexual characteristics**:
    - Breast development
    - Female fat distribution (hips, thighs)
    - Female body shape
  - **Uterine lining**: Proliferation (thickening) during follicular phase
  - **Bone health**: Maintains bone density
  - **Oogenesis**: Maturation of oocytes

**2. Progesterone**
- **Secreted by**: Corpus luteum (after ovulation)
- **Functions**:
  - **Uterine lining**: Maintenance, secretory changes (luteal phase)
  - **Pregnancy**: Maintains endometrium, prevents contractions
  - **Mammary glands**: Development of alveoli
  - **Inhibits**: Uterine contractions, LH surge

**Regulation**: FSH, LH (from pituitary) control ovarian hormone secretion

**Menstrual Cycle Phases:**
- **Follicular phase**: Estrogen dominant (endometrium proliferates)
- **Ovulation**: LH surge
- **Luteal phase**: Progesterone dominant (endometrium secretory)

## Hormone Regulation: Feedback Mechanisms

**Negative Feedback** (Most common):
- Hormone's effect inhibits further secretion
- Maintains homeostasis
- Example: T₃/T₄ inhibit TSH and TRH

**Positive Feedback** (Rare):
- Hormone's effect stimulates further secretion
- Example: Oxytocin during childbirth (uterine contractions → more oxytocin)

## Summary of Key Hormones

**Growth**: GH, thyroid hormones, insulin, testosterone, estrogen

**Metabolism**: Insulin, glucagon, thyroid hormones, cortisol

**Blood glucose**: Insulin (↓), Glucagon (↑), Cortisol (↑), Epinephrine (↑)

**Blood Ca²⁺**: PTH (↑), Calcitonin (↓)

**Blood pressure**: Aldosterone (↑), ADH (↑), Epinephrine (↑), ANP (↓)

**Stress response**: Cortisol, epinephrine, norepinephrine

**Reproduction**: FSH, LH, testosterone, estrogen, progesterone

**Water balance**: ADH, aldosterone
`,

    keyConcepts: [
      'Hormones: Chemical messengers, secreted by endocrine glands, transported by blood',
      'Peptide hormones: Surface receptors, second messengers; Steroid hormones: Intracellular receptors, gene transcription',
      'Hypothalamus: Controls pituitary, releasing/inhibiting hormones (GnRH, TRH, CRH, GHRH, Somatostatin)',
      'Anterior pituitary: GH, TSH, ACTH, FSH, LH, Prolactin',
      'Posterior pituitary: Oxytocin (uterine contractions, milk ejection), ADH (water reabsorption)',
      'GH: Growth; Deficiency → Dwarfism; Excess → Gigantism (children), Acromegaly (adults)',
      'Pineal: Melatonin (sleep-wake cycle)',
      'Thyroid: T₃, T₄ (BMR, growth); Deficiency → Cretinism (children), Myxedema (adults); Excess → Graves\' disease',
      'Thyroid: Calcitonin (lowers Ca²⁺)',
      'Parathyroid: PTH (raises Ca²⁺ from bones, kidneys)',
      'Thymus: Thymosin (T cell maturation)',
      'Adrenal cortex: Aldosterone (Na⁺ reabsorption, BP ↑), Cortisol (glucose ↑, anti-inflammatory)',
      'Adrenal medulla: Epinephrine, Norepinephrine (fight-flight: HR ↑, BP ↑, glucose ↑)',
      'Pancreas: Insulin (glucose ↓, storage), Glucagon (glucose ↑)',
      'Diabetes mellitus: Insulin deficiency/resistance → Hyperglycemia, glycosuria, polyuria, polydipsia',
      'Testes: Testosterone (spermatogenesis, secondary sexual characteristics)',
      'Ovaries: Estrogen (follicle), Progesterone (corpus luteum)',
      'Negative feedback: Most common regulation (e.g., T₃/T₄ → TSH ↓)'
    ],

    formulas: [
      'Negative feedback loop: Hormone → Effect → Inhibits own secretion',
      'Thyroid axis: TRH (hypothalamus) → TSH (pituitary) → T₃/T₄ (thyroid) → Negative feedback',
      'Adrenal axis: CRH → ACTH → Cortisol → Negative feedback',
      'Blood glucose: Insulin ↓, Glucagon ↑ (antagonistic)',
      'Blood Ca²⁺: PTH ↑, Calcitonin ↓ (antagonistic)'
    ],

    learningObjectives: [
      'Compare nervous and endocrine coordination',
      'Understand hormone types (peptide, steroid) and mechanisms of action',
      'Describe hypothalamus functions and hormones',
      'Explain anterior and posterior pituitary hormones',
      'Understand growth hormone effects and disorders',
      'Describe thyroid hormones (T₃, T₄) and disorders',
      'Explain calcium regulation (PTH and calcitonin)',
      'Understand adrenal cortex hormones (aldosterone, cortisol)',
      'Describe adrenal medulla hormones (epinephrine) and fight-flight response',
      'Explain insulin and glucagon in blood glucose regulation',
      'Understand diabetes mellitus types and symptoms',
      'Describe sex hormones (testosterone, estrogen, progesterone)',
      'Explain negative feedback regulation'
    ],

    prerequisites: [
      'Understanding of cell membrane structure',
      'Knowledge of proteins and cholesterol',
      'Basic understanding of gene expression',
      'Knowledge of blood circulation'
    ],

    importantTopics: [
      'Hormone mechanisms: Peptide (second messenger) vs Steroid (gene transcription)',
      'Hypothalamus: Controls pituitary, releasing/inhibiting hormones',
      'Anterior pituitary: 6 hormones (GH, TSH, ACTH, FSH, LH, Prolactin)',
      'Posterior pituitary: Oxytocin, ADH',
      'GH disorders: Dwarfism, Gigantism, Acromegaly',
      'Thyroid: T₃/T₄ (BMR), Calcitonin (Ca²⁺ ↓)',
      'Thyroid disorders: Cretinism, Myxedema, Graves\' disease, Goiter',
      'Parathyroid: PTH (Ca²⁺ ↑)',
      'Adrenal cortex: Aldosterone (Na⁺, BP), Cortisol (glucose, stress)',
      'Adrenal medulla: Epinephrine (fight-flight)',
      'Pancreas: Insulin (glucose ↓), Glucagon (glucose ↑)',
      'Diabetes mellitus: Type 1 vs Type 2, symptoms (hyperglycemia, glycosuria, polyuria, polydipsia)',
      'Gonads: Testosterone (males), Estrogen and Progesterone (females)',
      'Negative feedback regulation',
      'Common disorders: Diabetes, Graves\', Addison\'s, Cushing\'s'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 22',
    estimatedStudyMinutes: 420,
    difficultyLevel: 5,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Endocrine Glands Location',
        description: 'Human body showing locations of major endocrine glands'
      },
      {
        type: 'flowchart',
        title: 'Negative Feedback Loop',
        description: 'Hypothalamus-Pituitary-Thyroid axis with feedback'
      },
      {
        type: 'diagram',
        title: 'Pancreatic Islets',
        description: 'Alpha cells (glucagon) and beta cells (insulin)'
      },
      {
        type: 'comparison',
        title: 'Insulin vs Glucagon Effects',
        description: 'Opposing effects on blood glucose regulation'
      },
      {
        type: 'flowchart',
        title: 'Hormone Mechanism',
        description: 'Peptide vs steroid hormone action pathways'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Chemical Coordination and Integration',
      estimatedStudyMinutes: 420,
      difficultyLevel: 5,
      status: 'published'
    }
  });

  console.log('✅ Biology Chapter 22: Chemical Coordination and Integration seeded successfully!');
}

seedBiologyChapter22()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
