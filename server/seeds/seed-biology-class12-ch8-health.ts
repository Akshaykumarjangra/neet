import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter8() {
  console.log('Seeding Biology Class 12 Chapter 8: Human Health and Disease...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 8,
    chapterTitle: 'Human Health and Disease',
    introduction: `Health is a state of complete physical, mental, and social well-being, not merely the absence of disease. This chapter explores common diseases affecting humans, their causative agents, transmission, prevention, and treatment. Special focus is given to the immune system's role in defending against pathogens, understanding AIDS and cancer as major health challenges, and the effects of drug and alcohol abuse. Understanding these concepts is vital for NEET as they form the foundation of preventive medicine, immunology, and public health.`,

    detailedNotes: `
# Human Health and Disease

## Classification of Diseases

### 1. Infectious (Communicable) Diseases

Caused by pathogens, spread from person to person

#### Bacterial Diseases

**Typhoid**
- Causative agent: *Salmonella typhi*
- Transmission: Contaminated water/food (fecal-oral route)
- Symptoms: High fever (103-104°F), headache, weakness, stomach pain, constipation or diarrhea
- Diagnosis: Widal test
- Prevention: TAB vaccine, proper sanitation
- Complication: Intestinal perforation

**Pneumonia**
- Causative agent: *Streptococcus pneumoniae*, *Haemophilus influenzae*
- Affects: Alveoli (filled with fluid)
- Symptoms: Fever, chills, cough, difficulty breathing, chest pain
- Transmission: Droplet infection
- Prevention: Vaccination

**Tuberculosis (TB)**
- Causative agent: *Mycobacterium tuberculosis*
- Affects: Lungs primarily, can spread to bones, brain, lymph nodes
- Symptoms: Chronic cough (>3 weeks), blood in sputum (hemoptysis), night sweats, weight loss, chest pain
- Transmission: Airborne (droplet nuclei)
- Diagnosis: Mantoux test (tuberculin test), X-ray
- Prevention: BCG vaccine
- Treatment: DOTS (Directly Observed Treatment Short-course)

**Cholera**
- Causative agent: *Vibrio cholerae*
- Symptoms: Severe watery diarrhea (rice-water stools), dehydration
- Transmission: Contaminated water
- Treatment: ORS (Oral Rehydration Solution)

**Tetanus (Lockjaw)**
- Causative agent: *Clostridium tetani*
- Entry: Through wounds
- Symptoms: Muscle spasms, lockjaw, difficulty swallowing
- Prevention: DPT vaccine, antitetanus serum after injury

#### Viral Diseases

**Common Cold**
- Causative agent: Rhinoviruses
- Affects: Nose, respiratory passages
- Symptoms: Nasal congestion, discharge, sneezing, sore throat, cough
- Transmission: Droplet infection, highly contagious
- No specific treatment, symptomatic relief

**Influenza (Flu)**
- Causative agent: Influenza virus (types A, B, C)
- Symptoms: Fever, body ache, fatigue, respiratory symptoms
- Transmission: Droplet infection
- Prevention: Annual flu vaccine (changes due to antigenic drift/shift)

**AIDS (Acquired Immunodeficiency Syndrome)**
- Causative agent: HIV (Human Immunodeficiency Virus) - retrovirus
- [Detailed section below]

**Hepatitis**
- Inflammation of liver
- **Hepatitis A**: Fecal-oral transmission, vaccine available
- **Hepatitis B**: Blood/body fluids transmission, vaccine available
- **Hepatitis C**: Blood transmission, no vaccine, can become chronic

#### Protozoan Diseases

**Malaria**
- Causative agent: *Plasmodium* (4 species):
  - *P. vivax* (most common)
  - *P. falciparum* (most severe)
  - *P. malariae*
  - *P. ovale*
- Vector: Female *Anopheles* mosquito
- Symptoms: Recurring fever (every 48-72 hours), chills, sweating (cold-hot-sweating stages), headache, vomiting
- Life cycle: Alternates between human and mosquito
  - Human: Asexual reproduction in liver and RBCs
  - Mosquito: Sexual reproduction in gut
- Diagnosis: Blood smear examination
- Prevention: Mosquito control, bed nets, prophylaxis
- Treatment: Chloroquine, artemisinin-based therapy

**Amoebiasis (Amoebic Dysentery)**
- Causative agent: *Entamoeba histolytica*
- Transmission: Contaminated water/food
- Symptoms: Abdominal pain, diarrhea with blood and mucus, cramping
- Can cause liver abscess

#### Helminthic (Worm) Diseases

**Ascariasis**
- Causative agent: *Ascaris lumbricoides* (roundworm)
- Transmission: Contaminated food/water with eggs
- Symptoms: Internal bleeding, muscular pain, fever, anemia, intestinal blockage
- Migration: Intestine → blood → lungs → throat → intestine

**Filariasis (Elephantiasis)**
- Causative agent: *Wuchereria bancrofti* (filarial worm)
- Vector: *Culex* mosquito
- Symptoms: Lymphatic vessels blocked, chronic inflammation, extreme swelling of lower limbs, scrotum
- Prevention: Mosquito control, DEC (diethylcarbamazine) prophylaxis

#### Fungal Diseases

**Ringworm**
- Causative agents: Dermatophytes (*Microsporum*, *Trichophyton*, *Epidermophyton*)
- Affects: Skin, scalp, nails
- Symptoms: Dry, scaly lesions with intense itching, circular patches
- Transmission: Direct contact, contaminated objects
- Treatment: Antifungal creams

### 2. Non-Infectious (Non-Communicable) Diseases

Cannot spread from person to person

**Cancer**: [Detailed section below]

**Diabetes**: High blood sugar levels
- Type 1: Insulin deficiency (autoimmune)
- Type 2: Insulin resistance (lifestyle-related)

**Cardiovascular Diseases**: Heart attacks, strokes, hypertension

**Allergies**: Hypersensitive immune response to allergens (pollen, dust, food)

## Immunity and Immune System

**Immunity**: Body's ability to resist and eliminate pathogens

### Types of Immunity

#### 1. Innate (Non-Specific) Immunity

Present from birth, provides immediate general protection

**A. Physical Barriers**
- **Skin**: Prevents pathogen entry, acidic pH (3-5)
- **Mucus membranes**: Trap pathogens in nose, respiratory tract
- **Stomach acid (HCl)**: Kills ingested pathogens
- **Tears, saliva**: Contain lysozyme enzyme (destroys bacterial cell walls)

**B. Cellular Barriers**
- **Phagocytes**: Neutrophils, monocytes engulf and destroy pathogens
- **Natural Killer (NK) cells**: Destroy virus-infected cells and cancer cells
- **Macrophages**: Large phagocytes in tissues

**C. Inflammatory Response**
- Triggered by tissue damage or infection
- **Histamine** released from mast cells
- **Vasodilation** and increased permeability
- **Signs**: Redness, swelling, heat, pain
- **Function**: Brings phagocytes to site, limits spread

#### 2. Acquired (Adaptive/Specific) Immunity

Develops during lifetime, specific to particular pathogens

**Characteristics**:
- **Specificity**: Recognizes specific antigens
- **Memory**: Responds faster upon re-exposure (immunological memory)
- **Diversity**: Can recognize millions of different antigens

**Types**:

**A. Humoral (Antibody-Mediated) Immunity**
- Involves **B-lymphocytes** (B cells)
- Produced in bone marrow
- Secrete **antibodies** (immunoglobulins)
- Effective against bacteria, viruses in blood/lymph, toxins

**Antibody Structure**:
- **Y-shaped protein** molecule
- Two heavy chains, two light chains
- **Variable region**: Binds to specific antigen (antigen-binding site)
- **Constant region**: Determines antibody class
- **Five classes**: IgG, IgM, IgA, IgE, IgD
  - **IgG**: Most abundant, crosses placenta
  - **IgM**: First response, pentamer
  - **IgA**: In secretions (saliva, tears, breast milk)
  - **IgE**: Allergic reactions, parasitic infections

**B. Cell-Mediated Immunity (CMI)**
- Involves **T-lymphocytes** (T cells)
- Mature in thymus
- Effective against virus-infected cells, cancer cells, fungi, transplants

**Types of T cells**:
- **T-helper cells (CD4+)**: Activate B cells and cytotoxic T cells, produce cytokines
- **Cytotoxic T cells (CD8+)**: Destroy infected cells, release perforin
- **Suppressor T cells**: Regulate immune response, prevent autoimmunity
- **Memory T cells**: Long-lived, enable faster secondary response

### Active vs. Passive Immunity

**Active Immunity**: Body produces own antibodies
- **Long-lasting** (years to lifetime)
- **Natural**: After infection, body develops immunity
- **Artificial**: Vaccination with weakened/killed pathogen or antigens

**Passive Immunity**: Antibodies received from external source
- **Temporary** (weeks to months), no memory cells
- **Natural**: Mother to fetus (via placenta), colostrum (first milk)
- **Artificial**: Injection of antibodies (antiserum, antivenom)

### Vaccination

**Principle**: Introduction of weakened/killed pathogen or its antigens to stimulate immune system without causing disease

**Types of Vaccines**:
- **Attenuated** (weakened live): MMR, BCG, polio (oral)
- **Inactivated** (killed): Rabies, hepatitis A, polio (injectable)
- **Subunit** (fragments): Hepatitis B
- **Toxoid**: Tetanus, diphtheria
- **mRNA**: COVID-19 (Pfizer, Moderna)

**Immunization Schedule**: DPT, MMR, polio, hepatitis, etc.

## AIDS (Acquired Immunodeficiency Syndrome)

### Causative Agent: HIV (Human Immunodeficiency Virus)

**Structure**:
- **Retrovirus**: RNA virus with reverse transcriptase enzyme
- **Envelope**: Glycoprotein spikes (gp120)
- **Core proteins**: p24
- Two copies of single-stranded RNA genome

### Transmission

**How HIV spreads**:
- **Sexual contact**: Unprotected sex with infected person
- **Blood transfusion**: Contaminated blood products
- **Sharing needles**: Intravenous drug use
- **Mother to child**: During pregnancy, childbirth, breastfeeding
- **Occupational**: Healthcare workers (needle stick injuries)

**NOT transmitted by**:
- Casual contact, hugging, handshaking
- Mosquito bites (virus doesn't replicate in mosquitoes)
- Sharing food, water, utensils
- Toilet seats, swimming pools

### Infection Mechanism

1. HIV enters body, targets **CD4+ T-helper cells**
2. **gp120** binds to **CD4 receptor** on T cell
3. Virus enters cell, RNA released
4. **Reverse transcriptase** converts viral RNA to DNA
5. Viral DNA integrates into host chromosome (**provirus**)
6. Host cell produces new viral particles
7. New viruses released, infect more T cells
8. Progressive destruction of T-helper cells

### Stages of HIV Infection

**1. Acute Stage** (2-4 weeks after infection)
- Flu-like symptoms (fever, fatigue, rash, swollen lymph nodes)
- High viral load in blood
- Highly infectious

**2. Chronic Stage** (Can last 8-10 years)
- Asymptomatic or mild symptoms
- Virus replicating, T cell count slowly declining (normal: 500-1500/mm³)
- Still infectious

**3. AIDS** (Advanced stage)
- **CD4+ count drops below 200 cells/mm³**
- Severely weakened immune system
- **Opportunistic infections**:
  - *Pneumocystis jirovecii* pneumonia
  - Tuberculosis
  - Candidiasis (oral thrush)
  - Toxoplasmosis
  - Kaposi's sarcoma (cancer)

### Diagnosis

- **ELISA** (Enzyme-Linked Immunosorbent Assay): Detects HIV antibodies (screening test)
- **Western Blot**: Confirmatory test
- **PCR** (Polymerase Chain Reaction): Detects viral RNA, used for early detection

### Treatment

**No cure available**, but manageable with treatment

**Antiretroviral Therapy (ART) / HAART**:
- Combination of drugs from different classes:
  - **Reverse transcriptase inhibitors** (NRTIs, NNRTIs)
  - **Protease inhibitors**
  - **Integrase inhibitors**
- Suppresses viral replication
- Prevents progression to AIDS
- Reduces transmission risk (U=U: Undetectable = Untransmittable)
- Lifelong treatment required

### Prevention

- Safe sex practices (condoms)
- Avoid sharing needles, syringes
- Screen blood for transfusion
- Prevent mother-to-child transmission (ART during pregnancy, avoid breastfeeding)
- **PrEP** (Pre-Exposure Prophylaxis) for high-risk individuals
- **PEP** (Post-Exposure Prophylaxis) within 72 hours of exposure

## Cancer

**Definition**: Uncontrolled and abnormal cell division leading to tumor formation

### Normal Cell vs. Cancer Cell

**Normal cells**:
- Regulated growth and division
- **Contact inhibition** (stop dividing when touching other cells)
- Limited number of divisions (Hayflick limit)
- Undergo apoptosis (programmed cell death) when damaged

**Cancer cells**:
- Uncontrolled growth
- **No contact inhibition**
- Immortal (divide indefinitely)
- Evade apoptosis
- Can invade tissues and spread (**metastasis**)

### Types of Tumors

**1. Benign Tumors**
- Remain localized, do not invade
- Slow growth
- Encapsulated
- Not cancerous
- Can be surgically removed
- Examples: Moles, uterine fibroids

**2. Malignant Tumors**
- Invade surrounding tissues
- Rapid, uncontrolled growth
- Not encapsulated
- Cancerous
- Can **metastasize** (spread via blood/lymph to other organs)

### Causes of Cancer (Carcinogens)

**1. Physical Carcinogens**:
- **Ionizing radiation**: X-rays, gamma rays, UV rays
- UV from sun: Causes skin cancer (melanoma)

**2. Chemical Carcinogens**:
- **Tobacco smoke**: Lung, mouth, throat cancer (contains 50+ carcinogens)
- Alcohol: Liver cancer
- Asbestos: Mesothelioma
- Benzene, arsenic, vinyl chloride
- **Aflatoxin** (from *Aspergillus* fungus): Liver cancer

**3. Biological Carcinogens (Oncogenic Viruses)**:
- **Hepatitis B and C viruses**: Liver cancer
- **HPV** (Human Papilloma Virus): Cervical cancer
- **EBV** (Epstein-Barr Virus): Burkitt's lymphoma
- **HTLV-1**: Adult T-cell leukemia

**4. Genetic Factors**:
- Inherited mutations increase risk
- **BRCA1, BRCA2** genes: Breast and ovarian cancer
- **p53 tumor suppressor gene** mutations

### Oncogenes and Tumor Suppressors

**Proto-oncogenes**: Normal genes regulating cell growth and division
- When mutated → **Oncogenes** → promote cancer

**Tumor suppressor genes**: Prevent uncontrolled division
- Examples: **p53** (guardian of genome), **RB** (retinoblastoma)
- When inactivated → loss of growth control → cancer

**Cancer occurs when**:
- Oncogenes activated (accelerator stuck)
- OR Tumor suppressors inactivated (brakes fail)

### Metastasis

**Process**:
1. Cancer cells break away from primary tumor
2. Enter bloodstream or lymphatic system
3. Travel to distant organs
4. Form **secondary tumors** (metastases)

### Detection and Diagnosis

- **Biopsy**: Tissue examination under microscope (histopathology)
- **Imaging**: X-ray, CT scan, MRI, PET scan
- **Blood tests**: Tumor markers (PSA, CEA, CA-125)
- **Endoscopy**: Direct visualization

### Treatment

**1. Surgery**: Remove tumor and surrounding tissue

**2. Radiotherapy**: High-energy radiation kills rapidly dividing cells
- External beam or internal (brachytherapy)
- Side effects: Damage to nearby normal cells

**3. Chemotherapy**: Drugs kill rapidly dividing cells
- Systemic treatment (affects whole body)
- Side effects: Hair loss, nausea, weakened immunity

**4. Immunotherapy**: Boost immune system to fight cancer
- Checkpoint inhibitors, CAR-T cell therapy

**5. Targeted Therapy**: Drugs target specific molecules in cancer cells
- Examples: Herceptin (breast cancer), Gleevec (CML)

**6. Hormone Therapy**: For hormone-dependent cancers (breast, prostate)

### Prevention

- **Avoid tobacco and limit alcohol**
- Balanced diet, regular exercise
- Avoid excessive sun exposure
- **Vaccination**: HPV vaccine (cervical cancer), Hepatitis B vaccine
- Early detection through screening (mammography, Pap smear, colonoscopy)

## Drug and Alcohol Abuse

**Drug Addiction**: Psychological attachment to certain effects of drugs, leading to dependency

### Commonly Abused Drugs

**1. Opioids (Narcotics)**
- Examples: **Heroin**, morphine, codeine
- Derived from opium poppy (*Papaver somniferum*)
- **Effects**: Depress nervous system, euphoria, pain relief, sedation
- Highly addictive
- Overdose: Respiratory failure, coma, death

**2. Cannabinoids**
- Examples: Marijuana, hashish, ganja
- From *Cannabis sativa*
- Active ingredient: **THC** (tetrahydrocannabinol)
- Effects: Altered perception, impaired coordination, increased heart rate
- Affects cardiovascular system, memory

**3. Coca Alkaloid**
- Example: **Cocaine**, crack
- From coca plant (*Erythroxylum coca*)
- **Stimulates** nervous system
- Effects: Euphoria, increased energy, alertness
- Highly addictive
- Damages nasal septum (if snorted), heart problems

**4. Stimulants**
- Examples: Amphetamines, methamphetamine, caffeine
- Increase alertness, physical activity
- Can cause anxiety, paranoia, heart problems

**5. Hallucinogens**
- Examples: **LSD** (Lysergic Acid Diethylamide)
- Cause hallucinations, altered perception of reality
- Can trigger psychiatric disorders, "flashbacks"

### Alcohol Abuse

**Effects**:

**Short-term**:
- Impaired judgment, coordination
- Slurred speech
- Lowered inhibitions
- Increased risk-taking

**Long-term**:
- **Liver damage**: Fatty liver, cirrhosis
- **Brain damage**: Memory loss, cognitive decline
- **Heart disease**: Cardiomyopathy
- **Addiction** (alcoholism)
- Increased risk of cancers (mouth, throat, liver)

### Effects of Drug Abuse

- **Physical dependence** and withdrawal symptoms
- Damage to organs (liver, lungs, brain, heart)
- Increased risk of infections (HIV, hepatitis from needle sharing)
- **Mental health issues**: Depression, anxiety, psychosis
- Social problems (broken relationships, job loss, financial problems)
- Criminal behavior to obtain drugs
- Death from overdose

### Prevention and Control

- **Education and awareness** programs
- Counseling and support groups
- Seeking help and professional treatment
- **Rehabilitation programs**
- Peer pressure resistance training
- Legal measures against drug trafficking
- De-addiction centers

## Summary Points

1. Diseases classified as infectious (caused by pathogens) and non-infectious (lifestyle, genetic)
2. Innate immunity provides non-specific defense through barriers, phagocytes, and inflammation
3. Acquired immunity is specific, develops memory, involves B cells (humoral) and T cells (cell-mediated)
4. Vaccination provides active artificial immunity by stimulating antibody production
5. HIV destroys T-helper cells, leading to AIDS with opportunistic infections; treated with ART
6. Cancer results from uncontrolled cell division; caused by carcinogens, oncogenic viruses, and genetic mutations
7. Drug and alcohol abuse leads to addiction, organ damage, mental health issues, and social problems
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Immune System Overview',
        description: 'Innate and adaptive components.'
      },
      {
        type: 'flowchart',
        title: 'Inflammatory Response',
        description: 'Injury -> cytokines -> leukocyte recruitment.'
      },
      {
        type: 'table',
        title: 'Pathogens and Diseases',
        description: 'Bacteria, viruses, protozoa, and helminths.'
      },
      {
        type: 'comparison',
        title: 'Vaccine Types',
        description: 'Live, killed, toxoid, and subunit.'
      },
      {
        type: 'graph',
        title: 'Antibody Titer Over Time',
        description: 'Primary vs secondary immune response.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Human Health and Disease',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Immune System Overview',
          description: 'Innate and adaptive components.'
        },
        {
          type: 'flowchart',
          title: 'Inflammatory Response',
          description: 'Injury -> cytokines -> leukocyte recruitment.'
        },
        {
          type: 'table',
          title: 'Pathogens and Diseases',
          description: 'Bacteria, viruses, protozoa, and helminths.'
        },
        {
          type: 'comparison',
          title: 'Vaccine Types',
          description: 'Live, killed, toxoid, and subunit.'
        },
        {
          type: 'graph',
          title: 'Antibody Titer Over Time',
          description: 'Primary vs secondary immune response.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 8: Human Health and Disease');
}

seedBiologyClass12Chapter8().catch(console.error);
