import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Chapter3() {
  console.log('Seeding Biology Class 12 Chapter 3: Human Reproduction...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 3,
    chapterTitle: 'Human Reproduction',
    introduction: `Human reproduction is a complex biological process ensuring species survival through sexual reproduction. Unlike plants and simpler organisms, humans exhibit advanced reproductive strategies with specialized organs, hormonal regulation, internal fertilization, and prolonged parental care. The male and female reproductive systems produce gametes (sperm and ova), facilitate fertilization, and provide optimal conditions for embryonic development within the mother's body (viviparity). Understanding human reproduction is essential for reproductive health, family planning, assisted reproductive technologies, and addressing infertility. This chapter explores male and female reproductive anatomy, gametogenesis (spermatogenesis and oogenesis), menstrual cycle regulation, fertilization, embryonic development, and pregnancy culminating in parturition.`,

    detailedNotes: `
# Human Reproduction

## Male Reproductive System

**Functions:**
- Production of male gametes (sperms)
- Transfer of sperms to female reproductive tract
- Secretion of male sex hormones (testosterone)

### Anatomy

**Primary Sex Organs**: **Testes** (produce sperms and testosterone)

**Accessory Organs**:
- **Ducts**: Vas deferens, epididymis, urethra
- **Glands**: Seminal vesicles, prostate, bulbourethral glands
- **External genitalia**: Penis, scrotum

#### 1. Testes (Singular: Testis)

**Location**: **Scrotum** (extra-abdominal pouch)
- Temperature: **2-3°C lower** than body (optimal for sperm production)

**Number**: Pair (two testes)

**Shape**: Oval

**Structure:**
- Covered by **tunica albuginea** (fibrous covering)
- Divided into **testicular lobules** (~250 per testis)
- Each lobule contains **seminiferous tubules** (1-3)

**Seminiferous Tubules:**
- Site of **spermatogenesis** (sperm production)
- Lined with **two types of cells**:

**A. Sertoli Cells (Nurse Cells)**
- Support, nourish developing sperms
- Provide nutrients
- Phagocytose defective sperms
- Form **blood-testis barrier**

**B. Germinal Epithelium**
- **Spermatogonial cells** → Undergo spermatogenesis

**Interstitial Spaces** (between tubules):
- **Leydig cells (Interstitial cells)**
  - Secrete **testosterone** (male sex hormone)
  - Stimulated by **LH** (from pituitary)

#### 2. Male Accessory Ducts

**A. Epididymis**
- Highly coiled tube
- Lies along posterior surface of testis
- **Functions**:
  - Storage of sperms
  - Maturation of sperms (gain motility)

**B. Vas Deferens (Ductus Deferens)**
- Muscular tube
- Ascends from epididymis → Abdominal cavity
- Joins duct from seminal vesicle → **Ejaculatory duct**
- Transports mature sperms

**C. Urethra**
- Common passage for urine and semen
- Extends through penis
- Opens at **urethral meatus** (external opening)

#### 3. Accessory Glands

**A. Seminal Vesicles** (Pair)
- Located behind urinary bladder
- Secrete **seminal fluid** (60-70% of semen)
- Contains:
  - **Fructose** (energy for sperms)
  - Prostaglandins (stimulate uterine contractions)
  - Proteins, enzymes

**B. Prostate Gland** (Single)
- Surrounds urethra below bladder
- Secretes **milky, alkaline fluid** (30% of semen)
- Contains:
  - **Citric acid**, enzymes
  - **Neutralizes vaginal acidity** (protects sperms)

**C. Bulbourethral Glands (Cowper's Glands)** (Pair)
- Below prostate
- Secrete **mucus-like fluid** during sexual arousal
- Lubricates penis
- Neutralizes acidic urine residue in urethra

#### 4. Penis

**Function**: Copulatory organ (transfers semen into vagina)

**Structure:**
- **Glans penis**: Enlarged tip, highly sensitive
- **Prepuce (Foreskin)**: Fold of skin covering glans
- **Erectile tissue**: Corpus cavernosum, corpus spongiosum
  - Fills with blood during arousal → Erection

### Semen

**Composition**: Sperms + Secretions from accessory glands

**Volume**: 2-5 ml per ejaculation

**Sperm count**: 200-300 million per ejaculation
- Normal: >40 million/ml
- Below 20 million/ml → **Oligospermia** (low fertility)

**Functions of seminal fluid:**
- Nourishment (fructose)
- Lubrication
- Neutralizes acidity
- Provides medium for sperm transport

## Female Reproductive System

**Functions:**
- Production of female gametes (ova)
- Provide site for fertilization
- Support embryonic and fetal development
- Childbirth (parturition)
- Lactation

### Anatomy

**Primary Sex Organs**: **Ovaries** (produce ova and hormones)

**Accessory Organs**:
- **Oviducts** (Fallopian tubes)
- **Uterus**
- **Vagina**
- **External genitalia**
- **Mammary glands**

#### 1. Ovaries (Pair)

**Location**: Pelvic cavity, one on each side of uterus

**Shape**: Almond-shaped

**Functions:**
- **Oogenesis** (ovum production)
- Secrete **estrogen and progesterone**

**Structure:**
- **Ovarian follicles** at various stages of development
- **Stroma**: Connective tissue

#### 2. Fallopian Tubes (Oviducts) (Pair)

**Location**: Extend from ovaries to uterus

**Length**: 10-12 cm

**Parts:**
- **Infundibulum**: Funnel-shaped, opens near ovary
  - **Fimbriae**: Finger-like projections, collect released ovum
- **Ampulla**: Wider part, **site of fertilization**
- **Isthmus**: Narrow part
- **Uterine part**: Enters uterus

**Function:**
- Transport ovum from ovary to uterus
- Site of fertilization

#### 3. Uterus (Womb)

**Location**: Pelvic cavity, between bladder and rectum

**Shape**: Pear-shaped, inverted

**Size**: 7-8 cm long

**Parts:**
- **Fundus**: Dome-shaped top
- **Body**: Main part
- **Cervix**: Narrow lower part, opens into vagina
  - **Cervical canal**: Connects uterine cavity to vagina

**Wall Layers:**

**A. Perimetrium** (Outer)
- Serous layer

**B. Myometrium** (Middle)
- Thick, **smooth muscle** layer
- **Contractions** during childbirth (labor)

**C. Endometrium** (Inner)
- Glandular layer
- **Highly vascular**, rich in glands
- **Undergoes cyclic changes** during menstrual cycle
- Site of **embryo implantation**

**Functions:**
- Site of implantation
- Supports fetal development (placenta formation)
- Muscular contractions during childbirth

#### 4. Vagina

**Location**: Between uterus and external genitalia

**Structure**: Muscular tube

**Functions:**
- Receives penis during copulation
- Birth canal during delivery
- Passage for menstrual flow

**Hymen**: Thin membrane partially covering vaginal opening (may be absent/torn)

#### 5. External Genitalia (Vulva)

**Components:**
- **Mons pubis**: Fatty cushion over pubic symphysis
- **Labia majora**: Outer folds
- **Labia minora**: Inner folds
- **Clitoris**: Sensitive erectile tissue (homologous to penis)
- **Vaginal opening**

#### 6. Mammary Glands (Breasts)

**Function**: **Lactation** (milk production) after childbirth

**Structure:**
- **15-20 lobes** (mammary lobes)
- Each lobe contains **lobules** with **alveoli** (milk-secreting cells)
- Alveoli → **Mammary ducts** → **Lactiferous ducts** → **Nipple**

**Development**: Stimulated by estrogen and progesterone during puberty, pregnancy

## Gametogenesis

### Spermatogenesis (Sperm Formation)

**Location**: **Seminiferous tubules** of testes

**Timing**: Begins at puberty (~13-14 years), continues throughout life

**Duration**: ~64-74 days per cycle

**Process:**

**1. Multiplication Phase**
- **Spermatogonia** (diploid, 2n = 46) undergo **mitosis**
- Produces more spermatogonia
- Some differentiate into **Primary spermatocytes (2n)**

**2. Growth Phase**
- Primary spermatocytes grow (accumulate nutrients)

**3. Maturation Phase (Meiosis I)**
- **Primary spermatocyte (2n)** undergoes **Meiosis I**
- Produces **two Secondary spermatocytes (n = 23)**

**4. Maturation Phase (Meiosis II)**
- Each **Secondary spermatocyte (n)** undergoes **Meiosis II**
- Produces **two Spermatids (n)** each
- Total: **Four haploid spermatids** from one primary spermatocyte

**5. Spermiogenesis**
- **Spermatids transform into spermatozoa (sperms)**
- Structural changes: acrosome formation, tail development, mitochondria arrangement
- No division

**6. Spermiation**
- Release of mature sperms from seminiferous tubules into lumen

**Result**: One spermatogonium → **Four functional sperms**

### Sperm Structure

**Parts:**

**1. Head**
- Contains **nucleus** (haploid, n = 23 chromosomes)
- **Acrosome**: Cap-like structure, contains enzymes (hyaluronidase, acrosin) to penetrate egg

**2. Middle Piece**
- **Mitochondria** (spiral arrangement)
- Provides **energy (ATP)** for motility

**3. Tail (Flagellum)**
- Whip-like structure
- Provides **motility** (swimming)

### Oogenesis (Ovum Formation)

**Location**: **Ovarian follicles** in ovary

**Timing**: Begins **before birth**, completes after fertilization

**Process:**

**1. Multiplication Phase** (Fetal stage)
- **Oogonia** (diploid, 2n) undergo mitosis
- Produces millions of oogonia

**2. Growth Phase** (Before birth)
- Oogonia grow → **Primary oocytes (2n)**
- **Arrested in Prophase I of Meiosis I** (until puberty)
- Surrounded by follicle cells → **Primary follicle**

**At birth**: ~2 million primary oocytes

**At puberty**: ~60,000-80,000 remain

**3. Maturation Phase (Post-puberty)**

**Meiosis I** (at ovulation):
- **Primary oocyte (2n)** completes **Meiosis I**
- **Unequal division**:
  - **Secondary oocyte (n)**: Large (receives most cytoplasm)
  - **First polar body (n)**: Small (degenerates)
- Secondary oocyte **arrested in Metaphase II**

**Meiosis II** (after fertilization):
- **Secondary oocyte (n)** completes **Meiosis II** only if **fertilized**
- **Unequal division**:
  - **Mature ovum (n)**: Large
  - **Second polar body (n)**: Small (degenerates)

**Result**: One oogonium → **One functional ovum + 2-3 polar bodies**

**Comparison:**

| Feature | Spermatogenesis | Oogenesis |
|---------|-----------------|-----------|
| **Location** | Seminiferous tubules | Ovarian follicles |
| **Timing** | Puberty → Lifelong | Before birth → Menopause |
| **Duration** | ~74 days | Months to years |
| **Products** | 4 functional sperms | 1 ovum + polar bodies |
| **Division** | Equal | Unequal |
| **Arrest** | No arrest | Arrested stages |

## Menstrual Cycle

**Definition**: Cyclic changes in uterus and ovary (reproductive age)

**Duration**: ~28 days (average, range: 21-35 days)

**Age**: Menarche (~11-13 years) to Menopause (~45-50 years)

**Phases:**

### 1. Menstrual Phase (Days 1-5)

- **Menstruation** (bleeding)
- Breakdown and shedding of **endometrium**
- Blood, mucus, tissue fragments discharged
- **Low estrogen and progesterone**

### 2. Follicular/Proliferative Phase (Days 6-13)

**Ovarian Events:**
- **FSH** from pituitary stimulates follicle development
- **Primary follicle** → **Secondary follicle** → **Graafian follicle** (mature)
- Follicle secretes **estrogen**

**Uterine Events:**
- **Endometrium regenerates** (proliferates)
- Becomes thick, vascular, glandular
- Prepared for implantation

**Hormone**: **Estrogen** (increases)

### 3. Ovulatory Phase (Day 14)

- **LH surge** (peak) from pituitary
- **Graafian follicle ruptures**
- **Ovulation**: Release of **secondary oocyte** from ovary
- Oocyte enters Fallopian tube (fimbriae collect it)

**Peak hormones**: LH, FSH (LH dominant)

### 4. Luteal/Secretory Phase (Days 15-28)

**Ovarian Events:**
- Ruptured follicle → **Corpus luteum** (yellow body)
- Corpus luteum secretes **progesterone** (and estrogen)
- **LH** maintains corpus luteum

**Uterine Events:**
- **Endometrium becomes secretory**
- Glands secrete nutrients (preparation for embryo implantation)
- Maximum thickness, vascularity

**If Fertilization Occurs:**
- Embryo implants in endometrium
- Embryo secretes **hCG** (human Chorionic Gonadotropin)
- hCG maintains corpus luteum
- Progesterone continues → No menstruation → **Pregnancy**

**If No Fertilization:**
- Corpus luteum degenerates → **Corpus albicans**
- **Progesterone and estrogen drop**
- Endometrium cannot maintain → **Menstruation** (Day 1 of next cycle)

### Hormonal Regulation

**Hypothalamus:**
- Secretes **GnRH** (Gonadotropin-Releasing Hormone)

**Anterior Pituitary:**
- **FSH** (Follicle-Stimulating Hormone): Stimulates follicle development, estrogen secretion
- **LH** (Luteinizing Hormone): Triggers ovulation, maintains corpus luteum

**Ovary:**
- **Estrogen** (follicle): Endometrial proliferation, LH surge (positive feedback)
- **Progesterone** (corpus luteum): Endometrial maintenance, inhibits FSH/LH (negative feedback)

## Fertilization and Implantation

### Fertilization

**Location**: **Ampulla** of Fallopian tube

**Process:**
1. Sperm deposited in vagina during copulation
2. Sperms swim through cervix → Uterus → Fallopian tube
3. **Capacitation**: Sperms undergo changes (membrane alteration) in female tract
4. Sperm encounters **secondary oocyte**
5. **Acrosomal reaction**: Acrosome releases enzymes
  - **Hyaluronidase**: Dissolves corona radiata (outer cells)
  - **Acrosin**: Digests zona pellucida (glycoprotein layer)
6. **One sperm penetrates** egg membrane
7. **Cortical reaction**: Prevents polyspermy (multiple sperm entry)
  - Zona pellucida hardens
8. Sperm nucleus enters egg
9. **Secondary oocyte completes Meiosis II** → Mature ovum + 2nd polar body
10. **Karyogamy**: Fusion of sperm and egg nuclei
11. **Diploid zygote (2n = 46)** formed

**Timeline**: Within **24 hours** of ovulation

### Cleavage and Blastocyst Formation

**Cleavage**: Rapid **mitotic divisions** of zygote (no growth, cells smaller)

**Process:**
1. **2-cell** stage (Day 1)
2. **4-cell, 8-cell** (Day 2-3)
3. **16-cell Morula** (Day 3-4) - Solid ball
4. **Blastocyst** (Day 5-6) - Hollow ball
  - **Inner cell mass (Embryoblast)**: Future embryo
  - **Trophoblast**: Outer layer, future placenta

**Movement**: Zygote → Morula → Blastocyst travels through Fallopian tube → Uterus

### Implantation

**Definition**: Attachment of **blastocyst to endometrium**

**Timeline**: **Day 6-7** after fertilization

**Process:**
1. Blastocyst reaches uterus (Day 5-6)
2. **Trophoblast** secretes enzymes
3. Blastocyst burrows into **endometrium** (implants)
4. Trophoblast forms **finger-like projections** → **Chorionic villi**
5. **Placenta** formation begins

**Hormone**: **hCG** secreted by trophoblast
- Maintains corpus luteum
- Progesterone continues
- Prevents menstruation
- **Pregnancy test detects hCG** in urine/blood

## Pregnancy and Embryonic Development

**Duration**: ~280 days (~9 months, 40 weeks) from last menstrual period

### Embryonic Development

**First Trimester (Weeks 1-12):**
- **Gastrulation**: Formation of three germ layers (ectoderm, mesoderm, endoderm)
- **Organogenesis**: Major organs begin forming
- **Heart starts beating** (Week 4-5)
- **Limb buds** appear
- By end: All major organ systems initiated

**Second Trimester (Weeks 13-28):**
- Organs mature
- **First movements** felt (quickening, ~16-20 weeks)
- **Hair, eyelashes** develop
- Body covered with **fine hair (lanugo)**
- Sex determination possible (ultrasound)

**Third Trimester (Weeks 29-40):**
- Rapid growth
- Organs mature fully
- **Fetus viable** (can survive outside) by ~28 weeks
- Moves into head-down position
- Gains weight

### Placenta

**Formation**: From **trophoblast (fetal) + endometrium (maternal)**

**Structure:**
- **Chorionic villi** (fetal) interdigitate with **maternal blood sinuses**
- **No direct mixing** of fetal and maternal blood (separated by membranes)

**Functions:**
- **Exchange**:
  - **O₂, nutrients** from mother → fetus
  - **CO₂, wastes** from fetus → mother
- **Endocrine**: Secretes **hCG, hPL, estrogen, progesterone**
- **Barrier**: Protects fetus from infections (partial)
- **Immunity**: **IgG antibodies** cross (passive immunity)

**Umbilical Cord**: Connects fetus to placenta
- **2 umbilical arteries** (deoxygenated blood from fetus)
- **1 umbilical vein** (oxygenated blood to fetus)

### Gestation Milestones

**Week 4**: Heart beats
**Week 8**: Called **fetus** (instead of embryo)
**Week 12**: External genitalia distinguishable
**Week 20**: Movements felt
**Week 28**: Viability (can survive outside with care)
**Week 40**: Full term

## Parturition (Childbirth)

**Definition**: Delivery of baby

**Timing**: ~280 days (~40 weeks) from last menstrual period

**Signals:**
- **Fetal signals** (fully developed fetus)
- **Oxytocin** from maternal pituitary increases
- **Estrogen/Progesterone** ratio changes

**Process (Labor):**

**Stage 1: Dilation**
- **Uterine contractions** begin (mild → strong)
- **Cervix dilates** (opens, ~10 cm)
- **Amniotic sac ruptures** ("water breaks")
- Longest stage (~8-12 hours first birth)

**Stage 2: Expulsion**
- Strong contractions
- Baby moves through birth canal (vagina)
- **Baby delivered** (head first usually)
- Shorter (~minutes to 2 hours)

**Stage 3: Placental**
- **Placenta (afterbirth) expelled**
- Uterus contracts to stop bleeding

**Positive Feedback Loop:**
- Uterine stretch → **Oxytocin release** → Stronger contractions → More stretch → More oxytocin

### After Birth

**Lactation**: Milk production

**Hormones:**
- **Prolactin**: Stimulates milk production (from anterior pituitary)
- **Oxytocin**: Milk ejection ("let-down") during suckling (from posterior pituitary)

**Colostrum**: First milk (yellowish)
- Rich in **antibodies (IgA)**
- Provides passive immunity to newborn
`,

    keyConcepts: [
      'Male system: Testes (spermatogenesis, testosterone), epididymis, vas deferens, accessory glands (seminal vesicles, prostate, bulbourethral)',
      'Testes: Seminiferous tubules (Sertoli cells, spermatogonia), Leydig cells (testosterone)',
      'Female system: Ovaries (oogenesis, estrogen, progesterone), Fallopian tubes (fertilization site), uterus (implantation, fetal development)',
      'Uterus layers: Perimetrium, myometrium (muscle contractions), endometrium (cyclic changes, implantation)',
      'Spermatogenesis: Spermatogonium (2n) → Primary spermatocyte → 2 Secondary spermatocytes → 4 Spermatids → 4 Sperms (n)',
      'Oogenesis: Oogonium (2n) → Primary oocyte (arrested) → Secondary oocyte (n) + 1st polar body → Ovum (n) + 2nd polar body (after fertilization)',
      'Menstrual cycle (28 days): Menstrual (1-5), Follicular (6-13), Ovulation (14), Luteal (15-28)',
      'Hormones: GnRH → FSH (follicle growth, estrogen), LH (ovulation, corpus luteum, progesterone)',
      'Fertilization: Ampulla of Fallopian tube, sperm penetration → Zygote (2n)',
      'Cleavage: Zygote → 2-cell → Morula → Blastocyst (inner cell mass + trophoblast)',
      'Implantation: Blastocyst attaches to endometrium (Day 6-7), trophoblast secretes hCG',
      'Placenta: Fetal-maternal exchange (O₂, nutrients, wastes), no direct blood mixing',
      'Parturition: Oxytocin → uterine contractions → cervix dilation → baby delivery → placenta expulsion',
      'Lactation: Prolactin (milk production), oxytocin (milk ejection); Colostrum (first milk, antibodies)'
    ],

    formulas: [
      'Spermatogenesis: 1 Spermatogonium → 4 functional sperms',
      'Oogenesis: 1 Oogonium → 1 ovum + 2-3 polar bodies',
      'Fertilization: Sperm (n) + Ovum (n) → Zygote (2n)',
      'Menstrual cycle: ~28 days (Menstrual → Follicular → Ovulation → Luteal)'
    ],

    learningObjectives: [
      'Describe male reproductive anatomy and functions',
      'Explain spermatogenesis process and sperm structure',
      'Describe female reproductive anatomy and functions',
      'Explain oogenesis process and compare with spermatogenesis',
      'Understand menstrual cycle phases and hormonal regulation',
      'Describe fertilization process and location',
      'Explain cleavage, blastocyst formation, and implantation',
      'Understand placenta structure and functions',
      'Describe embryonic development stages',
      'Explain parturition process and hormonal control',
      'Understand lactation and role of prolactin and oxytocin'
    ],

    prerequisites: [
      'Understanding of meiosis and mitosis',
      'Knowledge of hormones and endocrine system',
      'Basic anatomy knowledge'
    ],

    importantTopics: [
      'Testes: Seminiferous tubules (spermatogenesis), Leydig cells (testosterone)',
      'Spermatogenesis: 1 spermatogonium → 4 sperms (64-74 days)',
      'Ovaries: Follicle development, oogenesis',
      'Oogenesis: 1 oogonium → 1 ovum + polar bodies, arrested stages',
      'Menstrual cycle: Follicular (FSH, estrogen), Ovulation (LH surge), Luteal (progesterone)',
      'Fertilization: Ampulla, acrosomal reaction, one sperm penetrates, zygote (2n)',
      'Implantation: Blastocyst → endometrium (Day 6-7), hCG secretion',
      'Placenta: Exchange organ, no direct blood mixing, endocrine functions',
      'Parturition: Oxytocin positive feedback, cervix dilation, baby delivery',
      'Lactation: Prolactin (production), oxytocin (ejection), colostrum (antibodies)'
    ],

    ncertChapterRef: 'Class 12 Biology, Chapter 3',
    estimatedStudyMinutes: 420,
    difficultyLevel: 5,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Male Reproductive System',
        description: 'Testes, epididymis, vas deferens, accessory glands, penis'
      },
      {
        type: 'diagram',
        title: 'Testis T.S.',
        description: 'Seminiferous tubules, Sertoli cells, Leydig cells'
      },
      {
        type: 'diagram',
        title: 'Female Reproductive System',
        description: 'Ovaries, Fallopian tubes, uterus, vagina'
      },
      {
        type: 'flowchart',
        title: 'Spermatogenesis',
        description: 'Spermatogonium → Primary spermatocyte → Secondary spermatocytes → Spermatids → Sperms'
      },
      {
        type: 'flowchart',
        title: 'Oogenesis',
        description: 'Oogonium → Primary oocyte → Secondary oocyte → Ovum + polar bodies'
      },
      {
        type: 'graph',
        title: 'Menstrual Cycle Hormones',
        description: 'FSH, LH, estrogen, progesterone levels across 28 days'
      },
      {
        type: 'diagram',
        title: 'Fertilization and Implantation',
        description: 'Zygote → Cleavage → Morula → Blastocyst → Implantation'
      },
      {
        type: 'diagram',
        title: 'Placenta Structure',
        description: 'Chorionic villi, maternal blood sinuses, umbilical cord'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Human Reproduction',
      estimatedStudyMinutes: 420,
      difficultyLevel: 5,
      status: 'published',
      visualizationsData: [
      {
        type: 'diagram',
        title: 'Male Reproductive System',
        description: 'Testes, epididymis, vas deferens, accessory glands, penis'
      },
      {
        type: 'diagram',
        title: 'Testis T.S.',
        description: 'Seminiferous tubules, Sertoli cells, Leydig cells'
      },
      {
        type: 'diagram',
        title: 'Female Reproductive System',
        description: 'Ovaries, Fallopian tubes, uterus, vagina'
      },
      {
        type: 'flowchart',
        title: 'Spermatogenesis',
        description: 'Spermatogonium → Primary spermatocyte → Secondary spermatocytes → Spermatids → Sperms'
      },
      {
        type: 'flowchart',
        title: 'Oogenesis',
        description: 'Oogonium → Primary oocyte → Secondary oocyte → Ovum + polar bodies'
      },
      {
        type: 'graph',
        title: 'Menstrual Cycle Hormones',
        description: 'FSH, LH, estrogen, progesterone levels across 28 days'
      },
      {
        type: 'diagram',
        title: 'Fertilization and Implantation',
        description: 'Zygote → Cleavage → Morula → Blastocyst → Implantation'
      },
      {
        type: 'diagram',
        title: 'Placenta Structure',
        description: 'Chorionic villi, maternal blood sinuses, umbilical cord'
      }
    ]
    }
  });

  console.log('✅ Biology Class 12 Chapter 3: Human Reproduction seeded successfully!');
}

seedBiologyClass12Chapter3()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
