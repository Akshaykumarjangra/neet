import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyChapter20() {
  console.log('Seeding Biology Class 11 Chapter 20: Locomotion and Movement...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 20,
    chapterTitle: 'Locomotion and Movement',
    introduction: `Movement is a fundamental characteristic of living organisms. In humans, the musculoskeletal system enables diverse movements ranging from simple limb movements to complex coordinated activities like running, dancing, and playing sports. The skeletal system provides structural support, protection for vital organs, and serves as attachment sites for muscles. The muscular system generates force through contraction, enabling movement when muscles pull on bones across joints. Understanding the intricate coordination between bones, joints, and muscles is essential for fields like sports medicine, physiotherapy, orthopedics, and biomechanics. This chapter explores skeletal structure, types of joints, muscle structure and function, mechanism of muscle contraction, and disorders of the musculoskeletal system.`,

    detailedNotes: `
# Locomotion and Movement

## Definitions

**Movement**: Change in position or orientation of body parts
- Can be voluntary or involuntary
- Examples: Heartbeat, peristalsis, limb movement

**Locomotion**: Movement of entire body from one place to another
- Examples: Walking, running, swimming, flying
- Requires coordinated muscular and skeletal activity

## Types of Movement

**1. Amoeboid Movement**
- Using pseudopodia (false feet)
- Examples: Amoeba, WBCs (macrophages)
- Mechanism: Cytoplasmic streaming

**2. Ciliary Movement**
- Using cilia (hair-like structures)
- Examples: Paramecium, epithelial cells lining respiratory tract, fallopian tubes
- Coordinated beating of cilia

**3. Flagellar Movement**
- Using flagella (whip-like structures)
- Examples: Bacteria, sperm cells
- Undulating motion

**4. Muscular Movement**
- Using muscles attached to skeletal framework
- Examples: Human locomotion, most vertebrates
- Most efficient and powerful

## Human Skeletal System

**Functions:**
1. **Support**: Framework for body
2. **Protection**: Skull (brain), ribcage (heart, lungs), vertebral column (spinal cord)
3. **Movement**: Attachment for muscles, leverage
4. **Mineral storage**: Calcium, phosphorus reservoir
5. **Blood cell formation**: Red bone marrow (hematopoiesis)
6. **Fat storage**: Yellow bone marrow

### Skeleton Organization

**Total Bones**: 206 bones in adult human

**Two Divisions:**

**1. Axial Skeleton (80 bones)**
- Forms body axis
- Parts:
  - **Skull**: 22 bones (8 cranial + 14 facial)
  - **Hyoid bone**: 1 (supports tongue)
  - **Vertebral column**: 26 bones (7 cervical + 12 thoracic + 5 lumbar + 1 sacrum + 1 coccyx)
  - **Ribs and sternum**: 25 bones (24 ribs + 1 sternum/breastbone)

**2. Appendicular Skeleton (126 bones)**
- Limbs and girdles
- Parts:
  - **Pectoral girdles**: 4 bones (2 clavicles/collarbones + 2 scapulae/shoulder blades)
  - **Upper limbs**: 60 bones (2 × 30 each)
    - Humerus (arm), radius + ulna (forearm), 8 carpals (wrist), 5 metacarpals (palm), 14 phalanges (fingers)
  - **Pelvic girdle**: 2 hip bones (each formed by fusion of ilium, ischium, pubis)
  - **Lower limbs**: 60 bones (2 × 30 each)
    - Femur (thigh), patella (kneecap), tibia + fibula (leg), 7 tarsals (ankle), 5 metatarsals (sole), 14 phalanges (toes)

### Bone Structure

**Components:**

**1. Compact (Cortical) Bone**
- Dense, hard outer layer
- ~80% of bone mass
- Provides strength

**2. Spongy (Cancellous/Trabecular) Bone**
- Porous, inner layer
- Filled with red bone marrow
- Lighter, shock absorption

**Bone Matrix:**
- **Organic**: Collagen fibers (flexibility)
- **Inorganic**: Calcium phosphate, calcium carbonate (hardness - ~65-70%)

**Bone Cells:**
- **Osteoblasts**: Bone formation
- **Osteocytes**: Mature bone cells (maintain bone)
- **Osteoclasts**: Bone resorption (breakdown)

## Joints (Articulations)

**Definition**: Point of contact between bones

**Classification by Structure:**

### 1. Fibrous Joints
- Bones joined by fibrous connective tissue
- **No movement** (synarthroses)
- Examples: Skull sutures, teeth in sockets

### 2. Cartilaginous Joints
- Bones joined by cartilage
- **Slight movement** (amphiarthroses)
- Examples: Vertebrae (intervertebral discs), pubic symphysis

### 3. Synovial Joints
- Bones separated by synovial cavity (fluid-filled space)
- **Freely movable** (diarthroses)
- Most common in limbs

**Synovial Joint Structure:**

Components:
1. **Articular cartilage**: Covers bone ends (hyaline cartilage), reduces friction
2. **Joint cavity**: Contains synovial fluid
3. **Synovial membrane**: Lines joint cavity, secretes synovial fluid
4. **Joint capsule**: Fibrous outer layer (ligaments), encloses joint
5. **Ligaments**: Connect bone to bone, stabilize joint
6. **Bursae**: Fluid-filled sacs, reduce friction (some joints)

**Synovial Fluid:**
- Viscous, slippery
- Functions:
  - Lubricates joint (reduces friction)
  - Nourishes articular cartilage
  - Shock absorption

### Types of Synovial Joints

**1. Ball and Socket Joint**
- **Movement**: Widest range (multiaxial)
  - Flexion-extension, abduction-adduction, rotation, circumduction
- **Examples**: Shoulder (humerus + scapula), Hip (femur + pelvis)

**2. Hinge Joint**
- **Movement**: One plane (uniaxial)
  - Flexion-extension only
- **Examples**: Elbow (humerus + ulna), Knee (femur + tibia), fingers, toes

**3. Pivot Joint**
- **Movement**: Rotation around axis (uniaxial)
- **Examples**: Atlas-axis (neck rotation), Radius-ulna (forearm rotation - pronation/supination)

**4. Gliding (Plane) Joint**
- **Movement**: Sliding/gliding (multiaxial, limited range)
- **Examples**: Carpals (wrist), tarsals (ankle), between vertebrae

**5. Saddle Joint**
- **Movement**: Two planes (biaxial)
- **Examples**: Thumb (trapezium + metacarpal I)

**6. Condyloid (Ellipsoidal) Joint**
- **Movement**: Two planes (biaxial)
- **Examples**: Wrist (radius + carpals), knuckles

## Muscular System

**Number**: ~600 skeletal muscles in humans (~40-50% body weight)

### Types of Muscles

**1. Skeletal Muscle (Striated, Voluntary)**
- **Location**: Attached to bones
- **Appearance**: Striped/striated (light + dark bands)
- **Control**: Voluntary (conscious control)
- **Cells**: Multinucleated, cylindrical muscle fibers
- **Function**: Body movement, posture
- **Examples**: Biceps, triceps, quadriceps

**2. Smooth Muscle (Non-striated, Involuntary)**
- **Location**: Walls of hollow organs
- **Appearance**: No striations (smooth)
- **Control**: Involuntary (autonomic nervous system)
- **Cells**: Uninucleated, spindle-shaped
- **Function**: Movement of substances through organs
- **Examples**: Digestive tract, blood vessels, urinary bladder

**3. Cardiac Muscle (Striated, Involuntary)**
- **Location**: Heart wall only
- **Appearance**: Striated
- **Control**: Involuntary (auto-rhythmic)
- **Cells**: Uninucleated (or binucleated), branched, interconnected by intercalated discs
- **Function**: Pumps blood
- **Special feature**: Gap junctions allow rapid electrical conduction

## Skeletal Muscle Structure

**Levels of Organization (largest to smallest):**

**1. Muscle (Organ level)**
- Covered by **epimysium** (connective tissue sheath)

**2. Muscle Fascicle (Bundle)**
- Group of muscle fibers
- Covered by **perimysium**

**3. Muscle Fiber (Cell)**
- Single muscle cell (10-100 μm diameter, up to 30 cm long)
- Multinucleated (100s of nuclei)
- Plasma membrane: **Sarcolemma**
- Cytoplasm: **Sarcoplasm**
- Covered by **endomysium**
- Contains many **myofibrils**

**4. Myofibril**
- Thread-like structure (1-2 μm diameter)
- Contractile unit
- Contains **myofilaments** (actin + myosin)
- Shows **striations** (alternating light and dark bands)

**5. Myofilaments**
- **Thin filaments**: Actin (with troponin + tropomyosin)
- **Thick filaments**: Myosin

### Sarcomere

**Definition**: Functional (contractile) unit of muscle

**Boundaries**: Z-line to Z-line (~2-3 μm)

**Bands and Zones:**

**A Band (Anisotropic - Dark)**
- Length of thick (myosin) filaments
- Contains both thick + thin filaments (overlap region)
- Does NOT shorten during contraction

**I Band (Isotropic - Light)**
- Contains only thin (actin) filaments
- **Shortens** during contraction

**H Zone**
- Center of A band
- Contains only thick filaments (no overlap)
- **Shortens** during contraction

**M Line**
- Middle of H zone
- Connects thick filaments

**Z Line (Z Disc)**
- Boundary of sarcomere
- Anchors thin filaments

**During Contraction:**
- I band shortens
- H zone shortens
- A band remains same length
- Sarcomere shortens (Z lines come closer)

## Mechanism of Muscle Contraction

### Sliding Filament Theory (H.E. Huxley & A.F. Huxley, 1954)

**Principle**: Muscle contraction occurs by sliding of thin (actin) filaments over thick (myosin) filaments

**Key Points:**
- Filaments themselves do NOT shorten
- Thin filaments slide past thick filaments
- Increased overlap between actin and myosin
- Sarcomere shortens

### Molecular Mechanism

**Myosin Structure:**
- Thick filament
- Each myosin molecule has:
  - Tail region
  - **Head (cross-bridge)**: Binds to actin, has ATPase activity

**Actin Structure:**
- Thin filament
- Double helix of F-actin (polymer of G-actin monomers)
- **Troponin**: Binds Ca²⁺
- **Tropomyosin**: Covers myosin-binding sites on actin (in relaxed state)

### Steps of Muscle Contraction (Cross-Bridge Cycle)

**Resting State:**
- Tropomyosin blocks myosin-binding sites on actin
- Myosin heads have ADP + Pi bound (energized)
- Ca²⁺ concentration low in sarcoplasm

**1. Excitation (Neural Stimulus)**
- Motor neuron releases **acetylcholine (ACh)** at neuromuscular junction
- ACh binds to receptors on sarcolemma → Depolarization
- Action potential spreads along sarcolemma and into **T-tubules** (transverse tubules)

**2. Excitation-Contraction Coupling**
- Action potential in T-tubules triggers **sarcoplasmic reticulum (SR)** to release **Ca²⁺**
- Ca²⁺ concentration in sarcoplasm increases (10⁻⁷ M → 10⁻⁵ M)

**3. Ca²⁺ Binding**
- Ca²⁺ binds to **troponin** on thin filament
- Troponin changes shape → Pulls tropomyosin away from myosin-binding sites
- Myosin-binding sites on actin **exposed**

**4. Cross-Bridge Formation**
- Myosin head binds to actin → Forms **cross-bridge**
- Releases Pi (inorganic phosphate)

**5. Power Stroke**
- Myosin head pivots, pulls actin filament toward center of sarcomere
- ADP released
- Thin filament slides ~10 nm

**6. Cross-Bridge Detachment**
- **ATP binds** to myosin head
- Myosin head detaches from actin

**7. Reactivation of Myosin Head**
- ATP hydrolyzed → ADP + Pi (by myosin ATPase)
- Energy stored in myosin head (cocked position)
- Myosin head ready for next cycle

**Cycle repeats** as long as Ca²⁺ and ATP are available

**Relaxation:**
- Neural stimulus stops
- Ca²⁺ pumped back into SR (by Ca²⁺-ATPase)
- Ca²⁺ dissociates from troponin
- Tropomyosin covers myosin-binding sites again
- Cross-bridge cycle stops
- Muscle relaxes

### Energy for Muscle Contraction

**ATP Required for:**
1. Power stroke (cross-bridge sliding)
2. Ca²⁺ pumping back into SR
3. Detachment of myosin from actin

**ATP Sources:**
1. **Immediate**: Stored ATP (lasts few seconds)
2. **Short-term**: **Creatine phosphate** → Donates phosphate to ADP → ATP (lasts ~15 seconds)
3. **Long-term**: 
   - Aerobic respiration (glucose + O₂) - sustained activity
   - Anaerobic glycolysis (glucose → lactic acid) - intense activity

**Oxygen Debt:**
- Accumulation of lactic acid during anaerobic exercise
- Repaid by increased breathing after exercise (lactic acid → glucose in liver)

## Neuromuscular Junction (Motor End Plate)

**Definition**: Synapse between motor neuron and muscle fiber

**Structure:**
- **Axon terminal**: Contains synaptic vesicles with acetylcholine (ACh)
- **Synaptic cleft**: Gap (~20-50 nm)
- **Motor end plate**: Specialized region of sarcolemma with ACh receptors

**Transmission:**
1. Action potential reaches axon terminal
2. Ca²⁺ influx triggers ACh release (exocytosis)
3. ACh diffuses across cleft
4. ACh binds to receptors on sarcolemma
5. Na⁺ channels open → Depolarization (end plate potential)
6. If threshold reached → Action potential in muscle fiber
7. **Acetylcholinesterase** enzyme degrades ACh (terminates signal)

## Motor Unit

**Definition**: One motor neuron + all muscle fibers it innervates

**Size:**
- **Small motor units** (1 neuron : few fibers): Fine control (eye muscles, fingers)
- **Large motor units** (1 neuron : 1000s of fibers): Gross movements (thigh muscles)

**Recruitment**: More motor units activated → Stronger contraction

## Muscle Tone

**Definition**: Continuous partial contraction of muscles (even at rest)

**Function:**
- Maintains posture
- Keeps muscles ready for action
- Generates heat

**Mechanism**: A few motor units always active (rotation)

## Types of Muscle Contraction

**1. Isotonic Contraction**
- Muscle shortens
- Tension constant
- Movement occurs
- Examples: Lifting weight, walking

**2. Isometric Contraction**
- Muscle length constant
- Tension increases
- No movement
- Examples: Holding weight stationary, pushing against wall

## Red and White Muscle Fibers

**Red (Slow-Twitch, Type I) Fibers:**
- **Appearance**: Red (high myoglobin content)
- **Mitochondria**: Abundant
- **Metabolism**: Aerobic (oxidative)
- **Contraction**: Slow, sustained
- **Fatigue**: Resistant
- **Examples**: Posture muscles (back, legs)

**White (Fast-Twitch, Type II) Fibers:**
- **Appearance**: White (low myoglobin)
- **Mitochondria**: Fewer
- **Metabolism**: Anaerobic (glycolytic)
- **Contraction**: Fast, powerful
- **Fatigue**: Quickly
- **Examples**: Eye muscles, finger muscles

**Note**: Most muscles have mixture of both types

## Skeletal Muscle Actions

**1. Flexion**: Decreases angle at joint (bending)
**2. Extension**: Increases angle at joint (straightening)
**3. Abduction**: Moves away from midline
**4. Adduction**: Moves toward midline
**5. Rotation**: Turns around axis
**6. Circumduction**: Circular movement (combines above)

## Muscle Pairs

**Antagonistic Muscles**: Pairs with opposite actions
- **Flexor**: Causes flexion
- **Extensor**: Causes extension
- Examples:
  - **Biceps** (flexor) vs **Triceps** (extensor) at elbow
  - **Hamstrings** (flexor) vs **Quadriceps** (extensor) at knee

**Coordination**: When one contracts, antagonist relaxes

## Rigor Mortis

**Definition**: Stiffening of body after death

**Cause:**
- ATP production stops after death
- Myosin-actin cross-bridges cannot detach (ATP needed for detachment)
- Muscles remain contracted

**Timeline:**
- Begins 3-4 hours after death
- Peaks at 12 hours
- Disappears after 48-60 hours (muscle proteins break down)

## Disorders of Muscular and Skeletal System

**Myasthenia Gravis:**
- Autoimmune disorder
- Antibodies block ACh receptors at neuromuscular junction
- Symptoms: Muscle weakness, fatigue
- Treatment: Acetylcholinesterase inhibitors

**Muscular Dystrophy:**
- Genetic disorder (X-linked)
- Progressive muscle degeneration
- **Duchenne muscular dystrophy**: Most common, severe
- Cause: Deficiency of dystrophin protein

**Tetany:**
- Rapid, involuntary muscle contractions
- Cause: Low Ca²⁺ in blood (hypocalcemia)

**Arthritis:**
- Inflammation of joints
- Types:
  - **Osteoarthritis**: Degeneration of articular cartilage (wear and tear)
  - **Rheumatoid arthritis**: Autoimmune, synovial membrane inflammation
- Symptoms: Pain, stiffness, swelling

**Osteoporosis:**
- Bone mass loss (porous, brittle bones)
- Risk: Fractures
- Causes: Aging, low Ca²⁺, hormonal changes (menopause)

**Gout:**
- Uric acid crystal deposition in joints
- Inflammation, pain (especially big toe)

**Dislocation:**
- Bone displaced from joint
- Trauma/injury

**Fracture:**
- Bone break
- Types: Simple (closed), compound (open), comminuted (shattered)
`,

    keyConcepts: [
      'Movement: Change in position; Locomotion: Whole body movement',
      'Types: Amoeboid, Ciliary, Flagellar, Muscular',
      'Human skeleton: 206 bones (80 axial + 126 appendicular)',
      'Axial skeleton: Skull, vertebral column, ribs, sternum',
      'Appendicular skeleton: Limb girdles (pectoral, pelvic) + limbs',
      'Joints: Fibrous (immovable), Cartilaginous (slightly movable), Synovial (freely movable)',
      'Synovial joint types: Ball-socket, Hinge, Pivot, Gliding, Saddle, Condyloid',
      'Muscle types: Skeletal (striated, voluntary), Smooth (non-striated, involuntary), Cardiac (striated, involuntary)',
      'Muscle hierarchy: Muscle → Fascicle → Fiber → Myofibril → Myofilaments (actin + myosin)',
      'Sarcomere: Z-line to Z-line, contractile unit',
      'Bands: A band (dark), I band (light, shortens), H zone (shortens), Z line',
      'Sliding filament theory: Actin slides over myosin, sarcomere shortens',
      'Myosin head: Cross-bridge, binds actin, has ATPase',
      'Troponin binds Ca²⁺, tropomyosin covers binding sites (relaxed)',
      'Contraction steps: Ca²⁺ release → Binding site exposure → Cross-bridge → Power stroke → ATP detachment',
      'ATP needed: Power stroke, Ca²⁺ pumping, myosin detachment',
      'Neuromuscular junction: Motor neuron → ACh → Sarcolemma depolarization',
      'Motor unit: 1 neuron + all fibers it innervates',
      'Red fibers: Slow, aerobic, fatigue-resistant; White fibers: Fast, anaerobic, quick fatigue',
      'Rigor mortis: No ATP → Cross-bridges locked → Stiffness'
    ],

    formulas: [
      'During contraction: Sarcomere shortens, I band shortens, H zone shortens, A band unchanged',
      'Cross-bridge cycle: ATP → ADP + Pi (energize myosin) → Bind actin → Power stroke → ATP detachment'
    ],

    learningObjectives: [
      'Differentiate between movement and locomotion',
      'Describe types of movement (amoeboid, ciliary, flagellar, muscular)',
      'Explain human skeletal system organization (axial and appendicular)',
      'Understand bone structure and functions',
      'Classify joints and describe synovial joint structure',
      'Identify types of synovial joints and their movements',
      'Compare skeletal, smooth, and cardiac muscles',
      'Describe skeletal muscle structure (fascicle, fiber, myofibril, sarcomere)',
      'Explain sarcomere structure and band changes during contraction',
      'Understand sliding filament theory of muscle contraction',
      'Describe molecular mechanism of contraction (cross-bridge cycle)',
      'Explain role of Ca²⁺, troponin, tropomyosin in contraction',
      'Understand neuromuscular junction function',
      'Differentiate between red and white muscle fibers',
      'Identify common musculoskeletal disorders'
    ],

    prerequisites: [
      'Understanding of cell structure',
      'Knowledge of proteins and ATP',
      'Basic understanding of nervous system',
      'Knowledge of calcium ions'
    ],

    importantTopics: [
      'Types of movement',
      '206 bones: 80 axial + 126 appendicular',
      'Joint classification',
      'Synovial joint structure and types',
      'Three muscle types and characteristics',
      'Skeletal muscle structure hierarchy',
      'Sarcomere structure: A band, I band, H zone, Z line',
      'Band changes during contraction',
      'Sliding filament theory',
      'Cross-bridge cycle: Ca²⁺ → Exposure → Binding → Power stroke → Detachment',
      'Role of ATP in contraction',
      'Troponin-tropomyosin regulation',
      'Neuromuscular junction mechanism',
      'Motor unit concept',
      'Red vs white muscle fibers',
      'Rigor mortis mechanism',
      'Antagonistic muscle pairs',
      'Disorders: Myasthenia gravis, muscular dystrophy, arthritis, osteoporosis'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 20',
    estimatedStudyMinutes: 400,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Human Skeletal System',
        description: 'Axial and appendicular skeleton with labeled bones'
      },
      {
        type: 'diagram',
        title: 'Synovial Joint Structure',
        description: 'Articular cartilage, synovial membrane, joint cavity'
      },
      {
        type: 'diagram',
        title: 'Sarcomere Structure',
        description: 'A band, I band, H zone, Z line, actin and myosin'
      },
      {
        type: 'animation',
        title: 'Sliding Filament Mechanism',
        description: 'Cross-bridge cycle showing actin-myosin interaction'
      },
      {
        type: 'flowchart',
        title: 'Muscle Contraction Steps',
        description: 'Neural stimulus → Ca²⁺ release → Cross-bridge → Contraction'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Locomotion and Movement',
      estimatedStudyMinutes: 400,
      difficultyLevel: 4,
      status: 'published',

      learningObjectives: sql`EXCLUDED.learning_objectives`,


      prerequisites: sql`EXCLUDED.prerequisites`,


      importantTopics: sql`EXCLUDED.important_topics`,


      visualizationsData: sql`EXCLUDED.visualizations_data`
    }
  });

  console.log('✅ Biology Chapter 20: Locomotion and Movement seeded successfully!');
}

seedBiologyChapter20()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
