# NEET Preparation Platform - Design Guidelines

## Design Approach
**Hybrid Educational System**: Drawing from Material Design's structure combined with educational platform best practices (Khan Academy, Brilliant.org, Byju's). Focus on clarity, distraction-free learning, and visual hierarchy that supports complex scientific content.

## Core Design Principles
1. **Study-First Interface**: Minimize cognitive load during learning sessions
2. **Progressive Disclosure**: Reveal complexity gradually as users advance
3. **Scientific Credibility**: Professional, trustworthy aesthetic for educational content
4. **Performance Clarity**: Make progress and achievements immediately visible

## Typography

**Primary Font**: Inter or Work Sans (Google Fonts)
- **Headings**: 600-700 weight, sizes: text-4xl (dashboard), text-2xl (sections), text-xl (cards)
- **Body Text**: 400 weight, text-base for content, text-sm for metadata
- **Question Text**: 500 weight, text-lg for optimal readability
- **Code/Formulas**: JetBrains Mono, text-sm to text-base

**Mathematical Content**: Integrate KaTeX or MathJax for LaTeX rendering inline

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16** (p-4, m-6, gap-8, py-12, mb-16)

**Grid Structure**:
- Dashboard: 3-column grid (lg:grid-cols-3) for metrics cards
- Question Bank: 2-column (lg:grid-cols-2) for question cards with preview
- Content Areas: Single column with max-w-4xl for reading comfort
- Test Interface: Full-width focused view with fixed sidebar for navigation

**Container Widths**:
- Main content: max-w-7xl
- Reading content: max-w-4xl
- Forms/Questions: max-w-2xl

## Component Library

### Navigation
**Top Navigation Bar**: Fixed position with subject tabs (Physics, Chemistry, Botany, Zoology), user profile, points display, and level badge
- Height: h-16
- Background: Slight glass-morphism effect (backdrop-blur-sm)
- Subject tabs with active indicator line

**Sidebar Navigation**: Collapsible left sidebar (w-64) for chapter/topic tree navigation
- Expandable accordions for chapters
- Progress indicators (circular) next to each topic
- Quick filters: All, Weak Areas, Completed, Bookmarked

### Dashboard Components
**Metric Cards**: 
- Grid of 3-4 cards showing: Total Questions Solved, Accuracy Rate, Study Streak, Mock Test Score
- Each card: p-6, rounded-xl, with large number (text-3xl), icon, and trend indicator

**Progress Visualization**:
- Subject-wise radial progress charts (D3.js)
- Weekly study heatmap (GitHub-style contribution graph)
- Topic mastery bars with difficulty distribution

### Question Display
**Question Card**:
- Clean white/neutral container with p-8 spacing
- Question number badge (top-left)
- Difficulty chip (top-right): color-coded (Easy/Medium/Hard)
- Question text: text-lg with generous line-height (leading-relaxed)
- Options: Large touch targets (min-h-12), radio buttons with clear labels
- Action buttons: Submit, Skip, Bookmark (bottom-right)

**Solution Panel**:
- Expandable accordion below question
- Step-by-step breakdown with numbered sections
- Concept tags linking to related topics
- Video explanation embed option

### 3D Visualization Module
**Embedded Canvas Area**:
- Dedicated full-screen capable container (aspect-ratio-16/9 or square)
- Controls overlay (bottom): rotate, zoom, reset view
- Info panel (right side): concept explanation, interactive labels
- Dark background to highlight 3D models

### Test Interface
**Fixed Header**: Timer (large, text-2xl), question palette navigator, submit test button
**Question Area**: Focused single-question view with minimal distractions
**Question Palette**: Grid of question numbers showing status (attempted/unattempted/marked/review)
**Navigation**: Previous/Next buttons, clear spacing from content

### Gamification Elements
**Level Badge**: Circular badge with current level, animated progress ring
**Points Display**: Numeric counter with "+X points" animation on earning
**Achievement Popups**: Toast notifications for milestones (slide-in from top-right)
**Leaderboard Cards**: Compact list with rank, avatar, name, points

## Interactive Elements

**Buttons**:
- Primary CTA: px-6 py-3, rounded-lg, medium weight text
- Secondary: px-4 py-2, border variant
- Icon buttons: Square (h-10 w-10), rounded-lg

**Form Inputs**:
- Text inputs: h-12, rounded-lg, clear focus states
- Consistent padding: px-4
- Labels: text-sm, mb-2 spacing

**Cards**:
- Base: rounded-xl with subtle shadow
- Hover: Slight lift (transform scale-[1.02])
- Spacing: p-6 for content cards, p-4 for compact items

## Animation Strategy

**Subtle Enhancements Only**:
- Page transitions: Fade + slide (200ms duration)
- Progress animations: Smooth counting numbers, progress bar fills (GSAP)
- 3D Model loads: Gentle rotation reveal (Three.js)
- Achievement popups: Slide + fade (anime.js)
- **NO** distracting background animations or auto-playing effects

## Accessibility
- High contrast ratios for all text (WCAG AA minimum)
- Focus indicators on all interactive elements
- Keyboard navigation throughout
- Screen reader labels for all icons and controls

## Images

**Hero Section** (Dashboard Landing):
- Abstract educational illustration showing interconnected subjects (DNA helix merging with physics symbols, chemical structures)
- Size: Full-width, height: 60vh
- Placement: Top of dashboard with overlay containing welcome message and quick stats

**Subject Category Cards**:
- Icon-based imagery (Physics: atom, Chemistry: flask, Botany: leaf, Zoology: cell)
- Illustrative style, not photographic
- Placement: Main navigation/subject selection page

**3D Visualization Backgrounds**:
- Dark gradient backgrounds (deep blue to black) to make 3D models pop
- No hero images in test/practice modes (distraction-free)