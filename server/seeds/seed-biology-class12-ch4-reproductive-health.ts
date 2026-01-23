import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Chapter4() {
  console.log('Seeding Biology Class 12 Chapter 4: Reproductive Health...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 4,
    chapterTitle: 'Reproductive Health',
    introduction: `Reproductive health is a state of complete physical, mental, and social well-being in all matters relating to reproduction. It encompasses not only the absence of reproductive diseases but also the ability to have a safe and satisfying sex life, the capability to reproduce, and the freedom to decide if, when, and how often to do so. In a rapidly growing population like India's, reproductive health becomes critical for controlling population growth, reducing maternal and infant mortality, preventing sexually transmitted infections (STIs), and ensuring access to family planning methods. This chapter explores reproductive health issues, contraceptive methods, medical termination of pregnancy, sexually transmitted infections, infertility, and assisted reproductive technologies that help millions of couples achieve their reproductive goals.`,

    detailedNotes: `
# Reproductive Health

## Introduction

**Reproductive Health (WHO Definition)**: Total well-being in all aspects of reproduction
- Physical health
- Mental health
- Social well-being
- Not merely absence of disease

**Importance:**
- Reduces maternal and infant mortality
- Controls population growth
- Prevents sexually transmitted infections (STIs)
- Ensures safe pregnancy and childbirth
- Provides family planning access

**India's Initiatives:**
- **Reproductive and Child Health Care (RCH) Programme**
- **Family planning programs**
- **Awareness campaigns**

## Population Explosion and Birth Control

### India's Population Growth

**Current Status** (~2020s):
- Population: >1.3 billion (2nd largest globally)
- Growth rate: ~1.2% annually

**Problems:**
- Resource depletion (food, water, housing)
- Unemployment
- Environmental degradation
- Poor healthcare access
- Low standard of living

**Solutions:**
- **Family planning**
- Education and awareness
- Improved healthcare
- Women empowerment

### Birth Control Methods

**Aims:**
- Prevent unwanted pregnancies
- Space births (optimal intervals)
- Reduce population growth

**Ideal Contraceptive Characteristics:**
- Highly effective
- Reversible
- Safe (minimal side effects)
- Easy to use
- Affordable
- Acceptable (culturally, religiously)

## Contraceptive Methods

**Classification:**

### 1. Natural/Traditional Methods

**A. Periodic Abstinence (Rhythm Method)**
- Avoid intercourse during **fertile period** (ovulation time)
- **Fertile period**: Days 10-17 of menstrual cycle (ovulation ~Day 14)
- **Drawback**: Requires regular cycles, not very effective (~60-70%)

**B. Coitus Interruptus (Withdrawal)**
- Withdrawal of penis before ejaculation
- **Drawback**: Requires self-control, pre-ejaculatory fluid may contain sperms, not reliable (~70-75%)

**C. Lactational Amenorrhea**
- Absence of menstruation during **intense breastfeeding** (first 6 months postpartum)
- High prolactin suppresses ovulation
- **Drawback**: Temporary, not reliable beyond 6 months

### 2. Barrier Methods

**Mechanism**: Prevent sperm from reaching ovum (physical barriers)

**A. Condoms**

**Male Condom:**
- Thin rubber/latex sheath covering penis
- Prevents sperm entry into vagina
- **Advantages**:
  - Protects against **STIs** (including HIV)
  - No side effects
  - Disposable
  - Easy availability
- **Effectiveness**: ~85-90%

**Female Condom:**
- Polyurethane sheath lining vagina
- Less common
- **Effectiveness**: ~79-85%

**B. Diaphragms, Cervical Caps, Vaults**
- Rubber/silicone barriers covering cervix
- Inserted before intercourse
- Used with **spermicidal jelly** (increases effectiveness)
- **Effectiveness**: ~80-85% (with spermicide)
- **Drawback**: Requires fitting, must be left in place for 6-8 hours post-intercourse

**C. Spermicides**
- Chemicals (creams, foams, jellies) that kill sperms
- Used with other barrier methods
- **Effectiveness**: Low alone (~70%), better with barriers

### 3. Intra-Uterine Devices (IUDs)

**Mechanism**: Inserted into uterus to prevent implantation and/or fertilization

**Types:**

**A. Non-medicated (Inert)**
- **Lippes Loop** (plastic loop)
- **Effectiveness**: ~95%

**B. Copper-releasing IUDs**
- **Copper-T** (CuT), **Multiload 375**
- Copper ions toxic to sperms, prevent fertilization
- Also suppress sperm motility
- **Effectiveness**: ~95-99%
- **Duration**: 3-10 years (depending on type)
- **Advantages**: Long-term, reversible, highly effective
- **Drawbacks**: Requires medical insertion, may increase menstrual bleeding/cramps

**C. Hormone-releasing IUDs**
- **Progestin-releasing** (LNG-IUS)
- Makes cervical mucus thick (blocks sperm)
- Thins endometrium (prevents implantation)
- **Effectiveness**: >99%
- **Duration**: 3-5 years

### 4. Hormonal Contraceptives

**Mechanism**: Use synthetic hormones (estrogen, progestogen) to prevent ovulation and/or implantation

**A. Oral Pills**

**Combined Oral Contraceptives (COCs)**:
- Contain **estrogen + progestogen**
- Prevent ovulation
- **Examples**: Mala-N, Saheli
- **Usage**: Daily pill for 21 days, 7-day break (menstruation)
- **Effectiveness**: >99% (with perfect use)

**Progestogen-only Pills (Mini Pills)**:
- Only progestogen
- Thicken cervical mucus, thin endometrium
- Safe for breastfeeding mothers

**Emergency Contraceptive Pills (ECPs)**:
- **"Morning-after pill"**
- High-dose progestogen or estrogen-progestogen
- Taken within **72 hours** of unprotected intercourse
- Prevents ovulation/implantation
- **Not for regular use**

**B. Injectable Contraceptives**
- Progestogen injection
- **Duration**: 1-3 months per injection
- **Effectiveness**: >99%

**C. Implants**
- Progestogen-releasing rods under skin (arm)
- **Duration**: 3-5 years
- **Effectiveness**: >99%
- Reversible (can be removed)

**D. Vaginal Rings, Patches**
- Release hormones transdermally or vaginally
- **Duration**: Weeks to months

**Advantages of Hormonal Methods:**
- Highly effective
- Reversible
- Regulate menstrual cycles
- Reduce menstrual cramps, heavy bleeding

**Disadvantages:**
- Side effects (nausea, weight gain, mood changes, headaches)
- No STI protection
- Requires daily compliance (pills)
- Not suitable for women with certain health conditions (blood clots, breast cancer history)

### 5. Permanent Methods (Surgical Sterilization)

**Mechanism**: Surgical blocking of gamete transport

**A. Vasectomy (Male Sterilization)**
- **Vas deferens** cut and tied
- Prevents sperm from reaching semen
- **Procedure**: Minor surgery (local anesthesia, ~15 minutes)
- **Effectiveness**: >99%
- **Reversibility**: Difficult (possible with surgery, not guaranteed)
- **Does NOT affect**: Sexual desire, erection, ejaculation volume, testosterone

**B. Tubectomy (Female Sterilization)**
- **Fallopian tubes** cut and tied (ligation)
- Prevents ovum-sperm meeting
- **Procedure**: Surgical (laparoscopy or mini-laparotomy)
- **Effectiveness**: >99%
- **Reversibility**: Difficult (possible with surgery, not guaranteed)
- **Does NOT affect**: Menstrual cycles, sexual desire, hormone levels

**Terminal Method**: Most effective, recommended for couples who have completed their family

## Medical Termination of Pregnancy (MTP)

**Definition**: Intentional termination (abortion) of pregnancy

**Legality in India:**
- **Medical Termination of Pregnancy (MTP) Act, 1971**
- Legal under specific conditions

**Legal Conditions:**
- **Up to 20 weeks** of pregnancy (recently extended to 24 weeks in 2021 for certain cases)
- Requires **registered medical practitioner's opinion**
- Reasons:
  - Risk to mother's life or health
  - Severe fetal abnormalities
  - Pregnancy from rape, contraceptive failure
  - Failure of contraceptive in married women

**Methods:**

**1. Medical Abortion (Up to 7-9 weeks)**
- Drugs: **Mifepristone + Misoprostol**
- Blocks progesterone → Endometrium sheds
- **Non-surgical**

**2. Surgical Abortion**
- **Vacuum Aspiration** (Up to 12 weeks): Suction removes embryo
- **Dilation and Evacuation (D&E)** (12-20 weeks): Cervix dilated, fetus removed

**Risks of MTP:**
- Infection
- Hemorrhage
- Incomplete abortion
- Emotional/psychological effects
- Future fertility issues (if complications)

**Misuse:**
- **Sex-selective abortions** (female feticide)
- **Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994**:
  - **Bans sex determination** of fetus
  - Prevents female feticide
  - Addresses skewed sex ratio

## Sexually Transmitted Infections (STIs)

**Definition**: Infections transmitted primarily through sexual contact

**Common Names**: Sexually Transmitted Diseases (STDs), Venereal Diseases (VD)

### Major STIs

**1. Bacterial:**

**A. Gonorrhea**
- **Causative agent**: *Neisseria gonorrhoeae* (bacteria)
- **Symptoms**:
  - Males: Urethritis (burning urination), pus discharge
  - Females: Often asymptomatic, vaginal discharge, pelvic pain
- **Complications**: Pelvic Inflammatory Disease (PID), infertility
- **Treatment**: Antibiotics

**B. Syphilis**
- **Causative agent**: *Treponema pallidum* (bacterium)
- **Stages**:
  - **Primary**: Painless sore (chancre) at infection site
  - **Secondary**: Rash, fever, lymph node swelling
  - **Tertiary**: Damage to heart, brain, nerves (years later)
- **Treatment**: Antibiotics (penicillin)

**C. Chlamydia**
- **Causative agent**: *Chlamydia trachomatis*
- **Symptoms**: Often asymptomatic, urethritis, cervicitis
- **Complications**: PID, infertility, ectopic pregnancy
- **Treatment**: Antibiotics

**2. Viral:**

**A. Genital Herpes**
- **Causative agent**: Herpes Simplex Virus (HSV-2)
- **Symptoms**: Painful blisters/sores on genitals
- **Recurrent**: Virus remains dormant, reactivates
- **No cure**: Antiviral drugs reduce symptoms

**B. Genital Warts**
- **Causative agent**: Human Papillomavirus (HPV)
- **Symptoms**: Wart-like growths on genitals
- **High-risk HPV types**: Can cause cervical cancer
- **Prevention**: HPV vaccine (Gardasil, Cervarix)

**C. Hepatitis B**
- **Causative agent**: Hepatitis B Virus (HBV)
- **Transmission**: Sexual contact, blood, mother-to-child
- **Symptoms**: Jaundice, liver damage
- **Chronic**: Can lead to cirrhosis, liver cancer
- **Prevention**: Vaccine available

**D. HIV/AIDS**
- **Causative agent**: Human Immunodeficiency Virus (HIV)
- **Transmission**: Sexual contact, infected blood, mother-to-child
- **Mechanism**: Destroys **CD4+ T cells** (immune cells)
- **AIDS** (Acquired Immunodeficiency Syndrome): Advanced stage
  - Severe immune deficiency
  - Opportunistic infections (TB, pneumonia, fungal infections)
  - **No cure**, but antiretroviral therapy (ART) manages infection
- **Prevention**: Condoms, safe practices, PMTCT (prevention of mother-to-child transmission), PrEP (pre-exposure prophylaxis)

**3. Protozoal:**

**Trichomoniasis**
- **Causative agent**: *Trichomonas vaginalis* (protozoan)
- **Symptoms**: Vaginal discharge, itching, burning
- **Treatment**: Antiprotozoal drugs

### Prevention of STIs

**1. Safe Sex Practices:**
- **Condom use** (most effective against HIV, STIs)
- Limit sexual partners
- Mutual monogamy

**2. Awareness and Education:**
- STI symptoms, transmission
- Early detection and treatment

**3. Regular Screening:**
- Asymptomatic infections

**4. Vaccination:**
- HPV vaccine (cervical cancer prevention)
- Hepatitis B vaccine

**5. Avoid High-Risk Behaviors:**
- Sharing needles (IV drug use)
- Unprotected sex with multiple partners

## Infertility

**Definition**: Inability to conceive after **one year** of unprotected intercourse

**Prevalence**: ~10-15% of couples

**Causes:**

### Male Infertility

**1. Low Sperm Count** (Oligospermia)
- Normal: >40 million/ml
- Low: <20 million/ml

**2. Poor Sperm Motility** (Asthenospermia)
- Sperms swim poorly

**3. Abnormal Sperm Morphology** (Teratospermia)
- Defective shape

**4. Blockages** (Vas deferens obstruction)

**5. Hormonal Imbalances** (Low testosterone, LH, FSH)

**6. Genetic Disorders** (Klinefelter syndrome)

**7. Lifestyle Factors**:
- Smoking, alcohol, drugs
- Obesity
- Stress
- Exposure to heat (tight clothing, hot baths)

### Female Infertility

**1. Ovulation Disorders**
- PCOS (Polycystic Ovary Syndrome)
- Hormonal imbalances

**2. Tubal Blockages** (Fallopian tubes)
- PID, infections, endometriosis

**3. Uterine/Cervical Abnormalities**
- Fibroids, polyps
- Cervical mucus issues

**4. Age**:
- Fertility declines after 35 (fewer eggs, lower quality)

**5. Endometriosis**
- Endometrial tissue grows outside uterus

**6. Premature Ovarian Failure**

**7. Lifestyle Factors** (similar to males)

## Assisted Reproductive Technologies (ART)

**Definition**: Medical procedures to treat infertility

### Common ART Techniques

**1. In Vitro Fertilization (IVF) - "Test-Tube Baby"**

**Process:**
1. **Ovarian stimulation**: Hormones induce multiple follicle development
2. **Egg retrieval**: Eggs collected from ovaries (minor surgery)
3. **Fertilization**: Eggs + sperms mixed in petri dish (lab)
4. **Embryo culture**: Fertilized eggs develop into embryos (2-5 days)
5. **Embryo transfer**: Healthy embryo(s) transferred to uterus
6. **Implantation**: Embryo implants in endometrium

**Success Rate**: ~30-40% per cycle (varies by age, clinic)

**First IVF Baby**: Louise Brown (1978, UK)
**First IVF Baby in India**: Kanupriya Agarwal (1978, Kolkata)

**2. Intracytoplasmic Sperm Injection (ICSI)**
- Single sperm **directly injected** into egg
- Used for severe male infertility (very low sperm count/motility)
- Otherwise similar to IVF

**3. Gamete Intra-Fallopian Transfer (GIFT)**
- Eggs + sperms collected
- **Mixed and immediately transferred** to Fallopian tube
- Fertilization occurs in vivo (inside body)
- Requires at least **one functional Fallopian tube**

**4. Zygote Intra-Fallopian Transfer (ZIFT)**
- Similar to IVF
- **Zygote** (fertilized egg, early stage) transferred to **Fallopian tube** (instead of uterus)
- Requires functional tube

**5. Intrauterine Insemination (IUI) - Artificial Insemination**
- **Sperm directly placed** into uterus (bypassing cervix)
- Timed with ovulation
- Used for:
  - Mild male infertility
  - Cervical mucus issues
  - Unexplained infertility
- **Success Rate**: ~10-20% per cycle

**6. Surrogacy**
- **Surrogate mother** carries pregnancy for infertile couple
- **Gestational surrogacy**: IVF embryo (genetic parents) transferred to surrogate
- **Traditional surrogacy**: Surrogate's egg used (genetic link to surrogate)
- **Ethical/Legal issues**: Exploitation concerns, regulations vary

**7. Embryo/Gamete Donation**
- Donor eggs/sperms used for couples with gamete deficiencies
- **Sperm donation**: Common (sperm banks)
- **Egg donation**: For women with ovarian failure, poor egg quality

### ART Regulations in India

**National Guidelines for ART (2005)**:
- Regulate ART clinics
- Ensure ethical practices
- Prevent exploitation
- Monitor success rates

**Surrogacy (Regulation) Act (2021)**:
- Bans commercial surrogacy
- Allows **altruistic surrogacy** (close relatives)
- Protects surrogate rights

## Amniocentesis

**Definition**: Prenatal diagnostic technique
- Amniotic fluid sampled (contains fetal cells)
- Analyzes fetal chromosomes, genetic disorders

**Uses:**
- Detect **Down syndrome**, other chromosomal abnormalities
- Genetic disorders (Thalassemia, Sickle cell)
- Neural tube defects

**Misuse:**
- **Sex determination** → Female feticide
- **Banned** under PCPNDT Act (1994) for sex selection
`,

    keyConcepts: [
      'Reproductive health: Complete physical, mental, social well-being in reproduction',
      'Birth control: Prevents unwanted pregnancies, spaces births, controls population',
      'Natural methods: Periodic abstinence (rhythm), coitus interruptus, lactational amenorrhea',
      'Barrier methods: Condoms (male/female, protect against STIs), diaphragms, cervical caps, spermicides',
      'IUDs: Copper-T (copper ions kill sperms), hormone-releasing (thicken mucus)',
      'Hormonal contraceptives: Oral pills (prevent ovulation), injectables, implants; Emergency pills (within 72h)',
      'Permanent methods: Vasectomy (vas deferens cut), Tubectomy (Fallopian tubes tied)',
      'MTP: Medical Termination of Pregnancy Act (1971), legal up to 20-24 weeks under conditions',
      'STIs: Gonorrhea, Syphilis (bacterial); Genital herpes, HIV/AIDS, Hepatitis B (viral); Trichomoniasis (protozoal)',
      'HIV/AIDS: Destroys CD4+ T cells, leads to opportunistic infections, no cure (ART manages)',
      'Prevention: Condoms (protect against STIs), safe sex, vaccination (HPV, Hepatitis B)',
      'Infertility: Inability to conceive after 1 year; Causes: Low sperm count, ovulation disorders, tubal blockages',
      'IVF (Test-tube baby): Eggs + sperms fertilized in lab → Embryo transferred to uterus',
      'ICSI: Single sperm injected into egg (severe male infertility)',
      'IUI: Sperm placed directly in uterus (artificial insemination)',
      'PCPNDT Act (1994): Bans sex determination, prevents female feticide'
    ],

    formulas: [
      'Contraceptive effectiveness: Condoms ~85-90%, IUDs ~95-99%, Hormonal >99%, Sterilization >99%',
      'Infertility: Inability to conceive after 1 year of unprotected intercourse',
      'IVF process: Ovarian stimulation → Egg retrieval → Fertilization (in vitro) → Embryo culture → Transfer'
    ],

    learningObjectives: [
      'Understand reproductive health and its importance',
      'Describe contraceptive methods (natural, barrier, IUDs, hormonal, surgical)',
      'Compare effectiveness and mechanisms of different contraceptives',
      'Explain Medical Termination of Pregnancy (MTP) and legal aspects',
      'Identify major sexually transmitted infections (STIs) and their prevention',
      'Understand HIV/AIDS transmission, mechanism, and prevention',
      'Describe causes of male and female infertility',
      'Explain assisted reproductive technologies (IVF, ICSI, IUI, surrogacy)',
      'Understand ethical and legal aspects of ART and sex determination'
    ],

    prerequisites: [
      'Knowledge of human reproductive system',
      'Understanding of fertilization and pregnancy',
      'Basic awareness of diseases and infections'
    ],

    importantTopics: [
      'Contraceptives: Natural (rhythm), Barrier (condoms, protect STIs), IUDs (Copper-T), Hormonal (pills, prevent ovulation)',
      'Permanent sterilization: Vasectomy (males), Tubectomy (females) - >99% effective',
      'MTP: Legal up to 20-24 weeks (India), conditions apply',
      'STIs: Gonorrhea, Syphilis, Genital herpes, HIV/AIDS, HPV (cervical cancer risk)',
      'HIV/AIDS: CD4+ T cell destruction, opportunistic infections, ART (no cure)',
      'Prevention: Condoms (STI protection), safe sex, HPV vaccine, Hepatitis B vaccine',
      'Infertility causes: Low sperm count/motility (males), ovulation disorders/tubal blockages (females)',
      'IVF: Fertilization in lab, embryo transfer to uterus (test-tube baby)',
      'ICSI: Sperm injected into egg (severe male infertility)',
      'PCPNDT Act (1994): Bans sex determination, prevents female feticide'
    ],

    ncertChapterRef: 'Class 12 Biology, Chapter 4',
    estimatedStudyMinutes: 330,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'comparison',
        title: 'Contraceptive Methods',
        description: 'Natural, Barrier, IUDs, Hormonal, Surgical - mechanisms and effectiveness'
      },
      {
        type: 'diagram',
        title: 'Male and Female Sterilization',
        description: 'Vasectomy (vas deferens) and Tubectomy (Fallopian tubes)'
      },
      {
        type: 'flowchart',
        title: 'HIV/AIDS Progression',
        description: 'HIV infection → CD4+ T cell destruction → Immunodeficiency → Opportunistic infections'
      },
      {
        type: 'diagram',
        title: 'IVF Process',
        description: 'Ovarian stimulation → Egg retrieval → Fertilization → Embryo culture → Transfer'
      },
      {
        type: 'comparison',
        title: 'ART Techniques',
        description: 'IVF, ICSI, GIFT, ZIFT, IUI - processes and applications'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Reproductive Health',
      estimatedStudyMinutes: 330,
      difficultyLevel: 4,
      status: 'published',
      visualizationsData: [
      {
        type: 'comparison',
        title: 'Contraceptive Methods',
        description: 'Natural, Barrier, IUDs, Hormonal, Surgical - mechanisms and effectiveness'
      },
      {
        type: 'diagram',
        title: 'Male and Female Sterilization',
        description: 'Vasectomy (vas deferens) and Tubectomy (Fallopian tubes)'
      },
      {
        type: 'flowchart',
        title: 'HIV/AIDS Progression',
        description: 'HIV infection → CD4+ T cell destruction → Immunodeficiency → Opportunistic infections'
      },
      {
        type: 'diagram',
        title: 'IVF Process',
        description: 'Ovarian stimulation → Egg retrieval → Fertilization → Embryo culture → Transfer'
      },
      {
        type: 'comparison',
        title: 'ART Techniques',
        description: 'IVF, ICSI, GIFT, ZIFT, IUI - processes and applications'
      }
    ]
    }
  });

  console.log('✅ Biology Class 12 Chapter 4: Reproductive Health seeded successfully!');
}

seedBiologyClass12Chapter4()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
