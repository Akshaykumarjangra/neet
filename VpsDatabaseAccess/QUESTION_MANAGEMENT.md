# Question Management System

## 📊 Current Status

- **Total Topics**: 113
- **Total Questions**: 5,650+
- **Questions per Topic**: 50
- **Chapters with Practice**: 102

### By Subject:
- **Physics**: 24 chapters × 50 questions = 1,200 questions
- **Chemistry**: 29 chapters × 50 questions = 1,450 questions
- **Botany**: 26 chapters × 50 questions = 1,300 questions
- **Zoology**: 24 chapters × 50 questions = 1,200 questions

---

## 🎯 How Students Practice

### Method 1: Chapter Practice Tabs
1. Go to any subject (Physics/Chemistry/Botany/Zoology)
2. Click any chapter
3. Go to "Practice" tab
4. See all 50 questions for that chapter

### Method 2: Main Practice Page
1. Click "Practice" in navigation
2. Select subject and topic filters
3. Practice with filtered questions

---

## 📝 Adding/Updating Questions

### Quick Commands

```bash
# Check progress
npx tsx check-progress.ts

# Find placeholder questions
npx tsx find-placeholder-questions.ts

# Import new questions
npx tsx bulk-import-questions.ts your-questions.json

# Batch update existing questions
npx tsx batch-update-questions.ts updated-questions.json
```

### Question Format

See `question-template.json` for the correct format:

```json
{
  "topicId": 1,
  "questionText": "Your question here?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "B",
  "difficultyLevel": 2,
  "sourceType": "neet",
  "solutionDetail": "Explanation...",
  "solutionSteps": ["Step 1", "Step 2"],
  "relatedTopics": ["Topic 1"],
  "tags": ["neet", "physics"]
}
```

---

## 🔧 Tools Available

1. **check-progress.ts** - Visual progress tracker
2. **find-placeholder-questions.ts** - Find & export placeholders
3. **bulk-import-questions.ts** - Import multiple questions
4. **batch-update-questions.ts** - Update multiple questions
5. **question-template.json** - Example question format

---

## 📚 Documentation

- **BULK_IMPORT_GUIDE.md** - Complete guide for bulk operations
- **QUICK_START_ADDING_QUESTIONS.md** - Quick reference
- **QUESTION_MANAGEMENT.md** - This file

---

## 💡 Tips

- Most questions are currently placeholders
- Use bulk import tools to add real NEET questions
- Each topic needs 50 quality questions
- Test questions in the Practice page after adding

---

**For detailed instructions, see BULK_IMPORT_GUIDE.md**
