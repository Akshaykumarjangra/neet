import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter21() {
  console.log('Seeding Biology Class 11 Chapter 21: Neural Control and Coordination...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 21,
    chapterTitle: 'Neural Control and Coordination',
    introduction: `The nervous system is the master control and communication system of the body. It processes sensory information, makes decisions, and coordinates responses with remarkable speed and precision. From simple reflex actions to complex cognitive functions like learning and memory, the nervous system orchestrates all aspects of human physiology and behavior. Understanding neural structure and function is fundamental to neuroscience, psychology, medicine, and AI development. This chapter explores neuron structure, nerve impulse generation and transmission, synaptic communication, organization of the nervous system, brain structure and functions, reflex actions, and sensory reception mechanisms.`,

    detailedNotes: `
# Neural Control and Coordination

## Nervous System Overview

**Functions:**
1. **Sensory Input**: Detects changes (stimuli) in internal and external environment
2. **Integration**: Processes and interprets sensory information
3. **Motor Output**: Responds to stimuli through effectors (muscles, glands)

**Characteristics:**
- **Rapid**: Electrical signals (nerve impulses)
- **Specific**: Targeted responses
- **Short-duration**: Quick onset and cessation

**Organization:**
- **Central Nervous System (CNS)**: Brain + Spinal cord
- **Peripheral Nervous System (PNS)**: Nerves extending from CNS

## Neural Tissue

**Two Main Cell Types:**

### 1. Neurons (Nerve Cells)

**Function**: Generate and conduct nerve impulses

**Number**: ~100 billion in human brain

**Structure:**

**A. Cell Body (Soma/Perikaryon)**
- Contains nucleus, Nissl bodies (RER), Golgi apparatus, mitochondria
- Integrates signals
- Protein synthesis

**B. Dendrites**
- Short, branched processes
- Receive signals from other neurons
- Conduct impulses **toward** cell body

**C. Axon**
- Single, long process (can be >1 meter!)
- Conducts impulses **away from** cell body
- **Axon hillock**: Junction with cell body (impulse initiation)
- **Axon terminal**: End branches, forms synapses
- **Synaptic knobs** (boutons): Contain neurotransmitter vesicles

**Myelin Sheath:**
- Fatty insulating layer around axon
- **Formed by**: Schwann cells (PNS), Oligodendrocytes (CNS)
- **Nodes of Ranvier**: Gaps between myelin segments
- **Function**: Speeds up impulse conduction (saltatory conduction)
- **Myelinated vs Unmyelinated**:
  - Myelinated: Faster (70-120 m/s), thicker
  - Unmyelinated: Slower (0.5-2 m/s), thinner

### Classification of Neurons

**By Structure:**
1. **Multipolar**: Many dendrites, one axon (most common, brain, spinal cord)
2. **Bipolar**: One dendrite, one axon (retina, olfactory)
3. **Unipolar (Pseudounipolar)**: Single process splits (sensory neurons)

**By Function:**
1. **Sensory (Afferent)**: Receptors → CNS
2. **Motor (Efferent)**: CNS → Effectors
3. **Interneurons (Association)**: Within CNS, connect sensory and motor

### 2. Neuroglia (Glial Cells)

**Function**: Support, nourish, protect neurons

**Number**: ~10-50× more than neurons

**Types:**

**CNS Glia:**
1. **Astrocytes**: Support, blood-brain barrier, regulate extracellular environment
2. **Oligodendrocytes**: Form myelin in CNS
3. **Microglia**: Immune cells (phagocytosis)
4. **Ependymal cells**: Line ventricles, produce cerebrospinal fluid (CSF)

**PNS Glia:**
1. **Schwann cells**: Form myelin in PNS
2. **Satellite cells**: Support neuron cell bodies in ganglia

## Nerve Impulse (Action Potential)

### Resting Membrane Potential

**Definition**: Voltage difference across neuron membrane at rest

**Value**: **-70 mV** (inside negative relative to outside)

**Cause:**
- **Ion distribution**:
  - **K⁺**: High inside, low outside
  - **Na⁺**: Low inside, high outside
  - **Large anions** (proteins): Inside only
- **Na⁺-K⁺ ATPase pump**: 3 Na⁺ out, 2 K⁺ in (active transport)
- **Leak channels**: K⁺ leaks out faster than Na⁺ leaks in
- **Result**: Net negative charge inside

**Polarized membrane**: Resting state (-70 mV)

### Generation of Action Potential

**Stimulus**: Must reach **threshold** (~-55 mV)

**Phases:**

**1. Depolarization**
- Stimulus opens **voltage-gated Na⁺ channels**
- Na⁺ rushes **into** cell (down concentration gradient)
- Membrane potential becomes **positive** (+30 to +40 mV)
- **Rising phase** of action potential

**2. Repolarization**
- Na⁺ channels close (inactivated)
- **Voltage-gated K⁺ channels** open
- K⁺ rushes **out** of cell
- Membrane potential returns toward **negative** (back to -70 mV)
- **Falling phase**

**3. Hyperpolarization (Undershoot)**
- K⁺ channels slow to close
- Membrane becomes **more negative** than resting (~-80 mV)
- Brief overshoot

**4. Return to Resting Potential**
- K⁺ channels close
- Na⁺-K⁺ pump restores ion distribution
- Back to -70 mV

**Refractory Period:**
- **Absolute**: Na⁺ channels inactivated, NO new action potential possible
- **Relative**: Most Na⁺ channels recovered, only strong stimulus can trigger

**All-or-None Principle:**
- If threshold reached → Full action potential (always same magnitude)
- If threshold not reached → No action potential
- Intensity coded by **frequency**, not amplitude

### Conduction of Action Potential

**Propagation**: Action potential travels along axon

**Mechanism:**
- Depolarization at one point triggers depolarization in adjacent region
- Unidirectional (refractory period prevents backward propagation)

**Two Types:**

**1. Continuous Conduction (Unmyelinated Axons)**
- Action potential regenerated at each point along axon
- Slower (0.5-2 m/s)

**2. Saltatory Conduction (Myelinated Axons)**
- Action potential "jumps" from node to node (Nodes of Ranvier)
- Myelin insulates, prevents ion flow except at nodes
- Much **faster** (70-120 m/s)
- More energy-efficient

**Factors Affecting Conduction Speed:**
1. **Myelination**: Myelinated faster
2. **Axon diameter**: Thicker = faster (less resistance)
3. **Temperature**: Higher = faster (up to a point)

## Synapse

**Definition**: Junction between two neurons (or neuron and effector)

**Types:**
1. **Electrical synapse**: Gap junctions, direct ion flow (rare, cardiac muscle)
2. **Chemical synapse**: Neurotransmitter-mediated (most common)

### Chemical Synapse Structure

**Components:**
1. **Presynaptic neuron**: Axon terminal with neurotransmitter vesicles
2. **Synaptic cleft**: Gap (~20-40 nm)
3. **Postsynaptic neuron**: Receptors for neurotransmitter

### Synaptic Transmission

**Steps:**

**1. Action Potential Arrival**
- Depolarization reaches axon terminal

**2. Ca²⁺ Influx**
- Voltage-gated **Ca²⁺ channels** open
- Ca²⁺ enters presynaptic terminal

**3. Neurotransmitter Release**
- Ca²⁺ triggers vesicle fusion with membrane (exocytosis)
- Neurotransmitter released into synaptic cleft

**4. Neurotransmitter Binding**
- Diffuses across cleft
- Binds to receptors on postsynaptic membrane

**5. Postsynaptic Response**
- **Excitatory**: Opens Na⁺ channels → **EPSP** (Excitatory Post-Synaptic Potential) → Depolarization
- **Inhibitory**: Opens Cl⁻ or K⁺ channels → **IPSP** (Inhibitory Post-Synaptic Potential) → Hyperpolarization

**6. Termination**
- Neurotransmitter removed by:
  - **Enzymatic degradation** (e.g., acetylcholinesterase breaks down ACh)
  - **Reuptake** into presynaptic neuron
  - **Diffusion** away

**Integration**: Postsynaptic neuron sums EPSPs and IPSPs
- If net depolarization reaches threshold → Action potential in postsynaptic neuron

### Major Neurotransmitters

**Acetylcholine (ACh):**
- Neuromuscular junction, autonomic nervous system, brain
- Excitatory (usually)
- Degraded by acetylcholinesterase

**Amino Acids:**
- **Glutamate**: Main excitatory in CNS
- **GABA (γ-aminobutyric acid)**: Main inhibitory in CNS
- **Glycine**: Inhibitory (spinal cord)

**Biogenic Amines:**
- **Dopamine**: Movement, reward, motivation
- **Norepinephrine**: Alertness, arousal
- **Serotonin**: Mood, sleep, appetite
- **Histamine**: Arousal, inflammation

**Neuropeptides:**
- **Endorphins**: Pain relief, pleasure
- **Substance P**: Pain transmission

## Central Nervous System (CNS)

### Brain

**Weight**: ~1.3-1.4 kg (adult human)

**Protection:**
1. **Cranium** (skull)
2. **Meninges** (3 layers):
   - **Dura mater**: Outer, tough
   - **Arachnoid mater**: Middle, web-like
   - **Pia mater**: Inner, delicate, adheres to brain surface
3. **Cerebrospinal fluid (CSF)**: Cushions, nourishes
   - Produced by choroid plexus in ventricles
   - Circulates in ventricles and subarachnoid space

**Three Main Parts:**

### 1. Forebrain (Prosencephalon)

**A. Cerebrum**

**Largest part** of brain (~83% of brain mass)

**Structure:**
- **Two cerebral hemispheres** (left and right)
- Connected by **corpus callosum** (nerve fiber bundle)
- Surface: **Cerebral cortex** (gray matter, 2-4 mm thick)
- **Gyri** (ridges) and **Sulci** (grooves) increase surface area
- **White matter**: Myelinated axons beneath cortex

**Lobes (each hemisphere):**
1. **Frontal lobe**: Motor control, planning, speech (Broca's area), reasoning, personality
2. **Parietal lobe**: Sensory processing (touch, temperature, pain), spatial awareness
3. **Temporal lobe**: Hearing, memory, language comprehension (Wernicke's area)
4. **Occipital lobe**: Vision (visual cortex)

**Functional Areas:**
- **Motor cortex**: Voluntary movement (precentral gyrus, frontal lobe)
- **Sensory cortex**: Touch, temperature, pain (postcentral gyrus, parietal lobe)
- **Association areas**: Higher cognitive functions (thinking, learning, memory)

**Specialized Functions:**
- **Left hemisphere** (most people): Language, logic, math, analytical
- **Right hemisphere**: Spatial skills, face recognition, music, creativity

**B. Diencephalon**

**1. Thalamus**
- Relay station for sensory info (except smell) to cerebral cortex
- Regulates consciousness, alertness

**2. Hypothalamus**
- **Master regulator** of homeostasis
- Functions:
  - Temperature regulation
  - Hunger, thirst, satiety
  - Sleep-wake cycles (circadian rhythm)
  - Emotional responses
  - **Controls pituitary gland** (hormone secretion)
  - Autonomic nervous system regulation

**3. Epithalamus**
- Contains **pineal gland** (secretes melatonin - sleep regulation)

### 2. Midbrain (Mesencephalon)

**Small region** connecting forebrain and hindbrain

**Components:**
- **Cerebral peduncles**: Motor pathways
- **Corpora quadrigemina**: 4 rounded swellings
  - **Superior colliculi**: Visual reflexes
  - **Inferior colliculi**: Auditory reflexes

**Functions:**
- Eye movement control
- Auditory and visual processing
- Posture, balance

### 3. Hindbrain (Rhombencephalon)

**A. Pons**
- Bridge connecting cerebellum to rest of brain
- Relay signals between cerebrum and cerebellum
- Controls breathing (with medulla)

**B. Cerebellum**
- "Little brain" (~10% brain mass)
- Highly folded surface
- **Functions**:
  - **Motor coordination**: Fine-tunes movements
  - **Balance and posture**
  - **Motor learning**: Learning complex motor tasks
  - Timing

**C. Medulla Oblongata**
- Connects brain to spinal cord
- **Vital centers** (involuntary functions):
  - **Respiratory center**: Breathing rhythm
  - **Cardiac center**: Heart rate
  - **Vasomotor center**: Blood pressure
- **Reflex centers**: Coughing, sneezing, swallowing, vomiting

### Spinal Cord

**Location**: Vertebral column (spinal canal)

**Length**: ~43-45 cm (adults)

**Protection**: Vertebrae, meninges, CSF

**Structure:**
- **Gray matter**: H-shaped, central (neuron cell bodies)
  - **Dorsal horns**: Sensory neurons
  - **Ventral horns**: Motor neurons
- **White matter**: Peripheral (myelinated axons)
  - **Ascending tracts**: Sensory info to brain
  - **Descending tracts**: Motor commands from brain

**Functions:**
1. **Conduction**: Pathways between brain and body
2. **Reflex center**: Spinal reflexes

## Peripheral Nervous System (PNS)

**Components**: Nerves and ganglia outside CNS

**Nerve**: Bundle of axons

**Ganglion**: Cluster of neuron cell bodies outside CNS

### Cranial Nerves

**Number**: 12 pairs (arise from brain)

**Examples:**
- **I. Olfactory**: Smell (sensory)
- **II. Optic**: Vision (sensory)
- **III, IV, VI**: Eye movement (motor)
- **V. Trigeminal**: Facial sensation, chewing (mixed)
- **VII. Facial**: Facial expression, taste (mixed)
- **VIII. Vestibulocochlear**: Hearing, balance (sensory)
- **IX. Glossopharyngeal**: Taste, swallowing (mixed)
- **X. Vagus**: Heart, lungs, digestion (mixed - extensive parasympathetic)
- **XI. Accessory**: Neck, shoulder muscles (motor)
- **XII. Hypoglossal**: Tongue movement (motor)

### Spinal Nerves

**Number**: 31 pairs (arise from spinal cord)

**Distribution:**
- 8 Cervical (neck)
- 12 Thoracic (chest)
- 5 Lumbar (lower back)
- 5 Sacral (pelvis)
- 1 Coccygeal (tailbone)

**All mixed** (sensory + motor)

### Divisions of PNS

**1. Somatic Nervous System**
- **Voluntary** control
- Innervates skeletal muscles
- Conscious movements

**2. Autonomic Nervous System (ANS)**
- **Involuntary** control
- Innervates smooth muscle, cardiac muscle, glands
- Regulates internal environment

**Two Divisions:**

**A. Sympathetic** ("Fight or Flight")
- **Activated by**: Stress, danger, exercise
- **Effects**:
  - ↑ Heart rate, ↑ BP
  - Dilates pupils
  - Dilates bronchioles
  - ↓ Digestive activity
  - Stimulates glucose release
  - Stimulates sweating
- **Neurotransmitter**: Norepinephrine (at effectors)

**B. Parasympathetic** ("Rest and Digest")
- **Activated by**: Relaxation, routine maintenance
- **Effects**:
  - ↓ Heart rate, ↓ BP
  - Constricts pupils
  - Constricts bronchioles
  - ↑ Digestive activity
  - Stimulates salivation
- **Neurotransmitter**: Acetylcholine (at effectors)

**Most organs innervated by both** (dual innervation) → Antagonistic control

## Reflex Action

**Definition**: Rapid, involuntary, automatic response to stimulus

**Purpose**: Protection, quick response

**Reflex Arc**: Neural pathway

**Components:**
1. **Receptor**: Detects stimulus
2. **Sensory neuron** (afferent): Carries signal to CNS
3. **Integration center**: CNS (spinal cord or brain)
4. **Motor neuron** (efferent): Carries signal to effector
5. **Effector**: Muscle or gland that responds

**Types:**

**Monosynaptic Reflex:**
- **One synapse** (sensory → motor)
- Example: **Knee-jerk (patellar) reflex**
  - Tap patellar tendon → Stretch receptor in quadriceps
  - Sensory neuron → Spinal cord
  - Synapse directly with motor neuron
  - Motor neuron → Quadriceps contracts → Leg extends

**Polysynaptic Reflex:**
- **Multiple synapses** (includes interneurons)
- Example: **Withdrawal reflex**
  - Touch hot object → Pain receptor
  - Sensory neuron → Spinal cord
  - Interneuron → Motor neuron
  - Motor neuron → Flexor muscles contract → Hand withdraws

**Cranial reflexes**: Involve brain (pupillary reflex, gag reflex)

**Spinal reflexes**: Involve spinal cord (knee-jerk, withdrawal)

## Sensory Reception

**Receptor**: Specialized cell/ending that detects stimulus

**Sensory Transduction**: Stimulus → Electrical signal

### Classification of Receptors

**By Stimulus Type:**
1. **Mechanoreceptors**: Mechanical pressure, touch, stretch, vibration, sound
2. **Thermoreceptors**: Temperature
3. **Photoreceptors**: Light
4. **Chemoreceptors**: Chemicals (taste, smell, O₂, CO₂, pH)
5. **Nociceptors**: Pain (tissue damage)

**By Location:**
1. **Exteroceptors**: External stimuli (skin, eyes, ears)
2. **Interoceptors**: Internal stimuli (blood pressure, pH, organ stretch)
3. **Proprioceptors**: Body position, movement (muscles, tendons, joints)

## Memory and Learning

**Memory**: Storage and retrieval of information

**Types:**
- **Short-term (working) memory**: Temporary (seconds to minutes)
- **Long-term memory**: Permanent storage
  - **Declarative** (explicit): Facts, events (hippocampus)
  - **Procedural** (implicit): Skills, habits (cerebellum, basal ganglia)

**Learning**: Acquisition of knowledge or skills

**Synaptic Plasticity**: Strengthening/weakening of synapses
- **Long-Term Potentiation (LTP)**: Repeated stimulation → Stronger synapse
- Basis of learning and memory

## Sleep

**Definition**: Reversible state of reduced consciousness

**Functions**: Restoration, memory consolidation, metabolic regulation

**Stages:**
- **REM (Rapid Eye Movement)**: Dreaming, muscle paralysis
- **Non-REM (NREM)**: Deep sleep, restorative
`,

    keyConcepts: [
      'Nervous system: CNS (brain + spinal cord) + PNS (nerves)',
      'Neuron parts: Cell body, dendrites (toward cell body), axon (away from cell body)',
      'Myelin sheath: Schwann cells (PNS), oligodendrocytes (CNS), speeds conduction',
      'Resting potential: -70 mV (inside negative)',
      'Action potential: Depolarization (Na⁺ in, +40 mV) → Repolarization (K⁺ out, -70 mV)',
      'All-or-none principle: Threshold (-55 mV) → Full action potential',
      'Saltatory conduction: Jumps node to node, faster (70-120 m/s)',
      'Synapse: Presynaptic terminal → Neurotransmitter → Postsynaptic receptor',
      'Neurotransmitters: ACh, glutamate (excitatory), GABA (inhibitory), dopamine, serotonin',
      'Brain parts: Forebrain (cerebrum, thalamus, hypothalamus), Midbrain, Hindbrain (pons, cerebellum, medulla)',
      'Cerebrum: 4 lobes (frontal, parietal, temporal, occipital), motor/sensory cortex',
      'Hypothalamus: Temperature, hunger, thirst, sleep, pituitary control',
      'Cerebellum: Motor coordination, balance',
      'Medulla: Respiratory, cardiac, vasomotor centers',
      'Spinal cord: Gray matter (H-shaped, central), white matter (tracts)',
      '12 cranial nerves, 31 spinal nerves',
      'Autonomic: Sympathetic (fight-flight) vs Parasympathetic (rest-digest)',
      'Reflex arc: Receptor → Sensory → CNS → Motor → Effector',
      'Knee-jerk: Monosynaptic; Withdrawal: Polysynaptic'
    ],

    formulas: [
      'Resting potential = -70 mV (K⁺ high inside, Na⁺ high outside)',
      'Na⁺-K⁺ pump: 3 Na⁺ out, 2 K⁺ in (maintains gradient)',
      'Action potential: Threshold -55 mV → Peak +40 mV → Return -70 mV'
    ],

    learningObjectives: [
      'Understand nervous system organization (CNS and PNS)',
      'Describe neuron structure and types',
      'Explain resting membrane potential maintenance',
      'Understand action potential generation and phases',
      'Describe conduction in myelinated vs unmyelinated axons',
      'Explain synaptic transmission mechanism',
      'Identify major neurotransmitters and functions',
      'Describe brain structure (forebrain, midbrain, hindbrain)',
      'Explain functions of cerebrum lobes',
      'Understand hypothalamus, cerebellum, medulla roles',
      'Describe spinal cord structure',
      'Differentiate somatic and autonomic nervous systems',
      'Compare sympathetic and parasympathetic divisions',
      'Explain reflex arc components',
      'Classify sensory receptors'
    ],

    prerequisites: [
      'Understanding of cell membrane structure',
      'Knowledge of ions (Na⁺, K⁺, Ca²⁺)',
      'Basic understanding of ATP',
      'Knowledge of proteins and receptors'
    ],

    importantTopics: [
      'Neuron structure: Cell body, dendrites, axon',
      'Myelin sheath and nodes of Ranvier',
      'Resting potential: -70 mV',
      'Action potential phases: Depolarization, repolarization, hyperpolarization',
      'All-or-none principle and threshold',
      'Saltatory conduction in myelinated axons',
      'Synaptic transmission: Ca²⁺ → Neurotransmitter release → Receptor binding',
      'EPSP (excitatory) vs IPSP (inhibitory)',
      'Major neurotransmitters: ACh, glutamate, GABA, dopamine',
      'Brain parts and functions',
      'Cerebrum: 4 lobes (frontal, parietal, temporal, occipital)',
      'Hypothalamus: Homeostasis master regulator',
      'Cerebellum: Motor coordination',
      'Medulla: Vital centers (respiratory, cardiac)',
      'Spinal cord: Gray matter (central) + White matter (tracts)',
      'Cranial nerves (12 pairs) vs Spinal nerves (31 pairs)',
      'Autonomic: Sympathetic (fight-flight) vs Parasympathetic (rest-digest)',
      'Reflex arc: 5 components',
      'Knee-jerk (monosynaptic) vs Withdrawal (polysynaptic)'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 21',
    estimatedStudyMinutes: 420,
    difficultyLevel: 5,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Neuron Structure',
        description: 'Cell body, dendrites, axon, myelin sheath, nodes of Ranvier'
      },
      {
        type: 'graph',
        title: 'Action Potential Phases',
        description: 'Membrane potential vs time showing depolarization and repolarization'
      },
      {
        type: 'diagram',
        title: 'Synapse Structure',
        description: 'Presynaptic terminal, synaptic cleft, postsynaptic membrane'
      },
      {
        type: 'diagram',
        title: 'Human Brain Structure',
        description: 'Forebrain, midbrain, hindbrain with labeled parts'
      },
      {
        type: 'flowchart',
        title: 'Reflex Arc',
        description: 'Receptor → Sensory neuron → Integration → Motor neuron → Effector'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Neural Control and Coordination',
      estimatedStudyMinutes: 420,
      difficultyLevel: 5,
      status: 'published'
    }
  });

  console.log('✅ Biology Chapter 21: Neural Control and Coordination seeded successfully!');
}

seedBiologyChapter21()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
