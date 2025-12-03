# Bulk Question Import & Template System Guide

This guide explains how to efficiently add real NEET questions to replace the 561 placeholder questions in your database.

## 📊 Current Status

- **Total Questions**: 600
- **Real Questions**: 39 (6.5%)
- **Placeholder Questions**: 561 (93.5%)

### By Subject:
- **Physics**: 10 real / 140 placeholders
- **Chemistry**: 11 real / 139 placeholders  
- **Botany**: 9 real / 141 placeholders
- **Zoology**: 9 real / 141 placeholders

## 🛠️ Available Tools

### 1. Find Placeholder Questions
Identifies all placeholder questions and exports them for editing.

```bash
npx tsx find-placeholder-questions.ts
```

**Output:**
- `placeholder-questions-to-fill.json` - First 10 placeholders as templates
- `placeholder-ids.json` - All placeholder question IDs

### 2. Bulk Import Questions
Import multiple questions from a JSON file at once.

```bash
npx tsx bulk-import-questions.ts your-questions.json
```

**Example JSON format** (see `question-template.json`):
```json
[
  {
    "topicId": 1,
    "questionText": "Your question here?",
    "options": [
      "Option A",
      "Option B", 
      "Option C",
      "Option D"
    ],
    "correctAnswer": "B",
    "difficultyLevel": 2,
    "solutionDetail": "Detailed explanation",
    "solutionSteps": ["Step 1", "Step 2"],
    "relatedTopics": ["Topic 1"],
    "tags": ["neet", "physics"]
  }
]
```

### 3. Update Existing Question
Replace a placeholder question with real content.

```bash
npx tsx update-existing-question.ts
```

Edit the script to specify the question ID and new content.

## 📝 Topic IDs Reference

Use these IDs when creating questions:

### Physics (150 questions total)
- **1** - Kinematics (50 questions)
- **2** - Laws of Motion (50 questions)
- **3** - Electrostatics (50 questions)

### Chemistry (150 questions total)
- **4** - Atomic Structure (50 questions)
- **5** - Chemical Bonding (50 questions)
- **6** - Electrochemistry (50 questions)

### Botany (150 questions total)
- **7** - Cell Structure and Function (50 questions)
- **8** - Genetics (50 questions)
- **9** - Plant Physiology (50 questions)

### Zoology (150 questions total)
- **10** - Evolution (50 questions)
- **11** - Human Physiology (50 questions)
- **12** - Reproduction (50 questions)

## 🎯 Difficulty Levels

- **1** = Easy (Basic concepts, direct questions)
- **2** = Medium (Application, 2-step problems)
- **3** = Hard (Complex, multi-concept, NEET advanced)

## 📋 Workflow Recommendations

### Option A: Bulk Import New Questions
1. Create a JSON file with your questions (use `question-template.json` as reference)
2. Run: `npx tsx bulk-import-questions.ts my-questions.json`
3. Questions will be added to the database

### Option B: Replace Existing Placeholders
1. Run: `npx tsx find-placeholder-questions.ts`
2. Edit `placeholder-questions-to-fill.json` with real content
3. For each question, edit `update-existing-question.ts` with the ID and content
4. Run: `npx tsx update-existing-question.ts`

### Option C: Hybrid Approach
1. Use bulk import for completely new questions
2. Use update tool for replacing specific placeholders
3. Keep track of which topics need more questions

## ✅ Best Practices

1. **Start with one topic** - Focus on completing one topic at a time
2. **Verify topic IDs** - Double-check the topicId matches your intended subject
3. **Test with small batches** - Import 5-10 questions first to verify format
4. **Include detailed solutions** - NEET students need comprehensive explanations
5. **Use proper difficulty levels** - Mix easy, medium, and hard questions
6. **Add relevant tags** - Helps with future filtering and search

## 🔍 Validation Rules

The import tool validates:
- ✅ All required fields present
- ✅ Exactly 4 options (A, B, C, D)
- ✅ Correct answer is A, B, C, or D
- ✅ Difficulty level is 1, 2, or 3
- ✅ Topic ID exists in database

## 📞 Quick Commands

```bash
# Find placeholders
npx tsx find-placeholder-questions.ts

# Import questions
npx tsx bulk-import-questions.ts physics-questions.json

# Update single question
npx tsx update-existing-question.ts

# Check database status
psql postgresql://user@localhost:5432/neet_prep -c "SELECT COUNT(*) FROM questions;"
```

## 💡 Tips

- Keep your question JSON files organized by subject/topic
- Use version control (git) to track your question additions
- Consider creating questions in batches of 10-20 for easier management
- Review imported questions in the Practice page to verify formatting
- Use the existing 39 real questions as examples for quality standards

---

**Need help?** Check the example files:
- `question-template.json` - Sample question format
- `bulk-import-questions.ts` - Import tool source
- `update-existing-question.ts` - Update tool source
